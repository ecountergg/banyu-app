import type { UseQueryOptions } from '@tanstack/vue-query';
import type { WaterBillPaidPaginationSearchParams } from '~/models/params/WaterBillPaidPaginationSearchParams';
import type { WaterBillPaidListResponse } from '~/models/WaterBillPaid';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { WaterBillPaidServiceImpl } from '~/services/impl/WaterBillPaidServiceImpl';

export const useQueryWaterBillPaidList = (
    params: WaterBillPaidPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<WaterBillPaidListResponse[]>>,
) => {
    const waterBillService = new WaterBillPaidServiceImpl();
    const query = useQuery<GenericPagination<WaterBillPaidListResponse[]>>({
        queryKey: ['water-bill-paid-list', params, searchCount],
        queryFn: () => waterBillService.getWaterBillPaidList(params),
        ...options,
    });
    const total = computed(() => Number(query.data.value?.elements ?? 0));
    const results = computed(() =>
        query.data.value && Array.isArray(query.data.value.data) ? query.data.value.data : [],
    );
    const refetch = () => {
        if (params.page > 1)
            params.setFirstPage();
        else query.refetch();
    };
    return { ...query, results, total, refetch };
};
