export class FormattedValue {

  private readonly NO_DATA = '-';
  displayValue: string | undefined;
  displayUnit: string | undefined;
  displayRateUnit: string | undefined;

  constructor(private readonly _sourceValue: number,
              private readonly _sourceUnit: string,
              private readonly _sourceRateUnit?: string) {
  }

  get sourceValue(): number {
    return this._sourceValue;
  }

  get sourceUnit(): string {
    return this._sourceUnit;
  }

  get sourceRateUnit(): string | undefined {
    return this._sourceRateUnit;
  }

  toString(): string {
    if (this.displayValue === undefined) {
      return this.NO_DATA;
    }

    let text = `${this.displayValue}`;
    if (this.displayUnit !== undefined) {
      text = `${text} ${this.displayUnit}`;
    }
    if (this.displayRateUnit !== undefined) {
      text = `${text}/${this.displayRateUnit}`;
    }

    return text;
  }
}
