/**
 * @fileoverview gRPC-Web generated client stub for api.user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var user_types_pb = require('./user.types_pb.js')
const proto = {};
proto.api = {};
proto.api.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.user.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.user.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.CreateUserReq,
 *   !proto.api.user.UserRes>}
 */
const methodInfo_UserService_CreateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.user.UserRes,
  /** @param {!proto.api.user.CreateUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.user.UserRes.deserializeBinary
);


/**
 * @param {!proto.api.user.CreateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.UserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.UserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.UserServiceClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.UserService/CreateUser',
      request,
      metadata || {},
      methodInfo_UserService_CreateUser,
      callback);
};


/**
 * @param {!proto.api.user.CreateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.UserRes>}
 *     A native promise that resolves to the response
 */
proto.api.user.UserServicePromiseClient.prototype.createUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.UserService/CreateUser',
      request,
      metadata || {},
      methodInfo_UserService_CreateUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.UpdateUserReq,
 *   !proto.api.user.UserRes>}
 */
const methodInfo_UserService_UpdateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.user.UserRes,
  /** @param {!proto.api.user.UpdateUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.user.UserRes.deserializeBinary
);


/**
 * @param {!proto.api.user.UpdateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.UserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.UserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.UserServiceClient.prototype.updateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.UserService/UpdateUser',
      request,
      metadata || {},
      methodInfo_UserService_UpdateUser,
      callback);
};


/**
 * @param {!proto.api.user.UpdateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.UserRes>}
 *     A native promise that resolves to the response
 */
proto.api.user.UserServicePromiseClient.prototype.updateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.UserService/UpdateUser',
      request,
      metadata || {},
      methodInfo_UserService_UpdateUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.UserReq,
 *   !proto.api.user.UserRes>}
 */
const methodInfo_UserService_DeleteUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.user.UserRes,
  /** @param {!proto.api.user.UserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.user.UserRes.deserializeBinary
);


/**
 * @param {!proto.api.user.UserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.UserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.UserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.UserServiceClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.UserService/DeleteUser',
      request,
      metadata || {},
      methodInfo_UserService_DeleteUser,
      callback);
};


/**
 * @param {!proto.api.user.UserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.UserRes>}
 *     A native promise that resolves to the response
 */
proto.api.user.UserServicePromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.UserService/DeleteUser',
      request,
      metadata || {},
      methodInfo_UserService_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.VerifyUserReq,
 *   !proto.api.user.User>}
 */
const methodInfo_UserService_VerifyUser = new grpc.web.AbstractClientBase.MethodInfo(
  user_types_pb.User,
  /** @param {!proto.api.user.VerifyUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  user_types_pb.User.deserializeBinary
);


/**
 * @param {!proto.api.user.VerifyUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.UserServiceClient.prototype.verifyUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.UserService/VerifyUser',
      request,
      metadata || {},
      methodInfo_UserService_VerifyUser,
      callback);
};


/**
 * @param {!proto.api.user.VerifyUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.User>}
 *     A native promise that resolves to the response
 */
proto.api.user.UserServicePromiseClient.prototype.verifyUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.UserService/VerifyUser',
      request,
      metadata || {},
      methodInfo_UserService_VerifyUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.UserReq,
 *   !proto.api.user.User>}
 */
const methodInfo_UserService_GetUser = new grpc.web.AbstractClientBase.MethodInfo(
  user_types_pb.User,
  /** @param {!proto.api.user.UserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  user_types_pb.User.deserializeBinary
);


/**
 * @param {!proto.api.user.UserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.User)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.User>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.UserServiceClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.UserService/GetUser',
      request,
      metadata || {},
      methodInfo_UserService_GetUser,
      callback);
};


/**
 * @param {!proto.api.user.UserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.User>}
 *     A native promise that resolves to the response
 */
proto.api.user.UserServicePromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.UserService/GetUser',
      request,
      metadata || {},
      methodInfo_UserService_GetUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.Stub,
 *   !proto.api.user.UsersRes>}
 */
const methodInfo_UserService_GetUsersAll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.user.UsersRes,
  /** @param {!proto.api.user.Stub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.user.UsersRes.deserializeBinary
);


/**
 * @param {!proto.api.user.Stub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.UsersRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.UsersRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.UserServiceClient.prototype.getUsersAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.UserService/GetUsersAll',
      request,
      metadata || {},
      methodInfo_UserService_GetUsersAll,
      callback);
};


/**
 * @param {!proto.api.user.Stub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.UsersRes>}
 *     A native promise that resolves to the response
 */
proto.api.user.UserServicePromiseClient.prototype.getUsersAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.UserService/GetUsersAll',
      request,
      metadata || {},
      methodInfo_UserService_GetUsersAll);
};


module.exports = proto.api.user;

