/**
 * @fileoverview gRPC-Web generated client stub for api.auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var auth_types_pb = require('./auth.types_pb.js')
const proto = {};
proto.api = {};
proto.api.auth = require('./auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.auth.AuthServiceClient =
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
proto.api.auth.AuthServicePromiseClient =
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
 *   !proto.api.auth.AuthReq,
 *   !proto.api.auth.AuthRes>}
 */
const methodInfo_AuthService_Auth = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.auth.AuthRes,
  /** @param {!proto.api.auth.AuthReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.auth.AuthRes.deserializeBinary
);


/**
 * @param {!proto.api.auth.AuthReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.auth.AuthRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.auth.AuthRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.auth.AuthServiceClient.prototype.auth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.auth.AuthService/Auth',
      request,
      metadata || {},
      methodInfo_AuthService_Auth,
      callback);
};


/**
 * @param {!proto.api.auth.AuthReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.auth.AuthRes>}
 *     A native promise that resolves to the response
 */
proto.api.auth.AuthServicePromiseClient.prototype.auth =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.auth.AuthService/Auth',
      request,
      metadata || {},
      methodInfo_AuthService_Auth);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.auth.Stub,
 *   !proto.api.auth.AuthRes>}
 */
const methodInfo_AuthService_UpdateAuth = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.auth.AuthRes,
  /** @param {!proto.api.auth.Stub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.auth.AuthRes.deserializeBinary
);


/**
 * @param {!proto.api.auth.Stub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.auth.AuthRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.auth.AuthRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.auth.AuthServiceClient.prototype.updateAuth =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.auth.AuthService/UpdateAuth',
      request,
      metadata || {},
      methodInfo_AuthService_UpdateAuth,
      callback);
};


/**
 * @param {!proto.api.auth.Stub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.auth.AuthRes>}
 *     A native promise that resolves to the response
 */
proto.api.auth.AuthServicePromiseClient.prototype.updateAuth =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.auth.AuthService/UpdateAuth',
      request,
      metadata || {},
      methodInfo_AuthService_UpdateAuth);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.auth.Stub,
 *   !proto.api.auth.GetCertStreamRes>}
 */
const methodInfo_AuthService_GetCertStream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.auth.GetCertStreamRes,
  /** @param {!proto.api.auth.Stub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.auth.GetCertStreamRes.deserializeBinary
);


/**
 * @param {!proto.api.auth.Stub} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.auth.GetCertStreamRes>}
 *     The XHR Node Readable Stream
 */
proto.api.auth.AuthServiceClient.prototype.getCertStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.auth.AuthService/GetCertStream',
      request,
      metadata || {},
      methodInfo_AuthService_GetCertStream);
};


/**
 * @param {!proto.api.auth.Stub} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.auth.GetCertStreamRes>}
 *     The XHR Node Readable Stream
 */
proto.api.auth.AuthServicePromiseClient.prototype.getCertStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.auth.AuthService/GetCertStream',
      request,
      metadata || {},
      methodInfo_AuthService_GetCertStream);
};


module.exports = proto.api.auth;

