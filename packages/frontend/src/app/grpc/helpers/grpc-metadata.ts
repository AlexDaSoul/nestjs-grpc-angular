import { Metadata } from 'grpc-web';
import { environment } from '@environments/environment';

export function grpcJwtMetadata(token: string = null): Metadata {
    return {
        Authorization: token || localStorage.getItem(environment.token),
    };
}
