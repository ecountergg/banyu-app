import type { WaterBillPaidDto } from '~/models/dtos/WaterBillPaidDto';
import type { WaterBillPaidPaginationSearchParams } from '~/models/params/WaterBillPaidPaginationSearchParams';
import type { WaterBillPaidDetailResponse, WaterBillPaidListResponse, WaterBillPaidResponse } from '~/models/WaterBillPaid';
import type { GenericPagination } from '~/types';

export type WaterBillPaidService = {
    getWaterBillPaidList: (params: WaterBillPaidPaginationSearchParams) => Promise<GenericPagination<WaterBillPaidListResponse[]>>;
    getWaterBillPaidDetail: (id: string) => Promise<WaterBillPaidDetailResponse>;
    getWaterBillPaidDownload: (id: string) => Promise<File>;
    initPaymentWaterBillPaid: (id: string, data: WaterBillPaidDto) => Promise<WaterBillPaidDetailResponse>;
    deleteWaterBillPaid: (id: string) => Promise<WaterBillPaidResponse>;
};
