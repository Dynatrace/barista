/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  CSSResult,
  LitElement,
  TemplateResult,
  css,
  customElement,
  html,
  property,
  query,
  PropertyValues,
} from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { classMap } from 'lit-html/directives/class-map';
import { debounce } from 'lodash/fp';
import type { Placement } from '@popperjs/core/lib';

import {
  getNextGroupItemIndex,
  SelectionModel,
} from '@dynatrace/fluid-elements/core';
import {
  FLUID_INPUT_PADDING_BLOCK,
  FLUID_INPUT_PADDING_INLINE,
} from '@dynatrace/fluid-design-tokens';
import {
  ARROW_DOWN,
  ARROW_UP,
  ENTER,
  ESCAPE,
  TAB,
} from '@dynatrace/shared/keycodes';

import '@dynatrace/fluid-elements/icon';
import '@dynatrace/fluid-elements/input';
import '@dynatrace/fluid-elements/popover';
import '@dynatrace/fluid-elements/virtual-scroll-container';
// tslint:disable-next-line: no-duplicate-imports
import { FluidIcon } from '@dynatrace/fluid-elements/icon';
// tslint:disable-next-line: no-duplicate-imports
import { FluidInput } from '@dynatrace/fluid-elements/input';
// tslint:disable-next-line: no-duplicate-imports
import {
  FluidPopover,
  FluidPopoverOffset,
} from '@dynatrace/fluid-elements/popover';
// tslint:disable-next-line: no-duplicate-imports
import {
  FluidVirtualScrollContainer,
  FluidVirtualScrollContainerRenderedItemsChange,
} from '@dynatrace/fluid-elements/virtual-scroll-container';

import './combo-box-option/combo-box-option';
// tslint:disable-next-line: no-duplicate-imports
import { FluidComboBoxOption } from './combo-box-option/combo-box-option';
import { FluidComboBoxOptionSelectedChangeEvent } from './combo-box-option/combo-box-option-events';

let _unique = 0;

// Fallback placement of the popover
const FALLBACK_PLACEMENT: Placement[] = [`right`, `left`, `top-start`];

/**
 * This is an experimental combo-box element built with lit-elements and
 * web-components. It registers itself as `fluid-combo-box` custom element.
 * @element fluid-combo-box
 */
@customElement('fluid-combo-box')
export class FluidComboBox<T> extends LitElement {
  /** Styles for the combo-box component */
  static get styles(): CSSResult {
    return css`
      :host {
        display: inline-block;
      }

      :host([disabled]) {
        pointer-events: none;
      }

      fluid-popover {
        z-index: 10;
      }

      .fluid-icon {
        cursor: pointer;
        transition: transform 100ms ease-in-out;
      }

      .fluid-icon.fluid-popover-open {
        transform: rotate(180deg);
      }
    `;
  }

  /**
   * Defines the tab element with an id attribute
   * @attr
   */
  @property({ type: String, reflect: true })
  comboboxid = `fluid-combo-box-${_unique++}`;

  /**
   * Defines whether the combo-box is disabled.
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Defines whether the combo-box selection is required.
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Defines whether the combo-box selection is valid.
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  valid = true;

  /**
   * Defines the label of the combo-box input field.
   * @attr
   * @type string
   */
  @property({ type: String, reflect: true })
  label: string;

  /**
   * Defines the placeholder of the combo-box input field.
   * @attr
   * @type string
   */
  @property({ type: String, reflect: false })
  placeholder: string = ``;

  /**
   * Defines the text to display if no options are available.
   * @attr
   * @type string
   */
  @property({ type: String, reflect: false })
  emptymessage: string = `No options to choose from.`;

  /**
   * Array of options to display in the popover.
   * @attr
   * @type array
   */
  @property({ type: Array, reflect: false })
  get options(): T[] {
    return this._options;
  }
  set options(value: T[]) {
    const oldOptions = this._options;
    this._options = value;
    this._setOptionFocus(false);
    this._focusedOptionIndex = -1;
    this._filteredOptions = this.filterOptionsFn(this._options, this._filter);
    this.requestUpdate(`options`, oldOptions);
  }
  private _options: T[] = [];

  /**
   * @internal Array of filtered options ultimately displayed in the popover
   * @type array
   */
  @property({ type: Array, reflect: false })
  _filteredOptions: T[];

  /**
   * Defines whether the options can be filtered.
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  filterable = true;

  /**
   * Defines whether multiple options can be selected.
   * @attr
   */
  @property({ type: Boolean, reflect: true })
  multiselect = false;

  /**
   * Defines the aria label of the combo-box input field.
   * @attr
   * @type string
   */
  @property({ type: String, reflect: true })
  arialabel: string;

  /**
   * Defines the aria labelled by of the combo-box input field.
   * @attr
   * @type string
   */
  @property({ type: String, reflect: true })
  arialabelledby: string;

  /**
   * Defines the function to use for rendering options
   * By default returns the option as string
   * @attr
   * @type function
   */
  @property({ reflect: false, attribute: false })
  renderOptionFn: (option: T) => string = (option: T) => `${option}`;

  /**
   * Defines the function to use for getting the selected option's display name
   * By default returns the option as string
   * @attr
   * @type function
   */
  @property({ reflect: false, attribute: false })
  displayNameFn: (option: T) => string = (option: T) => `${option}`;

  /**
   * Defines the function to use for filtering the options
   * By default checks if the option string includes the filter value
   * @attr
   * @type function
   */
  @property({ reflect: false, attribute: false })
  filterOptionsFn: (options: T[], filter: string) => T[] = (options, filter) =>
    options.filter((option) => `${option}`.includes(filter));

  /** Defines whether the popover is open */
  @property({ type: Boolean, attribute: false })
  private _popoverOpen = false;

  /** Reference of the fluid input element */
  @query(`fluid-input`)
  private _fluidInput: FluidInput;

  /** Reference of the native input element */
  @query(`.fluid-combo-box-input`)
  private _input: HTMLInputElement;

  /** Reference of the input icon */
  @query(`fluid-icon`)
  private _icon: FluidIcon;

  /** Reference of the popover component */
  @query(`fluid-popover`)
  private _popover: FluidPopover;

  /** Reference of the virtual scroll container */
  @query(`fluid-virtual-scroll-container`)
  private _virtualScrollContainer: FluidVirtualScrollContainer<T>;

  /** Current value the list of items is filtered by */
  private _filter = ``;

  /**
   * Used to correctly handle blurring the input
   * The input would lose focus when the user clicks inside the popover
   * This flag is used to correctly handle this case
   */
  private _insidePopover = false;

  /** Selection model for handling options' selection */
  private _selectionModel: SelectionModel<any>;

  /**
   * Index of the currently focused option
   * Corresponds to the index of the option in the filtered options array
   */
  private _focusedOptionIndex = -1;

  // Offset of the popover
  private _offset: FluidPopoverOffset = ({ placement }) => {
    if (placement.includes(`left`)) {
      // Shift popover to the left for input container padding + background overshoot
      // The input background is bigger than the actual input the popover is anchored to
      /*
      Popover      InputContainer
      ----------   --------------------------------
               |   |   Label                      |
               |   |------------------------------|
               |<->|<->|Input               ||X|  |
               |   |------------------------------|
      ----------   --------------------------------
    */
      return [0, 2 * parseInt(FLUID_INPUT_PADDING_INLINE)];
    } else if (placement.includes(`right`)) {
      // Shift popover to the right for icon width + 2 x padding
      /*
      InputContainer                     Popover
      --------------------------------   -----------
      |   Label                      |   |
      |------------------------------|   |
      |   |Input               ||X|  |   |
      |------------------------------|   |
      |                         <-><-><->|
      --------------------------------   -----------
    */
      return [
        0,
        2 * parseInt(FLUID_INPUT_PADDING_INLINE) + this._icon.clientWidth,
      ];
    }

    return [
      -parseInt(FLUID_INPUT_PADDING_INLINE),
      parseInt(FLUID_INPUT_PADDING_BLOCK),
    ];
  };

  /** Render function used for rendering options in the virtual scroll container */
  private _renderVirtualScrollItemFn = (option: T) => {
    return html`
      <fluid-combo-box-option
        class="fluid-combo-box-option"
        data-index=${this._getOptionIndex(option)}
        @mousemove=${this._handleOptionMousemove.bind(this)}
        @selectedChange=${this._handleSelectedChange.bind(this)}
        .checkbox=${this.multiselect}
        .selectedIndicator=${!this.multiselect}
      >
        ${unsafeHTML(this.renderOptionFn(option))}
      </fluid-combo-box-option>
    `;
  };

  /** Returns the index of the option in the unfiltered options array */
  private _getOptionIndex(option: T): number {
    return this._options.indexOf(option);
  }

  /** Toggles the popover state when clicking on the icon */
  private _handleIconClick(): void {
    if (this._popoverOpen) {
      this._closePopover();
    } else {
      this._input.focus();
      this._openPopover();
    }
  }

  /** Handles focus events of the input field */
  private _handleFocus(): void {
    if (!this.filterable) {
      this._openPopover();
    }
    this._input.value = this._filter;
  }

  /**
   * Handles blur events of the input field
   * As long as the user is inside the popover,
   * the input should keep the focus
   */
  private _handleBlur(): void {
    if (!this._insidePopover) {
      // Store current filter value
      this._filter = this._input.value;
      this._closePopover();
      this._setInputValue();
    } else {
      // Keep existing filter value
      const filter = this._input.value;
      this._input.focus();
      this._input.value = filter;
    }
  }

  /**
   * Handles keydown events
   * @param event
   */
  private _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.code;

    switch (keyCode) {
      case ENTER:
        // Open popover if not already opened,
        // else select the currently focused option
        if (!this._popoverOpen) {
          this._openPopover();
        } else if (this._focusedOptionIndex > -1) {
          this._setSelectedOption();
        }
        break;
      case TAB:
      case ESCAPE:
        // Close popover
        if (this._popoverOpen) {
          this._fluidInput._preventBlur = false;
          this._closePopover();
        }
        break;
      case ARROW_DOWN:
      case ARROW_UP:
        // Prevent default behaviour of scrolling the page up/down
        event.preventDefault();

        // Open popover if closed and navigate through options
        if (!this._popoverOpen) {
          this._openPopover();
        }
        this._updateFocusedOptionIndex(keyCode);
        break;
      default:
        break;
    }
  }

  /**
   * Handles keyup events
   * Opens the popover if not already open and if a filter value is present
   */
  private _handleKeyup({ code }: KeyboardEvent): void {
    if (
      code !== ESCAPE &&
      code !== ENTER &&
      !this._popoverOpen &&
      this._input.value
    ) {
      this._openPopover();
    }
  }

  /** Handles change of the input value */
  private _handleInput(): void {
    this._filteredOptions = this.filterOptionsFn(
      this._options,
      this._input.value,
    );
  }

  /**
   * Handles mousedown on the icon
   * Prevents the input blur event from firing to correctly open/close the popover
   */
  private _handleIconMousedown(event: MouseEvent): void {
    event.preventDefault();
  }

  /**
   * Toggles the selected state of the target option
   * @param event
   */
  private _handleSelectedChange(
    event: FluidComboBoxOptionSelectedChangeEvent,
  ): void {
    // Deselect currently selected option and close popover if multiselect is disabled
    if (!this.multiselect) {
      const selectedOption = this._virtualScrollContainer.shadowRoot!.querySelector<
        FluidComboBoxOption
      >(
        `.fluid-combo-box-option[data-index="${this._selectionModel.selected[0]}"]`,
      );

      if (selectedOption) {
        selectedOption.selected = false;
      }

      this._closePopover();
    }

    const option = event.target as FluidComboBoxOption;
    const optionIndex = parseInt(option.dataset.index!);

    // Update selection model according to the target option's selected state
    if (event.data.selected) {
      this._selectionModel.select(optionIndex);
    } else {
      this._selectionModel.deselect(optionIndex);
    }

    // Set the input value if options are not filterable
    if (!this.filterable) {
      this._setInputValue();
    }

    this.requestUpdate();
  }

  /**
   * Sets flag to determine if the focus should be kept on
   * the input when the input would usually be blurred
   * @param event Event emitted when the mouse enters/leaves the popover
   */
  private _handlePopoverEnter(): void {
    this._insidePopover = true;
    this._fluidInput._preventBlur = true;
  }

  /**
   * Sets flag to determine if the focus should be kept on
   * the input when the input would usually be blurred
   * @param event Event emitted when the mouse enters/leaves the popover
   */
  private _handlePopoverLeave(): void {
    this._insidePopover = false;
    this._fluidInput._preventBlur = false;
  }

  /** Sets the index of the currently focused option when hovering an option */
  private _handleOptionMousemove(event: MouseEvent): void {
    const option = event.target as FluidComboBoxOption;

    if (option.focused) {
      return;
    }

    this._setOptionFocus(false);
    const optionIndex = parseInt(option.dataset.index!);
    this._focusedOptionIndex = this._filteredOptions.indexOf(
      this._options[optionIndex],
    );
    option.focused = true;
  }

  /**
   * Called when the range of items to render is updated by the virtual scroll container
   * Sets the selected and focused state of the rendered items
   */
  private _handleRenderedItemsChange(
    event: FluidVirtualScrollContainerRenderedItemsChange,
  ): void {
    const { first, last } = event.range;

    for (let i = first; i <= last; i += 1) {
      const optionIndex = this._getOptionIndex(this._filteredOptions[i]);
      const option = this._virtualScrollContainer.shadowRoot!.querySelector<
        FluidComboBoxOption
      >(`.fluid-combo-box-option[data-index="${optionIndex}"]`);

      if (option) {
        option.selected = this._selectionModel.isSelected(optionIndex);
        option.focused = i === this._focusedOptionIndex;
      }
    }
  }

  /** Opens the options popover and sets it's width to the width of the input */
  private _openPopover(): void {
    this._popoverOpen = true;

    // Set width of the popover container to the width of the combo-box
    const comboBoxWidth = this._fluidInput.getBoundingClientRect().width;
    this._popover._popoverContainer.style.width = `${comboBoxWidth}px`;
    // Render options in the virtual scroll container
    this._virtualScrollContainer.render();
  }

  /** Closes the options popover */
  private _closePopover(): void {
    this._popoverOpen = false;
  }

  /** Sets the value of the combo-box input */
  private _setInputValue(): void {
    const displayNames: string[] = [];
    for (const optionIndex of this._selectionModel.selected) {
      displayNames.push(this.displayNameFn(this._options[optionIndex]));
    }

    this._input.value = displayNames.join(`, `);
  }

  /** Triggers selected change with currently focused option */
  private _setSelectedOption(): void {
    const option = this._virtualScrollContainer.shadowRoot!.querySelector<
      FluidComboBoxOption
    >(
      `.fluid-combo-box-option[data-index="${this._getOptionIndex(
        this._filteredOptions[this._focusedOptionIndex],
      )}"]`,
    );

    if (option) {
      this._handleSelectedChange({ target: option } as any);
    }
  }

  /**
   * Sets the index of the currently focused combo-box-option
   * @param keyCode Right or left arrow keycode
   */
  private _updateFocusedOptionIndex(keyCode: string): void {
    // Prevent cycling
    if (
      (keyCode === ARROW_DOWN &&
        this._focusedOptionIndex === this._filteredOptions.length - 1) ||
      (keyCode === ARROW_UP && this._focusedOptionIndex === 0)
    ) {
      return;
    }

    // Reset focus of currently focused option
    this._setOptionFocus(false);
    // Increase/decrease index of focused option
    this._focusedOptionIndex = getNextGroupItemIndex(
      this._focusedOptionIndex,
      this._filteredOptions.length,
      keyCode,
    );

    // If the new index is outside the range of currently rendered options, which
    // might happen when the user first hovers an item, then scrolls up/down, get
    // the first or last visible item's index
    if (
      this._focusedOptionIndex <
      this._virtualScrollContainer._scrollState.renderedItemsRange.first
    ) {
      this._focusedOptionIndex = this._getFirstVisibleOptionIndex();
    } else if (
      this._focusedOptionIndex >
      this._virtualScrollContainer._scrollState.renderedItemsRange.last
    ) {
      this._focusedOptionIndex = this._getLastVisibleOptionIndex();
    }
    // Set the focus of the option at the new index
    this._setOptionFocus();
  }

  /** Iterates over currently rendered options and returns the index of the first visible */
  private _getFirstVisibleOptionIndex(): number {
    let optionIndex = 0;
    let currentIndex = this._virtualScrollContainer._scrollState
      .renderedItemsRange.first;
    const containerBCR = this._virtualScrollContainer.getBoundingClientRect();

    do {
      const option = this._virtualScrollContainer.shadowRoot!.querySelector(
        `.fluid-combo-box-option[data-index="${this._getOptionIndex(
          this._filteredOptions[currentIndex],
        )}"]`,
      );

      if (option) {
        const optionBCR = option.getBoundingClientRect();
        if (optionBCR.top >= containerBCR.top) {
          optionIndex = currentIndex;
        }

        currentIndex += 1;
      } else {
        break;
      }
    } while (!optionIndex);

    return optionIndex;
  }

  /** Iterates over currently rendered options and returns the index of the last visible */
  private _getLastVisibleOptionIndex(): number {
    let optionIndex = 0;
    let currentIndex = this._virtualScrollContainer._scrollState
      .renderedItemsRange.last;
    const containerBCR = this._virtualScrollContainer.getBoundingClientRect();

    do {
      const option = this._virtualScrollContainer.shadowRoot!.querySelector(
        `.fluid-combo-box-option[data-index="${this._getOptionIndex(
          this._filteredOptions[currentIndex],
        )}"]`,
      );

      if (option) {
        const optionBCR = option.getBoundingClientRect();
        if (optionBCR.bottom <= containerBCR.bottom) {
          optionIndex = currentIndex;
        }

        currentIndex -= 1;
      } else {
        break;
      }
    } while (!optionIndex);

    return optionIndex;
  }

  /**
   * Sets the focus of the option at the currently focused index
   * @param focus
   */
  private _setOptionFocus(focus: boolean = true): void {
    if (this._focusedOptionIndex >= 0) {
      const option = this._virtualScrollContainer.shadowRoot!.querySelector<
        FluidComboBoxOption
      >(
        `.fluid-combo-box-option[data-index="${this._getOptionIndex(
          this._filteredOptions[this._focusedOptionIndex],
        )}"]`,
      );

      if (option) {
        option.focused = focus;
        if (focus) {
          this._adjustVirtualScrollContainerScroll(option);
        }
      }
    }
  }

  /**
   * Adjusts the scroll position of the virtual scroll container
   * to fully show the currently focused option
   */
  private _adjustVirtualScrollContainerScroll(
    option: FluidComboBoxOption,
  ): void {
    const containerBCR = this._virtualScrollContainer.getBoundingClientRect();
    const optionBCR = option.getBoundingClientRect();

    if (optionBCR.top < containerBCR.top) {
      this._virtualScrollContainer._scrollContainer.scrollBy({
        top: optionBCR.top - containerBCR.top,
      });
    } else if (optionBCR.bottom > containerBCR.bottom) {
      this._virtualScrollContainer._scrollContainer.scrollBy({
        top: optionBCR.bottom - containerBCR.bottom,
      });
    }
  }

  /**
   * Creates selection model after the properties have been updated once,
   * else the multiselect property would not yet be set to the desired value
   */
  firstUpdated(props: PropertyValues): void {
    super.firstUpdated(props);

    // Selection model for handling selected options
    this._selectionModel = new SelectionModel(this.multiselect);
  }

  /**
   * Render function of the custom element. It is called when one of the
   * observedProperties (annotated with @property) changes.
   */
  render(): TemplateResult {
    const iconClassMapData = {
      'fluid-icon': true,
      'fluid-popover-open': this._popoverOpen,
    };

    return html`
      <fluid-input>
        ${this.label
          ? html`<label slot="label" for="fluid-combo-box-input-${_unique}"
              >${this.label}</label
            >`
          : nothing}
        <input
          id="fluid-combo-box-input-${_unique}"
          class="fluid-combo-box-input"
          type="text"
          aria-label=${ifDefined(this.arialabel)}
          aria-labelledby=${ifDefined(this.arialabelledby)}
          placeholder=${this.placeholder}
          .required=${this.required}
          .disabled=${this.disabled}
          ?readonly=${!this.filterable}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
          @keydown=${this._handleKeydown}
          @keyup=${this._handleKeyup}
          @input=${debounce(250, this._handleInput) as () => void}
        />
        <fluid-icon
          class=${classMap(iconClassMapData)}
          name="arrow-down"
          slot="icon"
          @mousedown=${this._handleIconMousedown}
          @click=${this._handleIconClick}
        ></fluid-icon>
      </fluid-input>
      <fluid-popover
        .anchor=${this._input}
        .open=${this._popoverOpen}
        .offset=${this._offset}
        .fallbackplacement=${FALLBACK_PLACEMENT}
        @mouseenter=${this._handlePopoverEnter}
        @mouseleave=${this._handlePopoverLeave}
      >
        <fluid-virtual-scroll-container
          .items=${this._filteredOptions}
          .renderItemFn=${this._renderVirtualScrollItemFn}
          .noitemsmessage=${this.emptymessage}
          equalitemsheight
          @renderedItemsChange=${this._handleRenderedItemsChange}
        ></fluid-virtual-scroll-container>
      </fluid-popover>
    `;
  }
}
