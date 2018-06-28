# Chart

{{component-demo name="ChartDefaultExampleComponent"}}

This dt-chart component wraps highcharts to be used within angular.

## Imports

You have to import the `DtChartModule` when you want to use the `dt-chart`:

```typescript

@NgModule({
  imports: [
    DtChartModule,
  ],
})
class MyModule {}

```

## Initialization

To use the dynatrace chart, add the `<dt-chart options="myoptions" series="myseries" ></dt-chart>` element to the view:

## Options & Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `@Input() options` | `DtChartOptions | undefined` | `undefined` | Sets options for the chart. DtChartOptions extends from Highcharts.Options, but removes the series property. The series property is passed as it's own input |
| `@Input() series` | `Observable<Highcharts.IndividualSeriesOptions[]> | Highcharts.IndividualSeriesOptions[] | undefined` | `undefined` | Sets the series of the chart. The type can either be a stream of series data for continues updates or a static array. |
| `@Output() updated` | `EventEmitter<void>` | Event emitted when the chart options or series are updated |

## Methods

| Name | Description | Return value |
| --- | --- | --- |
| `getSeries` | Gets the series currently used in the chart | `DtChartSeries` |
| `getAllIds` | returns all series ids used in the chart | `Array<string>` |

## Theming

The chart will take a chart color for the series data if no color is specified for the series. If no theme is set the default color palette used is "turquoise"

*Example:*

```html

<div dtTheme="purple">
  <dt-chart options="myoptions" series="myseries" ></dt-chart>
</div>

```

## Reflow

The chart needs the **ViewportResizer** provider.
ViewportResizer notifies the dt-chart component about Viewport changes that trigger a reflow of the dt-chart.

## Examples

### Stream example

{{component-demo name="ChartStreamExampleComponent"}}

### Theming example

{{component-demo name="ChartThemingExampleComponent"}}

### Loading example

{{component-demo name="ChartLoadingExampleComponent"}}
