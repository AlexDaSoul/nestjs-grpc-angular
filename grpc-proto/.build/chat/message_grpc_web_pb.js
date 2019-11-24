/**
 * @fileoverview gRPC-Web generated client stub for api.chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var chat_types_pb = require('./chat.types_pb.js')
const proto = {};
proto.api = {};
proto.api.chat = require('./message_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.chat.MessageServiceClient =
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
proto.api.chat.MessageServicePromiseClient =
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
 *   !proto.api.chat.SendMessageReq,
 *   !proto.api.chat.ChatRes>}
 */
const methodInfo_MessageService_SendMessage = new grpc.web.AbstractClientBase.MethodInfo(
  chat_types_pb.ChatRes,
  /** @param {!proto.api.chat.SendMessageReq} request */
  function(request) {
    return request.serializeBinary();
  },
  chat_types_pb.ChatRes.deserializeBinary
);


/**
 * @param {!proto.api.chat.SendMessageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.chat.ChatRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.chat.ChatRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.chat.MessageServiceClient.prototype.sendMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.chat.MessageService/SendMessage',
      request,
      metadata || {},
      methodInfo_MessageService_SendMessage,
      callback);
};


/**
 * @param {!proto.api.chat.SendMessageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.chat.ChatRes>}
 *     A native promise that resolves to the response
 */
proto.api.chat.MessageServicePromiseClient.prototype.sendMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.chat.MessageService/SendMessage',
      request,
      metadata || {},
      methodInfo_MessageService_SendMessage);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.chat.EditMessageReq,
 *   !proto.api.chat.ChatRes>}
 */
const methodInfo_MessageService_EditMessage = new grpc.web.AbstractClientBase.MethodInfo(
  chat_types_pb.ChatRes,
  /** @param {!proto.api.chat.EditMessageReq} request */
  function(request) {
    return request.serializeBinary();
  },
  chat_types_pb.ChatRes.deserializeBinary
);


/**
 * @param {!proto.api.chat.EditMessageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.chat.ChatRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.chat.ChatRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.chat.MessageServiceClient.prototype.editMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.chat.MessageService/EditMessage',
      request,
      metadata || {},
      methodInfo_MessageService_EditMessage,
      callback);
};


/**
 * @param {!proto.api.chat.EditMessageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.chat.ChatRes>}
 *     A native promise that resolves to the response
 */
proto.api.chat.MessageServicePromiseClient.prototype.editMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.chat.MessageService/EditMessage',
      request,
      metadata || {},
      methodInfo_MessageService_EditMessage);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.chat.DeleteMessageReq,
 *   !proto.api.chat.ChatRes>}
 */
const methodInfo_MessageService_DeleteMessage = new grpc.web.AbstractClientBase.MethodInfo(
  chat_types_pb.ChatRes,
  /** @param {!proto.api.chat.DeleteMessageReq} request */
  function(request) {
    return request.serializeBinary();
  },
  chat_types_pb.ChatRes.deserializeBinary
);


/**
 * @param {!proto.api.chat.DeleteMessageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.chat.ChatRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.chat.ChatRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.chat.MessageServiceClient.prototype.deleteMessage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.chat.MessageService/DeleteMessage',
      request,
      metadata || {},
      methodInfo_MessageService_DeleteMessage,
      callback);
};


/**
 * @param {!proto.api.chat.DeleteMessageReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.chat.ChatRes>}
 *     A native promise that resolves to the response
 */
proto.api.chat.MessageServicePromiseClient.prototype.deleteMessage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.chat.MessageService/DeleteMessage',
      request,
      metadata || {},
      methodInfo_MessageService_DeleteMessage);
};


module.exports = proto.api.chat;

