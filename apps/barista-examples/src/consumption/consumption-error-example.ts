import { Component } from '@angular/core';

@Component({
  selector: 'error-consumption-example',
  template: `
    <dt-consumption [max]="max" [value]="value" color="error">
      <dt-consumption-icon aria-label="Log file">
        <dt-icon name="logfile"></dt-icon>
      </dt-consumption-icon>
      <dt-consumption-title>
        Log analytics
      </dt-consumption-title>

      <dt-consumption-count>
        {{ value | dtMegabytes }}/{{ max | dtMegabytes }}
      </dt-consumption-count>

      <dt-consumption-label>
        Restricted overages
      </dt-consumption-label>

      <dt-consumption-overlay>
        <dt-consumption [max]="max" [value]="value" color="error">
          <dt-consumption-title>
            Log analytics
          </dt-consumption-title>
          <dt-consumption-subtitle>
            Quota
          </dt-consumption-subtitle>
          <dt-consumption-count>
            {{ value | dtMegabytes }}/{{ max | dtMegabytes }}
          </dt-consumption-count>
        </dt-consumption>
      </dt-consumption-overlay>
    </dt-consumption>
  `,
})
export class ConsumptionErrorExample {
  max = 8000000000;
  value = 8000000000;
}
