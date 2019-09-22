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
proto.api.user = require('./auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.user.AuthServiceClient =
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
proto.api.user.AuthServicePromiseClient =
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
 *   !proto.api.user.AuthReq,
 *   !proto.api.user.AuthRes>}
 */
const methodInfo_AuthService_Auth = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.user.AuthRes,
  /** @param {!proto.api.user.AuthReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.user.AuthRes.deserializeBinary
);


/**
 * @param {!proto.api.user.AuthReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.AuthRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.AuthRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.AuthServiceClient.prototype.auth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.AuthService/Auth',
      request,
      metadata || {},
      methodInfo_AuthService_Auth,
      callback);
};


/**
 * @param {!proto.api.user.AuthReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.AuthRes>}
 *     A native promise that resolves to the response
 */
proto.api.user.AuthServicePromiseClient.prototype.auth =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.AuthService/Auth',
      request,
      metadata || {},
      methodInfo_AuthService_Auth);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.user.UserStub,
 *   !proto.api.user.AuthRes>}
 */
const methodInfo_AuthService_UpdateAuth = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.user.AuthRes,
  /** @param {!proto.api.user.UserStub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.user.AuthRes.deserializeBinary
);


/**
 * @param {!proto.api.user.UserStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.user.AuthRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.user.AuthRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.user.AuthServiceClient.prototype.updateAuth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.user.AuthService/UpdateAuth',
      request,
      metadata || {},
      methodInfo_AuthService_UpdateAuth,
      callback);
};


/**
 * @param {!proto.api.user.UserStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.user.AuthRes>}
 *     A native promise that resolves to the response
 */
proto.api.user.AuthServicePromiseClient.prototype.updateAuth =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.user.AuthService/UpdateAuth',
      request,
      metadata || {},
      methodInfo_AuthService_UpdateAuth);
};


module.exports = proto.api.user;

