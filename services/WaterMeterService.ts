import type { WaterMeterResponse } from '~/models/WaterMeter';

export type WaterMeterService = {
    updateWaterMeterStatus: (meterNumber: string) => Promise<WaterMeterResponse>;
};
