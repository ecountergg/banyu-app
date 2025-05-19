import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterBillPaidDetailResponse } from '~/models/WaterBillPaid';
import type { ErrorResponse } from '~/types';
import { WaterBillPaidServiceImpl } from '~/services/impl/WaterBillPaidServiceImpl';

export const useMutationGetWaterBillPaidDetail = (
    options?: UseMutationOptions<
        WaterBillPaidDetailResponse,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const waterBillService = new WaterBillPaidServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => waterBillService.getWaterBillPaidDetail(id),
        ...options,
    });
};
