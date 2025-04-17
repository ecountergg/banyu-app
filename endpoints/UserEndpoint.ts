import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class UserEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'user',
            version: 'v1',
        });
    }

    public static readonly LIST = Endpoint.getPath('');
    public static readonly DETAIL = Endpoint.getPath('[id]');
    public static readonly CREATE = Endpoint.getPath('');
    public static readonly UPDATE = Endpoint.getPath('[id]');
    public static readonly DELETE = Endpoint.getPath('[id]');
}
