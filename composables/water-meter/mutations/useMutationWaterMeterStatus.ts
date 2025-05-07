import type { UseMutationOptions } from '@tanstack/vue-query';
import type { WaterMeterResponse } from '~/models/WaterMeter';
import type { ErrorResponse } from '~/types';
import { WaterMeterServiceImpl } from '~/services/impl/WaterMeterServiceImpl';

export const useMutationWaterMeterStatus = (
    options?: UseMutationOptions<
        WaterMeterResponse,
        ErrorResponse,
        MaybeRef<string>,
        unknown
    >,
) => {
    const waterMeterService = new WaterMeterServiceImpl();
    return useMutation({
        mutationFn: (meterNumber: string) => waterMeterService.updateWaterMeterStatus(toValue(meterNumber)),
        ...options,
    });
};
