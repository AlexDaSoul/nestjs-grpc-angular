import { Metadata } from 'grpc';
export interface IJwtMeta<T> extends Metadata {
    payload: T;
}
