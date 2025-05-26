import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class WaterBillPaidEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'water-bill/paid',
            version: 'v1',
        });
    }

    public static readonly LIST = Endpoint.getPath('');
    public static readonly DETAIL = Endpoint.getPath('[id]');
    public static readonly DELETE = Endpoint.getPath('[id]');
    public static readonly DOWNLOAD = Endpoint.getPath('[id]/download');
    public static readonly INIT_PAYMENT = Endpoint.getPath('[id]/init-payment');
}
