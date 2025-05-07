import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class WaterMeterEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'water-meter',
            version: 'v1',
        });
    }

    public static readonly ACTIVE = Endpoint.getPath('/active/[meterNumber]');
}
