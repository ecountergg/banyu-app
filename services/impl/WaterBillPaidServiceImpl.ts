import type { WaterBillPaidDto } from '~/models/dtos/WaterBillPaidDto';
import type { WaterBillPaidPaginationSearchParams } from '~/models/params/WaterBillPaidPaginationSearchParams';
import type { WaterBillPaidDetailResponse, WaterBillPaidListResponse, WaterBillPaidResponse } from '~/models/WaterBillPaid';
import type { WaterBillPaidService } from '~/services/WaterBillPaidService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { WaterBillPaidEndpoint } from '~/endpoints/WaterBillPaidEndpoint';

export class WaterBillPaidServiceImpl implements WaterBillPaidService {
    async getWaterBillPaidList(params: WaterBillPaidPaginationSearchParams): Promise<GenericPagination<WaterBillPaidListResponse[]>> {
        const mapParams = {
            ...params,
            areaCode: params.areaCode && params.areaCode?.length > 0 ? params.areaCode.join(',') : undefined,
        };

        return await useNuxtApp().$api<GenericPagination<WaterBillPaidListResponse[]>>(WaterBillPaidEndpoint.LIST, {
            query: {
                ...mapParams,
                page: params.page - 1,
            },
        });
    }

    async getWaterBillPaidDetail(code: string): Promise<WaterBillPaidDetailResponse> {
        return await useNuxtApp().$api<WaterBillPaidDetailResponse>(WaterBillPaidEndpoint.DETAIL.replace('[id]', code));
    }

    async getWaterBillPaidDownload(code: string): Promise<File> {
        return await useNuxtApp().$api<File>(WaterBillPaidEndpoint.DOWNLOAD.replace('[id]', code));
    }

    async initPaymentWaterBillPaid(code: string, data: WaterBillPaidDto): Promise<WaterBillPaidDetailResponse> {
        return await useNuxtApp().$api<WaterBillPaidDetailResponse>(WaterBillPaidEndpoint.INIT_PAYMENT.replace('[id]', code), {
            method: 'PUT',
            body: {
                ...data,
            },
        });
    }

    deleteWaterBillPaid(id: string): Promise<WaterBillPaidResponse> {
        return useNuxtApp().$api<WaterBillPaidResponse>(
            WaterBillPaidEndpoint.DELETE.replace('[id]', id),
            {
                method: 'DELETE',
            },
        );
    }
}
