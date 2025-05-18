import type { WaterBillPaginationSearchParams } from '~/models/params/WaterBillPaginationSearchParams';
import type { WaterBillDetailResponse, WaterBillListResponse } from '~/models/WaterBill';
import type { GenericPagination } from '~/types';

export type WaterBillService = {
    getWaterBillList: (params: WaterBillPaginationSearchParams) => Promise<GenericPagination<WaterBillListResponse[]>>;
    getWaterBillDetail: (id: string) => Promise<WaterBillDetailResponse>;
    getWaterBillDownload: (id: string) => Promise<File>;
};
