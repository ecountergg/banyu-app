import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterBillResponse } from '~/models/WaterBill';
import type { ErrorResponse } from '~/types';
import { WaterBillServiceImpl } from '~/services/impl/WaterBillServiceImpl';

export const useMutationWaterBillDelete = (
    options?: UseMutationOptions<
        WaterBillResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const waterBillService = new WaterBillServiceImpl();
    return useMutation({
        mutationFn: (id: string) => waterBillService.deleteWaterBill(toValue(id)),
        ...options,
    });
};
