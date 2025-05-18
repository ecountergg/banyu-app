import type { WaterBillPaginationSearchParams } from '~/models/params/WaterBillPaginationSearchParams';
import type { WaterBillDetailResponse, WaterBillListResponse } from '~/models/WaterBill';
import type { WaterBillService } from '~/services/WaterBillService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { WaterBillEndpoint } from '~/endpoints/WaterBillEndpoint';

export class WaterBillServiceImpl implements WaterBillService {
    async getWaterBillList(params: WaterBillPaginationSearchParams): Promise<GenericPagination<WaterBillListResponse[]>> {
        const mapParams = {
            ...params,
            areaCode: params.areaCode && params.areaCode?.length > 0 ? params.areaCode.join(',') : undefined,
        };

        return await useNuxtApp().$api<GenericPagination<WaterBillListResponse[]>>(WaterBillEndpoint.LIST, {
            query: {
                ...mapParams,
                page: params.page - 1,
            },
        });
    }

    async getWaterBillDetail(code: string): Promise<WaterBillDetailResponse> {
        return await useNuxtApp().$api<WaterBillDetailResponse>(WaterBillEndpoint.DETAIL.replace('[id]', code));
    }

    async getWaterBillDownload(code: string): Promise<File> {
        return await useNuxtApp().$api<File>(WaterBillEndpoint.DOWNLOAD.replace('[id]', code));
    }
}
