import type { ReportBillCustomerSearchParams } from '~/models/params/ReportBillCustomerSearchParams';

export type ReportBillCustomerService = {
    getReportBillCustomerDownload: (params: ReportBillCustomerSearchParams) => Promise<File>;
};
