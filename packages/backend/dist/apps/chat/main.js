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
process.title = 'node-chat';
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const logger_1 = __webpack_require__(3);
const GrpcConfigs_1 = __webpack_require__(11);
const AppModule_1 = __webpack_require__(13);
const logger = new logger_1.BootstrapLogger();
common_1.Logger.overrideLogger(logger);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(AppModule_1.AppModule, GrpcConfigs_1.grpcChat);
    app.useLogger(logger);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listenAsync();
}
bootstrap().catch(err => {
    logger.error(err);
    process.exit(1);
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
const CertsService_1 = __webpack_require__(14);
const ApiModule_1 = __webpack_require__(17);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            ApiModule_1.ApiModule,
        ],
        providers: [CertsService_1.CertsService],
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(12);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const logger_1 = __webpack_require__(3);
const GrpcConfigs_1 = __webpack_require__(11);
const RETRY = 10;
let CertsService = class CertsService {
    constructor() {
        this.logger = new logger_1.Logger('CertsService');
    }
    onModuleInit() {
        this.grpcAuthService = this.grpcAuthClient.getService('AuthService');
        this.grpcAuthService.getCertStream()
            .pipe(operators_1.retryWhen(errors => errors.pipe(operators_1.tap(err => this.logger.error(err.message + '. Will try again after timeout in 3s.')), operators_1.mergeMap(() => (RETRY ? rxjs_1.timer(3000) :
            rxjs_1.throwError(`Can't reconnect to CertStream', timeout expired.`))))))
            .subscribe((res) => {
            process.env.JWT_PUB = res.key;
        });
    }
};
__decorate([
    microservices_1.Client(GrpcConfigs_1.grpcAuth),
    __metadata("design:type", Object)
], CertsService.prototype, "grpcAuthClient", void 0);
CertsService = __decorate([
    common_1.Injectable()
], CertsService);
exports.CertsService = CertsService;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("rxjs/operators");

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
const ChatModule_1 = __webpack_require__(18);
const MessageModule_1 = __webpack_require__(57);
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [ChatModule_1.ChatModule, MessageModule_1.MessageModule],
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),
/* 18 */
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
const ServicesModule_1 = __webpack_require__(19);
const ChatController_1 = __webpack_require__(34);
const ChatService_1 = __webpack_require__(56);
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [ServicesModule_1.ServicesModule],
        controllers: [ChatController_1.ChatController],
        providers: [ChatService_1.ChatService],
    })
], ChatModule);
exports.ChatModule = ChatModule;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const DalModule_1 = __webpack_require__(20);
const ChatEventService_1 = __webpack_require__(33);
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        imports: [DalModule_1.DalModule],
        providers: [ChatEventService_1.ChatEventService],
        exports: [DalModule_1.DalModule, ChatEventService_1.ChatEventService],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
__export(__webpack_require__(20));


/***/ }),
/* 20 */
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
const DataFindersModule_1 = __webpack_require__(21);
const DataUpdatersModule_1 = __webpack_require__(27);
const DataProducerModule_1 = __webpack_require__(29);
const DataRemoversModule_1 = __webpack_require__(31);
let DalModule = class DalModule {
};
DalModule = __decorate([
    common_1.Module({
        imports: [DataFindersModule_1.DataFindersModule, DataProducerModule_1.DataProducerModule, DataUpdatersModule_1.DataUpdatersModule, DataRemoversModule_1.DataRemoversModule],
        exports: [DataFindersModule_1.DataFindersModule, DataProducerModule_1.DataProducerModule, DataUpdatersModule_1.DataUpdatersModule, DataRemoversModule_1.DataRemoversModule],
    })
], DalModule);
exports.DalModule = DalModule;


/***/ }),
/* 21 */
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
const DbModule_1 = __webpack_require__(22);
const MessageDataFinder_1 = __webpack_require__(26);
let DataFindersModule = class DataFindersModule {
};
DataFindersModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule],
        providers: [MessageDataFinder_1.MessageDataFinder],
        exports: [MessageDataFinder_1.MessageDataFinder],
    })
], DataFindersModule);
exports.DataFindersModule = DataFindersModule;


/***/ }),
/* 22 */
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
const pg_1 = __webpack_require__(23);
const DBMigrate = __webpack_require__(24);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const logger_1 = __webpack_require__(3);
const env_1 = __webpack_require__(25);
let DbModule = class DbModule {
    constructor(db) {
        this.db = db;
        this.logger = new logger_1.Logger('DbModule');
        this.dbmigrate = DBMigrate.getInstance(true, env_1.migrateConfig);
    }
    onModuleInit() {
        if (this.dbmigrate) {
            rxjs_1.from(this.dbmigrate.up())
                .pipe(operators_1.take(1))
                .subscribe(() => {
                this.logger.info('Migrations applied successfully');
                this.db.connect();
            }, (error) => {
                this.logger.error(error);
            });
        }
    }
};
DbModule = __decorate([
    common_1.Module({
        exports: [pg_1.Client],
        providers: [
            {
                provide: pg_1.Client,
                useFactory: () => new pg_1.Client(env_1.dbConfig),
            },
        ],
    }),
    __metadata("design:paramtypes", [pg_1.Client])
], DbModule);
exports.DbModule = DbModule;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("db-migrate");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env;
exports.dbConfig = {
    host: env.DB_HOST || 'localhost',
    port: +env.DB_PORT || 5432,
    user: env.DB_USERNAME || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.DB_DATABASE_CHAT || 'chat',
    keepAlive: true,
};
exports.migrateConfig = {
    cwd: `./apps/chat/src/services/dal/db`,
    env: 'chat',
    string: './database.json',
};


/***/ }),
/* 26 */
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
const pg_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
let MessageDataFinder = class MessageDataFinder {
    constructor(db) {
        this.db = db;
    }
    getMessageOne(id) {
        const query = `select * from api_message where id = $1`;
        return rxjs_1.from(this.db.query(query, [id]))
            .pipe(operators_1.map(res => res.rows[0]));
    }
    getMessageAll() {
        const query = `select * from api_message order by "updatedAt" ASC`;
        return rxjs_1.from(this.db.query(query))
            .pipe(operators_1.map(res => res.rows));
    }
};
MessageDataFinder = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client])
], MessageDataFinder);
exports.MessageDataFinder = MessageDataFinder;


/***/ }),
/* 27 */
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
const DbModule_1 = __webpack_require__(22);
const DataFindersModule_1 = __webpack_require__(21);
const MessageDataUpdater_1 = __webpack_require__(28);
let DataUpdatersModule = class DataUpdatersModule {
};
DataUpdatersModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule, DataFindersModule_1.DataFindersModule],
        providers: [MessageDataUpdater_1.MessageDataUpdater],
        exports: [MessageDataUpdater_1.MessageDataUpdater],
    })
], DataUpdatersModule);
exports.DataUpdatersModule = DataUpdatersModule;


/***/ }),
/* 28 */
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
const pg_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const MessageDataFinder_1 = __webpack_require__(26);
let MessageDataUpdater = class MessageDataUpdater {
    constructor(db, messageDataFinder) {
        this.db = db;
        this.messageDataFinder = messageDataFinder;
    }
    updateMessage(data) {
        const query = `update api_message set message = $1 where id = $2`;
        return rxjs_1.from(this.messageDataFinder.getMessageOne(data.id)).pipe(operators_1.switchMap(() => rxjs_1.from(this.db.query(query, [data.message, data.id]))), operators_1.map(res => res.rows[0]));
    }
};
MessageDataUpdater = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client,
        MessageDataFinder_1.MessageDataFinder])
], MessageDataUpdater);
exports.MessageDataUpdater = MessageDataUpdater;


/***/ }),
/* 29 */
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
const DbModule_1 = __webpack_require__(22);
const DataFindersModule_1 = __webpack_require__(21);
const MessageDataProducer_1 = __webpack_require__(30);
let DataProducerModule = class DataProducerModule {
};
DataProducerModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule, DataFindersModule_1.DataFindersModule],
        providers: [MessageDataProducer_1.MessageDataProducer],
        exports: [MessageDataProducer_1.MessageDataProducer],
    })
], DataProducerModule);
exports.DataProducerModule = DataProducerModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const pg_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
let MessageDataProducer = class MessageDataProducer {
    constructor(db) {
        this.db = db;
    }
    sendMessage(data) {
        const autor = JSON.stringify(data.author);
        const query = `insert into api_message (author, message) values ($1, $2) returning *`;
        return rxjs_1.from(this.db.query(query, [autor, data.message]))
            .pipe(operators_1.map(res => res.rows[0]));
    }
};
MessageDataProducer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client])
], MessageDataProducer);
exports.MessageDataProducer = MessageDataProducer;


/***/ }),
/* 31 */
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
const DbModule_1 = __webpack_require__(22);
const DataFindersModule_1 = __webpack_require__(21);
const MessageDataRemover_1 = __webpack_require__(32);
let DataRemoversModule = class DataRemoversModule {
};
DataRemoversModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule, DataFindersModule_1.DataFindersModule],
        providers: [MessageDataRemover_1.MessageDataRemover],
        exports: [MessageDataRemover_1.MessageDataRemover],
    })
], DataRemoversModule);
exports.DataRemoversModule = DataRemoversModule;


/***/ }),
/* 32 */
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
const pg_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const MessageDataFinder_1 = __webpack_require__(26);
let MessageDataRemover = class MessageDataRemover {
    constructor(db, messageDataFinder) {
        this.db = db;
        this.messageDataFinder = messageDataFinder;
    }
    deleteMessage(id) {
        const query = `delete from api_message where id = $1`;
        return this.messageDataFinder.getMessageOne(id).pipe(operators_1.switchMap(() => rxjs_1.from(this.db.query(query, [id]))), operators_1.mapTo(null));
    }
};
MessageDataRemover = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client,
        MessageDataFinder_1.MessageDataFinder])
], MessageDataRemover);
exports.MessageDataRemover = MessageDataRemover;


/***/ }),
/* 33 */
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
const rxjs_1 = __webpack_require__(15);
let ChatEventService = class ChatEventService {
    constructor() {
        this.updates$ = new rxjs_1.Subject();
    }
    emit(message) {
        this.updates$.next([message]);
    }
    broadcast() {
        return this.updates$.asObservable();
    }
};
ChatEventService = __decorate([
    common_1.Injectable()
], ChatEventService);
exports.ChatEventService = ChatEventService;


/***/ }),
/* 34 */
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
const rxjs_1 = __webpack_require__(15);
const JwtGuard_1 = __webpack_require__(35);
const exceptions_1 = __webpack_require__(38);
const chat_types_pb_1 = __webpack_require__(54);
const ChatService_1 = __webpack_require__(56);
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    getChat(data) {
        return this.chatService.getChatStream();
    }
};
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('ChatService', 'GetChat'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('ChatService::getChat')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChatController.prototype, "getChat", null);
ChatController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [ChatService_1.ChatService])
], ChatController);
exports.ChatController = ChatController;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __webpack_require__(36);
const microservices_1 = __webpack_require__(12);
const grpc_1 = __webpack_require__(37);
const exceptions_1 = __webpack_require__(38);
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
/* 36 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("grpc");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(39));
__export(__webpack_require__(49));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(41));
__export(__webpack_require__(43));
__export(__webpack_require__(44));
__export(__webpack_require__(45));
__export(__webpack_require__(46));
__export(__webpack_require__(47));
__export(__webpack_require__(48));


/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(42);
const code_types_1 = __webpack_require__(40);
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
/* 49 */
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
const types_1 = __webpack_require__(50);
const ExceptionHandlerFactory_1 = __webpack_require__(51);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const BaseException_1 = __webpack_require__(42);
exports.EXCEPTION_LIST = [Error, microservices_1.RpcException, BaseException_1.BaseException];


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const RpcExceptionHandler_1 = __webpack_require__(52);
const InternalExceptionHandler_1 = __webpack_require__(53);
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
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InternalException_1 = __webpack_require__(46);
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// source: chat.types.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(55);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.api.chat.Autor', null, global);
goog.exportSymbol('proto.api.chat.ChatRes', null, global);
goog.exportSymbol('proto.api.chat.EStatus', null, global);
goog.exportSymbol('proto.api.chat.Message', null, global);
goog.exportSymbol('proto.api.chat.Stub', null, global);
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
proto.api.chat.ChatRes = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.chat.ChatRes, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.chat.ChatRes.displayName = 'proto.api.chat.ChatRes';
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
proto.api.chat.Stub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.chat.Stub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.chat.Stub.displayName = 'proto.api.chat.Stub';
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
proto.api.chat.Autor = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.chat.Autor, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.chat.Autor.displayName = 'proto.api.chat.Autor';
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
proto.api.chat.Message = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.chat.Message, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.chat.Message.displayName = 'proto.api.chat.Message';
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
proto.api.chat.ChatRes.prototype.toObject = function(opt_includeInstance) {
  return proto.api.chat.ChatRes.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.chat.ChatRes} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.ChatRes.toObject = function(includeInstance, msg) {
  var f, obj = {
    status: jspb.Message.getFieldWithDefault(msg, 1, 0),
    message: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.api.chat.ChatRes}
 */
proto.api.chat.ChatRes.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.chat.ChatRes;
  return proto.api.chat.ChatRes.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.chat.ChatRes} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.chat.ChatRes}
 */
proto.api.chat.ChatRes.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.api.chat.EStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
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
proto.api.chat.ChatRes.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.chat.ChatRes.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.chat.ChatRes} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.ChatRes.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional EStatus status = 1;
 * @return {!proto.api.chat.EStatus}
 */
proto.api.chat.ChatRes.prototype.getStatus = function() {
  return /** @type {!proto.api.chat.EStatus} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.api.chat.EStatus} value */
proto.api.chat.ChatRes.prototype.setStatus = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional string message = 2;
 * @return {string}
 */
proto.api.chat.ChatRes.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.api.chat.ChatRes.prototype.setMessage = function(value) {
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
proto.api.chat.Stub.prototype.toObject = function(opt_includeInstance) {
  return proto.api.chat.Stub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.chat.Stub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.Stub.toObject = function(includeInstance, msg) {
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
 * @return {!proto.api.chat.Stub}
 */
proto.api.chat.Stub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.chat.Stub;
  return proto.api.chat.Stub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.chat.Stub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.chat.Stub}
 */
proto.api.chat.Stub.deserializeBinaryFromReader = function(msg, reader) {
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
proto.api.chat.Stub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.chat.Stub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.chat.Stub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.Stub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
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
proto.api.chat.Autor.prototype.toObject = function(opt_includeInstance) {
  return proto.api.chat.Autor.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.chat.Autor} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.Autor.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    avatar: jspb.Message.getFieldWithDefault(msg, 3, "")
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
 * @return {!proto.api.chat.Autor}
 */
proto.api.chat.Autor.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.chat.Autor;
  return proto.api.chat.Autor.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.chat.Autor} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.chat.Autor}
 */
proto.api.chat.Autor.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setAvatar(value);
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
proto.api.chat.Autor.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.chat.Autor.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.chat.Autor} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.Autor.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAvatar();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.api.chat.Autor.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.api.chat.Autor.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.api.chat.Autor.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.api.chat.Autor.prototype.setName = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string avatar = 3;
 * @return {string}
 */
proto.api.chat.Autor.prototype.getAvatar = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.api.chat.Autor.prototype.setAvatar = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
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
proto.api.chat.Message.prototype.toObject = function(opt_includeInstance) {
  return proto.api.chat.Message.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.chat.Message} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.Message.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    author: (f = msg.getAuthor()) && proto.api.chat.Autor.toObject(includeInstance, f),
    message: jspb.Message.getFieldWithDefault(msg, 3, ""),
    updatedat: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.api.chat.Message}
 */
proto.api.chat.Message.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.chat.Message;
  return proto.api.chat.Message.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.chat.Message} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.chat.Message}
 */
proto.api.chat.Message.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new proto.api.chat.Autor;
      reader.readMessage(value,proto.api.chat.Autor.deserializeBinaryFromReader);
      msg.setAuthor(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setUpdatedat(value);
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
proto.api.chat.Message.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.chat.Message.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.chat.Message} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.chat.Message.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getAuthor();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.api.chat.Autor.serializeBinaryToWriter
    );
  }
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getUpdatedat();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.api.chat.Message.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.api.chat.Message.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional Autor author = 2;
 * @return {?proto.api.chat.Autor}
 */
proto.api.chat.Message.prototype.getAuthor = function() {
  return /** @type{?proto.api.chat.Autor} */ (
    jspb.Message.getWrapperField(this, proto.api.chat.Autor, 2));
};


/** @param {?proto.api.chat.Autor|undefined} value */
proto.api.chat.Message.prototype.setAuthor = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 */
proto.api.chat.Message.prototype.clearAuthor = function() {
  this.setAuthor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api.chat.Message.prototype.hasAuthor = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string message = 3;
 * @return {string}
 */
proto.api.chat.Message.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.api.chat.Message.prototype.setMessage = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string updatedAt = 4;
 * @return {string}
 */
proto.api.chat.Message.prototype.getUpdatedat = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.api.chat.Message.prototype.setUpdatedat = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * @enum {number}
 */
proto.api.chat.EStatus = {
  UNKNOWN: 0,
  SUCCESS: 1,
  ERROR: 2
};

goog.object.extend(exports, proto.api.chat);


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("google-protobuf");

/***/ }),
/* 56 */
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
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const MessageDataFinder_1 = __webpack_require__(26);
const ChatEventService_1 = __webpack_require__(33);
let ChatService = class ChatService {
    constructor(messageDataFinder, chatEventService) {
        this.messageDataFinder = messageDataFinder;
        this.chatEventService = chatEventService;
    }
    getChatStream() {
        return rxjs_1.concat(this.messageDataFinder.getMessageAll(), this.chatEventService.broadcast())
            .pipe(operators_1.map(messages => ({ messages })));
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [MessageDataFinder_1.MessageDataFinder,
        ChatEventService_1.ChatEventService])
], ChatService);
exports.ChatService = ChatService;


/***/ }),
/* 57 */
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
const ServicesModule_1 = __webpack_require__(19);
const MessageController_1 = __webpack_require__(58);
const MessageService_1 = __webpack_require__(60);
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [ServicesModule_1.ServicesModule],
        controllers: [MessageController_1.MessageController],
        providers: [MessageService_1.MessageService],
    })
], MessageModule);
exports.MessageModule = MessageModule;


/***/ }),
/* 58 */
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
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(59);
const JwtGuard_1 = __webpack_require__(35);
const exceptions_1 = __webpack_require__(38);
const chat_types_pb_1 = __webpack_require__(54);
const MessageService_1 = __webpack_require__(60);
const AddMessageReqDTO_1 = __webpack_require__(61);
const EditMessageReqDTO_1 = __webpack_require__(63);
const DeleteMessageReqDTO_1 = __webpack_require__(64);
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    sendMessage(data, meta) {
        return this.messageService.sendMessage(data, meta.payload.id).pipe(operators_1.map(res => {
            return {
                status: chat_types_pb_1.EStatus.SUCCESS,
                message: `Message created successfully`,
            };
        }));
    }
    editMessage(data) {
        return this.messageService.editMessage(data).pipe(operators_1.map(() => {
            return {
                status: chat_types_pb_1.EStatus.SUCCESS,
                message: `Messages update successfully`,
            };
        }));
    }
    deleteMessage(data) {
        return this.messageService.deleteMessage(data.id).pipe(operators_1.map(() => {
            return {
                status: chat_types_pb_1.EStatus.SUCCESS,
                message: `Message delete successfully`,
            };
        }));
    }
};
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('MessageService', 'SendMessage'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('MessageService::sendMessage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddMessageReqDTO_1.AddMessageReqDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], MessageController.prototype, "sendMessage", null);
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('MessageService', 'EditMessage'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('MessageService::editMessage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EditMessageReqDTO_1.EditMessageReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], MessageController.prototype, "editMessage", null);
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('MessageService', 'DeleteMessage'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('MessageService::deleteMessage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteMessageReqDTO_1.DeleteMessageReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], MessageController.prototype, "deleteMessage", null);
MessageController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [MessageService_1.MessageService])
], MessageController);
exports.MessageController = MessageController;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("rxjs/internal/operators");

/***/ }),
/* 60 */
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
const operators_1 = __webpack_require__(16);
const GrpcConfigs_1 = __webpack_require__(11);
const MessageDataProducer_1 = __webpack_require__(30);
const MessageDataRemover_1 = __webpack_require__(32);
const MessageDataUpdater_1 = __webpack_require__(28);
const ChatEventService_1 = __webpack_require__(33);
let MessageService = class MessageService {
    constructor(messageDataProducer, messageDataUpdater, messageDataRemover, chatEventService) {
        this.messageDataProducer = messageDataProducer;
        this.messageDataUpdater = messageDataUpdater;
        this.messageDataRemover = messageDataRemover;
        this.chatEventService = chatEventService;
    }
    onModuleInit() {
        this.grpcUserService = this.grpcUserClient.getService('UserService');
    }
    sendMessage(data, userId) {
        return this.grpcUserService.getUser({ id: userId })
            .pipe(operators_1.switchMap(user => this.messageDataProducer.sendMessage({
            message: data.message,
            author: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            },
        })), operators_1.tap(res => this.chatEventService.emit(res)), operators_1.mapTo(null));
    }
    editMessage(data) {
        return this.messageDataUpdater.updateMessage(data)
            .pipe(operators_1.mapTo(null));
    }
    deleteMessage(id) {
        return this.messageDataRemover.deleteMessage(id)
            .pipe(operators_1.mapTo(null));
    }
};
__decorate([
    microservices_1.Client(GrpcConfigs_1.grpcUser),
    __metadata("design:type", Object)
], MessageService.prototype, "grpcUserClient", void 0);
MessageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [MessageDataProducer_1.MessageDataProducer,
        MessageDataUpdater_1.MessageDataUpdater,
        MessageDataRemover_1.MessageDataRemover,
        ChatEventService_1.ChatEventService])
], MessageService);
exports.MessageService = MessageService;


/***/ }),
/* 61 */
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
const class_validator_1 = __webpack_require__(62);
class AddMessageReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(500),
    __metadata("design:type", String)
], AddMessageReqDTO.prototype, "message", void 0);
exports.AddMessageReqDTO = AddMessageReqDTO;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 63 */
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
const class_validator_1 = __webpack_require__(62);
class EditMessageReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], EditMessageReqDTO.prototype, "id", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(500),
    __metadata("design:type", String)
], EditMessageReqDTO.prototype, "message", void 0);
exports.EditMessageReqDTO = EditMessageReqDTO;


/***/ }),
/* 64 */
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
const class_validator_1 = __webpack_require__(62);
class DeleteMessageReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], DeleteMessageReqDTO.prototype, "id", void 0);
exports.DeleteMessageReqDTO = DeleteMessageReqDTO;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29tbW9uXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL2NvbG9yaXplcnMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL01lc3NhZ2VQcmludGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9sb2dnZXIvQm9vdHN0cmFwTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy91dGlscy9HcnBjQ29uZmlncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL0FwcE1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvand0L0NlcnRzU2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2FwaS9BcGlNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvY2hhdC9DaGF0TW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvc2VydmljZXMvU2VydmljZXNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvRGFsTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRiLW1pZ3JhdGVcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2Vudi50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvTWVzc2FnZURhdGFGaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS11cGRhdGVycy9EYXRhVXBkYXRlcnNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS11cGRhdGVycy9NZXNzYWdlRGF0YVVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS1wcm9kdWNlcnMvRGF0YVByb2R1Y2VyTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvc2VydmljZXMvZGFsL2RhdGEtcHJvZHVjZXJzL01lc3NhZ2VEYXRhUHJvZHVjZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS1yZW1vdmVycy9EYXRhUmVtb3ZlcnNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS1yZW1vdmVycy9NZXNzYWdlRGF0YVJlbW92ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9DaGF0RXZlbnRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL2NoYXQvQ2hhdENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2p3dC9Kd3RHdWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncnBjXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL2NvZGUudHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9CYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvTm90Rm91bmRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL0ludGVybmFsRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvVW5hdmFpbGFibGVFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9maWx0ZXIvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL0V4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ZpbHRlci9oYW5kbGVycy9pbXBsL1JwY0V4Y2VwdGlvbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvZ3JwYy1wcm90by9jaGF0L2NoYXQudHlwZXNfcGIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ29vZ2xlLXByb3RvYnVmXCIiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvY2hhdC9DaGF0U2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2FwaS9tZXNzYWdlL01lc3NhZ2VNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvbWVzc2FnZS9NZXNzYWdlQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL2ludGVybmFsL29wZXJhdG9yc1wiIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL21lc3NhZ2UvTWVzc2FnZVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvbWVzc2FnZS9kdG8vQWRkTWVzc2FnZVJlcURUTy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbGFzcy12YWxpZGF0b3JcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2FwaS9tZXNzYWdlL2R0by9FZGl0TWVzc2FnZVJlcURUTy50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2FwaS9tZXNzYWdlL2R0by9EZWxldGVNZXNzYWdlUmVxRFRPLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7QUNsRkEsT0FBTyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7QUFFNUIsc0NBQTJDO0FBQzNDLHdDQUFzRTtBQUV0RSx3Q0FBOEM7QUFFOUMsOENBQWtEO0FBRWxELDRDQUF3QztBQUV4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUFlLEVBQUUsQ0FBQztBQUdyQyxlQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRWxDLEtBQUssVUFBVSxTQUFTO0lBQ3BCLE1BQU0sR0FBRyxHQUFH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LENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzthQUMzQyxJQUFJLENBQUMsaUJBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQXhDcUI7SUFBakIsc0JBQU0sQ0FBQyxzQkFBUSxDQUFDOztzREFBNkM7QUFGckQsY0FBYztJQUQxQixtQkFBVSxFQUFFO3FDQU9pQyx5Q0FBbUI7UUFDcEIsdUNBQWtCO1FBQ2xCLHVDQUFrQjtRQUNwQixtQ0FBZ0I7R0FUOUMsY0FBYyxDQTBDMUI7QUExQ1ksd0NBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQjNCLGtEQUFpRTtBQUlqRSxNQUFhLGdCQUFnQjtDQUs1QjtBQURHO0lBSEMsMkJBQVMsRUFBRTtJQUNYLDBCQUFRLEVBQUU7SUFDViwyQkFBUyxDQUFDLEdBQUcsQ0FBQzs7aURBQ1E7QUFKM0IsNENBS0M7Ozs7Ozs7QUNURCw0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsa0RBQXlFO0FBSXpFLE1BQWEsaUJBQWlCO0NBUzdCO0FBTkc7SUFGQywyQkFBUyxFQUFFO0lBQ1gsd0JBQU0sRUFBRTs7NkNBQ1M7QUFLbEI7SUFIQywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLENBQUMsR0FBRyxDQUFDOztrREFDUTtBQVIzQiw4Q0FTQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JELGtEQUFvRDtBQUlwRCxNQUFhLG1CQUFtQjtDQUkvQjtBQURHO0lBRkMsMkJBQVMsRUFBRTtJQUNYLHdCQUFNLEVBQUU7OytDQUNTO0FBSHRCLGtEQUlDIiwiZmlsZSI6ImFwcHMvY2hhdC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwicHJvY2Vzcy50aXRsZSA9ICdub2RlLWNoYXQnO1xuXG5pbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXIgYXMgTmVzdExvZ2dlciwgVmFsaWRhdGlvblBpcGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IEJvb3RzdHJhcExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcblxuaW1wb3J0IHsgZ3JwY0NoYXQgfSBmcm9tICdAbGliL3V0aWxzL0dycGNDb25maWdzJztcblxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9BcHBNb2R1bGUnO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgQm9vdHN0cmFwTG9nZ2VyKCk7XG4vLyBvdmVycmlkZSBsb2dnZXIgd2l0aCBvdXIgaW1wbGVtZW50YXRpb24gZm9yIHRyYW5zZm9ybWluZyBsb2dzIGxpa2Vcbi8vIFwiW05lc3RdIDQwNiAgIC0gOC8xMi8yMDE5LCAxMTowMDo0MSBBTSAgIFtOZXN0RmFjdG9yeV0gLi4uXCJcbk5lc3RMb2dnZXIub3ZlcnJpZGVMb2dnZXIobG9nZ2VyKTtcblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICAgIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZU1pY3Jvc2VydmljZShBcHBNb2R1bGUsIGdycGNDaGF0KTtcblxuICAgIGFwcC51c2VMb2dnZXIobG9nZ2VyKTtcbiAgICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFZhbGlkYXRpb25QaXBlKCkpO1xuXG4gICAgYXdhaXQgYXBwLmxpc3RlbkFzeW5jKCk7XG59XG5cbmJvb3RzdHJhcCgpLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwiZXhwb3J0ICogZnJvbSAnLi9Mb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Cb290c3RyYXBMb2dnZXInO1xuIiwiaW1wb3J0IHsgQUxMT1dFRF9MT0dfQllfTEVWRUwsIERFRkFVTFRfTE9HR0VSX0xFVkVMLCBMb2dMZXZlbFR5cGUsIExPR19MRVZFTF9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXInO1xuaW1wb3J0IHsgTWVzc2FnZVByaW50ZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZVByaW50ZXInO1xuXG5jb25zdCBDVVJSRU5UX0xPR19MRVZFTCA9IHByb2Nlc3MuZW52LkxPR0dFUl9MRVZFTCB8fCBERUZBVUxUX0xPR0dFUl9MRVZFTDtcbmNvbnN0IENVUlJFTlRfQUxMT1dFRF9MRVZFTFMgPSBBTExPV0VEX0xPR19CWV9MRVZFTFtDVVJSRU5UX0xPR19MRVZFTF07XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVByaW50ZXI6IE1lc3NhZ2VQcmludGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUJ1aWxkZXI6IE1lc3NhZ2VCdWlsZGVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1aWxkZXIgPSBuZXcgTWVzc2FnZUJ1aWxkZXIodGhpcy5sYWJlbCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIgPSBuZXcgTWVzc2FnZVByaW50ZXIodGhpcy5tZXNzYWdlQnVpbGRlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZShMT0dfTEVWRUxfTkFNRS5kZWJ1ZywgYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluZm8oLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLmluZm8sIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWN1cml0eSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuc2VjdXJpdHksIGFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nTWVzc2FnZShjdXJyZW50TGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKENVUlJFTlRfQUxMT1dFRF9MRVZFTFMuaGFzKGN1cnJlbnRMZXZlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIucHJpbnQoY3VycmVudExldmVsLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB0eXBlIExvZ0xldmVsVHlwZSA9ICdkZWJ1ZycgfCAnaW5mbycgfCAnZXJyb3InIHwgJ3NlY3VyaXR5JztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HR0VSX0xFVkVMID0gJ2luZm8nO1xuXG5leHBvcnQgY29uc3QgQUxMT1dFRF9MT0dfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IG5ldyBTZXQoWydkZWJ1ZycsICdpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGluZm86IG5ldyBTZXQoWydpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGVycm9yOiBuZXcgU2V0KFsnZXJyb3InLCAnc2VjdXJpdHknXSksXG4gICAgc2VjdXJpdHk6IG5ldyBTZXQoWydzZWN1cml0eSddKSxcbn07XG5cbmV4cG9ydCBjb25zdCBMT0dfTEVWRUxfTkFNRSA9IHtcbiAgICBkZWJ1ZzogJ2RlYnVnJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgaW5mbzogJ2luZm8nIGFzIExvZ0xldmVsVHlwZSxcbiAgICBlcnJvcjogJ2Vycm9yJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScgYXMgTG9nTGV2ZWxUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfQ09MT1JfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IDkwLFxuICAgIGluZm86IDMyLFxuICAgIGVycm9yOiAzMSxcbiAgICBzZWN1cml0eTogMzYsXG59O1xuIiwiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGNvbG9yaXplVGltZXN0YW1wLCBjb2xvcml6ZUxldmVsLCBjb2xvcml6ZUxhYmVsLCBjb2xvcml6ZU1lc3NhZ2UgfSBmcm9tICcuL2NvbG9yaXplcnMnO1xuaW1wb3J0IHsgcGFkU3RhcnQsIHBhZEVuZCB9IGZyb20gJy4uL2Zvcm1hdCc7XG5cbmNvbnN0IERFTElNSVRFUlMgPSB7XG4gICAgZGF0ZTogJy0nLFxuICAgIHRpbWU6ICc6JyxcbiAgICBsb2dNZXNzYWdlOiAnICcsXG4gICAgZnVsbE1lc3NhZ2U6ICcgOjogJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlQnVpbGRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2xvcml6ZU1lc3NhZ2VzID0gcHJvY2Vzcy5lbnYuTE9HR0VSX0NPTE9SSVpFX01FU1NBR0VTID09PSAndHJ1ZSc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLmdldFRpbWVzdGFtcCgpO1xuICAgICAgICBjb25zdCBsb2dNZXNzYWdlID0gdGhpcy5wcmVwYXJlTWVzc2FnZUZyb21BcmdzKGFyZ3MpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb2xvcml6ZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RpbWVzdGFtcCwgbGV2ZWwsIHRoaXMubGFiZWwsIGxvZ01lc3NhZ2VdLmpvaW4oREVMSU1JVEVSUy5mdWxsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wKSxcbiAgICAgICAgICAgIGNvbG9yaXplTGV2ZWwobGV2ZWwpLFxuICAgICAgICAgICAgY29sb3JpemVMYWJlbCh0aGlzLmxhYmVsKSxcbiAgICAgICAgICAgIGNvbG9yaXplTWVzc2FnZShsZXZlbCwgbG9nTWVzc2FnZSksXG4gICAgICAgIF0uam9pbihERUxJTUlURVJTLmZ1bGxNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbG9nRGF0ZSA9IFtwYWRTdGFydChkYXRlLmdldERhdGUoKSksIHBhZFN0YXJ0KGRhdGUuZ2V0TW9udGgoKSArIDEpLCBkYXRlLmdldEZ1bGxZZWFyKCldLmpvaW4oREVMSU1JVEVSUy5kYXRlKTtcbiAgICAgICAgY29uc3QgbG9nVGltZSA9IFtwYWRTdGFydChkYXRlLmdldEhvdXJzKCkpLCBwYWRTdGFydChkYXRlLmdldE1pbnV0ZXMoKSksIHBhZEVuZChkYXRlLmdldE1pbGxpc2Vjb25kcygpKV0uam9pbihERUxJTUlURVJTLnRpbWUpO1xuXG4gICAgICAgIHJldHVybiBgWyR7bG9nRGF0ZX0gJHtsb2dUaW1lfV1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZU1lc3NhZ2VGcm9tQXJncyhhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgICAgICAgICAubWFwKGl0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGl0O1xuXG4gICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBwcmVwYXJlIHVuZGVmaW5lZCwgbnVsbCwgc3RyaW5nICYgbnVtYmVyIHR5cGVzXG4gICAgICAgICAgICAgICAgaWYgKFsnbnVtYmVyJywgJ3N0cmluZycsICd1bmRlZmluZWQnXS5pbmNsdWRlcyh0eXBlKSB8fCBpdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdHJ5IGFkZCBzdGFjayBvciBtZXNzYWdlIGZyb20gRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoaXQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7aXQuc3RhY2sgfHwgaXQubWVzc2FnZSB8fCBpdH1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHN0cmluZ2lmeSBvdGhlciB0eXBlcywgc3VjaCBhcyBhcnJheSwgb2JqZWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KGl0LCBudWxsLCAyKX1gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKERFTElNSVRFUlMubG9nTWVzc2FnZSk7XG4gICAgfVxufVxuIiwiLy8gYWJvdXQgY29sb3JpemluZyBtZXNzYWdlcyBpbiBzdGRvdXQgc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDE0MDcyNDZcblxuaW1wb3J0IHsgTUVTU0FHRV9DT0xPUl9CWV9MRVZFTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSBNRVNTQUdFX0NPTE9SX0JZX0xFVkVMLmluZm87XG5jb25zdCBUSU1FU1RBTVBfQ09MT1IgPSAnNTAnO1xuY29uc3QgTEFCRUxfQ09MT1IgPSAnMzMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShUSU1FU1RBTVBfQ09MT1IsIHRpbWVzdGFtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxldmVsKGxldmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShNRVNTQUdFX0NPTE9SX0JZX0xFVkVMW2xldmVsXSB8fCBERUZBVUxUX0NPTE9SLCBsZXZlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxhYmVsKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShMQUJFTF9DT0xPUiwgbGFiZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVNZXNzYWdlKGxldmVsOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbG9yaXplKE1FU1NBR0VfQ09MT1JfQllfTEVWRUxbbGV2ZWxdIHx8IERFRkFVTFRfQ09MT1IsIG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBjb2xvcml6ZShjb2xvcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBbJ1xceDFiWycsIGNvbG9yLCAnbScsIG1lc3NhZ2UsICdcXHgxYlswbSddLmpvaW4oJycpO1xufVxuIiwiZXhwb3J0IGNvbnN0IHBhZFN0YXJ0ID0gKGRhdGE6IG51bWJlciwgcGFkTnVtOiBudW1iZXIgPSAyKTogc3RyaW5nID0+IGRhdGEudG9TdHJpbmcoKS5wYWRTdGFydChwYWROdW0sICcwJyk7XG5cbmV4cG9ydCBjb25zdCBwYWRFbmQgPSAoZGF0YTogbnVtYmVyLCBwYWROdW06IG51bWJlciA9IDMpOiBzdHJpbmcgPT4gZGF0YS50b1N0cmluZygpLnBhZEVuZChwYWROdW0sICcwJyk7XG4iLCJpbXBvcnQgeyBMb2dMZXZlbFR5cGUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL01lc3NhZ2VCdWlsZGVyJztcblxuY29uc3QgTk9PUCA9ICgpID0+ICh7fSk7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUHJpbnRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtZXNzYWdlQnVpbGRlcjogTWVzc2FnZUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJpbnQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmludFByZXBhcmVkTWVzc2FnZSh0aGlzLm1lc3NhZ2VCdWlsZGVyLmJ1aWxkKGxldmVsLCBhcmdzKSArICdcXG4nKTtcbiAgICB9XG5cbiAgICAvLyBjaGF0OiBjaGVjayB0aGlzIGltcGxlbWVudGF0aW9uIGluIGh0dHBzOi8vc2RleG50LmF0bGFzc2lhbi5uZXQvYnJvd3NlL1dFQkJBQ0stNDg1XG4gICAgcHJpdmF0ZSBwcmludFByZXBhcmVkTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvbGliL2ludGVybmFsL2NvbnNvbGUvY29uc3RydWN0b3IuanMjTDIzMlxuXG4gICAgICAgIC8vIHRoZXJlIG1heSBiZSBhbiBlcnJvciBvY2N1cnJpbmcgc3luY2hyb25vdXNseSAoZS5nLiBmb3IgZmlsZXMgb3IgVFRZc1xuICAgICAgICAvLyBvbiBQT1NJWCBzeXN0ZW1zKSBvciBhc3luY2hyb25vdXNseSAoZS5nLiBwaXBlcyBvbiBQT1NJWCBzeXN0ZW1zKSwgc29cbiAgICAgICAgLy8gaGFuZGxlIGJvdGggc2l0dWF0aW9ucy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGFkZCBhbmQgbGF0ZXIgcmVtb3ZlIGEgbm9vcCBlcnJvciBoYW5kbGVyIHRvIGNhdGNoIHN5bmNocm9ub3VzIGVycm9ycy5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnN0ZG91dC5saXN0ZW5lckNvdW50KCdlcnJvcicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQub25jZSgnZXJyb3InLCBOT09QKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobWVzc2FnZSwgTk9PUCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gdGhlcmUncyBubyBwcm9wZXIgd2F5IHRvIHBhc3MgYWxvbmcgdGhlIGVycm9yIGhlcmVcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIE5PT1ApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9Mb2dnZXInO1xuXG5jb25zdCBERUZBVUxUX0xPR0dFUl9OQU1FID0gJ2Jvb3RzdHJhcCc7XG5cbmV4cG9ydCBjbGFzcyBCb290c3RyYXBMb2dnZXIgaW1wbGVtZW50cyBMb2dnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcy5sYWJlbCA/IHRoaXMubGFiZWwgOiBERUZBVUxUX0xPR0dFUl9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBhbnksIHRyYWNlPzogc3RyaW5nLCBjb250ZXh0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXJuKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvLyBvdXIgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvZ2dlciBkb2VzIG5vdCB5ZXQgbmVlZFxuICAgICAgICAvLyB0aGUgXCJ3YXJuaW5nXCIgbGV2ZWwsIHNvIHdlIHdpbGwgd3JpdGUgdGhlIGxvZ3NcbiAgICAgICAgLy8gY29taW5nIGZyb20gaGVyZSB0byBcImVycm9yXCIgbGV2ZWxcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgR3JwY09wdGlvbnMsIFRyYW5zcG9ydCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgZ3JwY0NoYXQgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQ0hBVF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMycsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuY2hhdCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2NoYXQvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY0F1dGggPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQVVUSF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMicsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuYXV0aCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2F1dGgvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY1VzZXIgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfVVNFUl9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMScsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkudXNlcicsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL3VzZXIvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9taWNyb3NlcnZpY2VzXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgQ2VydHNTZXJ2aWNlIH0gZnJvbSAnQGxpYi9qd3QvQ2VydHNTZXJ2aWNlJztcblxuaW1wb3J0IHsgQXBpTW9kdWxlIH0gZnJvbSAnLi9hcGkvQXBpTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBcGlNb2R1bGUsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtDZXJ0c1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Nb2R1bGVJbml0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50LCBDbGllbnRHcnBjIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRpbWVyLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyByZXRyeVdoZW4sIHRhcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEdldENlcnRTdHJlYW1SZXMgfSBmcm9tICdAZ3JwYy1wcm90by9hdXRoL2F1dGhfcGInO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAbGliL2xvZ2dlcic7XG5pbXBvcnQgeyBncnBjQXV0aCB9IGZyb20gJ0BsaWIvdXRpbHMvR3JwY0NvbmZpZ3MnO1xuXG5pbnRlcmZhY2UgSUF1dGhTZXJ2aWNlIHtcbiAgICBnZXRDZXJ0U3RyZWFtKCk6IE9ic2VydmFibGU8R2V0Q2VydFN0cmVhbVJlcy5Bc09iamVjdD47XG59XG5cbmNvbnN0IFJFVFJZID0gMTA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZXJ0c1NlcnZpY2UgaW1wbGVtZW50cyBPbk1vZHVsZUluaXQge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignQ2VydHNTZXJ2aWNlJyk7XG5cbiAgICBAQ2xpZW50KGdycGNBdXRoKSBwcml2YXRlIHJlYWRvbmx5IGdycGNBdXRoQ2xpZW50OiBDbGllbnRHcnBjO1xuICAgIHByaXZhdGUgZ3JwY0F1dGhTZXJ2aWNlOiBJQXV0aFNlcnZpY2U7XG5cbiAgICBwdWJsaWMgb25Nb2R1bGVJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdycGNBdXRoU2VydmljZSA9IHRoaXMuZ3JwY0F1dGhDbGllbnQuZ2V0U2VydmljZTxJQXV0aFNlcnZpY2U+KCdBdXRoU2VydmljZScpO1xuXG4gICAgICAgIHRoaXMuZ3JwY0F1dGhTZXJ2aWNlLmdldENlcnRTdHJlYW0oKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgcmV0cnlXaGVuKGVycm9ycyA9PlxuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoZXJyLm1lc3NhZ2UgKyAnLiBXaWxsIHRyeSBhZ2FpbiBhZnRlciB0aW1lb3V0IGluIDNzLicpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IChSRVRSWSA/IHRpbWVyKDMwMDApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKGBDYW4ndCByZWNvbm5lY3QgdG8gQ2VydFN0cmVhbScsIHRpbWVvdXQgZXhwaXJlZC5gKSkpLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfUFVCID0gcmVzLmtleTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBDaGF0TW9kdWxlIH0gZnJvbSAnLi9jaGF0L0NoYXRNb2R1bGUnO1xuaW1wb3J0IHsgTWVzc2FnZU1vZHVsZSB9IGZyb20gJy4vbWVzc2FnZS9NZXNzYWdlTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0NoYXRNb2R1bGUsIE1lc3NhZ2VNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBBcGlNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJ2aWNlc01vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL1NlcnZpY2VzTW9kdWxlJztcblxuaW1wb3J0IHsgQ2hhdENvbnRyb2xsZXIgfSBmcm9tICcuL0NoYXRDb250cm9sbGVyJztcbmltcG9ydCB7IENoYXRTZXJ2aWNlIH0gZnJvbSAnLi9DaGF0U2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTZXJ2aWNlc01vZHVsZV0sXG4gICAgY29udHJvbGxlcnM6IFtDaGF0Q29udHJvbGxlcl0sXG4gICAgcHJvdmlkZXJzOiBbQ2hhdFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGF0TW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGFsTW9kdWxlIH0gZnJvbSAnLi9kYWwvRGFsTW9kdWxlJztcbmltcG9ydCB7IENoYXRFdmVudFNlcnZpY2UgfSBmcm9tICcuL0NoYXRFdmVudFNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGFsTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtDaGF0RXZlbnRTZXJ2aWNlXSxcbiAgICBleHBvcnRzOiBbRGFsTW9kdWxlLCBDaGF0RXZlbnRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmljZXNNb2R1bGUge1xufVxuXG5leHBvcnQgKiBmcm9tICcuL2RhbC9EYWxNb2R1bGUnO1xuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYXRhRmluZGVyc01vZHVsZSB9IGZyb20gJy4vZGF0YS1maW5kZXJzL0RhdGFGaW5kZXJzTW9kdWxlJztcbmltcG9ydCB7IERhdGFVcGRhdGVyc01vZHVsZSB9IGZyb20gJy4vZGF0YS11cGRhdGVycy9EYXRhVXBkYXRlcnNNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YVByb2R1Y2VyTW9kdWxlIH0gZnJvbSAnLi9kYXRhLXByb2R1Y2Vycy9EYXRhUHJvZHVjZXJNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YVJlbW92ZXJzTW9kdWxlIH0gZnJvbSAnLi9kYXRhLXJlbW92ZXJzL0RhdGFSZW1vdmVyc01vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYXRhRmluZGVyc01vZHVsZSwgRGF0YVByb2R1Y2VyTW9kdWxlLCBEYXRhVXBkYXRlcnNNb2R1bGUsIERhdGFSZW1vdmVyc01vZHVsZV0sXG4gICAgZXhwb3J0czogW0RhdGFGaW5kZXJzTW9kdWxlLCBEYXRhUHJvZHVjZXJNb2R1bGUsIERhdGFVcGRhdGVyc01vZHVsZSwgRGF0YVJlbW92ZXJzTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgRGFsTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGJNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGIvRGJNb2R1bGUnO1xuXG5pbXBvcnQgeyBNZXNzYWdlRGF0YUZpbmRlciB9IGZyb20gJy4vTWVzc2FnZURhdGFGaW5kZXInO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGJNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VEYXRhRmluZGVyXSxcbiAgICBleHBvcnRzOiBbTWVzc2FnZURhdGFGaW5kZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhRmluZGVyc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUsIE9uTW9kdWxlSW5pdCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3BnJztcbmltcG9ydCAqIGFzIERCTWlncmF0ZSBmcm9tICdkYi1taWdyYXRlJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcbmltcG9ydCB7IGRiQ29uZmlnLCBtaWdyYXRlQ29uZmlnIH0gZnJvbSAnQGNoYXQvZW52JztcblxuQE1vZHVsZSh7XG4gICAgZXhwb3J0czogW0NsaWVudF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IENsaWVudCxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBDbGllbnQoZGJDb25maWcpLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERiTW9kdWxlIGltcGxlbWVudHMgT25Nb2R1bGVJbml0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ0RiTW9kdWxlJyk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkYm1pZ3JhdGUgPSBEQk1pZ3JhdGUuZ2V0SW5zdGFuY2UodHJ1ZSwgbWlncmF0ZUNvbmZpZyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQpIHtcbiAgICB9XG5cbiAgICBvbk1vZHVsZUluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRibWlncmF0ZSkge1xuICAgICAgICAgICAgZnJvbSh0aGlzLmRibWlncmF0ZS51cCgpKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTWlncmF0aW9ucyBhcHBsaWVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYi5jb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkYi1taWdyYXRlXCIpOyIsImltcG9ydCB7IENsaWVudENvbmZpZyB9IGZyb20gJ3BnJztcblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnY7XG5cbmV4cG9ydCBjb25zdCBkYkNvbmZpZzogQ2xpZW50Q29uZmlnID0ge1xuICAgIGhvc3Q6IGVudi5EQl9IT1NUIHx8ICdsb2NhbGhvc3QnLFxuICAgIHBvcnQ6ICtlbnYuREJfUE9SVCB8fCA1NDMyLFxuICAgIHVzZXI6IGVudi5EQl9VU0VSTkFNRSB8fCAncG9zdGdyZXMnLFxuICAgIHBhc3N3b3JkOiBlbnYuREJfUEFTU1dPUkQgfHwgJ3Bvc3RncmVzJyxcbiAgICBkYXRhYmFzZTogZW52LkRCX0RBVEFCQVNFX0NIQVQgfHwgJ2NoYXQnLFxuICAgIGtlZXBBbGl2ZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBtaWdyYXRlQ29uZmlnID0ge1xuICAgIGN3ZDogYC4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGJgLFxuICAgIGVudjogJ2NoYXQnLFxuICAgIHN0cmluZzogJy4vZGF0YWJhc2UuanNvbicsXG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3BnJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC50eXBlc19wYic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGF0YUZpbmRlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWVzc2FnZU9uZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxNZXNzYWdlLkFzT2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYHNlbGVjdCAqIGZyb20gYXBpX21lc3NhZ2Ugd2hlcmUgaWQgPSAkMWA7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5kYi5xdWVyeTxNZXNzYWdlLkFzT2JqZWN0PihxdWVyeSwgW2lkXSkpXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5yb3dzWzBdKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1lc3NhZ2VBbGwoKTogT2JzZXJ2YWJsZTxNZXNzYWdlLkFzT2JqZWN0W10+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgc2VsZWN0ICogZnJvbSBhcGlfbWVzc2FnZSBvcmRlciBieSBcInVwZGF0ZWRBdFwiIEFTQ2A7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5kYi5xdWVyeTxNZXNzYWdlLkFzT2JqZWN0PihxdWVyeSkpXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5yb3dzKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYk1vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZSc7XG5pbXBvcnQgeyBEYXRhRmluZGVyc01vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvRGF0YUZpbmRlcnNNb2R1bGUnO1xuXG5pbXBvcnQgeyBNZXNzYWdlRGF0YVVwZGF0ZXIgfSBmcm9tICcuL01lc3NhZ2VEYXRhVXBkYXRlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VEYXRhVXBkYXRlcl0sXG4gICAgZXhwb3J0czogW01lc3NhZ2VEYXRhVXBkYXRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFVcGRhdGVyc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1lc3NhZ2VEYXRhRmluZGVyIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9NZXNzYWdlRGF0YUZpbmRlcic7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzX3BiJztcbmltcG9ydCB7IEVkaXRNZXNzYWdlUmVxIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9tZXNzYWdlX3BiJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhVXBkYXRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50LFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VEYXRhRmluZGVyOiBNZXNzYWdlRGF0YUZpbmRlcixcbiAgICApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlTWVzc2FnZShkYXRhOiBFZGl0TWVzc2FnZVJlcS5Bc09iamVjdCk6IE9ic2VydmFibGU8TWVzc2FnZS5Bc09iamVjdD4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGB1cGRhdGUgYXBpX21lc3NhZ2Ugc2V0IG1lc3NhZ2UgPSAkMSB3aGVyZSBpZCA9ICQyYDtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLm1lc3NhZ2VEYXRhRmluZGVyLmdldE1lc3NhZ2VPbmUoZGF0YS5pZCkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLmRiLnF1ZXJ5PE1lc3NhZ2UuQXNPYmplY3Q+KHF1ZXJ5LCBbZGF0YS5tZXNzYWdlLCBkYXRhLmlkXSkpKSxcbiAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLnJvd3NbMF0pLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGJNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGIvRGJNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YUZpbmRlcnNNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL0RhdGFGaW5kZXJzTW9kdWxlJztcblxuaW1wb3J0IHsgTWVzc2FnZURhdGFQcm9kdWNlciB9IGZyb20gJy4vTWVzc2FnZURhdGFQcm9kdWNlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VEYXRhUHJvZHVjZXJdLFxuICAgIGV4cG9ydHM6IFtNZXNzYWdlRGF0YVByb2R1Y2VyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVByb2R1Y2VyTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L2NoYXQudHlwZXNfcGInO1xuXG5pbnRlcmZhY2UgSUluc2VydE1lc3NhZ2Uge1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBhdXRob3I6IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBhdmF0YXI6IHN0cmluZzsgfTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhUHJvZHVjZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKGRhdGE6IElJbnNlcnRNZXNzYWdlKTogT2JzZXJ2YWJsZTxNZXNzYWdlLkFzT2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IGF1dG9yID0gSlNPTi5zdHJpbmdpZnkoZGF0YS5hdXRob3IpO1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBpbnNlcnQgaW50byBhcGlfbWVzc2FnZSAoYXV0aG9yLCBtZXNzYWdlKSB2YWx1ZXMgKCQxLCAkMikgcmV0dXJuaW5nICpgO1xuXG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuZGIucXVlcnk8TWVzc2FnZS5Bc09iamVjdD4ocXVlcnksIFthdXRvciwgZGF0YS5tZXNzYWdlXSkpXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5yb3dzWzBdKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYk1vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZSc7XG5pbXBvcnQgeyBEYXRhRmluZGVyc01vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvRGF0YUZpbmRlcnNNb2R1bGUnO1xuXG5pbXBvcnQgeyBNZXNzYWdlRGF0YVJlbW92ZXIgfSBmcm9tICcuL01lc3NhZ2VEYXRhUmVtb3Zlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VEYXRhUmVtb3Zlcl0sXG4gICAgZXhwb3J0czogW01lc3NhZ2VEYXRhUmVtb3Zlcl0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFSZW1vdmVyc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC50eXBlc19wYic7XG5pbXBvcnQgeyBNZXNzYWdlRGF0YUZpbmRlciB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvTWVzc2FnZURhdGFGaW5kZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGFSZW1vdmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZURhdGFGaW5kZXI6IE1lc3NhZ2VEYXRhRmluZGVyLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVNZXNzYWdlKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgZGVsZXRlIGZyb20gYXBpX21lc3NhZ2Ugd2hlcmUgaWQgPSAkMWA7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZURhdGFGaW5kZXIuZ2V0TWVzc2FnZU9uZShpZCkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tKHRoaXMuZGIucXVlcnk8TWVzc2FnZS5Bc09iamVjdD4ocXVlcnksIFtpZF0pKSksXG4gICAgICAgICAgICBtYXBUbyhudWxsKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzX3BiJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoYXRFdmVudFNlcnZpY2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlcyQgPSBuZXcgU3ViamVjdDxNZXNzYWdlLkFzT2JqZWN0W10+KCk7XG5cbiAgICBwdWJsaWMgZW1pdChtZXNzYWdlOiBNZXNzYWdlLkFzT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlcyQubmV4dChbbWVzc2FnZV0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBicm9hZGNhc3QoKTogT2JzZXJ2YWJsZTxNZXNzYWdlLkFzT2JqZWN0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlcyQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciwgVXNlR3VhcmRzLCBVc2VGaWx0ZXJzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgR3JwY01ldGhvZCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEp3dEd1YXJkIH0gZnJvbSAnQGxpYi9qd3QvSnd0R3VhcmQnO1xuaW1wb3J0IHsgUnBjRXhjZXB0aW9uRmlsdGVyIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuaW1wb3J0IHsgTWVzc2FnZSwgU3R1YiB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC50eXBlc19wYic7XG5cbmltcG9ydCB7IENoYXRTZXJ2aWNlIH0gZnJvbSAnLi9DaGF0U2VydmljZSc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBDaGF0Q29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGNoYXRTZXJ2aWNlOiBDaGF0U2VydmljZSkge1xuICAgIH1cblxuICAgIEBVc2VHdWFyZHMoSnd0R3VhcmQpXG4gICAgQEdycGNNZXRob2QoJ0NoYXRTZXJ2aWNlJywgJ0dldENoYXQnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ0NoYXRTZXJ2aWNlOjpnZXRDaGF0JykpXG4gICAgcHVibGljIGdldENoYXQoZGF0YTogU3R1Yi5Bc09iamVjdCk6IE9ic2VydmFibGU8eyBtZXNzYWdlczogTWVzc2FnZS5Bc09iamVjdFtdIH0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhdFNlcnZpY2UuZ2V0Q2hhdFN0cmVhbSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBzdGF0dXMgfSBmcm9tICdncnBjJztcblxuaW1wb3J0IHsgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuY29uc3QgVE9LRU5fSEVBREVSX05BTUUgPSAnYXV0aG9yaXphdGlvbic7XG5jb25zdCBERUNPRElOR19PUFRJT05TID0ge1xuICAgIGFsZ29yaXRobXM6IFsnUlMyNTYnXSxcbn07XG5cbmV4cG9ydCBjbGFzcyBKd3RHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgICBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBjb250ZXh0LmdldEFyZ0J5SW5kZXgoMSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbWV0YS5nZXQoVE9LRU5fSEVBREVSX05BTUUpWzBdO1xuXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBtZXRhLnBheWxvYWQgPSB2ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9QVUIsIERFQ09ESU5HX09QVElPTlMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBScGNFeGNlcHRpb24oe2NvZGU6IHN0YXR1cy5VTkFVVEhFTlRJQ0FURUQsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncnBjXCIpOyIsImV4cG9ydCAqIGZyb20gJy4vaW1wbCc7XG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci9ScGNFeGNlcHRpb25GaWx0ZXInO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb2RlLnR5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vTm90Rm91bmRFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0ludGVybmFsRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVW5hdmFpbGFibGVFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24nO1xuIiwiZXhwb3J0IGludGVyZmFjZSBJRXJyb3Ige1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEVDb2RlcyB7XG4gICAgRVJST1JfQ09ERV9VTkRFRklORUQgPSAwLFxuICAgIC8vIGludmFsaWQgYXJndW1lbnQgY29kZXNcbiAgICBJTlZBTElEX0FSR1VNRU5UID0gMyxcbiAgICAvLyByZXF1aXJlZCBjb2Rlc1xuICAgIFVTRVJfSURfUkVRVUlSRUQgPSAzMDEsXG4gICAgLy8gbm90IGZvdW5kIGNvZGVzXG4gICAgTk9UX0ZPVU5EID0gNSxcbiAgICBVU0VSX05PVF9GT1VORCA9IDUwMSxcbiAgICAvLyBhbHJlYWR5IGV4aXN0IGNvZGVzXG4gICAgQUxSRUFEWV9FWElTVCA9IDYsXG4gICAgRU1BSUxfQUxSRUFEWV9FWElTVFMgPSA2MDEsXG4gICAgLy8gcGVybWlzc2lvbiBkZW5pZWQgY29kZXNcbiAgICBQRVJNSVNTSU9OX0RFTklFRCA9IDcsXG4gICAgLy8gaW50ZXJuYWwgZXJyb3IgY29kZXNcbiAgICBJTlRFUk5BTF9FUlJPUiA9IDEzLFxuICAgIC8vIHVuYXZhaWxhYmxlIGNvZGVzXG4gICAgVU5BVkFJTEFCTEUgPSAxNCxcbiAgICAvLyB1bmF1dGhlbnRpY2F0ZWQgY29kZXNcbiAgICBVTkFVVEhFTlRJQ0FURUQgPSAxNixcbiAgICBUT0tFTl9JTlZBTElEID0gMTYwMDEsXG4gICAgVE9LRU5fRVhQSVJFRCA9IDE2MDAyLFxuICAgIEFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCA9IDE2MDAzLFxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5WQUxJRF9BUkdVTUVOVDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5JTlZBTElEX0FSR1VNRU5ULFxuICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGFyZ3VtZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBVU0VSX0lEX1JFUVVJUkVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVTRVJfSURfUkVRVUlSRUQsXG4gICAgbWVzc2FnZTogJ1VzZXIgaWQgaXMgcmVxdWlyZWQnLFxufTtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBJTlZBTElEX0FSR1VNRU5ULCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW50ZXJmYWNlIElFcnJvckNvZGUge1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEVycm9yQ29kZVR5cGUgPSBJRXJyb3JDb2RlIHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YVR5cGUge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VFeGNlcHRpb24gZXh0ZW5kcyBScGNFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogSUVycm9yQ29kZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUuY29kZSxcblxuICAgICAgICAgICAgLy8gc28gZmFyIGl0IGhhcyBub3QgYmVlbiBwb3NzaWJsZSB0byBmaW5kIG5vcm1hbCB3YXlzIGluIE5lc3RcbiAgICAgICAgICAgIC8vIHRvIHRyYW5zbWl0IHRoZSBtZXRhZGF0YSBpbiByZXNwb25zZSB3aXRoIGFuIGVycm9yLFxuICAgICAgICAgICAgLy8gc28gd2Ugd2lsbCBzZXcgdGhpcyBkYXRhIGludG8gdGhlIG1lc3NhZ2UgYm9keVxuICAgICAgICAgICAgbWVzc2FnZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yQ29kZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IE5PVF9GT1VORDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ05vdCBmb3VuZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVVNFUl9OT1RfRk9VTkQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVVNFUl9OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ1VzZXIgbm90IGZvdW5kJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBOT1RfRk9VTkQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBBTFJFQURZX0VYSVNUOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFMUkVBRFlfRVhJU1QsXG4gICAgbWVzc2FnZTogJ1Jlc291cmNlIGFscmVhZHkgZXhpc3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFTUFJTF9BTFJFQURZX0VYSVNUUzogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5FTUFJTF9BTFJFQURZX0VYSVNUUyxcbiAgICBtZXNzYWdlOiAnRW1haWwgYWxyZWFkeSBleGlzdHMnLFxufTtcblxuZXhwb3J0IGNsYXNzIEFscmVhZHlFeGlzdHNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgQUxSRUFEWV9FWElTVCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IFBFUk1JU1NJT05fREVOSUVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlBFUk1JU1NJT05fREVOSUVELFxuICAgIG1lc3NhZ2U6ICdQZXJtaXNzaW9uIGRlbmllZCcsXG59O1xuXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBQRVJNSVNTSU9OX0RFTklFRCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0VSUk9SOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLklOVEVSTkFMX0VSUk9SLFxuICAgIG1lc3NhZ2U6ICdJbnRlcm5hbCBlcnJvcicsXG59O1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgSU5URVJOQUxfRVJST1IsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRTogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5VTkFWQUlMQUJMRSxcbiAgICBtZXNzYWdlOiAnUmVzb3VyY2UgdW5hdmFpbGFibGUnLFxufTtcblxuZXhwb3J0IGNsYXNzIFVuYXZhaWxhYmxlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IFVOQVZBSUxBQkxFLCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgVU5BVVRIRU5USUNBVEVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVOQVVUSEVOVElDQVRFRCxcbiAgICBtZXNzYWdlOiAnVW5hdXRoZW50aWNhdGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUT0tFTl9JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlRPS0VOX0lOVkFMSUQsXG4gICAgbWVzc2FnZTogJ1Rva2VuIGludmFsaWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0VYUElSRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVE9LRU5fRVhQSVJFRCxcbiAgICBtZXNzYWdlOiAnVG9rZW4gZXhwaXJlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgQVVUSF9DUkVERU5USUFMU19JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCxcbiAgICBtZXNzYWdlOiAnQXV0aCBjcmVkZW50aWFscyBpbnZhbGlkJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgVU5BVVRIRU5USUNBVEVELCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2F0Y2gsIEFyZ3VtZW50c0hvc3QgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlUnBjRXhjZXB0aW9uRmlsdGVyIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSwgRVhDRVBUSU9OX0xJU1QgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvRXhjZXB0aW9uSGFuZGxlckZhY3RvcnknO1xuXG5AQ2F0Y2goLi4uRVhDRVBUSU9OX0xJU1QpXG5leHBvcnQgY2xhc3MgUnBjRXhjZXB0aW9uRmlsdGVyIGV4dGVuZHMgQmFzZVJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBleGNlcHRpb25IYW5kbGVyRmFjdG9yeTogSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5O1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3IobGFiZWw6IHN0cmluZyk6IFJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgICAgIHJldHVybiBuZXcgUnBjRXhjZXB0aW9uRmlsdGVyKGxhYmVsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBmb3IgdGhlIGFkbWluIHBhbmVsLCB5b3UgZG9u4oCZdCBuZWVkIHRvIG1vbml0b3IgZXJyb3JzXG4gICAgICAgIC8vIHN1Y2ggYXMgZnJvbSBDb3VjaERiLCBzbyB3ZSBwYXNzIHNlcGFyYXRlIEFkbWluRXhjZXB0aW9uSGFuZGxlckZhY3RvcnkgdG8gaXQsXG4gICAgICAgIC8vIGFuZCBmb3Igd2ViLWJhY2tlbmQgLSBXZWJCYWNrRXhjZXB0aW9uSGFuZGxlckZhY3RvcnlcbiAgICAgICAgdGhpcy5leGNlcHRpb25IYW5kbGVyRmFjdG9yeSA9IG5ldyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSh0aGlzLmxhYmVsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2F0Y2goZXhjZXB0aW9uOiBFeGNlcHRpb25UeXBlLCBob3N0OiBBcmd1bWVudHNIb3N0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXhjZXB0aW9uSGFuZGxlckZhY3RvcnkuZ2V0SGFuZGxlcihleGNlcHRpb24pO1xuXG4gICAgICAgIGhhbmRsZXIud2FybkFib3V0RXJyb3IoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuY2F0Y2goaGFuZGxlci53cmFwRXJyb3IoKSwgaG9zdCBhcyBhbnkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhjZXB0aW9uVHlwZSA9IEVycm9yIHwgUnBjRXhjZXB0aW9uIHwgQmFzZUV4Y2VwdGlvbjtcblxuZXhwb3J0IGNvbnN0IEVYQ0VQVElPTl9MSVNUID0gW0Vycm9yLCBScGNFeGNlcHRpb24sIEJhc2VFeGNlcHRpb25dO1xuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIsIElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvUnBjRXhjZXB0aW9uSGFuZGxlcic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGFuZGxlcihleGNlcHRpb246IEV4Y2VwdGlvblR5cGUpOiBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgICAgIC8vIGhhbmRsZSByZWd1bGFyIGV4Y2VwdGlvbnMgZnJvbSBjdXJyZW50IG1pY3Jvc2VydmljZXNcbiAgICAgICAgaWYgKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIFJwY0V4Y2VwdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBScGNFeGNlcHRpb25IYW5kbGVyKGV4Y2VwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgYWxsIG90aGVyIGludGVybmFsIGV4Y2VwdGlvbnNcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIoZXhjZXB0aW9uLCB0aGlzLmxhYmVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIFJwY0V4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdScGNFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogQmFzZUV4Y2VwdGlvbikge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIC8vIG5vdCBuZWVkIHRvIGhhbmRsZSB0aGlzIGVycm9yLFxuICAgICAgICAvLyBiZWNhdXNlIGl0IHJlZ3VsYXIgZXhjZXB0aW9uIGZyb20gYmFja2VuZCBzZXJ2aWNlc1xuICAgICAgICByZXR1cm4gdGhpcy5leGNlcHRpb247XG4gICAgfVxuXG4gICAgcHVibGljIHdhcm5BYm91dEVycm9yKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7bWVzc2FnZX06IGFueSA9IHRoaXMuZXhjZXB0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgSW50ZXJuYWwgZXhjZXB0aW9uOiAke21lc3NhZ2V9YCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvQmFzZUV4Y2VwdGlvbic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvSW50ZXJuYWxFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyIGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogRXJyb3IsIHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgSW50ZXJuYWxFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybkFib3V0RXJyb3IoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtzdGFjaywgbWVzc2FnZX0gPSB0aGlzLmV4Y2VwdGlvbjtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYCR7dGhpcy5sYWJlbH0gOjogSW50ZXJuYWwgZXJyb3IgXCIke21lc3NhZ2V9XCIsXFxuU3RhY2s6ICR7c3RhY2t9YCk7XG4gICAgfVxufVxuIiwiLy8gc291cmNlOiBjaGF0LnR5cGVzLnByb3RvXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBlbmhhbmNlYWJsZVxuICogQHN1cHByZXNzIHttZXNzYWdlQ29udmVudGlvbnN9IEpTIENvbXBpbGVyIHJlcG9ydHMgYW4gZXJyb3IgaWYgYSB2YXJpYWJsZSBvclxuICogICAgIGZpZWxkIHN0YXJ0cyB3aXRoICdNU0dfJyBhbmQgaXNuJ3QgYSB0cmFuc2xhdGFibGUgbWVzc2FnZS5cbiAqIEBwdWJsaWNcbiAqL1xuLy8gR0VORVJBVEVEIENPREUgLS0gRE8gTk9UIEVESVQhXG5cbnZhciBqc3BiID0gcmVxdWlyZSgnZ29vZ2xlLXByb3RvYnVmJyk7XG52YXIgZ29vZyA9IGpzcGI7XG52YXIgZ2xvYmFsID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZ29vZy5leHBvcnRTeW1ib2woJ3Byb3RvLmFwaS5jaGF0LkF1dG9yJywgbnVsbCwgZ2xvYmFsKTtcbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkuY2hhdC5DaGF0UmVzJywgbnVsbCwgZ2xvYmFsKTtcbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkuY2hhdC5FU3RhdHVzJywgbnVsbCwgZ2xvYmFsKTtcbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkuY2hhdC5NZXNzYWdlJywgbnVsbCwgZ2xvYmFsKTtcbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkuY2hhdC5TdHViJywgbnVsbCwgZ2xvYmFsKTtcbi8qKlxuICogR2VuZXJhdGVkIGJ5IEpzUGJDb2RlR2VuZXJhdG9yLlxuICogQHBhcmFtIHtBcnJheT19IG9wdF9kYXRhIE9wdGlvbmFsIGluaXRpYWwgZGF0YSBhcnJheSwgdHlwaWNhbGx5IGZyb20gYVxuICogc2VydmVyIHJlc3BvbnNlLCBvciBjb25zdHJ1Y3RlZCBkaXJlY3RseSBpbiBKYXZhc2NyaXB0LiBUaGUgYXJyYXkgaXMgdXNlZFxuICogaW4gcGxhY2UgYW5kIGJlY29tZXMgcGFydCBvZiB0aGUgY29uc3RydWN0ZWQgb2JqZWN0LiBJdCBpcyBub3QgY2xvbmVkLlxuICogSWYgbm8gZGF0YSBpcyBwcm92aWRlZCwgdGhlIGNvbnN0cnVjdGVkIG9iamVjdCB3aWxsIGJlIGVtcHR5LCBidXQgc3RpbGxcbiAqIHZhbGlkLlxuICogQGV4dGVuZHMge2pzcGIuTWVzc2FnZX1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5wcm90by5hcGkuY2hhdC5DaGF0UmVzID0gZnVuY3Rpb24ob3B0X2RhdGEpIHtcbiAganNwYi5NZXNzYWdlLmluaXRpYWxpemUodGhpcywgb3B0X2RhdGEsIDAsIC0xLCBudWxsLCBudWxsKTtcbn07XG5nb29nLmluaGVyaXRzKHByb3RvLmFwaS5jaGF0LkNoYXRSZXMsIGpzcGIuTWVzc2FnZSk7XG5pZiAoZ29vZy5ERUJVRyAmJiAhQ09NUElMRUQpIHtcbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBwcm90by5hcGkuY2hhdC5DaGF0UmVzLmRpc3BsYXlOYW1lID0gJ3Byb3RvLmFwaS5jaGF0LkNoYXRSZXMnO1xufVxuLyoqXG4gKiBHZW5lcmF0ZWQgYnkgSnNQYkNvZGVHZW5lcmF0b3IuXG4gKiBAcGFyYW0ge0FycmF5PX0gb3B0X2RhdGEgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIGFycmF5LCB0eXBpY2FsbHkgZnJvbSBhXG4gKiBzZXJ2ZXIgcmVzcG9uc2UsIG9yIGNvbnN0cnVjdGVkIGRpcmVjdGx5IGluIEphdmFzY3JpcHQuIFRoZSBhcnJheSBpcyB1c2VkXG4gKiBpbiBwbGFjZSBhbmQgYmVjb21lcyBwYXJ0IG9mIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3QuIEl0IGlzIG5vdCBjbG9uZWQuXG4gKiBJZiBubyBkYXRhIGlzIHByb3ZpZGVkLCB0aGUgY29uc3RydWN0ZWQgb2JqZWN0IHdpbGwgYmUgZW1wdHksIGJ1dCBzdGlsbFxuICogdmFsaWQuXG4gKiBAZXh0ZW5kcyB7anNwYi5NZXNzYWdlfVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnByb3RvLmFwaS5jaGF0LlN0dWIgPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIG51bGwsIG51bGwpO1xufTtcbmdvb2cuaW5oZXJpdHMocHJvdG8uYXBpLmNoYXQuU3R1YiwganNwYi5NZXNzYWdlKTtcbmlmIChnb29nLkRFQlVHICYmICFDT01QSUxFRCkge1xuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHByb3RvLmFwaS5jaGF0LlN0dWIuZGlzcGxheU5hbWUgPSAncHJvdG8uYXBpLmNoYXQuU3R1Yic7XG59XG4vKipcbiAqIEdlbmVyYXRlZCBieSBKc1BiQ29kZUdlbmVyYXRvci5cbiAqIEBwYXJhbSB7QXJyYXk9fSBvcHRfZGF0YSBPcHRpb25hbCBpbml0aWFsIGRhdGEgYXJyYXksIHR5cGljYWxseSBmcm9tIGFcbiAqIHNlcnZlciByZXNwb25zZSwgb3IgY29uc3RydWN0ZWQgZGlyZWN0bHkgaW4gSmF2YXNjcmlwdC4gVGhlIGFycmF5IGlzIHVzZWRcbiAqIGluIHBsYWNlIGFuZCBiZWNvbWVzIHBhcnQgb2YgdGhlIGNvbnN0cnVjdGVkIG9iamVjdC4gSXQgaXMgbm90IGNsb25lZC5cbiAqIElmIG5vIGRhdGEgaXMgcHJvdmlkZWQsIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3Qgd2lsbCBiZSBlbXB0eSwgYnV0IHN0aWxsXG4gKiB2YWxpZC5cbiAqIEBleHRlbmRzIHtqc3BiLk1lc3NhZ2V9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xucHJvdG8uYXBpLmNoYXQuQXV0b3IgPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIG51bGwsIG51bGwpO1xufTtcbmdvb2cuaW5oZXJpdHMocHJvdG8uYXBpLmNoYXQuQXV0b3IsIGpzcGIuTWVzc2FnZSk7XG5pZiAoZ29vZy5ERUJVRyAmJiAhQ09NUElMRUQpIHtcbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBwcm90by5hcGkuY2hhdC5BdXRvci5kaXNwbGF5TmFtZSA9ICdwcm90by5hcGkuY2hhdC5BdXRvcic7XG59XG4vKipcbiAqIEdlbmVyYXRlZCBieSBKc1BiQ29kZUdlbmVyYXRvci5cbiAqIEBwYXJhbSB7QXJyYXk9fSBvcHRfZGF0YSBPcHRpb25hbCBpbml0aWFsIGRhdGEgYXJyYXksIHR5cGljYWxseSBmcm9tIGFcbiAqIHNlcnZlciByZXNwb25zZSwgb3IgY29uc3RydWN0ZWQgZGlyZWN0bHkgaW4gSmF2YXNjcmlwdC4gVGhlIGFycmF5IGlzIHVzZWRcbiAqIGluIHBsYWNlIGFuZCBiZWNvbWVzIHBhcnQgb2YgdGhlIGNvbnN0cnVjdGVkIG9iamVjdC4gSXQgaXMgbm90IGNsb25lZC5cbiAqIElmIG5vIGRhdGEgaXMgcHJvdmlkZWQsIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3Qgd2lsbCBiZSBlbXB0eSwgYnV0IHN0aWxsXG4gKiB2YWxpZC5cbiAqIEBleHRlbmRzIHtqc3BiLk1lc3NhZ2V9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xucHJvdG8uYXBpLmNoYXQuTWVzc2FnZSA9IGZ1bmN0aW9uKG9wdF9kYXRhKSB7XG4gIGpzcGIuTWVzc2FnZS5pbml0aWFsaXplKHRoaXMsIG9wdF9kYXRhLCAwLCAtMSwgbnVsbCwgbnVsbCk7XG59O1xuZ29vZy5pbmhlcml0cyhwcm90by5hcGkuY2hhdC5NZXNzYWdlLCBqc3BiLk1lc3NhZ2UpO1xuaWYgKGdvb2cuREVCVUcgJiYgIUNPTVBJTEVEKSB7XG4gIC8qKlxuICAgKiBAcHVibGljXG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgcHJvdG8uYXBpLmNoYXQuTWVzc2FnZS5kaXNwbGF5TmFtZSA9ICdwcm90by5hcGkuY2hhdC5NZXNzYWdlJztcbn1cblxuXG5cbmlmIChqc3BiLk1lc3NhZ2UuR0VORVJBVEVfVE9fT0JKRUNUKSB7XG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgcHJvdG8uXG4gKiBGaWVsZCBuYW1lcyB0aGF0IGFyZSByZXNlcnZlZCBpbiBKYXZhU2NyaXB0IGFuZCB3aWxsIGJlIHJlbmFtZWQgdG8gcGJfbmFtZS5cbiAqIE9wdGlvbmFsIGZpZWxkcyB0aGF0IGFyZSBub3Qgc2V0IHdpbGwgYmUgc2V0IHRvIHVuZGVmaW5lZC5cbiAqIFRvIGFjY2VzcyBhIHJlc2VydmVkIGZpZWxkIHVzZSwgZm9vLnBiXzxuYW1lPiwgZWcsIGZvby5wYl9kZWZhdWx0LlxuICogRm9yIHRoZSBsaXN0IG9mIHJlc2VydmVkIG5hbWVzIHBsZWFzZSBzZWU6XG4gKiAgICAgbmV0L3Byb3RvMi9jb21waWxlci9qcy9pbnRlcm5hbC9nZW5lcmF0b3IuY2Mja0tleXdvcmQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfaW5jbHVkZUluc3RhbmNlIERlcHJlY2F0ZWQuIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGVcbiAqICAgICBKU1BCIGluc3RhbmNlIGZvciB0cmFuc2l0aW9uYWwgc295IHByb3RvIHN1cHBvcnQ6XG4gKiAgICAgaHR0cDovL2dvdG8vc295LXBhcmFtLW1pZ3JhdGlvblxuICogQHJldHVybiB7IU9iamVjdH1cbiAqL1xucHJvdG8uYXBpLmNoYXQuQ2hhdFJlcy5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbihvcHRfaW5jbHVkZUluc3RhbmNlKSB7XG4gIHJldHVybiBwcm90by5hcGkuY2hhdC5DaGF0UmVzLnRvT2JqZWN0KG9wdF9pbmNsdWRlSW5zdGFuY2UsIHRoaXMpO1xufTtcblxuXG4vKipcbiAqIFN0YXRpYyB2ZXJzaW9uIG9mIHRoZSB7QHNlZSB0b09iamVjdH0gbWV0aG9kLlxuICogQHBhcmFtIHtib29sZWFufHVuZGVmaW5lZH0gaW5jbHVkZUluc3RhbmNlIERlcHJlY2F0ZWQuIFdoZXRoZXIgdG8gaW5jbHVkZVxuICogICAgIHRoZSBKU1BCIGluc3RhbmNlIGZvciB0cmFuc2l0aW9uYWwgc295IHByb3RvIHN1cHBvcnQ6XG4gKiAgICAgaHR0cDovL2dvdG8vc295LXBhcmFtLW1pZ3JhdGlvblxuICogQHBhcmFtIHshcHJvdG8uYXBpLmNoYXQuQ2hhdFJlc30gbXNnIFRoZSBtc2cgaW5zdGFuY2UgdG8gdHJhbnNmb3JtLlxuICogQHJldHVybiB7IU9iamVjdH1cbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uYXBpLmNoYXQuQ2hhdFJlcy50b09iamVjdCA9IGZ1bmN0aW9uKGluY2x1ZGVJbnN0YW5jZSwgbXNnKSB7XG4gIHZhciBmLCBvYmogPSB7XG4gICAgc3RhdHVzOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDEsIDApLFxuICAgIG1lc3NhZ2U6IGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KG1zZywgMiwgXCJcIilcbiAgfTtcblxuICBpZiAoaW5jbHVkZUluc3RhbmNlKSB7XG4gICAgb2JqLiRqc3BiTWVzc2FnZUluc3RhbmNlID0gbXNnO1xuICB9XG4gIHJldHVybiBvYmo7XG59O1xufVxuXG5cbi8qKlxuICogRGVzZXJpYWxpemVzIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcGFyYW0ge2pzcGIuQnl0ZVNvdXJjZX0gYnl0ZXMgVGhlIGJ5dGVzIHRvIGRlc2VyaWFsaXplLlxuICogQHJldHVybiB7IXByb3RvLmFwaS5jaGF0LkNoYXRSZXN9XG4gKi9cbnByb3RvLmFwaS5jaGF0LkNoYXRSZXMuZGVzZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbihieXRlcykge1xuICB2YXIgcmVhZGVyID0gbmV3IGpzcGIuQmluYXJ5UmVhZGVyKGJ5dGVzKTtcbiAgdmFyIG1zZyA9IG5ldyBwcm90by5hcGkuY2hhdC5DaGF0UmVzO1xuICByZXR1cm4gcHJvdG8uYXBpLmNoYXQuQ2hhdFJlcy5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIobXNnLCByZWFkZXIpO1xufTtcblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpIGZyb20gdGhlXG4gKiBnaXZlbiByZWFkZXIgaW50byB0aGUgZ2l2ZW4gbWVzc2FnZSBvYmplY3QuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuY2hhdC5DaGF0UmVzfSBtc2cgVGhlIG1lc3NhZ2Ugb2JqZWN0IHRvIGRlc2VyaWFsaXplIGludG8uXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVJlYWRlcn0gcmVhZGVyIFRoZSBCaW5hcnlSZWFkZXIgdG8gdXNlLlxuICogQHJldHVybiB7IXByb3RvLmFwaS5jaGF0LkNoYXRSZXN9XG4gKi9cbnByb3RvLmFwaS5jaGF0LkNoYXRSZXMuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyID0gZnVuY3Rpb24obXNnLCByZWFkZXIpIHtcbiAgd2hpbGUgKHJlYWRlci5uZXh0RmllbGQoKSkge1xuICAgIGlmIChyZWFkZXIuaXNFbmRHcm91cCgpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdmFyIGZpZWxkID0gcmVhZGVyLmdldEZpZWxkTnVtYmVyKCk7XG4gICAgc3dpdGNoIChmaWVsZCkge1xuICAgIGNhc2UgMTpcbiAgICAgIHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7IXByb3RvLmFwaS5jaGF0LkVTdGF0dXN9ICovIChyZWFkZXIucmVhZEVudW0oKSk7XG4gICAgICBtc2cuc2V0U3RhdHVzKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocmVhZGVyLnJlYWRTdHJpbmcoKSk7XG4gICAgICBtc2cuc2V0TWVzc2FnZSh2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmVhZGVyLnNraXBGaWVsZCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtc2c7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHJldHVybiB7IVVpbnQ4QXJyYXl9XG4gKi9cbnByb3RvLmFwaS5jaGF0LkNoYXRSZXMucHJvdG90eXBlLnNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd3JpdGVyID0gbmV3IGpzcGIuQmluYXJ5V3JpdGVyKCk7XG4gIHByb3RvLmFwaS5jaGF0LkNoYXRSZXMuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuY2hhdC5DaGF0UmVzfSBtZXNzYWdlXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVdyaXRlcn0gd3JpdGVyXG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5jaGF0LkNoYXRSZXMuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIgPSBmdW5jdGlvbihtZXNzYWdlLCB3cml0ZXIpIHtcbiAgdmFyIGYgPSB1bmRlZmluZWQ7XG4gIGYgPSBtZXNzYWdlLmdldFN0YXR1cygpO1xuICBpZiAoZiAhPT0gMC4wKSB7XG4gICAgd3JpdGVyLndyaXRlRW51bShcbiAgICAgIDEsXG4gICAgICBmXG4gICAgKTtcbiAgfVxuICBmID0gbWVzc2FnZS5nZXRNZXNzYWdlKCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAyLFxuICAgICAgZlxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBvcHRpb25hbCBFU3RhdHVzIHN0YXR1cyA9IDE7XG4gKiBAcmV0dXJuIHshcHJvdG8uYXBpLmNoYXQuRVN0YXR1c31cbiAqL1xucHJvdG8uYXBpLmNoYXQuQ2hhdFJlcy5wcm90b3R5cGUuZ2V0U3RhdHVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUgeyFwcm90by5hcGkuY2hhdC5FU3RhdHVzfSAqLyAoanNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQodGhpcywgMSwgMCkpO1xufTtcblxuXG4vKiogQHBhcmFtIHshcHJvdG8uYXBpLmNoYXQuRVN0YXR1c30gdmFsdWUgKi9cbnByb3RvLmFwaS5jaGF0LkNoYXRSZXMucHJvdG90eXBlLnNldFN0YXR1cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGpzcGIuTWVzc2FnZS5zZXRQcm90bzNFbnVtRmllbGQodGhpcywgMSwgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBtZXNzYWdlID0gMjtcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xucHJvdG8uYXBpLmNoYXQuQ2hhdFJlcy5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdCh0aGlzLCAyLCBcIlwiKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgKi9cbnByb3RvLmFwaS5jaGF0LkNoYXRSZXMucHJvdG90eXBlLnNldE1lc3NhZ2UgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgMiwgdmFsdWUpO1xufTtcblxuXG5cblxuXG5pZiAoanNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX09CSkVDVCkge1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHByb3RvLlxuICogRmllbGQgbmFtZXMgdGhhdCBhcmUgcmVzZXJ2ZWQgaW4gSmF2YVNjcmlwdCBhbmQgd2lsbCBiZSByZW5hbWVkIHRvIHBiX25hbWUuXG4gKiBPcHRpb25hbCBmaWVsZHMgdGhhdCBhcmUgbm90IHNldCB3aWxsIGJlIHNldCB0byB1bmRlZmluZWQuXG4gKiBUbyBhY2Nlc3MgYSByZXNlcnZlZCBmaWVsZCB1c2UsIGZvby5wYl88bmFtZT4sIGVnLCBmb28ucGJfZGVmYXVsdC5cbiAqIEZvciB0aGUgbGlzdCBvZiByZXNlcnZlZCBuYW1lcyBwbGVhc2Ugc2VlOlxuICogICAgIG5ldC9wcm90bzIvY29tcGlsZXIvanMvaW50ZXJuYWwvZ2VuZXJhdG9yLmNjI2tLZXl3b3JkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X2luY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlXG4gKiAgICAgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnByb3RvLmFwaS5jaGF0LlN0dWIucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24ob3B0X2luY2x1ZGVJbnN0YW5jZSkge1xuICByZXR1cm4gcHJvdG8uYXBpLmNoYXQuU3R1Yi50b09iamVjdChvcHRfaW5jbHVkZUluc3RhbmNlLCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiB0aGUge0BzZWUgdG9PYmplY3R9IG1ldGhvZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGluY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiBXaGV0aGVyIHRvIGluY2x1ZGVcbiAqICAgICB0aGUgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS5jaGF0LlN0dWJ9IG1zZyBUaGUgbXNnIGluc3RhbmNlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5jaGF0LlN0dWIudG9PYmplY3QgPSBmdW5jdGlvbihpbmNsdWRlSW5zdGFuY2UsIG1zZykge1xuICB2YXIgZiwgb2JqID0ge1xuXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuY2hhdC5TdHVifVxuICovXG5wcm90by5hcGkuY2hhdC5TdHViLmRlc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBqc3BiLkJpbmFyeVJlYWRlcihieXRlcyk7XG4gIHZhciBtc2cgPSBuZXcgcHJvdG8uYXBpLmNoYXQuU3R1YjtcbiAgcmV0dXJuIHByb3RvLmFwaS5jaGF0LlN0dWIuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uYXBpLmNoYXQuU3R1Yn0gbXNnIFRoZSBtZXNzYWdlIG9iamVjdCB0byBkZXNlcmlhbGl6ZSBpbnRvLlxuICogQHBhcmFtIHshanNwYi5CaW5hcnlSZWFkZXJ9IHJlYWRlciBUaGUgQmluYXJ5UmVhZGVyIHRvIHVzZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuY2hhdC5TdHVifVxuICovXG5wcm90by5hcGkuY2hhdC5TdHViLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmVhZGVyLnNraXBGaWVsZCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtc2c7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHJldHVybiB7IVVpbnQ4QXJyYXl9XG4gKi9cbnByb3RvLmFwaS5jaGF0LlN0dWIucHJvdG90eXBlLnNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd3JpdGVyID0gbmV3IGpzcGIuQmluYXJ5V3JpdGVyKCk7XG4gIHByb3RvLmFwaS5jaGF0LlN0dWIuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuY2hhdC5TdHVifSBtZXNzYWdlXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVdyaXRlcn0gd3JpdGVyXG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS5jaGF0LlN0dWIuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIgPSBmdW5jdGlvbihtZXNzYWdlLCB3cml0ZXIpIHtcbiAgdmFyIGYgPSB1bmRlZmluZWQ7XG59O1xuXG5cblxuXG5cbmlmIChqc3BiLk1lc3NhZ2UuR0VORVJBVEVfVE9fT0JKRUNUKSB7XG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgcHJvdG8uXG4gKiBGaWVsZCBuYW1lcyB0aGF0IGFyZSByZXNlcnZlZCBpbiBKYXZhU2NyaXB0IGFuZCB3aWxsIGJlIHJlbmFtZWQgdG8gcGJfbmFtZS5cbiAqIE9wdGlvbmFsIGZpZWxkcyB0aGF0IGFyZSBub3Qgc2V0IHdpbGwgYmUgc2V0IHRvIHVuZGVmaW5lZC5cbiAqIFRvIGFjY2VzcyBhIHJlc2VydmVkIGZpZWxkIHVzZSwgZm9vLnBiXzxuYW1lPiwgZWcsIGZvby5wYl9kZWZhdWx0LlxuICogRm9yIHRoZSBsaXN0IG9mIHJlc2VydmVkIG5hbWVzIHBsZWFzZSBzZWU6XG4gKiAgICAgbmV0L3Byb3RvMi9jb21waWxlci9qcy9pbnRlcm5hbC9nZW5lcmF0b3IuY2Mja0tleXdvcmQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfaW5jbHVkZUluc3RhbmNlIERlcHJlY2F0ZWQuIHdoZXRoZXIgdG8gaW5jbHVkZSB0aGVcbiAqICAgICBKU1BCIGluc3RhbmNlIGZvciB0cmFuc2l0aW9uYWwgc295IHByb3RvIHN1cHBvcnQ6XG4gKiAgICAgaHR0cDovL2dvdG8vc295LXBhcmFtLW1pZ3JhdGlvblxuICogQHJldHVybiB7IU9iamVjdH1cbiAqL1xucHJvdG8uYXBpLmNoYXQuQXV0b3IucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24ob3B0X2luY2x1ZGVJbnN0YW5jZSkge1xuICByZXR1cm4gcHJvdG8uYXBpLmNoYXQuQXV0b3IudG9PYmplY3Qob3B0X2luY2x1ZGVJbnN0YW5jZSwgdGhpcyk7XG59O1xuXG5cbi8qKlxuICogU3RhdGljIHZlcnNpb24gb2YgdGhlIHtAc2VlIHRvT2JqZWN0fSBtZXRob2QuXG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSBpbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gV2hldGhlciB0byBpbmNsdWRlXG4gKiAgICAgdGhlIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcGFyYW0geyFwcm90by5hcGkuY2hhdC5BdXRvcn0gbXNnIFRoZSBtc2cgaW5zdGFuY2UgdG8gdHJhbnNmb3JtLlxuICogQHJldHVybiB7IU9iamVjdH1cbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uYXBpLmNoYXQuQXV0b3IudG9PYmplY3QgPSBmdW5jdGlvbihpbmNsdWRlSW5zdGFuY2UsIG1zZykge1xuICB2YXIgZiwgb2JqID0ge1xuICAgIGlkOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDEsIFwiXCIpLFxuICAgIG5hbWU6IGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KG1zZywgMiwgXCJcIiksXG4gICAgYXZhdGFyOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDMsIFwiXCIpXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuY2hhdC5BdXRvcn1cbiAqL1xucHJvdG8uYXBpLmNoYXQuQXV0b3IuZGVzZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbihieXRlcykge1xuICB2YXIgcmVhZGVyID0gbmV3IGpzcGIuQmluYXJ5UmVhZGVyKGJ5dGVzKTtcbiAgdmFyIG1zZyA9IG5ldyBwcm90by5hcGkuY2hhdC5BdXRvcjtcbiAgcmV0dXJuIHByb3RvLmFwaS5jaGF0LkF1dG9yLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlcihtc2csIHJlYWRlcik7XG59O1xuXG5cbi8qKlxuICogRGVzZXJpYWxpemVzIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkgZnJvbSB0aGVcbiAqIGdpdmVuIHJlYWRlciBpbnRvIHRoZSBnaXZlbiBtZXNzYWdlIG9iamVjdC5cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS5jaGF0LkF1dG9yfSBtc2cgVGhlIG1lc3NhZ2Ugb2JqZWN0IHRvIGRlc2VyaWFsaXplIGludG8uXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVJlYWRlcn0gcmVhZGVyIFRoZSBCaW5hcnlSZWFkZXIgdG8gdXNlLlxuICogQHJldHVybiB7IXByb3RvLmFwaS5jaGF0LkF1dG9yfVxuICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIgPSBmdW5jdGlvbihtc2csIHJlYWRlcikge1xuICB3aGlsZSAocmVhZGVyLm5leHRGaWVsZCgpKSB7XG4gICAgaWYgKHJlYWRlci5pc0VuZEdyb3VwKCkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YXIgZmllbGQgPSByZWFkZXIuZ2V0RmllbGROdW1iZXIoKTtcbiAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgY2FzZSAxOlxuICAgICAgdmFyIHZhbHVlID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChyZWFkZXIucmVhZFN0cmluZygpKTtcbiAgICAgIG1zZy5zZXRJZCh2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldE5hbWUodmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgdmFyIHZhbHVlID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChyZWFkZXIucmVhZFN0cmluZygpKTtcbiAgICAgIG1zZy5zZXRBdmF0YXIodmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlYWRlci5za2lwRmllbGQoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbXNnO1xufTtcblxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KS5cbiAqIEByZXR1cm4geyFVaW50OEFycmF5fVxuICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5wcm90b3R5cGUuc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB3cml0ZXIgPSBuZXcganNwYi5CaW5hcnlXcml0ZXIoKTtcbiAgcHJvdG8uYXBpLmNoYXQuQXV0b3Iuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5hcGkuY2hhdC5BdXRvcn0gbWVzc2FnZVxuICogQHBhcmFtIHshanNwYi5CaW5hcnlXcml0ZXJ9IHdyaXRlclxuICogQHN1cHByZXNzIHt1bnVzZWRMb2NhbFZhcmlhYmxlc30gZiBpcyBvbmx5IHVzZWQgZm9yIG5lc3RlZCBtZXNzYWdlc1xuICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5zZXJpYWxpemVCaW5hcnlUb1dyaXRlciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHdyaXRlcikge1xuICB2YXIgZiA9IHVuZGVmaW5lZDtcbiAgZiA9IG1lc3NhZ2UuZ2V0SWQoKTtcbiAgaWYgKGYubGVuZ3RoID4gMCkge1xuICAgIHdyaXRlci53cml0ZVN0cmluZyhcbiAgICAgIDEsXG4gICAgICBmXG4gICAgKTtcbiAgfVxuICBmID0gbWVzc2FnZS5nZXROYW1lKCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAyLFxuICAgICAgZlxuICAgICk7XG4gIH1cbiAgZiA9IG1lc3NhZ2UuZ2V0QXZhdGFyKCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAzLFxuICAgICAgZlxuICAgICk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBvcHRpb25hbCBzdHJpbmcgaWQgPSAxO1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoanNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQodGhpcywgMSwgXCJcIikpO1xufTtcblxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHZhbHVlICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5wcm90b3R5cGUuc2V0SWQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgMSwgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBuYW1lID0gMjtcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xucHJvdG8uYXBpLmNoYXQuQXV0b3IucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoanNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQodGhpcywgMiwgXCJcIikpO1xufTtcblxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHZhbHVlICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5wcm90b3R5cGUuc2V0TmFtZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGpzcGIuTWVzc2FnZS5zZXRQcm90bzNTdHJpbmdGaWVsZCh0aGlzLCAyLCB2YWx1ZSk7XG59O1xuXG5cbi8qKlxuICogb3B0aW9uYWwgc3RyaW5nIGF2YXRhciA9IDM7XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnByb3RvLmFwaS5jaGF0LkF1dG9yLnByb3RvdHlwZS5nZXRBdmF0YXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoanNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQodGhpcywgMywgXCJcIikpO1xufTtcblxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHZhbHVlICovXG5wcm90by5hcGkuY2hhdC5BdXRvci5wcm90b3R5cGUuc2V0QXZhdGFyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAganNwYi5NZXNzYWdlLnNldFByb3RvM1N0cmluZ0ZpZWxkKHRoaXMsIDMsIHZhbHVlKTtcbn07XG5cblxuXG5cblxuaWYgKGpzcGIuTWVzc2FnZS5HRU5FUkFURV9UT19PQkpFQ1QpIHtcbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBwcm90by5cbiAqIEZpZWxkIG5hbWVzIHRoYXQgYXJlIHJlc2VydmVkIGluIEphdmFTY3JpcHQgYW5kIHdpbGwgYmUgcmVuYW1lZCB0byBwYl9uYW1lLlxuICogT3B0aW9uYWwgZmllbGRzIHRoYXQgYXJlIG5vdCBzZXQgd2lsbCBiZSBzZXQgdG8gdW5kZWZpbmVkLlxuICogVG8gYWNjZXNzIGEgcmVzZXJ2ZWQgZmllbGQgdXNlLCBmb28ucGJfPG5hbWU+LCBlZywgZm9vLnBiX2RlZmF1bHQuXG4gKiBGb3IgdGhlIGxpc3Qgb2YgcmVzZXJ2ZWQgbmFtZXMgcGxlYXNlIHNlZTpcbiAqICAgICBuZXQvcHJvdG8yL2NvbXBpbGVyL2pzL2ludGVybmFsL2dlbmVyYXRvci5jYyNrS2V5d29yZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9pbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gd2hldGhlciB0byBpbmNsdWRlIHRoZVxuICogICAgIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcmV0dXJuIHshT2JqZWN0fVxuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uKG9wdF9pbmNsdWRlSW5zdGFuY2UpIHtcbiAgcmV0dXJuIHByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UudG9PYmplY3Qob3B0X2luY2x1ZGVJbnN0YW5jZSwgdGhpcyk7XG59O1xuXG5cbi8qKlxuICogU3RhdGljIHZlcnNpb24gb2YgdGhlIHtAc2VlIHRvT2JqZWN0fSBtZXRob2QuXG4gKiBAcGFyYW0ge2Jvb2xlYW58dW5kZWZpbmVkfSBpbmNsdWRlSW5zdGFuY2UgRGVwcmVjYXRlZC4gV2hldGhlciB0byBpbmNsdWRlXG4gKiAgICAgdGhlIEpTUEIgaW5zdGFuY2UgZm9yIHRyYW5zaXRpb25hbCBzb3kgcHJvdG8gc3VwcG9ydDpcbiAqICAgICBodHRwOi8vZ290by9zb3ktcGFyYW0tbWlncmF0aW9uXG4gKiBAcGFyYW0geyFwcm90by5hcGkuY2hhdC5NZXNzYWdlfSBtc2cgVGhlIG1zZyBpbnN0YW5jZSB0byB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJuIHshT2JqZWN0fVxuICogQHN1cHByZXNzIHt1bnVzZWRMb2NhbFZhcmlhYmxlc30gZiBpcyBvbmx5IHVzZWQgZm9yIG5lc3RlZCBtZXNzYWdlc1xuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLnRvT2JqZWN0ID0gZnVuY3Rpb24oaW5jbHVkZUluc3RhbmNlLCBtc2cpIHtcbiAgdmFyIGYsIG9iaiA9IHtcbiAgICBpZDoganNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQobXNnLCAxLCBcIlwiKSxcbiAgICBhdXRob3I6IChmID0gbXNnLmdldEF1dGhvcigpKSAmJiBwcm90by5hcGkuY2hhdC5BdXRvci50b09iamVjdChpbmNsdWRlSW5zdGFuY2UsIGYpLFxuICAgIG1lc3NhZ2U6IGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KG1zZywgMywgXCJcIiksXG4gICAgdXBkYXRlZGF0OiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDQsIFwiXCIpXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuY2hhdC5NZXNzYWdlfVxuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLmRlc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBqc3BiLkJpbmFyeVJlYWRlcihieXRlcyk7XG4gIHZhciBtc2cgPSBuZXcgcHJvdG8uYXBpLmNoYXQuTWVzc2FnZTtcbiAgcmV0dXJuIHByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uYXBpLmNoYXQuTWVzc2FnZX0gbXNnIFRoZSBtZXNzYWdlIG9iamVjdCB0byBkZXNlcmlhbGl6ZSBpbnRvLlxuICogQHBhcmFtIHshanNwYi5CaW5hcnlSZWFkZXJ9IHJlYWRlciBUaGUgQmluYXJ5UmVhZGVyIHRvIHVzZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkuY2hhdC5NZXNzYWdlfVxuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBjYXNlIDE6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldElkKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIHZhciB2YWx1ZSA9IG5ldyBwcm90by5hcGkuY2hhdC5BdXRvcjtcbiAgICAgIHJlYWRlci5yZWFkTWVzc2FnZSh2YWx1ZSxwcm90by5hcGkuY2hhdC5BdXRvci5kZXNlcmlhbGl6ZUJpbmFyeUZyb21SZWFkZXIpO1xuICAgICAgbXNnLnNldEF1dGhvcih2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldE1lc3NhZ2UodmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0OlxuICAgICAgdmFyIHZhbHVlID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChyZWFkZXIucmVhZFN0cmluZygpKTtcbiAgICAgIG1zZy5zZXRVcGRhdGVkYXQodmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlYWRlci5za2lwRmllbGQoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbXNnO1xufTtcblxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KS5cbiAqIEByZXR1cm4geyFVaW50OEFycmF5fVxuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLnByb3RvdHlwZS5zZXJpYWxpemVCaW5hcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHdyaXRlciA9IG5ldyBqc3BiLkJpbmFyeVdyaXRlcigpO1xuICBwcm90by5hcGkuY2hhdC5NZXNzYWdlLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyKHRoaXMsIHdyaXRlcik7XG4gIHJldHVybiB3cml0ZXIuZ2V0UmVzdWx0QnVmZmVyKCk7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgZ2l2ZW4gbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZVxuICogZm9ybWF0KSwgd3JpdGluZyB0byB0aGUgZ2l2ZW4gQmluYXJ5V3JpdGVyLlxuICogQHBhcmFtIHshcHJvdG8uYXBpLmNoYXQuTWVzc2FnZX0gbWVzc2FnZVxuICogQHBhcmFtIHshanNwYi5CaW5hcnlXcml0ZXJ9IHdyaXRlclxuICogQHN1cHByZXNzIHt1bnVzZWRMb2NhbFZhcmlhYmxlc30gZiBpcyBvbmx5IHVzZWQgZm9yIG5lc3RlZCBtZXNzYWdlc1xuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLnNlcmlhbGl6ZUJpbmFyeVRvV3JpdGVyID0gZnVuY3Rpb24obWVzc2FnZSwgd3JpdGVyKSB7XG4gIHZhciBmID0gdW5kZWZpbmVkO1xuICBmID0gbWVzc2FnZS5nZXRJZCgpO1xuICBpZiAoZi5sZW5ndGggPiAwKSB7XG4gICAgd3JpdGVyLndyaXRlU3RyaW5nKFxuICAgICAgMSxcbiAgICAgIGZcbiAgICApO1xuICB9XG4gIGYgPSBtZXNzYWdlLmdldEF1dGhvcigpO1xuICBpZiAoZiAhPSBudWxsKSB7XG4gICAgd3JpdGVyLndyaXRlTWVzc2FnZShcbiAgICAgIDIsXG4gICAgICBmLFxuICAgICAgcHJvdG8uYXBpLmNoYXQuQXV0b3Iuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXJcbiAgICApO1xuICB9XG4gIGYgPSBtZXNzYWdlLmdldE1lc3NhZ2UoKTtcbiAgaWYgKGYubGVuZ3RoID4gMCkge1xuICAgIHdyaXRlci53cml0ZVN0cmluZyhcbiAgICAgIDMsXG4gICAgICBmXG4gICAgKTtcbiAgfVxuICBmID0gbWVzc2FnZS5nZXRVcGRhdGVkYXQoKTtcbiAgaWYgKGYubGVuZ3RoID4gMCkge1xuICAgIHdyaXRlci53cml0ZVN0cmluZyhcbiAgICAgIDQsXG4gICAgICBmXG4gICAgKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBpZCA9IDE7XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UucHJvdG90eXBlLmdldElkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KHRoaXMsIDEsIFwiXCIpKTtcbn07XG5cblxuLyoqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAqL1xucHJvdG8uYXBpLmNoYXQuTWVzc2FnZS5wcm90b3R5cGUuc2V0SWQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgMSwgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIEF1dG9yIGF1dGhvciA9IDI7XG4gKiBAcmV0dXJuIHs/cHJvdG8uYXBpLmNoYXQuQXV0b3J9XG4gKi9cbnByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UucHJvdG90eXBlLmdldEF1dGhvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlez9wcm90by5hcGkuY2hhdC5BdXRvcn0gKi8gKFxuICAgIGpzcGIuTWVzc2FnZS5nZXRXcmFwcGVyRmllbGQodGhpcywgcHJvdG8uYXBpLmNoYXQuQXV0b3IsIDIpKTtcbn07XG5cblxuLyoqIEBwYXJhbSB7P3Byb3RvLmFwaS5jaGF0LkF1dG9yfHVuZGVmaW5lZH0gdmFsdWUgKi9cbnByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UucHJvdG90eXBlLnNldEF1dGhvciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGpzcGIuTWVzc2FnZS5zZXRXcmFwcGVyRmllbGQodGhpcywgMiwgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIENsZWFycyB0aGUgbWVzc2FnZSBmaWVsZCBtYWtpbmcgaXQgdW5kZWZpbmVkLlxuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLnByb3RvdHlwZS5jbGVhckF1dGhvciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldEF1dGhvcih1bmRlZmluZWQpO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGlzIGZpZWxkIGlzIHNldC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UucHJvdG90eXBlLmhhc0F1dGhvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ganNwYi5NZXNzYWdlLmdldEZpZWxkKHRoaXMsIDIpICE9IG51bGw7XG59O1xuXG5cbi8qKlxuICogb3B0aW9uYWwgc3RyaW5nIG1lc3NhZ2UgPSAzO1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5wcm90by5hcGkuY2hhdC5NZXNzYWdlLnByb3RvdHlwZS5nZXRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KHRoaXMsIDMsIFwiXCIpKTtcbn07XG5cblxuLyoqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAqL1xucHJvdG8uYXBpLmNoYXQuTWVzc2FnZS5wcm90b3R5cGUuc2V0TWVzc2FnZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGpzcGIuTWVzc2FnZS5zZXRQcm90bzNTdHJpbmdGaWVsZCh0aGlzLCAzLCB2YWx1ZSk7XG59O1xuXG5cbi8qKlxuICogb3B0aW9uYWwgc3RyaW5nIHVwZGF0ZWRBdCA9IDQ7XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UucHJvdG90eXBlLmdldFVwZGF0ZWRhdCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdCh0aGlzLCA0LCBcIlwiKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgKi9cbnByb3RvLmFwaS5jaGF0Lk1lc3NhZ2UucHJvdG90eXBlLnNldFVwZGF0ZWRhdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGpzcGIuTWVzc2FnZS5zZXRQcm90bzNTdHJpbmdGaWVsZCh0aGlzLCA0LCB2YWx1ZSk7XG59O1xuXG5cbi8qKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xucHJvdG8uYXBpLmNoYXQuRVN0YXR1cyA9IHtcbiAgVU5LTk9XTjogMCxcbiAgU1VDQ0VTUzogMSxcbiAgRVJST1I6IDJcbn07XG5cbmdvb2cub2JqZWN0LmV4dGVuZChleHBvcnRzLCBwcm90by5hcGkuY2hhdCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGUtcHJvdG9idWZcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbmNhdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzX3BiJztcblxuaW1wb3J0IHsgTWVzc2FnZURhdGFGaW5kZXIgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL01lc3NhZ2VEYXRhRmluZGVyJztcbmltcG9ydCB7IENoYXRFdmVudFNlcnZpY2UgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9DaGF0RXZlbnRTZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoYXRTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VEYXRhRmluZGVyOiBNZXNzYWdlRGF0YUZpbmRlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjaGF0RXZlbnRTZXJ2aWNlOiBDaGF0RXZlbnRTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDaGF0U3RyZWFtKCk6IE9ic2VydmFibGU8eyBtZXNzYWdlczogTWVzc2FnZS5Bc09iamVjdFtdIH0+IHtcbiAgICAgICAgcmV0dXJuIGNvbmNhdCh0aGlzLm1lc3NhZ2VEYXRhRmluZGVyLmdldE1lc3NhZ2VBbGwoKSwgdGhpcy5jaGF0RXZlbnRTZXJ2aWNlLmJyb2FkY2FzdCgpKVxuICAgICAgICAgICAgLnBpcGUobWFwKG1lc3NhZ2VzID0+ICh7bWVzc2FnZXN9KSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgU2VydmljZXNNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9TZXJ2aWNlc01vZHVsZSc7XG5cbmltcG9ydCB7IE1lc3NhZ2VDb250cm9sbGVyIH0gZnJvbSAnLi9NZXNzYWdlQ29udHJvbGxlcic7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4vTWVzc2FnZVNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbU2VydmljZXNNb2R1bGVdLFxuICAgIGNvbnRyb2xsZXJzOiBbTWVzc2FnZUNvbnRyb2xsZXJdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZU1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyLCBVc2VHdWFyZHMsIFVzZUZpbHRlcnMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBHcnBjTWV0aG9kIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSnd0R3VhcmQgfSBmcm9tICdAbGliL2p3dC9Kd3RHdWFyZCc7XG5pbXBvcnQgeyBJSnd0TWV0YSB9IGZyb20gJ0BsaWIvand0L0p3dEludGVyZmFjZSc7XG5pbXBvcnQgeyBScGNFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdAbGliL2V4Y2VwdGlvbnMnO1xuXG5pbXBvcnQgeyBFU3RhdHVzLCBDaGF0UmVzIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzX3BiJztcblxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL01lc3NhZ2VTZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkTWVzc2FnZVJlcURUTyB9IGZyb20gJy4vZHRvL0FkZE1lc3NhZ2VSZXFEVE8nO1xuaW1wb3J0IHsgRWRpdE1lc3NhZ2VSZXFEVE8gfSBmcm9tICcuL2R0by9FZGl0TWVzc2FnZVJlcURUTyc7XG5pbXBvcnQgeyBEZWxldGVNZXNzYWdlUmVxRFRPIH0gZnJvbSAnLi9kdG8vRGVsZXRlTWVzc2FnZVJlcURUTyc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge1xuICAgIH1cblxuICAgIEBVc2VHdWFyZHMoSnd0R3VhcmQpXG4gICAgQEdycGNNZXRob2QoJ01lc3NhZ2VTZXJ2aWNlJywgJ1NlbmRNZXNzYWdlJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdNZXNzYWdlU2VydmljZTo6c2VuZE1lc3NhZ2UnKSlcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UoZGF0YTogQWRkTWVzc2FnZVJlcURUTywgbWV0YTogSUp3dE1ldGE8eyBpZDogc3RyaW5nOyB9Pik6IE9ic2VydmFibGU8Q2hhdFJlcy5Bc09iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZShkYXRhLCBtZXRhLnBheWxvYWQuaWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEVTdGF0dXMuU1VDQ0VTUyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYE1lc3NhZ2UgY3JlYXRlZCBzdWNjZXNzZnVsbHlgLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBAVXNlR3VhcmRzKEp3dEd1YXJkKVxuICAgIEBHcnBjTWV0aG9kKCdNZXNzYWdlU2VydmljZScsICdFZGl0TWVzc2FnZScpXG4gICAgQFVzZUZpbHRlcnMoUnBjRXhjZXB0aW9uRmlsdGVyLmZvcignTWVzc2FnZVNlcnZpY2U6OmVkaXRNZXNzYWdlJykpXG4gICAgcHVibGljIGVkaXRNZXNzYWdlKGRhdGE6IEVkaXRNZXNzYWdlUmVxRFRPKTogT2JzZXJ2YWJsZTxDaGF0UmVzLkFzT2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmVkaXRNZXNzYWdlKGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogRVN0YXR1cy5TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgTWVzc2FnZXMgdXBkYXRlIHN1Y2Nlc3NmdWxseWAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBVc2VHdWFyZHMoSnd0R3VhcmQpXG4gICAgQEdycGNNZXRob2QoJ01lc3NhZ2VTZXJ2aWNlJywgJ0RlbGV0ZU1lc3NhZ2UnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ01lc3NhZ2VTZXJ2aWNlOjpkZWxldGVNZXNzYWdlJykpXG4gICAgcHVibGljIGRlbGV0ZU1lc3NhZ2UoZGF0YTogRGVsZXRlTWVzc2FnZVJlcURUTyk6IE9ic2VydmFibGU8Q2hhdFJlcy5Bc09iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlU2VydmljZS5kZWxldGVNZXNzYWdlKGRhdGEuaWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogRVN0YXR1cy5TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgTWVzc2FnZSBkZWxldGUgc3VjY2Vzc2Z1bGx5YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Nb2R1bGVJbml0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50LCBDbGllbnRHcnBjIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcFRvLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU2VuZE1lc3NhZ2VSZXEsIEVkaXRNZXNzYWdlUmVxIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9tZXNzYWdlX3BiJztcbmltcG9ydCB7IFVzZXJSZXEgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXJfcGInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlci50eXBlc19wYic7XG5cbmltcG9ydCB7IGdycGNVc2VyIH0gZnJvbSAnQGxpYi91dGlscy9HcnBjQ29uZmlncyc7XG5cbmltcG9ydCB7IE1lc3NhZ2VEYXRhUHJvZHVjZXIgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGF0YS1wcm9kdWNlcnMvTWVzc2FnZURhdGFQcm9kdWNlcic7XG5pbXBvcnQgeyBNZXNzYWdlRGF0YVJlbW92ZXIgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGF0YS1yZW1vdmVycy9NZXNzYWdlRGF0YVJlbW92ZXInO1xuaW1wb3J0IHsgTWVzc2FnZURhdGFVcGRhdGVyIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RhdGEtdXBkYXRlcnMvTWVzc2FnZURhdGFVcGRhdGVyJztcbmltcG9ydCB7IENoYXRFdmVudFNlcnZpY2UgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9DaGF0RXZlbnRTZXJ2aWNlJztcblxuaW50ZXJmYWNlIElVc2VyU2VydmljZSB7XG4gICAgZ2V0VXNlcihkYXRhOiBVc2VyUmVxLkFzT2JqZWN0KTogT2JzZXJ2YWJsZTxVc2VyLkFzT2JqZWN0Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIGltcGxlbWVudHMgT25Nb2R1bGVJbml0IHtcblxuICAgIEBDbGllbnQoZ3JwY1VzZXIpIHByaXZhdGUgcmVhZG9ubHkgZ3JwY1VzZXJDbGllbnQ6IENsaWVudEdycGM7XG4gICAgcHJpdmF0ZSBncnBjVXNlclNlcnZpY2U6IElVc2VyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VEYXRhUHJvZHVjZXI6IE1lc3NhZ2VEYXRhUHJvZHVjZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZURhdGFVcGRhdGVyOiBNZXNzYWdlRGF0YVVwZGF0ZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZURhdGFSZW1vdmVyOiBNZXNzYWdlRGF0YVJlbW92ZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhdEV2ZW50U2VydmljZTogQ2hhdEV2ZW50U2VydmljZSxcbiAgICApIHtcbiAgICB9XG5cbiAgICBvbk1vZHVsZUluaXQoKSB7XG4gICAgICAgIHRoaXMuZ3JwY1VzZXJTZXJ2aWNlID0gdGhpcy5ncnBjVXNlckNsaWVudC5nZXRTZXJ2aWNlPElVc2VyU2VydmljZT4oJ1VzZXJTZXJ2aWNlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbmRNZXNzYWdlKGRhdGE6IFNlbmRNZXNzYWdlUmVxLkFzT2JqZWN0LCB1c2VySWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ncnBjVXNlclNlcnZpY2UuZ2V0VXNlcih7aWQ6IHVzZXJJZH0pXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAodXNlciA9PiB0aGlzLm1lc3NhZ2VEYXRhUHJvZHVjZXIuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBkYXRhLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXI6IHVzZXIuYXZhdGFyLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICAgICB0YXAocmVzID0+IHRoaXMuY2hhdEV2ZW50U2VydmljZS5lbWl0KHJlcykpLFxuICAgICAgICAgICAgICAgIG1hcFRvKG51bGwpLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZWRpdE1lc3NhZ2UoZGF0YTogRWRpdE1lc3NhZ2VSZXEuQXNPYmplY3QpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZURhdGFVcGRhdGVyLnVwZGF0ZU1lc3NhZ2UoZGF0YSlcbiAgICAgICAgICAgIC5waXBlKG1hcFRvKG51bGwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWVzc2FnZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VEYXRhUmVtb3Zlci5kZWxldGVNZXNzYWdlKGlkKVxuICAgICAgICAgICAgLnBpcGUobWFwVG8obnVsbCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IElzRGVmaW5lZCwgSXNTdHJpbmcsIE1heExlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IFNlbmRNZXNzYWdlUmVxIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9tZXNzYWdlX3BiJztcblxuZXhwb3J0IGNsYXNzIEFkZE1lc3NhZ2VSZXFEVE8gaW1wbGVtZW50cyBTZW5kTWVzc2FnZVJlcS5Bc09iamVjdCB7XG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzU3RyaW5nKClcbiAgICBATWF4TGVuZ3RoKDUwMClcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsImltcG9ydCB7IElzVVVJRCwgSXNEZWZpbmVkLCBJc1N0cmluZywgTWF4TGVuZ3RoIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgRWRpdE1lc3NhZ2VSZXEgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L21lc3NhZ2VfcGInO1xuXG5leHBvcnQgY2xhc3MgRWRpdE1lc3NhZ2VSZXFEVE8gaW1wbGVtZW50cyBFZGl0TWVzc2FnZVJlcS5Bc09iamVjdCB7XG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzVVVJRCgpXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG5cbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNTdHJpbmcoKVxuICAgIEBNYXhMZW5ndGgoNTAwKVxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBJc1VVSUQsIElzRGVmaW5lZCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IERlbGV0ZU1lc3NhZ2VSZXEgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L21lc3NhZ2VfcGInO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlTWVzc2FnZVJlcURUTyBpbXBsZW1lbnRzIERlbGV0ZU1lc3NhZ2VSZXEuQXNPYmplY3Qge1xuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1VVSUQoKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==