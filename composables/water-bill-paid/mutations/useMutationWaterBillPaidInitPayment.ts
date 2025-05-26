import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterBillDto } from '~/models/dtos/WaterBillDto';
import type { WaterBillPaidDto } from '~/models/dtos/WaterBillPaidDto';
import type { WaterBillPaidResponse } from '~/models/WaterBillPaid';
import type { ErrorResponse } from '~/types';
import { WaterBillPaidServiceImpl } from '~/services/impl/WaterBillPaidServiceImpl';

export const useMutationWaterBillPaidInitPayment = (
    id: MaybeRef<string>,
    options?: UseMutationOptions<
        WaterBillPaidResponse,
        ErrorResponse,
        WaterBillDto,
        unknown
    >,
) => {
    const waterBillPaidService = new WaterBillPaidServiceImpl();
    return useMutation({
        mutationFn: (data: WaterBillPaidDto) => waterBillPaidService.initPaymentWaterBillPaid(toValue(id), data),
        ...options,
    });
};
