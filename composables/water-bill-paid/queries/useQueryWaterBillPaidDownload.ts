import type { UseMutationOptions } from '@tanstack/vue-query';
import type { ErrorResponse } from '~/types';
import { WaterBillPaidServiceImpl } from '~/services/impl/WaterBillPaidServiceImpl';

export const useMutationGetWaterBillPaidDownload = (
    options?: UseMutationOptions<
        File,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const waterBillService = new WaterBillPaidServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => waterBillService.getWaterBillPaidDownload(id),
        ...options,
    });
};
