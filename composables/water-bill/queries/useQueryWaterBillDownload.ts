import type { UseMutationOptions } from '@tanstack/vue-query';
import type { ErrorResponse } from '~/types';
import { WaterBillServiceImpl } from '~/services/impl/WaterBillServiceImpl';

export const useMutationGetWaterBillDownload = (
    options?: UseMutationOptions<
        File,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const waterBillService = new WaterBillServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => waterBillService.getWaterBillDownload(id),
        ...options,
    });
};
