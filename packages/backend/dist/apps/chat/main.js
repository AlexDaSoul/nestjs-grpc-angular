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
        this.grpcAuthService.getCertStream({})
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
const MessageModule_1 = __webpack_require__(55);
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
const ChatService_1 = __webpack_require__(54);
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
const ChatService_1 = __webpack_require__(54);
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
/* 55 */
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
const MessageController_1 = __webpack_require__(56);
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
const microservices_1 = __webpack_require__(12);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(57);
const JwtGuard_1 = __webpack_require__(35);
const exceptions_1 = __webpack_require__(38);
const chat_enum_1 = __webpack_require__(58);
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
                status: chat_enum_1.api.chat.EStatus.SUCCESS,
                message: `Message created successfully`,
            };
        }));
    }
    editMessage(data) {
        return this.messageService.editMessage(data).pipe(operators_1.map(() => {
            return {
                status: chat_enum_1.api.chat.EStatus.SUCCESS,
                message: `Messages update successfully`,
            };
        }));
    }
    deleteMessage(data) {
        return this.messageService.deleteMessage(data.id).pipe(operators_1.map(() => {
            return {
                status: chat_enum_1.api.chat.EStatus.SUCCESS,
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
/* 57 */
/***/ (function(module, exports) {

module.exports = require("rxjs/internal/operators");

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(59)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    /* CommonJS */ else {}

})(this, function($protobuf) {
    "use strict";

    var $util = $protobuf.util;
    
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.api = (function() {
    
        var api = {};
    
        api.chat = (function() {
    
            var chat = {};
    
            chat.EStatus = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "SUCCESS"] = 1;
                values[valuesById[2] = "ERROR"] = 2;
                return values;
            })();
    
            return chat;
        })();
    
        return api;
    })();

    return $root;
});


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("protobufjs/minimal");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29tbW9uXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL2NvbG9yaXplcnMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL01lc3NhZ2VQcmludGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9sb2dnZXIvQm9vdHN0cmFwTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy91dGlscy9HcnBjQ29uZmlncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL0FwcE1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvand0L0NlcnRzU2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2FwaS9BcGlNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvY2hhdC9DaGF0TW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvc2VydmljZXMvU2VydmljZXNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvRGFsTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRiLW1pZ3JhdGVcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2Vudi50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvTWVzc2FnZURhdGFGaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS11cGRhdGVycy9EYXRhVXBkYXRlcnNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS11cGRhdGVycy9NZXNzYWdlRGF0YVVwZGF0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS1wcm9kdWNlcnMvRGF0YVByb2R1Y2VyTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvc2VydmljZXMvZGFsL2RhdGEtcHJvZHVjZXJzL01lc3NhZ2VEYXRhUHJvZHVjZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS1yZW1vdmVycy9EYXRhUmVtb3ZlcnNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGF0YS1yZW1vdmVycy9NZXNzYWdlRGF0YVJlbW92ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9DaGF0RXZlbnRTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL2NoYXQvQ2hhdENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2p3dC9Kd3RHdWFyZC50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqc29ud2VidG9rZW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJncnBjXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL2NvZGUudHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9CYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvTm90Rm91bmRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL0ludGVybmFsRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvVW5hdmFpbGFibGVFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9maWx0ZXIvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL0V4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ZpbHRlci9oYW5kbGVycy9pbXBsL1JwY0V4Y2VwdGlvbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL2NoYXQvQ2hhdFNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvbWVzc2FnZS9NZXNzYWdlTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL21lc3NhZ2UvTWVzc2FnZUNvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vLi9saWJzL2dycGMtcHJvdG8vY2hhdC9jaGF0LmVudW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvdG9idWZqcy9taW5pbWFsXCIiLCJ3ZWJwYWNrOi8vLy4vYXBwcy9jaGF0L3NyYy9hcGkvbWVzc2FnZS9NZXNzYWdlU2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL2NoYXQvc3JjL2FwaS9tZXNzYWdlL2R0by9BZGRNZXNzYWdlUmVxRFRPLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsYXNzLXZhbGlkYXRvclwiIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL21lc3NhZ2UvZHRvL0VkaXRNZXNzYWdlUmVxRFRPLnRzIiwid2VicGFjazovLy8uL2FwcHMvY2hhdC9zcmMvYXBpL21lc3NhZ2UvZHRvL0RlbGV0ZU1lc3NhZ2VSZXFEVE8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7OztBQ2xGQSxPQUFPLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztBQUU1QixzQ0FBMkM7QUFDM0Msd0NBQXNFO0FBRXRFLHdDQUE4QztBQUU5Qyw4Q0FBa0Q7QUFFbEQsNENBQXdDO0FBRXhDLE1BQU0sTUFBTSxHQUFHLElBQUksd0JBQWUsRUFBRSxDQUFDO0FBR3JDLGVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEMsS0FBSyxVQUFVLFNBQVM7SUFDcEIsTUFBTSxHQUFHLEdBQUcs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QUNTO0FBSHRCLGtEQUlDIiwiZmlsZSI6ImFwcHMvY2hhdC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwicHJvY2Vzcy50aXRsZSA9ICdub2RlLWNoYXQnO1xuXG5pbXBvcnQgeyBOZXN0RmFjdG9yeSB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXIgYXMgTmVzdExvZ2dlciwgVmFsaWRhdGlvblBpcGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IEJvb3RzdHJhcExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcblxuaW1wb3J0IHsgZ3JwY0NoYXQgfSBmcm9tICdAbGliL3V0aWxzL0dycGNDb25maWdzJztcblxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9BcHBNb2R1bGUnO1xuXG5jb25zdCBsb2dnZXIgPSBuZXcgQm9vdHN0cmFwTG9nZ2VyKCk7XG4vLyBvdmVycmlkZSBsb2dnZXIgd2l0aCBvdXIgaW1wbGVtZW50YXRpb24gZm9yIHRyYW5zZm9ybWluZyBsb2dzIGxpa2Vcbi8vIFwiW05lc3RdIDQwNiAgIC0gOC8xMi8yMDE5LCAxMTowMDo0MSBBTSAgIFtOZXN0RmFjdG9yeV0gLi4uXCJcbk5lc3RMb2dnZXIub3ZlcnJpZGVMb2dnZXIobG9nZ2VyKTtcblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICAgIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZU1pY3Jvc2VydmljZShBcHBNb2R1bGUsIGdycGNDaGF0KTtcblxuICAgIGFwcC51c2VMb2dnZXIobG9nZ2VyKTtcbiAgICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFZhbGlkYXRpb25QaXBlKCkpO1xuXG4gICAgYXdhaXQgYXBwLmxpc3RlbkFzeW5jKCk7XG59XG5cbmJvb3RzdHJhcCgpLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwiZXhwb3J0ICogZnJvbSAnLi9Mb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Cb290c3RyYXBMb2dnZXInO1xuIiwiaW1wb3J0IHsgQUxMT1dFRF9MT0dfQllfTEVWRUwsIERFRkFVTFRfTE9HR0VSX0xFVkVMLCBMb2dMZXZlbFR5cGUsIExPR19MRVZFTF9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXInO1xuaW1wb3J0IHsgTWVzc2FnZVByaW50ZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZVByaW50ZXInO1xuXG5jb25zdCBDVVJSRU5UX0xPR19MRVZFTCA9IHByb2Nlc3MuZW52LkxPR0dFUl9MRVZFTCB8fCBERUZBVUxUX0xPR0dFUl9MRVZFTDtcbmNvbnN0IENVUlJFTlRfQUxMT1dFRF9MRVZFTFMgPSBBTExPV0VEX0xPR19CWV9MRVZFTFtDVVJSRU5UX0xPR19MRVZFTF07XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVByaW50ZXI6IE1lc3NhZ2VQcmludGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUJ1aWxkZXI6IE1lc3NhZ2VCdWlsZGVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1aWxkZXIgPSBuZXcgTWVzc2FnZUJ1aWxkZXIodGhpcy5sYWJlbCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIgPSBuZXcgTWVzc2FnZVByaW50ZXIodGhpcy5tZXNzYWdlQnVpbGRlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZShMT0dfTEVWRUxfTkFNRS5kZWJ1ZywgYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluZm8oLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLmluZm8sIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWN1cml0eSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuc2VjdXJpdHksIGFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nTWVzc2FnZShjdXJyZW50TGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKENVUlJFTlRfQUxMT1dFRF9MRVZFTFMuaGFzKGN1cnJlbnRMZXZlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIucHJpbnQoY3VycmVudExldmVsLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB0eXBlIExvZ0xldmVsVHlwZSA9ICdkZWJ1ZycgfCAnaW5mbycgfCAnZXJyb3InIHwgJ3NlY3VyaXR5JztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HR0VSX0xFVkVMID0gJ2luZm8nO1xuXG5leHBvcnQgY29uc3QgQUxMT1dFRF9MT0dfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IG5ldyBTZXQoWydkZWJ1ZycsICdpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGluZm86IG5ldyBTZXQoWydpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGVycm9yOiBuZXcgU2V0KFsnZXJyb3InLCAnc2VjdXJpdHknXSksXG4gICAgc2VjdXJpdHk6IG5ldyBTZXQoWydzZWN1cml0eSddKSxcbn07XG5cbmV4cG9ydCBjb25zdCBMT0dfTEVWRUxfTkFNRSA9IHtcbiAgICBkZWJ1ZzogJ2RlYnVnJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgaW5mbzogJ2luZm8nIGFzIExvZ0xldmVsVHlwZSxcbiAgICBlcnJvcjogJ2Vycm9yJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScgYXMgTG9nTGV2ZWxUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfQ09MT1JfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IDkwLFxuICAgIGluZm86IDMyLFxuICAgIGVycm9yOiAzMSxcbiAgICBzZWN1cml0eTogMzYsXG59O1xuIiwiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGNvbG9yaXplVGltZXN0YW1wLCBjb2xvcml6ZUxldmVsLCBjb2xvcml6ZUxhYmVsLCBjb2xvcml6ZU1lc3NhZ2UgfSBmcm9tICcuL2NvbG9yaXplcnMnO1xuaW1wb3J0IHsgcGFkU3RhcnQsIHBhZEVuZCB9IGZyb20gJy4uL2Zvcm1hdCc7XG5cbmNvbnN0IERFTElNSVRFUlMgPSB7XG4gICAgZGF0ZTogJy0nLFxuICAgIHRpbWU6ICc6JyxcbiAgICBsb2dNZXNzYWdlOiAnICcsXG4gICAgZnVsbE1lc3NhZ2U6ICcgOjogJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlQnVpbGRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2xvcml6ZU1lc3NhZ2VzID0gcHJvY2Vzcy5lbnYuTE9HR0VSX0NPTE9SSVpFX01FU1NBR0VTID09PSAndHJ1ZSc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLmdldFRpbWVzdGFtcCgpO1xuICAgICAgICBjb25zdCBsb2dNZXNzYWdlID0gdGhpcy5wcmVwYXJlTWVzc2FnZUZyb21BcmdzKGFyZ3MpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb2xvcml6ZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RpbWVzdGFtcCwgbGV2ZWwsIHRoaXMubGFiZWwsIGxvZ01lc3NhZ2VdLmpvaW4oREVMSU1JVEVSUy5mdWxsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wKSxcbiAgICAgICAgICAgIGNvbG9yaXplTGV2ZWwobGV2ZWwpLFxuICAgICAgICAgICAgY29sb3JpemVMYWJlbCh0aGlzLmxhYmVsKSxcbiAgICAgICAgICAgIGNvbG9yaXplTWVzc2FnZShsZXZlbCwgbG9nTWVzc2FnZSksXG4gICAgICAgIF0uam9pbihERUxJTUlURVJTLmZ1bGxNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbG9nRGF0ZSA9IFtwYWRTdGFydChkYXRlLmdldERhdGUoKSksIHBhZFN0YXJ0KGRhdGUuZ2V0TW9udGgoKSArIDEpLCBkYXRlLmdldEZ1bGxZZWFyKCldLmpvaW4oREVMSU1JVEVSUy5kYXRlKTtcbiAgICAgICAgY29uc3QgbG9nVGltZSA9IFtwYWRTdGFydChkYXRlLmdldEhvdXJzKCkpLCBwYWRTdGFydChkYXRlLmdldE1pbnV0ZXMoKSksIHBhZEVuZChkYXRlLmdldE1pbGxpc2Vjb25kcygpKV0uam9pbihERUxJTUlURVJTLnRpbWUpO1xuXG4gICAgICAgIHJldHVybiBgWyR7bG9nRGF0ZX0gJHtsb2dUaW1lfV1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZU1lc3NhZ2VGcm9tQXJncyhhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgICAgICAgICAubWFwKGl0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGl0O1xuXG4gICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBwcmVwYXJlIHVuZGVmaW5lZCwgbnVsbCwgc3RyaW5nICYgbnVtYmVyIHR5cGVzXG4gICAgICAgICAgICAgICAgaWYgKFsnbnVtYmVyJywgJ3N0cmluZycsICd1bmRlZmluZWQnXS5pbmNsdWRlcyh0eXBlKSB8fCBpdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdHJ5IGFkZCBzdGFjayBvciBtZXNzYWdlIGZyb20gRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoaXQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7aXQuc3RhY2sgfHwgaXQubWVzc2FnZSB8fCBpdH1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHN0cmluZ2lmeSBvdGhlciB0eXBlcywgc3VjaCBhcyBhcnJheSwgb2JqZWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KGl0LCBudWxsLCAyKX1gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKERFTElNSVRFUlMubG9nTWVzc2FnZSk7XG4gICAgfVxufVxuIiwiLy8gYWJvdXQgY29sb3JpemluZyBtZXNzYWdlcyBpbiBzdGRvdXQgc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDE0MDcyNDZcblxuaW1wb3J0IHsgTUVTU0FHRV9DT0xPUl9CWV9MRVZFTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSBNRVNTQUdFX0NPTE9SX0JZX0xFVkVMLmluZm87XG5jb25zdCBUSU1FU1RBTVBfQ09MT1IgPSAnNTAnO1xuY29uc3QgTEFCRUxfQ09MT1IgPSAnMzMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShUSU1FU1RBTVBfQ09MT1IsIHRpbWVzdGFtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxldmVsKGxldmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShNRVNTQUdFX0NPTE9SX0JZX0xFVkVMW2xldmVsXSB8fCBERUZBVUxUX0NPTE9SLCBsZXZlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxhYmVsKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShMQUJFTF9DT0xPUiwgbGFiZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVNZXNzYWdlKGxldmVsOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbG9yaXplKE1FU1NBR0VfQ09MT1JfQllfTEVWRUxbbGV2ZWxdIHx8IERFRkFVTFRfQ09MT1IsIG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBjb2xvcml6ZShjb2xvcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBbJ1xceDFiWycsIGNvbG9yLCAnbScsIG1lc3NhZ2UsICdcXHgxYlswbSddLmpvaW4oJycpO1xufVxuIiwiZXhwb3J0IGNvbnN0IHBhZFN0YXJ0ID0gKGRhdGE6IG51bWJlciwgcGFkTnVtOiBudW1iZXIgPSAyKTogc3RyaW5nID0+IGRhdGEudG9TdHJpbmcoKS5wYWRTdGFydChwYWROdW0sICcwJyk7XG5cbmV4cG9ydCBjb25zdCBwYWRFbmQgPSAoZGF0YTogbnVtYmVyLCBwYWROdW06IG51bWJlciA9IDMpOiBzdHJpbmcgPT4gZGF0YS50b1N0cmluZygpLnBhZEVuZChwYWROdW0sICcwJyk7XG4iLCJpbXBvcnQgeyBMb2dMZXZlbFR5cGUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL01lc3NhZ2VCdWlsZGVyJztcblxuY29uc3QgTk9PUCA9ICgpID0+ICh7fSk7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUHJpbnRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtZXNzYWdlQnVpbGRlcjogTWVzc2FnZUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJpbnQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmludFByZXBhcmVkTWVzc2FnZSh0aGlzLm1lc3NhZ2VCdWlsZGVyLmJ1aWxkKGxldmVsLCBhcmdzKSArICdcXG4nKTtcbiAgICB9XG5cbiAgICAvLyBjaGF0OiBjaGVjayB0aGlzIGltcGxlbWVudGF0aW9uIGluIGh0dHBzOi8vc2RleG50LmF0bGFzc2lhbi5uZXQvYnJvd3NlL1dFQkJBQ0stNDg1XG4gICAgcHJpdmF0ZSBwcmludFByZXBhcmVkTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvbGliL2ludGVybmFsL2NvbnNvbGUvY29uc3RydWN0b3IuanMjTDIzMlxuXG4gICAgICAgIC8vIHRoZXJlIG1heSBiZSBhbiBlcnJvciBvY2N1cnJpbmcgc3luY2hyb25vdXNseSAoZS5nLiBmb3IgZmlsZXMgb3IgVFRZc1xuICAgICAgICAvLyBvbiBQT1NJWCBzeXN0ZW1zKSBvciBhc3luY2hyb25vdXNseSAoZS5nLiBwaXBlcyBvbiBQT1NJWCBzeXN0ZW1zKSwgc29cbiAgICAgICAgLy8gaGFuZGxlIGJvdGggc2l0dWF0aW9ucy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGFkZCBhbmQgbGF0ZXIgcmVtb3ZlIGEgbm9vcCBlcnJvciBoYW5kbGVyIHRvIGNhdGNoIHN5bmNocm9ub3VzIGVycm9ycy5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnN0ZG91dC5saXN0ZW5lckNvdW50KCdlcnJvcicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQub25jZSgnZXJyb3InLCBOT09QKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobWVzc2FnZSwgTk9PUCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gdGhlcmUncyBubyBwcm9wZXIgd2F5IHRvIHBhc3MgYWxvbmcgdGhlIGVycm9yIGhlcmVcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIE5PT1ApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9Mb2dnZXInO1xuXG5jb25zdCBERUZBVUxUX0xPR0dFUl9OQU1FID0gJ2Jvb3RzdHJhcCc7XG5cbmV4cG9ydCBjbGFzcyBCb290c3RyYXBMb2dnZXIgaW1wbGVtZW50cyBMb2dnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcy5sYWJlbCA/IHRoaXMubGFiZWwgOiBERUZBVUxUX0xPR0dFUl9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBhbnksIHRyYWNlPzogc3RyaW5nLCBjb250ZXh0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXJuKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvLyBvdXIgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvZ2dlciBkb2VzIG5vdCB5ZXQgbmVlZFxuICAgICAgICAvLyB0aGUgXCJ3YXJuaW5nXCIgbGV2ZWwsIHNvIHdlIHdpbGwgd3JpdGUgdGhlIGxvZ3NcbiAgICAgICAgLy8gY29taW5nIGZyb20gaGVyZSB0byBcImVycm9yXCIgbGV2ZWxcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgR3JwY09wdGlvbnMsIFRyYW5zcG9ydCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgZ3JwY0NoYXQgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQ0hBVF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMycsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuY2hhdCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2NoYXQvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY0F1dGggPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQVVUSF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMicsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuYXV0aCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2F1dGgvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY1VzZXIgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfVVNFUl9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMScsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkudXNlcicsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL3VzZXIvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9taWNyb3NlcnZpY2VzXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgQ2VydHNTZXJ2aWNlIH0gZnJvbSAnQGxpYi9qd3QvQ2VydHNTZXJ2aWNlJztcblxuaW1wb3J0IHsgQXBpTW9kdWxlIH0gZnJvbSAnLi9hcGkvQXBpTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBcGlNb2R1bGUsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtDZXJ0c1NlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Nb2R1bGVJbml0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50LCBDbGllbnRHcnBjIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IHRpbWVyLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyByZXRyeVdoZW4sIHRhcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcbmltcG9ydCB7IGdycGNBdXRoIH0gZnJvbSAnQGxpYi91dGlscy9HcnBjQ29uZmlncyc7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL2F1dGgvYXV0aCc7XG5cbmNvbnN0IFJFVFJZID0gMTA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDZXJ0c1NlcnZpY2UgaW1wbGVtZW50cyBPbk1vZHVsZUluaXQge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignQ2VydHNTZXJ2aWNlJyk7XG5cbiAgICBAQ2xpZW50KGdycGNBdXRoKSBwcml2YXRlIHJlYWRvbmx5IGdycGNBdXRoQ2xpZW50OiBDbGllbnRHcnBjO1xuICAgIHByaXZhdGUgZ3JwY0F1dGhTZXJ2aWNlOiBhcGkuYXV0aC5BdXRoU2VydmljZTtcblxuICAgIHB1YmxpYyBvbk1vZHVsZUluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JwY0F1dGhTZXJ2aWNlID0gdGhpcy5ncnBjQXV0aENsaWVudC5nZXRTZXJ2aWNlPGFwaS5hdXRoLkF1dGhTZXJ2aWNlPignQXV0aFNlcnZpY2UnKTtcblxuICAgICAgICB0aGlzLmdycGNBdXRoU2VydmljZS5nZXRDZXJ0U3RyZWFtKHt9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgcmV0cnlXaGVuKGVycm9ycyA9PlxuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcChlcnIgPT4gdGhpcy5sb2dnZXIuZXJyb3IoZXJyLm1lc3NhZ2UgKyAnLiBXaWxsIHRyeSBhZ2FpbiBhZnRlciB0aW1lb3V0IGluIDNzLicpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlTWFwKCgpID0+IChSRVRSWSA/IHRpbWVyKDMwMDApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKGBDYW4ndCByZWNvbm5lY3QgdG8gQ2VydFN0cmVhbScsIHRpbWVvdXQgZXhwaXJlZC5gKSkpLFxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5KV1RfUFVCID0gcmVzLmtleTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9vcGVyYXRvcnNcIik7IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBDaGF0TW9kdWxlIH0gZnJvbSAnLi9jaGF0L0NoYXRNb2R1bGUnO1xuaW1wb3J0IHsgTWVzc2FnZU1vZHVsZSB9IGZyb20gJy4vbWVzc2FnZS9NZXNzYWdlTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0NoYXRNb2R1bGUsIE1lc3NhZ2VNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBBcGlNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJ2aWNlc01vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL1NlcnZpY2VzTW9kdWxlJztcblxuaW1wb3J0IHsgQ2hhdENvbnRyb2xsZXIgfSBmcm9tICcuL0NoYXRDb250cm9sbGVyJztcbmltcG9ydCB7IENoYXRTZXJ2aWNlIH0gZnJvbSAnLi9DaGF0U2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTZXJ2aWNlc01vZHVsZV0sXG4gICAgY29udHJvbGxlcnM6IFtDaGF0Q29udHJvbGxlcl0sXG4gICAgcHJvdmlkZXJzOiBbQ2hhdFNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBDaGF0TW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGFsTW9kdWxlIH0gZnJvbSAnLi9kYWwvRGFsTW9kdWxlJztcbmltcG9ydCB7IENoYXRFdmVudFNlcnZpY2UgfSBmcm9tICcuL0NoYXRFdmVudFNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGFsTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtDaGF0RXZlbnRTZXJ2aWNlXSxcbiAgICBleHBvcnRzOiBbRGFsTW9kdWxlLCBDaGF0RXZlbnRTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VydmljZXNNb2R1bGUge1xufVxuXG5leHBvcnQgKiBmcm9tICcuL2RhbC9EYWxNb2R1bGUnO1xuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYXRhRmluZGVyc01vZHVsZSB9IGZyb20gJy4vZGF0YS1maW5kZXJzL0RhdGFGaW5kZXJzTW9kdWxlJztcbmltcG9ydCB7IERhdGFVcGRhdGVyc01vZHVsZSB9IGZyb20gJy4vZGF0YS11cGRhdGVycy9EYXRhVXBkYXRlcnNNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YVByb2R1Y2VyTW9kdWxlIH0gZnJvbSAnLi9kYXRhLXByb2R1Y2Vycy9EYXRhUHJvZHVjZXJNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YVJlbW92ZXJzTW9kdWxlIH0gZnJvbSAnLi9kYXRhLXJlbW92ZXJzL0RhdGFSZW1vdmVyc01vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYXRhRmluZGVyc01vZHVsZSwgRGF0YVByb2R1Y2VyTW9kdWxlLCBEYXRhVXBkYXRlcnNNb2R1bGUsIERhdGFSZW1vdmVyc01vZHVsZV0sXG4gICAgZXhwb3J0czogW0RhdGFGaW5kZXJzTW9kdWxlLCBEYXRhUHJvZHVjZXJNb2R1bGUsIERhdGFVcGRhdGVyc01vZHVsZSwgRGF0YVJlbW92ZXJzTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgRGFsTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGJNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGIvRGJNb2R1bGUnO1xuXG5pbXBvcnQgeyBNZXNzYWdlRGF0YUZpbmRlciB9IGZyb20gJy4vTWVzc2FnZURhdGFGaW5kZXInO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGJNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VEYXRhRmluZGVyXSxcbiAgICBleHBvcnRzOiBbTWVzc2FnZURhdGFGaW5kZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhRmluZGVyc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUsIE9uTW9kdWxlSW5pdCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3BnJztcbmltcG9ydCAqIGFzIERCTWlncmF0ZSBmcm9tICdkYi1taWdyYXRlJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcbmltcG9ydCB7IGRiQ29uZmlnLCBtaWdyYXRlQ29uZmlnIH0gZnJvbSAnQGNoYXQvZW52JztcblxuQE1vZHVsZSh7XG4gICAgZXhwb3J0czogW0NsaWVudF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IENsaWVudCxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBDbGllbnQoZGJDb25maWcpLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERiTW9kdWxlIGltcGxlbWVudHMgT25Nb2R1bGVJbml0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ0RiTW9kdWxlJyk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBkYm1pZ3JhdGUgPSBEQk1pZ3JhdGUuZ2V0SW5zdGFuY2UodHJ1ZSwgbWlncmF0ZUNvbmZpZyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQpIHtcbiAgICB9XG5cbiAgICBvbk1vZHVsZUluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmRibWlncmF0ZSkge1xuICAgICAgICAgICAgZnJvbSh0aGlzLmRibWlncmF0ZS51cCgpKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbygnTWlncmF0aW9ucyBhcHBsaWVkIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYi5jb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkYi1taWdyYXRlXCIpOyIsImltcG9ydCB7IENsaWVudENvbmZpZyB9IGZyb20gJ3BnJztcblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnY7XG5cbmV4cG9ydCBjb25zdCBkYkNvbmZpZzogQ2xpZW50Q29uZmlnID0ge1xuICAgIGhvc3Q6IGVudi5EQl9IT1NUIHx8ICdsb2NhbGhvc3QnLFxuICAgIHBvcnQ6ICtlbnYuREJfUE9SVCB8fCA1NDMyLFxuICAgIHVzZXI6IGVudi5EQl9VU0VSTkFNRSB8fCAncG9zdGdyZXMnLFxuICAgIHBhc3N3b3JkOiBlbnYuREJfUEFTU1dPUkQgfHwgJ3Bvc3RncmVzJyxcbiAgICBkYXRhYmFzZTogZW52LkRCX0RBVEFCQVNFX0NIQVQgfHwgJ2NoYXQnLFxuICAgIGtlZXBBbGl2ZTogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBtaWdyYXRlQ29uZmlnID0ge1xuICAgIGN3ZDogYC4vYXBwcy9jaGF0L3NyYy9zZXJ2aWNlcy9kYWwvZGJgLFxuICAgIGVudjogJ2NoYXQnLFxuICAgIHN0cmluZzogJy4vZGF0YWJhc2UuanNvbicsXG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3BnJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhRmluZGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZGI6IENsaWVudCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNZXNzYWdlT25lKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFwaS5jaGF0Lk1lc3NhZ2U+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgc2VsZWN0ICogZnJvbSBhcGlfbWVzc2FnZSB3aGVyZSBpZCA9ICQxYDtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmRiLnF1ZXJ5PGFwaS5jaGF0Lk1lc3NhZ2U+KHF1ZXJ5LCBbaWRdKSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzLnJvd3NbMF0pKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWVzc2FnZUFsbCgpOiBPYnNlcnZhYmxlPGFwaS5jaGF0Lk1lc3NhZ2VbXT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBzZWxlY3QgKiBmcm9tIGFwaV9tZXNzYWdlIG9yZGVyIGJ5IFwidXBkYXRlZEF0XCIgQVNDYDtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmRiLnF1ZXJ5PGFwaS5jaGF0Lk1lc3NhZ2U+KHF1ZXJ5KSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzLnJvd3MpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IERiTW9kdWxlIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RiL0RiTW9kdWxlJztcbmltcG9ydCB7IERhdGFGaW5kZXJzTW9kdWxlIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZSc7XG5cbmltcG9ydCB7IE1lc3NhZ2VEYXRhVXBkYXRlciB9IGZyb20gJy4vTWVzc2FnZURhdGFVcGRhdGVyJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0RiTW9kdWxlLCBEYXRhRmluZGVyc01vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbTWVzc2FnZURhdGFVcGRhdGVyXSxcbiAgICBleHBvcnRzOiBbTWVzc2FnZURhdGFVcGRhdGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVVwZGF0ZXJzTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgYXBpIGFzIGNoYXRBcGkgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L21lc3NhZ2UnO1xuaW1wb3J0IHsgYXBpIGFzIGNoYXRUeXBlcyB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC50eXBlcyc7XG5pbXBvcnQgeyBNZXNzYWdlRGF0YUZpbmRlciB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvTWVzc2FnZURhdGFGaW5kZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGFVcGRhdGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZURhdGFGaW5kZXI6IE1lc3NhZ2VEYXRhRmluZGVyLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVNZXNzYWdlKGRhdGE6IGNoYXRBcGkuY2hhdC5FZGl0TWVzc2FnZVJlcSk6IE9ic2VydmFibGU8Y2hhdFR5cGVzLmNoYXQuTWVzc2FnZT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGB1cGRhdGUgYXBpX21lc3NhZ2Ugc2V0IG1lc3NhZ2UgPSAkMSB3aGVyZSBpZCA9ICQyYDtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLm1lc3NhZ2VEYXRhRmluZGVyLmdldE1lc3NhZ2VPbmUoZGF0YS5pZCkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLmRiLnF1ZXJ5PGNoYXRUeXBlcy5jaGF0Lk1lc3NhZ2U+KHF1ZXJ5LCBbZGF0YS5tZXNzYWdlLCBkYXRhLmlkXSkpKSxcbiAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLnJvd3NbMF0pLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGJNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGIvRGJNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YUZpbmRlcnNNb2R1bGUgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL0RhdGFGaW5kZXJzTW9kdWxlJztcblxuaW1wb3J0IHsgTWVzc2FnZURhdGFQcm9kdWNlciB9IGZyb20gJy4vTWVzc2FnZURhdGFQcm9kdWNlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW01lc3NhZ2VEYXRhUHJvZHVjZXJdLFxuICAgIGV4cG9ydHM6IFtNZXNzYWdlRGF0YVByb2R1Y2VyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVByb2R1Y2VyTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC50eXBlcyc7XG5cbmludGVyZmFjZSBJSW5zZXJ0TWVzc2FnZSB7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGF1dGhvcjogeyBpZDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGF2YXRhcjogc3RyaW5nOyB9O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZURhdGFQcm9kdWNlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UoZGF0YTogSUluc2VydE1lc3NhZ2UpOiBPYnNlcnZhYmxlPGFwaS5jaGF0Lk1lc3NhZ2U+IHtcbiAgICAgICAgY29uc3QgYXV0b3IgPSBKU09OLnN0cmluZ2lmeShkYXRhLmF1dGhvcik7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYGluc2VydCBpbnRvIGFwaV9tZXNzYWdlIChhdXRob3IsIG1lc3NhZ2UpIHZhbHVlcyAoJDEsICQyKSByZXR1cm5pbmcgKmA7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5kYi5xdWVyeTxhcGkuY2hhdC5NZXNzYWdlPihxdWVyeSwgW2F1dG9yLCBkYXRhLm1lc3NhZ2VdKSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzLnJvd3NbMF0pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IERiTW9kdWxlIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RiL0RiTW9kdWxlJztcbmltcG9ydCB7IERhdGFGaW5kZXJzTW9kdWxlIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZSc7XG5cbmltcG9ydCB7IE1lc3NhZ2VEYXRhUmVtb3ZlciB9IGZyb20gJy4vTWVzc2FnZURhdGFSZW1vdmVyJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0RiTW9kdWxlLCBEYXRhRmluZGVyc01vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbTWVzc2FnZURhdGFSZW1vdmVyXSxcbiAgICBleHBvcnRzOiBbTWVzc2FnZURhdGFSZW1vdmVyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVJlbW92ZXJzTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIG1hcFRvIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L2NoYXQudHlwZXMnO1xuaW1wb3J0IHsgTWVzc2FnZURhdGFGaW5kZXIgfSBmcm9tICdAY2hhdC9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL01lc3NhZ2VEYXRhRmluZGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhUmVtb3ZlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50LFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VEYXRhRmluZGVyOiBNZXNzYWdlRGF0YUZpbmRlcixcbiAgICApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWVzc2FnZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYGRlbGV0ZSBmcm9tIGFwaV9tZXNzYWdlIHdoZXJlIGlkID0gJDFgO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VEYXRhRmluZGVyLmdldE1lc3NhZ2VPbmUoaWQpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLmRiLnF1ZXJ5PGFwaS5jaGF0Lk1lc3NhZ2U+KHF1ZXJ5LCBbaWRdKSkpLFxuICAgICAgICAgICAgbWFwVG8obnVsbCksXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoYXRFdmVudFNlcnZpY2Uge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlcyQgPSBuZXcgU3ViamVjdDxhcGkuY2hhdC5NZXNzYWdlW10+KCk7XG5cbiAgICBwdWJsaWMgZW1pdChtZXNzYWdlOiBhcGkuY2hhdC5NZXNzYWdlKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlcyQubmV4dChbbWVzc2FnZV0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBicm9hZGNhc3QoKTogT2JzZXJ2YWJsZTxhcGkuY2hhdC5NZXNzYWdlW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlcyQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29udHJvbGxlciwgVXNlR3VhcmRzLCBVc2VGaWx0ZXJzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgR3JwY01ldGhvZCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEp3dEd1YXJkIH0gZnJvbSAnQGxpYi9qd3QvSnd0R3VhcmQnO1xuaW1wb3J0IHsgUnBjRXhjZXB0aW9uRmlsdGVyIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcbmltcG9ydCB7IElkZW50aXR5IH0gZnJvbSAnQGxpYi91dGlscy9pZGVudGl0eSc7XG5cbmltcG9ydCB7IGFwaSBhcyBjaGF0QXBpVHlwZXMgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L2NoYXQudHlwZXMnO1xuaW1wb3J0IHsgYXBpIGFzIGNoYXRBcGkgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L2NoYXQnO1xuXG5pbXBvcnQgeyBDaGF0U2VydmljZSB9IGZyb20gJy4vQ2hhdFNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcigpXG5leHBvcnQgY2xhc3MgQ2hhdENvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjaGF0U2VydmljZTogQ2hhdFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBAVXNlR3VhcmRzKEp3dEd1YXJkKVxuICAgIEBHcnBjTWV0aG9kKCdDaGF0U2VydmljZScsICdHZXRDaGF0JylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdDaGF0U2VydmljZTo6Z2V0Q2hhdCcpKVxuICAgIHB1YmxpYyBnZXRDaGF0KGRhdGE6IElkZW50aXR5PGNoYXRBcGlUeXBlcy5jaGF0LlN0dWI+KTogT2JzZXJ2YWJsZTxjaGF0QXBpLmNoYXQuQ2hhdExpc3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhdFNlcnZpY2UuZ2V0Q2hhdFN0cmVhbSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBzdGF0dXMgfSBmcm9tICdncnBjJztcblxuaW1wb3J0IHsgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuY29uc3QgVE9LRU5fSEVBREVSX05BTUUgPSAnYXV0aG9yaXphdGlvbic7XG5jb25zdCBERUNPRElOR19PUFRJT05TID0ge1xuICAgIGFsZ29yaXRobXM6IFsnUlMyNTYnXSxcbn07XG5cbmV4cG9ydCBjbGFzcyBKd3RHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgICBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBjb250ZXh0LmdldEFyZ0J5SW5kZXgoMSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbWV0YS5nZXQoVE9LRU5fSEVBREVSX05BTUUpWzBdO1xuXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBtZXRhLnBheWxvYWQgPSB2ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9QVUIsIERFQ09ESU5HX09QVElPTlMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBScGNFeGNlcHRpb24oe2NvZGU6IHN0YXR1cy5VTkFVVEhFTlRJQ0FURUQsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncnBjXCIpOyIsImV4cG9ydCAqIGZyb20gJy4vaW1wbCc7XG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci9ScGNFeGNlcHRpb25GaWx0ZXInO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb2RlLnR5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vTm90Rm91bmRFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0ludGVybmFsRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVW5hdmFpbGFibGVFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24nO1xuIiwiZXhwb3J0IGludGVyZmFjZSBJRXJyb3Ige1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEVDb2RlcyB7XG4gICAgRVJST1JfQ09ERV9VTkRFRklORUQgPSAwLFxuICAgIC8vIGludmFsaWQgYXJndW1lbnQgY29kZXNcbiAgICBJTlZBTElEX0FSR1VNRU5UID0gMyxcbiAgICAvLyByZXF1aXJlZCBjb2Rlc1xuICAgIFVTRVJfSURfUkVRVUlSRUQgPSAzMDEsXG4gICAgLy8gbm90IGZvdW5kIGNvZGVzXG4gICAgTk9UX0ZPVU5EID0gNSxcbiAgICBVU0VSX05PVF9GT1VORCA9IDUwMSxcbiAgICAvLyBhbHJlYWR5IGV4aXN0IGNvZGVzXG4gICAgQUxSRUFEWV9FWElTVCA9IDYsXG4gICAgRU1BSUxfQUxSRUFEWV9FWElTVFMgPSA2MDEsXG4gICAgLy8gcGVybWlzc2lvbiBkZW5pZWQgY29kZXNcbiAgICBQRVJNSVNTSU9OX0RFTklFRCA9IDcsXG4gICAgLy8gaW50ZXJuYWwgZXJyb3IgY29kZXNcbiAgICBJTlRFUk5BTF9FUlJPUiA9IDEzLFxuICAgIC8vIHVuYXZhaWxhYmxlIGNvZGVzXG4gICAgVU5BVkFJTEFCTEUgPSAxNCxcbiAgICAvLyB1bmF1dGhlbnRpY2F0ZWQgY29kZXNcbiAgICBVTkFVVEhFTlRJQ0FURUQgPSAxNixcbiAgICBUT0tFTl9JTlZBTElEID0gMTYwMDEsXG4gICAgVE9LRU5fRVhQSVJFRCA9IDE2MDAyLFxuICAgIEFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCA9IDE2MDAzLFxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5WQUxJRF9BUkdVTUVOVDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5JTlZBTElEX0FSR1VNRU5ULFxuICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGFyZ3VtZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBVU0VSX0lEX1JFUVVJUkVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVTRVJfSURfUkVRVUlSRUQsXG4gICAgbWVzc2FnZTogJ1VzZXIgaWQgaXMgcmVxdWlyZWQnLFxufTtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBJTlZBTElEX0FSR1VNRU5ULCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW50ZXJmYWNlIElFcnJvckNvZGUge1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEVycm9yQ29kZVR5cGUgPSBJRXJyb3JDb2RlIHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YVR5cGUge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VFeGNlcHRpb24gZXh0ZW5kcyBScGNFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogSUVycm9yQ29kZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUuY29kZSxcblxuICAgICAgICAgICAgLy8gc28gZmFyIGl0IGhhcyBub3QgYmVlbiBwb3NzaWJsZSB0byBmaW5kIG5vcm1hbCB3YXlzIGluIE5lc3RcbiAgICAgICAgICAgIC8vIHRvIHRyYW5zbWl0IHRoZSBtZXRhZGF0YSBpbiByZXNwb25zZSB3aXRoIGFuIGVycm9yLFxuICAgICAgICAgICAgLy8gc28gd2Ugd2lsbCBzZXcgdGhpcyBkYXRhIGludG8gdGhlIG1lc3NhZ2UgYm9keVxuICAgICAgICAgICAgbWVzc2FnZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yQ29kZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IE5PVF9GT1VORDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ05vdCBmb3VuZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVVNFUl9OT1RfRk9VTkQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVVNFUl9OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ1VzZXIgbm90IGZvdW5kJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBOT1RfRk9VTkQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBBTFJFQURZX0VYSVNUOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFMUkVBRFlfRVhJU1QsXG4gICAgbWVzc2FnZTogJ1Jlc291cmNlIGFscmVhZHkgZXhpc3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFTUFJTF9BTFJFQURZX0VYSVNUUzogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5FTUFJTF9BTFJFQURZX0VYSVNUUyxcbiAgICBtZXNzYWdlOiAnRW1haWwgYWxyZWFkeSBleGlzdHMnLFxufTtcblxuZXhwb3J0IGNsYXNzIEFscmVhZHlFeGlzdHNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgQUxSRUFEWV9FWElTVCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IFBFUk1JU1NJT05fREVOSUVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlBFUk1JU1NJT05fREVOSUVELFxuICAgIG1lc3NhZ2U6ICdQZXJtaXNzaW9uIGRlbmllZCcsXG59O1xuXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBQRVJNSVNTSU9OX0RFTklFRCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0VSUk9SOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLklOVEVSTkFMX0VSUk9SLFxuICAgIG1lc3NhZ2U6ICdJbnRlcm5hbCBlcnJvcicsXG59O1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgSU5URVJOQUxfRVJST1IsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRTogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5VTkFWQUlMQUJMRSxcbiAgICBtZXNzYWdlOiAnUmVzb3VyY2UgdW5hdmFpbGFibGUnLFxufTtcblxuZXhwb3J0IGNsYXNzIFVuYXZhaWxhYmxlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IFVOQVZBSUxBQkxFLCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgVU5BVVRIRU5USUNBVEVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVOQVVUSEVOVElDQVRFRCxcbiAgICBtZXNzYWdlOiAnVW5hdXRoZW50aWNhdGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUT0tFTl9JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlRPS0VOX0lOVkFMSUQsXG4gICAgbWVzc2FnZTogJ1Rva2VuIGludmFsaWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0VYUElSRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVE9LRU5fRVhQSVJFRCxcbiAgICBtZXNzYWdlOiAnVG9rZW4gZXhwaXJlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgQVVUSF9DUkVERU5USUFMU19JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCxcbiAgICBtZXNzYWdlOiAnQXV0aCBjcmVkZW50aWFscyBpbnZhbGlkJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgVU5BVVRIRU5USUNBVEVELCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2F0Y2gsIEFyZ3VtZW50c0hvc3QgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlUnBjRXhjZXB0aW9uRmlsdGVyIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSwgRVhDRVBUSU9OX0xJU1QgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvRXhjZXB0aW9uSGFuZGxlckZhY3RvcnknO1xuXG5AQ2F0Y2goLi4uRVhDRVBUSU9OX0xJU1QpXG5leHBvcnQgY2xhc3MgUnBjRXhjZXB0aW9uRmlsdGVyIGV4dGVuZHMgQmFzZVJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBleGNlcHRpb25IYW5kbGVyRmFjdG9yeTogSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5O1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3IobGFiZWw6IHN0cmluZyk6IFJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgICAgIHJldHVybiBuZXcgUnBjRXhjZXB0aW9uRmlsdGVyKGxhYmVsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBmb3IgdGhlIGFkbWluIHBhbmVsLCB5b3UgZG9u4oCZdCBuZWVkIHRvIG1vbml0b3IgZXJyb3JzXG4gICAgICAgIC8vIHN1Y2ggYXMgZnJvbSBDb3VjaERiLCBzbyB3ZSBwYXNzIHNlcGFyYXRlIEFkbWluRXhjZXB0aW9uSGFuZGxlckZhY3RvcnkgdG8gaXQsXG4gICAgICAgIC8vIGFuZCBmb3Igd2ViLWJhY2tlbmQgLSBXZWJCYWNrRXhjZXB0aW9uSGFuZGxlckZhY3RvcnlcbiAgICAgICAgdGhpcy5leGNlcHRpb25IYW5kbGVyRmFjdG9yeSA9IG5ldyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSh0aGlzLmxhYmVsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2F0Y2goZXhjZXB0aW9uOiBFeGNlcHRpb25UeXBlLCBob3N0OiBBcmd1bWVudHNIb3N0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXhjZXB0aW9uSGFuZGxlckZhY3RvcnkuZ2V0SGFuZGxlcihleGNlcHRpb24pO1xuXG4gICAgICAgIGhhbmRsZXIud2FybkFib3V0RXJyb3IoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuY2F0Y2goaGFuZGxlci53cmFwRXJyb3IoKSwgaG9zdCBhcyBhbnkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhjZXB0aW9uVHlwZSA9IEVycm9yIHwgUnBjRXhjZXB0aW9uIHwgQmFzZUV4Y2VwdGlvbjtcblxuZXhwb3J0IGNvbnN0IEVYQ0VQVElPTl9MSVNUID0gW0Vycm9yLCBScGNFeGNlcHRpb24sIEJhc2VFeGNlcHRpb25dO1xuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIsIElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvUnBjRXhjZXB0aW9uSGFuZGxlcic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGFuZGxlcihleGNlcHRpb246IEV4Y2VwdGlvblR5cGUpOiBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgICAgIC8vIGhhbmRsZSByZWd1bGFyIGV4Y2VwdGlvbnMgZnJvbSBjdXJyZW50IG1pY3Jvc2VydmljZXNcbiAgICAgICAgaWYgKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIFJwY0V4Y2VwdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBScGNFeGNlcHRpb25IYW5kbGVyKGV4Y2VwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgYWxsIG90aGVyIGludGVybmFsIGV4Y2VwdGlvbnNcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIoZXhjZXB0aW9uLCB0aGlzLmxhYmVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIFJwY0V4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdScGNFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogQmFzZUV4Y2VwdGlvbikge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIC8vIG5vdCBuZWVkIHRvIGhhbmRsZSB0aGlzIGVycm9yLFxuICAgICAgICAvLyBiZWNhdXNlIGl0IHJlZ3VsYXIgZXhjZXB0aW9uIGZyb20gYmFja2VuZCBzZXJ2aWNlc1xuICAgICAgICByZXR1cm4gdGhpcy5leGNlcHRpb247XG4gICAgfVxuXG4gICAgcHVibGljIHdhcm5BYm91dEVycm9yKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7bWVzc2FnZX06IGFueSA9IHRoaXMuZXhjZXB0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgSW50ZXJuYWwgZXhjZXB0aW9uOiAke21lc3NhZ2V9YCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvQmFzZUV4Y2VwdGlvbic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvSW50ZXJuYWxFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyIGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogRXJyb3IsIHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgSW50ZXJuYWxFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybkFib3V0RXJyb3IoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtzdGFjaywgbWVzc2FnZX0gPSB0aGlzLmV4Y2VwdGlvbjtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYCR7dGhpcy5sYWJlbH0gOjogSW50ZXJuYWwgZXJyb3IgXCIke21lc3NhZ2V9XCIsXFxuU3RhY2s6ICR7c3RhY2t9YCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbmNhdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L2NoYXQnO1xuXG5pbXBvcnQgeyBNZXNzYWdlRGF0YUZpbmRlciB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvTWVzc2FnZURhdGFGaW5kZXInO1xuaW1wb3J0IHsgQ2hhdEV2ZW50U2VydmljZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL0NoYXRFdmVudFNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hhdFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZURhdGFGaW5kZXI6IE1lc3NhZ2VEYXRhRmluZGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNoYXRFdmVudFNlcnZpY2U6IENoYXRFdmVudFNlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENoYXRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhcGkuY2hhdC5DaGF0TGlzdD4ge1xuICAgICAgICByZXR1cm4gY29uY2F0KHRoaXMubWVzc2FnZURhdGFGaW5kZXIuZ2V0TWVzc2FnZUFsbCgpLCB0aGlzLmNoYXRFdmVudFNlcnZpY2UuYnJvYWRjYXN0KCkpXG4gICAgICAgICAgICAucGlwZShtYXAobWVzc2FnZXMgPT4gKHttZXNzYWdlc30pKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJ2aWNlc01vZHVsZSB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL1NlcnZpY2VzTW9kdWxlJztcblxuaW1wb3J0IHsgTWVzc2FnZUNvbnRyb2xsZXIgfSBmcm9tICcuL01lc3NhZ2VDb250cm9sbGVyJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9NZXNzYWdlU2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTZXJ2aWNlc01vZHVsZV0sXG4gICAgY29udHJvbGxlcnM6IFtNZXNzYWdlQ29udHJvbGxlcl0sXG4gICAgcHJvdmlkZXJzOiBbTWVzc2FnZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIFVzZUd1YXJkcywgVXNlRmlsdGVycyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEdycGNNZXRob2QgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBKd3RHdWFyZCB9IGZyb20gJ0BsaWIvand0L0p3dEd1YXJkJztcbmltcG9ydCB7IElKd3RNZXRhIH0gZnJvbSAnQGxpYi9qd3QvSnd0SW50ZXJmYWNlJztcbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkZpbHRlciB9IGZyb20gJ0BsaWIvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7IGFwaSBhcyBjaGF0RW51bSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC5lbnVtJztcbmltcG9ydCB7IGFwaSBhcyBjaGF0QXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0JztcblxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuL01lc3NhZ2VTZXJ2aWNlJztcblxuaW1wb3J0IHsgQWRkTWVzc2FnZVJlcURUTyB9IGZyb20gJy4vZHRvL0FkZE1lc3NhZ2VSZXFEVE8nO1xuaW1wb3J0IHsgRWRpdE1lc3NhZ2VSZXFEVE8gfSBmcm9tICcuL2R0by9FZGl0TWVzc2FnZVJlcURUTyc7XG5pbXBvcnQgeyBEZWxldGVNZXNzYWdlUmVxRFRPIH0gZnJvbSAnLi9kdG8vRGVsZXRlTWVzc2FnZVJlcURUTyc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge1xuICAgIH1cblxuICAgIEBVc2VHdWFyZHMoSnd0R3VhcmQpXG4gICAgQEdycGNNZXRob2QoJ01lc3NhZ2VTZXJ2aWNlJywgJ1NlbmRNZXNzYWdlJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdNZXNzYWdlU2VydmljZTo6c2VuZE1lc3NhZ2UnKSlcbiAgICBwdWJsaWMgc2VuZE1lc3NhZ2UoZGF0YTogQWRkTWVzc2FnZVJlcURUTywgbWV0YTogSUp3dE1ldGE8eyBpZDogc3RyaW5nOyB9Pik6IE9ic2VydmFibGU8Y2hhdEFwaS5jaGF0LkNoYXRSZXM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2VuZE1lc3NhZ2UoZGF0YSwgbWV0YS5wYXlsb2FkLmlkKS5waXBlKFxuICAgICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBjaGF0RW51bS5jaGF0LkVTdGF0dXMuU1VDQ0VTUyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYE1lc3NhZ2UgY3JlYXRlZCBzdWNjZXNzZnVsbHlgLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBAVXNlR3VhcmRzKEp3dEd1YXJkKVxuICAgIEBHcnBjTWV0aG9kKCdNZXNzYWdlU2VydmljZScsICdFZGl0TWVzc2FnZScpXG4gICAgQFVzZUZpbHRlcnMoUnBjRXhjZXB0aW9uRmlsdGVyLmZvcignTWVzc2FnZVNlcnZpY2U6OmVkaXRNZXNzYWdlJykpXG4gICAgcHVibGljIGVkaXRNZXNzYWdlKGRhdGE6IEVkaXRNZXNzYWdlUmVxRFRPKTogT2JzZXJ2YWJsZTxjaGF0QXBpLmNoYXQuQ2hhdFJlcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlU2VydmljZS5lZGl0TWVzc2FnZShkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGNoYXRFbnVtLmNoYXQuRVN0YXR1cy5TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgTWVzc2FnZXMgdXBkYXRlIHN1Y2Nlc3NmdWxseWAsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBVc2VHdWFyZHMoSnd0R3VhcmQpXG4gICAgQEdycGNNZXRob2QoJ01lc3NhZ2VTZXJ2aWNlJywgJ0RlbGV0ZU1lc3NhZ2UnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ01lc3NhZ2VTZXJ2aWNlOjpkZWxldGVNZXNzYWdlJykpXG4gICAgcHVibGljIGRlbGV0ZU1lc3NhZ2UoZGF0YTogRGVsZXRlTWVzc2FnZVJlcURUTyk6IE9ic2VydmFibGU8Y2hhdEFwaS5jaGF0LkNoYXRSZXM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZVNlcnZpY2UuZGVsZXRlTWVzc2FnZShkYXRhLmlkKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGNoYXRFbnVtLmNoYXQuRVN0YXR1cy5TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgTWVzc2FnZSBkZWxldGUgc3VjY2Vzc2Z1bGx5YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIik7IiwiLyplc2xpbnQtZGlzYWJsZSBibG9jay1zY29wZWQtdmFyLCBpZC1sZW5ndGgsIG5vLWNvbnRyb2wtcmVnZXgsIG5vLW1hZ2ljLW51bWJlcnMsIG5vLXByb3RvdHlwZS1idWlsdGlucywgbm8tcmVkZWNsYXJlLCBuby1zaGFkb3csIG5vLXZhciwgc29ydC12YXJzKi9cbihmdW5jdGlvbihnbG9iYWwsIGZhY3RvcnkpIHsgLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgbW9kdWxlICovXG5cbiAgICAvKiBBTUQgKi8gaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcbiAgICAgICAgZGVmaW5lKFtcInByb3RvYnVmanMvbWluaW1hbFwiXSwgZmFjdG9yeSk7XG5cbiAgICAvKiBDb21tb25KUyAqLyBlbHNlIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicHJvdG9idWZqcy9taW5pbWFsXCIpKTtcblxufSkodGhpcywgZnVuY3Rpb24oJHByb3RvYnVmKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcbiAgICBcbiAgICB2YXIgJHJvb3QgPSAkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdIHx8ICgkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdID0ge30pO1xuICAgIFxuICAgICRyb290LmFwaSA9IChmdW5jdGlvbigpIHtcbiAgICBcbiAgICAgICAgdmFyIGFwaSA9IHt9O1xuICAgIFxuICAgICAgICBhcGkuY2hhdCA9IChmdW5jdGlvbigpIHtcbiAgICBcbiAgICAgICAgICAgIHZhciBjaGF0ID0ge307XG4gICAgXG4gICAgICAgICAgICBjaGF0LkVTdGF0dXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlc0J5SWQgPSB7fSwgdmFsdWVzID0gT2JqZWN0LmNyZWF0ZSh2YWx1ZXNCeUlkKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbdmFsdWVzQnlJZFswXSA9IFwiVU5LTk9XTlwiXSA9IDA7XG4gICAgICAgICAgICAgICAgdmFsdWVzW3ZhbHVlc0J5SWRbMV0gPSBcIlNVQ0NFU1NcIl0gPSAxO1xuICAgICAgICAgICAgICAgIHZhbHVlc1t2YWx1ZXNCeUlkWzJdID0gXCJFUlJPUlwiXSA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH0pKCk7XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gY2hhdDtcbiAgICAgICAgfSkoKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGFwaTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuICRyb290O1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm90b2J1ZmpzL21pbmltYWxcIik7IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25Nb2R1bGVJbml0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50LCBDbGllbnRHcnBjIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcFRvLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgZ3JwY1VzZXIgfSBmcm9tICdAbGliL3V0aWxzL0dycGNDb25maWdzJztcblxuaW1wb3J0IHsgYXBpIGFzIGNoYXRBcGkgfSBmcm9tICdAZ3JwYy1wcm90by9jaGF0L21lc3NhZ2UnO1xuaW1wb3J0IHsgYXBpIGFzIHVzZXJBcGkgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXInO1xuXG5pbXBvcnQgeyBNZXNzYWdlRGF0YVByb2R1Y2VyIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RhdGEtcHJvZHVjZXJzL01lc3NhZ2VEYXRhUHJvZHVjZXInO1xuaW1wb3J0IHsgTWVzc2FnZURhdGFSZW1vdmVyIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvZGFsL2RhdGEtcmVtb3ZlcnMvTWVzc2FnZURhdGFSZW1vdmVyJztcbmltcG9ydCB7IE1lc3NhZ2VEYXRhVXBkYXRlciB9IGZyb20gJ0BjaGF0L3NlcnZpY2VzL2RhbC9kYXRhLXVwZGF0ZXJzL01lc3NhZ2VEYXRhVXBkYXRlcic7XG5pbXBvcnQgeyBDaGF0RXZlbnRTZXJ2aWNlIH0gZnJvbSAnQGNoYXQvc2VydmljZXMvQ2hhdEV2ZW50U2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZSBpbXBsZW1lbnRzIE9uTW9kdWxlSW5pdCB7XG5cbiAgICBAQ2xpZW50KGdycGNVc2VyKSBwcml2YXRlIHJlYWRvbmx5IGdycGNVc2VyQ2xpZW50OiBDbGllbnRHcnBjO1xuICAgIHByaXZhdGUgZ3JwY1VzZXJTZXJ2aWNlOiB1c2VyQXBpLnVzZXIuVXNlclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBtZXNzYWdlRGF0YVByb2R1Y2VyOiBNZXNzYWdlRGF0YVByb2R1Y2VyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VEYXRhVXBkYXRlcjogTWVzc2FnZURhdGFVcGRhdGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VEYXRhUmVtb3ZlcjogTWVzc2FnZURhdGFSZW1vdmVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNoYXRFdmVudFNlcnZpY2U6IENoYXRFdmVudFNlcnZpY2UsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgb25Nb2R1bGVJbml0KCkge1xuICAgICAgICB0aGlzLmdycGNVc2VyU2VydmljZSA9IHRoaXMuZ3JwY1VzZXJDbGllbnQuZ2V0U2VydmljZTx1c2VyQXBpLnVzZXIuVXNlclNlcnZpY2U+KCdVc2VyU2VydmljZScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZW5kTWVzc2FnZShkYXRhOiBjaGF0QXBpLmNoYXQuU2VuZE1lc3NhZ2VSZXEsIHVzZXJJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdycGNVc2VyU2VydmljZS5nZXRVc2VyKHtpZDogdXNlcklkfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN3aXRjaE1hcCh1c2VyID0+IHRoaXMubWVzc2FnZURhdGFQcm9kdWNlci5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF2YXRhcjogdXNlci5hdmF0YXIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgICAgIHRhcChyZXMgPT4gdGhpcy5jaGF0RXZlbnRTZXJ2aWNlLmVtaXQocmVzKSksXG4gICAgICAgICAgICAgICAgbWFwVG8obnVsbCksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBlZGl0TWVzc2FnZShkYXRhOiBjaGF0QXBpLmNoYXQuRWRpdE1lc3NhZ2VSZXEpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZURhdGFVcGRhdGVyLnVwZGF0ZU1lc3NhZ2UoZGF0YSlcbiAgICAgICAgICAgIC5waXBlKG1hcFRvKG51bGwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTWVzc2FnZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VEYXRhUmVtb3Zlci5kZWxldGVNZXNzYWdlKGlkKVxuICAgICAgICAgICAgLnBpcGUobWFwVG8obnVsbCkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IElzRGVmaW5lZCwgSXNTdHJpbmcsIE1heExlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvbWVzc2FnZSc7XG5cbmV4cG9ydCBjbGFzcyBBZGRNZXNzYWdlUmVxRFRPIGltcGxlbWVudHMgYXBpLmNoYXQuU2VuZE1lc3NhZ2VSZXEge1xuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCg1MDApXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsYXNzLXZhbGlkYXRvclwiKTsiLCJpbXBvcnQgeyBJc1VVSUQsIElzRGVmaW5lZCwgSXNTdHJpbmcsIE1heExlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvbWVzc2FnZSc7XG5cbmV4cG9ydCBjbGFzcyBFZGl0TWVzc2FnZVJlcURUTyBpbXBsZW1lbnRzIGFwaS5jaGF0LkVkaXRNZXNzYWdlUmVxIHtcbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNVVUlEKClcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcblxuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCg1MDApXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IElzVVVJRCwgSXNEZWZpbmVkIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9tZXNzYWdlJztcblxuZXhwb3J0IGNsYXNzIERlbGV0ZU1lc3NhZ2VSZXFEVE8gaW1wbGVtZW50cyBhcGkuY2hhdC5EZWxldGVNZXNzYWdlUmVxIHtcbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNVVUlEKClcbiAgICBwdWJsaWMgaWQ6IHN0cmluZztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=