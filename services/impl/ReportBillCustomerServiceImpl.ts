import type { ReportBillCustomerService } from '../ReportBillCustomerService';
import { useNuxtApp } from '#app';
import { ReportBillCustomerEndpoint } from '~/endpoints/ReportBillCustomerEndpoint';

export class ReportBillCustomerServiceImpl implements ReportBillCustomerService {
    async getReportBillCustomerDownload(): Promise<File> {
        return await useNuxtApp().$api<File>(ReportBillCustomerEndpoint.DOWNLOAD);
    }
}
