import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class ReportBillCustomerEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'report/bill-customer',
            version: 'v1',
        });
    }

    public static readonly DOWNLOAD = Endpoint.getPath('');
}
