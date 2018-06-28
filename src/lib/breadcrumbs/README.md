# Breadcrumbs

{{component-demo name="DefaultBreadcrumbsExampleComponent"}}

Breadcrumbs are used to navigate and to indicate the currently viewed page.

## Imports

You have to import the `DtBreadcrumbsModule` when you want to use `dt-breadcrumbs` or `dt-breadcrumbs-item` elements:

```typescript
@NgModule({
  imports: [
    DtBreadcrumbsModule,
  ],
})
class MyModule {}
```

## Options & Properties

### dt-breadcrumbs

`dt-breadcrumbs` element has no configuration options. It's just a wrapper for the `dt-breadcrumbs-item` elements

### dt-breadcrumbs-item

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `<ng-content>` | html | HTML to be rendered as item content |
| `[href]` | string | any[] | Value passed to the `routerLink` attribute underneath, accepts the same values as the directive. Element will be item as active automatically if the href attribute matches the current route. |
| `[external]` | boolean | undefined | false | If empty or truthy parameter given, the `href` attribute will not be interpreted as internal router link but rather as en external href |
| `[active]` | boolean | undefined | undefined | Renders a text or a link if the parameter is true or false, respectively. If the parameter is not set, `dt-breadcrumbs-item` automatically determines, whether it should be rendered as an active by comparing the passed href value with the current route. |

## Examples

### Listening to an observable

{{component-demo name="ObservableBreadcrumbsExampleComponent"}}

### External

{{component-demo name="ExternalBreadcrumbsExampleComponent"}}

### Active state automatically retrieved from Router

{{component-demo name="AutoActiveBreadcrumbsExampleComponent"}}

### Dark

{{component-demo name="DarkBreadcrumbsExampleComponent"}}
