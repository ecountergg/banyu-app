import type { MeterReadingEstimateResponse } from './MeterReading';
import type { WaterBillListResponse } from './WaterBill';
import type { PaidStatus } from '~/types';

export type WaterBillPaidListResponse = WaterBillListResponse & {
    paidDate: number;
    status: PaidStatus;
};
export type WaterBillPaidDetailResponse = WaterBillPaidListResponse & {
    detail: MeterReadingEstimateResponse;
};
export type WaterBillPaidResponse = WaterBillPaidListResponse;
