import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class WaterBillEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'water-bill',
            version: 'v1',
        });
    }

    public static readonly LIST = Endpoint.getPath('');
    public static readonly DETAIL = Endpoint.getPath('[id]');
    public static readonly DOWNLOAD = Endpoint.getPath('[id]/download');
}
