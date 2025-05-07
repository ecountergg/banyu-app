import type { GeneralConfigDataType } from '~/types';

export class GeneralConfigDto {
    code!: string;
    dataType!: GeneralConfigDataType;
    value!: string;

    setCode(code: string): this {
        this.code = code;
        return this;
    }

    setDataType(dataType: GeneralConfigDataType): this {
        this.dataType = dataType;
        return this;
    }

    setValue(value: string): this {
        this.value = value;
        return this;
    }
}
