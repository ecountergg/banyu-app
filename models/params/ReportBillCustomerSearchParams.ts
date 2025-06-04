import type { Undefined } from '~/types';

export class ReportBillCustomerSearchParams {
    areaCodes!: Undefined<string[]>;
    billNumber!: Undefined<string>;
    month!: Undefined<number>;
    year!: Undefined<number>;

    setAreaCodes(value: Undefined<string[]>): this {
        this.areaCodes = value;
        return this;
    }

    setBillNumber(value: Undefined<string>): this {
        this.billNumber = value;
        return this;
    }

    setMonth(value: Undefined<number>): this {
        this.month = value;
        return this;
    }

    setYear(value: Undefined<number>): this {
        this.year = value;
        return this;
    }
}
