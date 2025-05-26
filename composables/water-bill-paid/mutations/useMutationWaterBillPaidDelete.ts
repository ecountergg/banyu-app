import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterBillPaidResponse } from '~/models/WaterBillPaid';
import type { ErrorResponse } from '~/types';
import { WaterBillPaidServiceImpl } from '~/services/impl/WaterBillPaidServiceImpl';

export const useMutationWaterBillPaidDelete = (
    options?: UseMutationOptions<
        WaterBillPaidResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const waterBillPaidService = new WaterBillPaidServiceImpl();
    return useMutation({
        mutationFn: (id: string) => waterBillPaidService.deleteWaterBillPaid(toValue(id)),
        ...options,
    });
};
