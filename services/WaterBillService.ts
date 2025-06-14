import type { WaterBillDto } from '~/models/dtos/WaterBillDto';
import type { WaterBillPaginationSearchParams } from '~/models/params/WaterBillPaginationSearchParams';
import type { WaterBillDetailResponse, WaterBillListResponse, WaterBillResponse } from '~/models/WaterBill';
import type { GenericPagination } from '~/types';

export type WaterBillService = {
    getWaterBillList: (params: WaterBillPaginationSearchParams) => Promise<GenericPagination<WaterBillListResponse[]>>;
    getWaterBillDetail: (id: string) => Promise<WaterBillDetailResponse>;
    getWaterBillDownload: (id: string) => Promise<File>;
    initPaymentWaterBill: (id: string, data: WaterBillDto) => Promise<WaterBillDetailResponse>;
    deleteWaterBill: (id: string) => Promise<WaterBillResponse>;
};
