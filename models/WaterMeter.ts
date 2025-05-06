export type WaterMeterListResponse = {
    id: string;
    meterNumber: string;
    installationDate: number;
    previousReading: number;
    lastReadingDate: number;
};
export type WaterMeterResponse = WaterMeterListResponse;
