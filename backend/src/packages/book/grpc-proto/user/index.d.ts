import * as $protobuf from "protobufjs";
import { Observable } from "rxjs";
import { Metadata } from "grpc";
export namespace api {

    namespace user {

        class UserService extends $protobuf.rpc.Service {
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): UserService;
            public createUser(request: api.user.ICreateUserReq, callback: api.user.UserService.CreateUserCallback): void;
            public createUser(request: api.user.ICreateUserReq): Observable<api.user.UserRes>;
            public updateUser(request: api.user.IUser, callback: api.user.UserService.UpdateUserCallback): void;
            public updateUser(request: api.user.IUser): Observable<api.user.UserRes>;
            public deleteUser(request: api.user.IUserReq, callback: api.user.UserService.DeleteUserCallback): void;
            public deleteUser(request: api.user.IUserReq): Observable<api.user.UserRes>;
            public getUser(request: api.user.IUserReq, callback: api.user.UserService.GetUserCallback): void;
            public getUser(request: api.user.IUserReq): Observable<api.user.User>;
        }

        namespace UserService {

            type CreateUserCallback = (error: (Error|null), response?: api.user.UserRes) => void;

            type UpdateUserCallback = (error: (Error|null), response?: api.user.UserRes) => void;

            type DeleteUserCallback = (error: (Error|null), response?: api.user.UserRes) => void;

            type GetUserCallback = (error: (Error|null), response?: api.user.User) => void;
        }

        interface ICreateUserReq {
            name?: (string|null);
            email?: (string|null);
            password?: (string|null);
        }

        class CreateUserReq implements ICreateUserReq {
            constructor(p?: api.user.ICreateUserReq);
            public name: string;
            public email: string;
            public password: string;
            public static create(properties?: api.user.ICreateUserReq): api.user.CreateUserReq;
        }

        interface IUserReq {
            id?: (string|null);
        }

        class UserReq implements IUserReq {
            constructor(p?: api.user.IUserReq);
            public id: string;
            public static create(properties?: api.user.IUserReq): api.user.UserReq;
        }

        interface IUserRes {
            status?: (api.user.EUserStatus|null);
            message?: (string|null);
        }

        class UserRes implements IUserRes {
            constructor(p?: api.user.IUserRes);
            public status: api.user.EUserStatus;
            public message: string;
            public static create(properties?: api.user.IUserRes): api.user.UserRes;
        }

        enum EUserStatus {
            USER_ACTION_UNKNOWN = 0,
            USER_ACTION_SUCCESS = 1,
            USER_ACTION_ERROR = 2
        }

        interface IUser {
            id?: (string|null);
            name?: (string|null);
            email?: (string|null);
        }

        class User implements IUser {
            constructor(p?: api.user.IUser);
            public id: string;
            public name: string;
            public email: string;
            public static create(properties?: api.user.IUser): api.user.User;
        }

        class AuthService extends $protobuf.rpc.Service {
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): AuthService;
            public auth(request: api.user.IAuthReq, callback: api.user.AuthService.AuthCallback): void;
            public auth(request: api.user.IAuthReq): Observable<api.user.AuthRes>;
            public updateAuth(request: api.user.IUpdateAuthReq, callback: api.user.AuthService.UpdateAuthCallback): void;
            public updateAuth(request: api.user.IUpdateAuthReq): Observable<api.user.UpdateAuthRes>;
        }

        namespace AuthService {

            type AuthCallback = (error: (Error|null), response?: api.user.AuthRes) => void;

            type UpdateAuthCallback = (error: (Error|null), response?: api.user.UpdateAuthRes) => void;
        }

        interface IAuthReq {
            email?: (string|null);
            password?: (string|null);
        }

        class AuthReq implements IAuthReq {
            constructor(p?: api.user.IAuthReq);
            public email: string;
            public password: string;
            public static create(properties?: api.user.IAuthReq): api.user.AuthReq;
        }

        interface IAuthRes {
            token?: (string|null);
        }

        class AuthRes implements IAuthRes {
            constructor(p?: api.user.IAuthRes);
            public token: string;
            public static create(properties?: api.user.IAuthRes): api.user.AuthRes;
        }

        interface IUpdateAuthReq {
        }

        class UpdateAuthReq implements IUpdateAuthReq {
            constructor(p?: api.user.IUpdateAuthReq);
            public static create(properties?: api.user.IUpdateAuthReq): api.user.UpdateAuthReq;
        }

        interface IUpdateAuthRes {
            token?: (string|null);
        }

        class UpdateAuthRes implements IUpdateAuthRes {
            constructor(p?: api.user.IUpdateAuthRes);
            public token: string;
            public static create(properties?: api.user.IUpdateAuthRes): api.user.UpdateAuthRes;
        }
    }
}
