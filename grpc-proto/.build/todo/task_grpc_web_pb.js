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
proto.api.todo = require('./task_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.todo.TaskServiceClient =
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
proto.api.todo.TaskServicePromiseClient =
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
 *   !proto.api.todo.AddTaskReq,
 *   !proto.api.todo.TaskStatusRes>}
 */
const methodInfo_TaskService_AddTask = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatusRes,
  /** @param {!proto.api.todo.AddTaskReq} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatusRes.deserializeBinary
);


/**
 * @param {!proto.api.todo.AddTaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServiceClient.prototype.addTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.TaskService/AddTask',
      request,
      metadata || {},
      methodInfo_TaskService_AddTask,
      callback);
};


/**
 * @param {!proto.api.todo.AddTaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatusRes>}
 *     A native promise that resolves to the response
 */
proto.api.todo.TaskServicePromiseClient.prototype.addTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.TaskService/AddTask',
      request,
      metadata || {},
      methodInfo_TaskService_AddTask);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TaskReq,
 *   !proto.api.todo.TaskStatusRes>}
 */
const methodInfo_TaskService_DeleteTask = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatusRes,
  /** @param {!proto.api.todo.TaskReq} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatusRes.deserializeBinary
);


/**
 * @param {!proto.api.todo.TaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServiceClient.prototype.deleteTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.TaskService/DeleteTask',
      request,
      metadata || {},
      methodInfo_TaskService_DeleteTask,
      callback);
};


/**
 * @param {!proto.api.todo.TaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatusRes>}
 *     A native promise that resolves to the response
 */
proto.api.todo.TaskServicePromiseClient.prototype.deleteTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.TaskService/DeleteTask',
      request,
      metadata || {},
      methodInfo_TaskService_DeleteTask);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TaskList,
 *   !proto.api.todo.TaskStatusRes>}
 */
const methodInfo_TaskService_UpdateTask = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.TaskStatusRes,
  /** @param {!proto.api.todo.TaskList} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.TaskStatusRes.deserializeBinary
);


/**
 * @param {!proto.api.todo.TaskList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskStatusRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskStatusRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServiceClient.prototype.updateTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.TaskService/UpdateTask',
      request,
      metadata || {},
      methodInfo_TaskService_UpdateTask,
      callback);
};


/**
 * @param {!proto.api.todo.TaskList} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskStatusRes>}
 *     A native promise that resolves to the response
 */
proto.api.todo.TaskServicePromiseClient.prototype.updateTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.TaskService/UpdateTask',
      request,
      metadata || {},
      methodInfo_TaskService_UpdateTask);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TaskReq,
 *   !proto.api.todo.Task>}
 */
const methodInfo_TaskService_GetTask = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.Task,
  /** @param {!proto.api.todo.TaskReq} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.Task.deserializeBinary
);


/**
 * @param {!proto.api.todo.TaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.Task)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.Task>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServiceClient.prototype.getTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.TaskService/GetTask',
      request,
      metadata || {},
      methodInfo_TaskService_GetTask,
      callback);
};


/**
 * @param {!proto.api.todo.TaskReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.Task>}
 *     A native promise that resolves to the response
 */
proto.api.todo.TaskServicePromiseClient.prototype.getTask =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.TaskService/GetTask',
      request,
      metadata || {},
      methodInfo_TaskService_GetTask);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TodoStub,
 *   !proto.api.todo.TaskList>}
 */
const methodInfo_TaskService_GetTasksByUserId = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.todo.TaskList,
  /** @param {!proto.api.todo.TodoStub} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.todo.TaskList.deserializeBinary
);


/**
 * @param {!proto.api.todo.TodoStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.todo.TaskList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.TaskList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServiceClient.prototype.getTasksByUserId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.todo.TaskService/GetTasksByUserId',
      request,
      metadata || {},
      methodInfo_TaskService_GetTasksByUserId,
      callback);
};


/**
 * @param {!proto.api.todo.TodoStub} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.todo.TaskList>}
 *     A native promise that resolves to the response
 */
proto.api.todo.TaskServicePromiseClient.prototype.getTasksByUserId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.todo.TaskService/GetTasksByUserId',
      request,
      metadata || {},
      methodInfo_TaskService_GetTasksByUserId);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.todo.TodoStub,
 *   !proto.api.todo.Task>}
 */
const methodInfo_TaskService_GetTasksStream = new grpc.web.AbstractClientBase.MethodInfo(
  todo_types_pb.Task,
  /** @param {!proto.api.todo.TodoStub} request */
  function(request) {
    return request.serializeBinary();
  },
  todo_types_pb.Task.deserializeBinary
);


/**
 * @param {!proto.api.todo.TodoStub} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.Task>}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServiceClient.prototype.getTasksStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.todo.TaskService/GetTasksStream',
      request,
      metadata || {},
      methodInfo_TaskService_GetTasksStream);
};


/**
 * @param {!proto.api.todo.TodoStub} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.todo.Task>}
 *     The XHR Node Readable Stream
 */
proto.api.todo.TaskServicePromiseClient.prototype.getTasksStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.todo.TaskService/GetTasksStream',
      request,
      metadata || {},
      methodInfo_TaskService_GetTasksStream);
};


module.exports = proto.api.todo;

