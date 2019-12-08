/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
process.title = 'node-user';
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const logger_1 = __webpack_require__(3);
const GrpcConfigs_1 = __webpack_require__(11);
const AppModule_1 = __webpack_require__(13);
const logger = new logger_1.BootstrapLogger();
common_1.Logger.overrideLogger(logger);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(AppModule_1.AppModule, GrpcConfigs_1.grpcAuth);
    app.useLogger(logger);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listenAsync();
}
bootstrap().catch(err => {
    logger.error(err);
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(10));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(5);
const MessageBuilder_1 = __webpack_require__(6);
const MessagePrinter_1 = __webpack_require__(9);
const CURRENT_LOG_LEVEL = process.env.LOGGER_LEVEL || constants_1.DEFAULT_LOGGER_LEVEL;
const CURRENT_ALLOWED_LEVELS = constants_1.ALLOWED_LOG_BY_LEVEL[CURRENT_LOG_LEVEL];
class Logger {
    constructor(label) {
        this.label = label;
        this.messageBuilder = new MessageBuilder_1.MessageBuilder(this.label);
        this.messagePrinter = new MessagePrinter_1.MessagePrinter(this.messageBuilder);
    }
    debug(...args) {
        this.logMessage(constants_1.LOG_LEVEL_NAME.debug, args);
    }
    info(...args) {
        this.logMessage(constants_1.LOG_LEVEL_NAME.info, args);
    }
    error(...args) {
        this.logMessage(constants_1.LOG_LEVEL_NAME.error, args);
    }
    security(...args) {
        this.logMessage(constants_1.LOG_LEVEL_NAME.security, args);
    }
    logMessage(currentLevel, args) {
        if (CURRENT_ALLOWED_LEVELS.has(currentLevel)) {
            this.messagePrinter.print(currentLevel, args);
        }
    }
}
exports.Logger = Logger;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LOGGER_LEVEL = 'info';
exports.ALLOWED_LOG_BY_LEVEL = {
    debug: new Set(['debug', 'info', 'error', 'security']),
    info: new Set(['info', 'error', 'security']),
    error: new Set(['error', 'security']),
    security: new Set(['security']),
};
exports.LOG_LEVEL_NAME = {
    debug: 'debug',
    info: 'info',
    error: 'error',
    security: 'security',
};
exports.MESSAGE_COLOR_BY_LEVEL = {
    debug: 90,
    info: 32,
    error: 31,
    security: 36,
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const colorizers_1 = __webpack_require__(7);
const format_1 = __webpack_require__(8);
const DELIMITERS = {
    date: '-',
    time: ':',
    logMessage: ' ',
    fullMessage: ' :: ',
};
class MessageBuilder {
    constructor(label) {
        this.label = label;
        this.colorizeMessages = process.env.LOGGER_COLORIZE_MESSAGES === 'true';
    }
    build(level, args) {
        const timestamp = this.getTimestamp();
        const logMessage = this.prepareMessageFromArgs(args);
        if (!this.colorizeMessages) {
            return [timestamp, level, this.label, logMessage].join(DELIMITERS.fullMessage);
        }
        return [
            colorizers_1.colorizeTimestamp(timestamp),
            colorizers_1.colorizeLevel(level),
            colorizers_1.colorizeLabel(this.label),
            colorizers_1.colorizeMessage(level, logMessage),
        ].join(DELIMITERS.fullMessage);
    }
    getTimestamp() {
        const date = new Date();
        const logDate = [format_1.padStart(date.getDate()), format_1.padStart(date.getMonth() + 1), date.getFullYear()].join(DELIMITERS.date);
        const logTime = [format_1.padStart(date.getHours()), format_1.padStart(date.getMinutes()), format_1.padEnd(date.getMilliseconds())].join(DELIMITERS.time);
        return `[${logDate} ${logTime}]`;
    }
    prepareMessageFromArgs(args) {
        return args
            .map(it => {
            const type = typeof it;
            if (['number', 'string', 'undefined'].includes(type) || it === null) {
                return it;
            }
            if (it instanceof Error) {
                return `${it.stack || it.message || it}`;
            }
            return `${JSON.stringify(it, null, 2)}`;
        })
            .join(DELIMITERS.logMessage);
    }
}
exports.MessageBuilder = MessageBuilder;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(5);
const DEFAULT_COLOR = constants_1.MESSAGE_COLOR_BY_LEVEL.info;
const TIMESTAMP_COLOR = '50';
const LABEL_COLOR = '33';
function colorizeTimestamp(timestamp) {
    return colorize(TIMESTAMP_COLOR, timestamp);
}
exports.colorizeTimestamp = colorizeTimestamp;
function colorizeLevel(level) {
    return colorize(constants_1.MESSAGE_COLOR_BY_LEVEL[level] || DEFAULT_COLOR, level);
}
exports.colorizeLevel = colorizeLevel;
function colorizeLabel(label) {
    return colorize(LABEL_COLOR, label);
}
exports.colorizeLabel = colorizeLabel;
function colorizeMessage(level, message) {
    return colorize(constants_1.MESSAGE_COLOR_BY_LEVEL[level] || DEFAULT_COLOR, message);
}
exports.colorizeMessage = colorizeMessage;
function colorize(color, message) {
    return ['\x1b[', color, 'm', message, '\x1b[0m'].join('');
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.padStart = (data, padNum = 2) => data.toString().padStart(padNum, '0');
exports.padEnd = (data, padNum = 3) => data.toString().padEnd(padNum, '0');


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NOOP = () => ({});
class MessagePrinter {
    constructor(messageBuilder) {
        this.messageBuilder = messageBuilder;
    }
    print(level, args) {
        this.printPreparedMessage(this.messageBuilder.build(level, args) + '\n');
    }
    printPreparedMessage(message) {
        try {
            if (process.stdout.listenerCount('error') === 0) {
                process.stdout.once('error', NOOP);
            }
            process.stdout.write(message, NOOP);
        }
        catch (err) {
        }
        finally {
            process.stdout.removeListener('error', NOOP);
        }
    }
}
exports.MessagePrinter = MessagePrinter;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __webpack_require__(4);
const DEFAULT_LOGGER_NAME = 'bootstrap';
class BootstrapLogger {
    constructor(label) {
        this.label = label;
        this.logger = new Logger_1.Logger(this.label ? this.label : DEFAULT_LOGGER_NAME);
    }
    log(message, context) {
        this.logger.info(message);
    }
    error(message, trace, context) {
        this.logger.error(message);
    }
    warn(message, context) {
        this.logger.error(message);
    }
}
exports.BootstrapLogger = BootstrapLogger;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const env = process.env;
exports.grpcChat = {
    transport: microservices_1.Transport.GRPC,
    options: {
        url: env.GRPC_CHAT_SERVICE || '127.0.0.1:8003',
        package: 'api.chat',
        protoPath: './libs/grpc-proto/chat/index.proto',
    },
};
exports.grpcAuth = {
    transport: microservices_1.Transport.GRPC,
    options: {
        url: env.GRPC_AUTH_SERVICE || '127.0.0.1:8002',
        package: 'api.auth',
        protoPath: './libs/grpc-proto/auth/index.proto',
    },
};
exports.grpcUser = {
    transport: microservices_1.Transport.GRPC,
    options: {
        url: env.GRPC_USER_SERVICE || '127.0.0.1:8001',
        package: 'api.user',
        protoPath: './libs/grpc-proto/user/index.proto',
    },
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const ApiModule_1 = __webpack_require__(14);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            ApiModule_1.ApiModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const AuthModule_1 = __webpack_require__(15);
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [AuthModule_1.AuthModule],
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const ServicesModule_1 = __webpack_require__(16);
const AuthController_1 = __webpack_require__(41);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [ServicesModule_1.ServicesModule],
        controllers: [AuthController_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const JwtCertsService_1 = __webpack_require__(17);
const PemCertsService_1 = __webpack_require__(36);
const CertSubscribeService_1 = __webpack_require__(39);
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        providers: [JwtCertsService_1.JwtCertsService, PemCertsService_1.PemCertsService, CertSubscribeService_1.CertSubscribeService],
        exports: [JwtCertsService_1.JwtCertsService, PemCertsService_1.PemCertsService, CertSubscribeService_1.CertSubscribeService],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const jsonwebtoken_1 = __webpack_require__(18);
const exceptions_1 = __webpack_require__(19);
const env_1 = __webpack_require__(35);
const env = process.env;
let JwtCertsService = class JwtCertsService {
    addToken(user, expiresIn = +env_1.JWT_EXPIRE) {
        if (!user) {
            throw new exceptions_1.UnauthenticatedException(exceptions_1.AUTH_CREDENTIALS_INVALID);
        }
        const options = {
            algorithm: 'RS256',
        };
        if (expiresIn) {
            options.expiresIn = expiresIn;
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        return jsonwebtoken_1.sign(payload, env.JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.verify(token, env.JWT_PUB, {
                algorithms: ['RS256'],
            });
        }
        catch (ignored) {
            throw new exceptions_1.UnauthenticatedException();
        }
    }
};
JwtCertsService = __decorate([
    common_1.Injectable()
], JwtCertsService);
exports.JwtCertsService = JwtCertsService;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(20));
__export(__webpack_require__(30));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(21));
__export(__webpack_require__(22));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(26));
__export(__webpack_require__(27));
__export(__webpack_require__(28));
__export(__webpack_require__(29));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ECodes;
(function (ECodes) {
    ECodes[ECodes["ERROR_CODE_UNDEFINED"] = 0] = "ERROR_CODE_UNDEFINED";
    ECodes[ECodes["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
    ECodes[ECodes["USER_ID_REQUIRED"] = 301] = "USER_ID_REQUIRED";
    ECodes[ECodes["NOT_FOUND"] = 5] = "NOT_FOUND";
    ECodes[ECodes["USER_NOT_FOUND"] = 501] = "USER_NOT_FOUND";
    ECodes[ECodes["ALREADY_EXIST"] = 6] = "ALREADY_EXIST";
    ECodes[ECodes["EMAIL_ALREADY_EXISTS"] = 601] = "EMAIL_ALREADY_EXISTS";
    ECodes[ECodes["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    ECodes[ECodes["INTERNAL_ERROR"] = 13] = "INTERNAL_ERROR";
    ECodes[ECodes["UNAVAILABLE"] = 14] = "UNAVAILABLE";
    ECodes[ECodes["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
    ECodes[ECodes["TOKEN_INVALID"] = 16001] = "TOKEN_INVALID";
    ECodes[ECodes["TOKEN_EXPIRED"] = 16002] = "TOKEN_EXPIRED";
    ECodes[ECodes["AUTH_CREDENTIALS_INVALID"] = 16003] = "AUTH_CREDENTIALS_INVALID";
})(ECodes = exports.ECodes || (exports.ECodes = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.INVALID_ARGUMENT = {
    code: code_types_1.ECodes.INVALID_ARGUMENT,
    message: 'Invalid argument',
};
exports.USER_ID_REQUIRED = {
    code: code_types_1.ECodes.USER_ID_REQUIRED,
    message: 'User id is required',
};
class InvalidArgumentException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.INVALID_ARGUMENT, metadata);
    }
}
exports.InvalidArgumentException = InvalidArgumentException;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
class BaseException extends microservices_1.RpcException {
    constructor(errorCode, metadata) {
        super({
            code: errorCode.code,
            message: JSON.stringify({
                message: errorCode.message,
                metadata,
            }),
        });
    }
}
exports.BaseException = BaseException;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.NOT_FOUND = {
    code: code_types_1.ECodes.NOT_FOUND,
    message: 'Not found',
};
exports.USER_NOT_FOUND = {
    code: code_types_1.ECodes.USER_NOT_FOUND,
    message: 'User not found',
};
class NotFoundException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.NOT_FOUND, metadata);
    }
}
exports.NotFoundException = NotFoundException;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.ALREADY_EXIST = {
    code: code_types_1.ECodes.ALREADY_EXIST,
    message: 'Resource already exists',
};
exports.EMAIL_ALREADY_EXISTS = {
    code: code_types_1.ECodes.EMAIL_ALREADY_EXISTS,
    message: 'Email already exists',
};
class AlreadyExistsException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.ALREADY_EXIST, metadata);
    }
}
exports.AlreadyExistsException = AlreadyExistsException;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.PERMISSION_DENIED = {
    code: code_types_1.ECodes.PERMISSION_DENIED,
    message: 'Permission denied',
};
class PermissionDeniedException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.PERMISSION_DENIED, metadata);
    }
}
exports.PermissionDeniedException = PermissionDeniedException;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.INTERNAL_ERROR = {
    code: code_types_1.ECodes.INTERNAL_ERROR,
    message: 'Internal error',
};
class InternalException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.INTERNAL_ERROR, metadata);
    }
}
exports.InternalException = InternalException;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.UNAVAILABLE = {
    code: code_types_1.ECodes.UNAVAILABLE,
    message: 'Resource unavailable',
};
class UnavailableException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.UNAVAILABLE, metadata);
    }
}
exports.UnavailableException = UnavailableException;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(23);
const code_types_1 = __webpack_require__(21);
exports.UNAUTHENTICATED = {
    code: code_types_1.ECodes.UNAUTHENTICATED,
    message: 'Unauthenticated',
};
exports.TOKEN_INVALID = {
    code: code_types_1.ECodes.TOKEN_INVALID,
    message: 'Token invalid',
};
exports.TOKEN_EXPIRED = {
    code: code_types_1.ECodes.TOKEN_EXPIRED,
    message: 'Token expired',
};
exports.AUTH_CREDENTIALS_INVALID = {
    code: code_types_1.ECodes.AUTH_CREDENTIALS_INVALID,
    message: 'Auth credentials invalid',
};
class UnauthenticatedException extends BaseException_1.BaseException {
    constructor(customCode, metadata = {}) {
        super(customCode || exports.UNAUTHENTICATED, metadata);
    }
}
exports.UnauthenticatedException = UnauthenticatedException;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RpcExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(12);
const types_1 = __webpack_require__(31);
const ExceptionHandlerFactory_1 = __webpack_require__(32);
let RpcExceptionFilter = RpcExceptionFilter_1 = class RpcExceptionFilter extends microservices_1.BaseRpcExceptionFilter {
    constructor(label) {
        super();
        this.label = label;
        this.exceptionHandlerFactory = new ExceptionHandlerFactory_1.ExceptionHandlerFactory(this.label);
    }
    static for(label) {
        return new RpcExceptionFilter_1(label);
    }
    catch(exception, host) {
        const handler = this.exceptionHandlerFactory.getHandler(exception);
        handler.warnAboutError();
        return super.catch(handler.wrapError(), host);
    }
};
RpcExceptionFilter = RpcExceptionFilter_1 = __decorate([
    common_1.Catch(...types_1.EXCEPTION_LIST),
    __metadata("design:paramtypes", [String])
], RpcExceptionFilter);
exports.RpcExceptionFilter = RpcExceptionFilter;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const BaseException_1 = __webpack_require__(23);
exports.EXCEPTION_LIST = [Error, microservices_1.RpcException, BaseException_1.BaseException];


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const RpcExceptionHandler_1 = __webpack_require__(33);
const InternalExceptionHandler_1 = __webpack_require__(34);
class ExceptionHandlerFactory {
    constructor(label) {
        this.label = label;
    }
    getHandler(exception) {
        if (exception instanceof microservices_1.RpcException) {
            return new RpcExceptionHandler_1.RpcExceptionHandler(exception);
        }
        return new InternalExceptionHandler_1.InternalExceptionHandler(exception, this.label);
    }
}
exports.ExceptionHandlerFactory = ExceptionHandlerFactory;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __webpack_require__(3);
class RpcExceptionHandler {
    constructor(exception) {
        this.exception = exception;
        this.logger = new logger_1.Logger('RpcExceptionHandler');
    }
    wrapError() {
        return this.exception;
    }
    warnAboutError() {
        const { message } = this.exception;
        this.logger.debug(`Internal exception: ${message}`);
    }
}
exports.RpcExceptionHandler = RpcExceptionHandler;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InternalException_1 = __webpack_require__(27);
const logger_1 = __webpack_require__(3);
class InternalExceptionHandler {
    constructor(exception, label) {
        this.exception = exception;
        this.label = label;
        this.logger = new logger_1.Logger('InternalExceptionHandler');
    }
    wrapError() {
        return new InternalException_1.InternalException();
    }
    warnAboutError() {
        const { stack, message } = this.exception;
        this.logger.error(`${this.label} :: Internal error "${message}",\nStack: ${stack}`);
    }
}
exports.InternalExceptionHandler = InternalExceptionHandler;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env;
exports.JWT_EXPIRE = env.JWT_EXPIRE || 600;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const pem_1 = __webpack_require__(37);
const keys_1 = __webpack_require__(38);
const CertSubscribeService_1 = __webpack_require__(39);
const env = process.env;
let PemCertsService = class PemCertsService {
    constructor(certSubscribeService) {
        this.certSubscribeService = certSubscribeService;
    }
    createCertificate() {
        pem_1.createCertificate({ serviceKey: env.DEVELOPMENT ? keys_1.serviceKey : null }, (err, keys) => {
            if (err) {
                throw err;
            }
            env.JWT_PUB = keys.certificate;
            env.JWT_PRIV = keys.serviceKey;
            this.certSubscribeService.setCert(keys.certificate);
        });
    }
};
PemCertsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [CertSubscribeService_1.CertSubscribeService])
], PemCertsService);
exports.PemCertsService = PemCertsService;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("pem");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEowIBAAKCAQEAqtZsVS9hOIkB3NY0vMUkwGGYeBvWQOgEhBwW3Pl2FHMoxCqQ\n' +
    'daodgx6PKIvnyV9F3N0RqnlNgiVfpIAdnBnkXLsRKXd5QOGgJppVT8B34yOtZGKM\n' +
    'rdgz06024sB4rmJcVgSABe6mjMNzYpI8ZcgwcbdhQGhOyE2vIclYmOk87Qm1oBJd\n' +
    '2ORStKeAJL9sRdM5IJmeR0WEB/LKu1I8LtY6BE4WPfwfmlxQWKYJWAHr62EEy6Pb\n' +
    'UFTZyro5ebFW1vn51NkKMog805pcH7UkXOuCqfnOzwmLcgbox9hvN19NAOLrzxeZ\n' +
    'TJHWNYcJG2j1g5usBSebex/+mT3F8aDaMI1YnQIDAQABAoIBAE0GGBngHslKnFhh\n' +
    'C64AhK1oU0Hz6wmgkkiuEXDX2HEn6r1nI3KpnFy9rnXtfjfAiNMnqQtfXZ7MEu8s\n' +
    'BC2ZTuiwPvCfOUATeg1tkAFBGcyDDW4xMJRA4j0R36kkdkTJfDAcH0yNaPIWPTO4\n' +
    'ExsgwxbCQ0qyvLJ6s/dbvGJU5m9IMLfpU+K57rTwRFk/H7K8al8zUT5kS2tUOQHP\n' +
    '/5Iz1yPLh1gWxan36EYAUQ/lWbmbPGiKgsGhvEeGt4rrU+YRXytlziM2iQ3I8zFq\n' +
    'SjS15FlmK0ev0Hi78ni/LFIKoHDxRUUm2c5fe+xxMQAEzpJVU3u0u+1PIgBkUass\n' +
    'g/4G4NECgYEA2FGUFIWgrszuhubK6l2fpq/5tmACSXhURBwkjIooX8ZsyH4WM/g3\n' +
    'NAQFLVGvR2KlKLmAEBeJIBdnyZiXK1uHCvNyXaDAPsRBY0RmrebPyGG62f5sU5DC\n' +
    'VmYfD8oJ/cRa2qUaEwAlPCQOIZE1+QMAUlP/CRhYz4UWcKJ43sYoQycCgYEAyi0I\n' +
    'daYt1F0BbVMiWTSUxWMGabU9zosMPgA9X4AxJoWGRW+DhLNAS7kFKRi9Fx05ZiPk\n' +
    'jb3nOawWdNsDPPidED89WfoE4TlMR5uqi63ePVr5BAM4Dr04+BbsYFoticX11h/w\n' +
    'bxGaSuGRme+M/7K4M9+7yp0uQVilvRJ0nNGb0JsCgYBD4Q17hxcN4wayVDe2ZVyU\n' +
    'vMG6JdRx441ltgMOCshyjVxTaaVj926zJtPNDcXXu6+h4Nu7sPb5l/6cdwJwu47b\n' +
    's9reYHQS/hiaorsptLTc5zXv8/NgIZup6u+yT67k77mmxIozDiehAJtikyOBmRx/\n' +
    'uRXdb8NmkxegjospNLsrnwKBgH/WueKqkZAWvzBBwRZnCStG0mdFEy/m/Ha38BbT\n' +
    'GEEjbSO6v47JSX6YH4s8+VQERqcvSvXVfsAY8JozYnjLO4Vqd4DNdwhzEqi05cIs\n' +
    'zro9K/g9kNTBEaTN2emTG/hiFHCxAXc5yjZPK6IKtz135MHoVvZnLThktWg4o0QF\n' +
    'xmDBAoGBAJS3rwuFAMgWQcBxSKSTsT3qJnawlMVGhgcgytD0jN9X6m8/lHQ8uhXv\n' +
    'rfx92S2Z6g6XAGE/vuZNQdMrQnfyqpOrcynHUaiG35PbXKQJ80ZyxL51zNQ/7xx3\n' +
    'GsF4JsTLLNODYqxwsrAAxyMXWQovmWwWRV6tiQAWa0N6C4UqkPoT\n' +
    '-----END RSA PRIVATE KEY-----';


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(40);
let CertSubscribeService = class CertSubscribeService {
    constructor() {
        this.publicKey = new rxjs_1.ReplaySubject(1);
    }
    getCert() {
        return this.publicKey.asObservable();
    }
    setCert(key) {
        this.publicKey.next(key);
    }
};
CertSubscribeService = __decorate([
    common_1.Injectable()
], CertSubscribeService);
exports.CertSubscribeService = CertSubscribeService;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(12);
const rxjs_1 = __webpack_require__(40);
const operators_1 = __webpack_require__(42);
const grpc_1 = __webpack_require__(43);
const exceptions_1 = __webpack_require__(19);
const JwtGuard_1 = __webpack_require__(44);
const GrpcConfigs_1 = __webpack_require__(11);
const PemCertsService_1 = __webpack_require__(36);
const JwtCertsService_1 = __webpack_require__(17);
const CertSubscribeService_1 = __webpack_require__(39);
const AuthReqDTO_1 = __webpack_require__(45);
let AuthController = class AuthController {
    constructor(pemService, jwtService, certSubscribeService) {
        this.pemService = pemService;
        this.jwtService = jwtService;
        this.certSubscribeService = certSubscribeService;
    }
    onModuleInit() {
        this.grpcUserService = this.grpcUserClient.getService('UserService');
        this.pemService.createCertificate();
    }
    auth(data) {
        return rxjs_1.from(this.grpcUserService.verifyUser(data)).pipe(operators_1.map(user => this.jwtService.addToken(user)), operators_1.map(token => ({ token })));
    }
    updateAuth(data, meta) {
        const token = meta.get('authorization')[0].toString();
        const payload = this.jwtService.verifyToken(token);
        return {
            token: this.jwtService.addToken(payload),
        };
    }
    getCertStream(data) {
        return this.certSubscribeService.getCert()
            .pipe(operators_1.map(key => ({ key })));
    }
};
__decorate([
    microservices_1.Client(GrpcConfigs_1.grpcUser),
    __metadata("design:type", Object)
], AuthController.prototype, "grpcUserClient", void 0);
__decorate([
    microservices_1.GrpcMethod('AuthService', 'Auth'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('AuthController::auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthReqDTO_1.AuthReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "auth", null);
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('AuthService', 'UpdateAuth'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('AuthController::updateAuth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, grpc_1.Metadata]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "updateAuth", null);
__decorate([
    microservices_1.GrpcMethod('AuthService', 'GetCertStream'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('AuthController::getCertStream')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "getCertStream", null);
AuthController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [PemCertsService_1.PemCertsService,
        JwtCertsService_1.JwtCertsService,
        CertSubscribeService_1.CertSubscribeService])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("rxjs/internal/operators");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("grpc");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __webpack_require__(18);
const microservices_1 = __webpack_require__(12);
const grpc_1 = __webpack_require__(43);
const exceptions_1 = __webpack_require__(19);
const TOKEN_HEADER_NAME = 'authorization';
const DECODING_OPTIONS = {
    algorithms: ['RS256'],
};
class JwtGuard {
    canActivate(context) {
        const meta = context.getArgByIndex(1);
        const token = meta.get(TOKEN_HEADER_NAME)[0];
        if (token) {
            try {
                meta.payload = jsonwebtoken_1.verify(token, process.env.JWT_PUB, DECODING_OPTIONS);
                return true;
            }
            catch (error) {
                throw new microservices_1.RpcException({ code: grpc_1.status.UNAUTHENTICATED, message: error.message });
            }
        }
        else {
            throw new exceptions_1.UnauthenticatedException();
        }
    }
}
exports.JwtGuard = JwtGuard;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = __webpack_require__(46);
class AuthReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsEmail(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], AuthReqDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(128),
    __metadata("design:type", String)
], AuthReqDTO.prototype, "password", void 0);
exports.AuthReqDTO = AuthReqDTO;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29tbW9uXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL2NvbG9yaXplcnMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL01lc3NhZ2VQcmludGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9sb2dnZXIvQm9vdHN0cmFwTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy91dGlscy9HcnBjQ29uZmlncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2F1dGgvc3JjL0FwcE1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2F1dGgvc3JjL2FwaS9BcGlNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9hcGkvYXV0aC9BdXRoTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvc2VydmljZXMvU2VydmljZXNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9zZXJ2aWNlcy9Kd3RDZXJ0c1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL2NvZGUudHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9CYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvTm90Rm91bmRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL0ludGVybmFsRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvVW5hdmFpbGFibGVFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9maWx0ZXIvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL0V4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ZpbHRlci9oYW5kbGVycy9pbXBsL1JwY0V4Y2VwdGlvbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvZW52LnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvc2VydmljZXMvUGVtQ2VydHNTZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBlbVwiIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvcGtpLWRldi9rZXlzLnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvc2VydmljZXMvQ2VydFN1YnNjcmliZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqc1wiIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvYXBpL2F1dGgvQXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncnBjXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2p3dC9Kd3RHdWFyZC50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2F1dGgvc3JjL2FwaS9hdXRoL2R0by9BdXRoUmVxRFRPLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXZhbGlkYXRvclwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7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QU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBRXBFLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixNQUFNLElBQUksNEJBQVksQ0FBQyxFQUFDLElBQUksRUFBRSxhQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNKO2FBQU07WUFDSCxNQUFNLElBQUkscUNBQXdCLEVBQUUsQ0FBQztTQUN4QztJQUNMLENBQUM7Q0FDSjtBQWpCRCw0QkFpQkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkQsa0RBQTBFO0FBSTFFLE1BQWEsVUFBVTtDQVV0QjtBQU5HO0lBSEMsMkJBQVMsRUFBRTtJQUNYLHlCQUFPLEVBQUU7SUFDVCwyQkFBUyxDQUFDLEVBQUUsQ0FBQzs7eUNBQ087QUFLckI7SUFIQywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLENBQUMsR0FBRyxDQUFDOzs0Q0FDUztBQVQ1QixnQ0FVQzs7Ozs7OztBQ2RELDRDIiwiZmlsZSI6ImFwcHMvYXV0aC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwicHJvY2Vzcy50aXRsZSA9ICdub2RlLXVzZXInO1xuXG5pbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXIgYXMgTmVzdExvZ2dlciwgVmFsaWRhdGlvblBpcGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IEJvb3RzdHJhcExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcbmltcG9ydCB7IGdycGNBdXRoIH0gZnJvbSAnQGxpYi91dGlscy9HcnBjQ29uZmlncyc7XG5cbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vQXBwTW9kdWxlJztcblxuY29uc3QgbG9nZ2VyID0gbmV3IEJvb3RzdHJhcExvZ2dlcigpO1xuLy8gb3ZlcnJpZGUgbG9nZ2VyIHdpdGggb3VyIGltcGxlbWVudGF0aW9uIGZvciB0cmFuc2Zvcm1pbmcgbG9ncyBsaWtlXG4vLyBcIltOZXN0XSA0MDYgICAtIDgvMTIvMjAxOSwgMTE6MDA6NDEgQU0gICBbTmVzdEZhY3RvcnldIC4uLlwiXG5OZXN0TG9nZ2VyLm92ZXJyaWRlTG9nZ2VyKGxvZ2dlcik7XG5cbmFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcbiAgICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGVNaWNyb3NlcnZpY2UoQXBwTW9kdWxlLCBncnBjQXV0aCk7XG5cbiAgICBhcHAudXNlTG9nZ2VyKGxvZ2dlcik7XG4gICAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBWYWxpZGF0aW9uUGlwZSgpKTtcblxuICAgIGF3YWl0IGFwcC5saXN0ZW5Bc3luYygpO1xufVxuXG5ib290c3RyYXAoKS5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcihlcnIpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwiZXhwb3J0ICogZnJvbSAnLi9Mb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Cb290c3RyYXBMb2dnZXInO1xuIiwiaW1wb3J0IHsgQUxMT1dFRF9MT0dfQllfTEVWRUwsIERFRkFVTFRfTE9HR0VSX0xFVkVMLCBMb2dMZXZlbFR5cGUsIExPR19MRVZFTF9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXInO1xuaW1wb3J0IHsgTWVzc2FnZVByaW50ZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZVByaW50ZXInO1xuXG5jb25zdCBDVVJSRU5UX0xPR19MRVZFTCA9IHByb2Nlc3MuZW52LkxPR0dFUl9MRVZFTCB8fCBERUZBVUxUX0xPR0dFUl9MRVZFTDtcbmNvbnN0IENVUlJFTlRfQUxMT1dFRF9MRVZFTFMgPSBBTExPV0VEX0xPR19CWV9MRVZFTFtDVVJSRU5UX0xPR19MRVZFTF07XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVByaW50ZXI6IE1lc3NhZ2VQcmludGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUJ1aWxkZXI6IE1lc3NhZ2VCdWlsZGVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1aWxkZXIgPSBuZXcgTWVzc2FnZUJ1aWxkZXIodGhpcy5sYWJlbCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIgPSBuZXcgTWVzc2FnZVByaW50ZXIodGhpcy5tZXNzYWdlQnVpbGRlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZShMT0dfTEVWRUxfTkFNRS5kZWJ1ZywgYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluZm8oLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLmluZm8sIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWN1cml0eSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuc2VjdXJpdHksIGFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nTWVzc2FnZShjdXJyZW50TGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKENVUlJFTlRfQUxMT1dFRF9MRVZFTFMuaGFzKGN1cnJlbnRMZXZlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIucHJpbnQoY3VycmVudExldmVsLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB0eXBlIExvZ0xldmVsVHlwZSA9ICdkZWJ1ZycgfCAnaW5mbycgfCAnZXJyb3InIHwgJ3NlY3VyaXR5JztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HR0VSX0xFVkVMID0gJ2luZm8nO1xuXG5leHBvcnQgY29uc3QgQUxMT1dFRF9MT0dfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IG5ldyBTZXQoWydkZWJ1ZycsICdpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGluZm86IG5ldyBTZXQoWydpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGVycm9yOiBuZXcgU2V0KFsnZXJyb3InLCAnc2VjdXJpdHknXSksXG4gICAgc2VjdXJpdHk6IG5ldyBTZXQoWydzZWN1cml0eSddKSxcbn07XG5cbmV4cG9ydCBjb25zdCBMT0dfTEVWRUxfTkFNRSA9IHtcbiAgICBkZWJ1ZzogJ2RlYnVnJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgaW5mbzogJ2luZm8nIGFzIExvZ0xldmVsVHlwZSxcbiAgICBlcnJvcjogJ2Vycm9yJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScgYXMgTG9nTGV2ZWxUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfQ09MT1JfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IDkwLFxuICAgIGluZm86IDMyLFxuICAgIGVycm9yOiAzMSxcbiAgICBzZWN1cml0eTogMzYsXG59O1xuIiwiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGNvbG9yaXplVGltZXN0YW1wLCBjb2xvcml6ZUxldmVsLCBjb2xvcml6ZUxhYmVsLCBjb2xvcml6ZU1lc3NhZ2UgfSBmcm9tICcuL2NvbG9yaXplcnMnO1xuaW1wb3J0IHsgcGFkU3RhcnQsIHBhZEVuZCB9IGZyb20gJy4uL2Zvcm1hdCc7XG5cbmNvbnN0IERFTElNSVRFUlMgPSB7XG4gICAgZGF0ZTogJy0nLFxuICAgIHRpbWU6ICc6JyxcbiAgICBsb2dNZXNzYWdlOiAnICcsXG4gICAgZnVsbE1lc3NhZ2U6ICcgOjogJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlQnVpbGRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2xvcml6ZU1lc3NhZ2VzID0gcHJvY2Vzcy5lbnYuTE9HR0VSX0NPTE9SSVpFX01FU1NBR0VTID09PSAndHJ1ZSc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLmdldFRpbWVzdGFtcCgpO1xuICAgICAgICBjb25zdCBsb2dNZXNzYWdlID0gdGhpcy5wcmVwYXJlTWVzc2FnZUZyb21BcmdzKGFyZ3MpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb2xvcml6ZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RpbWVzdGFtcCwgbGV2ZWwsIHRoaXMubGFiZWwsIGxvZ01lc3NhZ2VdLmpvaW4oREVMSU1JVEVSUy5mdWxsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wKSxcbiAgICAgICAgICAgIGNvbG9yaXplTGV2ZWwobGV2ZWwpLFxuICAgICAgICAgICAgY29sb3JpemVMYWJlbCh0aGlzLmxhYmVsKSxcbiAgICAgICAgICAgIGNvbG9yaXplTWVzc2FnZShsZXZlbCwgbG9nTWVzc2FnZSksXG4gICAgICAgIF0uam9pbihERUxJTUlURVJTLmZ1bGxNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbG9nRGF0ZSA9IFtwYWRTdGFydChkYXRlLmdldERhdGUoKSksIHBhZFN0YXJ0KGRhdGUuZ2V0TW9udGgoKSArIDEpLCBkYXRlLmdldEZ1bGxZZWFyKCldLmpvaW4oREVMSU1JVEVSUy5kYXRlKTtcbiAgICAgICAgY29uc3QgbG9nVGltZSA9IFtwYWRTdGFydChkYXRlLmdldEhvdXJzKCkpLCBwYWRTdGFydChkYXRlLmdldE1pbnV0ZXMoKSksIHBhZEVuZChkYXRlLmdldE1pbGxpc2Vjb25kcygpKV0uam9pbihERUxJTUlURVJTLnRpbWUpO1xuXG4gICAgICAgIHJldHVybiBgWyR7bG9nRGF0ZX0gJHtsb2dUaW1lfV1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZU1lc3NhZ2VGcm9tQXJncyhhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgICAgICAgICAubWFwKGl0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGl0O1xuXG4gICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBwcmVwYXJlIHVuZGVmaW5lZCwgbnVsbCwgc3RyaW5nICYgbnVtYmVyIHR5cGVzXG4gICAgICAgICAgICAgICAgaWYgKFsnbnVtYmVyJywgJ3N0cmluZycsICd1bmRlZmluZWQnXS5pbmNsdWRlcyh0eXBlKSB8fCBpdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdHJ5IGFkZCBzdGFjayBvciBtZXNzYWdlIGZyb20gRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoaXQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7aXQuc3RhY2sgfHwgaXQubWVzc2FnZSB8fCBpdH1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHN0cmluZ2lmeSBvdGhlciB0eXBlcywgc3VjaCBhcyBhcnJheSwgb2JqZWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KGl0LCBudWxsLCAyKX1gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKERFTElNSVRFUlMubG9nTWVzc2FnZSk7XG4gICAgfVxufVxuIiwiLy8gYWJvdXQgY29sb3JpemluZyBtZXNzYWdlcyBpbiBzdGRvdXQgc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDE0MDcyNDZcblxuaW1wb3J0IHsgTUVTU0FHRV9DT0xPUl9CWV9MRVZFTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSBNRVNTQUdFX0NPTE9SX0JZX0xFVkVMLmluZm87XG5jb25zdCBUSU1FU1RBTVBfQ09MT1IgPSAnNTAnO1xuY29uc3QgTEFCRUxfQ09MT1IgPSAnMzMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShUSU1FU1RBTVBfQ09MT1IsIHRpbWVzdGFtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxldmVsKGxldmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShNRVNTQUdFX0NPTE9SX0JZX0xFVkVMW2xldmVsXSB8fCBERUZBVUxUX0NPTE9SLCBsZXZlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxhYmVsKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShMQUJFTF9DT0xPUiwgbGFiZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVNZXNzYWdlKGxldmVsOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbG9yaXplKE1FU1NBR0VfQ09MT1JfQllfTEVWRUxbbGV2ZWxdIHx8IERFRkFVTFRfQ09MT1IsIG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBjb2xvcml6ZShjb2xvcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBbJ1xceDFiWycsIGNvbG9yLCAnbScsIG1lc3NhZ2UsICdcXHgxYlswbSddLmpvaW4oJycpO1xufVxuIiwiZXhwb3J0IGNvbnN0IHBhZFN0YXJ0ID0gKGRhdGE6IG51bWJlciwgcGFkTnVtOiBudW1iZXIgPSAyKTogc3RyaW5nID0+IGRhdGEudG9TdHJpbmcoKS5wYWRTdGFydChwYWROdW0sICcwJyk7XG5cbmV4cG9ydCBjb25zdCBwYWRFbmQgPSAoZGF0YTogbnVtYmVyLCBwYWROdW06IG51bWJlciA9IDMpOiBzdHJpbmcgPT4gZGF0YS50b1N0cmluZygpLnBhZEVuZChwYWROdW0sICcwJyk7XG4iLCJpbXBvcnQgeyBMb2dMZXZlbFR5cGUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL01lc3NhZ2VCdWlsZGVyJztcblxuY29uc3QgTk9PUCA9ICgpID0+ICh7fSk7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUHJpbnRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtZXNzYWdlQnVpbGRlcjogTWVzc2FnZUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJpbnQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmludFByZXBhcmVkTWVzc2FnZSh0aGlzLm1lc3NhZ2VCdWlsZGVyLmJ1aWxkKGxldmVsLCBhcmdzKSArICdcXG4nKTtcbiAgICB9XG5cbiAgICAvLyBjaGF0OiBjaGVjayB0aGlzIGltcGxlbWVudGF0aW9uIGluIGh0dHBzOi8vc2RleG50LmF0bGFzc2lhbi5uZXQvYnJvd3NlL1dFQkJBQ0stNDg1XG4gICAgcHJpdmF0ZSBwcmludFByZXBhcmVkTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvbGliL2ludGVybmFsL2NvbnNvbGUvY29uc3RydWN0b3IuanMjTDIzMlxuXG4gICAgICAgIC8vIHRoZXJlIG1heSBiZSBhbiBlcnJvciBvY2N1cnJpbmcgc3luY2hyb25vdXNseSAoZS5nLiBmb3IgZmlsZXMgb3IgVFRZc1xuICAgICAgICAvLyBvbiBQT1NJWCBzeXN0ZW1zKSBvciBhc3luY2hyb25vdXNseSAoZS5nLiBwaXBlcyBvbiBQT1NJWCBzeXN0ZW1zKSwgc29cbiAgICAgICAgLy8gaGFuZGxlIGJvdGggc2l0dWF0aW9ucy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGFkZCBhbmQgbGF0ZXIgcmVtb3ZlIGEgbm9vcCBlcnJvciBoYW5kbGVyIHRvIGNhdGNoIHN5bmNocm9ub3VzIGVycm9ycy5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnN0ZG91dC5saXN0ZW5lckNvdW50KCdlcnJvcicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQub25jZSgnZXJyb3InLCBOT09QKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobWVzc2FnZSwgTk9PUCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gdGhlcmUncyBubyBwcm9wZXIgd2F5IHRvIHBhc3MgYWxvbmcgdGhlIGVycm9yIGhlcmVcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIE5PT1ApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9Mb2dnZXInO1xuXG5jb25zdCBERUZBVUxUX0xPR0dFUl9OQU1FID0gJ2Jvb3RzdHJhcCc7XG5cbmV4cG9ydCBjbGFzcyBCb290c3RyYXBMb2dnZXIgaW1wbGVtZW50cyBMb2dnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcy5sYWJlbCA/IHRoaXMubGFiZWwgOiBERUZBVUxUX0xPR0dFUl9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBhbnksIHRyYWNlPzogc3RyaW5nLCBjb250ZXh0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXJuKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvLyBvdXIgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvZ2dlciBkb2VzIG5vdCB5ZXQgbmVlZFxuICAgICAgICAvLyB0aGUgXCJ3YXJuaW5nXCIgbGV2ZWwsIHNvIHdlIHdpbGwgd3JpdGUgdGhlIGxvZ3NcbiAgICAgICAgLy8gY29taW5nIGZyb20gaGVyZSB0byBcImVycm9yXCIgbGV2ZWxcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgR3JwY09wdGlvbnMsIFRyYW5zcG9ydCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgZ3JwY0NoYXQgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQ0hBVF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMycsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuY2hhdCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2NoYXQvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY0F1dGggPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQVVUSF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMicsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuYXV0aCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2F1dGgvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY1VzZXIgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfVVNFUl9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMScsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkudXNlcicsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL3VzZXIvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9taWNyb3NlcnZpY2VzXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgQXBpTW9kdWxlIH0gZnJvbSAnLi9hcGkvQXBpTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBcGlNb2R1bGUsXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgQXV0aE1vZHVsZSB9IGZyb20gJy4vYXV0aC9BdXRoTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0F1dGhNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBBcGlNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJ2aWNlc01vZHVsZSB9IGZyb20gJ0BhdXRoL3NlcnZpY2VzL1NlcnZpY2VzTW9kdWxlJztcbmltcG9ydCB7IEF1dGhDb250cm9sbGVyIH0gZnJvbSAnLi9BdXRoQ29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTZXJ2aWNlc01vZHVsZV0sXG4gICAgY29udHJvbGxlcnM6IFtBdXRoQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBKd3RDZXJ0c1NlcnZpY2UgfSBmcm9tICcuL0p3dENlcnRzU2VydmljZSc7XG5pbXBvcnQgeyBQZW1DZXJ0c1NlcnZpY2UgfSBmcm9tICcuL1BlbUNlcnRzU2VydmljZSc7XG5pbXBvcnQgeyBDZXJ0U3Vic2NyaWJlU2VydmljZSB9IGZyb20gJy4vQ2VydFN1YnNjcmliZVNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgICBwcm92aWRlcnM6IFtKd3RDZXJ0c1NlcnZpY2UsIFBlbUNlcnRzU2VydmljZSwgQ2VydFN1YnNjcmliZVNlcnZpY2VdLFxuICAgIGV4cG9ydHM6IFtKd3RDZXJ0c1NlcnZpY2UsIFBlbUNlcnRzU2VydmljZSwgQ2VydFN1YnNjcmliZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgc2lnbiwgdmVyaWZ5LCBTaWduT3B0aW9ucyB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5cbmltcG9ydCB7IEFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCwgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyLnR5cGVzJztcblxuaW1wb3J0IHsgSldUX0VYUElSRSB9IGZyb20gJ0BhdXRoL2Vudic7XG5cbmludGVyZmFjZSBJRGVjb2RlZFVzZXJEYXRhIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGVtYWlsOiBzdHJpbmc7XG59XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0Q2VydHNTZXJ2aWNlIHtcbiAgICBwdWJsaWMgYWRkVG9rZW4odXNlcjogYXBpLnVzZXIuVXNlciwgZXhwaXJlc0luOiBudW1iZXIgPSArSldUX0VYUElSRSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbihBVVRIX0NSRURFTlRJQUxTX0lOVkFMSUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogU2lnbk9wdGlvbnMgPSB7XG4gICAgICAgICAgICBhbGdvcml0aG06ICdSUzI1NicsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGV4cGlyZXNJbikge1xuICAgICAgICAgICAgb3B0aW9ucy5leHBpcmVzSW4gPSBleHBpcmVzSW47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2lnbihwYXlsb2FkLCBlbnYuSldUX1BSSVYsIHtcbiAgICAgICAgICAgIGV4cGlyZXNJbixcbiAgICAgICAgICAgIGFsZ29yaXRobTogJ1JTMjU2JyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHZlcmlmeVRva2VuKHRva2VuOiBzdHJpbmcpOiBJRGVjb2RlZFVzZXJEYXRhIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB2ZXJpZnkodG9rZW4sIGVudi5KV1RfUFVCLCB7XG4gICAgICAgICAgICAgICAgYWxnb3JpdGhtczogWydSUzI1NiddLFxuICAgICAgICAgICAgfSkgYXMgSURlY29kZWRVc2VyRGF0YTtcbiAgICAgICAgfSBjYXRjaCAoaWdub3JlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsImV4cG9ydCAqIGZyb20gJy4vaW1wbCc7XG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci9ScGNFeGNlcHRpb25GaWx0ZXInO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb2RlLnR5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vTm90Rm91bmRFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0ludGVybmFsRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVW5hdmFpbGFibGVFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24nO1xuIiwiZXhwb3J0IGludGVyZmFjZSBJRXJyb3Ige1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEVDb2RlcyB7XG4gICAgRVJST1JfQ09ERV9VTkRFRklORUQgPSAwLFxuICAgIC8vIGludmFsaWQgYXJndW1lbnQgY29kZXNcbiAgICBJTlZBTElEX0FSR1VNRU5UID0gMyxcbiAgICAvLyByZXF1aXJlZCBjb2Rlc1xuICAgIFVTRVJfSURfUkVRVUlSRUQgPSAzMDEsXG4gICAgLy8gbm90IGZvdW5kIGNvZGVzXG4gICAgTk9UX0ZPVU5EID0gNSxcbiAgICBVU0VSX05PVF9GT1VORCA9IDUwMSxcbiAgICAvLyBhbHJlYWR5IGV4aXN0IGNvZGVzXG4gICAgQUxSRUFEWV9FWElTVCA9IDYsXG4gICAgRU1BSUxfQUxSRUFEWV9FWElTVFMgPSA2MDEsXG4gICAgLy8gcGVybWlzc2lvbiBkZW5pZWQgY29kZXNcbiAgICBQRVJNSVNTSU9OX0RFTklFRCA9IDcsXG4gICAgLy8gaW50ZXJuYWwgZXJyb3IgY29kZXNcbiAgICBJTlRFUk5BTF9FUlJPUiA9IDEzLFxuICAgIC8vIHVuYXZhaWxhYmxlIGNvZGVzXG4gICAgVU5BVkFJTEFCTEUgPSAxNCxcbiAgICAvLyB1bmF1dGhlbnRpY2F0ZWQgY29kZXNcbiAgICBVTkFVVEhFTlRJQ0FURUQgPSAxNixcbiAgICBUT0tFTl9JTlZBTElEID0gMTYwMDEsXG4gICAgVE9LRU5fRVhQSVJFRCA9IDE2MDAyLFxuICAgIEFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCA9IDE2MDAzLFxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5WQUxJRF9BUkdVTUVOVDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5JTlZBTElEX0FSR1VNRU5ULFxuICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGFyZ3VtZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBVU0VSX0lEX1JFUVVJUkVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVTRVJfSURfUkVRVUlSRUQsXG4gICAgbWVzc2FnZTogJ1VzZXIgaWQgaXMgcmVxdWlyZWQnLFxufTtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBJTlZBTElEX0FSR1VNRU5ULCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW50ZXJmYWNlIElFcnJvckNvZGUge1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEVycm9yQ29kZVR5cGUgPSBJRXJyb3JDb2RlIHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YVR5cGUge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VFeGNlcHRpb24gZXh0ZW5kcyBScGNFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogSUVycm9yQ29kZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUuY29kZSxcblxuICAgICAgICAgICAgLy8gc28gZmFyIGl0IGhhcyBub3QgYmVlbiBwb3NzaWJsZSB0byBmaW5kIG5vcm1hbCB3YXlzIGluIE5lc3RcbiAgICAgICAgICAgIC8vIHRvIHRyYW5zbWl0IHRoZSBtZXRhZGF0YSBpbiByZXNwb25zZSB3aXRoIGFuIGVycm9yLFxuICAgICAgICAgICAgLy8gc28gd2Ugd2lsbCBzZXcgdGhpcyBkYXRhIGludG8gdGhlIG1lc3NhZ2UgYm9keVxuICAgICAgICAgICAgbWVzc2FnZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yQ29kZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IE5PVF9GT1VORDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ05vdCBmb3VuZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVVNFUl9OT1RfRk9VTkQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVVNFUl9OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ1VzZXIgbm90IGZvdW5kJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBOT1RfRk9VTkQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBBTFJFQURZX0VYSVNUOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFMUkVBRFlfRVhJU1QsXG4gICAgbWVzc2FnZTogJ1Jlc291cmNlIGFscmVhZHkgZXhpc3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFTUFJTF9BTFJFQURZX0VYSVNUUzogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5FTUFJTF9BTFJFQURZX0VYSVNUUyxcbiAgICBtZXNzYWdlOiAnRW1haWwgYWxyZWFkeSBleGlzdHMnLFxufTtcblxuZXhwb3J0IGNsYXNzIEFscmVhZHlFeGlzdHNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgQUxSRUFEWV9FWElTVCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IFBFUk1JU1NJT05fREVOSUVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlBFUk1JU1NJT05fREVOSUVELFxuICAgIG1lc3NhZ2U6ICdQZXJtaXNzaW9uIGRlbmllZCcsXG59O1xuXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBQRVJNSVNTSU9OX0RFTklFRCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0VSUk9SOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLklOVEVSTkFMX0VSUk9SLFxuICAgIG1lc3NhZ2U6ICdJbnRlcm5hbCBlcnJvcicsXG59O1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgSU5URVJOQUxfRVJST1IsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRTogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5VTkFWQUlMQUJMRSxcbiAgICBtZXNzYWdlOiAnUmVzb3VyY2UgdW5hdmFpbGFibGUnLFxufTtcblxuZXhwb3J0IGNsYXNzIFVuYXZhaWxhYmxlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IFVOQVZBSUxBQkxFLCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgVU5BVVRIRU5USUNBVEVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVOQVVUSEVOVElDQVRFRCxcbiAgICBtZXNzYWdlOiAnVW5hdXRoZW50aWNhdGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUT0tFTl9JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlRPS0VOX0lOVkFMSUQsXG4gICAgbWVzc2FnZTogJ1Rva2VuIGludmFsaWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0VYUElSRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVE9LRU5fRVhQSVJFRCxcbiAgICBtZXNzYWdlOiAnVG9rZW4gZXhwaXJlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgQVVUSF9DUkVERU5USUFMU19JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCxcbiAgICBtZXNzYWdlOiAnQXV0aCBjcmVkZW50aWFscyBpbnZhbGlkJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgVU5BVVRIRU5USUNBVEVELCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2F0Y2gsIEFyZ3VtZW50c0hvc3QgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlUnBjRXhjZXB0aW9uRmlsdGVyIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSwgRVhDRVBUSU9OX0xJU1QgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvRXhjZXB0aW9uSGFuZGxlckZhY3RvcnknO1xuXG5AQ2F0Y2goLi4uRVhDRVBUSU9OX0xJU1QpXG5leHBvcnQgY2xhc3MgUnBjRXhjZXB0aW9uRmlsdGVyIGV4dGVuZHMgQmFzZVJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBleGNlcHRpb25IYW5kbGVyRmFjdG9yeTogSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5O1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3IobGFiZWw6IHN0cmluZyk6IFJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgICAgIHJldHVybiBuZXcgUnBjRXhjZXB0aW9uRmlsdGVyKGxhYmVsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBmb3IgdGhlIGFkbWluIHBhbmVsLCB5b3UgZG9u4oCZdCBuZWVkIHRvIG1vbml0b3IgZXJyb3JzXG4gICAgICAgIC8vIHN1Y2ggYXMgZnJvbSBDb3VjaERiLCBzbyB3ZSBwYXNzIHNlcGFyYXRlIEFkbWluRXhjZXB0aW9uSGFuZGxlckZhY3RvcnkgdG8gaXQsXG4gICAgICAgIC8vIGFuZCBmb3Igd2ViLWJhY2tlbmQgLSBXZWJCYWNrRXhjZXB0aW9uSGFuZGxlckZhY3RvcnlcbiAgICAgICAgdGhpcy5leGNlcHRpb25IYW5kbGVyRmFjdG9yeSA9IG5ldyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSh0aGlzLmxhYmVsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2F0Y2goZXhjZXB0aW9uOiBFeGNlcHRpb25UeXBlLCBob3N0OiBBcmd1bWVudHNIb3N0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXhjZXB0aW9uSGFuZGxlckZhY3RvcnkuZ2V0SGFuZGxlcihleGNlcHRpb24pO1xuXG4gICAgICAgIGhhbmRsZXIud2FybkFib3V0RXJyb3IoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuY2F0Y2goaGFuZGxlci53cmFwRXJyb3IoKSwgaG9zdCBhcyBhbnkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhjZXB0aW9uVHlwZSA9IEVycm9yIHwgUnBjRXhjZXB0aW9uIHwgQmFzZUV4Y2VwdGlvbjtcblxuZXhwb3J0IGNvbnN0IEVYQ0VQVElPTl9MSVNUID0gW0Vycm9yLCBScGNFeGNlcHRpb24sIEJhc2VFeGNlcHRpb25dO1xuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIsIElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvUnBjRXhjZXB0aW9uSGFuZGxlcic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGFuZGxlcihleGNlcHRpb246IEV4Y2VwdGlvblR5cGUpOiBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgICAgIC8vIGhhbmRsZSByZWd1bGFyIGV4Y2VwdGlvbnMgZnJvbSBjdXJyZW50IG1pY3Jvc2VydmljZXNcbiAgICAgICAgaWYgKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIFJwY0V4Y2VwdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBScGNFeGNlcHRpb25IYW5kbGVyKGV4Y2VwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgYWxsIG90aGVyIGludGVybmFsIGV4Y2VwdGlvbnNcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIoZXhjZXB0aW9uLCB0aGlzLmxhYmVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIFJwY0V4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdScGNFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogQmFzZUV4Y2VwdGlvbikge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIC8vIG5vdCBuZWVkIHRvIGhhbmRsZSB0aGlzIGVycm9yLFxuICAgICAgICAvLyBiZWNhdXNlIGl0IHJlZ3VsYXIgZXhjZXB0aW9uIGZyb20gYmFja2VuZCBzZXJ2aWNlc1xuICAgICAgICByZXR1cm4gdGhpcy5leGNlcHRpb247XG4gICAgfVxuXG4gICAgcHVibGljIHdhcm5BYm91dEVycm9yKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7bWVzc2FnZX06IGFueSA9IHRoaXMuZXhjZXB0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgSW50ZXJuYWwgZXhjZXB0aW9uOiAke21lc3NhZ2V9YCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvQmFzZUV4Y2VwdGlvbic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvSW50ZXJuYWxFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyIGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogRXJyb3IsIHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgSW50ZXJuYWxFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybkFib3V0RXJyb3IoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtzdGFjaywgbWVzc2FnZX0gPSB0aGlzLmV4Y2VwdGlvbjtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYCR7dGhpcy5sYWJlbH0gOjogSW50ZXJuYWwgZXJyb3IgXCIke21lc3NhZ2V9XCIsXFxuU3RhY2s6ICR7c3RhY2t9YCk7XG4gICAgfVxufVxuIiwiY29uc3QgZW52ID0gcHJvY2Vzcy5lbnY7XG5cbmV4cG9ydCBjb25zdCBKV1RfRVhQSVJFID0gZW52LkpXVF9FWFBJUkUgfHwgNjAwO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IGNyZWF0ZUNlcnRpZmljYXRlIH0gZnJvbSAncGVtJztcblxuaW1wb3J0IHsgc2VydmljZUtleSB9IGZyb20gJ0BhdXRoL3BraS1kZXYva2V5cyc7XG5pbXBvcnQgeyBDZXJ0U3Vic2NyaWJlU2VydmljZSB9IGZyb20gJy4vQ2VydFN1YnNjcmliZVNlcnZpY2UnO1xuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBlbUNlcnRzU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjZXJ0U3Vic2NyaWJlU2VydmljZTogQ2VydFN1YnNjcmliZVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlQ2VydGlmaWNhdGUoKTogdm9pZCB7XG4gICAgICAgIGNyZWF0ZUNlcnRpZmljYXRlKHtzZXJ2aWNlS2V5OiBlbnYuREVWRUxPUE1FTlQgPyBzZXJ2aWNlS2V5IDogbnVsbH0sIChlcnIsIGtleXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVudi5KV1RfUFVCID0ga2V5cy5jZXJ0aWZpY2F0ZTtcbiAgICAgICAgICAgIGVudi5KV1RfUFJJViA9IGtleXMuc2VydmljZUtleTtcblxuICAgICAgICAgICAgdGhpcy5jZXJ0U3Vic2NyaWJlU2VydmljZS5zZXRDZXJ0KGtleXMuY2VydGlmaWNhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZW1cIik7IiwiZXhwb3J0IGNvbnN0IHNlcnZpY2VLZXkgPSAnLS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLVxcbicgK1xuICAgICdNSUlFb3dJQkFBS0NBUUVBcXRac1ZTOWhPSWtCM05ZMHZNVWt3R0dZZUJ2V1FPZ0VoQndXM1BsMkZITW94Q3FRXFxuJyArXG4gICAgJ2Rhb2RneDZQS0l2bnlWOUYzTjBScW5sTmdpVmZwSUFkbkJua1hMc1JLWGQ1UU9HZ0pwcFZUOEIzNHlPdFpHS01cXG4nICtcbiAgICAncmRnejA2MDI0c0I0cm1KY1ZnU0FCZTZtak1OellwSThaY2d3Y2JkaFFHaE95RTJ2SWNsWW1Pazg3UW0xb0JKZFxcbicgK1xuICAgICcyT1JTdEtlQUpMOXNSZE01SUptZVIwV0VCL0xLdTFJOEx0WTZCRTRXUGZ3Zm1seFFXS1lKV0FIcjYyRUV5NlBiXFxuJyArXG4gICAgJ1VGVFp5cm81ZWJGVzF2bjUxTmtLTW9nODA1cGNIN1VrWE91Q3Fmbk96d21MY2dib3g5aHZOMTlOQU9Mcnp4ZVpcXG4nICtcbiAgICAnVEpIV05ZY0pHMmoxZzV1c0JTZWJleC8rbVQzRjhhRGFNSTFZblFJREFRQUJBb0lCQUUwR0dCbmdIc2xLbkZoaFxcbicgK1xuICAgICdDNjRBaEsxb1UwSHo2d21na2tpdUVYRFgySEVuNnIxbkkzS3BuRnk5cm5YdGZqZkFpTk1ucVF0ZlhaN01FdThzXFxuJyArXG4gICAgJ0JDMlpUdWl3UHZDZk9VQVRlZzF0a0FGQkdjeUREVzR4TUpSQTRqMFIzNmtrZGtUSmZEQWNIMHlOYVBJV1BUTzRcXG4nICtcbiAgICAnRXhzZ3d4YkNRMHF5dkxKNnMvZGJ2R0pVNW05SU1MZnBVK0s1N3JUd1JGay9IN0s4YWw4elVUNWtTMnRVT1FIUFxcbicgK1xuICAgICcvNUl6MXlQTGgxZ1d4YW4zNkVZQVVRL2xXYm1iUEdpS2dzR2h2RWVHdDRyclUrWVJYeXRsemlNMmlRM0k4ekZxXFxuJyArXG4gICAgJ1NqUzE1RmxtSzBldjBIaTc4bmkvTEZJS29IRHhSVVVtMmM1ZmUreHhNUUFFenBKVlUzdTB1KzFQSWdCa1Vhc3NcXG4nICtcbiAgICAnZy80RzRORUNnWUVBMkZHVUZJV2dyc3p1aHViSzZsMmZwcS81dG1BQ1NYaFVSQndraklvb1g4WnN5SDRXTS9nM1xcbicgK1xuICAgICdOQVFGTFZHdlIyS2xLTG1BRUJlSklCZG55WmlYSzF1SEN2TnlYYURBUHNSQlkwUm1yZWJQeUdHNjJmNXNVNURDXFxuJyArXG4gICAgJ1ZtWWZEOG9KL2NSYTJxVWFFd0FsUENRT0laRTErUU1BVWxQL0NSaFl6NFVXY0tKNDNzWW9ReWNDZ1lFQXlpMElcXG4nICtcbiAgICAnZGFZdDFGMEJiVk1pV1RTVXhXTUdhYlU5em9zTVBnQTlYNEF4Sm9XR1JXK0RoTE5BUzdrRktSaTlGeDA1WmlQa1xcbicgK1xuICAgICdqYjNuT2F3V2ROc0RQUGlkRUQ4OVdmb0U0VGxNUjV1cWk2M2VQVnI1QkFNNERyMDQrQmJzWUZvdGljWDExaC93XFxuJyArXG4gICAgJ2J4R2FTdUdSbWUrTS83SzRNOSs3eXAwdVFWaWx2Ukowbk5HYjBKc0NnWUJENFExN2h4Y040d2F5VkRlMlpWeVVcXG4nICtcbiAgICAndk1HNkpkUng0NDFsdGdNT0NzaHlqVnhUYWFWajkyNnpKdFBORGNYWHU2K2g0TnU3c1BiNWwvNmNkd0p3dTQ3YlxcbicgK1xuICAgICdzOXJlWUhRUy9oaWFvcnNwdExUYzV6WHY4L05nSVp1cDZ1K3lUNjdrNzdtbXhJb3pEaWVoQUp0aWt5T0JtUngvXFxuJyArXG4gICAgJ3VSWGRiOE5ta3hlZ2pvc3BOTHNybndLQmdIL1d1ZUtxa1pBV3Z6QkJ3UlpuQ1N0RzBtZEZFeS9tL0hhMzhCYlRcXG4nICtcbiAgICAnR0VFamJTTzZ2NDdKU1g2WUg0czgrVlFFUnFjdlN2WFZmc0FZOEpvelluakxPNFZxZDRETmR3aHpFcWkwNWNJc1xcbicgK1xuICAgICd6cm85Sy9nOWtOVEJFYVROMmVtVEcvaGlGSEN4QVhjNXlqWlBLNklLdHoxMzVNSG9WdlpuTFRoa3RXZzRvMFFGXFxuJyArXG4gICAgJ3htREJBb0dCQUpTM3J3dUZBTWdXUWNCeFNLU1RzVDNxSm5hd2xNVkdoZ2NneXREMGpOOVg2bTgvbEhROHVoWHZcXG4nICtcbiAgICAncmZ4OTJTMlo2ZzZYQUdFL3Z1Wk5RZE1yUW5meXFwT3JjeW5IVWFpRzM1UGJYS1FKODBaeXhMNTF6TlEvN3h4M1xcbicgK1xuICAgICdHc0Y0SnNUTExOT0RZcXh3c3JBQXh5TVhXUW92bVd3V1JWNnRpUUFXYTBONkM0VXFrUG9UXFxuJyArXG4gICAgJy0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tJztcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZXJ0U3Vic2NyaWJlU2VydmljZSB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBwdWJsaWNLZXkgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmc+KDEpO1xuXG4gICAgcHVibGljIGdldENlcnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVibGljS2V5LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRDZXJ0KGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHVibGljS2V5Lm5leHQoa2V5KTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpOyIsImltcG9ydCB7IENvbnRyb2xsZXIsIFVzZUZpbHRlcnMsIE9uTW9kdWxlSW5pdCwgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50LCBDbGllbnRHcnBjLCBHcnBjTWV0aG9kIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnZ3JwYyc7XG5cbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkZpbHRlciB9IGZyb20gJ0BsaWIvZXhjZXB0aW9ucyc7XG5pbXBvcnQgeyBKd3RHdWFyZCB9IGZyb20gJ0BsaWIvand0L0p3dEd1YXJkJztcbmltcG9ydCB7IGdycGNVc2VyIH0gZnJvbSAnQGxpYi91dGlscy9HcnBjQ29uZmlncyc7XG5pbXBvcnQgeyBJZGVudGl0eSB9IGZyb20gJ0BsaWIvdXRpbHMvaWRlbnRpdHknO1xuXG5pbXBvcnQgeyBhcGkgYXMgdXNlclR5cGVzIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyLnR5cGVzJztcbmltcG9ydCB7IGFwaSBhcyB1c2VyQXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyJztcbmltcG9ydCB7IGFwaSBhcyBhdXRoVHlwZXMgfSBmcm9tICdAZ3JwYy1wcm90by9hdXRoL2F1dGgudHlwZXMnO1xuaW1wb3J0IHsgYXBpIGFzIGF1dGhBcGkgfSBmcm9tICdAZ3JwYy1wcm90by9hdXRoL2F1dGgnO1xuXG5pbXBvcnQgeyBQZW1DZXJ0c1NlcnZpY2UgfSBmcm9tICdAYXV0aC9zZXJ2aWNlcy9QZW1DZXJ0c1NlcnZpY2UnO1xuaW1wb3J0IHsgSnd0Q2VydHNTZXJ2aWNlIH0gZnJvbSAnQGF1dGgvc2VydmljZXMvSnd0Q2VydHNTZXJ2aWNlJztcbmltcG9ydCB7IENlcnRTdWJzY3JpYmVTZXJ2aWNlIH0gZnJvbSAnQGF1dGgvc2VydmljZXMvQ2VydFN1YnNjcmliZVNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBdXRoUmVxRFRPIH0gZnJvbSAnLi9kdG8vQXV0aFJlcURUTyc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBBdXRoQ29udHJvbGxlciBpbXBsZW1lbnRzIE9uTW9kdWxlSW5pdCB7XG5cbiAgICBAQ2xpZW50KGdycGNVc2VyKSBwcml2YXRlIHJlYWRvbmx5IGdycGNVc2VyQ2xpZW50OiBDbGllbnRHcnBjO1xuICAgIHByaXZhdGUgZ3JwY1VzZXJTZXJ2aWNlOiB1c2VyQXBpLnVzZXIuVXNlclNlcnZpY2U7XG5cbiAgICBwdWJsaWMgb25Nb2R1bGVJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdycGNVc2VyU2VydmljZSA9IHRoaXMuZ3JwY1VzZXJDbGllbnQuZ2V0U2VydmljZTx1c2VyQXBpLnVzZXIuVXNlclNlcnZpY2U+KCdVc2VyU2VydmljZScpO1xuXG4gICAgICAgIHRoaXMucGVtU2VydmljZS5jcmVhdGVDZXJ0aWZpY2F0ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHBlbVNlcnZpY2U6IFBlbUNlcnRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBqd3RTZXJ2aWNlOiBKd3RDZXJ0c1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2VydFN1YnNjcmliZVNlcnZpY2U6IENlcnRTdWJzY3JpYmVTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIEBHcnBjTWV0aG9kKCdBdXRoU2VydmljZScsICdBdXRoJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdBdXRoQ29udHJvbGxlcjo6YXV0aCcpKVxuICAgIHB1YmxpYyBhdXRoKGRhdGE6IEF1dGhSZXFEVE8pOiBPYnNlcnZhYmxlPGF1dGhBcGkuYXV0aC5BdXRoUmVzPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuZ3JwY1VzZXJTZXJ2aWNlLnZlcmlmeVVzZXIoZGF0YSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAodXNlciA9PiB0aGlzLmp3dFNlcnZpY2UuYWRkVG9rZW4odXNlcikpLFxuICAgICAgICAgICAgbWFwKHRva2VuID0+ICh7dG9rZW59KSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQFVzZUd1YXJkcyhKd3RHdWFyZClcbiAgICBAR3JwY01ldGhvZCgnQXV0aFNlcnZpY2UnLCAnVXBkYXRlQXV0aCcpXG4gICAgQFVzZUZpbHRlcnMoUnBjRXhjZXB0aW9uRmlsdGVyLmZvcignQXV0aENvbnRyb2xsZXI6OnVwZGF0ZUF1dGgnKSlcbiAgICBwdWJsaWMgdXBkYXRlQXV0aChkYXRhOiBJZGVudGl0eTxhdXRoVHlwZXMuYXV0aC5TdHViPiwgbWV0YTogTWV0YWRhdGEpOiBJZGVudGl0eTxhdXRoQXBpLmF1dGguQXV0aFJlcz4ge1xuICAgICAgICBjb25zdCB0b2tlbiA9IG1ldGEuZ2V0KCdhdXRob3JpemF0aW9uJylbMF0udG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMuand0U2VydmljZS52ZXJpZnlUb2tlbih0b2tlbikgYXMgdXNlclR5cGVzLnVzZXIuVXNlcjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW46IHRoaXMuand0U2VydmljZS5hZGRUb2tlbihwYXlsb2FkKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBAR3JwY01ldGhvZCgnQXV0aFNlcnZpY2UnLCAnR2V0Q2VydFN0cmVhbScpXG4gICAgQFVzZUZpbHRlcnMoUnBjRXhjZXB0aW9uRmlsdGVyLmZvcignQXV0aENvbnRyb2xsZXI6OmdldENlcnRTdHJlYW0nKSlcbiAgICBwdWJsaWMgZ2V0Q2VydFN0cmVhbShkYXRhOiBJZGVudGl0eTxhdXRoVHlwZXMuYXV0aC5TdHViPik6IE9ic2VydmFibGU8YXV0aEFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VydFN1YnNjcmliZVNlcnZpY2UuZ2V0Q2VydCgpXG4gICAgICAgICAgICAucGlwZShtYXAoa2V5ID0+ICh7a2V5fSkpKTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL2ludGVybmFsL29wZXJhdG9yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncnBjXCIpOyIsImltcG9ydCB7IHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBzdGF0dXMgfSBmcm9tICdncnBjJztcblxuaW1wb3J0IHsgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuY29uc3QgVE9LRU5fSEVBREVSX05BTUUgPSAnYXV0aG9yaXphdGlvbic7XG5jb25zdCBERUNPRElOR19PUFRJT05TID0ge1xuICAgIGFsZ29yaXRobXM6IFsnUlMyNTYnXSxcbn07XG5cbmV4cG9ydCBjbGFzcyBKd3RHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgICBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBjb250ZXh0LmdldEFyZ0J5SW5kZXgoMSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbWV0YS5nZXQoVE9LRU5fSEVBREVSX05BTUUpWzBdO1xuXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBtZXRhLnBheWxvYWQgPSB2ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9QVUIsIERFQ09ESU5HX09QVElPTlMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBScGNFeGNlcHRpb24oe2NvZGU6IHN0YXR1cy5VTkFVVEhFTlRJQ0FURUQsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IElzRW1haWwsIElzRGVmaW5lZCwgSXNTdHJpbmcsIE1heExlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL2F1dGgvYXV0aCc7XG5cbmV4cG9ydCBjbGFzcyBBdXRoUmVxRFRPIGltcGxlbWVudHMgYXBpLmF1dGguQXV0aFJlcSB7XG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzRW1haWwoKVxuICAgIEBNYXhMZW5ndGgoNTApXG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG5cbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNTdHJpbmcoKVxuICAgIEBNYXhMZW5ndGgoMTI4KVxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=