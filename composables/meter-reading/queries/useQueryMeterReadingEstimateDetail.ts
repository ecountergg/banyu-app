import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MeterReadingEstimateResponse } from '~/models/MeterReading';
import type { ErrorResponse } from '~/types';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useMutationGetMeterReadingEstimateDetail = (
    options?: UseMutationOptions<
        MeterReadingEstimateResponse,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const meterReadingService = new MeterReadingServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => meterReadingService.getMeterReadingEstimateDetail(id),
        ...options,
    });
};
