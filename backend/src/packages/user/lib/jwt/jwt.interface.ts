import { Metadata } from 'grpc';

export interface IUserMeta extends Metadata {
    user: {
        id: string;
    };
}
