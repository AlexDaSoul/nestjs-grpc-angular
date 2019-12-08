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
exports.logger = new logger_1.BootstrapLogger();
common_1.Logger.overrideLogger(exports.logger);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(AppModule_1.AppModule, GrpcConfigs_1.grpcUser);
    app.useLogger(exports.logger);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listenAsync();
}
bootstrap().catch(err => {
    exports.logger.error(err);
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
const UserModule_1 = __webpack_require__(18);
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        imports: [UserModule_1.UserModule],
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
const UserController_1 = __webpack_require__(51);
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [ServicesModule_1.ServicesModule],
        controllers: [UserController_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;


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
const UserService_1 = __webpack_require__(50);
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        imports: [DalModule_1.DalModule],
        providers: [UserService_1.UserService],
        exports: [UserService_1.UserService],
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
const DataUpdatersModule_1 = __webpack_require__(44);
const DataProducerModule_1 = __webpack_require__(46);
const DataRemoversModule_1 = __webpack_require__(48);
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
const UserDataFinder_1 = __webpack_require__(26);
let DataFindersModule = class DataFindersModule {
};
DataFindersModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule],
        providers: [UserDataFinder_1.UserDataFinder],
        exports: [UserDataFinder_1.UserDataFinder],
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
exports.SALT = env.SALT || 'SYqSuijVvyUE';
exports.dbConfig = {
    host: env.DB_HOST || 'localhost',
    port: +env.DB_PORT || 5432,
    user: env.DB_USERNAME || 'postgres',
    password: env.DB_PASSWORD || 'postgres',
    database: env.DB_DATABASE_USER || 'user',
    keepAlive: true,
};
exports.migrateConfig = {
    cwd: `./apps/user/src/services/dal/db`,
    env: 'user',
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
const crypto_1 = __webpack_require__(27);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const exceptions_1 = __webpack_require__(28);
const env_1 = __webpack_require__(25);
let UserDataFinder = class UserDataFinder {
    constructor(db) {
        this.db = db;
    }
    getConditionQuery(data) {
        if (data.password) {
            data.password = crypto_1.createHmac('sha512', env_1.SALT).update(data.password).digest('hex');
        }
        const keys = Object.keys(data);
        const conditions = keys.map((key, index) => {
            const and = keys.length > 1 && index < keys.length - 1 ? ' and ' : '';
            return `${key}='${data[key]}'${and}`;
        }).join('');
        return `select * from api_user where ${conditions}`;
    }
    getUserOne(id) {
        const query = `select * from api_user where id = $1`;
        return rxjs_1.from(this.db.query(query, [id]))
            .pipe(operators_1.map(res => {
            if (!res.rowCount) {
                throw new exceptions_1.NotFoundException(exceptions_1.USER_NOT_FOUND);
            }
            return res.rows[0];
        }));
    }
    getUserByConditions(data) {
        const query = this.getConditionQuery(data);
        return rxjs_1.from(this.db.query(query))
            .pipe(operators_1.map(res => res.rows[0]));
    }
    getUsersByIds(ids) {
        let query = `select * from api_user where id in (`;
        ids.forEach((id, index) => {
            const end = index === ids.length - 1 ? `)` : `,`;
            query += `'${id}'${end}`;
        });
        return rxjs_1.from(this.db.query(query))
            .pipe(operators_1.map(res => res.rows));
    }
    getUsersAll() {
        const query = `select * from api_user`;
        return rxjs_1.from(this.db.query(query))
            .pipe(operators_1.map(res => res.rows));
    }
};
UserDataFinder = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client])
], UserDataFinder);
exports.UserDataFinder = UserDataFinder;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(29));
__export(__webpack_require__(39));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(30));
__export(__webpack_require__(31));
__export(__webpack_require__(33));
__export(__webpack_require__(34));
__export(__webpack_require__(35));
__export(__webpack_require__(36));
__export(__webpack_require__(37));
__export(__webpack_require__(38));


/***/ }),
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const BaseException_1 = __webpack_require__(32);
const code_types_1 = __webpack_require__(30);
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
/* 39 */
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
const types_1 = __webpack_require__(40);
const ExceptionHandlerFactory_1 = __webpack_require__(41);
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const BaseException_1 = __webpack_require__(32);
exports.EXCEPTION_LIST = [Error, microservices_1.RpcException, BaseException_1.BaseException];


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = __webpack_require__(12);
const RpcExceptionHandler_1 = __webpack_require__(42);
const InternalExceptionHandler_1 = __webpack_require__(43);
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
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InternalException_1 = __webpack_require__(36);
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
/* 44 */
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
const UserDataUpdater_1 = __webpack_require__(45);
let DataUpdatersModule = class DataUpdatersModule {
};
DataUpdatersModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule, DataFindersModule_1.DataFindersModule],
        providers: [UserDataUpdater_1.UserDataUpdater],
        exports: [UserDataUpdater_1.UserDataUpdater],
    })
], DataUpdatersModule);
exports.DataUpdatersModule = DataUpdatersModule;


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
const common_1 = __webpack_require__(2);
const pg_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const UserDataFinder_1 = __webpack_require__(26);
let UserDataUpdater = class UserDataUpdater {
    constructor(db, userDataFinder) {
        this.db = db;
        this.userDataFinder = userDataFinder;
    }
    updateUser(data, id) {
        const query = `update api_user set name = $1, email = $2, avatar = $3 where id = $4`;
        return rxjs_1.from(this.userDataFinder.getUserOne(id)).pipe(operators_1.switchMap(() => rxjs_1.from(this.db.query(query, [data.name, data.email, data.avatar, id]))), operators_1.map(res => res.rows[0]));
    }
};
UserDataUpdater = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client,
        UserDataFinder_1.UserDataFinder])
], UserDataUpdater);
exports.UserDataUpdater = UserDataUpdater;


/***/ }),
/* 46 */
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
const UserDataProducer_1 = __webpack_require__(47);
let DataProducerModule = class DataProducerModule {
};
DataProducerModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule, DataFindersModule_1.DataFindersModule],
        providers: [UserDataProducer_1.UserDataProducer],
        exports: [UserDataProducer_1.UserDataProducer],
    })
], DataProducerModule);
exports.DataProducerModule = DataProducerModule;


/***/ }),
/* 47 */
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
const crypto_1 = __webpack_require__(27);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const impl_1 = __webpack_require__(29);
const UserDataFinder_1 = __webpack_require__(26);
const env_1 = __webpack_require__(25);
let UserDataProducer = class UserDataProducer {
    constructor(db, userDataFinder) {
        this.db = db;
        this.userDataFinder = userDataFinder;
    }
    createUser(data) {
        data.password = crypto_1.createHmac('sha512', env_1.SALT).update(data.password).digest('hex');
        const query = `insert into api_user (email, name, avatar, password) values ($1, $2, $3, $4)`;
        return this.checkEmailExistence(data.email).pipe(operators_1.switchMap(() => rxjs_1.from(this.db.query(query, [data.email, data.name, data.avatar, data.password]))), operators_1.mapTo(null));
    }
    checkEmailExistence(email) {
        return rxjs_1.from(this.userDataFinder.getUserByConditions({ email })).pipe(operators_1.map(user => {
            if (user) {
                throw new impl_1.AlreadyExistsException(impl_1.EMAIL_ALREADY_EXISTS);
            }
            return null;
        }));
    }
};
UserDataProducer = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client,
        UserDataFinder_1.UserDataFinder])
], UserDataProducer);
exports.UserDataProducer = UserDataProducer;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const DbModule_1 = __webpack_require__(22);
const DataFindersModule_1 = __webpack_require__(21);
const UserDataRemover_1 = __webpack_require__(49);
let DataRemoversModule = class DataRemoversModule {
};
DataRemoversModule = __decorate([
    common_1.Module({
        imports: [DbModule_1.DbModule, DataFindersModule_1.DataFindersModule],
        providers: [UserDataRemover_1.UserDataRemover],
        exports: [UserDataRemover_1.UserDataRemover],
    })
], DataRemoversModule);
exports.DataRemoversModule = DataRemoversModule;


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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const pg_1 = __webpack_require__(23);
const rxjs_1 = __webpack_require__(15);
const operators_1 = __webpack_require__(16);
const UserDataFinder_1 = __webpack_require__(26);
let UserDataRemover = class UserDataRemover {
    constructor(db, userDataFinder) {
        this.db = db;
        this.userDataFinder = userDataFinder;
    }
    deleteUser(id) {
        const query = `delete from api_user where id = $1`;
        return this.userDataFinder.getUserOne(id).pipe(operators_1.switchMap(() => rxjs_1.from(this.db.query(query, [id]))), operators_1.mapTo(null));
    }
};
UserDataRemover = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_1.Client,
        UserDataFinder_1.UserDataFinder])
], UserDataRemover);
exports.UserDataRemover = UserDataRemover;


/***/ }),
/* 50 */
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
const operators_1 = __webpack_require__(16);
const UserDataFinder_1 = __webpack_require__(26);
const UserDataProducer_1 = __webpack_require__(47);
const UserDataRemover_1 = __webpack_require__(49);
const UserDataUpdater_1 = __webpack_require__(45);
let UserService = class UserService {
    constructor(userDataFinder, userDataProducer, userDataUpdater, userDataRemover) {
        this.userDataFinder = userDataFinder;
        this.userDataProducer = userDataProducer;
        this.userDataUpdater = userDataUpdater;
        this.userDataRemover = userDataRemover;
    }
    createUser(data) {
        return this.userDataProducer.createUser(data);
    }
    updateUser(data, id) {
        return this.userDataUpdater.updateUser(data, id)
            .pipe(operators_1.mapTo(null));
    }
    deleteUser(id) {
        return this.userDataRemover.deleteUser(id)
            .pipe(operators_1.mapTo(null));
    }
    getUser(id) {
        return this.userDataFinder.getUserOne(id);
    }
    getUsersAll() {
        return this.userDataFinder.getUsersAll().pipe(operators_1.map(users => ({ users })));
    }
    verifyUser(data) {
        return this.userDataFinder.getUserByConditions(Object.assign({}, data));
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [UserDataFinder_1.UserDataFinder,
        UserDataProducer_1.UserDataProducer,
        UserDataUpdater_1.UserDataUpdater,
        UserDataRemover_1.UserDataRemover])
], UserService);
exports.UserService = UserService;


/***/ }),
/* 51 */
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
const JwtGuard_1 = __webpack_require__(52);
const exceptions_1 = __webpack_require__(28);
const user_enum_1 = __webpack_require__(55);
const UserService_1 = __webpack_require__(50);
const CreateUserReqDTO_1 = __webpack_require__(57);
const VerifyUserReqDTO_1 = __webpack_require__(59);
const UserReqDTO_1 = __webpack_require__(60);
const UpdateUserReqDTO_1 = __webpack_require__(61);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(data) {
        return this.userService.createUser(data).pipe(operators_1.map(() => {
            return {
                status: user_enum_1.api.user.EStatus.SUCCESS,
                message: `User created successfully`,
            };
        }));
    }
    updateUser(data, meta) {
        return this.userService.updateUser(data, meta.payload.id).pipe(operators_1.map(() => {
            return {
                status: user_enum_1.api.user.EStatus.SUCCESS,
                message: `User update successfully: ID: ${meta.payload.id}`,
            };
        }));
    }
    deleteUser(data) {
        return this.userService.deleteUser(data.id).pipe(operators_1.map(() => {
            return {
                status: user_enum_1.api.user.EStatus.SUCCESS,
                message: `User delete successfully: ID: ${data.id}`,
            };
        }));
    }
    verifyUser(data) {
        return this.userService.verifyUser(data);
    }
    getUser(data) {
        return this.userService.getUser(data.id);
    }
    getUsersAll(data) {
        return this.userService.getUsersAll();
    }
};
__decorate([
    microservices_1.GrpcMethod('UserService', 'CreateUser'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('UserController::createUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserReqDTO_1.CreateUserReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('UserService', 'UpdateUser'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('UserController::updateUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateUserReqDTO_1.UpdateUserReqDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.UseGuards(JwtGuard_1.JwtGuard),
    microservices_1.GrpcMethod('UserService', 'DeleteUser'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('UserController::deleteUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserReqDTO_1.UserReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "deleteUser", null);
__decorate([
    microservices_1.GrpcMethod('UserService', 'VerifyUser'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('UserController::verifyUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VerifyUserReqDTO_1.VerifyUserReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "verifyUser", null);
__decorate([
    microservices_1.GrpcMethod('UserService', 'GetUser'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('UserController::getUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserReqDTO_1.UserReqDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUser", null);
__decorate([
    microservices_1.GrpcMethod('UserService', 'GetUsersAll'),
    common_1.UseFilters(exceptions_1.RpcExceptionFilter.for('UserController::getUsersAll')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "getUsersAll", null);
UserController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __webpack_require__(53);
const microservices_1 = __webpack_require__(12);
const grpc_1 = __webpack_require__(54);
const exceptions_1 = __webpack_require__(28);
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
/* 53 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("grpc");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(56)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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
    
        api.user = (function() {
    
            var user = {};
    
            user.EStatus = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "UNKNOWN"] = 0;
                values[valuesById[1] = "SUCCESS"] = 1;
                values[valuesById[2] = "ERROR"] = 2;
                return values;
            })();
    
            return user;
        })();
    
        return api;
    })();

    return $root;
});


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("protobufjs/minimal");

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = __webpack_require__(58);
class CreateUserReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsEmail(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], CreateUserReqDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], CreateUserReqDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(128),
    __metadata("design:type", String)
], CreateUserReqDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.ValidateIf(user => user.avatar),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(500),
    __metadata("design:type", String)
], CreateUserReqDTO.prototype, "avatar", void 0);
exports.CreateUserReqDTO = CreateUserReqDTO;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 59 */
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
const class_validator_1 = __webpack_require__(58);
class VerifyUserReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsEmail(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], VerifyUserReqDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(128),
    __metadata("design:type", String)
], VerifyUserReqDTO.prototype, "password", void 0);
exports.VerifyUserReqDTO = VerifyUserReqDTO;


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
const class_validator_1 = __webpack_require__(58);
class UserReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], UserReqDTO.prototype, "id", void 0);
exports.UserReqDTO = UserReqDTO;


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
const class_validator_1 = __webpack_require__(58);
class UpdateUserReqDTO {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsEmail(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], UpdateUserReqDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], UpdateUserReqDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.ValidateIf(user => user.avatar),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(500),
    __metadata("design:type", String)
], UpdateUserReqDTO.prototype, "avatar", void 0);
exports.UpdateUserReqDTO = UpdateUserReqDTO;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29tbW9uXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL2NvbG9yaXplcnMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL01lc3NhZ2VQcmludGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9sb2dnZXIvQm9vdHN0cmFwTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy91dGlscy9HcnBjQ29uZmlncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL0FwcE1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvand0L0NlcnRzU2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL2FwaS9BcGlNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9Vc2VyTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvU2VydmljZXNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9zZXJ2aWNlcy9kYWwvRGFsTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRiLW1pZ3JhdGVcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL2Vudi50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvVXNlckRhdGFGaW5kZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL2NvZGUudHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9CYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvTm90Rm91bmRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL0ludGVybmFsRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvVW5hdmFpbGFibGVFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9maWx0ZXIvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL0V4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ZpbHRlci9oYW5kbGVycy9pbXBsL1JwY0V4Y2VwdGlvbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtdXBkYXRlcnMvRGF0YVVwZGF0ZXJzTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtdXBkYXRlcnMvVXNlckRhdGFVcGRhdGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtcHJvZHVjZXJzL0RhdGFQcm9kdWNlck1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYXRhLXByb2R1Y2Vycy9Vc2VyRGF0YVByb2R1Y2VyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtcmVtb3ZlcnMvRGF0YVJlbW92ZXJzTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtcmVtb3ZlcnMvVXNlckRhdGFSZW1vdmVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvVXNlclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9Vc2VyQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvand0L0p3dEd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdycGNcIiIsIndlYnBhY2s6Ly8vLi9saWJzL2dycGMtcHJvdG8vdXNlci91c2VyLmVudW0uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvdG9idWZqcy9taW5pbWFsXCIiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9kdG8vQ3JlYXRlVXNlclJlcURUTy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjbGFzcy12YWxpZGF0b3JcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL2FwaS91c2VyL2R0by9WZXJpZnlVc2VyUmVxRFRPLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvYXBpL3VzZXIvZHRvL1VzZXJSZXFEVE8udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9kdG8vVXBkYXRlVXNlclJlcURUTy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFD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QjtJQUhDLDJCQUFTLEVBQUU7SUFDWCwwQkFBUSxFQUFFO0lBQ1YsMkJBQVMsQ0FBQyxFQUFFLENBQUM7OzhDQUNNO0FBS3BCO0lBSEMsNEJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDL0IsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLENBQUMsR0FBRyxDQUFDOztnREFDTztBQWQxQiw0Q0FlQyIsImZpbGUiOiJhcHBzL3VzZXIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsInByb2Nlc3MudGl0bGUgPSAnbm9kZS11c2VyJztcblxuaW1wb3J0IHsgTmVzdEZhY3RvcnkgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyIGFzIE5lc3RMb2dnZXIsIFZhbGlkYXRpb25QaXBlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBCb290c3RyYXBMb2dnZXIgfSBmcm9tICdAbGliL2xvZ2dlcic7XG5pbXBvcnQgeyBncnBjVXNlciB9IGZyb20gJ0BsaWIvdXRpbHMvR3JwY0NvbmZpZ3MnO1xuXG5pbXBvcnQgeyBBcHBNb2R1bGUgfSBmcm9tICcuL0FwcE1vZHVsZSc7XG5cbmV4cG9ydCBjb25zdCBsb2dnZXIgPSBuZXcgQm9vdHN0cmFwTG9nZ2VyKCk7XG4vLyBvdmVycmlkZSBsb2dnZXIgd2l0aCBvdXIgaW1wbGVtZW50YXRpb24gZm9yIHRyYW5zZm9ybWluZyBsb2dzIGxpa2Vcbi8vIFwiW05lc3RdIDQwNiAgIC0gOC8xMi8yMDE5LCAxMTowMDo0MSBBTSAgIFtOZXN0RmFjdG9yeV0gLi4uXCJcbk5lc3RMb2dnZXIub3ZlcnJpZGVMb2dnZXIobG9nZ2VyKTtcblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICAgIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZU1pY3Jvc2VydmljZShBcHBNb2R1bGUsIGdycGNVc2VyKTtcblxuICAgIGFwcC51c2VMb2dnZXIobG9nZ2VyKTtcbiAgICBhcHAudXNlR2xvYmFsUGlwZXMobmV3IFZhbGlkYXRpb25QaXBlKCkpO1xuXG4gICAgYXdhaXQgYXBwLmxpc3RlbkFzeW5jKCk7XG59XG5cbmJvb3RzdHJhcCgpLmNhdGNoKGVyciA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKGVycik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmVzdGpzL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb21tb25cIik7IiwiZXhwb3J0ICogZnJvbSAnLi9Mb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Cb290c3RyYXBMb2dnZXInO1xuIiwiaW1wb3J0IHsgQUxMT1dFRF9MT0dfQllfTEVWRUwsIERFRkFVTFRfTE9HR0VSX0xFVkVMLCBMb2dMZXZlbFR5cGUsIExPR19MRVZFTF9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXInO1xuaW1wb3J0IHsgTWVzc2FnZVByaW50ZXIgfSBmcm9tICcuL21lc3NhZ2UvTWVzc2FnZVByaW50ZXInO1xuXG5jb25zdCBDVVJSRU5UX0xPR19MRVZFTCA9IHByb2Nlc3MuZW52LkxPR0dFUl9MRVZFTCB8fCBERUZBVUxUX0xPR0dFUl9MRVZFTDtcbmNvbnN0IENVUlJFTlRfQUxMT1dFRF9MRVZFTFMgPSBBTExPV0VEX0xPR19CWV9MRVZFTFtDVVJSRU5UX0xPR19MRVZFTF07XG5cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZVByaW50ZXI6IE1lc3NhZ2VQcmludGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUJ1aWxkZXI6IE1lc3NhZ2VCdWlsZGVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZUJ1aWxkZXIgPSBuZXcgTWVzc2FnZUJ1aWxkZXIodGhpcy5sYWJlbCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIgPSBuZXcgTWVzc2FnZVByaW50ZXIodGhpcy5tZXNzYWdlQnVpbGRlcik7XG4gICAgfVxuXG4gICAgcHVibGljIGRlYnVnKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZShMT0dfTEVWRUxfTkFNRS5kZWJ1ZywgYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluZm8oLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLmluZm8sIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvciguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuZXJyb3IsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZWN1cml0eSguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuc2VjdXJpdHksIGFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9nTWVzc2FnZShjdXJyZW50TGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKENVUlJFTlRfQUxMT1dFRF9MRVZFTFMuaGFzKGN1cnJlbnRMZXZlbCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVByaW50ZXIucHJpbnQoY3VycmVudExldmVsLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB0eXBlIExvZ0xldmVsVHlwZSA9ICdkZWJ1ZycgfCAnaW5mbycgfCAnZXJyb3InIHwgJ3NlY3VyaXR5JztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HR0VSX0xFVkVMID0gJ2luZm8nO1xuXG5leHBvcnQgY29uc3QgQUxMT1dFRF9MT0dfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IG5ldyBTZXQoWydkZWJ1ZycsICdpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGluZm86IG5ldyBTZXQoWydpbmZvJywgJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIGVycm9yOiBuZXcgU2V0KFsnZXJyb3InLCAnc2VjdXJpdHknXSksXG4gICAgc2VjdXJpdHk6IG5ldyBTZXQoWydzZWN1cml0eSddKSxcbn07XG5cbmV4cG9ydCBjb25zdCBMT0dfTEVWRUxfTkFNRSA9IHtcbiAgICBkZWJ1ZzogJ2RlYnVnJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgaW5mbzogJ2luZm8nIGFzIExvZ0xldmVsVHlwZSxcbiAgICBlcnJvcjogJ2Vycm9yJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgc2VjdXJpdHk6ICdzZWN1cml0eScgYXMgTG9nTGV2ZWxUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IE1FU1NBR0VfQ09MT1JfQllfTEVWRUwgPSB7XG4gICAgZGVidWc6IDkwLFxuICAgIGluZm86IDMyLFxuICAgIGVycm9yOiAzMSxcbiAgICBzZWN1cml0eTogMzYsXG59O1xuIiwiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGNvbG9yaXplVGltZXN0YW1wLCBjb2xvcml6ZUxldmVsLCBjb2xvcml6ZUxhYmVsLCBjb2xvcml6ZU1lc3NhZ2UgfSBmcm9tICcuL2NvbG9yaXplcnMnO1xuaW1wb3J0IHsgcGFkU3RhcnQsIHBhZEVuZCB9IGZyb20gJy4uL2Zvcm1hdCc7XG5cbmNvbnN0IERFTElNSVRFUlMgPSB7XG4gICAgZGF0ZTogJy0nLFxuICAgIHRpbWU6ICc6JyxcbiAgICBsb2dNZXNzYWdlOiAnICcsXG4gICAgZnVsbE1lc3NhZ2U6ICcgOjogJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlQnVpbGRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb2xvcml6ZU1lc3NhZ2VzID0gcHJvY2Vzcy5lbnYuTE9HR0VSX0NPTE9SSVpFX01FU1NBR0VTID09PSAndHJ1ZSc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVpbGQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLmdldFRpbWVzdGFtcCgpO1xuICAgICAgICBjb25zdCBsb2dNZXNzYWdlID0gdGhpcy5wcmVwYXJlTWVzc2FnZUZyb21BcmdzKGFyZ3MpO1xuXG4gICAgICAgIGlmICghdGhpcy5jb2xvcml6ZU1lc3NhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RpbWVzdGFtcCwgbGV2ZWwsIHRoaXMubGFiZWwsIGxvZ01lc3NhZ2VdLmpvaW4oREVMSU1JVEVSUy5mdWxsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wKSxcbiAgICAgICAgICAgIGNvbG9yaXplTGV2ZWwobGV2ZWwpLFxuICAgICAgICAgICAgY29sb3JpemVMYWJlbCh0aGlzLmxhYmVsKSxcbiAgICAgICAgICAgIGNvbG9yaXplTWVzc2FnZShsZXZlbCwgbG9nTWVzc2FnZSksXG4gICAgICAgIF0uam9pbihERUxJTUlURVJTLmZ1bGxNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpbWVzdGFtcCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgbG9nRGF0ZSA9IFtwYWRTdGFydChkYXRlLmdldERhdGUoKSksIHBhZFN0YXJ0KGRhdGUuZ2V0TW9udGgoKSArIDEpLCBkYXRlLmdldEZ1bGxZZWFyKCldLmpvaW4oREVMSU1JVEVSUy5kYXRlKTtcbiAgICAgICAgY29uc3QgbG9nVGltZSA9IFtwYWRTdGFydChkYXRlLmdldEhvdXJzKCkpLCBwYWRTdGFydChkYXRlLmdldE1pbnV0ZXMoKSksIHBhZEVuZChkYXRlLmdldE1pbGxpc2Vjb25kcygpKV0uam9pbihERUxJTUlURVJTLnRpbWUpO1xuXG4gICAgICAgIHJldHVybiBgWyR7bG9nRGF0ZX0gJHtsb2dUaW1lfV1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZU1lc3NhZ2VGcm9tQXJncyhhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBhcmdzXG4gICAgICAgICAgICAubWFwKGl0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGl0O1xuXG4gICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBwcmVwYXJlIHVuZGVmaW5lZCwgbnVsbCwgc3RyaW5nICYgbnVtYmVyIHR5cGVzXG4gICAgICAgICAgICAgICAgaWYgKFsnbnVtYmVyJywgJ3N0cmluZycsICd1bmRlZmluZWQnXS5pbmNsdWRlcyh0eXBlKSB8fCBpdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdHJ5IGFkZCBzdGFjayBvciBtZXNzYWdlIGZyb20gRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoaXQgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7aXQuc3RhY2sgfHwgaXQubWVzc2FnZSB8fCBpdH1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHN0cmluZ2lmeSBvdGhlciB0eXBlcywgc3VjaCBhcyBhcnJheSwgb2JqZWN0XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke0pTT04uc3RyaW5naWZ5KGl0LCBudWxsLCAyKX1gO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKERFTElNSVRFUlMubG9nTWVzc2FnZSk7XG4gICAgfVxufVxuIiwiLy8gYWJvdXQgY29sb3JpemluZyBtZXNzYWdlcyBpbiBzdGRvdXQgc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDE0MDcyNDZcblxuaW1wb3J0IHsgTUVTU0FHRV9DT0xPUl9CWV9MRVZFTCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmNvbnN0IERFRkFVTFRfQ09MT1IgPSBNRVNTQUdFX0NPTE9SX0JZX0xFVkVMLmluZm87XG5jb25zdCBUSU1FU1RBTVBfQ09MT1IgPSAnNTAnO1xuY29uc3QgTEFCRUxfQ09MT1IgPSAnMzMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVUaW1lc3RhbXAodGltZXN0YW1wOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShUSU1FU1RBTVBfQ09MT1IsIHRpbWVzdGFtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxldmVsKGxldmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShNRVNTQUdFX0NPTE9SX0JZX0xFVkVMW2xldmVsXSB8fCBERUZBVUxUX0NPTE9SLCBsZXZlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZUxhYmVsKGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShMQUJFTF9DT0xPUiwgbGFiZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVNZXNzYWdlKGxldmVsOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvbG9yaXplKE1FU1NBR0VfQ09MT1JfQllfTEVWRUxbbGV2ZWxdIHx8IERFRkFVTFRfQ09MT1IsIG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBjb2xvcml6ZShjb2xvcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBbJ1xceDFiWycsIGNvbG9yLCAnbScsIG1lc3NhZ2UsICdcXHgxYlswbSddLmpvaW4oJycpO1xufVxuIiwiZXhwb3J0IGNvbnN0IHBhZFN0YXJ0ID0gKGRhdGE6IG51bWJlciwgcGFkTnVtOiBudW1iZXIgPSAyKTogc3RyaW5nID0+IGRhdGEudG9TdHJpbmcoKS5wYWRTdGFydChwYWROdW0sICcwJyk7XG5cbmV4cG9ydCBjb25zdCBwYWRFbmQgPSAoZGF0YTogbnVtYmVyLCBwYWROdW06IG51bWJlciA9IDMpOiBzdHJpbmcgPT4gZGF0YS50b1N0cmluZygpLnBhZEVuZChwYWROdW0sICcwJyk7XG4iLCJpbXBvcnQgeyBMb2dMZXZlbFR5cGUgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgTWVzc2FnZUJ1aWxkZXIgfSBmcm9tICcuL01lc3NhZ2VCdWlsZGVyJztcblxuY29uc3QgTk9PUCA9ICgpID0+ICh7fSk7XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUHJpbnRlciB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBtZXNzYWdlQnVpbGRlcjogTWVzc2FnZUJ1aWxkZXIpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHJpbnQobGV2ZWw6IExvZ0xldmVsVHlwZSwgYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcmludFByZXBhcmVkTWVzc2FnZSh0aGlzLm1lc3NhZ2VCdWlsZGVyLmJ1aWxkKGxldmVsLCBhcmdzKSArICdcXG4nKTtcbiAgICB9XG5cbiAgICAvLyBjaGF0OiBjaGVjayB0aGlzIGltcGxlbWVudGF0aW9uIGluIGh0dHBzOi8vc2RleG50LmF0bGFzc2lhbi5uZXQvYnJvd3NlL1dFQkJBQ0stNDg1XG4gICAgcHJpdmF0ZSBwcmludFByZXBhcmVkTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvbGliL2ludGVybmFsL2NvbnNvbGUvY29uc3RydWN0b3IuanMjTDIzMlxuXG4gICAgICAgIC8vIHRoZXJlIG1heSBiZSBhbiBlcnJvciBvY2N1cnJpbmcgc3luY2hyb25vdXNseSAoZS5nLiBmb3IgZmlsZXMgb3IgVFRZc1xuICAgICAgICAvLyBvbiBQT1NJWCBzeXN0ZW1zKSBvciBhc3luY2hyb25vdXNseSAoZS5nLiBwaXBlcyBvbiBQT1NJWCBzeXN0ZW1zKSwgc29cbiAgICAgICAgLy8gaGFuZGxlIGJvdGggc2l0dWF0aW9ucy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGFkZCBhbmQgbGF0ZXIgcmVtb3ZlIGEgbm9vcCBlcnJvciBoYW5kbGVyIHRvIGNhdGNoIHN5bmNocm9ub3VzIGVycm9ycy5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnN0ZG91dC5saXN0ZW5lckNvdW50KCdlcnJvcicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQub25jZSgnZXJyb3InLCBOT09QKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobWVzc2FnZSwgTk9PUCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gdGhlcmUncyBubyBwcm9wZXIgd2F5IHRvIHBhc3MgYWxvbmcgdGhlIGVycm9yIGhlcmVcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIE5PT1ApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9Mb2dnZXInO1xuXG5jb25zdCBERUZBVUxUX0xPR0dFUl9OQU1FID0gJ2Jvb3RzdHJhcCc7XG5cbmV4cG9ydCBjbGFzcyBCb290c3RyYXBMb2dnZXIgaW1wbGVtZW50cyBMb2dnZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGxvZ2dlcjogTG9nZ2VyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbD86IHN0cmluZykge1xuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyBMb2dnZXIodGhpcy5sYWJlbCA/IHRoaXMubGFiZWwgOiBERUZBVUxUX0xPR0dFUl9OQU1FKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9nKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBlcnJvcihtZXNzYWdlOiBhbnksIHRyYWNlPzogc3RyaW5nLCBjb250ZXh0Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXJuKG1lc3NhZ2U6IGFueSwgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAvLyBvdXIgaW1wbGVtZW50YXRpb24gb2YgdGhlIGxvZ2dlciBkb2VzIG5vdCB5ZXQgbmVlZFxuICAgICAgICAvLyB0aGUgXCJ3YXJuaW5nXCIgbGV2ZWwsIHNvIHdlIHdpbGwgd3JpdGUgdGhlIGxvZ3NcbiAgICAgICAgLy8gY29taW5nIGZyb20gaGVyZSB0byBcImVycm9yXCIgbGV2ZWxcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgR3JwY09wdGlvbnMsIFRyYW5zcG9ydCB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgZ3JwY0NoYXQgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQ0hBVF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMycsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuY2hhdCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2NoYXQvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY0F1dGggPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfQVVUSF9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMicsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkuYXV0aCcsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL2F1dGgvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuXG5leHBvcnQgY29uc3QgZ3JwY1VzZXIgPSB7XG4gICAgdHJhbnNwb3J0OiBUcmFuc3BvcnQuR1JQQyxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHVybDogZW52LkdSUENfVVNFUl9TRVJWSUNFIHx8ICcxMjcuMC4wLjE6ODAwMScsXG4gICAgICAgIHBhY2thZ2U6ICdhcGkudXNlcicsXG4gICAgICAgIHByb3RvUGF0aDogJy4vbGlicy9ncnBjLXByb3RvL3VzZXIvaW5kZXgucHJvdG8nLFxuICAgIH0sXG59IGFzIEdycGNPcHRpb25zO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9taWNyb3NlcnZpY2VzXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgQ2VydHNTZXJ2aWNlIH0gZnJvbSAnQGxpYi9qd3QvQ2VydHNTZXJ2aWNlJztcbmltcG9ydCB7IEFwaU1vZHVsZSB9IGZyb20gJy4vYXBpL0FwaU1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQXBpTW9kdWxlLFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbQ2VydHNTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIE9uTW9kdWxlSW5pdCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENsaWVudCwgQ2xpZW50R3JwYyB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyB0aW1lciwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgcmV0cnlXaGVuLCB0YXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAbGliL2xvZ2dlcic7XG5pbXBvcnQgeyBncnBjQXV0aCB9IGZyb20gJ0BsaWIvdXRpbHMvR3JwY0NvbmZpZ3MnO1xuXG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAZ3JwYy1wcm90by9hdXRoL2F1dGgnO1xuXG5jb25zdCBSRVRSWSA9IDEwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2VydHNTZXJ2aWNlIGltcGxlbWVudHMgT25Nb2R1bGVJbml0IHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ0NlcnRzU2VydmljZScpO1xuXG4gICAgQENsaWVudChncnBjQXV0aCkgcHJpdmF0ZSByZWFkb25seSBncnBjQXV0aENsaWVudDogQ2xpZW50R3JwYztcbiAgICBwcml2YXRlIGdycGNBdXRoU2VydmljZTogYXBpLmF1dGguQXV0aFNlcnZpY2U7XG5cbiAgICBwdWJsaWMgb25Nb2R1bGVJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmdycGNBdXRoU2VydmljZSA9IHRoaXMuZ3JwY0F1dGhDbGllbnQuZ2V0U2VydmljZTxhcGkuYXV0aC5BdXRoU2VydmljZT4oJ0F1dGhTZXJ2aWNlJyk7XG5cbiAgICAgICAgdGhpcy5ncnBjQXV0aFNlcnZpY2UuZ2V0Q2VydFN0cmVhbSh7fSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHJldHJ5V2hlbihlcnJvcnMgPT5cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXAoZXJyID0+IHRoaXMubG9nZ2VyLmVycm9yKGVyci5tZXNzYWdlICsgJy4gV2lsbCB0cnkgYWdhaW4gYWZ0ZXIgdGltZW91dCBpbiAzcy4nKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJnZU1hcCgoKSA9PiAoUkVUUlkgPyB0aW1lcigzMDAwKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3dFcnJvcihgQ2FuJ3QgcmVjb25uZWN0IHRvIENlcnRTdHJlYW0nLCB0aW1lb3V0IGV4cGlyZWQuYCkpKSxcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1BVQiA9IHJlcy5rZXk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anMvb3BlcmF0b3JzXCIpOyIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgVXNlck1vZHVsZSB9IGZyb20gJy4vdXNlci9Vc2VyTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW1VzZXJNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBBcGlNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBTZXJ2aWNlc01vZHVsZSB9IGZyb20gJ0B1c2VyL3NlcnZpY2VzL1NlcnZpY2VzTW9kdWxlJztcbmltcG9ydCB7IFVzZXJDb250cm9sbGVyIH0gZnJvbSAnLi9Vc2VyQ29udHJvbGxlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtTZXJ2aWNlc01vZHVsZV0sXG4gICAgY29udHJvbGxlcnM6IFtVc2VyQ29udHJvbGxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYWxNb2R1bGUgfSBmcm9tICcuL2RhbC9EYWxNb2R1bGUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL1VzZXJTZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0RhbE1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxuICAgIGV4cG9ydHM6IFtVc2VyU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VzTW9kdWxlIHtcbn1cblxuZXhwb3J0ICogZnJvbSAnLi9kYWwvRGFsTW9kdWxlJztcbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGF0YUZpbmRlcnNNb2R1bGUgfSBmcm9tICcuL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZSc7XG5pbXBvcnQgeyBEYXRhVXBkYXRlcnNNb2R1bGUgfSBmcm9tICcuL2RhdGEtdXBkYXRlcnMvRGF0YVVwZGF0ZXJzTW9kdWxlJztcbmltcG9ydCB7IERhdGFQcm9kdWNlck1vZHVsZSB9IGZyb20gJy4vZGF0YS1wcm9kdWNlcnMvRGF0YVByb2R1Y2VyTW9kdWxlJztcbmltcG9ydCB7IERhdGFSZW1vdmVyc01vZHVsZSB9IGZyb20gJy4vZGF0YS1yZW1vdmVycy9EYXRhUmVtb3ZlcnNNb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGF0YUZpbmRlcnNNb2R1bGUsIERhdGFQcm9kdWNlck1vZHVsZSwgRGF0YVVwZGF0ZXJzTW9kdWxlLCBEYXRhUmVtb3ZlcnNNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEYXRhRmluZGVyc01vZHVsZSwgRGF0YVByb2R1Y2VyTW9kdWxlLCBEYXRhVXBkYXRlcnNNb2R1bGUsIERhdGFSZW1vdmVyc01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIERhbE1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IERiTW9kdWxlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RiL0RiTW9kdWxlJztcblxuaW1wb3J0IHsgVXNlckRhdGFGaW5kZXIgfSBmcm9tICcuL1VzZXJEYXRhRmluZGVyJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0RiTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtVc2VyRGF0YUZpbmRlcl0sXG4gICAgZXhwb3J0czogW1VzZXJEYXRhRmluZGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YUZpbmRlcnNNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlLCBPbk1vZHVsZUluaXQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgKiBhcyBEQk1pZ3JhdGUgZnJvbSAnZGItbWlncmF0ZSc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAbGliL2xvZ2dlcic7XG5pbXBvcnQgeyBkYkNvbmZpZywgbWlncmF0ZUNvbmZpZyB9IGZyb20gJ0B1c2VyL2Vudic7XG5cbkBNb2R1bGUoe1xuICAgIGV4cG9ydHM6IFtDbGllbnRdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBDbGllbnQsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiAoKSA9PiBuZXcgQ2xpZW50KGRiQ29uZmlnKSxcbiAgICAgICAgfSxcbiAgICBdLFxufSlcbmV4cG9ydCBjbGFzcyBEYk1vZHVsZSBpbXBsZW1lbnRzIE9uTW9kdWxlSW5pdCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdEYk1vZHVsZScpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGJtaWdyYXRlID0gREJNaWdyYXRlLmdldEluc3RhbmNlKHRydWUsIG1pZ3JhdGVDb25maWcpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgb25Nb2R1bGVJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5kYm1pZ3JhdGUpIHtcbiAgICAgICAgICAgIGZyb20odGhpcy5kYm1pZ3JhdGUudXAoKSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmluZm8oJ01pZ3JhdGlvbnMgYXBwbGllZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGIuY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGItbWlncmF0ZVwiKTsiLCJpbXBvcnQgeyBDbGllbnRDb25maWcgfSBmcm9tICdwZyc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5leHBvcnQgY29uc3QgU0FMVCA9IGVudi5TQUxUIHx8ICdTWXFTdWlqVnZ5VUUnO1xuXG5leHBvcnQgY29uc3QgZGJDb25maWc6IENsaWVudENvbmZpZyA9IHtcbiAgICBob3N0OiBlbnYuREJfSE9TVCB8fCAnbG9jYWxob3N0JyxcbiAgICBwb3J0OiArZW52LkRCX1BPUlQgfHwgNTQzMixcbiAgICB1c2VyOiBlbnYuREJfVVNFUk5BTUUgfHwgJ3Bvc3RncmVzJyxcbiAgICBwYXNzd29yZDogZW52LkRCX1BBU1NXT1JEIHx8ICdwb3N0Z3JlcycsXG4gICAgZGF0YWJhc2U6IGVudi5EQl9EQVRBQkFTRV9VU0VSIHx8ICd1c2VyJyxcbiAgICBrZWVwQWxpdmU6IHRydWUsXG59O1xuXG5leHBvcnQgY29uc3QgbWlncmF0ZUNvbmZpZyA9IHtcbiAgICBjd2Q6IGAuL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RiYCxcbiAgICBlbnY6ICd1c2VyJyxcbiAgICBzdHJpbmc6ICcuL2RhdGFiYXNlLmpzb24nLFxufTtcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBjcmVhdGVIbWFjIH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTm90Rm91bmRFeGNlcHRpb24sIFVTRVJfTk9UX0ZPVU5EIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuaW1wb3J0IHsgYXBpIGFzIHVzZXJUeXBlcyB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlci50eXBlcyc7XG5pbXBvcnQgeyBhcGkgYXMgdXNlckFwaSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcic7XG5cbmltcG9ydCB7IFNBTFQgfSBmcm9tICdAdXNlci9lbnYnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckRhdGFGaW5kZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb25kaXRpb25RdWVyeShkYXRhOiB1c2VyQXBpLnVzZXIuVmVyaWZ5VXNlclJlcSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChkYXRhLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICBkYXRhLnBhc3N3b3JkID0gY3JlYXRlSG1hYygnc2hhNTEyJywgU0FMVCkudXBkYXRlKGRhdGEucGFzc3dvcmQpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBrZXlzLm1hcCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW5kID0ga2V5cy5sZW5ndGggPiAxICYmIGluZGV4IDwga2V5cy5sZW5ndGggLSAxID8gJyBhbmQgJyA6ICcnO1xuICAgICAgICAgICAgcmV0dXJuIGAke2tleX09JyR7ZGF0YVtrZXldfScke2FuZH1gO1xuICAgICAgICB9KS5qb2luKCcnKTtcblxuICAgICAgICByZXR1cm4gYHNlbGVjdCAqIGZyb20gYXBpX3VzZXIgd2hlcmUgJHtjb25kaXRpb25zfWA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJPbmUoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dXNlclR5cGVzLnVzZXIuVXNlcj4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBzZWxlY3QgKiBmcm9tIGFwaV91c2VyIHdoZXJlIGlkID0gJDFgO1xuXG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuZGIucXVlcnk8dXNlclR5cGVzLnVzZXIuVXNlcj4ocXVlcnksIFtpZF0pKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzLnJvd0NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oVVNFUl9OT1RfRk9VTkQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5yb3dzWzBdO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlckJ5Q29uZGl0aW9ucyhkYXRhOiB1c2VyQXBpLnVzZXIuVmVyaWZ5VXNlclJlcSk6IE9ic2VydmFibGU8dXNlclR5cGVzLnVzZXIuVXNlcj4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZ2V0Q29uZGl0aW9uUXVlcnkoZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5kYi5xdWVyeTx1c2VyVHlwZXMudXNlci5Vc2VyPihxdWVyeSkpXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5yb3dzWzBdKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJzQnlJZHMoaWRzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8dXNlclR5cGVzLnVzZXIuVXNlcltdPiB7XG4gICAgICAgIGxldCBxdWVyeSA9IGBzZWxlY3QgKiBmcm9tIGFwaV91c2VyIHdoZXJlIGlkIGluIChgO1xuICAgICAgICBpZHMuZm9yRWFjaCgoaWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbmQgPSBpbmRleCA9PT0gaWRzLmxlbmd0aCAtIDEgPyBgKWAgOiBgLGA7XG4gICAgICAgICAgICBxdWVyeSArPSBgJyR7aWR9JyR7ZW5kfWA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuZGIucXVlcnk8dXNlclR5cGVzLnVzZXIuVXNlcj4ocXVlcnkpKVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMucm93cykpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2Vyc0FsbCgpOiBPYnNlcnZhYmxlPHVzZXJUeXBlcy51c2VyLlVzZXJbXT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBzZWxlY3QgKiBmcm9tIGFwaV91c2VyYDtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmRiLnF1ZXJ5PHVzZXJUeXBlcy51c2VyLlVzZXI+KHF1ZXJ5KSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzLnJvd3MpKTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwiZXhwb3J0ICogZnJvbSAnLi9pbXBsJztcbmV4cG9ydCAqIGZyb20gJy4vZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlcic7XG4iLCJleHBvcnQgKiBmcm9tICcuL2NvZGUudHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Ob3RGb3VuZEV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0FscmVhZHlFeGlzdHNFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9QZXJtaXNzaW9uRGVuaWVkRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vSW50ZXJuYWxFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9VbmF2YWlsYWJsZUV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL1VuYXV0aGVudGljYXRlZEV4Y2VwdGlvbic7XG4iLCJleHBvcnQgaW50ZXJmYWNlIElFcnJvciB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gRUNvZGVzIHtcbiAgICBFUlJPUl9DT0RFX1VOREVGSU5FRCA9IDAsXG4gICAgLy8gaW52YWxpZCBhcmd1bWVudCBjb2Rlc1xuICAgIElOVkFMSURfQVJHVU1FTlQgPSAzLFxuICAgIC8vIHJlcXVpcmVkIGNvZGVzXG4gICAgVVNFUl9JRF9SRVFVSVJFRCA9IDMwMSxcbiAgICAvLyBub3QgZm91bmQgY29kZXNcbiAgICBOT1RfRk9VTkQgPSA1LFxuICAgIFVTRVJfTk9UX0ZPVU5EID0gNTAxLFxuICAgIC8vIGFscmVhZHkgZXhpc3QgY29kZXNcbiAgICBBTFJFQURZX0VYSVNUID0gNixcbiAgICBFTUFJTF9BTFJFQURZX0VYSVNUUyA9IDYwMSxcbiAgICAvLyBwZXJtaXNzaW9uIGRlbmllZCBjb2Rlc1xuICAgIFBFUk1JU1NJT05fREVOSUVEID0gNyxcbiAgICAvLyBpbnRlcm5hbCBlcnJvciBjb2Rlc1xuICAgIElOVEVSTkFMX0VSUk9SID0gMTMsXG4gICAgLy8gdW5hdmFpbGFibGUgY29kZXNcbiAgICBVTkFWQUlMQUJMRSA9IDE0LFxuICAgIC8vIHVuYXV0aGVudGljYXRlZCBjb2Rlc1xuICAgIFVOQVVUSEVOVElDQVRFRCA9IDE2LFxuICAgIFRPS0VOX0lOVkFMSUQgPSAxNjAwMSxcbiAgICBUT0tFTl9FWFBJUkVEID0gMTYwMDIsXG4gICAgQVVUSF9DUkVERU5USUFMU19JTlZBTElEID0gMTYwMDMsXG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBJTlZBTElEX0FSR1VNRU5UOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLklOVkFMSURfQVJHVU1FTlQsXG4gICAgbWVzc2FnZTogJ0ludmFsaWQgYXJndW1lbnQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFVTRVJfSURfUkVRVUlSRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVVNFUl9JRF9SRVFVSVJFRCxcbiAgICBtZXNzYWdlOiAnVXNlciBpZCBpcyByZXF1aXJlZCcsXG59O1xuXG5leHBvcnQgY2xhc3MgSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IElOVkFMSURfQVJHVU1FTlQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBScGNFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuXG5pbnRlcmZhY2UgSUVycm9yQ29kZSB7XG4gICAgY29kZTogbnVtYmVyO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRXJyb3JDb2RlVHlwZSA9IElFcnJvckNvZGUgfCBudWxsO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhVHlwZSB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQmFzZUV4Y2VwdGlvbiBleHRlbmRzIFJwY0V4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZXJyb3JDb2RlOiBJRXJyb3JDb2RlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIGNvZGU6IGVycm9yQ29kZS5jb2RlLFxuXG4gICAgICAgICAgICAvLyBzbyBmYXIgaXQgaGFzIG5vdCBiZWVuIHBvc3NpYmxlIHRvIGZpbmQgbm9ybWFsIHdheXMgaW4gTmVzdFxuICAgICAgICAgICAgLy8gdG8gdHJhbnNtaXQgdGhlIG1ldGFkYXRhIGluIHJlc3BvbnNlIHdpdGggYW4gZXJyb3IsXG4gICAgICAgICAgICAvLyBzbyB3ZSB3aWxsIHNldyB0aGlzIGRhdGEgaW50byB0aGUgbWVzc2FnZSBib2R5XG4gICAgICAgICAgICBtZXNzYWdlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JDb2RlLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgTk9UX0ZPVU5EOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLk5PVF9GT1VORCxcbiAgICBtZXNzYWdlOiAnTm90IGZvdW5kJyxcbn07XG5cbmV4cG9ydCBjb25zdCBVU0VSX05PVF9GT1VORDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5VU0VSX05PVF9GT1VORCxcbiAgICBtZXNzYWdlOiAnVXNlciBub3QgZm91bmQnLFxufTtcblxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IE5PVF9GT1VORCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IEFMUkVBRFlfRVhJU1Q6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuQUxSRUFEWV9FWElTVCxcbiAgICBtZXNzYWdlOiAnUmVzb3VyY2UgYWxyZWFkeSBleGlzdHMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEVNQUlMX0FMUkVBRFlfRVhJU1RTOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkVNQUlMX0FMUkVBRFlfRVhJU1RTLFxuICAgIG1lc3NhZ2U6ICdFbWFpbCBhbHJlYWR5IGV4aXN0cycsXG59O1xuXG5leHBvcnQgY2xhc3MgQWxyZWFkeUV4aXN0c0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBBTFJFQURZX0VYSVNULCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgUEVSTUlTU0lPTl9ERU5JRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuUEVSTUlTU0lPTl9ERU5JRUQsXG4gICAgbWVzc2FnZTogJ1Blcm1pc3Npb24gZGVuaWVkJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRGVuaWVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IFBFUk1JU1NJT05fREVOSUVELCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5URVJOQUxfRVJST1I6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuSU5URVJOQUxfRVJST1IsXG4gICAgbWVzc2FnZTogJ0ludGVybmFsIGVycm9yJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBJTlRFUk5BTF9FUlJPUiwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IFVOQVZBSUxBQkxFOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVOQVZBSUxBQkxFLFxuICAgIG1lc3NhZ2U6ICdSZXNvdXJjZSB1bmF2YWlsYWJsZScsXG59O1xuXG5leHBvcnQgY2xhc3MgVW5hdmFpbGFibGVFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgVU5BVkFJTEFCTEUsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBVTkFVVEhFTlRJQ0FURUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVU5BVVRIRU5USUNBVEVELFxuICAgIG1lc3NhZ2U6ICdVbmF1dGhlbnRpY2F0ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0lOVkFMSUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVE9LRU5fSU5WQUxJRCxcbiAgICBtZXNzYWdlOiAnVG9rZW4gaW52YWxpZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVE9LRU5fRVhQSVJFRDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5UT0tFTl9FWFBJUkVELFxuICAgIG1lc3NhZ2U6ICdUb2tlbiBleHBpcmVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBVVRIX0NSRURFTlRJQUxTX0lOVkFMSUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuQVVUSF9DUkVERU5USUFMU19JTlZBTElELFxuICAgIG1lc3NhZ2U6ICdBdXRoIGNyZWRlbnRpYWxzIGludmFsaWQnLFxufTtcblxuZXhwb3J0IGNsYXNzIFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBVTkFVVEhFTlRJQ0FURUQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDYXRjaCwgQXJndW1lbnRzSG9zdCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEJhc2VScGNFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBFeGNlcHRpb25UeXBlLCBFWENFUFRJT05fTElTVCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IH0gZnJvbSAnLi9oYW5kbGVycy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IH0gZnJvbSAnLi9oYW5kbGVycy9FeGNlcHRpb25IYW5kbGVyRmFjdG9yeSc7XG5cbkBDYXRjaCguLi5FWENFUFRJT05fTElTVClcbmV4cG9ydCBjbGFzcyBScGNFeGNlcHRpb25GaWx0ZXIgZXh0ZW5kcyBCYXNlUnBjRXhjZXB0aW9uRmlsdGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5OiBJRXhjZXB0aW9uSGFuZGxlckZhY3Rvcnk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZvcihsYWJlbDogc3RyaW5nKTogUnBjRXhjZXB0aW9uRmlsdGVyIHtcbiAgICAgICAgcmV0dXJuIG5ldyBScGNFeGNlcHRpb25GaWx0ZXIobGFiZWwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIGZvciB0aGUgYWRtaW4gcGFuZWwsIHlvdSBkb27igJl0IG5lZWQgdG8gbW9uaXRvciBlcnJvcnNcbiAgICAgICAgLy8gc3VjaCBhcyBmcm9tIENvdWNoRGIsIHNvIHdlIHBhc3Mgc2VwYXJhdGUgQWRtaW5FeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB0byBpdCxcbiAgICAgICAgLy8gYW5kIGZvciB3ZWItYmFja2VuZCAtIFdlYkJhY2tFeGNlcHRpb25IYW5kbGVyRmFjdG9yeVxuICAgICAgICB0aGlzLmV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5ID0gbmV3IEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5KHRoaXMubGFiZWwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYXRjaChleGNlcHRpb246IEV4Y2VwdGlvblR5cGUsIGhvc3Q6IEFyZ3VtZW50c0hvc3QpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5leGNlcHRpb25IYW5kbGVyRmFjdG9yeS5nZXRIYW5kbGVyKGV4Y2VwdGlvbik7XG5cbiAgICAgICAgaGFuZGxlci53YXJuQWJvdXRFcnJvcigpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5jYXRjaChoYW5kbGVyLndyYXBFcnJvcigpLCBob3N0IGFzIGFueSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi9pbXBsL0Jhc2VFeGNlcHRpb24nO1xuXG5leHBvcnQgdHlwZSBFeGNlcHRpb25UeXBlID0gRXJyb3IgfCBScGNFeGNlcHRpb24gfCBCYXNlRXhjZXB0aW9uO1xuXG5leHBvcnQgY29uc3QgRVhDRVBUSU9OX0xJU1QgPSBbRXJyb3IsIFJwY0V4Y2VwdGlvbiwgQmFzZUV4Y2VwdGlvbl07XG4iLCJpbXBvcnQgeyBScGNFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuXG5pbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciwgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgUnBjRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4vaW1wbC9ScGNFeGNlcHRpb25IYW5kbGVyJztcbmltcG9ydCB7IEludGVybmFsRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4vaW1wbC9JbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXInO1xuXG5pbXBvcnQgeyBFeGNlcHRpb25UeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY2xhc3MgRXhjZXB0aW9uSGFuZGxlckZhY3RvcnkgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlckZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRIYW5kbGVyKGV4Y2VwdGlvbjogRXhjZXB0aW9uVHlwZSk6IElFeGNlcHRpb25IYW5kbGVyIHtcbiAgICAgICAgLy8gaGFuZGxlIHJlZ3VsYXIgZXhjZXB0aW9ucyBmcm9tIGN1cnJlbnQgbWljcm9zZXJ2aWNlc1xuICAgICAgICBpZiAoZXhjZXB0aW9uIGluc3RhbmNlb2YgUnBjRXhjZXB0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJwY0V4Y2VwdGlvbkhhbmRsZXIoZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhhbmRsZSBhbGwgb3RoZXIgaW50ZXJuYWwgZXhjZXB0aW9uc1xuICAgICAgICByZXR1cm4gbmV3IEludGVybmFsRXhjZXB0aW9uSGFuZGxlcihleGNlcHRpb24sIHRoaXMubGFiZWwpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IElFeGNlcHRpb25IYW5kbGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi8uLi8uLi9pbXBsL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgUnBjRXhjZXB0aW9uSGFuZGxlciBpbXBsZW1lbnRzIElFeGNlcHRpb25IYW5kbGVyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxvZ2dlciA9IG5ldyBMb2dnZXIoJ1JwY0V4Y2VwdGlvbkhhbmRsZXInKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZXhjZXB0aW9uOiBCYXNlRXhjZXB0aW9uKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyYXBFcnJvcigpOiBCYXNlRXhjZXB0aW9uIHtcbiAgICAgICAgLy8gbm90IG5lZWQgdG8gaGFuZGxlIHRoaXMgZXJyb3IsXG4gICAgICAgIC8vIGJlY2F1c2UgaXQgcmVndWxhciBleGNlcHRpb24gZnJvbSBiYWNrZW5kIHNlcnZpY2VzXG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2VwdGlvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybkFib3V0RXJyb3IoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHttZXNzYWdlfTogYW55ID0gdGhpcy5leGNlcHRpb247XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBJbnRlcm5hbCBleGNlcHRpb246ICR7bWVzc2FnZX1gKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcbmltcG9ydCB7IEludGVybmFsRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9JbnRlcm5hbEV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4uLy4uLy4uLy4uL2xvZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXInKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZXhjZXB0aW9uOiBFcnJvciwgcHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyYXBFcnJvcigpOiBCYXNlRXhjZXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YXJuQWJvdXRFcnJvcigpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qge3N0YWNrLCBtZXNzYWdlfSA9IHRoaXMuZXhjZXB0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihgJHt0aGlzLmxhYmVsfSA6OiBJbnRlcm5hbCBlcnJvciBcIiR7bWVzc2FnZX1cIixcXG5TdGFjazogJHtzdGFja31gKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IERiTW9kdWxlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RiL0RiTW9kdWxlJztcbmltcG9ydCB7IERhdGFGaW5kZXJzTW9kdWxlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZSc7XG5cbmltcG9ydCB7IFVzZXJEYXRhVXBkYXRlciB9IGZyb20gJy4vVXNlckRhdGFVcGRhdGVyJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0RiTW9kdWxlLCBEYXRhRmluZGVyc01vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbVXNlckRhdGFVcGRhdGVyXSxcbiAgICBleHBvcnRzOiBbVXNlckRhdGFVcGRhdGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVVwZGF0ZXJzTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgYXBpIGFzIHVzZXJUeXBlcyB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlci50eXBlcyc7XG5pbXBvcnQgeyBhcGkgYXMgdXNlckFwaSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcic7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9Vc2VyRGF0YUZpbmRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyRGF0YVVwZGF0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGI6IENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YUZpbmRlcjogVXNlckRhdGFGaW5kZXIsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVVzZXIoZGF0YTogdXNlckFwaS51c2VyLlVwZGF0ZVVzZXJSZXEsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVzZXJUeXBlcy51c2VyLlVzZXI+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgdXBkYXRlIGFwaV91c2VyIHNldCBuYW1lID0gJDEsIGVtYWlsID0gJDIsIGF2YXRhciA9ICQzIHdoZXJlIGlkID0gJDRgO1xuXG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMudXNlckRhdGFGaW5kZXIuZ2V0VXNlck9uZShpZCkpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLmRiLnF1ZXJ5PHVzZXJUeXBlcy51c2VyLlVzZXI+KHF1ZXJ5LFxuICAgICAgICAgICAgICAgIFtkYXRhLm5hbWUsIGRhdGEuZW1haWwsIGRhdGEuYXZhdGFyLCBpZF0pKSksXG4gICAgICAgICAgICBtYXAocmVzID0+IHJlcy5yb3dzWzBdKSxcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IERiTW9kdWxlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RiL0RiTW9kdWxlJztcbmltcG9ydCB7IERhdGFGaW5kZXJzTW9kdWxlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZSc7XG5cbmltcG9ydCB7IFVzZXJEYXRhUHJvZHVjZXIgfSBmcm9tICcuL1VzZXJEYXRhUHJvZHVjZXInO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGJNb2R1bGUsIERhdGFGaW5kZXJzTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtVc2VyRGF0YVByb2R1Y2VyXSxcbiAgICBleHBvcnRzOiBbVXNlckRhdGFQcm9kdWNlcl0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFQcm9kdWNlck1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgY3JlYXRlSG1hYyB9IGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFscmVhZHlFeGlzdHNFeGNlcHRpb24sIEVNQUlMX0FMUkVBRFlfRVhJU1RTIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zL2ltcGwnO1xuXG5pbXBvcnQgeyBhcGkgYXMgdXNlckFwaSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcic7XG5pbXBvcnQgeyBhcGkgYXMgY2hhdFR5cGVzIH0gZnJvbSAnQGdycGMtcHJvdG8vY2hhdC9jaGF0LnR5cGVzJztcblxuaW1wb3J0IHsgVXNlckRhdGFGaW5kZXIgfSBmcm9tICdAdXNlci9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL1VzZXJEYXRhRmluZGVyJztcblxuaW1wb3J0IHsgU0FMVCB9IGZyb20gJ0B1c2VyL2Vudic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyRGF0YVByb2R1Y2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRiOiBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdXNlckRhdGFGaW5kZXI6IFVzZXJEYXRhRmluZGVyLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVVc2VyKGRhdGE6IHVzZXJBcGkudXNlci5DcmVhdGVVc2VyUmVxKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGRhdGEucGFzc3dvcmQgPSBjcmVhdGVIbWFjKCdzaGE1MTInLCBTQUxUKS51cGRhdGUoZGF0YS5wYXNzd29yZCkuZGlnZXN0KCdoZXgnKTtcblxuICAgICAgICBjb25zdCBxdWVyeSA9IGBpbnNlcnQgaW50byBhcGlfdXNlciAoZW1haWwsIG5hbWUsIGF2YXRhciwgcGFzc3dvcmQpIHZhbHVlcyAoJDEsICQyLCAkMywgJDQpYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0VtYWlsRXhpc3RlbmNlKGRhdGEuZW1haWwpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLmRiLnF1ZXJ5PGNoYXRUeXBlcy5jaGF0Lk1lc3NhZ2U+KHF1ZXJ5LFxuICAgICAgICAgICAgICAgIFtkYXRhLmVtYWlsLCBkYXRhLm5hbWUsIGRhdGEuYXZhdGFyLCBkYXRhLnBhc3N3b3JkXSkpKSxcbiAgICAgICAgICAgIG1hcFRvKG51bGwpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tFbWFpbEV4aXN0ZW5jZShlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMudXNlckRhdGFGaW5kZXIuZ2V0VXNlckJ5Q29uZGl0aW9ucyh7IGVtYWlsIH0gYXMgdXNlckFwaS51c2VyLlZlcmlmeVVzZXJSZXEpKS5waXBlKFxuICAgICAgICAgICAgbWFwKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBbHJlYWR5RXhpc3RzRXhjZXB0aW9uKEVNQUlMX0FMUkVBRFlfRVhJU1RTKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGJNb2R1bGUgfSBmcm9tICdAdXNlci9zZXJ2aWNlcy9kYWwvZGIvRGJNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YUZpbmRlcnNNb2R1bGUgfSBmcm9tICdAdXNlci9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL0RhdGFGaW5kZXJzTW9kdWxlJztcblxuaW1wb3J0IHsgVXNlckRhdGFSZW1vdmVyIH0gZnJvbSAnLi9Vc2VyRGF0YVJlbW92ZXInO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbRGJNb2R1bGUsIERhdGFGaW5kZXJzTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtVc2VyRGF0YVJlbW92ZXJdLFxuICAgIGV4cG9ydHM6IFtVc2VyRGF0YVJlbW92ZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhUmVtb3ZlcnNNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENsaWVudCB9IGZyb20gJ3BnJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlci50eXBlcyc7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9Vc2VyRGF0YUZpbmRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyRGF0YVJlbW92ZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGI6IENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YUZpbmRlcjogVXNlckRhdGFGaW5kZXIsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZVVzZXIoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBkZWxldGUgZnJvbSBhcGlfdXNlciB3aGVyZSBpZCA9ICQxYDtcblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YUZpbmRlci5nZXRVc2VyT25lKGlkKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb20odGhpcy5kYi5xdWVyeTxhcGkudXNlci5Vc2VyPihxdWVyeSwgW2lkXSkpKSxcbiAgICAgICAgICAgIG1hcFRvKG51bGwpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGFwaSBhcyB1c2VyVHlwZXMgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIudHlwZXMnO1xuaW1wb3J0IHsgYXBpIGFzIHVzZXJBcGkgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXInO1xuXG5pbXBvcnQgeyBVc2VyRGF0YUZpbmRlciB9IGZyb20gJy4vZGFsL2RhdGEtZmluZGVycy9Vc2VyRGF0YUZpbmRlcic7XG5pbXBvcnQgeyBVc2VyRGF0YVByb2R1Y2VyIH0gZnJvbSAnLi9kYWwvZGF0YS1wcm9kdWNlcnMvVXNlckRhdGFQcm9kdWNlcic7XG5pbXBvcnQgeyBVc2VyRGF0YVJlbW92ZXIgfSBmcm9tICcuL2RhbC9kYXRhLXJlbW92ZXJzL1VzZXJEYXRhUmVtb3Zlcic7XG5pbXBvcnQgeyBVc2VyRGF0YVVwZGF0ZXIgfSBmcm9tICcuL2RhbC9kYXRhLXVwZGF0ZXJzL1VzZXJEYXRhVXBkYXRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YUZpbmRlcjogVXNlckRhdGFGaW5kZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdXNlckRhdGFQcm9kdWNlcjogVXNlckRhdGFQcm9kdWNlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YVVwZGF0ZXI6IFVzZXJEYXRhVXBkYXRlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YVJlbW92ZXI6IFVzZXJEYXRhUmVtb3ZlcixcbiAgICApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVXNlcihkYXRhOiB1c2VyQXBpLnVzZXIuQ3JlYXRlVXNlclJlcSk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YVByb2R1Y2VyLmNyZWF0ZVVzZXIoZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVVzZXIoZGF0YTogdXNlckFwaS51c2VyLlVwZGF0ZVVzZXJSZXEsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckRhdGFVcGRhdGVyLnVwZGF0ZVVzZXIoZGF0YSwgaWQpXG4gICAgICAgICAgICAucGlwZShtYXBUbyhudWxsKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZVVzZXIoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YVJlbW92ZXIuZGVsZXRlVXNlcihpZClcbiAgICAgICAgICAgIC5waXBlKG1hcFRvKG51bGwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlcihpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx1c2VyVHlwZXMudXNlci5Vc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJEYXRhRmluZGVyLmdldFVzZXJPbmUoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2Vyc0FsbCgpOiBPYnNlcnZhYmxlPHsgdXNlcnM6IHVzZXJUeXBlcy51c2VyLlVzZXJbXSB9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJEYXRhRmluZGVyLmdldFVzZXJzQWxsKCkucGlwZShcbiAgICAgICAgICAgIG1hcCh1c2VycyA9PiAoe3VzZXJzfSkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyB2ZXJpZnlVc2VyKGRhdGE6IHVzZXJBcGkudXNlci5WZXJpZnlVc2VyUmVxKTogT2JzZXJ2YWJsZTx1c2VyVHlwZXMudXNlci5Vc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJEYXRhRmluZGVyLmdldFVzZXJCeUNvbmRpdGlvbnMoey4uLmRhdGF9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb250cm9sbGVyLCBVc2VHdWFyZHMsIFVzZUZpbHRlcnMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBHcnBjTWV0aG9kIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSnd0R3VhcmQgfSBmcm9tICdAbGliL2p3dC9Kd3RHdWFyZCc7XG5pbXBvcnQgeyBJSnd0TWV0YSB9IGZyb20gJ0BsaWIvand0L0p3dEludGVyZmFjZSc7XG5pbXBvcnQgeyBScGNFeGNlcHRpb25GaWx0ZXIgfSBmcm9tICdAbGliL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgSWRlbnRpdHkgfSBmcm9tICdAbGliL3V0aWxzL2lkZW50aXR5JztcblxuaW1wb3J0IHsgYXBpIGFzIHVzZXJUeXBlcyB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlci50eXBlcyc7XG5pbXBvcnQgeyBhcGkgYXMgdXNlckVudW0gfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIuZW51bSc7XG5pbXBvcnQgeyBhcGkgYXMgdXNlckFwaSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcic7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvVXNlclNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDcmVhdGVVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vQ3JlYXRlVXNlclJlcURUTyc7XG5pbXBvcnQgeyBWZXJpZnlVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vVmVyaWZ5VXNlclJlcURUTyc7XG5pbXBvcnQgeyBVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vVXNlclJlcURUTyc7XG5pbXBvcnQgeyBVcGRhdGVVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vVXBkYXRlVXNlclJlcURUTyc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBVc2VyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgIH1cblxuICAgIEBHcnBjTWV0aG9kKCdVc2VyU2VydmljZScsICdDcmVhdGVVc2VyJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdVc2VyQ29udHJvbGxlcjo6Y3JlYXRlVXNlcicpKVxuICAgIHB1YmxpYyBjcmVhdGVVc2VyKGRhdGE6IENyZWF0ZVVzZXJSZXFEVE8pOiBPYnNlcnZhYmxlPHVzZXJBcGkudXNlci5Vc2VyUmVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZVVzZXIoZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB1c2VyRW51bS51c2VyLkVTdGF0dXMuU1VDQ0VTUyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlgLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBAVXNlR3VhcmRzKEp3dEd1YXJkKVxuICAgIEBHcnBjTWV0aG9kKCdVc2VyU2VydmljZScsICdVcGRhdGVVc2VyJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdVc2VyQ29udHJvbGxlcjo6dXBkYXRlVXNlcicpKVxuICAgIHB1YmxpYyB1cGRhdGVVc2VyKGRhdGE6IFVwZGF0ZVVzZXJSZXFEVE8sIG1ldGE6IElKd3RNZXRhPHsgaWQ6IHN0cmluZzsgfT4pOiBPYnNlcnZhYmxlPHVzZXJBcGkudXNlci5Vc2VyUmVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLnVwZGF0ZVVzZXIoZGF0YSwgbWV0YS5wYXlsb2FkLmlkKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHVzZXJFbnVtLnVzZXIuRVN0YXR1cy5TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgVXNlciB1cGRhdGUgc3VjY2Vzc2Z1bGx5OiBJRDogJHttZXRhLnBheWxvYWQuaWR9YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQFVzZUd1YXJkcyhKd3RHdWFyZClcbiAgICBAR3JwY01ldGhvZCgnVXNlclNlcnZpY2UnLCAnRGVsZXRlVXNlcicpXG4gICAgQFVzZUZpbHRlcnMoUnBjRXhjZXB0aW9uRmlsdGVyLmZvcignVXNlckNvbnRyb2xsZXI6OmRlbGV0ZVVzZXInKSlcbiAgICBwdWJsaWMgZGVsZXRlVXNlcihkYXRhOiBVc2VyUmVxRFRPKTogT2JzZXJ2YWJsZTx1c2VyQXBpLnVzZXIuVXNlclJlcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5kZWxldGVVc2VyKGRhdGEuaWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdXNlckVudW0udXNlci5FU3RhdHVzLlNVQ0NFU1MsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBVc2VyIGRlbGV0ZSBzdWNjZXNzZnVsbHk6IElEOiAke2RhdGEuaWR9YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQEdycGNNZXRob2QoJ1VzZXJTZXJ2aWNlJywgJ1ZlcmlmeVVzZXInKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ1VzZXJDb250cm9sbGVyOjp2ZXJpZnlVc2VyJykpXG4gICAgcHVibGljIHZlcmlmeVVzZXIoZGF0YTogVmVyaWZ5VXNlclJlcURUTyk6IE9ic2VydmFibGU8dXNlclR5cGVzLnVzZXIuVXNlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS52ZXJpZnlVc2VyKGRhdGEpO1xuICAgIH1cblxuICAgIEBHcnBjTWV0aG9kKCdVc2VyU2VydmljZScsICdHZXRVc2VyJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdVc2VyQ29udHJvbGxlcjo6Z2V0VXNlcicpKVxuICAgIHB1YmxpYyBnZXRVc2VyKGRhdGE6IFVzZXJSZXFEVE8pOiBPYnNlcnZhYmxlPHVzZXJUeXBlcy51c2VyLlVzZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcihkYXRhLmlkKTtcbiAgICB9XG5cbiAgICBAR3JwY01ldGhvZCgnVXNlclNlcnZpY2UnLCAnR2V0VXNlcnNBbGwnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ1VzZXJDb250cm9sbGVyOjpnZXRVc2Vyc0FsbCcpKVxuICAgIHB1YmxpYyBnZXRVc2Vyc0FsbChkYXRhOiBJZGVudGl0eTx1c2VyVHlwZXMudXNlci5TdHViPik6IE9ic2VydmFibGU8dXNlckFwaS51c2VyLlVzZXJzUmVzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJzQWxsKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdmVyaWZ5IH0gZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IHN0YXR1cyB9IGZyb20gJ2dycGMnO1xuXG5pbXBvcnQgeyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24gfSBmcm9tICdAbGliL2V4Y2VwdGlvbnMnO1xuXG5jb25zdCBUT0tFTl9IRUFERVJfTkFNRSA9ICdhdXRob3JpemF0aW9uJztcbmNvbnN0IERFQ09ESU5HX09QVElPTlMgPSB7XG4gICAgYWxnb3JpdGhtczogWydSUzI1NiddLFxufTtcblxuZXhwb3J0IGNsYXNzIEp3dEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICAgIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGNvbnRleHQuZ2V0QXJnQnlJbmRleCgxKTtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBtZXRhLmdldChUT0tFTl9IRUFERVJfTkFNRSlbMF07XG5cbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG1ldGEucGF5bG9hZCA9IHZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1BVQiwgREVDT0RJTkdfT1BUSU9OUyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJwY0V4Y2VwdGlvbih7Y29kZTogc3RhdHVzLlVOQVVUSEVOVElDQVRFRCwgbWVzc2FnZTogZXJyb3IubWVzc2FnZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuYXV0aGVudGljYXRlZEV4Y2VwdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdycGNcIik7IiwiLyplc2xpbnQtZGlzYWJsZSBibG9jay1zY29wZWQtdmFyLCBpZC1sZW5ndGgsIG5vLWNvbnRyb2wtcmVnZXgsIG5vLW1hZ2ljLW51bWJlcnMsIG5vLXByb3RvdHlwZS1idWlsdGlucywgbm8tcmVkZWNsYXJlLCBuby1zaGFkb3csIG5vLXZhciwgc29ydC12YXJzKi9cbihmdW5jdGlvbihnbG9iYWwsIGZhY3RvcnkpIHsgLyogZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSwgbW9kdWxlICovXG5cbiAgICAvKiBBTUQgKi8gaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcbiAgICAgICAgZGVmaW5lKFtcInByb3RvYnVmanMvbWluaW1hbFwiXSwgZmFjdG9yeSk7XG5cbiAgICAvKiBDb21tb25KUyAqLyBlbHNlIGlmICh0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicHJvdG9idWZqcy9taW5pbWFsXCIpKTtcblxufSkodGhpcywgZnVuY3Rpb24oJHByb3RvYnVmKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgJHV0aWwgPSAkcHJvdG9idWYudXRpbDtcbiAgICBcbiAgICB2YXIgJHJvb3QgPSAkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdIHx8ICgkcHJvdG9idWYucm9vdHNbXCJkZWZhdWx0XCJdID0ge30pO1xuICAgIFxuICAgICRyb290LmFwaSA9IChmdW5jdGlvbigpIHtcbiAgICBcbiAgICAgICAgdmFyIGFwaSA9IHt9O1xuICAgIFxuICAgICAgICBhcGkudXNlciA9IChmdW5jdGlvbigpIHtcbiAgICBcbiAgICAgICAgICAgIHZhciB1c2VyID0ge307XG4gICAgXG4gICAgICAgICAgICB1c2VyLkVTdGF0dXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlc0J5SWQgPSB7fSwgdmFsdWVzID0gT2JqZWN0LmNyZWF0ZSh2YWx1ZXNCeUlkKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXNbdmFsdWVzQnlJZFswXSA9IFwiVU5LTk9XTlwiXSA9IDA7XG4gICAgICAgICAgICAgICAgdmFsdWVzW3ZhbHVlc0J5SWRbMV0gPSBcIlNVQ0NFU1NcIl0gPSAxO1xuICAgICAgICAgICAgICAgIHZhbHVlc1t2YWx1ZXNCeUlkWzJdID0gXCJFUlJPUlwiXSA9IDI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICAgICAgICAgIH0pKCk7XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcbiAgICAgICAgfSkoKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGFwaTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuICRyb290O1xufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm90b2J1ZmpzL21pbmltYWxcIik7IiwiaW1wb3J0IHsgSXNFbWFpbCwgSXNEZWZpbmVkLCBJc1N0cmluZywgTWF4TGVuZ3RoLCBWYWxpZGF0ZUlmIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyJztcblxuZXhwb3J0IGNsYXNzIENyZWF0ZVVzZXJSZXFEVE8gaW1wbGVtZW50cyBhcGkudXNlci5DcmVhdGVVc2VyUmVxIHtcbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNFbWFpbCgpXG4gICAgQE1heExlbmd0aCg1MClcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZztcblxuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCg1MClcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuXG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzU3RyaW5nKClcbiAgICBATWF4TGVuZ3RoKDEyOClcbiAgICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcblxuICAgIEBWYWxpZGF0ZUlmKHVzZXIgPT4gdXNlci5hdmF0YXIpXG4gICAgQElzU3RyaW5nKClcbiAgICBATWF4TGVuZ3RoKDUwMClcbiAgICBwdWJsaWMgYXZhdGFyOiBzdHJpbmc7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGFzcy12YWxpZGF0b3JcIik7IiwiaW1wb3J0IHsgSXNFbWFpbCwgSXNEZWZpbmVkLCBJc1N0cmluZywgTWF4TGVuZ3RoIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgYXBpIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyJztcblxuZXhwb3J0IGNsYXNzIFZlcmlmeVVzZXJSZXFEVE8gaW1wbGVtZW50cyBhcGkudXNlci5WZXJpZnlVc2VyUmVxIHtcbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNFbWFpbCgpXG4gICAgQE1heExlbmd0aCg1MClcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZztcblxuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCgxMjgpXG4gICAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBJc1VVSUQsIElzRGVmaW5lZCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcic7XG5cbmV4cG9ydCBjbGFzcyBVc2VyUmVxRFRPIGltcGxlbWVudHMgYXBpLnVzZXIuVXNlclJlcSB7XG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzVVVJRCgpXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBJc0VtYWlsLCBJc0RlZmluZWQsIElzU3RyaW5nLCBNYXhMZW5ndGgsIFZhbGlkYXRlSWYgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuXG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXInO1xuXG5leHBvcnQgY2xhc3MgVXBkYXRlVXNlclJlcURUTyBpbXBsZW1lbnRzIGFwaS51c2VyLlVwZGF0ZVVzZXJSZXEge1xuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc0VtYWlsKClcbiAgICBATWF4TGVuZ3RoKDUwKVxuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuXG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzU3RyaW5nKClcbiAgICBATWF4TGVuZ3RoKDUwKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG5cbiAgICBAVmFsaWRhdGVJZih1c2VyID0+IHVzZXIuYXZhdGFyKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCg1MDApXG4gICAgcHVibGljIGF2YXRhcjogc3RyaW5nO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==