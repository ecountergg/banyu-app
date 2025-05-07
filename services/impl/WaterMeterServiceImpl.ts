import type { WaterMeterResponse } from '~/models/WaterMeter';
import type { WaterMeterService } from '~/services/WaterMeterService';
import { useNuxtApp } from '#app';
import { WaterMeterEndpoint } from '~/endpoints/WaterMeterEndpoint';

export class WaterMeterServiceImpl implements WaterMeterService {
    updateWaterMeterStatus(meterNumber: string): Promise<WaterMeterResponse> {
        return useNuxtApp().$api<WaterMeterResponse>(
            WaterMeterEndpoint.ACTIVE.replace('[meterNumber]', meterNumber),
            {
                method: 'PUT',
            },
        );
    }
}
