# Alert

## Imports

You have to import the `DtAlertModule` when you want to use the `dt-alert`:

```typescript
@NgModule({
  imports: [
    DtAlertModule,
  ],
})
class MyModule {}
```

## Initialization

To apply the dynatrace alert component, use the `<dt-alert>` element. Example:

<docs-source-example example="WarningAlertExampleComponent"></docs-source-example>

| Attribute        | Description    |
| ---------------- | -------------- |
| `dt-alert`       | The component  |

## Options & Properties

| Name  | Type | Default | Description |
| --- | --- | --- | --- |
| `[severity]` | `error | warning | undefined` | `undefined` | Sets the alert severity |
| `<ng-content>` | | | The text (error/warning) message which should be displayed. |

## Examples

### Error

<docs-source-example example="ErrorAlertExampleComponent"></docs-source-example>

### Interactive example

<docs-source-example example="InteractiveAlertExampleComponent"></docs-source-example>

### Dark mode

<docs-source-example example="DarkAlertExampleComponent"></docs-source-example>
