/**
 * @fileoverview gRPC-Web generated client stub for api.todo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var todo_types_pb = require('./todo.types_pb.js')
const proto = {};
proto.api = {};
proto.api.todo = require('./status_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.todo.StatusServiceClient =
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
proto.api.todo.StatusServicePromiseClient =
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
 *   !proto.api.todo.AddStatusReq,
 *   !proto.api.todo.TaskStatusRes>}
 */
const methodInfo_StatusService_AddStatus = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatusRes,
  /** @param {!proto.api.todo.AddStatusReq} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatusRes.deserializeBinary
);


/**
 * @param {!proto.api.todo.AddStatusReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.StatusServiceClient.prototype.addStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.StatusService/AddStatus',
      request,
      metadata || {},
      methodInfo_StatusService_AddStatus,
      callback);
};


/**
 * @param {!proto.api.todo.AddStatusReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatusRes>}
 *     A native promise that resolves to the response
 */
proto.api.todo.StatusServicePromiseClient.prototype.addStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.StatusService/AddStatus',
      request,
      metadata || {},
      methodInfo_StatusService_AddStatus);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.StatusList,
 *   !proto.api.todo.TaskStatusRes>}
 */
const methodInfo_StatusService_UpdateStatus = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatusRes,
  /** @param {!proto.api.todo.StatusList} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatusRes.deserializeBinary
);


/**
 * @param {!proto.api.todo.StatusList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.StatusServiceClient.prototype.updateStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.StatusService/UpdateStatus',
      request,
      metadata || {},
      methodInfo_StatusService_UpdateStatus,
      callback);
};


/**
 * @param {!proto.api.todo.StatusList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatusRes>}
 *     A native promise that resolves to the response
 */
proto.api.todo.StatusServicePromiseClient.prototype.updateStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.StatusService/UpdateStatus',
      request,
      metadata || {},
      methodInfo_StatusService_UpdateStatus);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.StatusReq,
 *   !proto.api.todo.TaskStatusRes>}
 */
const methodInfo_StatusService_DeleteStatus = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatusRes,
  /** @param {!proto.api.todo.StatusReq} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatusRes.deserializeBinary
);


/**
 * @param {!proto.api.todo.StatusReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.StatusServiceClient.prototype.deleteStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.StatusService/DeleteStatus',
      request,
      metadata || {},
      methodInfo_StatusService_DeleteStatus,
      callback);
};


/**
 * @param {!proto.api.todo.StatusReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatusRes>}
 *     A native promise that resolves to the response
 */
proto.api.todo.StatusServicePromiseClient.prototype.deleteStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.StatusService/DeleteStatus',
      request,
      metadata || {},
      methodInfo_StatusService_DeleteStatus);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.StatusReq,
 *   !proto.api.todo.TaskStatus>}
 */
const methodInfo_StatusService_GetStatus = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatus,
  /** @param {!proto.api.todo.StatusReq} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatus.deserializeBinary
);


/**
 * @param {!proto.api.todo.StatusReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatus)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatus>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.StatusServiceClient.prototype.getStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.StatusService/GetStatus',
      request,
      metadata || {},
      methodInfo_StatusService_GetStatus,
      callback);
};


/**
 * @param {!proto.api.todo.StatusReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatus>}
 *     A native promise that resolves to the response
 */
proto.api.todo.StatusServicePromiseClient.prototype.getStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.StatusService/GetStatus',
      request,
      metadata || {},
      methodInfo_StatusService_GetStatus);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TodoStub,
 *   !proto.api.todo.StatusList>}
 */
const methodInfo_StatusService_GetStatuses = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.todo.StatusList,
  /** @param {!proto.api.todo.TodoStub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.todo.StatusList.deserializeBinary
);


/**
 * @param {!proto.api.todo.TodoStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.StatusList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.StatusList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.StatusServiceClient.prototype.getStatuses =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.StatusService/GetStatuses',
      request,
      metadata || {},
      methodInfo_StatusService_GetStatuses,
      callback);
};


/**
 * @param {!proto.api.todo.TodoStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.StatusList>}
 *     A native promise that resolves to the response
 */
proto.api.todo.StatusServicePromiseClient.prototype.getStatuses =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.StatusService/GetStatuses',
      request,
      metadata || {},
      methodInfo_StatusService_GetStatuses);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TodoStub,
 *   !proto.api.todo.StatusList>}
 */
const methodInfo_StatusService_GetStatusesWithTasks = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.todo.StatusList,
  /** @param {!proto.api.todo.TodoStub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.todo.StatusList.deserializeBinary
);


/**
 * @param {!proto.api.todo.TodoStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.StatusList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.StatusList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.StatusServiceClient.prototype.getStatusesWithTasks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.StatusService/GetStatusesWithTasks',
      request,
      metadata || {},
      methodInfo_StatusService_GetStatusesWithTasks,
      callback);
};


/**
 * @param {!proto.api.todo.TodoStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.StatusList>}
 *     A native promise that resolves to the response
 */
proto.api.todo.StatusServicePromiseClient.prototype.getStatusesWithTasks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.StatusService/GetStatusesWithTasks',
      request,
      metadata || {},
      methodInfo_StatusService_GetStatusesWithTasks);
};


module.exports = proto.api.todo;

