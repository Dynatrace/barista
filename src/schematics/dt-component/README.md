# Dynatrace Component
Adds a new component to the `@dynatrace/angular-components` library and creates a docs page with a default example

```
ng generate @dynatrace/components-schematics:dt-component my-new-component #or shorter
ng g @dynatrace/components-schematics:dtc my-new-component
```

- Adds new component to the library with the correct exports
- Adds docs page with default example
- Optional: Adds the component to the universal kitchensink - defaults to true
- Optional: Adds the component to the ui-tests-app and creates a ui-test spec file. - defaults to false

The following options are available: 
- universal - boolean - default: true
- ui-test - boolean - default: false

e.g.
```
ng g @dynatrace/components-schematics:dtc my-new-component -universal=false -ui-test=true
```