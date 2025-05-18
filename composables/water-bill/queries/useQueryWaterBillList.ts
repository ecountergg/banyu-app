import type { UseQueryOptions } from '@tanstack/vue-query';
import type { WaterBillPaginationSearchParams } from '~/models/params/WaterBillPaginationSearchParams';
import type { WaterBillListResponse } from '~/models/WaterBill';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { WaterBillServiceImpl } from '~/services/impl/WaterBillServiceImpl';

export const useQueryWaterBillList = (
    params: WaterBillPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<WaterBillListResponse[]>>,
) => {
    const waterBillService = new WaterBillServiceImpl();
    const query = useQuery<GenericPagination<WaterBillListResponse[]>>({
        queryKey: ['water-bill-list', params, searchCount],
        queryFn: () => waterBillService.getWaterBillList(params),
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
