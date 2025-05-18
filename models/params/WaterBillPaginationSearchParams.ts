import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class WaterBillPaginationSearchParams extends PaginationSearchParam {
    areaCode!: Undefined<string[]>;
    billNumber!: Undefined<string>;
    memberName!: Undefined<string>;
    month!: Undefined<number>;
    year!: Undefined<number>;

    constructor() {
        super();
    }

    setAreaCode(value: Undefined<string[]>): this {
        this.areaCode = value;
        return this;
    }

    setBillNumber(value: Undefined<string>): this {
        this.billNumber = value;
        return this;
    }

    setMemberName(value: Undefined<string>): this {
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
