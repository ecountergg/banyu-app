import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MeterReadingResponse } from '~/models/MeterReading';
import type { ErrorResponse } from '~/types';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useMutateionMeterReadingDelete = (
    options?: UseMutationOptions<
        MeterReadingResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const meterReadingService = new MeterReadingServiceImpl();
    return useMutation({
        mutationFn: (id: string) => meterReadingService.deleteMeterReading(toValue(id)),
        ...options,
    });
};
