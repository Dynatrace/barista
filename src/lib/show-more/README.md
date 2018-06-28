# Show More

This component create a show more pagination widget.

{{component-demo name="DefaultShowMoreExampleComponent"}}

## Imports

You have to import the `DtShowMoreModule` when you want to use the `dt-show-more`:

```typescript

@NgModule({
  imports: [
    DtShowMoreModule,
  ],
})
class MyModule {}

```

## Initialization

To apply the dynatrace show more component, use the `<dt-show-more>` element with some content as text. To use a
*Show less* label an additional `<dt-show-less-label>` tag can be used.

## Options & Properties

### Button group

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `<ng-content>` |   |   | The (optional) text which gets displayed above the arrow |
| `[showLess]` | `boolean` | `true` | The property which stores the expanded state of the component. If the value is `true`, then the arrow of the component is pointing downwards. |
| `[tabIndex]` | `number` | `0` | Sets and gets the tabIndex property |
| `(changed)` | `event<void>` | | The event which gets fired when the state changes. The event is fired when the user clicks on the component, as well as using SPACE or ENTER keys. |

## Examples

### Without text

{{component-demo name="NoTextShowMoreExampleComponent"}}

### Interactive example

{{component-demo name="InteractiveShowMoreExampleComponent"}}

### Dark theme

{{component-demo name="DarkThemeShowMoreExampleComponent"}}


