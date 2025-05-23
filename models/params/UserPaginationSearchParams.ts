import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class UserPaginationSearchParams extends PaginationSearchParam {
    fullName!: Undefined<string>;
    username!: Undefined<string>;

    constructor() {
        super();
    }

    setFullname(value: Undefined<string>): this {
        this.fullName = value;
        return this;
    }

    setUsername(value: Undefined<string>): this {
        this.username = value;
        return this;
    }
}
