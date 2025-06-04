import type { UseMutationOptions } from '@tanstack/vue-query';
import type { ErrorResponse } from '~/types';
import { ReportBillCustomerServiceImpl } from '~/services/impl/ReportBillCustomerServiceImpl';

export const useMutationReportBillCustomerDownload = (
    options?: UseMutationOptions<
        File,
        ErrorResponse,
        unknown,
        unknown
    >,
) => {
    const reportBillCustomerService = new ReportBillCustomerServiceImpl();
    return useMutation({
        mutationFn: () => reportBillCustomerService.getReportBillCustomerDownload(),
        ...options,
    });
};
