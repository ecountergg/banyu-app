import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterBillDto } from '~/models/dtos/WaterBillDto';
import type { WaterBillResponse } from '~/models/WaterBill';
import type { ErrorResponse } from '~/types';
import { WaterBillServiceImpl } from '~/services/impl/WaterBillServiceImpl';

export const useMutationWaterBillInitPayment = (
    id: MaybeRef<string>,
    options?: UseMutationOptions<
        WaterBillResponse,
        ErrorResponse,
        WaterBillDto,
        unknown
    >,
) => {
    const waterBillService = new WaterBillServiceImpl();
    return useMutation({
        mutationFn: (data: WaterBillDto) => waterBillService.initPaymentWaterBill(toValue(id), data),
        ...options,
    });
};
