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
proto.api.chat = require('./chat_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.chat.ChatServiceClient =
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
proto.api.chat.ChatServicePromiseClient =
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
 *   !proto.api.chat.Stub,
 *   !proto.api.chat.ChatList>}
 */
const methodInfo_ChatService_GetChat = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.chat.ChatList,
  /** @param {!proto.api.chat.Stub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.chat.ChatList.deserializeBinary
);


/**
 * @param {!proto.api.chat.Stub} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.chat.ChatList>}
 *     The XHR Node Readable Stream
 */
proto.api.chat.ChatServiceClient.prototype.getChat =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.chat.ChatService/GetChat',
      request,
      metadata || {},
      methodInfo_ChatService_GetChat);
};


/**
 * @param {!proto.api.chat.Stub} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.chat.ChatList>}
 *     The XHR Node Readable Stream
 */
proto.api.chat.ChatServicePromiseClient.prototype.getChat =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.chat.ChatService/GetChat',
      request,
      metadata || {},
      methodInfo_ChatService_GetChat);
};


module.exports = proto.api.chat;

