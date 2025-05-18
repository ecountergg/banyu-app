import type { MeterReadingEstimateResponse } from './MeterReading';

export type WaterBillListResponse = {
    id: string;
    version: number;
    billNumber: string;
    billDate: number;
    dueDate: number;
    createdDate: number;
    lastModifiedDate: number;
    meterNumber: string;
    consumptionCharge: number;
    otherCharges: number;
    totalAmount: number;
    month: number;
    year: number;
    areaCode: string;
    areaDescription: string;
    memberId: string;
    memberName: string;
};
export type WaterBillDetailResponse = WaterBillListResponse & {
    detail: MeterReadingEstimateResponse;
};
export type WaterBillResponse = WaterBillListResponse;
