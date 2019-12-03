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
const auth_types_pb_1 = __webpack_require__(45);
const auth_pb_1 = __webpack_require__(47);
const PemCertsService_1 = __webpack_require__(36);
const JwtCertsService_1 = __webpack_require__(17);
const CertSubscribeService_1 = __webpack_require__(39);
const AuthReqDTO_1 = __webpack_require__(48);
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

// source: auth.types.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(46);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.api.auth.Stub', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.api.auth.Stub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.auth.Stub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.auth.Stub.displayName = 'proto.api.auth.Stub';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.api.auth.Stub.prototype.toObject = function(opt_includeInstance) {
  return proto.api.auth.Stub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.auth.Stub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.Stub.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.api.auth.Stub}
 */
proto.api.auth.Stub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.auth.Stub;
  return proto.api.auth.Stub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.auth.Stub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.auth.Stub}
 */
proto.api.auth.Stub.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.api.auth.Stub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.auth.Stub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.auth.Stub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.Stub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


goog.object.extend(exports, proto.api.auth);


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("google-protobuf");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// source: auth.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(46);
var goog = jspb;
var global = Function('return this')();

var auth_types_pb = __webpack_require__(45);
goog.object.extend(proto, auth_types_pb);
goog.exportSymbol('proto.api.auth.AuthReq', null, global);
goog.exportSymbol('proto.api.auth.AuthRes', null, global);
goog.exportSymbol('proto.api.auth.GetCertStreamRes', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.api.auth.AuthReq = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.auth.AuthReq, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.auth.AuthReq.displayName = 'proto.api.auth.AuthReq';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.api.auth.AuthRes = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.auth.AuthRes, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.auth.AuthRes.displayName = 'proto.api.auth.AuthRes';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.api.auth.GetCertStreamRes = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.auth.GetCertStreamRes, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.auth.GetCertStreamRes.displayName = 'proto.api.auth.GetCertStreamRes';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.api.auth.AuthReq.prototype.toObject = function(opt_includeInstance) {
  return proto.api.auth.AuthReq.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.auth.AuthReq} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.AuthReq.toObject = function(includeInstance, msg) {
  var f, obj = {
    email: jspb.Message.getFieldWithDefault(msg, 1, ""),
    password: jspb.Message.getFieldWithDefault(msg, 2, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.api.auth.AuthReq}
 */
proto.api.auth.AuthReq.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.auth.AuthReq;
  return proto.api.auth.AuthReq.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.auth.AuthReq} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.auth.AuthReq}
 */
proto.api.auth.AuthReq.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setEmail(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPassword(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.api.auth.AuthReq.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.auth.AuthReq.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.auth.AuthReq} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.AuthReq.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPassword();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional string email = 1;
 * @return {string}
 */
proto.api.auth.AuthReq.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.api.auth.AuthReq.prototype.setEmail = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string password = 2;
 * @return {string}
 */
proto.api.auth.AuthReq.prototype.getPassword = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.api.auth.AuthReq.prototype.setPassword = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.api.auth.AuthRes.prototype.toObject = function(opt_includeInstance) {
  return proto.api.auth.AuthRes.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.auth.AuthRes} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.AuthRes.toObject = function(includeInstance, msg) {
  var f, obj = {
    token: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.api.auth.AuthRes}
 */
proto.api.auth.AuthRes.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.auth.AuthRes;
  return proto.api.auth.AuthRes.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.auth.AuthRes} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.auth.AuthRes}
 */
proto.api.auth.AuthRes.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.api.auth.AuthRes.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.auth.AuthRes.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.auth.AuthRes} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.AuthRes.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getToken();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string token = 1;
 * @return {string}
 */
proto.api.auth.AuthRes.prototype.getToken = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.api.auth.AuthRes.prototype.setToken = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.api.auth.GetCertStreamRes.prototype.toObject = function(opt_includeInstance) {
  return proto.api.auth.GetCertStreamRes.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.auth.GetCertStreamRes} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.GetCertStreamRes.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.api.auth.GetCertStreamRes}
 */
proto.api.auth.GetCertStreamRes.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.auth.GetCertStreamRes;
  return proto.api.auth.GetCertStreamRes.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.auth.GetCertStreamRes} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.auth.GetCertStreamRes}
 */
proto.api.auth.GetCertStreamRes.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setKey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.api.auth.GetCertStreamRes.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.auth.GetCertStreamRes.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.auth.GetCertStreamRes} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.auth.GetCertStreamRes.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKey();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string key = 1;
 * @return {string}
 */
proto.api.auth.GetCertStreamRes.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.api.auth.GetCertStreamRes.prototype.setKey = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.api.auth);


/***/ }),
/* 48 */
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
const class_validator_1 = __webpack_require__(49);
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
/* 49 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29tbW9uXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL2NvbG9yaXplcnMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL01lc3NhZ2VQcmludGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9sb2dnZXIvQm9vdHN0cmFwTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy91dGlscy9HcnBjQ29uZmlncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2F1dGgvc3JjL0FwcE1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2F1dGgvc3JjL2FwaS9BcGlNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9hcGkvYXV0aC9BdXRoTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvc2VydmljZXMvU2VydmljZXNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9zZXJ2aWNlcy9Kd3RDZXJ0c1NlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL2NvZGUudHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9CYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvTm90Rm91bmRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL0ludGVybmFsRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvVW5hdmFpbGFibGVFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9maWx0ZXIvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL0V4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ZpbHRlci9oYW5kbGVycy9pbXBsL1JwY0V4Y2VwdGlvbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvZW52LnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvc2VydmljZXMvUGVtQ2VydHNTZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBlbVwiIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvcGtpLWRldi9rZXlzLnRzIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvc2VydmljZXMvQ2VydFN1YnNjcmliZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqc1wiIiwid2VicGFjazovLy8uL2FwcHMvYXV0aC9zcmMvYXBpL2F1dGgvQXV0aENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncnBjXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2p3dC9Kd3RHdWFyZC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2dycGMtcHJvdG8vYXV0aC9hdXRoLnR5cGVzX3BiLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdvb2dsZS1wcm90b2J1ZlwiIiwid2VicGFjazovLy8uL2xpYnMvZ3JwYy1wcm90by9hdXRoL2F1dGhfcGIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9hdXRoL3NyYy9hcGkvYXV0aC9kdG8vQXV0aFJlcURUTy50cyIsIndl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cHBzL2F1dGgvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInByb2Nlc3MudGl0bGUgPSAnbm9kZS11c2VyJztcblxuaW1wb3J0IHsgTmVzdEZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyIGFzIE5lc3RMb2dnZXIsIFZhbGlkYXRpb25QaXBlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBCb290c3RyYXBMb2dnZXIgfSBmcm9tICdAbGliL2xvZ2dlcic7XG5pbXBvcnQgeyBncnBjQXV0aCB9IGZyb20gJ0BsaWIvdXRpbHMvR3JwY0NvbmZpZ3MnO1xuXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL0FwcE1vZHVsZSc7XG5cbmNvbnN0IGxvZ2dlciA9IG5ldyBCb290c3RyYXBMb2dnZXIoKTtcbi8vIG92ZXJyaWRlIGxvZ2dlciB3aXRoIG91ciBpbXBsZW1lbnRhdGlvbiBmb3IgdHJhbnNmb3JtaW5nIGxvZ3MgbGlrZVxuLy8gXCJbTmVzdF0gNDA2ICAgLSA4LzEyLzIwMTksIDExOjAwOjQxIEFNICAgW05lc3RGYWN0b3J5XSAuLi5cIlxuTmVzdExvZ2dlci5vdmVycmlkZUxvZ2dlcihsb2dnZXIpO1xuXG5hc3luYyBmdW5jdGlvbiBib290c3RyYXAoKSB7XG4gICAgY29uc3QgYXBwID0gYXdhaXQgTmVzdEZhY3RvcnkuY3JlYXRlTWljcm9zZXJ2aWNlKEFwcE1vZHVsZSwgZ3JwY0F1dGgpO1xuXG4gICAgYXBwLnVzZUxvZ2dlcihsb2dnZXIpO1xuICAgIGFwcC51c2VHbG9iYWxQaXBlcyhuZXcgVmFsaWRhdGlvblBpcGUoKSk7XG5cbiAgICBhd2FpdCBhcHAubGlzdGVuQXN5bmMoKTtcbn1cblxuYm9vdHN0cmFwKCkuY2F0Y2goZXJyID0+IHtcbiAgICBsb2dnZXIuZXJyb3IoZXJyKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vQm9vdHN0cmFwTG9nZ2VyJztcbiIsImltcG9ydCB7IEFMTE9XRURfTE9HX0JZX0xFVkVMLCBERUZBVUxUX0xPR0dFUl9MRVZFTCwgTG9nTGV2ZWxUeXBlLCBMT0dfTEVWRUxfTkFNRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IE1lc3NhZ2VCdWlsZGVyIH0gZnJvbSAnLi9tZXNzYWdlL01lc3NhZ2VCdWlsZGVyJztcbmltcG9ydCB7IE1lc3NhZ2VQcmludGVyIH0gZnJvbSAnLi9tZXNzYWdlL01lc3NhZ2VQcmludGVyJztcblxuY29uc3QgQ1VSUkVOVF9MT0dfTEVWRUwgPSBwcm9jZXNzLmVudi5MT0dHRVJfTEVWRUwgfHwgREVGQVVMVF9MT0dHRVJfTEVWRUw7XG5jb25zdCBDVVJSRU5UX0FMTE9XRURfTEVWRUxTID0gQUxMT1dFRF9MT0dfQllfTEVWRUxbQ1VSUkVOVF9MT0dfTEVWRUxdO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VQcmludGVyOiBNZXNzYWdlUHJpbnRlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VCdWlsZGVyOiBNZXNzYWdlQnVpbGRlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWlsZGVyID0gbmV3IE1lc3NhZ2VCdWlsZGVyKHRoaXMubGFiZWwpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VQcmludGVyID0gbmV3IE1lc3NhZ2VQcmludGVyKHRoaXMubWVzc2FnZUJ1aWxkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWJ1ZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuZGVidWcsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbmZvKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZShMT0dfTEVWRUxfTkFNRS5pbmZvLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXJyb3IoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLmVycm9yLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VjdXJpdHkoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLnNlY3VyaXR5LCBhcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvZ01lc3NhZ2UoY3VycmVudExldmVsOiBMb2dMZXZlbFR5cGUsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGlmIChDVVJSRU5UX0FMTE9XRURfTEVWRUxTLmhhcyhjdXJyZW50TGV2ZWwpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VQcmludGVyLnByaW50KGN1cnJlbnRMZXZlbCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgdHlwZSBMb2dMZXZlbFR5cGUgPSAnZGVidWcnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICdzZWN1cml0eSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPR0dFUl9MRVZFTCA9ICdpbmZvJztcblxuZXhwb3J0IGNvbnN0IEFMTE9XRURfTE9HX0JZX0xFVkVMID0ge1xuICAgIGRlYnVnOiBuZXcgU2V0KFsnZGVidWcnLCAnaW5mbycsICdlcnJvcicsICdzZWN1cml0eSddKSxcbiAgICBpbmZvOiBuZXcgU2V0KFsnaW5mbycsICdlcnJvcicsICdzZWN1cml0eSddKSxcbiAgICBlcnJvcjogbmV3IFNldChbJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIHNlY3VyaXR5OiBuZXcgU2V0KFsnc2VjdXJpdHknXSksXG59O1xuXG5leHBvcnQgY29uc3QgTE9HX0xFVkVMX05BTUUgPSB7XG4gICAgZGVidWc6ICdkZWJ1ZycgYXMgTG9nTGV2ZWxUeXBlLFxuICAgIGluZm86ICdpbmZvJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgZXJyb3I6ICdlcnJvcicgYXMgTG9nTGV2ZWxUeXBlLFxuICAgIHNlY3VyaXR5OiAnc2VjdXJpdHknIGFzIExvZ0xldmVsVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBNRVNTQUdFX0NPTE9SX0JZX0xFVkVMID0ge1xuICAgIGRlYnVnOiA5MCxcbiAgICBpbmZvOiAzMixcbiAgICBlcnJvcjogMzEsXG4gICAgc2VjdXJpdHk6IDM2LFxufTtcbiIsImltcG9ydCB7IExvZ0xldmVsVHlwZSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjb2xvcml6ZVRpbWVzdGFtcCwgY29sb3JpemVMZXZlbCwgY29sb3JpemVMYWJlbCwgY29sb3JpemVNZXNzYWdlIH0gZnJvbSAnLi9jb2xvcml6ZXJzJztcbmltcG9ydCB7IHBhZFN0YXJ0LCBwYWRFbmQgfSBmcm9tICcuLi9mb3JtYXQnO1xuXG5jb25zdCBERUxJTUlURVJTID0ge1xuICAgIGRhdGU6ICctJyxcbiAgICB0aW1lOiAnOicsXG4gICAgbG9nTWVzc2FnZTogJyAnLFxuICAgIGZ1bGxNZXNzYWdlOiAnIDo6ICcsXG59O1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJ1aWxkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sb3JpemVNZXNzYWdlcyA9IHByb2Nlc3MuZW52LkxPR0dFUl9DT0xPUklaRV9NRVNTQUdFUyA9PT0gJ3RydWUnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkKGxldmVsOiBMb2dMZXZlbFR5cGUsIGFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gdGhpcy5nZXRUaW1lc3RhbXAoKTtcbiAgICAgICAgY29uc3QgbG9nTWVzc2FnZSA9IHRoaXMucHJlcGFyZU1lc3NhZ2VGcm9tQXJncyhhcmdzKTtcblxuICAgICAgICBpZiAoIXRoaXMuY29sb3JpemVNZXNzYWdlcykge1xuICAgICAgICAgICAgcmV0dXJuIFt0aW1lc3RhbXAsIGxldmVsLCB0aGlzLmxhYmVsLCBsb2dNZXNzYWdlXS5qb2luKERFTElNSVRFUlMuZnVsbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGNvbG9yaXplVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICAgICAgICBjb2xvcml6ZUxldmVsKGxldmVsKSxcbiAgICAgICAgICAgIGNvbG9yaXplTGFiZWwodGhpcy5sYWJlbCksXG4gICAgICAgICAgICBjb2xvcml6ZU1lc3NhZ2UobGV2ZWwsIGxvZ01lc3NhZ2UpLFxuICAgICAgICBdLmpvaW4oREVMSU1JVEVSUy5mdWxsTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaW1lc3RhbXAoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGxvZ0RhdGUgPSBbcGFkU3RhcnQoZGF0ZS5nZXREYXRlKCkpLCBwYWRTdGFydChkYXRlLmdldE1vbnRoKCkgKyAxKSwgZGF0ZS5nZXRGdWxsWWVhcigpXS5qb2luKERFTElNSVRFUlMuZGF0ZSk7XG4gICAgICAgIGNvbnN0IGxvZ1RpbWUgPSBbcGFkU3RhcnQoZGF0ZS5nZXRIb3VycygpKSwgcGFkU3RhcnQoZGF0ZS5nZXRNaW51dGVzKCkpLCBwYWRFbmQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSldLmpvaW4oREVMSU1JVEVSUy50aW1lKTtcblxuICAgICAgICByZXR1cm4gYFske2xvZ0RhdGV9ICR7bG9nVGltZX1dYDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVNZXNzYWdlRnJvbUFyZ3MoYXJnczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYXJnc1xuICAgICAgICAgICAgLm1hcChpdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdDtcblxuICAgICAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcHJlcGFyZSB1bmRlZmluZWQsIG51bGwsIHN0cmluZyAmIG51bWJlciB0eXBlc1xuICAgICAgICAgICAgICAgIGlmIChbJ251bWJlcicsICdzdHJpbmcnLCAndW5kZWZpbmVkJ10uaW5jbHVkZXModHlwZSkgfHwgaXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHRyeSBhZGQgc3RhY2sgb3IgbWVzc2FnZSBmcm9tIEVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGl0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2l0LnN0YWNrIHx8IGl0Lm1lc3NhZ2UgfHwgaXR9YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzdHJpbmdpZnkgb3RoZXIgdHlwZXMsIHN1Y2ggYXMgYXJyYXksIG9iamVjdFxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtKU09OLnN0cmluZ2lmeShpdCwgbnVsbCwgMil9YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihERUxJTUlURVJTLmxvZ01lc3NhZ2UpO1xuICAgIH1cbn1cbiIsIi8vIGFib3V0IGNvbG9yaXppbmcgbWVzc2FnZXMgaW4gc3Rkb3V0IHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQxNDA3MjQ2XG5cbmltcG9ydCB7IE1FU1NBR0VfQ09MT1JfQllfTEVWRUwgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5jb25zdCBERUZBVUxUX0NPTE9SID0gTUVTU0FHRV9DT0xPUl9CWV9MRVZFTC5pbmZvO1xuY29uc3QgVElNRVNUQU1QX0NPTE9SID0gJzUwJztcbmNvbnN0IExBQkVMX0NPTE9SID0gJzMzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yaXplVGltZXN0YW1wKHRpbWVzdGFtcDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29sb3JpemUoVElNRVNUQU1QX0NPTE9SLCB0aW1lc3RhbXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVMZXZlbChsZXZlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29sb3JpemUoTUVTU0FHRV9DT0xPUl9CWV9MRVZFTFtsZXZlbF0gfHwgREVGQVVMVF9DT0xPUiwgbGV2ZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVMYWJlbChsYWJlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29sb3JpemUoTEFCRUxfQ09MT1IsIGxhYmVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yaXplTWVzc2FnZShsZXZlbDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShNRVNTQUdFX0NPTE9SX0JZX0xFVkVMW2xldmVsXSB8fCBERUZBVUxUX0NPTE9SLCBtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gY29sb3JpemUoY29sb3I6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gWydcXHgxYlsnLCBjb2xvciwgJ20nLCBtZXNzYWdlLCAnXFx4MWJbMG0nXS5qb2luKCcnKTtcbn1cbiIsImV4cG9ydCBjb25zdCBwYWRTdGFydCA9IChkYXRhOiBudW1iZXIsIHBhZE51bTogbnVtYmVyID0gMik6IHN0cmluZyA9PiBkYXRhLnRvU3RyaW5nKCkucGFkU3RhcnQocGFkTnVtLCAnMCcpO1xuXG5leHBvcnQgY29uc3QgcGFkRW5kID0gKGRhdGE6IG51bWJlciwgcGFkTnVtOiBudW1iZXIgPSAzKTogc3RyaW5nID0+IGRhdGEudG9TdHJpbmcoKS5wYWRFbmQocGFkTnVtLCAnMCcpO1xuIiwiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IE1lc3NhZ2VCdWlsZGVyIH0gZnJvbSAnLi9NZXNzYWdlQnVpbGRlcic7XG5cbmNvbnN0IE5PT1AgPSAoKSA9PiAoe30pO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVByaW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUJ1aWxkZXI6IE1lc3NhZ2VCdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHByaW50KGxldmVsOiBMb2dMZXZlbFR5cGUsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJpbnRQcmVwYXJlZE1lc3NhZ2UodGhpcy5tZXNzYWdlQnVpbGRlci5idWlsZChsZXZlbCwgYXJncykgKyAnXFxuJyk7XG4gICAgfVxuXG4gICAgLy8gY2hhdDogY2hlY2sgdGhpcyBpbXBsZW1lbnRhdGlvbiBpbiBodHRwczovL3NkZXhudC5hdGxhc3NpYW4ubmV0L2Jyb3dzZS9XRUJCQUNLLTQ4NVxuICAgIHByaXZhdGUgcHJpbnRQcmVwYXJlZE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvbWFzdGVyL2xpYi9pbnRlcm5hbC9jb25zb2xlL2NvbnN0cnVjdG9yLmpzI0wyMzJcblxuICAgICAgICAvLyB0aGVyZSBtYXkgYmUgYW4gZXJyb3Igb2NjdXJyaW5nIHN5bmNocm9ub3VzbHkgKGUuZy4gZm9yIGZpbGVzIG9yIFRUWXNcbiAgICAgICAgLy8gb24gUE9TSVggc3lzdGVtcykgb3IgYXN5bmNocm9ub3VzbHkgKGUuZy4gcGlwZXMgb24gUE9TSVggc3lzdGVtcyksIHNvXG4gICAgICAgIC8vIGhhbmRsZSBib3RoIHNpdHVhdGlvbnMuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBhZGQgYW5kIGxhdGVyIHJlbW92ZSBhIG5vb3AgZXJyb3IgaGFuZGxlciB0byBjYXRjaCBzeW5jaHJvbm91cyBlcnJvcnMuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5zdGRvdXQubGlzdGVuZXJDb3VudCgnZXJyb3InKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0Lm9uY2UoJ2Vycm9yJywgTk9PUCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UsIE5PT1ApO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIHRoZXJlJ3Mgbm8gcHJvcGVyIHdheSB0byBwYXNzIGFsb25nIHRoZSBlcnJvciBoZXJlXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBOT09QKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vTG9nZ2VyJztcblxuY29uc3QgREVGQVVMVF9MT0dHRVJfTkFNRSA9ICdib290c3RyYXAnO1xuXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwTG9nZ2VyIGltcGxlbWVudHMgTG9nZ2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbGFiZWw/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBuZXcgTG9nZ2VyKHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsIDogREVGQVVMVF9MT0dHRVJfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvZyhtZXNzYWdlOiBhbnksIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogYW55LCB0cmFjZT86IHN0cmluZywgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybihtZXNzYWdlOiBhbnksIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gb3VyIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2dnZXIgZG9lcyBub3QgeWV0IG5lZWRcbiAgICAgICAgLy8gdGhlIFwid2FybmluZ1wiIGxldmVsLCBzbyB3ZSB3aWxsIHdyaXRlIHRoZSBsb2dzXG4gICAgICAgIC8vIGNvbWluZyBmcm9tIGhlcmUgdG8gXCJlcnJvclwiIGxldmVsXG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEdycGNPcHRpb25zLCBUcmFuc3BvcnQgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxuZXhwb3J0IGNvbnN0IGdycGNDaGF0ID0ge1xuICAgIHRyYW5zcG9ydDogVHJhbnNwb3J0LkdSUEMsXG4gICAgb3B0aW9uczoge1xuICAgICAgICB1cmw6IGVudi5HUlBDX0NIQVRfU0VSVklDRSB8fCAnMTI3LjAuMC4xOjgwMDMnLFxuICAgICAgICBwYWNrYWdlOiAnYXBpLmNoYXQnLFxuICAgICAgICBwcm90b1BhdGg6ICcuL2xpYnMvZ3JwYy1wcm90by9jaGF0L2luZGV4LnByb3RvJyxcbiAgICB9LFxufSBhcyBHcnBjT3B0aW9ucztcblxuZXhwb3J0IGNvbnN0IGdycGNBdXRoID0ge1xuICAgIHRyYW5zcG9ydDogVHJhbnNwb3J0LkdSUEMsXG4gICAgb3B0aW9uczoge1xuICAgICAgICB1cmw6IGVudi5HUlBDX0FVVEhfU0VSVklDRSB8fCAnMTI3LjAuMC4xOjgwMDInLFxuICAgICAgICBwYWNrYWdlOiAnYXBpLmF1dGgnLFxuICAgICAgICBwcm90b1BhdGg6ICcuL2xpYnMvZ3JwYy1wcm90by9hdXRoL2luZGV4LnByb3RvJyxcbiAgICB9LFxufSBhcyBHcnBjT3B0aW9ucztcblxuZXhwb3J0IGNvbnN0IGdycGNVc2VyID0ge1xuICAgIHRyYW5zcG9ydDogVHJhbnNwb3J0LkdSUEMsXG4gICAgb3B0aW9uczoge1xuICAgICAgICB1cmw6IGVudi5HUlBDX1VTRVJfU0VSVklDRSB8fCAnMTI3LjAuMC4xOjgwMDEnLFxuICAgICAgICBwYWNrYWdlOiAnYXBpLnVzZXInLFxuICAgICAgICBwcm90b1BhdGg6ICcuL2xpYnMvZ3JwYy1wcm90by91c2VyL2luZGV4LnByb3RvJyxcbiAgICB9LFxufSBhcyBHcnBjT3B0aW9ucztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvbWljcm9zZXJ2aWNlc1wiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IEFwaU1vZHVsZSB9IGZyb20gJy4vYXBpL0FwaU1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQXBpTW9kdWxlLFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IEF1dGhNb2R1bGUgfSBmcm9tICcuL2F1dGgvQXV0aE1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtBdXRoTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBpTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgU2VydmljZXNNb2R1bGUgfSBmcm9tICdAYXV0aC9zZXJ2aWNlcy9TZXJ2aWNlc01vZHVsZSc7XG5pbXBvcnQgeyBBdXRoQ29udHJvbGxlciB9IGZyb20gJy4vQXV0aENvbnRyb2xsZXInO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbU2VydmljZXNNb2R1bGVdLFxuICAgIGNvbnRyb2xsZXJzOiBbQXV0aENvbnRyb2xsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgSnd0Q2VydHNTZXJ2aWNlIH0gZnJvbSAnLi9Kd3RDZXJ0c1NlcnZpY2UnO1xuaW1wb3J0IHsgUGVtQ2VydHNTZXJ2aWNlIH0gZnJvbSAnLi9QZW1DZXJ0c1NlcnZpY2UnO1xuaW1wb3J0IHsgQ2VydFN1YnNjcmliZVNlcnZpY2UgfSBmcm9tICcuL0NlcnRTdWJzY3JpYmVTZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gICAgcHJvdmlkZXJzOiBbSnd0Q2VydHNTZXJ2aWNlLCBQZW1DZXJ0c1NlcnZpY2UsIENlcnRTdWJzY3JpYmVTZXJ2aWNlXSxcbiAgICBleHBvcnRzOiBbSnd0Q2VydHNTZXJ2aWNlLCBQZW1DZXJ0c1NlcnZpY2UsIENlcnRTdWJzY3JpYmVTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmljZXNNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IHNpZ24sIHZlcmlmeSwgU2lnbk9wdGlvbnMgfSBmcm9tICdqc29ud2VidG9rZW4nO1xuXG5pbXBvcnQgeyBBVVRIX0NSRURFTlRJQUxTX0lOVkFMSUQsIFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbiB9IGZyb20gJ0BsaWIvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIudHlwZXNfcGInO1xuXG5pbXBvcnQgeyBKV1RfRVhQSVJFIH0gZnJvbSAnQGF1dGgvZW52JztcblxuaW50ZXJmYWNlIElEZWNvZGVkVXNlckRhdGEge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbn1cblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnY7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RDZXJ0c1NlcnZpY2Uge1xuICAgIHB1YmxpYyBhZGRUb2tlbih1c2VyOiBVc2VyLkFzT2JqZWN0LCBleHBpcmVzSW46IG51bWJlciA9ICtKV1RfRVhQSVJFKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uKEFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zOiBTaWduT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFsZ29yaXRobTogJ1JTMjU2JyxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZXhwaXJlc0luKSB7XG4gICAgICAgICAgICBvcHRpb25zLmV4cGlyZXNJbiA9IGV4cGlyZXNJbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzaWduKHBheWxvYWQsIGVudi5KV1RfUFJJViwge1xuICAgICAgICAgICAgZXhwaXJlc0luLFxuICAgICAgICAgICAgYWxnb3JpdGhtOiAnUlMyNTYnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmVyaWZ5VG9rZW4odG9rZW46IHN0cmluZyk6IElEZWNvZGVkVXNlckRhdGEge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHZlcmlmeSh0b2tlbiwgZW52LkpXVF9QVUIsIHtcbiAgICAgICAgICAgICAgICBhbGdvcml0aG1zOiBbJ1JTMjU2J10sXG4gICAgICAgICAgICB9KSBhcyBJRGVjb2RlZFVzZXJEYXRhO1xuICAgICAgICB9IGNhdGNoIChpZ25vcmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwiZXhwb3J0ICogZnJvbSAnLi9pbXBsJztcbmV4cG9ydCAqIGZyb20gJy4vZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlcic7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvZGUudHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Ob3RGb3VuZEV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0FscmVhZHlFeGlzdHNFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9QZXJtaXNzaW9uRGVuaWVkRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vSW50ZXJuYWxFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9VbmF2YWlsYWJsZUV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1VuYXV0aGVudGljYXRlZEV4Y2VwdGlvbic7XG4iLCJleHBvcnQgaW50ZXJmYWNlIElFcnJvciB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRUNvZGVzIHtcbiAgICBFUlJPUl9DT0RFX1VOREVGSU5FRCA9IDAsXG4gICAgLy8gaW52YWxpZCBhcmd1bWVudCBjb2Rlc1xuICAgIElOVkFMSURfQVJHVU1FTlQgPSAzLFxuICAgIC8vIHJlcXVpcmVkIGNvZGVzXG4gICAgVVNFUl9JRF9SRVFVSVJFRCA9IDMwMSxcbiAgICAvLyBub3QgZm91bmQgY29kZXNcbiAgICBOT1RfRk9VTkQgPSA1LFxuICAgIFVTRVJfTk9UX0ZPVU5EID0gNTAxLFxuICAgIC8vIGFscmVhZHkgZXhpc3QgY29kZXNcbiAgICBBTFJFQURZX0VYSVNUID0gNixcbiAgICBFTUFJTF9BTFJFQURZX0VYSVNUUyA9IDYwMSxcbiAgICAvLyBwZXJtaXNzaW9uIGRlbmllZCBjb2Rlc1xuICAgIFBFUk1JU1NJT05fREVOSUVEID0gNyxcbiAgICAvLyBpbnRlcm5hbCBlcnJvciBjb2Rlc1xuICAgIElOVEVSTkFMX0VSUk9SID0gMTMsXG4gICAgLy8gdW5hdmFpbGFibGUgY29kZXNcbiAgICBVTkFWQUlMQUJMRSA9IDE0LFxuICAgIC8vIHVuYXV0aGVudGljYXRlZCBjb2Rlc1xuICAgIFVOQVVUSEVOVElDQVRFRCA9IDE2LFxuICAgIFRPS0VOX0lOVkFMSUQgPSAxNjAwMSxcbiAgICBUT0tFTl9FWFBJUkVEID0gMTYwMDIsXG4gICAgQVVUSF9DUkVERU5USUFMU19JTlZBTElEID0gMTYwMDMsXG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBJTlZBTElEX0FSR1VNRU5UOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLklOVkFMSURfQVJHVU1FTlQsXG4gICAgbWVzc2FnZTogJ0ludmFsaWQgYXJndW1lbnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFVTRVJfSURfUkVRVUlSRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVVNFUl9JRF9SRVFVSVJFRCxcbiAgICBtZXNzYWdlOiAnVXNlciBpZCBpcyByZXF1aXJlZCcsXG59O1xuXG5leHBvcnQgY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IElOVkFMSURfQVJHVU1FTlQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBScGNFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuXG5pbnRlcmZhY2UgSUVycm9yQ29kZSB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRXJyb3JDb2RlVHlwZSA9IElFcnJvckNvZGUgfCBudWxsO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhVHlwZSB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQmFzZUV4Y2VwdGlvbiBleHRlbmRzIFJwY0V4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBJRXJyb3JDb2RlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIGNvZGU6IGVycm9yQ29kZS5jb2RlLFxuXG4gICAgICAgICAgICAvLyBzbyBmYXIgaXQgaGFzIG5vdCBiZWVuIHBvc3NpYmxlIHRvIGZpbmQgbm9ybWFsIHdheXMgaW4gTmVzdFxuICAgICAgICAgICAgLy8gdG8gdHJhbnNtaXQgdGhlIG1ldGFkYXRhIGluIHJlc3BvbnNlIHdpdGggYW4gZXJyb3IsXG4gICAgICAgICAgICAvLyBzbyB3ZSB3aWxsIHNldyB0aGlzIGRhdGEgaW50byB0aGUgbWVzc2FnZSBib2R5XG4gICAgICAgICAgICBtZXNzYWdlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JDb2RlLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTk9UX0ZPVU5EOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLk5PVF9GT1VORCxcbiAgICBtZXNzYWdlOiAnTm90IGZvdW5kJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVU0VSX05PVF9GT1VORDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5VU0VSX05PVF9GT1VORCxcbiAgICBtZXNzYWdlOiAnVXNlciBub3QgZm91bmQnLFxufTtcblxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IE5PVF9GT1VORCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IEFMUkVBRFlfRVhJU1Q6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuQUxSRUFEWV9FWElTVCxcbiAgICBtZXNzYWdlOiAnUmVzb3VyY2UgYWxyZWFkeSBleGlzdHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVNQUlMX0FMUkVBRFlfRVhJU1RTOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkVNQUlMX0FMUkVBRFlfRVhJU1RTLFxuICAgIG1lc3NhZ2U6ICdFbWFpbCBhbHJlYWR5IGV4aXN0cycsXG59O1xuXG5leHBvcnQgY2xhc3MgQWxyZWFkeUV4aXN0c0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBBTFJFQURZX0VYSVNULCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgUEVSTUlTU0lPTl9ERU5JRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuUEVSTUlTU0lPTl9ERU5JRUQsXG4gICAgbWVzc2FnZTogJ1Blcm1pc3Npb24gZGVuaWVkJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGVuaWVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IFBFUk1JU1NJT05fREVOSUVELCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfRVJST1I6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuSU5URVJOQUxfRVJST1IsXG4gICAgbWVzc2FnZTogJ0ludGVybmFsIGVycm9yJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBJTlRFUk5BTF9FUlJPUiwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVOQVZBSUxBQkxFLFxuICAgIG1lc3NhZ2U6ICdSZXNvdXJjZSB1bmF2YWlsYWJsZScsXG59O1xuXG5leHBvcnQgY2xhc3MgVW5hdmFpbGFibGVFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgVU5BVkFJTEFCTEUsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBVTkFVVEhFTlRJQ0FURUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVU5BVVRIRU5USUNBVEVELFxuICAgIG1lc3NhZ2U6ICdVbmF1dGhlbnRpY2F0ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0lOVkFMSUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVE9LRU5fSU5WQUxJRCxcbiAgICBtZXNzYWdlOiAnVG9rZW4gaW52YWxpZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVE9LRU5fRVhQSVJFRDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5UT0tFTl9FWFBJUkVELFxuICAgIG1lc3NhZ2U6ICdUb2tlbiBleHBpcmVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBVVRIX0NSRURFTlRJQUxTX0lOVkFMSUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuQVVUSF9DUkVERU5USUFMU19JTlZBTElELFxuICAgIG1lc3NhZ2U6ICdBdXRoIGNyZWRlbnRpYWxzIGludmFsaWQnLFxufTtcblxuZXhwb3J0IGNsYXNzIFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBVTkFVVEhFTlRJQ0FURUQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDYXRjaCwgQXJndW1lbnRzSG9zdCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEJhc2VScGNFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFeGNlcHRpb25UeXBlLCBFWENFUFRJT05fTElTVCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IH0gZnJvbSAnLi9oYW5kbGVycy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IH0gZnJvbSAnLi9oYW5kbGVycy9FeGNlcHRpb25IYW5kbGVyRmFjdG9yeSc7XG5cbkBDYXRjaCguLi5FWENFUFRJT05fTElTVClcbmV4cG9ydCBjbGFzcyBScGNFeGNlcHRpb25GaWx0ZXIgZXh0ZW5kcyBCYXNlUnBjRXhjZXB0aW9uRmlsdGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5OiBJRXhjZXB0aW9uSGFuZGxlckZhY3Rvcnk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvcihsYWJlbDogc3RyaW5nKTogUnBjRXhjZXB0aW9uRmlsdGVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBScGNFeGNlcHRpb25GaWx0ZXIobGFiZWwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIGZvciB0aGUgYWRtaW4gcGFuZWwsIHlvdSBkb27igJl0IG5lZWQgdG8gbW9uaXRvciBlcnJvcnNcbiAgICAgICAgLy8gc3VjaCBhcyBmcm9tIENvdWNoRGIsIHNvIHdlIHBhc3Mgc2VwYXJhdGUgQWRtaW5FeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB0byBpdCxcbiAgICAgICAgLy8gYW5kIGZvciB3ZWItYmFja2VuZCAtIFdlYkJhY2tFeGNlcHRpb25IYW5kbGVyRmFjdG9yeVxuICAgICAgICB0aGlzLmV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5ID0gbmV3IEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5KHRoaXMubGFiZWwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYXRjaChleGNlcHRpb246IEV4Y2VwdGlvblR5cGUsIGhvc3Q6IEFyZ3VtZW50c0hvc3QpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5leGNlcHRpb25IYW5kbGVyRmFjdG9yeS5nZXRIYW5kbGVyKGV4Y2VwdGlvbik7XG5cbiAgICAgICAgaGFuZGxlci53YXJuQWJvdXRFcnJvcigpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5jYXRjaChoYW5kbGVyLndyYXBFcnJvcigpLCBob3N0IGFzIGFueSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi9pbXBsL0Jhc2VFeGNlcHRpb24nO1xuXG5leHBvcnQgdHlwZSBFeGNlcHRpb25UeXBlID0gRXJyb3IgfCBScGNFeGNlcHRpb24gfCBCYXNlRXhjZXB0aW9uO1xuXG5leHBvcnQgY29uc3QgRVhDRVBUSU9OX0xJU1QgPSBbRXJyb3IsIFJwY0V4Y2VwdGlvbiwgQmFzZUV4Y2VwdGlvbl07XG4iLCJpbXBvcnQgeyBScGNFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuXG5pbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciwgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgUnBjRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4vaW1wbC9ScGNFeGNlcHRpb25IYW5kbGVyJztcbmltcG9ydCB7IEludGVybmFsRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4vaW1wbC9JbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXInO1xuXG5pbXBvcnQgeyBFeGNlcHRpb25UeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uSGFuZGxlckZhY3RvcnkgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlckZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIYW5kbGVyKGV4Y2VwdGlvbjogRXhjZXB0aW9uVHlwZSk6IElFeGNlcHRpb25IYW5kbGVyIHtcbiAgICAgICAgLy8gaGFuZGxlIHJlZ3VsYXIgZXhjZXB0aW9ucyBmcm9tIGN1cnJlbnQgbWljcm9zZXJ2aWNlc1xuICAgICAgICBpZiAoZXhjZXB0aW9uIGluc3RhbmNlb2YgUnBjRXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJwY0V4Y2VwdGlvbkhhbmRsZXIoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhhbmRsZSBhbGwgb3RoZXIgaW50ZXJuYWwgZXhjZXB0aW9uc1xuICAgICAgICByZXR1cm4gbmV3IEludGVybmFsRXhjZXB0aW9uSGFuZGxlcihleGNlcHRpb24sIHRoaXMubGFiZWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IElFeGNlcHRpb25IYW5kbGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi8uLi8uLi9pbXBsL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgUnBjRXhjZXB0aW9uSGFuZGxlciBpbXBsZW1lbnRzIElFeGNlcHRpb25IYW5kbGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ1JwY0V4Y2VwdGlvbkhhbmRsZXInKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZXhjZXB0aW9uOiBCYXNlRXhjZXB0aW9uKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyYXBFcnJvcigpOiBCYXNlRXhjZXB0aW9uIHtcbiAgICAgICAgLy8gbm90IG5lZWQgdG8gaGFuZGxlIHRoaXMgZXJyb3IsXG4gICAgICAgIC8vIGJlY2F1c2UgaXQgcmVndWxhciBleGNlcHRpb24gZnJvbSBiYWNrZW5kIHNlcnZpY2VzXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2VwdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybkFib3V0RXJyb3IoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHttZXNzYWdlfTogYW55ID0gdGhpcy5leGNlcHRpb247XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBJbnRlcm5hbCBleGNlcHRpb246ICR7bWVzc2FnZX1gKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcbmltcG9ydCB7IEludGVybmFsRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9JbnRlcm5hbEV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uLy4uLy4uLy4uL2xvZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXInKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZXhjZXB0aW9uOiBFcnJvciwgcHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyYXBFcnJvcigpOiBCYXNlRXhjZXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXJuQWJvdXRFcnJvcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qge3N0YWNrLCBtZXNzYWdlfSA9IHRoaXMuZXhjZXB0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgJHt0aGlzLmxhYmVsfSA6OiBJbnRlcm5hbCBlcnJvciBcIiR7bWVzc2FnZX1cIixcXG5TdGFjazogJHtzdGFja31gKTtcbiAgICB9XG59XG4iLCJjb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxuZXhwb3J0IGNvbnN0IEpXVF9FWFBJUkUgPSBlbnYuSldUX0VYUElSRSB8fCA2MDA7XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgY3JlYXRlQ2VydGlmaWNhdGUgfSBmcm9tICdwZW0nO1xuXG5pbXBvcnQgeyBzZXJ2aWNlS2V5IH0gZnJvbSAnQGF1dGgvcGtpLWRldi9rZXlzJztcbmltcG9ydCB7IENlcnRTdWJzY3JpYmVTZXJ2aWNlIH0gZnJvbSAnLi9DZXJ0U3Vic2NyaWJlU2VydmljZSc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGVtQ2VydHNTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNlcnRTdWJzY3JpYmVTZXJ2aWNlOiBDZXJ0U3Vic2NyaWJlU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVDZXJ0aWZpY2F0ZSgpOiB2b2lkIHtcbiAgICAgICAgY3JlYXRlQ2VydGlmaWNhdGUoe3NlcnZpY2VLZXk6IGVudi5ERVZFTE9QTUVOVCA/IHNlcnZpY2VLZXkgOiBudWxsfSwgKGVyciwga2V5cykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW52LkpXVF9QVUIgPSBrZXlzLmNlcnRpZmljYXRlO1xuICAgICAgICAgICAgZW52LkpXVF9QUklWID0ga2V5cy5zZXJ2aWNlS2V5O1xuXG4gICAgICAgICAgICB0aGlzLmNlcnRTdWJzY3JpYmVTZXJ2aWNlLnNldENlcnQoa2V5cy5jZXJ0aWZpY2F0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBlbVwiKTsiLCJleHBvcnQgY29uc3Qgc2VydmljZUtleSA9ICctLS0tLUJFR0lOIFJTQSBQUklWQVRFIEtFWS0tLS0tXFxuJyArXG4gICAgJ01JSUVvd0lCQUFLQ0FRRUFxdFpzVlM5aE9Ja0IzTlkwdk1Va3dHR1llQnZXUU9nRWhCd1czUGwyRkhNb3hDcVFcXG4nICtcbiAgICAnZGFvZGd4NlBLSXZueVY5RjNOMFJxbmxOZ2lWZnBJQWRuQm5rWExzUktYZDVRT0dnSnBwVlQ4QjM0eU90WkdLTVxcbicgK1xuICAgICdyZGd6MDYwMjRzQjRybUpjVmdTQUJlNm1qTU56WXBJOFpjZ3djYmRoUUdoT3lFMnZJY2xZbU9rODdRbTFvQkpkXFxuJyArXG4gICAgJzJPUlN0S2VBSkw5c1JkTTVJSm1lUjBXRUIvTEt1MUk4THRZNkJFNFdQZndmbWx4UVdLWUpXQUhyNjJFRXk2UGJcXG4nICtcbiAgICAnVUZUWnlybzVlYkZXMXZuNTFOa0tNb2c4MDVwY0g3VWtYT3VDcWZuT3p3bUxjZ2JveDlodk4xOU5BT0xyenhlWlxcbicgK1xuICAgICdUSkhXTlljSkcyajFnNXVzQlNlYmV4LyttVDNGOGFEYU1JMVluUUlEQVFBQkFvSUJBRTBHR0JuZ0hzbEtuRmhoXFxuJyArXG4gICAgJ0M2NEFoSzFvVTBIejZ3bWdra2l1RVhEWDJIRW42cjFuSTNLcG5GeTlyblh0ZmpmQWlOTW5xUXRmWFo3TUV1OHNcXG4nICtcbiAgICAnQkMyWlR1aXdQdkNmT1VBVGVnMXRrQUZCR2N5RERXNHhNSlJBNGowUjM2a2tka1RKZkRBY0gweU5hUElXUFRPNFxcbicgK1xuICAgICdFeHNnd3hiQ1EwcXl2TEo2cy9kYnZHSlU1bTlJTUxmcFUrSzU3clR3UkZrL0g3SzhhbDh6VVQ1a1MydFVPUUhQXFxuJyArXG4gICAgJy81SXoxeVBMaDFnV3hhbjM2RVlBVVEvbFdibWJQR2lLZ3NHaHZFZUd0NHJyVStZUlh5dGx6aU0yaVEzSTh6RnFcXG4nICtcbiAgICAnU2pTMTVGbG1LMGV2MEhpNzhuaS9MRklLb0hEeFJVVW0yYzVmZSt4eE1RQUV6cEpWVTN1MHUrMVBJZ0JrVWFzc1xcbicgK1xuICAgICdnLzRHNE5FQ2dZRUEyRkdVRklXZ3JzenVodWJLNmwyZnBxLzV0bUFDU1hoVVJCd2tqSW9vWDhac3lINFdNL2czXFxuJyArXG4gICAgJ05BUUZMVkd2UjJLbEtMbUFFQmVKSUJkbnlaaVhLMXVIQ3ZOeVhhREFQc1JCWTBSbXJlYlB5R0c2MmY1c1U1RENcXG4nICtcbiAgICAnVm1ZZkQ4b0ovY1JhMnFVYUV3QWxQQ1FPSVpFMStRTUFVbFAvQ1JoWXo0VVdjS0o0M3NZb1F5Y0NnWUVBeWkwSVxcbicgK1xuICAgICdkYVl0MUYwQmJWTWlXVFNVeFdNR2FiVTl6b3NNUGdBOVg0QXhKb1dHUlcrRGhMTkFTN2tGS1JpOUZ4MDVaaVBrXFxuJyArXG4gICAgJ2piM25PYXdXZE5zRFBQaWRFRDg5V2ZvRTRUbE1SNXVxaTYzZVBWcjVCQU00RHIwNCtCYnNZRm90aWNYMTFoL3dcXG4nICtcbiAgICAnYnhHYVN1R1JtZStNLzdLNE05Kzd5cDB1UVZpbHZSSjBuTkdiMEpzQ2dZQkQ0UTE3aHhjTjR3YXlWRGUyWlZ5VVxcbicgK1xuICAgICd2TUc2SmRSeDQ0MWx0Z01PQ3NoeWpWeFRhYVZqOTI2ekp0UE5EY1hYdTYraDROdTdzUGI1bC82Y2R3Snd1NDdiXFxuJyArXG4gICAgJ3M5cmVZSFFTL2hpYW9yc3B0TFRjNXpYdjgvTmdJWnVwNnUreVQ2N2s3N21teElvekRpZWhBSnRpa3lPQm1SeC9cXG4nICtcbiAgICAndVJYZGI4Tm1reGVnam9zcE5Mc3Jud0tCZ0gvV3VlS3FrWkFXdnpCQndSWm5DU3RHMG1kRkV5L20vSGEzOEJiVFxcbicgK1xuICAgICdHRUVqYlNPNnY0N0pTWDZZSDRzOCtWUUVScWN2U3ZYVmZzQVk4Sm96WW5qTE80VnFkNEROZHdoekVxaTA1Y0lzXFxuJyArXG4gICAgJ3pybzlLL2c5a05UQkVhVE4yZW1URy9oaUZIQ3hBWGM1eWpaUEs2SUt0ejEzNU1Ib1Z2Wm5MVGhrdFdnNG8wUUZcXG4nICtcbiAgICAneG1EQkFvR0JBSlMzcnd1RkFNZ1dRY0J4U0tTVHNUM3FKbmF3bE1WR2hnY2d5dEQwak45WDZtOC9sSFE4dWhYdlxcbicgK1xuICAgICdyZng5MlMyWjZnNlhBR0UvdnVaTlFkTXJRbmZ5cXBPcmN5bkhVYWlHMzVQYlhLUUo4MFp5eEw1MXpOUS83eHgzXFxuJyArXG4gICAgJ0dzRjRKc1RMTE5PRFlxeHdzckFBeHlNWFdRb3ZtV3dXUlY2dGlRQVdhME42QzRVcWtQb1RcXG4nICtcbiAgICAnLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS0nO1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENlcnRTdWJzY3JpYmVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHB1YmxpY0tleSA9IG5ldyBSZXBsYXlTdWJqZWN0PHN0cmluZz4oMSk7XG5cbiAgICBwdWJsaWMgZ2V0Q2VydCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wdWJsaWNLZXkuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldENlcnQoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wdWJsaWNLZXkubmV4dChrZXkpO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7IiwiaW1wb3J0IHsgQ29udHJvbGxlciwgVXNlRmlsdGVycywgT25Nb2R1bGVJbml0LCBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQsIENsaWVudEdycGMsIEdycGNNZXRob2QgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL2ludGVybmFsL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNZXRhZGF0YSB9IGZyb20gJ2dycGMnO1xuXG5pbXBvcnQgeyBScGNFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdAbGliL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgSnd0R3VhcmQgfSBmcm9tICdAbGliL2p3dC9Kd3RHdWFyZCc7XG5pbXBvcnQgeyBncnBjVXNlciB9IGZyb20gJ0BsaWIvdXRpbHMvR3JwY0NvbmZpZ3MnO1xuXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyLnR5cGVzX3BiJztcbmltcG9ydCB7IFVzZXJSZXEsIFZlcmlmeVVzZXJSZXEgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXJfcGInO1xuaW1wb3J0IHsgU3R1YiB9IGZyb20gJ0BncnBjLXByb3RvL2F1dGgvYXV0aC50eXBlc19wYic7XG5pbXBvcnQgeyBBdXRoUmVzLCBHZXRDZXJ0U3RyZWFtUmVzIH0gZnJvbSAnQGdycGMtcHJvdG8vYXV0aC9hdXRoX3BiJztcblxuaW1wb3J0IHsgUGVtQ2VydHNTZXJ2aWNlIH0gZnJvbSAnQGF1dGgvc2VydmljZXMvUGVtQ2VydHNTZXJ2aWNlJztcbmltcG9ydCB7IEp3dENlcnRzU2VydmljZSB9IGZyb20gJ0BhdXRoL3NlcnZpY2VzL0p3dENlcnRzU2VydmljZSc7XG5pbXBvcnQgeyBDZXJ0U3Vic2NyaWJlU2VydmljZSB9IGZyb20gJ0BhdXRoL3NlcnZpY2VzL0NlcnRTdWJzY3JpYmVTZXJ2aWNlJztcblxuaW1wb3J0IHsgQXV0aFJlcURUTyB9IGZyb20gJy4vZHRvL0F1dGhSZXFEVE8nO1xuXG5pbnRlcmZhY2UgSVVzZXJTZXJ2aWNlIHtcbiAgICB2ZXJpZnlVc2VyKGRhdGE6IFZlcmlmeVVzZXJSZXEuQXNPYmplY3QpOiBPYnNlcnZhYmxlPFVzZXIuQXNPYmplY3Q+O1xuXG4gICAgZ2V0VXNlcihkYXRhOiBVc2VyUmVxLkFzT2JqZWN0KTogT2JzZXJ2YWJsZTxVc2VyLkFzT2JqZWN0Pjtcbn1cblxuQENvbnRyb2xsZXIoKVxuZXhwb3J0IGNsYXNzIEF1dGhDb250cm9sbGVyIGltcGxlbWVudHMgT25Nb2R1bGVJbml0IHtcblxuICAgIEBDbGllbnQoZ3JwY1VzZXIpIHByaXZhdGUgcmVhZG9ubHkgZ3JwY1VzZXJDbGllbnQ6IENsaWVudEdycGM7XG4gICAgcHJpdmF0ZSBncnBjVXNlclNlcnZpY2U6IElVc2VyU2VydmljZTtcblxuICAgIHB1YmxpYyBvbk1vZHVsZUluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JwY1VzZXJTZXJ2aWNlID0gdGhpcy5ncnBjVXNlckNsaWVudC5nZXRTZXJ2aWNlPElVc2VyU2VydmljZT4oJ1VzZXJTZXJ2aWNlJyk7XG5cbiAgICAgICAgdGhpcy5wZW1TZXJ2aWNlLmNyZWF0ZUNlcnRpZmljYXRlKCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgcGVtU2VydmljZTogUGVtQ2VydHNTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGp3dFNlcnZpY2U6IEp3dENlcnRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjZXJ0U3Vic2NyaWJlU2VydmljZTogQ2VydFN1YnNjcmliZVNlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgQEdycGNNZXRob2QoJ0F1dGhTZXJ2aWNlJywgJ0F1dGgnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ0F1dGhDb250cm9sbGVyOjphdXRoJykpXG4gICAgcHVibGljIGF1dGgoZGF0YTogQXV0aFJlcURUTyk6IE9ic2VydmFibGU8QXV0aFJlcy5Bc09iamVjdD4ge1xuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmdycGNVc2VyU2VydmljZS52ZXJpZnlVc2VyKGRhdGEpKS5waXBlKFxuICAgICAgICAgICAgbWFwKHVzZXIgPT4gdGhpcy5qd3RTZXJ2aWNlLmFkZFRva2VuKHVzZXIpKSxcbiAgICAgICAgICAgIG1hcCh0b2tlbiA9PiAoe3Rva2VufSkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBVc2VHdWFyZHMoSnd0R3VhcmQpXG4gICAgQEdycGNNZXRob2QoJ0F1dGhTZXJ2aWNlJywgJ1VwZGF0ZUF1dGgnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ0F1dGhDb250cm9sbGVyOjp1cGRhdGVBdXRoJykpXG4gICAgcHVibGljIHVwZGF0ZUF1dGgoZGF0YTogU3R1Yi5Bc09iamVjdCwgbWV0YTogTWV0YWRhdGEpOiBBdXRoUmVzLkFzT2JqZWN0IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBtZXRhLmdldCgnYXV0aG9yaXphdGlvbicpWzBdLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLmp3dFNlcnZpY2UudmVyaWZ5VG9rZW4odG9rZW4pIGFzIFVzZXIuQXNPYmplY3Q7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuOiB0aGlzLmp3dFNlcnZpY2UuYWRkVG9rZW4ocGF5bG9hZCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgQEdycGNNZXRob2QoJ0F1dGhTZXJ2aWNlJywgJ0dldENlcnRTdHJlYW0nKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ0F1dGhDb250cm9sbGVyOjpnZXRDZXJ0U3RyZWFtJykpXG4gICAgcHVibGljIGdldENlcnRTdHJlYW0oZGF0YTogU3R1Yi5Bc09iamVjdCk6IE9ic2VydmFibGU8R2V0Q2VydFN0cmVhbVJlcy5Bc09iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jZXJ0U3Vic2NyaWJlU2VydmljZS5nZXRDZXJ0KClcbiAgICAgICAgICAgIC5waXBlKG1hcChrZXkgPT4gKHtrZXl9KSkpO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvaW50ZXJuYWwvb3BlcmF0b3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdycGNcIik7IiwiaW1wb3J0IHsgdmVyaWZ5IH0gZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IHN0YXR1cyB9IGZyb20gJ2dycGMnO1xuXG5pbXBvcnQgeyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24gfSBmcm9tICdAbGliL2V4Y2VwdGlvbnMnO1xuXG5jb25zdCBUT0tFTl9IRUFERVJfTkFNRSA9ICdhdXRob3JpemF0aW9uJztcbmNvbnN0IERFQ09ESU5HX09QVElPTlMgPSB7XG4gICAgYWxnb3JpdGhtczogWydSUzI1NiddLFxufTtcblxuZXhwb3J0IGNsYXNzIEp3dEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICAgIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGNvbnRleHQuZ2V0QXJnQnlJbmRleCgxKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBtZXRhLmdldChUT0tFTl9IRUFERVJfTkFNRSlbMF07XG5cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG1ldGEucGF5bG9hZCA9IHZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1BVQiwgREVDT0RJTkdfT1BUSU9OUyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJwY0V4Y2VwdGlvbih7Y29kZTogc3RhdHVzLlVOQVVUSEVOVElDQVRFRCwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gc291cmNlOiBhdXRoLnR5cGVzLnByb3RvXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBlbmhhbmNlYWJsZVxuICogQHN1cHByZXNzIHttZXNzYWdlQ29udmVudGlvbnN9IEpTIENvbXBpbGVyIHJlcG9ydHMgYW4gZXJyb3IgaWYgYSB2YXJpYWJsZSBvclxuICogICAgIGZpZWxkIHN0YXJ0cyB3aXRoICdNU0dfJyBhbmQgaXNuJ3QgYSB0cmFuc2xhdGFibGUgbWVzc2FnZS5cbiAqIEBwdWJsaWNcbiAqL1xuLy8gR0VORVJBVEVEIENPREUgLS0gRE8gTk9UIEVESVQhXG5cbnZhciBqc3BiID0gcmVxdWlyZSgnZ29vZ2xlLXByb3RvYnVmJyk7XG52YXIgZ29vZyA9IGpzcGI7XG52YXIgZ2xvYmFsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZ29vZy5leHBvcnRTeW1ib2woJ3Byb3RvLmFwaS5hdXRoLlN0dWInLCBudWxsLCBnbG9iYWwpO1xuLyoqXG4gKiBHZW5lcmF0ZWQgYnkgSnNQYkNvZGVHZW5lcmF0b3IuXG4gKiBAcGFyYW0ge0FycmF5PX0gb3B0X2RhdGEgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIGFycmF5LCB0eXBpY2FsbHkgZnJvbSBhXG4gKiBzZXJ2ZXIgcmVzcG9uc2UsIG9yIGNvbnN0cnVjdGVkIGRpcmVjdGx5IGluIEphdmFzY3JpcHQuIFRoZSBhcnJheSBpcyB1c2VkXG4gKiBpbiBwbGFjZSBhbmQgYmVjb21lcyBwYXJ0IG9mIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3QuIEl0IGlzIG5vdCBjbG9uZWQuXG4gKiBJZiBubyBkYXRhIGlzIHByb3ZpZGVkLCB0aGUgY29uc3RydWN0ZWQgb2JqZWN0IHdpbGwgYmUgZW1wdHksIGJ1dCBzdGlsbFxuICogdmFsaWQuXG4gKiBAZXh0ZW5kcyB7anNwYi5NZXNzYWdlfVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnByb3RvLmFwaS5hdXRoLlN0dWIgPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIG51bGwsIG51bGwpO1xufTtcbmdvb2cuaW5oZXJpdHMocHJvdG8uYXBpLmF1dGguU3R1YiwganNwYi5NZXNzYWdlKTtcbmlmIChnb29nLkRFQlVHICYmICFDT01QSUxFRCkge1xuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHByb3RvLmFwaS5hdXRoLlN0dWIuZGlzcGxheU5hbWUgPSAncHJvdG8uYXBpLmF1dGguU3R1Yic7XG59XG5cblxuXG5pZiAoanNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX09CSkVDVCkge1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHByb3RvLlxuICogRmllbGQgbmFtZXMgdGhhdCBhcmUgcmVzZXJ2ZWQgaW4gSmF2YVNjcmlwdCBhbmQgd2lsbCBiZSByZW5hbWVkIHRvIHBiX25hbWUuXG4gKiBPcHRpb25hbCBmaWVsZHMgdGhhdCBhcmUgbm90IHNldCB3aWxsIGJlIHNldCB0byB1bmRlZmluZWQuXG4gKiBUbyBhY2Nlc3MgYSByZXNlcnZlZCBmaWVsZCB1c2UsIGZvby5wYl88bmFtZT4sIGVnLCBmb28ucGJfZGVmYXVsdC5cbiAqIEZvciB0aGUgbGlzdCBvZiByZXNlcnZlZCBuYW1lcyBwbGVhc2Ugc2VlOlxuICogICAgIG5ldC9wcm90bzIvY29tcGlsZXIvanMvaW50ZXJuYWwvZ2VuZXJhdG9yLmNjI2tLZXl3b3JkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X2luY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlXG4gKiAgICAgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnByb3RvLmFwaS5hdXRoLlN0dWIucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24ob3B0X2luY2x1ZGVJbnN0YW5jZSkge1xuICByZXR1cm4gcHJvdG8uYXBpLmF1dGguU3R1Yi50b09iamVjdChvcHRfaW5jbHVkZUluc3RhbmNlLCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiB0aGUge0BzZWUgdG9PYmplY3R9IG1ldGhvZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGluY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiBXaGV0aGVyIHRvIGluY2x1ZGVcbiAqICAgICB0aGUgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS5hdXRoLlN0dWJ9IG1zZyBUaGUgbXNnIGluc3RhbmNlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5hdXRoLlN0dWIudG9PYmplY3QgPSBmdW5jdGlvbihpbmNsdWRlSW5zdGFuY2UsIG1zZykge1xuICB2YXIgZiwgb2JqID0ge1xuXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuYXV0aC5TdHVifVxuICovXG5wcm90by5hcGkuYXV0aC5TdHViLmRlc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBqc3BiLkJpbmFyeVJlYWRlcihieXRlcyk7XG4gIHZhciBtc2cgPSBuZXcgcHJvdG8uYXBpLmF1dGguU3R1YjtcbiAgcmV0dXJuIHByb3RvLmFwaS5hdXRoLlN0dWIuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uYXBpLmF1dGguU3R1Yn0gbXNnIFRoZSBtZXNzYWdlIG9iamVjdCB0byBkZXNlcmlhbGl6ZSBpbnRvLlxuICogQHBhcmFtIHshanNwYi5CaW5hcnlSZWFkZXJ9IHJlYWRlciBUaGUgQmluYXJ5UmVhZGVyIHRvIHVzZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuYXV0aC5TdHVifVxuICovXG5wcm90by5hcGkuYXV0aC5TdHViLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmVhZGVyLnNraXBGaWVsZCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtc2c7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHJldHVybiB7IVVpbnQ4QXJyYXl9XG4gKi9cbnByb3RvLmFwaS5hdXRoLlN0dWIucHJvdG90eXBlLnNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd3JpdGVyID0gbmV3IGpzcGIuQmluYXJ5V3JpdGVyKCk7XG4gIHByb3RvLmFwaS5hdXRoLlN0dWIuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuYXV0aC5TdHVifSBtZXNzYWdlXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVdyaXRlcn0gd3JpdGVyXG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5hdXRoLlN0dWIuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIgPSBmdW5jdGlvbihtZXNzYWdlLCB3cml0ZXIpIHtcbiAgdmFyIGYgPSB1bmRlZmluZWQ7XG59O1xuXG5cbmdvb2cub2JqZWN0LmV4dGVuZChleHBvcnRzLCBwcm90by5hcGkuYXV0aCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGUtcHJvdG9idWZcIik7IiwiLy8gc291cmNlOiBhdXRoLnByb3RvXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBlbmhhbmNlYWJsZVxuICogQHN1cHByZXNzIHttZXNzYWdlQ29udmVudGlvbnN9IEpTIENvbXBpbGVyIHJlcG9ydHMgYW4gZXJyb3IgaWYgYSB2YXJpYWJsZSBvclxuICogICAgIGZpZWxkIHN0YXJ0cyB3aXRoICdNU0dfJyBhbmQgaXNuJ3QgYSB0cmFuc2xhdGFibGUgbWVzc2FnZS5cbiAqIEBwdWJsaWNcbiAqL1xuLy8gR0VORVJBVEVEIENPREUgLS0gRE8gTk9UIEVESVQhXG5cbnZhciBqc3BiID0gcmVxdWlyZSgnZ29vZ2xlLXByb3RvYnVmJyk7XG52YXIgZ29vZyA9IGpzcGI7XG52YXIgZ2xvYmFsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxudmFyIGF1dGhfdHlwZXNfcGIgPSByZXF1aXJlKCcuL2F1dGgudHlwZXNfcGIuanMnKTtcbmdvb2cub2JqZWN0LmV4dGVuZChwcm90bywgYXV0aF90eXBlc19wYik7XG5nb29nLmV4cG9ydFN5bWJvbCgncHJvdG8uYXBpLmF1dGguQXV0aFJlcScsIG51bGwsIGdsb2JhbCk7XG5nb29nLmV4cG9ydFN5bWJvbCgncHJvdG8uYXBpLmF1dGguQXV0aFJlcycsIG51bGwsIGdsb2JhbCk7XG5nb29nLmV4cG9ydFN5bWJvbCgncHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcycsIG51bGwsIGdsb2JhbCk7XG4vKipcbiAqIEdlbmVyYXRlZCBieSBKc1BiQ29kZUdlbmVyYXRvci5cbiAqIEBwYXJhbSB7QXJyYXk9fSBvcHRfZGF0YSBPcHRpb25hbCBpbml0aWFsIGRhdGEgYXJyYXksIHR5cGljYWxseSBmcm9tIGFcbiAqIHNlcnZlciByZXNwb25zZSwgb3IgY29uc3RydWN0ZWQgZGlyZWN0bHkgaW4gSmF2YXNjcmlwdC4gVGhlIGFycmF5IGlzIHVzZWRcbiAqIGluIHBsYWNlIGFuZCBiZWNvbWVzIHBhcnQgb2YgdGhlIGNvbnN0cnVjdGVkIG9iamVjdC4gSXQgaXMgbm90IGNsb25lZC5cbiAqIElmIG5vIGRhdGEgaXMgcHJvdmlkZWQsIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3Qgd2lsbCBiZSBlbXB0eSwgYnV0IHN0aWxsXG4gKiB2YWxpZC5cbiAqIEBleHRlbmRzIHtqc3BiLk1lc3NhZ2V9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xucHJvdG8uYXBpLmF1dGguQXV0aFJlcSA9IGZ1bmN0aW9uKG9wdF9kYXRhKSB7XG4gIGpzcGIuTWVzc2FnZS5pbml0aWFsaXplKHRoaXMsIG9wdF9kYXRhLCAwLCAtMSwgbnVsbCwgbnVsbCk7XG59O1xuZ29vZy5pbmhlcml0cyhwcm90by5hcGkuYXV0aC5BdXRoUmVxLCBqc3BiLk1lc3NhZ2UpO1xuaWYgKGdvb2cuREVCVUcgJiYgIUNPTVBJTEVEKSB7XG4gIC8qKlxuICAgKiBAcHVibGljXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgcHJvdG8uYXBpLmF1dGguQXV0aFJlcS5kaXNwbGF5TmFtZSA9ICdwcm90by5hcGkuYXV0aC5BdXRoUmVxJztcbn1cbi8qKlxuICogR2VuZXJhdGVkIGJ5IEpzUGJDb2RlR2VuZXJhdG9yLlxuICogQHBhcmFtIHtBcnJheT19IG9wdF9kYXRhIE9wdGlvbmFsIGluaXRpYWwgZGF0YSBhcnJheSwgdHlwaWNhbGx5IGZyb20gYVxuICogc2VydmVyIHJlc3BvbnNlLCBvciBjb25zdHJ1Y3RlZCBkaXJlY3RseSBpbiBKYXZhc2NyaXB0LiBUaGUgYXJyYXkgaXMgdXNlZFxuICogaW4gcGxhY2UgYW5kIGJlY29tZXMgcGFydCBvZiB0aGUgY29uc3RydWN0ZWQgb2JqZWN0LiBJdCBpcyBub3QgY2xvbmVkLlxuICogSWYgbm8gZGF0YSBpcyBwcm92aWRlZCwgdGhlIGNvbnN0cnVjdGVkIG9iamVjdCB3aWxsIGJlIGVtcHR5LCBidXQgc3RpbGxcbiAqIHZhbGlkLlxuICogQGV4dGVuZHMge2pzcGIuTWVzc2FnZX1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVzID0gZnVuY3Rpb24ob3B0X2RhdGEpIHtcbiAganNwYi5NZXNzYWdlLmluaXRpYWxpemUodGhpcywgb3B0X2RhdGEsIDAsIC0xLCBudWxsLCBudWxsKTtcbn07XG5nb29nLmluaGVyaXRzKHByb3RvLmFwaS5hdXRoLkF1dGhSZXMsIGpzcGIuTWVzc2FnZSk7XG5pZiAoZ29vZy5ERUJVRyAmJiAhQ09NUElMRUQpIHtcbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBwcm90by5hcGkuYXV0aC5BdXRoUmVzLmRpc3BsYXlOYW1lID0gJ3Byb3RvLmFwaS5hdXRoLkF1dGhSZXMnO1xufVxuLyoqXG4gKiBHZW5lcmF0ZWQgYnkgSnNQYkNvZGVHZW5lcmF0b3IuXG4gKiBAcGFyYW0ge0FycmF5PX0gb3B0X2RhdGEgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIGFycmF5LCB0eXBpY2FsbHkgZnJvbSBhXG4gKiBzZXJ2ZXIgcmVzcG9uc2UsIG9yIGNvbnN0cnVjdGVkIGRpcmVjdGx5IGluIEphdmFzY3JpcHQuIFRoZSBhcnJheSBpcyB1c2VkXG4gKiBpbiBwbGFjZSBhbmQgYmVjb21lcyBwYXJ0IG9mIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3QuIEl0IGlzIG5vdCBjbG9uZWQuXG4gKiBJZiBubyBkYXRhIGlzIHByb3ZpZGVkLCB0aGUgY29uc3RydWN0ZWQgb2JqZWN0IHdpbGwgYmUgZW1wdHksIGJ1dCBzdGlsbFxuICogdmFsaWQuXG4gKiBAZXh0ZW5kcyB7anNwYi5NZXNzYWdlfVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXMgPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIG51bGwsIG51bGwpO1xufTtcbmdvb2cuaW5oZXJpdHMocHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcywganNwYi5NZXNzYWdlKTtcbmlmIChnb29nLkRFQlVHICYmICFDT01QSUxFRCkge1xuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXMuZGlzcGxheU5hbWUgPSAncHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcyc7XG59XG5cblxuXG5pZiAoanNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX09CSkVDVCkge1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHByb3RvLlxuICogRmllbGQgbmFtZXMgdGhhdCBhcmUgcmVzZXJ2ZWQgaW4gSmF2YVNjcmlwdCBhbmQgd2lsbCBiZSByZW5hbWVkIHRvIHBiX25hbWUuXG4gKiBPcHRpb25hbCBmaWVsZHMgdGhhdCBhcmUgbm90IHNldCB3aWxsIGJlIHNldCB0byB1bmRlZmluZWQuXG4gKiBUbyBhY2Nlc3MgYSByZXNlcnZlZCBmaWVsZCB1c2UsIGZvby5wYl88bmFtZT4sIGVnLCBmb28ucGJfZGVmYXVsdC5cbiAqIEZvciB0aGUgbGlzdCBvZiByZXNlcnZlZCBuYW1lcyBwbGVhc2Ugc2VlOlxuICogICAgIG5ldC9wcm90bzIvY29tcGlsZXIvanMvaW50ZXJuYWwvZ2VuZXJhdG9yLmNjI2tLZXl3b3JkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X2luY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlXG4gKiAgICAgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXEucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24ob3B0X2luY2x1ZGVJbnN0YW5jZSkge1xuICByZXR1cm4gcHJvdG8uYXBpLmF1dGguQXV0aFJlcS50b09iamVjdChvcHRfaW5jbHVkZUluc3RhbmNlLCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiB0aGUge0BzZWUgdG9PYmplY3R9IG1ldGhvZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGluY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiBXaGV0aGVyIHRvIGluY2x1ZGVcbiAqICAgICB0aGUgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS5hdXRoLkF1dGhSZXF9IG1zZyBUaGUgbXNnIGluc3RhbmNlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXEudG9PYmplY3QgPSBmdW5jdGlvbihpbmNsdWRlSW5zdGFuY2UsIG1zZykge1xuICB2YXIgZiwgb2JqID0ge1xuICAgIGVtYWlsOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDEsIFwiXCIpLFxuICAgIHBhc3N3b3JkOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDIsIFwiXCIpXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuYXV0aC5BdXRoUmVxfVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVxLmRlc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBqc3BiLkJpbmFyeVJlYWRlcihieXRlcyk7XG4gIHZhciBtc2cgPSBuZXcgcHJvdG8uYXBpLmF1dGguQXV0aFJlcTtcbiAgcmV0dXJuIHByb3RvLmFwaS5hdXRoLkF1dGhSZXEuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uYXBpLmF1dGguQXV0aFJlcX0gbXNnIFRoZSBtZXNzYWdlIG9iamVjdCB0byBkZXNlcmlhbGl6ZSBpbnRvLlxuICogQHBhcmFtIHshanNwYi5CaW5hcnlSZWFkZXJ9IHJlYWRlciBUaGUgQmluYXJ5UmVhZGVyIHRvIHVzZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuYXV0aC5BdXRoUmVxfVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVxLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBjYXNlIDE6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldEVtYWlsKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocmVhZGVyLnJlYWRTdHJpbmcoKSk7XG4gICAgICBtc2cuc2V0UGFzc3dvcmQodmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlYWRlci5za2lwRmllbGQoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbXNnO1xufTtcblxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KS5cbiAqIEByZXR1cm4geyFVaW50OEFycmF5fVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVxLnByb3RvdHlwZS5zZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHdyaXRlciA9IG5ldyBqc3BiLkJpbmFyeVdyaXRlcigpO1xuICBwcm90by5hcGkuYXV0aC5BdXRoUmVxLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyKHRoaXMsIHdyaXRlcik7XG4gIHJldHVybiB3cml0ZXIuZ2V0UmVzdWx0QnVmZmVyKCk7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgZ2l2ZW4gbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZVxuICogZm9ybWF0KSwgd3JpdGluZyB0byB0aGUgZ2l2ZW4gQmluYXJ5V3JpdGVyLlxuICogQHBhcmFtIHshcHJvdG8uYXBpLmF1dGguQXV0aFJlcX0gbWVzc2FnZVxuICogQHBhcmFtIHshanNwYi5CaW5hcnlXcml0ZXJ9IHdyaXRlclxuICogQHN1cHByZXNzIHt1bnVzZWRMb2NhbFZhcmlhYmxlc30gZiBpcyBvbmx5IHVzZWQgZm9yIG5lc3RlZCBtZXNzYWdlc1xuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVxLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyID0gZnVuY3Rpb24obWVzc2FnZSwgd3JpdGVyKSB7XG4gIHZhciBmID0gdW5kZWZpbmVkO1xuICBmID0gbWVzc2FnZS5nZXRFbWFpbCgpO1xuICBpZiAoZi5sZW5ndGggPiAwKSB7XG4gICAgd3JpdGVyLndyaXRlU3RyaW5nKFxuICAgICAgMSxcbiAgICAgIGZcbiAgICApO1xuICB9XG4gIGYgPSBtZXNzYWdlLmdldFBhc3N3b3JkKCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAyLFxuICAgICAgZlxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBvcHRpb25hbCBzdHJpbmcgZW1haWwgPSAxO1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVxLnByb3RvdHlwZS5nZXRFbWFpbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdCh0aGlzLCAxLCBcIlwiKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXEucHJvdG90eXBlLnNldEVtYWlsID0gZnVuY3Rpb24odmFsdWUpIHtcbiAganNwYi5NZXNzYWdlLnNldFByb3RvM1N0cmluZ0ZpZWxkKHRoaXMsIDEsIHZhbHVlKTtcbn07XG5cblxuLyoqXG4gKiBvcHRpb25hbCBzdHJpbmcgcGFzc3dvcmQgPSAyO1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVxLnByb3RvdHlwZS5nZXRQYXNzd29yZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdCh0aGlzLCAyLCBcIlwiKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXEucHJvdG90eXBlLnNldFBhc3N3b3JkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAganNwYi5NZXNzYWdlLnNldFByb3RvM1N0cmluZ0ZpZWxkKHRoaXMsIDIsIHZhbHVlKTtcbn07XG5cblxuXG5cblxuaWYgKGpzcGIuTWVzc2FnZS5HRU5FUkFURV9UT19PQkpFQ1QpIHtcbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBwcm90by5cbiAqIEZpZWxkIG5hbWVzIHRoYXQgYXJlIHJlc2VydmVkIGluIEphdmFTY3JpcHQgYW5kIHdpbGwgYmUgcmVuYW1lZCB0byBwYl9uYW1lLlxuICogT3B0aW9uYWwgZmllbGRzIHRoYXQgYXJlIG5vdCBzZXQgd2lsbCBiZSBzZXQgdG8gdW5kZWZpbmVkLlxuICogVG8gYWNjZXNzIGEgcmVzZXJ2ZWQgZmllbGQgdXNlLCBmb28ucGJfPG5hbWU+LCBlZywgZm9vLnBiX2RlZmF1bHQuXG4gKiBGb3IgdGhlIGxpc3Qgb2YgcmVzZXJ2ZWQgbmFtZXMgcGxlYXNlIHNlZTpcbiAqICAgICBuZXQvcHJvdG8yL2NvbXBpbGVyL2pzL2ludGVybmFsL2dlbmVyYXRvci5jYyNrS2V5d29yZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9pbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gd2hldGhlciB0byBpbmNsdWRlIHRoZVxuICogICAgIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcmV0dXJuIHshT2JqZWN0fVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVzLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uKG9wdF9pbmNsdWRlSW5zdGFuY2UpIHtcbiAgcmV0dXJuIHByb3RvLmFwaS5hdXRoLkF1dGhSZXMudG9PYmplY3Qob3B0X2luY2x1ZGVJbnN0YW5jZSwgdGhpcyk7XG59O1xuXG5cbi8qKlxuICogU3RhdGljIHZlcnNpb24gb2YgdGhlIHtAc2VlIHRvT2JqZWN0fSBtZXRob2QuXG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSBpbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gV2hldGhlciB0byBpbmNsdWRlXG4gKiAgICAgdGhlIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcGFyYW0geyFwcm90by5hcGkuYXV0aC5BdXRoUmVzfSBtc2cgVGhlIG1zZyBpbnN0YW5jZSB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHshT2JqZWN0fVxuICogQHN1cHByZXNzIHt1bnVzZWRMb2NhbFZhcmlhYmxlc30gZiBpcyBvbmx5IHVzZWQgZm9yIG5lc3RlZCBtZXNzYWdlc1xuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVzLnRvT2JqZWN0ID0gZnVuY3Rpb24oaW5jbHVkZUluc3RhbmNlLCBtc2cpIHtcbiAgdmFyIGYsIG9iaiA9IHtcbiAgICB0b2tlbjoganNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQobXNnLCAxLCBcIlwiKVxuICB9O1xuXG4gIGlmIChpbmNsdWRlSW5zdGFuY2UpIHtcbiAgICBvYmouJGpzcGJNZXNzYWdlSW5zdGFuY2UgPSBtc2c7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG59XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KS5cbiAqIEBwYXJhbSB7anNwYi5CeXRlU291cmNlfSBieXRlcyBUaGUgYnl0ZXMgdG8gZGVzZXJpYWxpemUuXG4gKiBAcmV0dXJuIHshcHJvdG8uYXBpLmF1dGguQXV0aFJlc31cbiAqL1xucHJvdG8uYXBpLmF1dGguQXV0aFJlcy5kZXNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gIHZhciByZWFkZXIgPSBuZXcganNwYi5CaW5hcnlSZWFkZXIoYnl0ZXMpO1xuICB2YXIgbXNnID0gbmV3IHByb3RvLmFwaS5hdXRoLkF1dGhSZXM7XG4gIHJldHVybiBwcm90by5hcGkuYXV0aC5BdXRoUmVzLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlcihtc2csIHJlYWRlcik7XG59O1xuXG5cbi8qKlxuICogRGVzZXJpYWxpemVzIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkgZnJvbSB0aGVcbiAqIGdpdmVuIHJlYWRlciBpbnRvIHRoZSBnaXZlbiBtZXNzYWdlIG9iamVjdC5cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS5hdXRoLkF1dGhSZXN9IG1zZyBUaGUgbWVzc2FnZSBvYmplY3QgdG8gZGVzZXJpYWxpemUgaW50by5cbiAqIEBwYXJhbSB7IWpzcGIuQmluYXJ5UmVhZGVyfSByZWFkZXIgVGhlIEJpbmFyeVJlYWRlciB0byB1c2UuXG4gKiBAcmV0dXJuIHshcHJvdG8uYXBpLmF1dGguQXV0aFJlc31cbiAqL1xucHJvdG8uYXBpLmF1dGguQXV0aFJlcy5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIgPSBmdW5jdGlvbihtc2csIHJlYWRlcikge1xuICB3aGlsZSAocmVhZGVyLm5leHRGaWVsZCgpKSB7XG4gICAgaWYgKHJlYWRlci5pc0VuZEdyb3VwKCkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgZmllbGQgPSByZWFkZXIuZ2V0RmllbGROdW1iZXIoKTtcbiAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgY2FzZSAxOlxuICAgICAgdmFyIHZhbHVlID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChyZWFkZXIucmVhZFN0cmluZygpKTtcbiAgICAgIG1zZy5zZXRUb2tlbih2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmVhZGVyLnNraXBGaWVsZCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtc2c7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHJldHVybiB7IVVpbnQ4QXJyYXl9XG4gKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXMucHJvdG90eXBlLnNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd3JpdGVyID0gbmV3IGpzcGIuQmluYXJ5V3JpdGVyKCk7XG4gIHByb3RvLmFwaS5hdXRoLkF1dGhSZXMuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuYXV0aC5BdXRoUmVzfSBtZXNzYWdlXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVdyaXRlcn0gd3JpdGVyXG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXMuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIgPSBmdW5jdGlvbihtZXNzYWdlLCB3cml0ZXIpIHtcbiAgdmFyIGYgPSB1bmRlZmluZWQ7XG4gIGYgPSBtZXNzYWdlLmdldFRva2VuKCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAxLFxuICAgICAgZlxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBvcHRpb25hbCBzdHJpbmcgdG9rZW4gPSAxO1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5wcm90by5hcGkuYXV0aC5BdXRoUmVzLnByb3RvdHlwZS5nZXRUb2tlbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdCh0aGlzLCAxLCBcIlwiKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgKi9cbnByb3RvLmFwaS5hdXRoLkF1dGhSZXMucHJvdG90eXBlLnNldFRva2VuID0gZnVuY3Rpb24odmFsdWUpIHtcbiAganNwYi5NZXNzYWdlLnNldFByb3RvM1N0cmluZ0ZpZWxkKHRoaXMsIDEsIHZhbHVlKTtcbn07XG5cblxuXG5cblxuaWYgKGpzcGIuTWVzc2FnZS5HRU5FUkFURV9UT19PQkpFQ1QpIHtcbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBwcm90by5cbiAqIEZpZWxkIG5hbWVzIHRoYXQgYXJlIHJlc2VydmVkIGluIEphdmFTY3JpcHQgYW5kIHdpbGwgYmUgcmVuYW1lZCB0byBwYl9uYW1lLlxuICogT3B0aW9uYWwgZmllbGRzIHRoYXQgYXJlIG5vdCBzZXQgd2lsbCBiZSBzZXQgdG8gdW5kZWZpbmVkLlxuICogVG8gYWNjZXNzIGEgcmVzZXJ2ZWQgZmllbGQgdXNlLCBmb28ucGJfPG5hbWU+LCBlZywgZm9vLnBiX2RlZmF1bHQuXG4gKiBGb3IgdGhlIGxpc3Qgb2YgcmVzZXJ2ZWQgbmFtZXMgcGxlYXNlIHNlZTpcbiAqICAgICBuZXQvcHJvdG8yL2NvbXBpbGVyL2pzL2ludGVybmFsL2dlbmVyYXRvci5jYyNrS2V5d29yZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9pbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gd2hldGhlciB0byBpbmNsdWRlIHRoZVxuICogICAgIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcmV0dXJuIHshT2JqZWN0fVxuICovXG5wcm90by5hcGkuYXV0aC5HZXRDZXJ0U3RyZWFtUmVzLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uKG9wdF9pbmNsdWRlSW5zdGFuY2UpIHtcbiAgcmV0dXJuIHByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXMudG9PYmplY3Qob3B0X2luY2x1ZGVJbnN0YW5jZSwgdGhpcyk7XG59O1xuXG5cbi8qKlxuICogU3RhdGljIHZlcnNpb24gb2YgdGhlIHtAc2VlIHRvT2JqZWN0fSBtZXRob2QuXG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSBpbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gV2hldGhlciB0byBpbmNsdWRlXG4gKiAgICAgdGhlIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcGFyYW0geyFwcm90by5hcGkuYXV0aC5HZXRDZXJ0U3RyZWFtUmVzfSBtc2cgVGhlIG1zZyBpbnN0YW5jZSB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHshT2JqZWN0fVxuICogQHN1cHByZXNzIHt1bnVzZWRMb2NhbFZhcmlhYmxlc30gZiBpcyBvbmx5IHVzZWQgZm9yIG5lc3RlZCBtZXNzYWdlc1xuICovXG5wcm90by5hcGkuYXV0aC5HZXRDZXJ0U3RyZWFtUmVzLnRvT2JqZWN0ID0gZnVuY3Rpb24oaW5jbHVkZUluc3RhbmNlLCBtc2cpIHtcbiAgdmFyIGYsIG9iaiA9IHtcbiAgICBrZXk6IGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KG1zZywgMSwgXCJcIilcbiAgfTtcblxuICBpZiAoaW5jbHVkZUluc3RhbmNlKSB7XG4gICAgb2JqLiRqc3BiTWVzc2FnZUluc3RhbmNlID0gbXNnO1xuICB9XG4gIHJldHVybiBvYmo7XG59O1xufVxuXG5cbi8qKlxuICogRGVzZXJpYWxpemVzIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcGFyYW0ge2pzcGIuQnl0ZVNvdXJjZX0gYnl0ZXMgVGhlIGJ5dGVzIHRvIGRlc2VyaWFsaXplLlxuICogQHJldHVybiB7IXByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXN9XG4gKi9cbnByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXMuZGVzZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbihieXRlcykge1xuICB2YXIgcmVhZGVyID0gbmV3IGpzcGIuQmluYXJ5UmVhZGVyKGJ5dGVzKTtcbiAgdmFyIG1zZyA9IG5ldyBwcm90by5hcGkuYXV0aC5HZXRDZXJ0U3RyZWFtUmVzO1xuICByZXR1cm4gcHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcy5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIobXNnLCByZWFkZXIpO1xufTtcblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpIGZyb20gdGhlXG4gKiBnaXZlbiByZWFkZXIgaW50byB0aGUgZ2l2ZW4gbWVzc2FnZSBvYmplY3QuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuYXV0aC5HZXRDZXJ0U3RyZWFtUmVzfSBtc2cgVGhlIG1lc3NhZ2Ugb2JqZWN0IHRvIGRlc2VyaWFsaXplIGludG8uXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVJlYWRlcn0gcmVhZGVyIFRoZSBCaW5hcnlSZWFkZXIgdG8gdXNlLlxuICogQHJldHVybiB7IXByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXN9XG4gKi9cbnByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXMuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyID0gZnVuY3Rpb24obXNnLCByZWFkZXIpIHtcbiAgd2hpbGUgKHJlYWRlci5uZXh0RmllbGQoKSkge1xuICAgIGlmIChyZWFkZXIuaXNFbmRHcm91cCgpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdmFyIGZpZWxkID0gcmVhZGVyLmdldEZpZWxkTnVtYmVyKCk7XG4gICAgc3dpdGNoIChmaWVsZCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocmVhZGVyLnJlYWRTdHJpbmcoKSk7XG4gICAgICBtc2cuc2V0S2V5KHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1zZztcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcmV0dXJuIHshVWludDhBcnJheX1cbiAqL1xucHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcy5wcm90b3R5cGUuc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB3cml0ZXIgPSBuZXcganNwYi5CaW5hcnlXcml0ZXIoKTtcbiAgcHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcy5zZXJpYWxpemVCaW5hcnlUb1dyaXRlcih0aGlzLCB3cml0ZXIpO1xuICByZXR1cm4gd3JpdGVyLmdldFJlc3VsdEJ1ZmZlcigpO1xufTtcblxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIGdpdmVuIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmVcbiAqIGZvcm1hdCksIHdyaXRpbmcgdG8gdGhlIGdpdmVuIEJpbmFyeVdyaXRlci5cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS5hdXRoLkdldENlcnRTdHJlYW1SZXN9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7IWpzcGIuQmluYXJ5V3JpdGVyfSB3cml0ZXJcbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcy5zZXJpYWxpemVCaW5hcnlUb1dyaXRlciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHdyaXRlcikge1xuICB2YXIgZiA9IHVuZGVmaW5lZDtcbiAgZiA9IG1lc3NhZ2UuZ2V0S2V5KCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAxLFxuICAgICAgZlxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBvcHRpb25hbCBzdHJpbmcga2V5ID0gMTtcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xucHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcy5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KHRoaXMsIDEsIFwiXCIpKTtcbn07XG5cblxuLyoqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAqL1xucHJvdG8uYXBpLmF1dGguR2V0Q2VydFN0cmVhbVJlcy5wcm90b3R5cGUuc2V0S2V5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAganNwYi5NZXNzYWdlLnNldFByb3RvM1N0cmluZ0ZpZWxkKHRoaXMsIDEsIHZhbHVlKTtcbn07XG5cblxuZ29vZy5vYmplY3QuZXh0ZW5kKGV4cG9ydHMsIHByb3RvLmFwaS5hdXRoKTtcbiIsImltcG9ydCB7IElzRW1haWwsIElzRGVmaW5lZCwgSXNTdHJpbmcsIE1heExlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IEF1dGhSZXEgfSBmcm9tICdAZ3JwYy1wcm90by9hdXRoL2F1dGhfcGInO1xuXG5leHBvcnQgY2xhc3MgQXV0aFJlcURUTyBpbXBsZW1lbnRzIEF1dGhSZXEuQXNPYmplY3Qge1xuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc0VtYWlsKClcbiAgICBATWF4TGVuZ3RoKDUwKVxuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuXG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzU3RyaW5nKClcbiAgICBATWF4TGVuZ3RoKDEyOClcbiAgICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzLXZhbGlkYXRvclwiKTsiXSwic291cmNlUm9vdCI6IiJ9