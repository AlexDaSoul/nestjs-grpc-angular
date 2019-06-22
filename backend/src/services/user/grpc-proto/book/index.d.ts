import * as $protobuf from "protobufjs";
import { Observable } from "rxjs";
import { Metadata } from "grpc";
export namespace api {

    namespace book {

        class BookService extends $protobuf.rpc.Service {
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): BookService;
            public createBook(request: api.book.ICreateBookReq, metadata?: Metadata): Observable<api.book.Book>;
            public removeBook(request: api.book.IRemoveBookReq, metadata?: Metadata): Observable<api.book.BookStatusRes>;
            public updateBook(request: api.book.IBook, metadata?: Metadata): Observable<api.book.BookStatusRes>;
            public getBook(request: api.book.IBook, metadata?: Metadata): Observable<api.book.Book>;
            public userBooksStream(request: api.book.IUserBooksStreamReq, metadata?: Metadata): Observable<api.book.UserBooksStreamRes>;
        }

        namespace BookService {

            type CreateBookCallback = (error: (Error|null), response?: api.book.Book) => void;

            type RemoveBookCallback = (error: (Error|null), response?: api.book.BookStatusRes) => void;

            type UpdateBookCallback = (error: (Error|null), response?: api.book.BookStatusRes) => void;

            type GetBookCallback = (error: (Error|null), response?: api.book.Book) => void;

            type UserBooksStreamCallback = (error: (Error|null), response?: api.book.UserBooksStreamRes) => void;
        }

        interface IBookStatusRes {
            status?: (api.book.EBookStatus|null);
        }

        class BookStatusRes implements IBookStatusRes {
            constructor(p?: api.book.IBookStatusRes);
            public status: api.book.EBookStatus;
            public static create(properties?: api.book.IBookStatusRes): api.book.BookStatusRes;
        }

        interface ICreateBookReq {
            userId?: (string|null);
            name?: (string|null);
            autor?: (string|null);
            preview?: (string|null);
        }

        class CreateBookReq implements ICreateBookReq {
            constructor(p?: api.book.ICreateBookReq);
            public userId: string;
            public name: string;
            public autor: string;
            public preview: string;
            public static create(properties?: api.book.ICreateBookReq): api.book.CreateBookReq;
        }

        interface IRemoveBookReq {
            id?: (string|null);
        }

        class RemoveBookReq implements IRemoveBookReq {
            constructor(p?: api.book.IRemoveBookReq);
            public id: string;
            public static create(properties?: api.book.IRemoveBookReq): api.book.RemoveBookReq;
        }

        interface IUserBooksStreamReq {
            userId?: (string|null);
        }

        class UserBooksStreamReq implements IUserBooksStreamReq {
            constructor(p?: api.book.IUserBooksStreamReq);
            public userId: string;
            public static create(properties?: api.book.IUserBooksStreamReq): api.book.UserBooksStreamReq;
        }

        interface IUserBooksStreamRes {
            books?: (api.book.IBook[]|null);
        }

        class UserBooksStreamRes implements IUserBooksStreamRes {
            constructor(p?: api.book.IUserBooksStreamRes);
            public books: api.book.IBook[];
            public static create(properties?: api.book.IUserBooksStreamRes): api.book.UserBooksStreamRes;
        }

        enum EBookStatus {
            UNKNOWN_BOOK_ACTION = 0,
            BOOK_ACTION_SUCCESS = 1,
            BOOK_ACTION_ERROR = 2
        }

        interface IBook {
            id?: (string|null);
            userId?: (string|null);
            name?: (string|null);
            autor?: (string|null);
            preview?: (string|null);
        }

        class Book implements IBook {
            constructor(p?: api.book.IBook);
            public id: string;
            public userId: string;
            public name: string;
            public autor: string;
            public preview: string;
            public static create(properties?: api.book.IBook): api.book.Book;
        }
    }
}
