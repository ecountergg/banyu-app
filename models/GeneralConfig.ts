import type { GeneralConfigDataType } from '~/types';

export type GeneralConfigListResponse = {
    code: string;
    dataType: GeneralConfigDataType;
    value: string;
};
export type GeneralConfigDetailResponse = GeneralConfigListResponse;
export type GeneralConfigResponse = GeneralConfigListResponse;
