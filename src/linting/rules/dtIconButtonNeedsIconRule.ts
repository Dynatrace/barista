import {
  AttrAst,
  ElementAst,
  EmbeddedTemplateAst,
  TemplateAst,
  TextAst
} from '@angular/compiler';
import { BasicTemplateAstVisitor, NgWalker } from 'codelyzer';
import { IRuleMetadata, RuleFailure, Rules } from 'tslint';
import { SourceFile } from 'typescript';
import { addFailure,
  hasContent,
  hasTextContent,
  isButtonElement,
  isElementWithName,
  isIconButtonAttr
} from '../helpers';

class DtButtonVisitor extends BasicTemplateAstVisitor {

  visitElement(element: ElementAst, context: any): any {
    this._validateElement(element);
    super.visitElement(element, context);
  }

  // Filters TextAst elements that only contain whitespace characters.
  private _filterWhitespaceElements(element: TemplateAst): boolean {
    if (element instanceof TextAst) {
      return hasTextContent(element);
    }
    return true;
  }

  private _validateElement(element: ElementAst): any {
    if (!isButtonElement(element)) {
      return;
    }

    const attrs: AttrAst[] = element.attrs;
    const isIconButton = attrs.some((attr) => isIconButtonAttr(attr));

    if (isIconButton && !hasContent(element)) {
      addFailure(this, element, 'A dt-icon-button must not be empty, but must contain a dt-icon element.');
    }

    if (isIconButton) {
      const hasOnlyDtIconChildren = element.children
        .filter((child) => this._filterWhitespaceElements(child))
        .every((child) => {
          if (isElementWithName(child, 'dt-icon')) {
            return true;
          }

          if (child instanceof EmbeddedTemplateAst) {
            return child.children
              .every((grandchild) => isElementWithName(grandchild, 'dt-icon'));
          }

          return false;
        });

      if (hasOnlyDtIconChildren) {
        return;
      }

      addFailure(this, element, 'A dt-icon-button must contain dt-icon elements only. No other nested elements are allowed.');
    }
  }
}

/**
 * The dtIconButtonNeedsIconRule ensures that an icon button only contains dt-icon elements.
 *
 * The following examples pass the button lint checks:
 * <button dt-icon-button variant="secondary"><dt-icon name="agent"></dt-icon></button>
 * <button dt-icon-button variant="primary">
 *  <dt-icon name="dont-watch" *ngIf="isExpanded"></dt-icon>
 *  <dt-icon name="overview" *ngIf="!isExpanded"></dt-icon>
 * </button>
 *
 * For the following example the linter throws an error:
 * <button dt-icon-button variant="secondary"><dt-icon name="agent"></dt-icon> icon button</button>, only dt-icon child elements allowed
 * <button dt-icon-button variant="secondary">icon button</button>, icon content required
 * <button dt-icon-button variant="secondary"></button>, icon content required
 */
export class Rule extends Rules.AbstractRule {

  static readonly metadata: IRuleMetadata = {
    description: 'Ensures that an icon button contains only dt-icon components.',
    // tslint:disable-next-line:no-null-keyword
    options: null,
    optionsDescription: 'Not configurable.',
    rationale: 'An icon button must only contain dt-icon components.',
    ruleName: 'dt-icon-button-needs-icon',
    type: 'maintainability',
    typescriptOnly: true,
  };

  apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(
      new NgWalker(sourceFile, this.getOptions(), {
        templateVisitorCtrl: DtButtonVisitor,
      })
    );
  }
}
