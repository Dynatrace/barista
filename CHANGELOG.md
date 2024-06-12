## [16.0.0](https://github.com/dynatrace-oss/barista/compare/16.0.0...17.0.0) (2024-07-01)

### BREAKING CHANGES

- Update all Angular packages to version 17

## [16.0.4](https://github.com/dynatrace-oss/barista/compare/16.0.3...16.0.4) (2024-02-26)

### Bug Fixes

- **drawer:** Removed no longer necessary will-change property from the drawer.
  ([3a4492f](https://github.com/dynatrace-oss/barista/commit/3a4492ffa64b7a87f04b758b5f9bb3d7f1ce5d6b))

## [16.0.3](https://github.com/dynatrace-oss/barista/compare/16.0.2...16.0.3) (2024-01-31)

### Bug Fixes

- **table:** Allow table export to csv for keys with '.'
  ([924528a](https://github.com/dynatrace-oss/barista/commit/924528a2c61b4e99735a6cbee3471fc1d72a148a))
- **table:** Fixes an issue with cell access at runtime.
  ([2e52159](https://github.com/dynatrace-oss/barista/commit/2e52159492d93112035e6980f17f202d3fae9776))

## [16.0.2](https://github.com/dynatrace-oss/barista/compare/16.0.1...16.0.2) (2024-01-22)

### Bug Fixes

- **indicator:** Exhaustively check for valid stateChanges subject before
  completing it.
  ([68fc726](https://github.com/dynatrace-oss/barista/commit/68fc7260959a5495cf0adc3627a30966fec08a63))

## [16.0.1](https://github.com/dynatrace-oss/barista/compare/16.0.0...16.0.1) (2023-11-02)

### Bug Fixes

- **table:** Fixes an issue with ngDestroy timings.
  ([d08cf15](https://github.com/dynatrace-oss/barista/commit/d08cf15774f5031bab2e765d49bbbbd3ce01e96b))

## [16.0.0](https://github.com/dynatrace-oss/barista/compare/15.0.0...16.0.0) (2023-09-12)

### BREAKING CHANGES

- Update all Angular packages to version 16

## [15.0.0](https://github.com/dynatrace-oss/barista/compare/14.0.0...15.0.0) (2023-09-08)

### BREAKING CHANGES

- Update all Angular packages to version 15

### Bug Fixes

- **date-adapter:** Problem with `this` inside a function + unit tests
  ([6776e6b](https://github.com/dynatrace-oss/barista/commit/6776e6beceac2a0d8f29f7e17c74f6a661bc5b91))

## [14.0.0](https://github.com/dynatrace-oss/barista/compare/11.0.0...14.0.0) (2023-08-28)

### BREAKING CHANGES

- Update all Angular packages to version 14

## [11.0.6](https://github.com/dynatrace-oss/barista/compare/11.0.5...11.0.6) (2023-07-27)

### Bug Fixes

- **container-breakpoint-observer:** Changed the calculation of breakpoint to
  rely on measurements returned by the IntersectionObserverEntry.
  ([1ea9e42](https://github.com/dynatrace-oss/barista/commit/1ea9e4269ebd1a89a862f7ec78826738d8b70a17))

## [11.0.5](https://github.com/dynatrace-oss/barista/compare/11.0.4...11.0.5) (2023-07-25)

### Bug Fixes

- **table:** Fixes an issue with the simple-column dependency injection for
  tests.
  ([c0c65e3](https://github.com/dynatrace-oss/barista/commit/c0c65e3e8fb881d0fbe0ee80f804fa4a13da5994))

## [11.0.4](https://github.com/dynatrace-oss/barista/compare/11.0.3...11.0.4) (2023-07-25)

### Bug Fixes

- **table:** Fixes an issue with the dependency injection of simple-column-base.
  ([449950b](https://github.com/dynatrace-oss/barista/commit/449950b56fca05b84c06cfa9f29d659c4118eec1))

## [11.0.3](https://github.com/dynatrace-oss/barista/compare/11.0.2...11.0.3) (2023-07-24)

### Bug Fixes

- **link:** Fixes a regression with the size of the external link icon.
  ([4e51c6f](https://github.com/dynatrace-oss/barista/commit/4e51c6f510d076fe97690006d9d12d6622366514))

## [11.0.2](https://github.com/dynatrace-oss/barista/compare/11.0.1...11.0.2) (2023-07-24)

### Bug Fixes

- **icons:** Reverted color change for icons to prevent breaking.
  ([89a4d84](https://github.com/dynatrace-oss/barista/commit/89a4d845dda30383fac52efd0921cbd571d6d099))

## [11.0.1](https://github.com/dynatrace-oss/barista/compare/11.0.0...11.0.1) (2023-06-26)

## Refactors

- **workspace:** Moved all const enum to regular
  enums.([ad33e0e](https://github.com/dynatrace-oss/barista/commit/ad33e0e265cbe0dbfcfd6bfa5668dd96c36d0b8b))

## [11.0.0](https://github.com/dynatrace-oss/barista/compare/10.0.0...11.0.0) (2023-06-12)

### BREAKING CHANGES

- Update all Angular packages to version 13
- Table and TreeTable constructor parameters have changed. Previously optional
  parameters are now required.
- Refactored ClientRect types to DOMRect type.

## [11.0.0-rc.4](https://github.com/dynatrace-oss/barista/compare/11.0.0-rc.1...11.0.0-rc.4) (2023-04-18)

## [11.0.0-rc.3](https://github.com/dynatrace-oss/barista/compare/11.0.0-rc.1...11.0.0-rc.3) (2023-03-27)

### Bug Fixes

- **workspace:** Angular peerDependency versions have been updated.

## [11.0.0-rc.2](https://github.com/dynatrace-oss/barista/compare/11.0.0-rc.1...11.0.0-rc.2) (2022-12-05)

### Features

- Updated release candidate to have feature parity with 10.x release

## [10.10.0](https://github.com/dynatrace-oss/barista/compare/10.9.0...10.10.0) (2022-11-28)

### Features

- **filter-field:** Tokenize search term before filtering.
  ([6b73811](https://github.com/dynatrace-oss/barista/commit/6b73811ea4a53b6619a6b4535e173c655ffa1f13))
- **tag-add:** Add possibility to customise add tag button label and overlay
  header independently.
  ([09b725f](https://github.com/dynatrace-oss/barista/commit/09b725f0fb7ede3fb0e068800e26566e568101bd))

## [10.9.0](https://github.com/dynatrace-oss/barista/compare/10.8.0...10.9.0) (2022-10-27)

### Bug Fixes

- **context-dialog:** Fixed lack of role for context-dialog host element.
  ([96f5a55](https://github.com/dynatrace-oss/barista/commit/96f5a55363ba4097d290a10f347443f8a1cd269f))
- **drawer:** Drawer's close behavior via pressing ESCAPE can now be disabled
  via 'disableClose' boolean flag.
  ([03ec177](https://github.com/dynatrace-oss/barista/commit/03ec177139e1632097fecb0b5480ef80ed8ada6c))
- **filter-field:** Focus is now placed on 'view more' button after exiting
  filter-field-group detail view.
  ([ef4b3b8](https://github.com/dynatrace-oss/barista/commit/ef4b3b8dc054b4b499fb19aa810c21de2779cd2d))

### Features

- **chart:** Add default aria-label and ability to override it.
  ([f045ad2](https://github.com/dynatrace-oss/barista/commit/f045ad2b23c2565972a3a7a2bee6581255292afe))
- **formatters:** Aligned number formatters with defined patterns
  ([5e9c845](https://github.com/dynatrace-oss/barista/commit/5e9c8454f8f12e1ee3d55bf900467f113ed54f31))
- **highlight:** Allow highlighting multiple terms in one go
  ([152826b](https://github.com/dynatrace-oss/barista/commit/152826b1ce0d0f6520623c269ced94c4d7311504))
- **tag-add:** Add closed output that emits event when input overlay is closed.
  ([e2837b8](https://github.com/dynatrace-oss/barista/commit/e2837b87a4f5d9e904a8bfa1e9d196cc5453b4b4))

## [10.8.0](https://github.com/dynatrace-oss/barista/compare/10.7.0...10.8.0) (2022-09-05)

### Bug Fixes

- **expandable-panel:** Fixed animation state issue when panel is inside a
  container that gets removed from the DOM.
  ([efa711a](https://github.com/dynatrace-oss/barista/commit/efa711abb7682174f0c8590501a753e02f51c7e4))
- **filter-field:** Fixed issue where autocomplete would get out of bounds for
  nested filters.
  ([65457c9](https://github.com/dynatrace-oss/barista/commit/65457c98cf43a20cf7a40dffc261634f336a9a6a))
- **quick-filter:** Move focus to correct element after View more is triggered.
  ([6e7b332](https://github.com/dynatrace-oss/barista/commit/6e7b33245ddaf93e42a864354fad337ac6d21772))
- **table:** Table export prefers data in DS.
  ([b2d4413](https://github.com/dynatrace-oss/barista/commit/b2d4413c24215e50a05a033b915d041c95dc5c7a))

### Features

- **filter-field:** Added keyboard functionality to multiselect dropdown.
  ([939fb17](https://github.com/dynatrace-oss/barista/commit/939fb174ae8df43990ecac86ecf43e738f9f5da2))
- **tag:** Add aria-label to remove button in dt-tag.
  ([0278ac7](https://github.com/dynatrace-oss/barista/commit/0278ac70ac4096d6e9af1fbaf01947dffca43258))
- **tile:** Add critical color to tile component
  ([a3f03a2](https://github.com/dynatrace-oss/barista/commit/a3f03a25ae2de158682895add71f8f5541526500))

## [10.7.7](https://github.com/dynatrace-oss/barista/compare/10.7.6...10.7.7) (2022-08-04)

### Bug Fixes

- **filter-field:** ClearAll button is now only shown with completed filters.
  ([97463c5](https://github.com/dynatrace-oss/barista/commit/97463c54897e9c35a7b09c48a6ba3d3caa89fb41))

## [10.7.6](https://github.com/dynatrace-oss/barista/compare/10.7.5...10.7.6) (2022-08-02)

### Bug Fixes

- **card:** Headings are no longer cut off on Safari on iOS.
  ([1500176](https://github.com/dynatrace-oss/barista/commit/15001761c88b97c50368d50beeb7955417f4b0d9))
- **filter-field:** Clear-all button is now hidden when no filters are applied.
  ([aeb7356](https://github.com/dynatrace-oss/barista/commit/aeb73564ee971a164e40ba3fd0936316512d699d))
- **formatters:** Ensured auto-unit conversion also work for negative values.
  ([a17c6c4](https://github.com/dynatrace-oss/barista/commit/a17c6c40cc0437bf19fa3578fd2ebb1a2f1901bb))

## [10.7.5](https://github.com/dynatrace-oss/barista/compare/10.7.4...10.7.5) (2022-06-29)

### Bug Fixes

- **stacked-series-chart:** No data support and heat fields fix
  ([ad227a5](https://github.com/dynatrace-oss/barista/commit/ad227a54fa44da26bdf7b7834b368b547d094abe))

## [10.7.4](https://github.com/dynatrace-oss/barista/compare/10.7.3...10.7.4) (2022-06-08)

### Bug Fixes

- **quick-filter:** Fixes issue where long text overflowed container.
  ([84b0493](https://github.com/dynatrace-oss/barista/commit/84b0493b476ccf5ff9b085bdc8c3f07b788502c6))

## [10.7.3](https://github.com/dynatrace-oss/barista/compare/10.7.2...10.7.3) (2022-05-30)

### Bug Fixes

- **barista:** Fixed scrolling to link anchor on page load. Closes APM-366476
  ([c36de5d](https://github.com/dynatrace-oss/barista/commit/c36de5dd581620e740d2df4609de52eb0a615a31))
- **link:** External link icon is scaled correctly in Safari.
  ([0995646](https://github.com/dynatrace-oss/barista/commit/099564651e6bfb5a252fff94e9d8030323c73910))
- **quick-filter:** Quick filter no longer get tabbed through when drawer is
  closed. Fixes APM-358368
  ([b2aa145](https://github.com/dynatrace-oss/barista/commit/b2aa145303c4d219bdc6fc161e8d107fdb23b8dc))
- **select:** Fixed incorrect aria-haspopup attribute on host.
  ([28f35d0](https://github.com/dynatrace-oss/barista/commit/28f35d03a0e22fa987671f5be85353ad2c4d0705))
- **select:** Fixes an issue with role on select.
  ([e5c13c5](https://github.com/dynatrace-oss/barista/commit/e5c13c5a6a4b6ef7aaee8c534966dff9c7f72a17))
- **table:** Export handles newlines & expand rows.
  ([4a06d1a](https://github.com/dynatrace-oss/barista/commit/4a06d1add9869a7f437430a274e656ea4ee547ce))

## [10.7.2](https://github.com/dynatrace-oss/barista/compare/10.7.1...10.7.2) (2022-05-04)

### Bug Fixes

- **autocomplete,filter-field:** Add aria label to the autocomplete. Closes
  APM-357936
  ([5f12795](https://github.com/dynatrace-oss/barista/commit/5f1279534ad26a866ec517abde4f5600109068a6))
- **card:** Reflow of title actions is now possible at small screen sizes.
  Closes APM-358314
  ([abeb9be](https://github.com/dynatrace-oss/barista/commit/abeb9beab92ac34e1f4e536574f74d834398500a))
- **loading-distractor:** Loading distractor text is now announced by screen
  readers.
  ([9181d8e](https://github.com/dynatrace-oss/barista/commit/9181d8e1b3cc6793af9b62ddae95a4f5e3432a88))
- **table,icon:** Added aria-label to the sort icon. Closes 358137
  ([2f49c4c](https://github.com/dynatrace-oss/barista/commit/2f49c4c98156c239bf7c2b1fc37c8ad687d33bfc))

## [10.7.1](https://github.com/dynatrace-oss/barista/compare/10.7.0...10.7.1) (2022-04-21)

### Bug Fixes

- **confirmation-dialog:** Apply correct aria-role to confirmation dialog.
  ([da430a7](https://github.com/dynatrace-oss/barista/commit/da430a768834262a12713f44c028e79ec16afc96))
- **filter-field:** Add represenative titles to filter-field-tag buttons.
  ([f858d1a](https://github.com/dynatrace-oss/barista/commit/f858d1a13e3fb1d1f542d4878456564ae06487a5))
- **filter-field:** Connect visible label and form-element for accessibility.
  ([14bf135](https://github.com/dynatrace-oss/barista/commit/14bf1356e1e65553d1f7c3cfc99e17462538f0d0))
- **filter-field:** Fixes an issue with aria-expanded on autocompletes.
  ([f97c4f6](https://github.com/dynatrace-oss/barista/commit/f97c4f633a9e1784959e48c2856ed2b8f95c0c43))
- **filter-field:** Fixes an issue with roles on the filter-field-tag.
  ([e430ca9](https://github.com/dynatrace-oss/barista/commit/e430ca93c7fa458610cf74a37916c1fa9742b602))
- **progress-bar:** Expose aria-label and aria-labelledby props.
  ([7199b45](https://github.com/dynatrace-oss/barista/commit/7199b45b074deb5f9548e83f6c7a3ff9676d1e42))
- **quick-filter:** Add fieldsets to selection groups for accessibility.
  ([cf5e561](https://github.com/dynatrace-oss/barista/commit/cf5e561328b3c09f4813df1f8cd29f16135f4db7))
- **table:** Favorite column button now announces pressed state.
  ([15f5f9a](https://github.com/dynatrace-oss/barista/commit/15f5f9a34b5132af81714d7f46ed8a0b84cfde6c))
- **table:** Fixed role of the header row.
  ([b2a269e](https://github.com/dynatrace-oss/barista/commit/b2a269ec4a27776c5ebc91829809a51ee04687e3))
- **table:** Provide aria-label text for favorite column button.
  ([3b06ec9](https://github.com/dynatrace-oss/barista/commit/3b06ec976292b793f9c16a99221717e0289878a7))

## [10.7.0](https://github.com/dynatrace-oss/barista/compare/10.6.0...10.7.0) (2022-04-20)

### Bug Fixes

- **expandable-section:** Fix issue where input focus was truncated if inside
  expandable-section.
  ([b6df10a](https://github.com/dynatrace-oss/barista/commit/b6df10ac3fcf2f37d51d07620e3376d84fc41460))
- **filter-field:** Fixes an issue where the displayed label in edit mode might
  overflow in certain cases.
  ([e2d9e41](https://github.com/dynatrace-oss/barista/commit/e2d9e41cf83e797dfad135ab4affe1fa4868ed30))
- **filter-field:** Make clear all filter keyboard accessible.
  ([4099d69](https://github.com/dynatrace-oss/barista/commit/4099d696367f55f742ec22bf79c40874abdf5541))
- **link:** Fixed external link icon in dark mode
  ([eec1750](https://github.com/dynatrace-oss/barista/commit/eec175048270989dce2dc928aec5d01c2487bf02))
- **link:** Fixes a regression in the placement of the external link icon.
  ([a2a3fd8](https://github.com/dynatrace-oss/barista/commit/a2a3fd86c9e777b0d271b0ff12ac28dd53c75d40))
- **progress-bar,overlay:** Fix focus monitoring on overlay trigger.
  ([59d3281](https://github.com/dynatrace-oss/barista/commit/59d3281a32bac7e3f7997f89dc199475098a796b))
- **quick-filter:** Keep focus on toggle when triggered with keyboard.
  ([0034b7c](https://github.com/dynatrace-oss/barista/commit/0034b7cc437f72ca4c1dad4356e9f480ffdb232a))
- **secondary-nav:** Fixes an issue with updated active links in sections not
  applying section active class correctly.
  ([7b7becc](https://github.com/dynatrace-oss/barista/commit/7b7becce8c8aef58158bbf3af3bbf6fa22dad37a))
- **select:** Updated outline width when inside a form field
  ([845e959](https://github.com/dynatrace-oss/barista/commit/845e959158d54b033c062b8c1ca168871d5efb63))

### Features

- **table:** Further updates to export as CSV
  ([484572b](https://github.com/dynatrace-oss/barista/commit/484572bfb8cd9ad45beec6ad0c2bdd59f3f160c1))

## [10.6.2](https://github.com/dynatrace-oss/barista/compare/10.6.1...10.6.2) (2022-04-07)

### Bug Fixes

- **link:** Fixes a regression in the placement of the external link icon.
  ([07c76ba](https://github.com/dynatrace-oss/barista/commit/07c76ba1d8b2204c6cfcfd866ece227baa192669))
- **secondary-nav:** Fixes an issue with updated active links in sections not
  applying section active class correctly.
  ([b358222](https://github.com/dynatrace-oss/barista/commit/b358222a073273dc582c10f2635d7db5c0efc032))

## [10.6.1](https://github.com/dynatrace-oss/barista/compare/10.6.0...10.6.1) (2022-03-29)

### Bug Fixes

- **link:** Fixed external link icon in dark mode
  ([b610adc](https://github.com/dynatrace-oss/barista/commit/b610adc0081b3b9c331579dee86887f85ecc0fca))
- **select:** Updated outline width when inside a form field
  ([76cfda7](https://github.com/dynatrace-oss/barista/commit/76cfda7fc13d4e7a4bbb837188d448aec9fdaf43))

## [10.6.0](https://github.com/dynatrace-oss/barista/compare/10.5.0...10.6.0) (2022-02-22)

### Bug Fixes

- **combobox:** Fixes an issue with input being reset if selection is null
  ([eb0f8f9](https://github.com/dynatrace-oss/barista/commit/eb0f8f93d11808ceeae5f7eeed99ce771452700b))
- **core:** Improved null check for sanitizer.
  ([d86c24f](https://github.com/dynatrace-oss/barista/commit/d86c24f2afa416dd1e294e0f6264d6e49b5cbf25))

### Features

- **stacked-series-chart:** Improvements
  ([347c3fe](https://github.com/dynatrace-oss/barista/commit/347c3fe1912ab87423d63d38d8d49a1be644e4a7))

## [10.5.2](https://github.com/dynatrace-oss/barista/compare/10.5.1...10.5.2) (2022-02-17)

### Bug Fixes

- **core:** Improved null check for sanitizer.
  ([b14bbac](https://github.com/dynatrace-oss/barista/commit/b14bbac0d28044b48e9c8b8828378a285606fa36))

## [10.5.1](https://github.com/dynatrace-oss/barista/compare/10.5.0...10.5.1) (2022-02-16)

### Bug Fixes

- **charts:** Removed dependency of dompurify in favor of angular sanitizer.
  ([053dde1](https://github.com/dynatrace-oss/barista/commit/053dde1f7d8424ae9ed3619353b0398519db0475))

## [10.5.0](https://github.com/dynatrace-oss/barista/compare/10.4.0...10.5.0) (2022-02-08)

### Bug Fixes

- **overlay:** Fixes an issue with afterExit not being called when the overlay
  closes on scroll.
  ([ddd567b](https://github.com/dynatrace-oss/barista/commit/ddd567bb2fea9f4dbe998e750b05fde82396b7be))

### Features

- **table:** Update experimental export as CSV functionality.
  ([d0f9a64](https://github.com/dynatrace-oss/barista/commit/d0f9a64184495fc541c7b557795ce47ee2d26dfd))

## [10.4.0](https://github.com/dynatrace-oss/barista/compare/10.3.0...10.4.0) (2022-01-26)

### Bug Fixes

- **autocomplete:** Fixed alignment for autocomplete-overlay if not enough space
  is available on the right.
  ([080cb9e](https://github.com/dynatrace-oss/barista/commit/080cb9e94c262d1929dca9d7cdd26f6e5d15a1aa))

### Features

- **combobox:** Add form control support for combobox.
  ([1fe41cc](https://github.com/dynatrace-oss/barista/commit/1fe41cc5708dc14a5775036425f771ff038d9ea0))

## [10.3.1](https://github.com/dynatrace-oss/barista/compare/10.3.0...10.3.1) (2022-01-14)

### Bug Fixes

- **copy-to-clipboard:** Fixes an issue that the copy to clipboard was called on
  initial render.
  ([48eb87d](https://github.com/dynatrace-oss/barista/commit/48eb87dd79f45a1dd510f4f3f3a74a7a9096a824))
- **datepicker:** Fix button label initialization. Label now immediately shows
  the provided value.
  ([067c1c8](https://github.com/dynatrace-oss/barista/commit/067c1c8ef2578a0d46c7c4b276145cd01633a17c))
- **link:** Adjust external link icon styling to prevent line-breaks.
  ([dc2071a](https://github.com/dynatrace-oss/barista/commit/dc2071abf601a89906d183f2dd03da1adaa0a33d))
- **select:** Fixes outline position within formfield.
  ([9a55d80](https://github.com/dynatrace-oss/barista/commit/9a55d804a2a6c6bbb8c00f1115b2fa7b49842c15))

## [10.3.0](https://github.com/dynatrace-oss/barista/compare/10.2.0...10.3.0) (2021-12-21)

### Bug Fixes

- **overlay:** Fixing overflow bug in overlay
  ([0da13cd](https://github.com/dynatrace-oss/barista/commit/0da13cd07613803cbf77e3e1ae23921e1c4e4ca5))

### Features

- **components:** Increase coverage of translatable messages.
  ([ac5320f](https://github.com/dynatrace-oss/barista/commit/ac5320f51244c13026e1b2e580feeb27717dc382))
- **table:** Added experimental export as CSV functionality.
  ([9034a8b](https://github.com/dynatrace-oss/barista/commit/9034a8be7aec7b7e43f3a50f711c561015da8d4f))

## [10.2.0](https://github.com/dynatrace-oss/barista/compare/10.1.0...10.2.0) (2021-11-17)

### Bug Fixes

- **tooltip:** Fixed positioning of heatmaps tooltip.
  ([5b2e75f](https://github.com/dynatrace-oss/barista/commit/5b2e75f888bbfc7d14c00aea5f95044e6b9fccc7))

### Features

- **stacked-series-chart:** Adding heat fields
  ([a36cf83](https://github.com/dynatrace-oss/barista/commit/a36cf832170308e8a87db16d90f73d6e1530102c))

## [10.1.0](https://github.com/dynatrace-oss/barista/compare/10.0.0...10.1.0) (2021-11-03)

### Bug Fixes

- **formatters:** Fixes range-selection date formatting.
  ([7a8173b](https://github.com/dynatrace-oss/barista/commit/7a8173b56ac9ec46c2dc8c54e307434bed35acf8))

### Features

- **formatters:** Use binary bytes prefixes for bytes formatted using binary
  factor.
  ([5ab0ffb](https://github.com/dynatrace-oss/barista/commit/5ab0ffb9c2664014f025ba9ccbd7594f1b47f888))
- **stacked-series-chart:** Adding continuous axis and improve scrollability
  ([d153797](https://github.com/dynatrace-oss/barista/commit/d1537972192e83cbc1f119f899dad185c89988af))

## [10.0.0](https://github.com/dynatrace-oss/barista/compare/9.13.1...10.0.0) (2021-10-27)

### Features

- **components:** Update d3-shape and d3-scale dependencies.
  ([128b0c5](https://github.com/dynatrace-oss/barista/commit/128b0c533e4eeecfad59bbaf3c01f35016f50374))
- **tag:** Add tag-add-form for custom forms.
  ([253a065](https://github.com/dynatrace-oss/barista/commit/253a065043167a2cab76223256255ceea48ff40e))

### BREAKING CHANGES

- Update all Angular packages to version 12 and switched library compilation to
  parital ivy according to
  [angulars recommendation](https://angular.io/guide/creating-libraries#transitioning-libraries-to-partial-ivy-format)
- Updated peerDependency d3-shape from ^1.3.5 to ^3.0.1
- Updated peerDependency d3-scale from ^3.0.0 to ^4.0.0
- **stacked-series-chart:** Added `Platform` as a required contructor parameter.
- **tag:** The `DtTagAdd` class now requires `NgZone` within it's contructor.
- **tag:** Removed `dt-tag-add-form` compont. It is no longer required to wrap
  your custom form into a `dt-tag-add-form`. Pass the form as a content child
  directly to the `dt-tag-add` component.
- **tag:** Removed `tagAdded` output on the `dt-tag-add` component. The
  `submitted` output now emits for the default and for custom forms.
- **table:**: Adjusted `DtTable` constructor to match CDK.
- **tree-table:**: Adjusted `DtTreeTable` constructor to match CDK.

## [9.13.1](https://github.com/dynatrace-oss/barista/compare/9.13.0...9.13.1) (2021-10-12)

### Bug Fixes

- **table:** Fix an animation memory leak in the expandable row.
  ([5324252](https://github.com/dynatrace-oss/barista/commit/53242523c006b912ccc91ea2a4930c1c5f308890))

## [9.13.0](https://github.com/dynatrace-oss/barista/compare/9.12.0...9.13.0) (2021-10-05)

### Features

- **chart:** Added support on tooltip services for heatmap.
  ([aed7dc4](https://github.com/dynatrace-oss/barista/commit/aed7dc44c4c2e021e63001c316201b9de1181df1))

## [9.12.0](https://github.com/dynatrace-oss/barista/compare/9.11.0...9.12.0) (2021-09-30)

### Bug Fixes

- **button:** Fixes anchor button disabled styles not being applied on visited
  links.
  ([05e6248](https://github.com/dynatrace-oss/barista/commit/05e6248447b0fa776fc336309484f6abf72e2d86))
- **inline-editor:** Move the error-state hints to a cdk overlay to escape
  overflow handling.
  ([3a499eb](https://github.com/dynatrace-oss/barista/commit/3a499eb4505d0ad51b9382248cbc8831601cd882))
- **table:** Fixes an issue where the global selection checkbox was wrongfully
  checked on empty tables.
  ([ec28e83](https://github.com/dynatrace-oss/barista/commit/ec28e83a1f5aa4f3f07dc942689390af10fdce1b))

### Features

- **filter-field:** Adding multiselect capabilities to complex filter type.
  ([69351d5](https://github.com/dynatrace-oss/barista/commit/69351d5757ecb3593db040b9622c3abee45a64b3))
- **icon:** Remove log for missing loading resources.
  ([5c5e4f3](https://github.com/dynatrace-oss/barista/commit/5c5e4f38d433893f8090e2a93ec986cd4b66f85a)),
  closes [#2172](https://github.com/dynatrace-oss/barista/issues/2172)

## [9.11.2](https://github.com/dynatrace-oss/barista/compare/9.11.1...9.11.2) (2021-09-15)

### Bug Fixes

- **filter-field:** Fixes an issue where the filter-changes event instead of the
  current-filter-change event is emitted when editing a free-text.
  ([447e8a2](https://github.com/dynatrace-oss/barista/commit/447e8a2ea7c60f1fd5d5bc8acbc543927ef640ae))

## [9.11.1](https://github.com/dynatrace-oss/barista/compare/9.11.0...9.11.1) (2021-09-08)

### Bug Fixes

- **filter-field:** Export validator type.
  ([bd3bf23](https://github.com/dynatrace-oss/barista/commit/bd3bf23aa4627c318e340655d6a9d95df03f2d92))
- **filter-field:** Fixes an issue where the current-filter-change event was
  emitted incorrectly when editing a free-text.
  ([940b3c0](https://github.com/dynatrace-oss/barista/commit/940b3c017f363b635aa745957aa5cbecf38292af))
- **filter-field:** Fixes an issue where the input showed "[object Object]" when
  editing a free text selected via a suggestion.
  ([a1e002e](https://github.com/dynatrace-oss/barista/commit/a1e002ebd3c422a4bd677d2a21bfbd940f8100c6))
- **icon:** Adds recovered color styles.
  ([cd179e7](https://github.com/dynatrace-oss/barista/commit/cd179e76c757ef03d1fb8e538846610cc84c6936))
- **quickfilter:** Fixes z-index issues with the error message.
  ([9842e44](https://github.com/dynatrace-oss/barista/commit/9842e445e07bd2b731677ab6a374af7220e0ae41))

## [9.11.0](https://github.com/dynatrace-oss/barista/compare/9.10.0...9.11.0) (2021-08-25)

### Bug Fixes

- **chart:** Fixed chart selection area focus.
  ([7ef96a5](https://github.com/dynatrace-oss/barista/commit/7ef96a56f83be44874e88113ce57ee580259ef55))
- **event-chart:** Fix overlap for multiple elements
  ([e15882c](https://github.com/dynatrace-oss/barista/commit/e15882ca228844f149f4417e69fb22efb1ff860d))
- **filter-field:** Fix multiselect apply button disabled
  ([00a2911](https://github.com/dynatrace-oss/barista/commit/00a29117ce3977929e632280123ec278934e24e8))
- **filter-field:** Multiselect with programmatically defined filters is not
  stable
  ([54a56e3](https://github.com/dynatrace-oss/barista/commit/54a56e3d04bb95ff53087698f9326c3ce91f4007))
- **workspace:** Remove codeowner.
  ([0630758](https://github.com/dynatrace-oss/barista/commit/063075858b3469ab01bcf28d5deabe4bcb5b42b1))

### Features

- **chart:** Added series heatmaps options to dt chart series type
  ([8b95369](https://github.com/dynatrace-oss/barista/commit/8b95369993345fed442eac1bc407d4b975191b00))
- **filter-field:** Add disable state to the option without group
  ([d25f2ad](https://github.com/dynatrace-oss/barista/commit/d25f2adce2a2d0523f55f4dde6a9371145f7b0df))
- **filter-field:** Prefills text of first level freeText node on edit
  ([089f301](https://github.com/dynatrace-oss/barista/commit/089f301130b1214e257b705ab42aa79c20119794))

## [9.10.0](https://github.com/dynatrace-oss/barista/compare/9.9.0...9.10.0) (2021-07-28)

### Features

- **dt-tag-add:** Added custom button and form title
  ([6ee6f25](https://github.com/dynatrace-oss/barista/commit/6ee6f253f60f0d62b1d8c1d94323637e601b136a))

## [9.9.0](https://github.com/dynatrace-oss/barista/compare/9.8.0...9.9.0) (2021-07-20)

### Bug Fixes

- **filter-field:** Fixes the async example when using freeText
  ([b26def9](https://github.com/dynatrace-oss/barista/commit/b26def9b0b0d93d82044d410e69f6a0a3c710f1b))
- **filter-field:** Multiselect keyboard interaction not working correctly
  ([f599832](https://github.com/dynatrace-oss/barista/commit/f599832c18a8c9f75cc7c0faf032002ca544fa67))
- **quick-filter:** Give the radio and checkbox in the quickfilter space for
  their focus styles.
  ([af124f5](https://github.com/dynatrace-oss/barista/commit/af124f5aa394b2dc65093d9b00fa0757f19d391f))
- **quick-filter:** Trigger resize event when sidebar open state changes.
  ([d1b1e70](https://github.com/dynatrace-oss/barista/commit/d1b1e70d9080745b9d4615d23deb982fc43956a6))

### Features

- **filter-field:** Added partial hint message flexible configuration
  ([5b615de](https://github.com/dynatrace-oss/barista/commit/5b615dec33f61f104f4114f348c32968eb9eb24c))
- **icon:** Retry loading hiccup resources.
  ([266afc5](https://github.com/dynatrace-oss/barista/commit/266afc56ed45744e880a73431c6fa13c79d823bf))
- **stacked-series-chart:** Show highest value in Y axis.
  ([4c34219](https://github.com/dynatrace-oss/barista/commit/4c34219fa6927275e226ac8e494ded7cc0b9a400))

## [9.8.1](https://github.com/dynatrace-oss/barista/compare/9.8.0...9.8.1) (2021-06-07)

### Bug Fixes

- **context-dialog:** Fixes flexible dimensions being applied correctly.
  ([dc405c8](https://github.com/dynatrace-oss/barista/commit/dc405c8a0d2711aafccab6b726b9ced053d5bea7))

## [9.8.0](https://github.com/dynatrace-oss/barista/compare/9.7.0...9.8.0) (2021-06-02)

### Bug Fixes

- **sort:** Fix default table sorting when the sort direction is set. Closes
  APM-305714.
  ([37e5cab](https://github.com/dynatrace-oss/barista/commit/37e5cab233ab006a2fed9530559f704039d1b8d2))

### Features

- **overlay:** Adds pinnedChanged output and isOverlayPinned property.
  ([bbadf67](https://github.com/dynatrace-oss/barista/commit/bbadf67ed965dd72dfb3b26290588b37ce6ad2aa))
- **stacked-series-chart:** Adding auto scrolling on horizontal overflow for
  column mode
  ([7432a29](https://github.com/dynatrace-oss/barista/commit/7432a29724dc5415f58d2f0fd2980b1e8744035f))
- **theming:** Add critical color to theme. Closes APM-304694.
  ([2537701](https://github.com/dynatrace-oss/barista/commit/2537701831a6b7cb57cf6cccf010915647766e95))

## [9.7.0](https://github.com/dynatrace-oss/barista/compare/9.6.0...9.7.0) (2021-05-31)

### Bug Fixes

- **event-chart:** Fixes various issues with the legend and heatfields.
  ([c617d0a](https://github.com/dynatrace-oss/barista/commit/c617d0a1daa0b90c6e657da42b135702be22ff73))
- **filter-field:** Fixing default checked options in multiselect dropdown.
  ([ec5b53e](https://github.com/dynatrace-oss/barista/commit/ec5b53e3b4e4b8b1181e68ae4b57f3e085730023))
- **stacked-series-chart:** Fixes the initial display of the Y axis.
  ([a3ed931](https://github.com/dynatrace-oss/barista/commit/a3ed931ed14f0e47a33dd7e26eab73109513e8bc))

### Features

- **filter-field:** Adding 'disabled' handling for multiselect options.
  ([c8d61aa](https://github.com/dynatrace-oss/barista/commit/c8d61aa5d5f255877db5d2c055e15749ca49ab07))
- **filter-field:** Display a hint when partial options are loaded.
  ([f08b4a9](https://github.com/dynatrace-oss/barista/commit/f08b4a914008fd2f96a06c9b3e28bb3790f04bfb)),
  closes
  [#APM-277597](https://github.com/dynatrace-oss/barista/issues/APM-277597)
- **sunburst-chart:** Added hover output for slices.
  ([4e23408](https://github.com/dynatrace-oss/barista/commit/4e23408132d04d3abf4b8f2476cc042c13205e97))
- **tag:** Add tag-add-form for custom forms.
  ([757b4b1](https://github.com/dynatrace-oss/barista/commit/757b4b157c0af9b997f9991e985e353379f738ba))

## [9.6.0](https://github.com/dynatrace-oss/barista/compare/9.5.0...9.6.0) (2021-05-10)

### Bug Fixes

- **filter-field:** Improving multiselect uid generation and clearing selected
  list on delete.
  ([94ffa9a](https://github.com/dynatrace-oss/barista/commit/94ffa9a4b60d7dcf359553c736f277e50db7ac25))

### Features

- **radial-chart:** Added series-specific hover output for pie & legend.
  ([87268d8](https://github.com/dynatrace-oss/barista/commit/87268d8fe93ef60aabf8a3ed519f2f40b0f241b7))
- **stacked-series-chart:** Added hover output for stacks & legend.
  ([70a298a](https://github.com/dynatrace-oss/barista/commit/70a298a806fb6826428ddd55c0d7f24e69171a44))

## [9.5.0](https://github.com/dynatrace-oss/barista/compare/9.4.3...9.5.0) (2021-05-04)

### Bug Fixes

- **filter-field:** Export EditionParser from module.
  ([477802e](https://github.com/dynatrace-oss/barista/commit/477802eb9f886ba7b4bd97273f02b7075f563b82))
- **overlay:** Fixes an issue where multiple overlay container were created when
  lazyloading the module.
  ([b9f2e10](https://github.com/dynatrace-oss/barista/commit/b9f2e10c0d07ab97dcc1d71b8bc653c88d051047))
- **stacked-series-chart:** Mark series selected given outside series object
  ([92c40cd](https://github.com/dynatrace-oss/barista/commit/92c40cdfbe20c5cc8d7d77e3884af022523bdfe2))
- **stepper:** Fixes an issue where active stepper icon was oddly shaped.
  ([f65bae4](https://github.com/dynatrace-oss/barista/commit/f65bae49a8ea6f2883aefada63c6a0d124d979c2))
- **tag:** Fixes an issue with the aria roles on the tag-list.
  ([fe15ef4](https://github.com/dynatrace-oss/barista/commit/fe15ef446d25fb0d72d249803d87d9c298e9a429))
- **tree-table:** Fixes an issue where aria-level should start counting at 1.
  ([94440e1](https://github.com/dynatrace-oss/barista/commit/94440e1207e71594b0fd134613dbeeacc7cb381a))

### Features

- **event-chart:** APM-295388 Implemented "heatfield" into event-chart
  ([73219a8](https://github.com/dynatrace-oss/barista/commit/73219a8d6ea3cba6ee82d9a032f2fb984d11d8d8))
- **filter-field:** Added possibility to disable autocomplete option.
  ([a81cdcc](https://github.com/dynatrace-oss/barista/commit/a81cdcc6edd61b00750ec48c9055a80621693707))
- **sunburst-chart:** Exposing sunburst node data in tooltip config.
  ([1fb9c13](https://github.com/dynatrace-oss/barista/commit/1fb9c13a8fb16a78827d18a449a0a824b6aa6138))

## [9.4.3](https://github.com/dynatrace-oss/barista/compare/9.4.2...9.4.3) (2021-04-21)

### Bug Fixes

- **confirmation-dialog:** Fixes an issue with blocking space above the
  confirmation dialog.
  ([c6a15bb](https://github.com/dynatrace-oss/barista/commit/c6a15bb68611d6c6f6284844187de01c7d618a97))
- **context-dialog:** Fixes an overflow issue with long content when positioning
  moved to bottom.
  ([c84fac5](https://github.com/dynatrace-oss/barista/commit/c84fac5b2bec56f9a4faf0c66c466646257cf3ee))
- **table:** Fixes an issue with rapid unsubscription if the dtOrder is
  immediately destroyed.
  ([9dbf1a2](https://github.com/dynatrace-oss/barista/commit/9dbf1a2f816cc4cd8212ced6c54ea2fb2c2fa106))

### Performance Improvements

- **pagination:** Loops in the dt-pagination are now trackedBy for better
  performance.
  ([a312ea2](https://github.com/dynatrace-oss/barista/commit/a312ea29bc6c984cbe1925e6f521e3befbe5602f))

## [9.4.2](https://github.com/dynatrace-oss/barista/compare/9.4.1...9.4.2) (2021-04-14)

### Bug Fixes

- **select:** Remove scrollIntoView on hover, which caused endless scrolling in
  edge cases with zoom enabled.
  ([ac82efb](https://github.com/dynatrace-oss/barista/commit/ac82efba525e1acbd898da3e5ca1258c1e3bf09c))

## [9.4.1](https://github.com/dynatrace-oss/barista/compare/9.4.0...9.4.1) (2021-04-07)

### Bug Fixes

- **context-dialog:** Fixes an issue that the default behavior of the context
  dialog changed to not have a maxWidth assigned anymore. **Be aware that this
  reverts to a maxWidth of 328px for the overlay. If you need to have an overlay
  without a maxWidth that grows with its content - provide a
  `maxWidth: undefined` inside the `DT_CONTEXT_DIALOG_CONFIG` token.**
  ([ad40a85](https://github.com/dynatrace-oss/barista/commit/ad40a85260afbd417175d52adcfcf6cf899baba1))

## [9.4.0](https://github.com/dynatrace-oss/barista/compare/9.3.2...9.4.0) (2021-04-02)

### Bug Fixes

- **overlay:** Overlays get stuck open due to
  [#2037](https://github.com/dynatrace-oss/barista/issues/2037).
  ([c142ddf](https://github.com/dynatrace-oss/barista/commit/c142ddf3d1b6e4ef72a8897de184ddbf63a1f66a))

### Features

- **quick-filter:** Expose customTagParser input.
  ([e4fb2e3](https://github.com/dynatrace-oss/barista/commit/e4fb2e3ec2acbb5849ca1baacbe57b0f66100d28))

## [9.3.2](https://github.com/dynatrace-oss/barista/compare/9.3.1...9.3.2) (2021-03-30)

### Bug Fixes

- **breadcrumbs:** Fixes an issue with breadcrumbs and browser zoom level.
  ([29d435a](https://github.com/dynatrace-oss/barista/commit/29d435ab17ac8c142cfec856cce591d6417da6cd))
- **filter-field:** Avoid duplicity for multiselect edit mode.
  ([43305d7](https://github.com/dynatrace-oss/barista/commit/43305d725bd73e4a890b70979add2fa447e692cf))
- **filter-field:** Fixes the defaultSearch not being displayed anymore
  ([a2e1f32](https://github.com/dynatrace-oss/barista/commit/a2e1f32e93b0f53eac0791e0aa0591798eb6236c))
- **key-value-list:** Adds a zero-width white space to split the key from the
  value.
  ([918cf72](https://github.com/dynatrace-oss/barista/commit/918cf72ba7bf43e05c2c1103fd1fe5a9e6b18d1a))
- **overlay:** Fixes an issue with the overlay origin positioning.
  ([5c60e29](https://github.com/dynatrace-oss/barista/commit/5c60e294c64e6439b0305b25c370536eba366d10))
- **overlay:** Overlay never reopens if closed via scrolling.
  ([c241eaa](https://github.com/dynatrace-oss/barista/commit/c241eaaf85b3890e4eed4114b0cf649393d72852))
- **sunburst-chart:** Solving object comparison for initial selection.
  ([d8d72dd](https://github.com/dynatrace-oss/barista/commit/d8d72dd8311bec988c3e6075ab98fe216194440a))
- **table:** Fixes an issue where the expandable row did not clean up after
  itself.
  ([80c6477](https://github.com/dynatrace-oss/barista/commit/80c64774cf5dcb82f3a5dbf5e86d29cbb40c99eb))
- **table:** Fixes an issue where the inital search value was not applied to the
  filter.
  ([ef4f95f](https://github.com/dynatrace-oss/barista/commit/ef4f95fbff10db7571a627f4afb5401985cfe2cc))
- **workspace:** Update husky configuration for husky5.
  ([a0599ab](https://github.com/dynatrace-oss/barista/commit/a0599abe00d98d701ab415c8febe16733a25e7c4))

## [9.3.1](https://github.com/dynatrace-oss/barista/compare/9.3.0...9.3.1) (2021-03-17)

### Bug Fixes

- **quick-filter:** Fixes tracking issue for programmatically set filters by
  adding an id to the DefaultDataSource.
  ([01c2dec](https://github.com/dynatrace-oss/barista/commit/01c2dec831c6f5de769c1fc7423d04ca8979da67))

## [9.3.0](https://github.com/dynatrace-oss/barista/compare/9.2.0...9.3.0) (2021-03-05)

### Bug Fixes

- **context-dialog:** Fixes an issue that the scroll container of the
  context-dialog did not properly resize for large content.
  ([63d06b7](https://github.com/dynatrace-oss/barista/commit/63d06b7041d0a82431374e0d8a4d1c34b93b5d6b))
- **filter-field:** Fixes freeTexts set as defaultSearch and unique.
  ([00532db](https://github.com/dynatrace-oss/barista/commit/00532db76441469995686d5c917be719a06e2df8))

### Features

- **filter-field:** Allow freeText suggestions to be async.
  ([73bdeea](https://github.com/dynatrace-oss/barista/commit/73bdeea2ee5529381b69652b0c4eddb73be24ae2))
- **filter-field:** Allow partial suggestions for async multiselect.
  ([b916dab](https://github.com/dynatrace-oss/barista/commit/b916dab8690c572277964f3305e7284bb28efde8))

## [9.2.0](https://github.com/dynatrace-oss/barista/compare/9.1.0...9.2.0) (2021-02-23)

### Bug Fixes

- **combobox:** Fixes an issue with the arrow positioning on safari.
  ([a3f2535](https://github.com/dynatrace-oss/barista/commit/a3f25352e67c48b124a6999ec8dd299820216bf4))
- **expandable-section:** Fixes an issue where toggling the expandable section
  was triggering a form submission.
  ([8388bd0](https://github.com/dynatrace-oss/barista/commit/8388bd02875e436bbe8ab26c006edada49a4a5cb))
- **filter-field:** Improving isOptionSelected method for async values.
  ([8e352fa](https://github.com/dynatrace-oss/barista/commit/8e352fa61173307a56b42c1646ee33c18e17cc73))
- **filter-field:** Fixes jumping of filters when the edit state changes.
  ([54dff6e](https://github.com/dynatrace-oss/barista/commit/54dff6e11eff75001c30bc44f8c42f5de77d1d3d))
- **quick-filter:** Fixes default search in the quick-filter
  ([69cd791](https://github.com/dynatrace-oss/barista/commit/69cd79147c87382c433b92b5106806a0bf9d0be5))
- **radial-chart:** Display of rounded percentage with precision
  ([d08b808](https://github.com/dynatrace-oss/barista/commit/d08b8085643ce3461b90f3804eb369bd9459a4eb))
- **stacked-series-chart:** Clearing selection when using stack mode.
  ([87764fa](https://github.com/dynatrace-oss/barista/commit/87764fa074d03ccc9cf02be735fadf1f6077c663))
- **stacked-series-chart:** Show stack mode tooltip highlight + proper fix of
  console error on init.
  ([70ba2b7](https://github.com/dynatrace-oss/barista/commit/70ba2b75323bb2c63e0ba3cb8aeb49fa93f26ead))

### Features

- **filter-field:** Adds navigation via arrow keys over current filter tags
  ([c24b85c](https://github.com/dynatrace-oss/barista/commit/c24b85cc6cb5d9f6aa99ea98c4f91eb36519fa88))
- **tile:** Added warning color to tile component
  ([ad1b1e6](https://github.com/dynatrace-oss/barista/commit/ad1b1e662a51a1c58b2a8b3101e7a2a190cb74e2))

## [9.1.0](https://github.com/dynatrace-oss/barista/compare/9.0.0...9.1.0) (2021-02-09)

### Bug Fixes

- **breadcrumbs:** Fixes an ExpressionChangedAfterChecked error on the
  breadcrumbs in non OnPush environments.
  ([f8d173e](https://github.com/dynatrace-oss/barista/commit/f8d173e8150e1fb8b10f9dc86d4c82518bc37486))
- **filter-field:** Fixes and issue where users could interact with other
  filters while editing one. The other filters will now be disabled.
  ([eeafe6c](https://github.com/dynatrace-oss/barista/commit/eeafe6c6796c3ac381810ef80701384e3c098c36))
- **filter-field:** Handling asynchronous fetching for multiselect fields.
  ([896617e](https://github.com/dynatrace-oss/barista/commit/896617e889f847f1f289d0f77c408e150476ceaf))
- **filter-field, quick-filter:** Fixes an issue when removing a filter while in
  edit mode for another one caused an error in the filter-field.
  ([9533c0e](https://github.com/dynatrace-oss/barista/commit/9533c0e1d38864301388ab2cf1e641aee01c5013))
- **stacked-series-chart:** Temporarily fixes an issue where this component
  would throw an assertion error in certain cases.
  ([4c47dae](https://github.com/dynatrace-oss/barista/commit/4c47dae926aa0d1a34c7cbe0620e867b1772784e))
- **table:** Fixes an issue with partial keyframes on expandable row.
  ([bb02100](https://github.com/dynatrace-oss/barista/commit/bb02100dac2a98a71a6ad079cab1ca1072a037a9))
- **table:** Fixes an issue with the expandable row flashing when paginating a
  table.
  ([2f106ff](https://github.com/dynatrace-oss/barista/commit/2f106ff95a67bd899d290f872d76f23705615f32))
- **theming:** Fixes an issue with out of sync recovered colors.
  ([56f4005](https://github.com/dynatrace-oss/barista/commit/56f400515259450f9b38764bd63d88ee3eabf8dc))

### Features

- **core,table:** Introduces a new sorting behaviour which treats undefined/null
  values in number compares as ASC first/DESC last.
  ([7ae439d](https://github.com/dynatrace-oss/barista/commit/7ae439ddfd3ac4ed61011c6ab3aa952dcd76e66a))
- **filter-field:** Adds a default search option for increased filtering speed.
  ([43f9d7a](https://github.com/dynatrace-oss/barista/commit/43f9d7a04896b6ebf1b3f55e973228803593415a))

## [9.0.0](https://github.com/dynatrace-oss/barista/compare/8.11.0...9.0.0) (2021-02-01)

This release includes an upgrade to all Angular packages to v11. Typescript was
also upgraded to a minimum of 4.0.5 and the library now works inside projects
using the new typescript version.

### BREAKING CHANGES

- **autocomplete:** An injected `DtViewportResizer` is now required for the
  selection-area component.
- **autocomplete:** The injected `NgZone` is now required for the autocomplete
  component.
- **breadcrumbs:** Add properties needed for responsive breadcrumbs to the
  constructor.
- **button-group:** The `selected` property has been removed. Please use
  `checked` instead.
- **button-group:** The `selectionChange` event has been removed. Please use
  `checkedChange` instead.
- **button-group:** The `DtButtonGroupItemSelectionChange` interface has been
  removed. Please use `DtButtonGroupItemCheckedChange` instead.
- **drawer:** An injected `ChangeDetectorRef` is now required for the drawer
  component.
- **filter-field:** An injected `DtViewportResizer` is now required for the
  filter-field component.
- **linting:** Removed deprecated library which provided custom barista linting
  rules.
- **option:** An injected `NgZone` is now required for the option component.
- **radio:** The field `disabled` in `DtRadioButtonBase` has been changed to a
  property to avoid an error with TypeScript 4 (see
  https://github.com/microsoft/TypeScript/pull/37894).

### Bug Fixes

- **chart:** Fixes an issue where tooltipDataChange event did not carry tooltip
  data.
  ([d482ef5](https://github.com/dynatrace-oss/barista/commit/d482ef5d431bef01414c9aed493b7bac20daa47d))
- **quick-filter:** Fix truncation.
  ([eba5df1](https://github.com/dynatrace-oss/barista/commit/eba5df114efd7f052f188963962f2fb73c381984))
- **slider:** Fixes an issue with the change event of the input bleeding to the
  root component.
  ([788ec62](https://github.com/dynatrace-oss/barista/commit/788ec62927d38a1534d071c58bd7859ae42b6807))
- **sunburst-chart:** Fix tooltip flicker on click
  ([cd61537](https://github.com/dynatrace-oss/barista/commit/cd61537cc2891b4c67e0bd8ae48d9440fa7a1c75))
- **theming:** Fixes an issue with mismatching colors in the error palette.
  ([5fb1888](https://github.com/dynatrace-oss/barista/commit/5fb188897cd0602f2f07f67e9b85f1bc4ca1c0aa))
- **theming:** Fixes an issue with mismatching colors in the warning palette.
  ([839f619](https://github.com/dynatrace-oss/barista/commit/839f619592080280a86e3a458f0221af99b07d1e))

### Features

- **autocomplete:** Added paged keyboard scrolling for autocomplete.
  ([2804a85](https://github.com/dynatrace-oss/barista/commit/2804a8518df8aa62cbadc73866e4494df099df17))
- **breadcrumbs:** Introduce responsive behavior.
  ([0ce1b0d](https://github.com/dynatrace-oss/barista/commit/0ce1b0dca5207a2d1340cfa80c8dcae7aab11c15))
- **datepicker:** Add min and max limits to the timepicker/timeinput + disable
  cursor on disabled dates and update readme.
  ([46edd75](https://github.com/dynatrace-oss/barista/commit/46edd75f9417a5ea923a3e5716fe12a5bd53b44b))
- **filter-field:** Added custom parser for a incomplete input
  ([de69b3d](https://github.com/dynatrace-oss/barista/commit/de69b3d58acf2fa3d69accc48ad7dd0e7540959b))
- **stacked-series-chart:** Add compact mode.
  ([48cc0f1](https://github.com/dynatrace-oss/barista/commit/48cc0f1473fe5cd6d67d62f9966978751400b1a0))
- **stacked-series-chart:** Added selection mode for entire row.
  ([4306fbf](https://github.com/dynatrace-oss/barista/commit/4306fbf6f99aa9b1ea8a2cf1c953a17e527c29fb))
- **sunburst-chart:** Improving view for small screens.
  ([7087662](https://github.com/dynatrace-oss/barista/commit/7087662c9a294853c9ea3070bc2142b7b0b3ba13))

## [8.11.0](https://github.com/dynatrace-oss/barista/compare/8.10.0...8.11.0) (2021-01-12)

### Bug Fixes

- **chart:** Added DtPlotBackgroundInfo to exported interfaces.
  ([36f5439](https://github.com/dynatrace-oss/barista/commit/36f5439a6c55166e4e1a0b6f7b271d1eaf0c790d))
- **quick-filter:** Fixes an issue with initial display of active items in the
  sidebar.
  ([45e4ff4](https://github.com/dynatrace-oss/barista/commit/45e4ff407b9371ac683cdcb6bd0aa81f4bde6e87))
- **tabs:** Fixes an issue where theme custom properties were not applied
  correctly.
  ([aab8675](https://github.com/dynatrace-oss/barista/commit/aab8675041c1174ef577c4425dbe194e734c5be4))

### Features

- **filter-field:** Added multiselect feature for autocompletes.
  ([c29db10](https://github.com/dynatrace-oss/barista/commit/c29db108661327b082c032ecbad87bc82864bdcf))

## [8.10.0](https://github.com/dynatrace-oss/barista/compare/8.9.0...8.10.0) (2021-01-04)

### Bug Fixes

- **combobox:** Fixes an issue where an exception was thrown when loading was
  true initially.
  ([4bf5d50](https://github.com/dynatrace-oss/barista/commit/4bf5d50545d2af6f3e7d64defd1af5fcaed1bf9a))

### Features

- **filter-field:** Added interaction state handling and notification.
  ([93f402f](https://github.com/dynatrace-oss/barista/commit/93f402fb58dbb86580c0e3ecf182dc8c3600e5a6)),
  closes [#1321](https://github.com/dynatrace-oss/barista/issues/1321)

## [8.9.0](https://github.com/dynatrace-oss/barista/compare/8.8.0...8.9.0) (2020-12-14)

### Bug Fixes

- **quick filter:** Always show selected options in the quickfilter.
  (APM-266050)
  ([e1c9a42](https://github.com/dynatrace-oss/barista/commit/e1c9a42fb136fc723764772736985a0cea28e68f))
- **radial-chart:** Set the correct cursor for selectable parts.
  ([1ab935b](https://github.com/dynatrace-oss/barista/commit/1ab935bc603419f57616454bb0e85706a60a68df))

### Features

- **core:** Adjusted warning, error and recovered colors to be more accessible.
  ([1fc35fa](https://github.com/dynatrace-oss/barista/commit/1fc35faa34640ca9dd13c00647762883282f34d1))
- **table, tree-table:** Increased width of row indicator to improve visibility.
  ([f5db806](https://github.com/dynatrace-oss/barista/commit/f5db806e8bbf01e62b5328de61711f06a22c767c))

## [8.8.0](https://github.com/dynatrace-oss/barista/compare/8.7.0...8.8.0) (2020-12-11)

### Bug Fixes

- **chart:** Fixes an edge case where the event data from highcharts could be
  undefined.
  ([a2f485a](https://github.com/dynatrace-oss/barista/commit/a2f485a5740e6d2c7de7717569388492f6d198b7))
- **checkbox:** Removes outside spacing on the right of the label.
  ([b5f4e80](https://github.com/dynatrace-oss/barista/commit/b5f4e80cb1fe15a077fa242e8213749e71e0f712))
- **combobox:** Fixes an issue with programmatic setting of the value to null.
  ([d457785](https://github.com/dynatrace-oss/barista/commit/d4577852d1029ce6577eba4965a7c8eed61fc9a5))
- **consumption:** Added ariaLabelProgress to the consumption.
  ([5a10dc0](https://github.com/dynatrace-oss/barista/commit/5a10dc0843981f9ef299bf95a8d8db70385b9b46))
- **context-dialog:** Fixes a weird combination of our interal overlayConfig and
  how the cdk handles a maxWidth given in the config.
  ([c22b6ca](https://github.com/dynatrace-oss/barista/commit/c22b6cab75f8fdb35c2911fdc21eeb39bab1f277))
- **drawer:** Fixes an issue where changeDetection was not triggered.
  ([41e898a](https://github.com/dynatrace-oss/barista/commit/41e898ad450f47343ba994174370989ce86f77b1))
- **event-chart:** Added aria-label to rendered event bubble.
  ([e86b5e3](https://github.com/dynatrace-oss/barista/commit/e86b5e36495e50143e88c8bdc4f576afb4327abf))
- **expandable-section:** Fixes an issue where nesting expandable sections
  resulted in wrong visual state.
  ([79bd478](https://github.com/dynatrace-oss/barista/commit/79bd478d544a6e240a10e6625d3e27bac38c5c9d))
- **micro-chart:** Add loading-text proxy to the chart.
  ([6d954fd](https://github.com/dynatrace-oss/barista/commit/6d954fd02e7c192558b4b1cf3d81a96327850f82))
- **quickfilter:** Adds truncation to checkbox and radio labels inside the
  quickfilter to avoid overflow issues with long labels.
  ([28d61f6](https://github.com/dynatrace-oss/barista/commit/28d61f671fc59a297d09026399cbceeaa924fd5c))
- **table:** Fixes an issue with a ViewContainer error on destroy.
  ([36728ee](https://github.com/dynatrace-oss/barista/commit/36728ee9b6327c3c21dfbaf11f53dd840eb962d7))

### Features

- **datepicker:** Added experimental datepicker component.
  ([be6a0e0](https://github.com/dynatrace-oss/barista/commit/be6a0e0721f1cb88f39ae9aea6b5e23e9325a1f0)),
  closes [#894](https://github.com/dynatrace-oss/barista/issues/894)
- **form-field:** Switched theming to custom properties.
  ([68f312b](https://github.com/dynatrace-oss/barista/commit/68f312b4871b4af9ecae68836e09f25f216657f6))
- **highlight:** Switched theming to custom properties.
  ([7b6f8f2](https://github.com/dynatrace-oss/barista/commit/7b6f8f24d59f45bf88e129ba4661f533bf3880a7))
- **quick-filter:** Expose the filter-field loading through the quickfilter.
  ([c95b604](https://github.com/dynatrace-oss/barista/commit/c95b604c86ba00e334ff725bd440f70756c8b118))
- **table:** Changed theming of rows to custom properties.
  ([1b4749a](https://github.com/dynatrace-oss/barista/commit/1b4749a24a8be0589e2be96cca61e3be0c20fbd5))
- **tabs:** Switched theming to custom properties.
  ([e8e7484](https://github.com/dynatrace-oss/barista/commit/e8e7484b3f0c4bff2cf28183402659f56a9b408c))
- **toggle-button-group:** Switched theming to custom properties.
  ([253e192](https://github.com/dynatrace-oss/barista/commit/253e192123a03e8679361a0253468109f62373aa))

## [8.7.0](https://github.com/dynatrace-oss/barista/compare/8.6.0...8.7.0) (2020-11-30)

### Bug Fixes

- **chart:** Fixes an issue with the heatfield-sizing when resizing the chart.
  ([f4b9aa9](https://github.com/dynatrace-oss/barista/commit/f4b9aa9d6ba9e6b5cae02f499b4f51ad41e4ab26))
- **drawer:** Fixes an issue with inital rendering when open was not bound in
  the template.
  ([7f25e11](https://github.com/dynatrace-oss/barista/commit/7f25e11b3df1d30c7c79719591f9c08a2535d7aa))
- **drawer:** Fixes padding issue in drawer when initially closed.
  ([cab023f](https://github.com/dynatrace-oss/barista/commit/cab023fb9732f6cd31c0fe3b302716015f432b22))
- **quick-filter:** Fixes an issue with varying width of the quick-filter
  sidebar.
  ([c31e3fa](https://github.com/dynatrace-oss/barista/commit/c31e3fa2c863dee1314ebf039166827a33229465))
- **table:** Fixes an issue with the empty state not showing up without change
  detection.
  ([c078532](https://github.com/dynatrace-oss/barista/commit/c0785326a501d548460d6a0bb2f0fbce4f1210c3))

### Features

- **quick-filter:** Expose APIs to interact with the drawer.
  ([ebcbda1](https://github.com/dynatrace-oss/barista/commit/ebcbda1800387b0b8275b8a92541da18cf661176))

## [8.6.0](https://github.com/dynatrace-oss/barista/compare/8.5.0...8.6.0) (2020-11-25)

### Features

- **chart:** Adds a DtChartTooltipConfig to customize the positioning of the
  tooltip inside the chart.
  ([8c676d2](https://github.com/dynatrace-oss/barista/commit/8c676d2ceae7d10c0a153f8a284498823e5a0459))

## [8.5.0](https://github.com/dynatrace-oss/barista/compare/8.4.0...8.5.0) (2020-11-23)

### Bug Fixes

- **combobox:** Fixes an issue where the combobox flap did not close.
  ([a7e133b](https://github.com/dynatrace-oss/barista/commit/a7e133b5541b6b761207a3dc5cf066e01347da4d)),
  closes [#849](https://github.com/dynatrace-oss/barista/issues/849)
- **filter-field:** Fixes an issue where the filterChanges event was not
  triggered.
  ([bce1785](https://github.com/dynatrace-oss/barista/commit/bce17854413192e65a027a43dd78b56fbc5b4838))
- **filter-field:** Fixes an issue with confusing disabled styles.
  ([32ea19d](https://github.com/dynatrace-oss/barista/commit/32ea19d3c4cb0169d7662f9bc35d0181c25f4ec7))

### Features

- **indicator:** Added indicator theme 'recovered'.
  ([9b3e989](https://github.com/dynatrace-oss/barista/commit/9b3e989cc33f1d9168a399beba13190c80d2a9d9))
- **timepicker:** Added experimental timepicker and timeinput components.
  ([8784ec3](https://github.com/dynatrace-oss/barista/commit/8784ec397ca13049cbfbabc733db912b021883be))

## [8.4.0](https://github.com/dynatrace-oss/barista/compare/8.3.0...8.4.0) (2020-11-13)

### Bug Fixes

- **combobox:** Fixes an issue with the combobox where the initial value caused
  a change detection error.
  ([6de0373](https://github.com/dynatrace-oss/barista/commit/6de03732286cefd08d0ff141dde7419bf10aed02))
- **drawer:** Fixes an issue of width-drift when closing the drawer.
  ([0208470](https://github.com/dynatrace-oss/barista/commit/020847004c9f2c2d61f4518f2e7b2e3d37d9d4f3))
- **filter-field:** Fixes an issue with async data and programmatically set
  filters.
  ([64d6ace](https://github.com/dynatrace-oss/barista/commit/64d6ace0dab65034b02079f35cb9f877b9b309a7))
- **quick-filter:** Fixes an issue where a range could not be set in the filter
  field.
  ([960f078](https://github.com/dynatrace-oss/barista/commit/960f07865bcba0ff67fa2540570a162858ba7a21))

### Features

- **context-dialog:** Simplifies overriding the maxWidth of the overlay.You can
  now set the maxWidth as part of the DT_CONTEXT_DIALOG_CONFIG token and it will
  properly be reflected on the overlay.
  ([2c501b6](https://github.com/dynatrace-oss/barista/commit/2c501b67f3ee4cec0c62229761853980e9d6ed6b))
- **select:** Add custom template for selected value. You can now provide a
  custom template that will format the displayed selected value.
  ([7621940](https://github.com/dynatrace-oss/barista/commit/76219407070cb6d6c9f93233a0eaae0f7da81965))
- **table:** Don't show empty state while loading is active.
  ([9f0130a](https://github.com/dynatrace-oss/barista/commit/9f0130ae3e3936c8d5364a24a377b1c74702fd2d))

## [8.3.0](https://github.com/dynatrace-oss/barista/compare/8.2.0...8.3.0) (2020-11-09)

### Bug Fixes

- **formatters:** Fixes an issue with 0 edge-case in number format mode.
  ([a9c04aa](https://github.com/dynatrace-oss/barista/commit/a9c04aa4a173dde490a09926b6f468b4d376b56c))
- **quick-filter:** Fixes an issue where free-text could not be set in a
  quick-filter environment.
  ([2b36cdd](https://github.com/dynatrace-oss/barista/commit/2b36cdd948d0e2638bd6eca7340652b6f50fd06a))

### Features

- **icon, info-group:** Switch theming to css-custom-properties.
  ([df67f1e](https://github.com/dynatrace-oss/barista/commit/df67f1e32889c5e6995797e48718f9bace73a06d))

## [8.2.0](https://github.com/dynatrace-oss/barista/compare/8.1.0...8.2.0) (2020-10-29)

### Note

With this release the quickfilter component was moved from the experimental
package and becomes stable. All imports from
`@dynatrace/barista-components/experimental/quick-filter` need to be changed to
`@dynatrace/barista-components/quick-filter`. Thanks to everyone who helped
test, develop and provided feedback. Future changes for the quick-filter will
follow semantic versioning from now on.

### Bug Fixes

- **chart:** Fix dynamic heatfield generation that was not possible.
  ([796b9e9](https://github.com/dynatrace-oss/barista/commit/796b9e9dcc373f85f4e73719a9d4686287fa3062)),
  closes [#1580](https://github.com/dynatrace-oss/barista/issues/1580)
- **context-dialog:** Focuses the first tabbable element inside the overlay
  context instead of the last.
  ([8b83638](https://github.com/dynatrace-oss/barista/commit/8b836387bb3271a7605c2a22db1cd733d38791af))
- **event-chart:** Display human readable time
  ([819f1a8](https://github.com/dynatrace-oss/barista/commit/819f1a8384e3a418c3896dbefebca4af9127b691))
- **examples:** Bumps @angular/cdk from 10.1.1 to 10.2.4 which fixes the table's
  and tree-table's stackblitz issues due to a regression.
  ([0573542](https://github.com/dynatrace-oss/barista/commit/05735421b88672394a49a528e1ef015a8a870d93))
- **filter-field, autocomplete:** Fixes an issue that the panels did not react
  to viewport boundaries correctly.
  ([2aac52b](https://github.com/dynatrace-oss/barista/commit/2aac52bbd48a0c612defb662d5d4f580b49e5c78)),
  closes [#1747](https://github.com/dynatrace-oss/barista/issues/1747)
- **quick-filter:** Fixes a bug that didn't show any options when the view-more
  button was clicked.
  ([f96e3c5](https://github.com/dynatrace-oss/barista/commit/f96e3c5ba0397b982d2e6940384911e8425692bb))
- **option:** Fixes an issue with the scrollbar on firefox causing text to be
  cut short unintentionally.
  ([928ff1d](https://github.com/dynatrace-oss/barista/commit/928ff1dc7dcfe8098f7e8c26427c1d54d6855238))
- **tree-table:** Fixes the tree-table by reverting the changes causing unwanted
  behaviour of the text to expand on hover, back to overflow: hidden and
  text-overflow: ellipsis
  ([de61612](https://github.com/dynatrace-oss/barista/commit/de61612b9ba03c94160b304e25af3127d1c09b04))

### Features

- **quick-filter:** Move the quick filter component out of the experimental
  package.
  ([17ea085](https://github.com/dynatrace-oss/barista/commit/17ea085c85bc032343e45b9823a8b94f52c6c141))
- **radial-chart:** Makes the legend interactable.
  ([76afff4](https://github.com/dynatrace-oss/barista/commit/76afff44caecd4b8452835a3a1a7f4ec3fccc1c5))

## [8.1.2](https://github.com/dynatrace-oss/barista/compare/8.1.1...8.1.2) (2020-10-12)

### Bug Fixes

- **option:** Fixes an issue with the scrollbar on firefox causing text to be
  cut short unintentionally.
  ([cb38a50](https://github.com/dynatrace-oss/barista/commit/cb38a506f96ea2da0c9eb797a9f5e2d6398b5c34))

### Experimental Package ⚠️

- **quick-filter:** Add show more functionality to the quick-filter component
  and enable group handling in the data source.

## [8.1.1](https://github.com/dynatrace-oss/barista/compare/8.1.0...8.1.1) (2020-10-08)

### Bug Fixes

- **chart:** Fix dynamic heatfield generation that was not possible.
  ([796b9e9](https://github.com/dynatrace-oss/barista/commit/796b9e9dcc373f85f4e73719a9d4686287fa3062)),
  closes [#1580](https://github.com/dynatrace-oss/barista/issues/1580)
- **event-chart:** Display human readable time
  ([819f1a8](https://github.com/dynatrace-oss/barista/commit/819f1a8384e3a418c3896dbefebca4af9127b691))
- **tree-table:** Fixes the tree-table by reverting the changes causing unwanted
  behavior of the text to expand on hover, back to overflow: hidden and
  text-overflow: ellipsis
  ([ee6c28b](https://github.com/dynatrace-oss/barista/commit/ee6c28ba388215dfb24c2f00dfe5367907bfefeb))

## [8.1.0](https://github.com/dynatrace-oss/barista/compare/8.0.0...8.1.0) (2020-10-01)

### Bug Fixes

- **button-group:** Fix a regression that was introduced with the update to the
  new typescript version.
  ([a3b7382](https://github.com/dynatrace-oss/barista/commit/a3b7382e691f36d85984be4be381c13b0013c6da)),
  closes [#1577](https://github.com/dynatrace-oss/barista/issues/1577)
- **combobox:** Fix reset behaviour.
  ([f6742c2](https://github.com/dynatrace-oss/barista/commit/f6742c2c879c24c8c83252559d395c90152b4fbe))
- **filter-field:** Fixed UX problem where text that wasn't applied to the
  filter would remain after losing focus.
  ([a5af7fd](https://github.com/dynatrace-oss/barista/commit/a5af7fdf81cb878224522e793c184f5ef6fa638f))
- **filter-field:** Fixes an issue where custom tag parsers are not applied on
  filters set initially.
  ([ab5edc5](https://github.com/dynatrace-oss/barista/commit/ab5edc55bdecfc1c43146f63f9783bf93b59cdd4)),
  closes [#1591](https://github.com/dynatrace-oss/barista/issues/1591)
- **filter-field:** Fixes an issue where suggestions are not displayed in MS
  Edge.
  ([b88539b](https://github.com/dynatrace-oss/barista/commit/b88539bc47814ae7a15927645654300901d95b85)),
  closes [#1558](https://github.com/dynatrace-oss/barista/issues/1558)
- **filter-field:** Reverts a commit that introduced a bug when selecting
  suggestion values.
  ([dd08844](https://github.com/dynatrace-oss/barista/commit/dd08844f24ea710a6bb79fadfb114e627112c131)),
  closes [#1632](https://github.com/dynatrace-oss/barista/issues/1632)
- **option:** Fixes the behaviour of selecting an option with mouse and
  keyboard, solving the issue of multiple options being selected.
  ([21addc2](https://github.com/dynatrace-oss/barista/commit/21addc244a532d0117d7d46392f1f517340117a1))
- **quick-filter:** Use internal uid for the filter generation.
  ([eafc15c](https://github.com/dynatrace-oss/barista/commit/eafc15c05269df28543d8c1f7bf3b6b6136f9ea5)),
  closes [#1647](https://github.com/dynatrace-oss/barista/issues/1647)
  [#1522](https://github.com/dynatrace-oss/barista/issues/1522)
- **tree-table:** Fixes overflow when info-group contains long texts
  ([c9f1413](https://github.com/dynatrace-oss/barista/commit/c9f1413a2a9f5f8b4a76301aae516afeb1e389f4))

### Features

- **alert:** Introduce `info` severity type
  ([5856d36](https://github.com/dynatrace-oss/barista/commit/5856d36dcda9a306c4c53342ab2f0efc69191f3f))
- **combobox:** Introduce injection token to configure option height.
  ([8342c18](https://github.com/dynatrace-oss/barista/commit/8342c1819cf264d38843ef529cb03535e9064a28))

## [8.0.3](https://github.com/dynatrace-oss/barista/compare/8.0.2...8.0.3) (2020-09-23)

### Bug Fixes

- **filter-field:** Reverts a commit that introduced a bug when selecting
  suggestion values.
  ([4ad27e0](https://github.com/dynatrace-oss/barista/commit/4ad27e0caf2efcb194c24eaa281d2c8125e1c93a)),
  closes [#1632](https://github.com/dynatrace-oss/barista/issues/1632)

## [8.0.2](https://github.com/dynatrace-oss/barista/compare/8.0.1...8.0.2) (2020-09-16)

### Bug Fixes

- **combobox:** Fixes an issue where the value was not reset.
  ([139f97f](https://github.com/dynatrace-oss/barista/commit/139f97f11755f2c0063bd3d78bff73780bb52f6c))
- **filter-field:** Fixed UX problem where text that wasn't applied to the
  filter would remain after losing focus.
  ([dbddb97](https://github.com/dynatrace-oss/barista/commit/dbddb973f650812bf0d98c7995d126475198c6a3))
- **filter-field:** Fixes an issue where custom tag parsers are not applied on
  filters set initially.
  ([c43b0a4](https://github.com/dynatrace-oss/barista/commit/c43b0a4f8e64bdfa80108a76471c0c437d254355)),
  closes [#1591](https://github.com/dynatrace-oss/barista/issues/1591)
- **filter-field:** Fixes an issue where suggestions are not displayed in MS
  Edge.
  ([43733a1](https://github.com/dynatrace-oss/barista/commit/43733a1ceeafb8da23ee9a3ffb89b47b300521b4)),
  closes [#1558](https://github.com/dynatrace-oss/barista/issues/1558)

## [8.0.1](https://github.com/dynatrace-oss/barista/compare/8.0.0...8.0.1) (2020-09-09)

### Bug Fixes

- **button-group:** Fixes a regression that was introduced with the update to
  the new typescript version.
  ([0193f0b](https://github.com/dynatrace-oss/barista/commit/0193f0b69f0913e44edc1ca2dfcf698320ee5488)),
  closes [#1577](https://github.com/dynatrace-oss/barista/issues/1577)
- **option:** Fixes the behavior of selecting an option with mouse and keyboard,
  solving the issue of multiple options being selected.
  ([21addc2](https://github.com/dynatrace-oss/barista/commit/21addc244a532d0117d7d46392f1f517340117a1))
- **tree-table:** Fixes an overflow issue, when the info-group contains a long
  text.
  ([b71371c](https://github.com/dynatrace-oss/barista/commit/b71371c43231cfd3b17e8b1397afe681d176ca5b))

## [8.0.0](https://github.com/dynatrace-oss/barista/compare/7.7.0...8.0.0) (2020-08-31)

### Bug Fixes

- **button:** Fixes an issue with secondary theme hover and active state
  ([a602f6b](https://github.com/dynatrace-oss/barista/commit/a602f6b936c8788636e85b300ee627d28f8b922f))
- **combobox:** Fixes an issue where the value was reset.
  ([9c18bef](https://github.com/dynatrace-oss/barista/commit/9c18befee670b50c1385998d3e80ee377c18925e)),
  closes [#1427](https://github.com/dynatrace-oss/barista/issues/1427)
- **container-breakpoint-observer:** Added logging information where the
  placeholder container is applied so tracking this issue if it is occurring
  again is easier.
  ([f98469a](https://github.com/dynatrace-oss/barista/commit/f98469adedae6854d271140a0a26737b7be97d6a)),
  closes [#1526](https://github.com/dynatrace-oss/barista/issues/1526)
- **duration-formatter:** Fixes incorrect results when units are below
  milliseconds
  ([b9affb7](https://github.com/dynatrace-oss/barista/commit/b9affb7afb512967b050875b2681c4d0f3d2a93b))
- **expandable-section:** Fixes an issue where the initial state set, via dom
  attribute for `disabled` and `expandable` is not applied correctly.
  ([4bc7094](https://github.com/dynatrace-oss/barista/commit/4bc7094f3b17c74f02b5849e91ae1bd765d31548)),
  closes [#1489](https://github.com/dynatrace-oss/barista/issues/1489)
  [#1472](https://github.com/dynatrace-oss/barista/issues/1472)
- **filter-field:** Fixes an issue where the user can interact while in loading
  state.
  ([7b593b7](https://github.com/dynatrace-oss/barista/commit/7b593b7635897a1de53543228fcdc5ce14b92347)),
  closes [#1464](https://github.com/dynatrace-oss/barista/issues/1464)
- **filter-field:** Fixes an issue with overflowing suggestions.
  ([644c00f](https://github.com/dynatrace-oss/barista/commit/644c00f05a473ef61d35662183529c0c628c20c2)),
  closes [#1440](https://github.com/dynatrace-oss/barista/issues/1440)
- **highlight:** Fixes an issue where the highlight would break layouts.
  ([2e5e656](https://github.com/dynatrace-oss/barista/commit/2e5e656eaebd6b089ed6e39ad78b40554351fdc6)),
  closes [#1420](https://github.com/dynatrace-oss/barista/issues/1420)

### BREAKING CHANGES

- **select, combobox:** The deprecated function for creating an error object in
  the select component has been removed. An error message is now logged instead.
- **table:** Removed the simple order column, as it stopped working with Angular
  Version 9.1.6. Instead, use the `dt-order-cell` directly in the table
  definition.
- **empty-state:** Remove `ViewportResizer` from constructor and let the resize
  observer handle the layout changes. Therefore the custom empty state base
  class is not needed anymore and was removed.
- **radio-group:** Remove custom injection of `ngControl` and default null
  assignment.
- **switch:** Remove custom injection of `ngControl` and default null
  assignment.
- **checkbox:** Remove custom injection of `ngControl` and default null
  assignment.
- **sunburst-chart:** Made multiple constructor parameters required.
- Updated Angular peer dependency version to 10.x
- Added tslib 2.x as a dependency

## [8.0.0-rc.1](https://github.com/dynatrace-oss/barista/compare/7.0.0...8.0.0-rc.1) (2020-08-28)

### Bug Fixes

- **button:** Fixes an issue with secondary theme hover and active state
  ([a602f6b](https://github.com/dynatrace-oss/barista/commit/a602f6b936c8788636e85b300ee627d28f8b922f))
- **combobox:** Fixes an issue where the value was reset.
  ([9c18bef](https://github.com/dynatrace-oss/barista/commit/9c18befee670b50c1385998d3e80ee377c18925e)),
  closes [#1427](https://github.com/dynatrace-oss/barista/issues/1427)
- **container-breakpoint-observer:** Added logging information where the
  placeholder container is applied so tracking this issue if it is occurring
  again is easier.
  ([f98469a](https://github.com/dynatrace-oss/barista/commit/f98469adedae6854d271140a0a26737b7be97d6a)),
  closes [#1526](https://github.com/dynatrace-oss/barista/issues/1526)
- **duration-formatter:** Fixes incorrect results when units are below
  milliseconds
  ([b9affb7](https://github.com/dynatrace-oss/barista/commit/b9affb7afb512967b050875b2681c4d0f3d2a93b))
- **expandable-section:** Fixes an issue where the inital state set via dom
  attribute for `disabled` and `expandable` is not applied correctly.
  ([4bc7094](https://github.com/dynatrace-oss/barista/commit/4bc7094f3b17c74f02b5849e91ae1bd765d31548)),
  closes [#1489](https://github.com/dynatrace-oss/barista/issues/1489)
  [#1472](https://github.com/dynatrace-oss/barista/issues/1472)
- **filter-field:** Fixes an issue where the user can interact while in loading
  state.
  ([7b593b7](https://github.com/dynatrace-oss/barista/commit/7b593b7635897a1de53543228fcdc5ce14b92347)),
  closes [#1464](https://github.com/dynatrace-oss/barista/issues/1464)
- **filter-field:** Fixes an issue with overflowing suggestions.
  ([644c00f](https://github.com/dynatrace-oss/barista/commit/644c00f05a473ef61d35662183529c0c628c20c2)),
  closes [#1440](https://github.com/dynatrace-oss/barista/issues/1440)
- **highlight:** Fixes an issue where the highlight would break layouts.
  ([2e5e656](https://github.com/dynatrace-oss/barista/commit/2e5e656eaebd6b089ed6e39ad78b40554351fdc6)),
  closes [#1420](https://github.com/dynatrace-oss/barista/issues/1420)

### BREAKING CHANGES

- **select, combobox:** The deprecated function for creating an error object in
  the select component has been removed. An error message is now logged instead.
- **table:** Removed the simple order column, as it stopped working with Angular
  Version 9.1.6. Instead use the `dt-order-cell` directly in the table
  definition.
- **empty-state:** Remove `ViewportResizer` from constructor and let the resize
  observer handle the layout changes. Therefore the custom empty state base
  class is not needed anymore and was removed.
- **radio-group:** Remove custom injection of `ngControl` and default null
  assignment.
- **switch:** Remove custom injection of `ngControl` and default null
  assignment.
- **checkbox:** Remove custom injection of `ngControl` and default null
  assignment.
- **sunburst-chart:** Made multiple constructor parameters required.
- Updated Angular peer dependency version to 10.x
- Added tslib 2.x as a dependency

## [8.0.0-rc.0](https://github.com/dynatrace-oss/barista/compare/7.0.0...8.0.0-rc.0) (2020-08-10)

### BREAKING CHANGES

- **empty-state:** Remove `ViewportResizer` from constructor and let the resize
  observer handle the layout changes. Therefore the custom empty state base
  class is not needed anymore and was removed.
- **radio-group:** Remove custom injection of `ngControl` and default null
  assignment.
- **switch:** Remove custom injection of `ngControl` and default null
  assignment.
- **checkbox:** Remove custom injection of `ngControl` and default null
  assignment.
- **sunburst-chart:** Made multiple constructor parameters required.
- Updated Angular peer dependency version to 10.x
- Added tslib 2.x as a dependency

## [7.7.0](https://github.com/dynatrace-oss/barista/compare/7.6.0...7.7.0) (2020-08-06)

### Bug Fixes

- **chart:** Fixes an issue where series visibility was not retained over new
  data set.
  ([23815c6](https://github.com/dynatrace-oss/barista/commit/23815c6be05d3dc3e2f4ee9394c6f4a9f7a7a2ce)),
  closes [#1412](https://github.com/dynatrace-oss/barista/issues/1412)
- **filter-field:** Fixes an issue where long free-text values exceed the border
  of the overlay.
  ([9d5f935](https://github.com/dynatrace-oss/barista/commit/9d5f9359e74325f936fe51660ca1771b65bfce89)),
  closes [#1439](https://github.com/dynatrace-oss/barista/issues/1439)

### Features

- **filter-field:** Added options for user-defined tag parser function
  ([e16948a](https://github.com/dynatrace-oss/barista/commit/e16948ada75aef50e3fb931f0b5f0299b6e480b7))
- **show-more:** Changed theming to custom properties.
  ([54314a0](https://github.com/dynatrace-oss/barista/commit/54314a03e9237cbc332aec9088629e6d0f5d2d6b))

## [7.6.0](https://github.com/dynatrace-oss/barista/compare/7.5.1...7.6.0) (2020-07-29)

### Bug Fixes

- **theming:** Fixes an issue where custom properties were not set to default.
  ([e1913e6](https://github.com/dynatrace-oss/barista/commit/e1913e6494520bc50fbf2eac61d199d8af0cfacd))

### Features

- **table:** Add capability to have a row selection using a checkbox column
  ([7569ea3](https://github.com/dynatrace-oss/barista/commit/7569ea364da93d55637df48b2df2c570eb895f26))

## [7.5.1](https://github.com/dynatrace-oss/barista/compare/7.5.0...7.5.1) (2020-07-29)

### Bug Fixes

- **bundle:** Fixes imports between submodules in the compiled bundle.
  ([edf2a81](https://github.com/dynatrace-oss/barista/commit/edf2a815147591ec9e18edb16d928c31fe920218))
- **formatters:** Fixes a bug throwing an errror when setting maxPrecision lower
  than 0 and the input higher that 1
  ([9c7c728](https://github.com/dynatrace-oss/barista/commit/9c7c728baa905e05ec7e6663773d515d1578b873))

## [7.5.0](https://github.com/dynatrace-oss/barista/compare/7.4.0...7.5.0) (2020-07-27)

### Bug Fixes

- **container-breakdown-observer:** Fixes an issue where query parsing was not
  working in Edge.
  ([d8e5453](https://github.com/dynatrace-oss/barista/commit/d8e54539692d90447a06c4e70a871ef593d05c85)),
  closes [#1346](https://github.com/dynatrace-oss/barista/issues/1346)
- **filter-field:** Fixes an issue where the range stayed open when datasource
  was updated.
  ([d5fbe71](https://github.com/dynatrace-oss/barista/commit/d5fbe714211fd76487dfffe219c424910cd45e07)),
  closes [#1256](https://github.com/dynatrace-oss/barista/issues/1256)
- **filter-field:** Fixes an issue with the error validation when trying to
  submit an empty value.
  ([6d1e93d](https://github.com/dynatrace-oss/barista/commit/6d1e93deb8673285c57a1c3b705ae84f03766e5a)),
  closes [#1299](https://github.com/dynatrace-oss/barista/issues/1299)
- **input:** Fixes extra outlines when placed inside dt-form-field component.
  ([f0df782](https://github.com/dynatrace-oss/barista/commit/f0df78204a61045185f1d7ec6f59511f9f2b41f3)),
  closes [#999](https://github.com/dynatrace-oss/barista/issues/999)
- **input, select, combobox:** Unified placeholder color.
  ([95f3b7d](https://github.com/dynatrace-oss/barista/commit/95f3b7d78f6d17c455d475ac7503a8e4211d49a4)),
  closes [#866](https://github.com/dynatrace-oss/barista/issues/866)
- **quick-filter:** Fixes an issue where an ExpressionChangedAfterChecked error
  was thrown when filters were set programmatically.
  ([2b993f3](https://github.com/dynatrace-oss/barista/commit/2b993f3b322a5e5c51eeebd462500d40648044ba)),
  closes [#1305](https://github.com/dynatrace-oss/barista/issues/1305)
- **select:** Fixes border issue when select is used inside dt-form-field
  component.
  ([356026e](https://github.com/dynatrace-oss/barista/commit/356026e0fb2fb67a2f1471496ad638da97bd3cb6))
- **sunburst-chart:** Fixes an issue that multiple children were opened when
  they had the same starting name.
  ([759e97e](https://github.com/dynatrace-oss/barista/commit/759e97e5ff49558b47f661f6edb30c9e98bd2f12))
- **table:** Fixes an issue where an expandable-row had a broken style after
  table-sorting.
  ([8e3a111](https://github.com/dynatrace-oss/barista/commit/8e3a11172002936e728fb04a47b37c6d35a75feb)),
  closes [#1353](https://github.com/dynatrace-oss/barista/issues/1353)

### Features

- **chart:** Switched theming to custom properties.
  ([33b2185](https://github.com/dynatrace-oss/barista/commit/33b21854a1a3ec40d8ce0407fc555539586fe278))
- **consumption:** Switched theming to custom properties.
  ([c41f87b](https://github.com/dynatrace-oss/barista/commit/c41f87b1b6ef2f7a206a6f2f6cc4478b00192920))
- **copy-to-clipboard:** Switched theming to custom properties.
  ([bbaae5b](https://github.com/dynatrace-oss/barista/commit/bbaae5b6ae7caf9cb3820f299d37c176a7980733))
- **formatters:** Added maxPrecision parameter to count formatters to control
  the amount of decimals.
  ([bac398f](https://github.com/dynatrace-oss/barista/commit/bac398f9201fe192c72c68c37d7cab21619df2d5))
- **indicator:** Switched theming to custom properties.
  ([7692798](https://github.com/dynatrace-oss/barista/commit/7692798071c1384b1aae802d4fedb2f596b26205))
- **progress-bar:** Switched theming to custom properties.
  ([d49a9ec](https://github.com/dynatrace-oss/barista/commit/d49a9ec29ab33c73634720ca0dd9824c5b479932)),
  closes [#1056](https://github.com/dynatrace-oss/barista/issues/1056)
- **progress-circle:** Switched theming to custom properties.
  ([017921d](https://github.com/dynatrace-oss/barista/commit/017921dce077e06db9a33ed41a76e6cec5adce7b))
- **radio:** Switched theming to custom properties.
  ([23df291](https://github.com/dynatrace-oss/barista/commit/23df291c8e3b15bc1110144980548a4ec2ec0194))
- **tile:** Switched theming to custom properties.
  ([a8ccf30](https://github.com/dynatrace-oss/barista/commit/a8ccf302b291df6a1a8d916dcb4a0a042c87aec0))

## [7.4.0](https://github.com/dynatrace-oss/barista/compare/7.3.0...7.4.0) (2020-07-14)

### Bug Fixes

- **combobox:** Fixes an issue with setting the value not updating the input
  correctly.
  ([79f77cf](https://github.com/dynatrace-oss/barista/commit/79f77cf2002b5adbacb3081a0797c50afcf4806f))
- **event-chart:** Fixes an issue with the xAxis formatting
  ([97e9d69](https://github.com/dynatrace-oss/barista/commit/97e9d693a5dce50cc9651f07a79b3cc5200584cb))
- **filter-field:** Fixes an issue with the infix when deleting a filter while
  in flight.
  ([62b4465](https://github.com/dynatrace-oss/barista/commit/62b4465b4b24e67cb10db25ab67274c66ddb8ae0)),
  closes [#1264](https://github.com/dynatrace-oss/barista/issues/1264)
- **filter-field:** Fixes an issue with validation flickering on free text.
  ([8175d0c](https://github.com/dynatrace-oss/barista/commit/8175d0cba0188dde54dff30c729bc2cf86dc1af5)),
  closes [#1180](https://github.com/dynatrace-oss/barista/issues/1180)
- **radio:** Fixes an issue where the radio-group interfered with other groups.
  ([178d665](https://github.com/dynatrace-oss/barista/commit/178d6659d1c0ee1ae78a9ef855ac052df872a123)),
  closes [#1270](https://github.com/dynatrace-oss/barista/issues/1270)
- **sunburst-chart:** Fixes an issue with missing types dependency.
  ([e251789](https://github.com/dynatrace-oss/barista/commit/e2517891977e018cedf80f70652853f34348ceb6))

### Features

- **formatters:** Added maxDecimals option to duration formatter
  ([fb757c6](https://github.com/dynatrace-oss/barista/commit/fb757c654bc265e05b050e733a9e10d1dfc384ab))

## [7.3.0](https://github.com/dynatrace-oss/barista/compare/7.2.0...7.3.0) (2020-07-09)

### Bug Fixes

- **combobox:** Fixes an issue that options were not handled correctly when
  changed at runtime.
  ([457ce87](https://github.com/dynatrace-oss/barista/commit/457ce87093acf05d0abd4d65dce9e804094832a9))
- **confirmation-dialog:** Fixes issue where the spacing between the content and
  actions is too small.
  ([eda4145](https://github.com/dynatrace-oss/barista/commit/eda4145097ba582b1aa10ffaa5835c4cbe7f23f8)),
  closes [#1148](https://github.com/dynatrace-oss/barista/issues/1148)
- **stacked-series-chart:** Sanitize axis ticks position
  ([43b0340](https://github.com/dynatrace-oss/barista/commit/43b03407e80b5f46287fd7171cd54f02b741136c))

### Features

- **schematics:** Add example component generation.
  ([138cb87](https://github.com/dynatrace-oss/barista/commit/138cb87efca0a3a55c87c547b9d5e0a4d9ad8740))
- **sunburst-chart:** Add ariaLabel and responsiveness
  ([e588f07](https://github.com/dynatrace-oss/barista/commit/e588f07bbc09505df1d7ee58937f42213fdda762))

## [7.2.0](https://github.com/dynatrace-oss/barista/compare/7.1.0...7.2.0) (2020-06-29)

### Bug Fixes

- **button:** Fixes an issue where visited a[dt-button] components had the wrong
  style.
  ([6f8c9a7](https://github.com/dynatrace-oss/barista/commit/6f8c9a7d8e4a002ed7929b91cefacdcb1ef17b14)),
  closes [#1202](https://github.com/dynatrace-oss/barista/issues/1202)
- **quickfilter:** Fixes an issue where the content received a scrollbar due to
  wrong box-sizing applied.
  ([5415f2f](https://github.com/dynatrace-oss/barista/commit/5415f2fc94d98889cf3fa40ea431bf3e2e2e8d46))
- **table:** Fixes a CD issue when using the simple order column with an Angular
  version higher than 9.1.6.
  ([0233e5e](https://github.com/dynatrace-oss/barista/commit/0233e5eea007b64ed66ec08d1c79b23e96777a40))
- **table:** Reorder input being cut off in Firefox.
  ([5542623](https://github.com/dynatrace-oss/barista/commit/554262315ad896cfb7584f6e8023a4480c82cf73)),
  closes [#1132](https://github.com/dynatrace-oss/barista/issues/1132)

### Features

- **alert:** Changes styling to use custom properties.
  ([4527735](https://github.com/dynatrace-oss/barista/commit/45277357d305c5179df241d2dd500ef559c2937b))
- **checkbox, switch:** Added support as a form-field-control.
  ([3e84703](https://github.com/dynatrace-oss/barista/commit/3e847039bef13557d227f286149dfc3e41d9e75d)),
  closes [#1120](https://github.com/dynatrace-oss/barista/issues/1120)
- **radial-chart:** Add selection and percent values
  ([3c26ead](https://github.com/dynatrace-oss/barista/commit/3c26ead152de3bc47587fa9b9a2e37adb93a3778))
- **radio:** Added support as a form-field-control.
  ([5f9f70e](https://github.com/dynatrace-oss/barista/commit/5f9f70ec25e37708582476045c8a5cc86d687987)),
  closes [#1121](https://github.com/dynatrace-oss/barista/issues/1121)
- **stacked-series-chart:** Create component
  ([5335956](https://github.com/dynatrace-oss/barista/commit/5335956ab8e23cbceb99150b27ce29e588a65699))
- Added compatibility to include @dynatrace/barista-icons@7.0.0
  ([47a29cb](https://github.com/dynatrace-oss/barista/commit/47a29cb886127a035cd7b39f2d66b1fd25188cd0))

## [7.1.0](https://github.com/dynatrace-oss/barista/compare/7.0.0...7.1.0) (2020-06-15)

### Bug Fixes

- **chart:** Fixes showing inactive series opaque.
  ([42930cd](https://github.com/dynatrace-oss/barista/commit/42930cde30e7db91e2879451a0b7b36ec3799807)),
  closes [#1146](https://github.com/dynatrace-oss/barista/issues/1146)
- **confirmation-dialog:** Fixes an issue that focusAttention needs mark for
  check if triggered in some edge cases.
  ([6ca6191](https://github.com/dynatrace-oss/barista/commit/6ca6191f768dc49513ba7ae7045c3bcef8cdeb2c))
- **event-chart:** Fixes an issue that the event chart was falsly getting the
  pipe for formatting the duration via DI, which resulted in a runtime error in
  ivy.
  ([7cbfce6](https://github.com/dynatrace-oss/barista/commit/7cbfce601efc00f1f3c37b7d7878289a2eaca82b))

### Features

- **button-group:** Changed styling to custom properties.
  ([baba021](https://github.com/dynatrace-oss/barista/commit/baba02148feff02f4a65bd0deebe00b661c86c12))
- **combobox:** Added experimental combobox component.
  ([d618bcd](https://github.com/dynatrace-oss/barista/commit/d618bcd92556dda336cd3385c3c97b501fcc32b8))
- **dependencies:** Increases version range of supported barista-icons package
  to all 6.x versions.
  ([2922073](https://github.com/dynatrace-oss/barista/commit/29220737fd596645892fd74f4e096ac6a792ba49))
- **formatters:** Exposed formatted display unit in DtFormattedValue.
  ([4a38142](https://github.com/dynatrace-oss/barista/commit/4a38142073c46376fad761faa86d4ba1228b75d5))
- **quick-filter:** Propagate filter-field events.
  ([0c44e64](https://github.com/dynatrace-oss/barista/commit/0c44e64039c5d54b057151752553bc029f819228)),
  closes [#1025](https://github.com/dynatrace-oss/barista/issues/1025)

## [7.0.1](https://github.com/dynatrace-oss/barista/compare/7.0.0...7.0.1) (2020-06-04)

### Bug Fixes

- **button:** Increases specificity even more on links since source order
  mattered with the last update.
  ([096af95](https://github.com/dynatrace-oss/barista/commit/096af953b45fb723d4945a12023cb439ae45c267))
- **confirmation-dialog:** Fixes an issue that the confirmation dialog was
  blocking interactions although it was not visible.
  ([96ca9f7](https://github.com/dynatrace-oss/barista/commit/96ca9f76db491374fa28b466d562e700aa010fc3))
- **filter-field:** Fixes an issue where tags were not disabled when the
  filter-field was.
  ([d25622a](https://github.com/dynatrace-oss/barista/commit/d25622ab3a0054334081af369683ddc58d35dcc5)),
  closes [#1097](https://github.com/dynatrace-oss/barista/issues/1097)
- **filter-field:** Fixes an issue where the range caused an error after its
  destruction.
  ([e1cf261](https://github.com/dynatrace-oss/barista/commit/e1cf261b602db3823cf2bc0dc07fdd4a42cf8e9f))
- **quick-filter:** Typo in method name.
  ([90e08f0](https://github.com/dynatrace-oss/barista/commit/90e08f028eac5d1398493446d9ccc9bb21da73d8))

## [7.0.0](https://github.com/dynatrace-oss/barista/compare/6.5.2...7.0.0) (2020-05-27)

Most of the breaking changes will be fixed automatically by running
`ng update @dynatrace/barista-components`. Some required changes like highcharts
type changes require context and therefore cannot be automated. See our
[migration guide](https://github.com/dynatrace-oss/barista/blob/master/documentation/migration-guide.md)
for further information on how to migrate.

### BREAKING CHANGES

- **autocomplete:** Removed FlexibleConnectedPositionStrategy and makes
  \_viewportRuler, \_platform and \_overlayContainer mandatory in the
  constructor.
  ([ed57594](https://github.com/dynatrace-oss/barista/commit/ed57594ac332405636173286da14b1ee4f65d0a5))
- **breadcrumbs:** Removed deprecated breadcrumb-item component and deprecated
  aria-label input attributes.
  ([f8019e0](https://github.com/dynatrace-oss/barista/commit/f8019e058c7ec9ebf1f704b8185c67fd8751596c))
- **chart:** Removed deprecated aria-label input attributes.
  ([7b1ef74](https://github.com/dynatrace-oss/barista/commit/7b1ef74ced19e1e1da86fe73a2356aba5bbf6408))
- **chart:** Updated to highcharts 7 and removing third party typings for
  highcharts.
  ([58a0297](https://github.com/dynatrace-oss/barista/commit/58a0297caaab3013a696dd8ee89acc370d5eeba0))
- **colors:** Removed \$flat-white and FLAT_WHITE.
  ([230d208](https://github.com/dynatrace-oss/barista/commit/230d2082ea799bcab575d6ca14e95a68d67327cc))
- **context-dialog:** Removed deprecated aria-label input attribute and makes
  elementRef mandatory in the constructor.
  ([b5d0136](https://github.com/dynatrace-oss/barista/commit/b5d0136788ecbd5dd36512523126ffe4804dc849))
- **consumption:** Removed deprecated aria-label input attributes.
  ([695fd35](https://github.com/dynatrace-oss/barista/commit/695fd35a0f23bb2c0ca8892f9a8ebfd1ef106397))
- **core:** `isNumber` now returns false for number strings like `"12"` as
  expected. Added `isNumberLike` function for these number-string cases.
- **cta-card:** Removed deprecated component. Use `dt-card` and `dt-empty-state`
  instead.
  ([bcfdff5](https://github.com/dynatrace-oss/barista/commit/bcfdff50a7c2baf55607962e7be43c4214462f0b))
- **event-chart:** Made elementRef mandatory in the constructor.
  ([568dc1d](https://github.com/dynatrace-oss/barista/commit/568dc1dc751bfdd8dee6f24042f7e814aac64ff9))
- **filter-field:** Removed FlexibleConnectedPositionStrategy, makes
  \_viewportRuler, \_platform and \_overlayContainer mandatory in the
  constructor and makes `tags` private.
- **filter-field, quick-filter:** The filter-field data source as well as the
  quick-filter data source and their transform methods have generics in place to
  define the structure of the passed data. The filter-fields default data-source
  no longer takes a generic, as the structure of the data is already defined
  there. The node definitions now take optional generics for the consumer to
  specify the structure of the data.
  ([8a0ceb0](https://github.com/dynatrace-oss/barista/commit/8a0ceb033ad459f30870895baf17ea842d87b1e6))
- **indicator:** Moved dtIndicator directive to its own package. Import
  `DtIndicatorModule` from `@dynatrace/barista-components/indicator` now.
  ([ba28cda](https://github.com/dynatrace-oss/barista/commit/ba28cdaa1d77f6107fa35dcd0b7045617d705481))
- **inline-editor:** Removed deprecated aria-label input attributes.
  ([6be8f30](https://github.com/dynatrace-oss/barista/commit/6be8f304ed922133ea1dc2295cdaf7355d8616ce))
- **linting:** Removed kebab-case validation for certain aria attributes.
  ([5859b19](https://github.com/dynatrace-oss/barista/commit/5859b19be978dc97b39464183fc10eb5872cc12f))
- **menu:** Removed deprecated aria-label input attributes.
  ([0bf77b6](https://github.com/dynatrace-oss/barista/commit/0bf77b64486afc55da68902f3538e3b64ec9d602))
- **pagination:** Removed deprecated aria label input attributes.
  ([4d84a0a](https://github.com/dynatrace-oss/barista/commit/4d84a0a798efc1f403c5b392a5cd9d3e22d701a3))
- **progress-bar:** Removed DtIndicatorModule export from module.
  ([2bc59e5](https://github.com/dynatrace-oss/barista/commit/2bc59e503ba6b865cf45b2d1282f95b468448f9a))
- **secondary-nav:** Removed deprecated aria-label input attributes.
  ([550fdcd](https://github.com/dynatrace-oss/barista/commit/550fdcdeda689d498672a914c0a2940e5255629f))
- **secondary-nav:** Removed dependency on RouterModule for the secondary-nav
  module. Removed `href` input, use `routerLink` and `dtSecondaryNavLinkActive`
  when needed instead.
  ([8aa5d6a](https://github.com/dynatrace-oss/barista/commit/8aa5d6aec35616d40bf601638a85eebc224c7d8b)),
  closes [#465](https://github.com/dynatrace-oss/barista/issues/465)
- **sidenav:** Fixed wrong exportAs property for the sidenav-header
  ([5647ae0](https://github.com/dynatrace-oss/barista/commit/5647ae094f3ea17c8fff859a2dd2279300e5cd6e))
- **sunburst-chart, radial-chart:** Added DomSanitizer as non optional parameter
  to the components constructor.
- **table:** Removed unnecessary NgZone from constructor and table empty states.
  ([de89e60](https://github.com/dynatrace-oss/barista/commit/de89e6087461615d02039f3a41d19a0dcf74fe7d))
- **tag:** Made elementRef mandatory in the constructor.
  ([6ba927e](https://github.com/dynatrace-oss/barista/commit/6ba927e0bd8772dea616ef2c0d44ed68fa3b58cb))
- **timestamp:** Removed deprecated aria-label input attributes.
  ([1f9cdba](https://github.com/dynatrace-oss/barista/commit/1f9cdba2ed6c72bd0f9dd1330dd323099259ab38))
- **time-formatter:** Removed deprecated dtTime formatter.
  ([0f281fc](https://github.com/dynatrace-oss/barista/commit/0f281fc08fd8ffaf46df18e31d1c54f80941f7a7))
- **tree-table:** Removed deprecated aria-label input attributes.
  ([11d083d](https://github.com/dynatrace-oss/barista/commit/11d083d94698e0b23bb8c502932bc6b58d7c89ca))

### Performance Improvements

- Switched to lodash-es as a peerDependency.
  ([37d626c](https://github.com/dynatrace-oss/barista/commit/37d626c9ca32737f986550ba64efeb3962cef7d2))

### Bug Fixes

- **button:** Increased specificity for anchor button selectors that conflicted
  with visited link overrides.
  ([23bee1c](https://github.com/dynatrace-oss/barista/commit/23bee1c409b38767a09cb58c3cfa0c4ed71f5eff))
- **styles:** Added back missing styles definition for h3.
  ([ab8a372](https://github.com/dynatrace-oss/barista/commit/ab8a372685caeac23006fb2027b75bc0bdbcadac)),
  closes [#1081](https://github.com/dynatrace-oss/barista/issues/1081)
- **sunburst-chart,radial-chart:** Fixed custom properties inside template for
  view engine consumers.
  ([67caf42](https://github.com/dynatrace-oss/barista/commit/67caf425e78d9464017df9173fa38ab6671f1fa5))
- **table:** Fixed an issue where the table tried to render after it was
  destroyed.
  ([9e7aa5a](https://github.com/dynatrace-oss/barista/commit/9e7aa5a5e516a7566ce1067eed1eab7ca4fafbb1)),
  closes [#1046](https://github.com/dynatrace-oss/barista/issues/1046)

### Features

- **bar-indicator:** Changed styling to use custom properties.
  ([193b3e5](https://github.com/dynatrace-oss/barista/commit/193b3e5b80303c2753a8cd8253a0b376df4cb577))
- **breadcrumbs:** Changed styling to use custom properties.
  ([e33547a](https://github.com/dynatrace-oss/barista/commit/e33547a6b00131bb65ec86af638213b5f343da87))
- **button:** Changed styling to custom properties.
  ([c831b03](https://github.com/dynatrace-oss/barista/commit/c831b03398a340c0a469bfbdfbc7578f301f7a2f))
- **card:** Changed styling to use custom properties.
  ([b5e1b7f](https://github.com/dynatrace-oss/barista/commit/b5e1b7f57c9d000d8e9a2af6a0ee248f952ebb00))
- **checkbox:** Changed styling to use custom properties.
  ([701aadc](https://github.com/dynatrace-oss/barista/commit/701aadcb0ec38939345e9c9c4393aa0249114340))
- **confirmation-dialog:** Updated styling and added an animation to focus user
  attention.
  ([bdb7f0e](https://github.com/dynatrace-oss/barista/commit/bdb7f0e6d04479dbeb08f04feb7a5d035917038b))
- **filter-field:** Added partial option.
  ([ee205ef](https://github.com/dynatrace-oss/barista/commit/ee205ef73c593c299dbed7794c0c08f01ab4e7b5)),
  closes [#868](https://github.com/dynatrace-oss/barista/issues/868)
- **filter-field, quick-filter:** Improved typing across the filter-field, its
  node definitions, data-sources and the quick-filter component.
  ([f9db6a5](https://github.com/dynatrace-oss/barista/commit/f9db6a59014fe252d5c962d5c419d007c49b6e2f))
- **schematics:** Added schematic to generate e2e component setup inside barista
  repository.
  ([4c0231a](https://github.com/dynatrace-oss/barista/commit/4c0231af7e76ba03532be93f29deb3d960655653))
- **table:** Added drag & drop order functionality to the table. Use in
  combination with the `DtTableOrderDataSource`.
  ([c56c005](https://github.com/dynatrace-oss/barista/commit/c56c005b14ea7bf93a0646ff5374f8e2c3c3b645))

### Major version information

- Install lodash-es instead of lodash now. Previously lodash was installed with
  angular automatically.
- We removed `@types/highcharts` dependency and switched to the shipped typings
  by highcharts. The chart and microchart typings now extend from the highcharts
  types.
- **chart:** Will require the highcharts 7 update as dependency.
- **tree-table:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **timestamp:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **time-formatter:** Use dtDuration formatter instead.
- **tag:** The elementRef is now madatory in the constructor.
- **table:** No more NgZone element and use `<dt-empty-state>` instead.
- **secondary-nav:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **progress-bar:** DtIndicator is no longer required.
- **pagination:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **menu:** Previous aria inputs did not conform to accessibility guidelines.
  Please refer to the documentation for current usage.
- **linting:** No more kebeb-case validation for deprecated aria label inputs.
- **inline-editor:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **filter-field:** Use currentTags instead of tags.
- **event-chart:** The elementRef is now madatory in the constructor.
- **cta-card:** Removed cta-card component. Use a `dt-card` with
  `dt-empty-state` instead.
- **context-dialog:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **consumption:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage.
- **colors:** Removed flat_white from the colors. Use \$white and WHITE instead.
- **chart:** Previous aria inputs did not conform to accessibility guidelines.
  Please refer to the documentation for current usage.
- **breadcrumbs:** Previous aria inputs did not conform to accessibility
  guidelines. Please refer to the documentation for current usage. Removed
  deprecated breadcrumb item with `dt-breadcrumb-item` selector, use
  `a dtBreadcrumbItem` instead.
- **autocomplete:** Use DtFlexibleConnectedPositionStrategy instead internally.
- **indicator:** Moved to its own package. Import DtIndicatorModule and
  DtIndicatorThemePalette from @dynatrace/barista-components/indicator instead
  of \*/core

## [6.5.2](https://github.com/dynatrace-oss/barista/compare/6.5.1...6.5.2) (2020-05-18)

### Bug Fixes

- **button:** Fixes the regression that button colors changed due to the theme.
  ([2d0bafc](https://github.com/dynatrace-oss/barista/commit/2d0bafc2cb588c88e32a02fbd8a86a7cda7ac20f))

## [6.5.1](https://github.com/dynatrace-oss/barista/compare/6.5.0...6.5.1) (2020-05-13)

### Style Fixes

Fixes a regression within the disabled state colors in multiple components.
([f7ed0ba](https://github.com/dynatrace-oss/barista/commit/c42b5407971d1b09c47eed6a79b2e45d24b58d8f))

## [6.5.0](https://github.com/dynatrace-oss/barista/compare/6.4.0...6.5.0) (2020-05-12)

### Bug Fixes

- **autocomplete:** Fixes an issue with the positioning of the overlay.
  ([e00d9ba](https://github.com/dynatrace-oss/barista/commit/e00d9baf7ca216ad87110712691a42879a7201d2)),
  closes [#926](https://github.com/dynatrace-oss/barista/issues/926)
- **empty-state:** Fixed ssr rendering for the empty-state component
  ([76f9a5b](https://github.com/dynatrace-oss/barista/commit/76f9a5b03f79290b2437c59863767835f6d6ded0))
- **filter-field:** Fixes an issue with filter field usage in forms.
  ([192e0a7](https://github.com/dynatrace-oss/barista/commit/192e0a73de673cc4d1b9a363698b9555c5701c84))

### Features

- **button:** Changed button theming to custom properties
  ([f698f58](https://github.com/dynatrace-oss/barista/commit/f698f5885e5aa642d9551314662ab3a68e0c1424))
- **event-chart:** Use duration pipe in axis
  ([b951077](https://github.com/dynatrace-oss/barista/commit/b951077f95727044868d4ac0895f1ead4315ae77))
- **sunburst-chart:** Added missing sunburst package to bundle.
  ([b21ebb8](https://github.com/dynatrace-oss/barista/commit/b21ebb8125b210f05a863a3116f6dd110c60a0e7))

## [6.4.0](https://github.com/dynatrace-oss/barista/compare/6.3.0...6.4.0) (2020-04-30)

### Bug Fixes

- **slider:** Prevent default behavior of keyboard events associated with the
  slider.
  ([9508a72](https://github.com/dynatrace-oss/barista/commit/9508a72a6db17cb9d46fe70b1860855b71c9395b))

### Features

- **drawer-table:** Added experimental drawer-table component.
  ([cfd7766](https://github.com/dynatrace-oss/barista/commit/cfd7766f9ad32f100a9f4933ae3a817994f07890))
- **sunburst-chart:** Added sunburst-chart component.
  ([e929e09](https://github.com/dynatrace-oss/barista/commit/e929e09827ce028891996512e803b04bd719c857))

## 6.3.0 (2020-04-15)

### Bug Fixes

- **filter-field:** Fixes a bug where the range overlay was not closed.
  ([53aaeb0](https://github.com/dynatrace-oss/barista/commit/53aaeb0258da4b6a8f7d4ccdcb2513ec94d01ec8)),
  closes [#178](https://github.com/dynatrace-oss/barista/issues/178)
- **filter-field:** Fixes an issue where two filter field flaps were open at the
  same time.
  ([85feb21](https://github.com/dynatrace-oss/barista/commit/85feb21ee7181a3e5b384eba501894aff31744bd)),
  closes [#840](https://github.com/dynatrace-oss/barista/issues/840)

### Features

- **chart:** Added support for observable as input for options.
  ([c7aca9d](https://github.com/dynatrace-oss/barista/commit/c7aca9d2b366cb1a45162d3590d04b485e747abb))
- **quick-filter:** Add a new quick filter component inside an experimental
  package. The quick filter component is used to provide a quick way to operate
  with the filter field inside a sidebar. Inside the quick filter only an
  autocomplete with simple options can be displayed.
  ([dc950e4](https://github.com/dynatrace-oss/barista/commit/dc950e4035c028ab60ca2036d9bc0a56db475b12)),
  closes [#453](https://github.com/dynatrace-oss/barista/issues/453)
  [#254](https://github.com/dynatrace-oss/barista/issues/254)
- **slider:** Adding a new Slider component for number inputs. The Slider
  essentially works as the html range element.
  ([8b7b825](https://github.com/dynatrace-oss/barista/commit/8b7b8251380d8aacb36c73d8a98d8bc349ff4ce0))

### Experimental Package ⚠️

Components from the experimental package have to be imported via
`@dynatrace/barista-components/experimental/...`. Those components are not meant
to be used on production.

The experimental package does not follow semantic versioning like the rest of
the library does.

This means that we might break the api in every version. It is only meant to be
used for testing and feedback purpose!

## 6.2.0 (2020-04-07)

### Bug Fixes

- **expandable-section, expandable-text, expandable-panel:** Added
  `aria-controls` and `aria-expanded`.
  ([f37a977](https://github.com/dynatrace-oss/barista/commit/f37a9773991023f9d0680b7e2edfa1ea95f1cece)),
  closes [#788](https://github.com/dynatrace-oss/barista/issues/788)
- **expandable-text:** Removes a default background on the trigger in Firefox.
  ([ac4085d](https://github.com/dynatrace-oss/barista/commit/ac4085db06ecdbc8459ad54eb97374c840d42ec6))
- **filter-field:** Fixes an issue where the `currentFilterChange` event was not
  fired when a filter that is currently in progress was removed.
  ([772348a](https://github.com/dynatrace-oss/barista/commit/772348ab644f6d4f027f779ea6703234358cac20))
- **overlay:** Fixes a long standing issue with overlays being squashed and
  positions being off when subelements of the trigger are hovered.
  ([b575764](https://github.com/dynatrace-oss/barista/commit/b5757648c1b779432cf9adcee66760bcff840bb7))

### Features

- **chart:** Added animation for the chart heatfield.
  ([00deddd](https://github.com/dynatrace-oss/barista/commit/00deddd44114b265a1986496d1d59dea87a92aff)),
  closes [#476](https://github.com/dynatrace-oss/barista/issues/476)
- **chart-heatfield:** Added close button to heatfield overlay.
  ([7eaeef5](https://github.com/dynatrace-oss/barista/commit/7eaeef5105893ccaa3524b57a840d3d20d72a8d8))
- **overlay:** Uses the FullscreenOverlayContainer now to properly handle
  fullscreen mode.
  ([d295c60](https://github.com/dynatrace-oss/barista/commit/d295c60fd812df22794ce0adce69595fbd069360))

## 6.1.1 (2020-03-30)

### Bug Fixes

- **copy-to-clipboard:** Fixes an issue where copied text is undefined
  ([06dd337](https://github.com/dynatrace-oss/barista/commit/06dd337aa5a896f832ab120ef22eb500ad9a0eca))

## 6.1.0 (2020-03-24)

### Bug Fixes

- **drawer:** Fixes an issue where the side navigation drawer was not expanding
  to the full-screen height.
  ([dd2ccf2](https://github.com/dynatrace-oss/barista/commit/dd2ccf25da8bc7c1cc141d1c66640b5e94842ae0)),
  closes [#733](https://github.com/dynatrace-oss/barista/issues/733)
- **event-chart:** Increased specificity on the overlay panel selector to avoid
  conflicts with the cdk's styles
  ([5a22c09](https://github.com/dynatrace-oss/barista/commit/5a22c09d0a9117c30e57c7a77b620fabc41bc38d))
- **filter-field:** Fixes an issue with the free-text submission.
  ([65ea920](https://github.com/dynatrace-oss/barista/commit/65ea9208f6ef86a30288ff22e81e614060b262dc)),
  closes [#726](https://github.com/dynatrace-oss/barista/issues/726)
- **top-bar-navigation:** Highlight top bar actions with keyboard focus.
  ([f02cff1](https://github.com/dynatrace-oss/barista/commit/f02cff1ab3f11cc82af1c543c2bf4662cc69a09f)),
  closes [#692](https://github.com/dynatrace-oss/barista/issues/692)

### Features

- **colors:** Add flat white to colors list (easter egg)
  ([339eaef](https://github.com/dynatrace-oss/barista/commit/339eaef5bd9bd224aae3edaa3b1beee714ffd29b))
- **duration-formatter:** Adds the dtDuration pipe to format time durations. The
  time-formatter is now deprecated and will be removed with 7.0.0
  ([79b08e5](https://github.com/dynatrace-oss/barista/commit/79b08e5cd63ab98ede6db227626b3b8107018850))
- **empty-state:** Progressive enhancements for relayout based on
  ResizeObserver.
  ([532e275](https://github.com/dynatrace-oss/barista/commit/532e2754ea9a81187f6283c5eaf724cf6ccb149c)),
  closes [#648](https://github.com/dynatrace-oss/barista/issues/648)

## 6.0.1 (2020-03-09)

### Bug Fixes

- **chart-heatfield:** Chart Heatfield is now hidden when start and end are
  undefined.
  ([dbb545a](https://github.com/dynatrace-oss/barista/commit/dbb545a1001753f2d6e6cdc60e98bbc150889843))
- **filter-field:** Fixes an issue with filtering the options when the same
  character was used twice in a row.
  ([dca5b6e](https://github.com/dynatrace-oss/barista/commit/dca5b6e3832da416667dc678d7fd4acd9d78ee9b))
- **key-value-list:** Fixes an issue where the text was displaced on selecting
  with `shift+arrow`.
  [#690](https://github.com/dynatrace-oss/barista/issues/690)
  ([f7a224b](https://github.com/dynatrace-oss/barista/commit/f7a224b52d4c4ada9ae9aea351c755e7cd6eedf5))
- **radio, checkbox, switch:** Fixed the contrast ratio of the disabled labels
  to fulfill our a11y requirements.
  ([0ae6689](https://github.com/dynatrace-oss/barista/commit/0ae6689231e82297f2c98f7906982db04096a075)),
  closes [#684](https://github.com/dynatrace-oss/barista/issues/684)
  [#684](https://github.com/dynatrace-oss/barista/issues/684)
- **tag:** Fixed an issue with the tag-add button being influenced by user agent
  styles.
  ([fa552ff](https://github.com/dynatrace-oss/barista/commit/fa552ff20a8b3e728f2644189ef81355004f343b)),
  closes [#640](https://github.com/dynatrace-oss/barista/issues/640)

## 6.0.0 (2020-03-02)

### BREAKING CHANGES

- **Update to Angular 9** requires us to update our `peerDependencies`.
  Furthermore, our applications are compiled with Ivy. Only the component
  library is compiled with the view-engine to be backwards compatible.
- Core platform utils changed to be internal.
- Components that are using the outdated Renderer2, which is removed in this
  commit, do this by injecting it via DI in their constructor. Removing the
  renderer constructor parameter is considered a breaking api change.
- Improved `DtChartOptions` for the highcharts typings.
- The `readKeyCode` function from the core package is now internal, because the
  [`KeyboardEvent.keyCode` is deprecated](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode).
- The method `getDtChartColorPalette` and constants
  `DT_CHART_COLOR_PALETTE_ORDERED`, `DT_CHART_COLOR_PALETTES` were moved to the
  `@dynatrace/barista-components/theming` package.

### Bug Fixes

- **schematics:** Fixes an issue in the ng-add schematic.
  ([5a80cd2](https://github.com/dynatrace-oss/barista/commit/5a80cd246e9a83eaf44091dd5424123ee58e1cb4))

### Code Refactoring

- Changed core platform utils to be internal
  ([a5f015b](https://github.com/dynatrace-oss/barista/commit/a5f015b40ae14473bdd685e4675a0ed3cb6bbe96))

### Features

- Update Angular dependencies to version 9.
  ([c930ff2](https://github.com/dynatrace-oss/barista/commit/c930ff2403f7680a3615672ffa6aee2a12123c24))
- Removes Renderer2 to be compatible with ivy.
  ([3b3f773](https://github.com/dynatrace-oss/barista/commit/3b3f77304e5118221b537aa1aa3ca320b815b0d2)),
  closes [#518](https://github.com/dynatrace-oss/barista/issues/518)

## 5.3.0 (2020-02-27)

### Bug Fixes

- **chart:** Fixes an issue where timestamp or range reopened after resizing the
  window.
  ([24c45b8](https://github.com/dynatrace-oss/barista/commit/24c45b8ebfcabe2d3da1ad2af5c3bce011cd65a0)),
  closes [#472](https://github.com/dynatrace-oss/barista/issues/472)
- **chart:** Fixes an issue with the overlay of the selection area not updating.
  ([aca90b4](https://github.com/dynatrace-oss/barista/commit/aca90b46f925791b2710ef9c8affde219b2652e6)),
  closes [#608](https://github.com/dynatrace-oss/barista/issues/608)
- **drawer:** Fixes an issue where drawer backdrop was overlaying the drawer
  body.
  ([30979f1](https://github.com/dynatrace-oss/barista/commit/30979f1a4e53f3336dec639ba6ddef10c8cadbc4)),
  ([af08ca2](https://github.com/dynatrace-oss/barista/commit/af08ca22af3b6a82810ee93a0fa5625eddf9ea7b)),
  closes [#91](https://github.com/dynatrace-oss/barista/issues/91)
- **event-chart:** Add legend color and pattern for filtered.
  ([cd1a1f4](https://github.com/dynatrace-oss/barista/commit/cd1a1f42b4a97403d70f38c89b6cc1339ab976ce)),
  closes [#624](https://github.com/dynatrace-oss/barista/issues/624)
- **event-chart:** Round time labels in x-axis
  ([2e0f5bf](https://github.com/dynatrace-oss/barista/commit/2e0f5bfb57c90186bc692cef1941c2ea781053cb)),
  closes [#614](https://github.com/dynatrace-oss/barista/issues/614)
- **table:** Fixes an issue where the sorting did not update when active binding
  was updated.
  ([6714c25](https://github.com/dynatrace-oss/barista/commit/6714c25f049c8827709ffc23ffe4119e81920db8)),
  closes [#619](https://github.com/dynatrace-oss/barista/issues/619)
- **tag-list:** Fixes an issue where the taglist did not get updated
  ([b796ed5](https://github.com/dynatrace-oss/barista/commit/b796ed5c87fe5ad165cf083fa0d02f2d4c944bda)),
  closes [#603](https://github.com/dynatrace-oss/barista/issues/603)

### Features

- **chart:** Show crosshair for selection area only over plot background.
  ([22e3d98](https://github.com/dynatrace-oss/barista/commit/22e3d980e2960881b9a80dd1fae36af02d0d2f4e)),
  closes [#609](https://github.com/dynatrace-oss/barista/issues/609)
- **context-dialog:** Added footer and closing button to the context dialog.
  ([4ad9d60](https://github.com/dynatrace-oss/barista/commit/4ad9d60639230c41bc49a774d91be8f80d41dfa5))
- **radial-chart:** Added radial chart component.
  ([eefb280](https://github.com/dynatrace-oss/barista/commit/eefb280600a712a0575495bcda47e2d7fcb12b45))
- **testing:** Adds testing module for propagation of an attribute to a
  components overlay.
  ([3c5ee1c](https://github.com/dynatrace-oss/barista/commit/3c5ee1ce2e8231700ea1c87efb88f0f20e88e6c9))

## 5.2.0 (2020-02-13)

### Bug Fixes

- **chart:** Fixes an issue where the tooltip stayed open when the chart was
  destroyed.
  ([395fa44](https://github.com/dynatrace-oss/barista/commit/395fa44f3ec14f35953de4f4b910fa9c6fd58a6d)),
  closes [#579](https://github.com/dynatrace-oss/barista/issues/579)
- **chart, inline-editor, pagination, context-dialog, consumption,
  toggle-button-group, tag-list, empty-state, cta-card, table, filter-field:**
  Fixes an issue with aria label name clashes for a11y.
  ([73532da](https://github.com/dynatrace-oss/barista/commit/73532da1926dbe2cfb04aa70fbf1820a4653e104)),
  closes [#526](https://github.com/dynatrace-oss/barista/issues/526)
  [#79](https://github.com/dynatrace-oss/barista/issues/79)
- **favorite-column:** Favorite column is not modifying the data source anymore.
  ([49a533e](https://github.com/dynatrace-oss/barista/commit/49a533e96c91ad29020e57c0a6fc52d1cbc6530b)),
  closes [#540](https://github.com/dynatrace-oss/barista/issues/540)
- **filter-field:** Fixes alignment of filter field tags.
  ([f720005](https://github.com/dynatrace-oss/barista/commit/f720005abbfa8b391282b58535d603ae470f9776)),
  closes [#573](https://github.com/dynatrace-oss/barista/issues/573)
- **filter-field:** Fixes an issue where options set on an async autocomplete
  are shown.
  ([90e2428](https://github.com/dynatrace-oss/barista/commit/90e2428895f919e955aaba8949649d73a937862d))
- **legend:** Fixes an issue with small spaces between legends.
  ([c0653ad](https://github.com/dynatrace-oss/barista/commit/c0653adfd4e046afb7c201c1847dc772a421a5d0)),
  closes [#73](https://github.com/dynatrace-oss/barista/issues/73)
- **table:** Fixed invalid fill color for favorite-column icon
  ([6e4a2e1](https://github.com/dynatrace-oss/barista/commit/6e4a2e14623a6f863c2f15a83c3340c888102542))
- **tag-list:** Fixes an issue where the show more button was displayed with '0
  More...' when no more tags were present.
  ([71e196c](https://github.com/dynatrace-oss/barista/commit/71e196ccd60d381653879db8b1a127aba1a8f1ac))
- **tag-list:** Fixes an issue where the show more button was not aligned
  correctly.
  ([0aba1c0](https://github.com/dynatrace-oss/barista/commit/0aba1c04aaded1a71c41d9ded50fd21ad6ca9db9))

### Features

- **empty-state:** Added custom empty states.
  ([bc626a7](https://github.com/dynatrace-oss/barista/commit/bc626a78cef93336bfa472948d1ce309e4744e8d)),
  closes [#528](https://github.com/dynatrace-oss/barista/issues/528)
- **filter-field:** Added disable functionality to the filter field.
  ([d6a6833](https://github.com/dynatrace-oss/barista/commit/d6a6833280085434acdb04f42e2b1fccc8c67bc6))

## 5.1.1 (2020-02-06)

### Bug Fixes

- **autocomplete, filter-field:** Fixes an issue with overlay
  ([d3ec0d1](https://github.com/dynatrace-oss/barista/commit/d3ec0d150c7dca8724e89c7290b3b89fe9bf12ee)),
  closes [#451](https://github.com/dynatrace-oss/barista/issues/451)
- **chart:** Fixes an issue where the range could not be re-opened after
  closing.
  ([1718a21](https://github.com/dynatrace-oss/barista/commit/1718a2170a082f4cffade508b85f2b0cd4a6575e))

### Performance Improvements

- **autocomplete:** Fixes an issue when toggling multiple times a subscription
  is not cleaned up.
  ([0b569f6](https://github.com/dynatrace-oss/barista/commit/0b569f6ba474a379a9cb9a6ae146d8ce6bab6a92))

## 5.1.0 (2020-02-04)

### Bug Fixes

- **chart:** Fixes an issue where the range was destroyed on click.
  ([a941b12](https://github.com/dynatrace-oss/barista/commit/a941b129fa4b1fcfba7540ee3f7ba684ecc3f6e7)),
  closes [#100](https://github.com/dynatrace-oss/barista/issues/100)
- **filter-field:** Fixes an issue with button alignments in the filter-field.
  ([c380840](https://github.com/dynatrace-oss/barista/commit/c3808400716a1ecec72ffa2f7ca2ed653a7e9101))
- **filter-field:** Fixes an issue with inconsistent clearAll functionality.
  ([5f6409d](https://github.com/dynatrace-oss/barista/commit/5f6409d9860771f7471bffb3811ed0947c5a3415)),
  closes [#435](https://github.com/dynatrace-oss/barista/issues/435)
- **filter-field:** Fixes an issue with instant submission of free-text.
  ([e87053a](https://github.com/dynatrace-oss/barista/commit/e87053aa71c794d31d3669346a235906b9c6159f)),
  closes [#294](https://github.com/dynatrace-oss/barista/issues/294)
- **legend:** Fixes issue whether the legend item does not work with the new ivy
  engine.
  ([24ffc75](https://github.com/dynatrace-oss/barista/commit/24ffc75b905169732ee5deaff6e13f41349dd6f2)),
  closes [#26](https://github.com/dynatrace-oss/barista/issues/26)
- **tag-add:** Fixes tag add label when zoom is lower that 100%.
  ([407dc6c](https://github.com/dynatrace-oss/barista/commit/407dc6c12527221ff02fee41ff1a956d6ae172c8))
- **tag-add:** Improved styling of button text content.
  ([1820d4b](https://github.com/dynatrace-oss/barista/commit/1820d4b4c9d25dc9cecb13ed377dcc74f9231d42))
- **tag-list:** Fixes rendering of Tag-List when loading a page.
  ([3d5b52b](https://github.com/dynatrace-oss/barista/commit/3d5b52bc3cbbb6203c92eb51e6010b9aa26ac097))
- **timeline-chart:** Fixes an issue where the label of a key timing.
  ([36e6067](https://github.com/dynatrace-oss/barista/commit/36e6067249b38344e5952a5f015bdc8a775d72ec)),
  closes [#495](https://github.com/dynatrace-oss/barista/issues/495)

### Features

- **copy-to-clipboard:** Added `variant` input to control embedded.
  ([bbad528](https://github.com/dynatrace-oss/barista/commit/bbad52893a09cf7e303c93b9bcd020b21a712315)),
  closes [#76](https://github.com/dynatrace-oss/barista/issues/76)
- **filter-field:** Added an overlay if the tag value is being ellipsed.
  ([11d7cce](https://github.com/dynatrace-oss/barista/commit/11d7ccefb690ed18d6a807cb6bc79af5dd37cfc5)),
  closes [#392](https://github.com/dynatrace-oss/barista/issues/392)
- **filter-field:** Added highlighting of the current input value to the
  options.
  ([1effd08](https://github.com/dynatrace-oss/barista/commit/1effd089d7c173b67fca46460180b785d2197faa)),
  closes [#203](https://github.com/dynatrace-oss/barista/issues/203)
- **ng-update:** Added test for .spec file.
  ([4129840](https://github.com/dynatrace-oss/barista/commit/4129840fccbe461d79bd42fc1db9fb01e8730365))
- **table:** Expose currently rendered data from the data source.
  ([b55fa62](https://github.com/dynatrace-oss/barista/commit/b55fa62841d54545d8f648f71d168d7c767eee00)),
  closes [#497](https://github.com/dynatrace-oss/barista/issues/497)
- **tree-table:** Added events for expansion state changes for
  DtTreeTableToggleCell.
  ([b4e7e44](https://github.com/dynatrace-oss/barista/commit/b4e7e441dc84439f2b7c416760ef35f68711faa9)),
  closes [#415](https://github.com/dynatrace-oss/barista/issues/415)

## 5.0.1 (2020-01-24)

### Bug Fixes

- **chart:** Fixes an issue where tooltips in pie/donut charts did not work
  anymore.
  ([5861aaa](https://github.com/dynatrace-oss/barista/commit/5861aaa8c03e68cd487cd99c9e9989004ab0e21a))
- **tag-add:** Fixed alignment styling of the text inside the tag component.
  ([b0104f2](https://github.com/dynatrace-oss/barista/commit/b0104f2a8f95821e59eb44e53c798cbef3f92201))
- **tag-list:** Fixes initial state after page load.
  ([f255c78](https://github.com/dynatrace-oss/barista/commit/f255c78898d8c869ecfaee2781d4f7906912a348))

## 5.0.0 (2020-01-16)

We removed the deprecated root package. Note that you cannot import from the
root package `@dynatrace/barista-components` anymore. Please use the more
explicit imports like `@dynatrace/barista-components/button`.

With the 5.0.0 release two selectors changed:

- `<dt-show-more>` now requires a `button` element. `<button dt-show-more>`.
- The trigger for the expandable panel, previously `[dtExpandablePanel]`, now
  requires a native button element. `button[dtExpandablePanel]`

### Breaking changes

- **filter-field:** Changes the typing for the default-data-source to better
  match the data structures.
- **chart-heatfield:** The constructor no longer takes the chart as a parameter.
- **autocomplete:** Template, panel and optionsGroups members are now internal.
- **button:** Removed deprecated mixin `dt-card-actions-spacing`.
- **chart:** The Eventemitter `tooltipDataChange` doesn't emit null anymore.
- **consumption:** Removed `min` input.
- **expandable-panel:** Changed the expandable-panel trigger selector to require
  a native button element.
- **expandable-panel:** Removed deprecated attributes `opened`, use `expanded`
  instead.
- **expandable-panel:** Removed `disabled` input on trigger. Use the panel's
  disabled input instead.
- **expandable-panel:** Removed preventDefault from click handler.
- **expandable-section:** Removed deprecated attributes `opened`, use `expanded`
  instead.
- **filter-field:** Added new methods to abstract data-source class for more
  flexibility.
- **filter-field:** Changed `unique` do be required at the `dtRangeDef` function
  and on `DtRangeDef` nodes.
- **filter-field:** Changed `validators` do be required on `DtFreeTextDef`
  nodes.
- **filter-field:** Changed parameter `unique` at the function `dtFreeTextDef`
  to be required.
- **filter-field:** Changed type definition for data provided to the
  default-data-source to extend `DtFilterFieldDefaultDataSourceType`.
- **filter-field:** Removed some internal fields from the exports in the module.
- **filter-field:** Changed parameter ordering on definition creation functions.
- **filter-field:** Removed deprecated function `isDtAutocompletValue`.
- **filter-field:** Removed deprecated type `DtAutocompletValue`.
- **font-mixins:** Removed unprefixed deprecated mixins/selectors. Use the `dt-`
  prefixed versions instead.
- **highlights:** Makes elementRef mandatory and removes unnecessary attributes
  from constructor.
- **icon:** Changed peer dependency to the `@dynatrace/barista-icons` package.
- **key-value-list:** Removed `items` content children member from the public
  api.
- **overlay-ref:** Changes componentInstance to be null initially.
- **radio-group:** Removed `onTouched` function from public api.
- **selection-area:** Removed deprecated `selection-area` component. Use
  `dt-chart-range` and `dt-chart-timestamp` instead.
- **show-more:** Changed the dt-show-more selector to require a native button
  element.
- **show-more:** Removed the `dt-show-less-label` directive and added support
  for show less aria-label.
- **table:** Removed `emptyImage`, `emptyTitle` and `emptyMessage` from the
  public api.
- **table:** Removed the `mostRecentRow` member from the public api.
- **tag:** Removed `disabled` attribute.
- **viewport-resizer:** Changed `getOffset` and `offset$` to be abstract fields.

### Bug Fixes

- **chart:** Fixes an issue where the chart did not use the correct fallback
  fonts.
- **chart:** Fixes an issue with not appearing tooltips.
- **chart:** Removes the circular dependency of the chart heatfield.
- **confirmation-dialog:** Set \_activeDialog to null if dialog dismissed.
- **context-dialog:** Fixes positioning issues by removing the closing button
  that tightly coupled the position to the trigger.
- **event-chart:** Fixes an issue where the default color of chart events did
  not align with the legend item.
- **event-chart:** Fixes an issue with universal rendering.
- **filter-field:** Fixes an issue where the filtering of groups did not work
  properly because of a wrong parameter ordering.
- **filter-field:** Fixes an issue where the range was cut off.
- **filter-field:** Fixes and issue where filters are not immediately removed
  when clicking the clear all button.
- **form-field:** Fixes an issue with the label color in a dark theme.
- **micro-chart:** Fixes an issue when using the chart-tooltip in a micro-chart
  without importing the chart-module causes an error.
- **overlay:** Fixes an issue with overlay placement in firefox.
- **progress-bar:** Fixes an issue when using the indicator without importing
  the core indicator-module causes an error.
- **sidenav:** Fixes scrolling behavior of the sidenav component
- **style:** Fixes an issue where the icon for external links had to be provided
  as a background image.
- **theming:** Fixed yellow-700 color value.
- **sidenav:** Fixes an issue where the overlay scroll strategy did not work
  within a sidenav component.

### Features

- **filter-field:** Improves typing for the data structures the
  default-data-source takes.
  ([4f28d1c](https://github.com/dynatrace-oss/barista/commit/4f28d1c6d0cca77aab9b06a774eacae5c1a1c1ee))
- **chart-range:** Add possibility to close chart-range programmatically
- **chart-timestamp:** Add possibility to close chart-timestamp programmatically
- **event-chart:** Added programmatic event selection capabilities to the event
  chart.
- **formatters:** Added maxPrecision parameter to number and percent formatters
  to control the amount of decimals places.
- **schematics:** Added ng-add schematic to install the barista-components to
  get up running.
- **table:** Added a new variant of simple-column `favourite-column`.

## 4.15.1 (2019-12-02)

### Bug Fixes

- **context-dialog:** Fixes positioning issues by removing the closing button
  that tightly coupled the position to the trigger

## 4.15.0 (2019-11-20)

### Bug Fixes

- **chart:** Fixes an issue where the tooltip was not shown when hovering the
  same data point twice.
- **table:** Fixes an issue that if a datasource was set to empty twice in a row
  the empty state was not visible.

### Features

- **container-breakpoint-observer:** Added the if-container-breakpoint
  structural directive for showing/hiding elements based on a container query.
- **event-chart:** Added coloring changes based on UX feedback, changed patterns
  to be defined by lanes, fixed flickering overlay, added pinnable functionality
  to overlays.
- **filter-field:** Adds unique option to range options.
- **overlay:** Added a feature which allows the user to update the implicit
  context on an overlay reference.
- **table:** Allows to apply a sort programmatically by passing a column
  identifier and a direction.

## 4.14.3 (2019-12-02)

### Bug Fixes

- **context-dialog:** Fixes positioning issues by removing the closing button
  that tightly coupled the position to the trigger

## 4.14.2 (2019-11-12)

### Bug Fixes

- **emtpy-state:** Fixes an issue where the layout of the empty state initially
  rendered incorrectly and only updated on window resize.
- **highlight:** Fixes an issue where the intersection observer did not work
  correctly in scrollable containers
- **table:** Fixes an issue where the pagination did not reset correctly when
  passing new data into the datasource

## 4.14.1 (2019-11-05)

### Bug Fixes

- **empty-state, table:** Fixes an issue where the empty state was not layouted
  correctly inside a table on resizing.

- **filter-field:** Fixes an issue where the currently added filter was removed
  if the data via the data-source changes when the `filterChanges` event has
  fired.

## 4.14.0 (2019-11-04)

### Bug Fixes

- **chart:** Fixes an issue where the selection area should reposition on
  viewport resize.

- **chart:** Fixes an issue where the tooltip was not shown on an area chart.

- **filter-field:** Fixes an issue where the `filterChanges` event was not
  emitted when clear-all was clicked.

### Features

- **container-breakpoint-observer:** Added container-breakpoint-observer.

## 4.13.0 (2019-10-30)

### Bug Fixes

- **filter-field:** Fixes broken state if the data source gets updated while in
  edit mode.
- **filter-field:** Removes a hardcoded length check for free text filter.

- **filter-field:** Sets a more sensible default for the filter field dropdown
  max-width.
- **formatter:** Fixed issue with negative inputs.

- **select:** Fixes an issue that the dropdown size was too small.

- **select:** Fixes an issue that the option was sometimes cut off although the
  dropdown could still grow.

### Features

- **filter-field:** Adds the feature to make a tag non deletable and non
  editable.
- **sidenav:** Added the sidenav component.

- **table:** Added a comparator input to SimpleColumns to allow sorting with a
  custom comparator.

- **tabs:** Made dt-tab-body and dtTabBodyPortalOutlet public available.

_Special Thanks_ @david.laubreiter

## 4.12.2 (2019-10-17)

### Bug Fixes

- **chart:** Fixes an error where the TouchEvent was not defined on Safari
  browser

## 4.12.1 (2019-10-16)

### Bug Fixes

- **button:** Fixes a contrast issue with nested buttons in odd table-rows by
  using a darker shade of gray for the hover on nested buttons in general.
- **chart:** Fixes an issue where the chart emitted a timeframe change event
  without interaction

- **chart:** Fixes an issue where the timeframe-change event is emitted twice
  when a timeframe is selected.

- **chart:** Fixes an issue where the timestamp was shifted by the legend offset
  when it was set programatical

- **filter-field:** Fixes an issue where distinct did not work properly when
  loading data asynchronously.

- **formatters:** Fixes an issue where very small numbers where rounded to 0

## 4.12.0 (2019-10-14)

### Bug Fixes

- **chart:** Fixes an issue where the chart selection area overlay needed a
  custom viewport size to disappear and reposition.

- **chart:** Fixes an issue where the wrong cursor was displayed if a chart
  selection was possible.

- **chart:** Optimizes the performance of the selection area overlay.

- **filter-field:** Fixes an issue where the "from" value can be smaller than
  the "to" value in the range.

- **formatters:** Fixes an issue where an error was thrown due to improper
  arguments that where passed to the date range formatter.

- **select:** Fixes an issue where the select dropdown was not growing in width
  with the select element.

### Features

- **table:** Added dtExpandableRowContent directive that enables lazy loading of
  expandable row content.
- **tag-add:** Added tag-add and tag-list component.

## 4.11.0 (2019-10-07)

### Bug Fixes

- **confirmation-dialog:** Fixes an issue where the dark theme was not applied.

- **filter-field:** Fixes and issue where the filter-tags where pushed all the
  way to the right when editing another filter.

- **highlight:** Fixes an issue when certain html entities are escaped in the
  highlights rendered text.
- **table:** Fixes an issue where the sort header did not apply sorted-styling
  when not providing a sortDirection.

### Features

- **filter-field:** Added clear-all button to allow removing all active filters.

- **stepper:** Added stepper component.

### Special Thanks

Todd Baert

## Backport: 4.10.1 (2019-10-17)

### Bug Fixes

- **chart:** Fixes an error where the TouchEvent was not defined on Safari
  browser
- **confirmation-dialog:** Fixes an issue where the dark theme was not applied.

- **filter-field:** Fixes and issue where the filter-tags where pushed all the
  way to the right when editing another filter

- **highlight:** Fixes an issue when certain html entities are escaped in the
  highlights rendered text.
- **table:** Fixes an issue where the sort header did not apply sorted-styling
  when not providing a sortDirection

## 4.10.0 (2019-10-02)

### Bug Fixes

- **button:** Fixes the distance between two buttons.
- **empty-state:** Fixes an issue where the icons had a wrong position in
  Firefox and Edge.

- **filter-field:** Fixes an issue where the currentFilter event was not emitted
  when the editing of a range has been completed.

- **form-field:** Fixes an issue where the label padding was not aligned with
  our 4px grid.

### Features

- **event-chart:** Added missing features for version 1, including custom colors
  for events, event merging, custom providable overlay, better legend detection
  and testing
- **filter-field:** Added support for floating point numbers in filter field
  range input.
- **table:** Added styling for text-buttons within a certain component context.

## 4.9.0 (2019-09-30)

### Bug Fixes

- **filter-field:** Fixes an issue where the spinner was placed in an odd
  positions in certain scenarios. The spinner is now replacing the filter icon
  in loading states.

- **highlight:** Fixes performance issues when updating terms on a lot of
  highlight component at once.

### Features

- Add aria-labelledby input to components that only had an aria-label

- **chart:** Adds touch support for the chart selection area and added the
  keyboard support to move the whole selection.

## 4.8.4 (2019-09-24)

### Bug Fixes

- **filter-field:** Fixes an issue where the spinner was placed in an odd
  positions in certain scenarios. The spinner is now replacing the filter icon
  in loading states.

## 4.8.3 (2019-09-23)

### Bug Fixes

- **empty-state:** Fixes an issue where expressionChangedAfterChecked error was
  thrown when the viewportResizer provided sync value.
- **filter-field:** Fixes an issue where distinct hasn't been set properly due
  to a falsely applied parent-autocomplete for options.

## 4.8.2 (2019-09-23)

### Bug Fixes

- **chart:** Fixes an issue where the bounding client rect could not be
  retrieved on IE Edge.

## 4.8.1 (2019-09-13)

### Bug Fixes

- **top-bar-navigation:** Fixes a problem where styling was not applied due to a
  wrong css selector

## 4.8.0 (2019-09-13)

### Bug Fixes

- **chart:** Fixes an issue where the selection area was affected by the width
  of the charts y-axis label when applied programmatically.

- **filter-field:** Fixes issue where filters can not be set programmatically
  when some data is loaded asynchronously.

### Features

- **chart:** Added seriesVisibilityChange output that emits whenever a
  legend-item is clicked and a series visibility changes.

- **consumption:** Deprecated redundant input 'min' in consumption component.

- **filter-field:** Added support for unique free-text filters.

- **top-bar-navigation:** Added the Top Bar Navigation component.

## Backport: 4.7.3 (2019-09-25)

### Bug Fixes

- **chart:** Fixes an issue where the bounding client rect could not be
  retrieved on IE Edge.

## 4.7.2 (2019-09-11)

### Bug Fixes

- **empty-state:** Fixes an issue where an expression has changed after checked

## 4.7.1 (2019-09-09)

### Bug Fixes

- **chart:** Fixes an issue that the build optimizer removed the highcharts
  global settings during builds with the prod flag

- **event-chart:** Fixes issue where svg element for pattern definitions had a
  size and did overlay other elements.

## 4.7.0 (2019-09-03)

### Bug Fixes

- **chart:** Fixes an issue that the chart selection area overlay pushed itself
  on the screen.
- **chart:** Fixes an issue that the range was able to grow outside the
  boundaries when the drag started on a series.
- **chart:** Fixes an issue where the change detection of the overlay did not
  work when the component was onPush

- **chart:** Provides new default options for legendItemClick event handler for
  non pie charts that prevent all legend items to be disabled.
- **consumption:** Fixes an issue where ARIA heading role was hard-coded.
- **empty-state:** Fixes an issue where empty state did not scale in a
  responsive way.

- **filter-field:** Fixes an issue where the edit mode did not reset when a
  filter is removed.

- **overlay:** Fixes an issue where positioning in svg elements was off.

### Features

- **chart:** Added a closed output to the range and timestamp component.

- **event-chart:** Added event chart as an experimental component. Note that the
  event-chart is not part of the root package - please import from
  @dynatrace/barista-components/event-chart

- **expandable-text:** Added expandable-text component.

- **filter-field:** Added free text validation to the filter field with Angular
  forms validators.

- **table-search:** Added table-search component.

## 4.6.1 (2019-08-26)

### Bug Fixes

- **core:** Changes css selector for optgroup to avoid potential oom exception

## 4.6.0 (2019-08-23)

### Bug Fixes

- **chart:** Fixes an issue where the references are lost on the selection area
  when the chart series or options are updated.

- **chart:** Fixes chart time config defaults to useUTC=true and use the users
  timezone
- **inline-editor:** Fixes an issue that the inline editor did not work with
  validators correctly
- **table:** Fixes an issue that the info-group icon was not colored correctly
  when only using expandable-rows

### Features

- **breadcrumbs:** Added dtBreadcrumbsItem directive and deprecated
  dt-breadcrumbs-item component

- **Logger:** Add stack param to LogEntry

- **secondary-nav:** Added the dt-secondary-nav component

### Special Thanks

Arnaud Crowther, Kamil Knitter and Bartosz Bobin

## 4.5.0 (2019-08-19)

### Bug Fixes

- **button:** Fixes issue that disabled anchor buttons would still trigger
  pointer events
- **chart:** Fixes issue where the selection-area-action directive was not
  applied because of a broken selector.
- **filter-field:** Fixes an issue where the spacing between range operators and
  input was missing

- **font-styles:** Adds the pre tag to be covered by the monospaced font styles

### Features

- **confirmation-dialog:** Added confirmation dialog component

- **table:** Added the ability to define customSortAccessor function for the
  DtTableDataSource

- **table:** Exposes the dtColumnProportion on SimpleColumns

## 4.4.1 (2019-08-08)

### Bug Fixes

- **tslint:** Remove prettier dependency from shipped tslint config

## 4.4.0 (2019-08-07)

### Bug Fixes

- **chart:** Adds fallback for missing IntersectionObserver
- **chart:** Fixes an edge case where the selection area was outside the chart
  with a specific data set

- **chart:** Fixes an issue where highcharts would not update all options when
  using the update method on the chart object

- **micro-chart:** Fixes an issue where the series was not properly cloned
  before mutation and therefore microcharts with the same series would influence
  each other
- **tree-table:** Fixes spacing for info-groups in the tree-table

### Features

- **empty-state:** Added empty state component

- **filter-field:** Adds data types for the DtFilterFieldDefaultDataSource

- **menu:** Added menu component

- **table, cta-card:** Deprecated dt-table-empty-state and cta-card

## 4.3.0 (2019-07-31)

### Bug Fixes

- **chart:** Fixes an issue where the chart tooltip is positioned off on mouse
  move.
- **chart:** Fixes an issue where the tooltip was not opened again after the
  user scrolled.

- **chart:** Fixes an issue that the tooltip was misplaced when the chart was
  not fully visible.

- **filter-field:** Fixes an issue where the selected range values have been
  removed when clicking an input field in the range overlay in the edit mode.

- **filter-field:** Fixes issue where larger numbers are cut of in the range
  input fields.
- **legend:** Fixes issue where legend items did not wrap on smaller screens.

- **overlay:** Fixes issue where overlay position was not correct when hovering
  child elements of the overlay trigger.
- **select:** Fixes an issue where options where cut off even with very short
  values.

### Features

- **chart:** Add Keyboard support for the chart selection area to add proper
  accessibility.

- **timeline-chart:** Added possibility to add overlays to markers.

- **schematics:** Create new schematic for generating linting rules.

## 4.2.1 (2019-07-26)

### Bug Fixes

- **deps:** Added d3-scale to library peer depencencies

## 4.2.0 (2019-07-25)

### Bug Fixes

- **filter-field:** Fixes an issue where the range filter failed to set
  programmatically

- **filter-field:** Fixes an issue with the filter field not correctly resetting
  when cancelling edit mode

- **filter-field:** Fixes weird spacing for range labels

- **overlay:** Fixes an issue when hovering over child elements of the trigger
  the overlay is destroyed and recreated.

- **overlay:** Fixes an issue where the instance of the component created in the
  overlay was not applied to the respective property on the overlay ref.

- **table:** Fixes an issue where the dtColumnMinWidth input did not handle
  strings correctly

### Features

- **progress-bar:** Added dark theme styles

- **timeline-chart:** Added possibility to set key timing marker

- **timeline-chart:** Added possibility to show an overlay for timing marker.

- **timeline-chart:** Added timeline chart

## 4.1.1 (2019-07-22)

### Bug Fixes

- **chart:** Fixes an issue where the value in the overlay was wrong, due to a
  missing offset in the calculation of the position on the x axis.

- **chart:** Fixes an issue where the overlay of the range/timestamp changed
  it's size when scrolled.

- **icon:** Fixes an issue where the setting of the default color broke the API
  contract
- **microchart:** Fixes an issue where null values were not shown as
  interpolated values in dt-micro-chart

- **table:** Fixes issue where the sort icon had a wrong color in unsorted
  columns

## 4.1.0 (2019-07-17)

### Bug Fixes

- **checkbox:** Fixes issue where the hover style was not applied because of a
  wrong CSS selector
- **context-dialog:** Fixes that the context dialog did not clear the overlay
  correctly when closed by pressing ESC
- **filter-field:** Fixes an issue where the filter field input value was not
  reset correctly when an option was selected and the following options where
  filtered incorrectly

- **filter-field:** Fixes an issue where the original value was not restored
  when cancelling a filter editing action

- **icon:** Fixes an issue where the default icon color was not applied
  correctly
- **switch, radio, checkbox:** Fixes issue where styling of switch, radio and
  checkbox was not aligned

### Features

- The focus style of various components is now visible only programmatic or
  keyboard interaction

- **context-dialog:** Adds an input to set custom css classes on the overlay
  panel to scope styles better
- **tabs:** Exposes currently registered tabs for testing purposes

## 4.0.1 (2019-07-10)

### Bug Fixes

- **filter-field:** Fixes an issue where autocomplete was not editable after
  async update

## 4.0.0 (2019-07-09)

### Breaking changes

- Updated dt-iconpack peer-dependency to v2.0.22

- **filter-field:** `DtFilterField` and `DtFilterFieldDefaultDataSource` classes
  are now generics

### Bug Fixes

- **table:** Fixes an issue where the table sort styling is lost when adding
  columns dynamically

### Features

- **filter-field:** Added possibility to load async data

- **table:** Updated table header appearance to fit new Barista design
  guidelines

## 3.2.0 (2019-07-08)

### Bug Fixes

- **chart:** Fixes an issue where the tooltip did not refresh when the hovered
  series changed
- **expandable-section:** Fixes an issue that aligns `expandable-section` styles
  with UX guidelines

- **filter-field:** Fixes an issue where the `filter-field-range` did not let go
  of the focus once opened

- **filter-field:** Fixes an issue where the max-width of the `filter-field-tag`
  was not aligned with Barista guideline
- **highlight:** Fixes an issue where the output text casing was wrongfully
  transformed when highlighting

- **show-more:** Fixed default hover styles and added missing dark theme styles

- **show-more:** Fixes an issue where show more was still clickable when
  disabled

### Features

- **chart:** Added `dt-chart-selection-area`

- **chart:** Deprecated the `dt-selection-area` component

- **chart:** Add Barista example and API documentation for the range component

- **chart:** Add focus method for programmatically focusing the range and
  timestamp
- **chart:** Add focus trapping for creation of timestamp and range

- **chart:** Create a chart hairline that follows mouse position on a selection
  area to indicate the current position

- **chart:** Create a selection area overlay that indicates the selected area
  (range) or time (timestamp)

- **expandable-panel:** Added `expanded` and `disabled` inputs and
  `expandChange`, `expanded` and `collapsed` outputs

- **expandable-panel:** Deprecated inputs (`opened`, `disabled`) as these values
  should be handled by the panel itself

- **expandable-section:** Added `expanded` input and `expandChange`, `expanded`
  and `collapsed` outputs, according to the updates of the expandable panel
  component
- **linting:** Added `dt-expandable-trigger-is-button` rule

## 3.1.0 (2019-07-02)

### Bug Fixes

- **card:** Fixes broken subtitle attribute selector
- **chart:** Fixes an edge case with timezones in highcharts
- **context-dialog:** Changes the first interactive element to be focused
  instead of the closing button
- **filter-field:** Fixes an issues where the `filter-field-tag` did not apply
  the overflow styling

- **radio:** Fixes issue where the `radio-button` label text was not wrapping

- **select:** Fixes broken appearance when used inside a `dt-form-field`

- **overlay:** Fixes an issue where the `overlay` is not dismissed when the
  `overlay-trigger` destroyed.

- **tag:** Introduced maximum width for `tags` to prevent overly long labels
  from breaking the layout

- **tag:** Made the remove button focusable instead of the `dt-tag` itself

### Features

- **button-group:** Added the functionality to programatically set focus to the
  `button-group` and `button-group-item`.
- **consumption:** Added consumption component

- **filter-field:** Added the filter-range capability to the `filter field`

- **formatters:** Add `date-range` pipe to transform two timestamps to a unified
  range string
- **tag:** Deprecated `disabled` input for `dt-tag` since there is no proper use
  case for it

## 3.0.1 (2019-06-19)

### Bug Fixes

- Fixes wrong peer dependency version numbers for `@angular/core`,
  `@angular/common` and `@angular/cdk`

## 3.0.0 (2019-06-19)

### Breaking changes

- Upgrade to Angular 8

- **form-field:** Removes fixed width and specifies `dt-form-field` as a block
  element.
- **key-value-list:** Property columns does now return the correct value, not
  the calculated one.

- **overlay:** Fixes missing overlayContainer parameter for position strategy in
  Cdk version 8.

- **pagination:** Removed unused interface `PaginationNumberType`.

- **table:** Fixes missing params for new `CdkTable` in Cdk version 8.

- **chart:** Removed deprecated overlay property in `chart-tooltip`.

- **copy-to-clipboard:** Removed deprecated `disabled` property.

- **info-group-cell:** Removed deprecated component `info-group-cell`.

- **pagination:** Removed deprecated `maxPages` input. Use the `length` and
  `pageSize` inputs instead.

- **table:** Removed deprecated `contentViewContainer` property.

- **table:** Removed deprecated `isLoading` property. Use `loading` instead.

- **table:** Removed deprecated `multiple` input. Use the `multiExpand` of the
  dt-table instead.

- **table:** Removed deprecated `openedChange` output from the `expandable-row`.
  Use `expanded`, `collapsed` or `expandChange` instead.

- **table:** Removed deprecated `toggle` method on the `expandable-row`.

- **table:** Removed deprecated `compareString` function. Use the
  `compareStrings` function from `@dynatrace/barista-components/core`.

- **table:** Removed deprecated `expandedRow` property. Use `openedChange`
  output of `dt-expandable-row` instead.

- **table:** Removed deprecated type `DtSortDirection`. Import it directly from
  `@dynatrace/barista-components/core`.

- **table-sort:** Adds sort icon to all sortable columns.

- **linting:** Enable a first set of custom lint rules.

### Bug Fixes

- **filterfield:** Fixes an issue where the suggestions were not shown
  immediately for freetext.

### Features

- **context dialog:** Adapted the background color of the content panel.

- **linting:** Added `dt-breadcrumbs-alt-text` rule and initialized as warnings.

- **linting:** Added `dt-inline-editor-alt-text` rule and initialized as
  warnings.

## 2.10.0 (2019-06-04)

### Bug Fixes

- **heatfield:** Fixes an issue when the Heatfield end was undefined

- **select:** Fixes issue where horizontal scrollbars are visible when options
  with long labels are in place

- **table:** Fixes an issue where data-source will break when removing the
  pagination at runtime.

- **theming:** Adds missing color yellow-400

### Features

- **styles**: Font mixins are prefixed with `dt-`. Mixins without the prefix are
  now deprecated.

### Deprecations

- **styles**: `custom-font-styles`, `custom-font-size`, `default-font`,
  `monospace-font`, `main-font`, `fluid-font-size`, `h1-font`, `h2-font`,
  `h3-font`, `code-font`, `label-font`

### Special Thanks

Dorota Zaranska

## 2.9.0 (2019-05-24)

### Features

- **filter-field:** Added possibility to apply filters programmatically

## 2.8.0 (2019-05-23)

### Bug Fixes

- **chart:** Fixes an issue where chart-gridlines overlapped chart data after
  updating
- **copy-to-clipboard:** Fixes the text color of the input within dark theme
  context
- **key-value-list:** Fixes an issue where the key-value-list did not create
  columns correctly if the container was too small
- **showmore:** Fixes an issue where the disabled property was not correctly
  handled when set programmatically

### Features

- **context-dialog:** Added the capability to add a header section to the
  context-dialog component

- **core:** Publicly provide compare functions for string and number values

- **table:** Add default datasource with pagination

- **table:** Add show more example for the table

- **table:** Added text overflow handling for simple columns

- **toast:** Pauses the toast dismiss timer when hovered with the mouse

## 2.7.0 (2019-05-13)

### Bug Fixes

- **colors:** Add missing white color definition to scss variables

- **progress-circle:** Fixes an issue where the progress-circle sizing was wrong
  and therefore it could not be easily filled with a background-color

### Features

- **breadcrumbs:** Adds appropriate aria attributes

- **inline-editor:** Adds input for aria attributes for save and cancel buttons

- **linting:** Add alt text rule for context dialog and adapt examples

- **linting:** Add dt-radio-button-name-required rule

- **linting:** Add dt-select-requires-label rule

- **linting:** Add dt-tab-group-requires-tabs rule

- **linting:** Add dt-tab-requires-label and dt-tab-requires-content rules

- **linting:** Add dt-tile-icon-needs-icon rule

## 2.6.1 (2019-04-29)

### Bug Fixes

- **context-dialog:** Fixes an issue where multiple overlays could be created

- **context-dialog:** Fixes an issue where the context dialog's overlay was not
  destroyed correctly when the context dialog was destroyed

- **context-dialog:** Fixes an issue where the context dialog overlay was not
  closed when a custom trigger was destroyed

- **table:** Fixes an issue that unstyled sorted cells when a sortable header
  unregistered
- **table:** Fixes an issue where a dtSortEvent was emitted when the table was
  destroyed

## 2.6.0 (2019-04-23)

### Bug Fixes

- **chart:** Fixes issue where tooltip was not updated if parent was set to
  onPush
- **table:** Fixes an issue where cells were not reacting to sortable columns
  being removed

### Features

- **key-value-list:** Added input to enable specifying number of columns

- **pagination:** Added possibility to setup pagination based on item count and
  page size
- **pagination:** Improved a11y
- **table:** Added a DtTableDatasource and DtSimpleColumn types for easier table
  usage

### Special Thanks

Dorota Zaranska

## 2.5.0 (2019-04-15)

### Bug Fixes

- **chart:** Fixes an issue with tooltip flickering

- **chart:** Fixes an issue that the tooltip was not positioned correctly for
  category axis, correctly positions tooltip now vertically centered for all
  chart types except pie charts

- **chart:** Fixes chart changing colors on second render sometimes

- **context-dialog:** The close button's ARIA label can now be set as input

- **overlay:** Fixes an issue where the overlay was not closed when backdrop was
  clicked in pinned mode

- **overlay:** Fixes an issue where the CD was not triggered correctly when
  mousevents were handled on the trigger

### Features

- **filter-field:** Filter tags can now be accessed and disabled.
- **linting:** Add a dt-checkbox-alt-text rule

- **linting:** Add copy-to-clipboard and toggle-button-item rules

- **linting:** Add dt-card-needs-content rule

- **linting:** Add dt-card-needs-title rule

- **linting:** Add dt-info-group-needs-title-and-icon rule

- **linting:** Add dt-loading-distractor-no-empty rule

- **linting:** Add dt-radio-button-alt-text rule

- **linting:** Add dt-show-more-no-empty rule and refactor text alternative
  check
- **linting:** Add dt-tab-content-no-empty rule

- **linting:** Add dt-tab-label-no-empty rule

- **linting:** Add no-empty rules for switch, tag and tile components

- **linting:** Add rules to ensure that a dt-tile contains all required content
  elements
- **linting:** Add rules to find direct children of dt-card and dt-tile

- **linting:** Add text alternative rule for selection area

## 2.4.0 (2019-04-05)

### Bug Fixes

- **chart:** Fixes missing highcharts logs on server for dt-chart

- **filter-field, input-field:** Fixes missing background color

- **linting:** Fixes issue where more than one dt-icon elements are not allowed
  in a dt-icon-button

- **linting:** Fixes issue where dt-button linting rule does only allow text but
  no child components

- **toggle-button:** Fixes wrong border width

### Features

- **highlight:** Added dt-highlight component for marking terms in text

## 2.3.0 (2019-04-01)

### Bug Fixes

- **filter-field:** Fixes an issue where autocomplete panel is not closed when
  pressing the escape key

- **overlay:** Fixes an issue where the DtOverlay could no longer handle SVG
  elements as origins due to a `@angular/cdk` update and instance checks. Note
  this forces us to increase the peerDependency to at least 7.3.0 of the
  `@angular/cdk` package.
- **overlay:** Fixes an issue where the overlay would refocus an element. This
  caused a scrolling issue with elements that were focused outside the viewport

- **table:** Moved multi expand property from row to table and deprecated
  `multi` property on expandable row

### Features

- **table:** Expand state of a row can be set programmatically

## 2.2.0 (2019-03-18)

### Bug Fixes

- **filter-field:** Fixes an issue where the suggestion list could not be
  filtered and stayed visible even without suggestions

- **filter-field:** Fixes an issue where the autocomplete could overlap other
  parts of the page although the filter field input was not visible. Page level
  scrolling is now blocked when the filter field's autocomplete is open

### Features

- **linting:** Adds setup to ship angular-components specific a11y and usage
  linting rules

### Special Thanks

Bernd Farka

## 2.1.0 (2019-03-12)

### Bug Fixes

- **autocomplete:** Fixes optionSelections not being emitted when the list of
  options changes
- **bundle:** Bumped peer dependency version for dt-iconpack
- **card:** Fixes card title and card-subtitle sizing
- **filter-field:** Added missing filters property in filter changes event
- **filter-field:** Fixes an issue where the filter field was not reset
  correctly when a filter was removed

- **filter-field:** Fixes an issue where the filters could not be removed if all
  options were already selected

- **filter-field:** Fixes an issue where the input reset would trigger to early
  and stop further progress
- **filter-field:** Fixes issues with streams inside the filter field

- **icon:** Downgrades icon error to warning

- **table:** Expandable trigger focus no longer gets cut off

- **toggle-button-group:** Fixed hover and active color on
  toggle-button-group-items

### Features

- **filter-field:** Added possibility to filter autocomplete options by their
  view value

## 2.0.0 (2019-03-05)

### Breaking Changes

- **alert:** Uniontype `DtAlertSeverity` is no longer available for input
  severity. Use `'error'` or `'warning'` instead.
- **alert:** Input severity no longer takes `undefined` as a value for hiding
  the alert. Use `'error'` or `'warning'` for severity values and `*ngIf` to
  show or hide it.

```html
<dt-alert *ngIf="isVisible" severity="warning">...</dt-alert>
```

- **card:**: The `<dt-card-actions>` component is no longer available. Use
  `<dt-card-title-actions>` instead.
- **chart:** The constant `CHART_COLOR_PALETTE_ORDERED` has been renamed to
  `DT_CHART_COLOR_PALETTE_ORDERED`.
- **chart:** The constant `CHART_COLOR_PALETTES` has been renamed to
  `DT_CHART_COLOR_PALETTES`.
- **core:** The enum `Colors` has been renamed to `DtColors`
- **key-value-list:** The key and value inputs on the item have been removed.
  Use the `dt-key-value-list-key` and `dt-key-value-list-value` elements
  instead.

```html
<dt-key-value-list>
  <dt-key-value-list-item *ngFor="let entry of entries">
    <dt-key-value-list-key>{{ entry.key }}</dt-key-value-list-key>
    <dt-key-value-list-value>{{ entry.value }}</dt-key-value-list-value>
  </dt-key-value-list-item>
  <dt-key-value-list></dt-key-value-list>
</dt-key-value-list>
```

- **logger:** The value `WARN` for the enum DtLogLevel has been renamed to
  `WARNING`.
- **micro-chart:** Uniontype `DtMicroChartSeries` is no longer available for the
  series input. Use `Observable<DtChartSeries[]>` , `Observable<DtChartSeries>`,
  `DtChartSeries[]` or `DtChartSeries` instead.
- **table:** `<dt-expandable-cell>` is now required if you use a
  `<dt-expandable-row>`.

### Features

- **filter-field:** Added DataSource as main API entry point

- **filter-field:** Added support for distinct values in default data source

- **table:** Expandable row trigger moved to dt-expandable-cell instead of whole
  row

## 1.8.3 (2019-03-04)

### Bug Fixes

- **autocomplete:** fixes custom panel classes are not set
- **chart, selection-area:** fixes an issue where the highcharts instance would
  be updated after it has been destroyed

- **selection-area:** fixes an issue where the position of the selection area on
  the chart was not correct

- **selection-area:** fixes an issue where the selection-area-container was
  moved to the content of the parent component, if the parent used ng-content

- **selection-area:** fixes the issue that the overlay of the selection area
  pushed itself on the screen

## 1.8.2 (2019-02-25)

### Bug Fixes

- **info-group:** adds support for being used inside a dt-table

- **micro-chart:** fixes `markers` default option for micro-charts

- **table:** fixes styling for sorting when rows are added dynamically

- **tile:** fixes border styling to fully fit design specifications

### Deprecations

**info-group-cell**: Use info-group instead

## 1.8.1 (2019-02-18)

### Bug Fixes

- **chart:** adds default options for no utc time and marker disabling

- **copy-to-clipboard:** fixes background color for copy to clipboard input
  field on dark background

- **loading-distractor:** fixes font-weight of loading distractor label

- **selection-area:** fixes cursor not being correct

- **selection-area:** fixes issue that events where captured on plotbackground
  rather than an eventlayer on top

- **selection-area:** fixes issue that overlay was not pushing itself on the
  screen horizontally

- **selection-area:** fixes issue that selection area was created on mousedown
  rather than on mousemove

- **table, chart:** fixes chart not shrinking in expandable table row

- **select:** fixes overlay positioning when opening to the right and sticking
  outside of the screen

## 1.8.0 (2019-02-12)

### Bug Fixes

- **chart:** fixes rendering issue in highcharts

- **context-dialog:** fixes issue where context dialog only opens to the left

- **select:** fixes size of select in IE11

- **table-with-sorting:** fixes IE11 not displaying sort header correctly

### Features

- **info-group:** adds new info group component

- **micro-chart:** add option to interpolate data gaps and show it with a
  different visual style

### Special Thanks

Dominik Messner, Rene Panzar

## 1.7.1 (2019-02-05)

### Bug Fixes

- **table, tree-table:** fixes issue where table or tree-table is not fully
  rendered in AOT mode

## 1.7.0 (2019-02-04)

### Bug Fixes

- **schematics:** fixes dt-component schematic to fit new lib structure

### Features

- **table, info-group-cell:** adds info-group-cell component that provides
  proper styling for two lines and an icon inside a table cell

- **toggle-button-group:** add toggle-button-group

- **tree-table:** add tree table component

## 1.6.2 (2019-01-31)

### Bug Fixes

- **link:** removes extend-dependency in styles for better compatibility with
  newer sass versions

## 1.6.1 (2019-01-25)

### Bug Fixes

- **breadcrumbs:** fixes issue where arrow is not styled correctly
- **filter-field:** fixes change event not beeing emitted when removing node

## 1.6.0 (2019-01-24)

### Bug Fixes

- **button:** fixes icon button not working with anchor tags

- **card, cta-card:** fixes spacing issue between content and footer actions

- **radio:** fixes underlying label not expanding to width of radio button

### Features

- **breadcrumbs:** added color input to breadcrumbs, they now accept `main`,
  `error` or `neutral`.

- **theming:** added neutral variation to themes

## 1.5.1 (2019-01-21)

### Bug Fixes

- **bar-indicator:** fixes broken internal styling

## 1.5.0 (2019-01-18)

### Bug Fixes

- **switch:** fixes colors on dark background

- **table:** fixes font weight for table's empty state

- **typography:** updated styles for h1-h3 headlines

### Features

- **bar-indicator:** added bar-indicator component

- **drawer:** added basic drawer component

### Special Thanks

Katrin Freihofner, Thomas Heller, Lara Aigmueller, Lukas Holzer

## 1.4.0 (2019-01-16)

### Bug Fixes

- **btn-group:** fixes broken responsive behavior on small screen

- **card, cta-card:** fixes spacing between action buttons

- **checkbox:** fixes issue when disabled attribute is set without a value

- **table:** fixes sorted cells not beeing bold like in the header cell

- **toast:** fixes subsequent toasts not being shown immidiately after the
  previous toast disappears

### Features

- **colors:** added missing colors definition to DtColors

- **inline-editor:** added keyboard support for save and cancel

### Special Thanks

Ramon Arenal, Bartosz Bobin, Lukas Holzer, Katrin Freihofner

## 1.3.0 (2019-01-09)

### Bug Fixes

- **button:** added active style for nested buttons in the dark theme

- **switch:** fixes switch styles to fit the styleguide

- **colors:** add missing colors definition (red, green, shamrockgreen) to
  DtColors

### Features

- **card:** added card footer actions

- **charts:** added function for selecting color palette based on nrOfMetrics
  and Theme

### Deprecations

- **card:** `dt-card-actions` has been replaced with `dt-card-title-actions`

### Special Thanks

Katrin Freihofner, Thomas Heller, Bartosz Bobin

## 1.2.1 (2019-01-02)

### Bug Fixes

- **microchart:** fixes dt-tooltip with microchart

- **chart, microchart:** fixes dt-tooltip not working when used in an app built
  with the prod flag

## 1.2.0 (2018-12-20)

### Bug Fixes

- **chart:** make tooltip positioning more resilient to highcharts

- **micro-chart:** improved highcharts default options

- **micro-chart:** improved colors and fixed theming

### Features

- **micro-chart:** added possibility to format labels

### Special Thanks

Alexander Lagler, Manfred Del Fabro

## 1.1.0 (2018-12-20)

### Bug Fixes

- **chart:** fixes issue where tooltip did not work with single metric data from
  highcharts
- **selection-area:** fixes positioning of the selection area element if a
  parent has position relative

### Features

- **key-value-list:** Added possibility to use html for key and value

- **progressbar:** Added description and count capabilities

- **table:** Added interactiveRows property to table which makes the rows
  interactive(hover)

### Special Thanks

Bartosz Bobin, Thomas Heller, Luca Liguori

## 1.0.0 (2018-12-18)

### Bug Fixes

- **alert:** Replaced inline svg with dtIcons

- **autocomplete:** fixes dynamically changing autocompletes

- **breadcrumb:** remove router dependency

- **button:** fixes removes theming capabilities for main active theme color on
  button
- **button:** fixes button active issue in IE11+

- **button:** fixes icon container change detection issue

- **button:** fixes icon size in buttons

- **button:** fixes missing styles on anchor

- **button:** fixes nested button background issue

- **button:** fixes existing icon container when icon has been removed

- **button:** fixes superscript issue

- **card:** fixes wrong spacing on icon
- **card:** removes outer spacing (margin)

- **chart:** added correct font
- **chart:** added default global options

- **chart:** Added loading text to make it i18n compatible

- **chart:** fixes issue that options where mutated instead of cloned
- **chart:** corrected easing functions overshoot

- **chart:** fixed chart area icon
- **chart:** fixed chart blue theme

- **chart:** fixed legend overrides
- **chart:** fixed legend sizing, coloring, disabled
- **chart:** fixed no options/series passed
- **chart:** fixed reflow issue
- **chart:** fixes for pie chart coloring

- **chart:** fixes missing legendicons when building an app with the prod flag

- **chart:** fixes tooltip not being wrapped when changing options at runtime

- **chart:** remove all change-detection cycles that were triggered by
  highcharts events
- **chart:** fixes subscription cleanup on destroy

- **chart:** update chart selection model

- **chart:** use lodash merge function to deeply mergeClone options

- **checkbox:** disable animation timing in IE

- **checkbox:** fixes container size issue in non border-box environments

- **context-dialog:** added spacing for closing btn, improved focus management
- **context-dialog:** fixes issue where context-dialog does not close on blur

- **core:** rename log level name for consistency

- **expandable-section, expandable-panel:** Changed inline svg to dtIcon

- **expandable-section, expandable-panel:** fixes issue where openedChange does
  not fire when opened property is set
- **expandable-section, expandable-panel:** fixes issue where openedChange
  subscription is not unsubscribed
- **filter-field:** fixes broken nested button override

- **filter-field:** handle input keyup only on free text

- **filter-field:** node removal on backspace

- **formatters:** added chaining capabilities

- **formatters:** make pipes more resilient to strange input

- **form-field:** fixes spacing of error messages

- **form-field:** fixes issue where error element is overlapped

- **form-field:** fixes multiple styling issues with icons and buttons
- **icon:** fixes issue where icons are loaded multiple times

- **icon:** changed icon color to white on darkthemes
- **icon:** add escaping inside icon registry

- **inline-editor:** fixes edit icon
- **inline-editor:** fixes IE issue

- **inline-editor:** model now updates only when save is pressed
- **inline-editor:** fixes issue when dt-errors are not passed to form-field

- **input:** fixes red outline in firefox

- **input:** fixes disabled background color
- **input:** fixes design issues

- **input:** fixes ie issue

- **loading-distractor:** added spinner
- **loading-spinner:** fixes animation when only spinner is used
- **loading-spinner:** fixes xml namespace issue for svg in angular core
- **progress-bar:** Fixes IE11 issue

- **progress-circle:** fix path not being drawn correctly in IE

- **progress-circle:** fixed getter calling setter and emitting event

- **progress-circle:** scales icons in progress-circle

- **radio:** fixes issue when setting disabled directly

- **select:** fixes valueChange emitting undefined when value zero has been set

- **select:** removes themeable arrow icon in select

- **select:** fixes multiline issue

- **table:** fix chart in expandable table not being hidden correctly

- **table:** fixed sort icon direction

- **tag:** removed outside spacing

- **theming:** add missing blue colors

- **theming:** fixes issue where theme did not unsubscribe from parent properly
- **theming:** fixes theme inheritance

- **theming:** fixes issue when getting an error if there is no parent theme

### Features

- **alert:** added alert component
- **autocomplete:** added autocomplete

- **button:** added button component
- **button:** added loading spinner for button

- **button:** added nested variant

- **button:** added icon button

- **card:** added card component
- **chart:** added chart component
- **chart:** added heatfield & overload prevention capabilities

- **chart:** added axis defaults for font size

- **chart:** added support for area range

- **chart:** added custom legend icons
- **chart:** added loading distractor to the chart
- **chart:** handles visibility without data

- **chart:** handles empty points inside tooltip

- **chart:** added new color strategy and colors

- **chart:** added support for series and options as observables
- **chart:** added support for tooltip
- **cta-card:** added CTA card component
- **checkbox:** added checkbox component

- **checkbox:** added dark theme

- **context-dialog:** added context dialog component
- **filter-field:** added filter-field

- **form-field:** added form-field component
- **icon:** added icon component and registry

- **icon:** added dt-iconpack support

- **icon:** added dt-iconpack integration

- **indicator:** added indicator component

- **input:** added input directive
- **input, form-field:** added autofill monitor

- **loading-distractor:** added loading-distractor component
- **option:** added option component; to be used in other components such as
  select
- **overlay:** added overlay component

- **progress-circle:** added progress-circle

- **radio:** added radio

- **select:** added select component

- **selection-area:** added selection-area

- **table:** added table component
- **table:** added problem indicator capabilities

- **table:** added sorting capabilities

- **table:** added sticky header

- **tabs:** added tabs

- **theming:** added theming

- **tile:** added tile component
- **tile:** added icons to tile

- **toast:** added toast component

- **viewport-resizer:** added viewport resizer
