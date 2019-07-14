import { api } from '@grpc/user/user';
export declare class User implements api.user.User {
    id: string;
    email: string;
    name: string;
    role: number;
    password: string;
    createdAt: number;
    updatedAt: number;
}
