import type { UseQueryOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import type { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { USER_TYPE } from '~/constants';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useQueryAreaList = (
    params: AreaPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<AreaListResponse[]>>,
) => {
    const authStore = useAuthStore();
    const userService = new AreaServiceImpl();
    const query = useQuery<GenericPagination<AreaListResponse[]>>({
        queryKey: ['area-list', params, searchCount],
        queryFn: () => userService.getAreaList(params),
        ...options,
    });
    const total = computed(() => Number(query.data.value?.elements ?? 0));
    const results = computed(() => {
        if (authStore.user?.userType === USER_TYPE.SUPER_ADMIN && query.data.value && Array.isArray(query.data.value.data)) {
            return query.data.value?.data;
        }
        if (authStore.user?.userType !== USER_TYPE.SUPER_ADMIN && authStore.user) {
            const areas: AreaListResponse[] = authStore.user.areas.map((area) => {
                return {
                    code: area,
                    description: area,
                    rates: [
                        {
                            tierStart: 0,
                            tierEnd: 0,
                            ratePerUnit: 0,
                        },
                    ],
                };
            });

            return areas;
        }

        return [];
    });

    const refetch = () => {
        if (params.page > 1)
            params.setFirstPage();
        else query.refetch();
    };
    return { ...query, results, total, refetch };
};
