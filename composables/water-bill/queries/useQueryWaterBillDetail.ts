import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterBillDetailResponse } from '~/models/WaterBill';
import type { ErrorResponse } from '~/types';
import { WaterBillServiceImpl } from '~/services/impl/WaterBillServiceImpl';

export const useMutationGetWaterBillDetail = (
    options?: UseMutationOptions<
        WaterBillDetailResponse,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const waterBillService = new WaterBillServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => waterBillService.getWaterBillDetail(id),
        ...options,
    });
};
