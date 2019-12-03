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
const user_types_pb_1 = __webpack_require__(55);
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
                status: user_types_pb_1.EStatus.SUCCESS,
                message: `User created successfully`,
            };
        }));
    }
    updateUser(data, meta) {
        return this.userService.updateUser(data, meta.payload.id).pipe(operators_1.map(() => {
            return {
                status: user_types_pb_1.EStatus.SUCCESS,
                message: `User update successfully: ID: ${meta.payload.id}`,
            };
        }));
    }
    deleteUser(data) {
        return this.userService.deleteUser(data.id).pipe(operators_1.map(() => {
            return {
                status: user_types_pb_1.EStatus.SUCCESS,
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

// source: user.types.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(56);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.api.user.EStatus', null, global);
goog.exportSymbol('proto.api.user.Stub', null, global);
goog.exportSymbol('proto.api.user.User', null, global);
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
proto.api.user.User = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.user.User, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.user.User.displayName = 'proto.api.user.User';
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
proto.api.user.Stub = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api.user.Stub, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api.user.Stub.displayName = 'proto.api.user.Stub';
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
proto.api.user.User.prototype.toObject = function(opt_includeInstance) {
  return proto.api.user.User.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.user.User} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.user.User.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, ""),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    email: jspb.Message.getFieldWithDefault(msg, 3, ""),
    avatar: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.api.user.User}
 */
proto.api.user.User.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.user.User;
  return proto.api.user.User.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.user.User} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.user.User}
 */
proto.api.user.User.deserializeBinaryFromReader = function(msg, reader) {
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
      msg.setEmail(value);
      break;
    case 4:
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
proto.api.user.User.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.user.User.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.user.User} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.user.User.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getEmail();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getAvatar();
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
proto.api.user.User.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.api.user.User.prototype.setId = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.api.user.User.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.api.user.User.prototype.setName = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string email = 3;
 * @return {string}
 */
proto.api.user.User.prototype.getEmail = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.api.user.User.prototype.setEmail = function(value) {
  jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string avatar = 4;
 * @return {string}
 */
proto.api.user.User.prototype.getAvatar = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.api.user.User.prototype.setAvatar = function(value) {
  jspb.Message.setProto3StringField(this, 4, value);
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
proto.api.user.Stub.prototype.toObject = function(opt_includeInstance) {
  return proto.api.user.Stub.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api.user.Stub} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.user.Stub.toObject = function(includeInstance, msg) {
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
 * @return {!proto.api.user.Stub}
 */
proto.api.user.Stub.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api.user.Stub;
  return proto.api.user.Stub.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api.user.Stub} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api.user.Stub}
 */
proto.api.user.Stub.deserializeBinaryFromReader = function(msg, reader) {
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
proto.api.user.Stub.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api.user.Stub.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api.user.Stub} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api.user.Stub.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


/**
 * @enum {number}
 */
proto.api.user.EStatus = {
  UNKNOWN: 0,
  SUCCESS: 1,
  ERROR: 2
};

goog.object.extend(exports, proto.api.user);


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("google-protobuf");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9tYWluLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuZXN0anMvY29tbW9uXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL0xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvbG9nZ2VyL21lc3NhZ2UvTWVzc2FnZUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL2NvbG9yaXplcnMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9mb3JtYXQudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2xvZ2dlci9tZXNzYWdlL01lc3NhZ2VQcmludGVyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9sb2dnZXIvQm9vdHN0cmFwTG9nZ2VyLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy91dGlscy9HcnBjQ29uZmlncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmVzdGpzL21pY3Jvc2VydmljZXNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL0FwcE1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvand0L0NlcnRzU2VydmljZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9vcGVyYXRvcnNcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL2FwaS9BcGlNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9Vc2VyTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvU2VydmljZXNNb2R1bGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9zZXJ2aWNlcy9kYWwvRGFsTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9EYXRhRmluZGVyc01vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRiLW1pZ3JhdGVcIiIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL2Vudi50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvVXNlckRhdGFGaW5kZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL2NvZGUudHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9JbnZhbGlkQXJndW1lbnRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9CYXNlRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvTm90Rm91bmRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9pbXBsL0ludGVybmFsRXhjZXB0aW9uLnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ltcGwvVW5hdmFpbGFibGVFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvaW1wbC9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL1JwY0V4Y2VwdGlvbkZpbHRlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvZXhjZXB0aW9ucy9maWx0ZXIvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL0V4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uL2xpYnMvbGliL3NyYy9leGNlcHRpb25zL2ZpbHRlci9oYW5kbGVycy9pbXBsL1JwY0V4Y2VwdGlvbkhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlicy9saWIvc3JjL2V4Y2VwdGlvbnMvZmlsdGVyL2hhbmRsZXJzL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtdXBkYXRlcnMvRGF0YVVwZGF0ZXJzTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtdXBkYXRlcnMvVXNlckRhdGFVcGRhdGVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtcHJvZHVjZXJzL0RhdGFQcm9kdWNlck1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYXRhLXByb2R1Y2Vycy9Vc2VyRGF0YVByb2R1Y2VyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtcmVtb3ZlcnMvRGF0YVJlbW92ZXJzTW9kdWxlLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvZGFsL2RhdGEtcmVtb3ZlcnMvVXNlckRhdGFSZW1vdmVyLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvc2VydmljZXMvVXNlclNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9Vc2VyQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly8vLi9saWJzL2xpYi9zcmMvand0L0p3dEd1YXJkLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdycGNcIiIsIndlYnBhY2s6Ly8vLi9saWJzL2dycGMtcHJvdG8vdXNlci91c2VyLnR5cGVzX3BiLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImdvb2dsZS1wcm90b2J1ZlwiIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvYXBpL3VzZXIvZHRvL0NyZWF0ZVVzZXJSZXFEVE8udHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2xhc3MtdmFsaWRhdG9yXCIiLCJ3ZWJwYWNrOi8vLy4vYXBwcy91c2VyL3NyYy9hcGkvdXNlci9kdG8vVmVyaWZ5VXNlclJlcURUTy50cyIsIndlYnBhY2s6Ly8vLi9hcHBzL3VzZXIvc3JjL2FwaS91c2VyL2R0by9Vc2VyUmVxRFRPLnRzIiwid2VicGFjazovLy8uL2FwcHMvdXNlci9zcmMvYXBpL3VzZXIvZHRvL1VwZGF0ZVVzZXJSZXFEVE8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FB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Q1JELGtEQUFzRjtBQUl0RixNQUFhLGdCQUFnQjtDQWU1QjtBQVhHO0lBSEMsMkJBQVMsRUFBRTtJQUNYLHlCQUFPLEVBQUU7SUFDVCwyQkFBUyxDQUFDLEVBQUUsQ0FBQzs7K0NBQ087QUFLckI7SUFIQywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLENBQUMsRUFBRSxDQUFDOzs4Q0FDTTtBQUtwQjtJQUhDLDRCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQy9CLDBCQUFRLEVBQUU7SUFDViwyQkFBUyxDQUFDLEdBQUcsQ0FBQzs7Z0RBQ087QUFkMUIsNENBZUMiLCJmaWxlIjoiYXBwcy91c2VyL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJwcm9jZXNzLnRpdGxlID0gJ25vZGUtdXNlcic7XG5cbmltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IExvZ2dlciBhcyBOZXN0TG9nZ2VyLCBWYWxpZGF0aW9uUGlwZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgQm9vdHN0cmFwTG9nZ2VyIH0gZnJvbSAnQGxpYi9sb2dnZXInO1xuaW1wb3J0IHsgZ3JwY1VzZXIgfSBmcm9tICdAbGliL3V0aWxzL0dycGNDb25maWdzJztcblxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9BcHBNb2R1bGUnO1xuXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gbmV3IEJvb3RzdHJhcExvZ2dlcigpO1xuLy8gb3ZlcnJpZGUgbG9nZ2VyIHdpdGggb3VyIGltcGxlbWVudGF0aW9uIGZvciB0cmFuc2Zvcm1pbmcgbG9ncyBsaWtlXG4vLyBcIltOZXN0XSA0MDYgICAtIDgvMTIvMjAxOSwgMTE6MDA6NDEgQU0gICBbTmVzdEZhY3RvcnldIC4uLlwiXG5OZXN0TG9nZ2VyLm92ZXJyaWRlTG9nZ2VyKGxvZ2dlcik7XG5cbmFzeW5jIGZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcbiAgICBjb25zdCBhcHAgPSBhd2FpdCBOZXN0RmFjdG9yeS5jcmVhdGVNaWNyb3NlcnZpY2UoQXBwTW9kdWxlLCBncnBjVXNlcik7XG5cbiAgICBhcHAudXNlTG9nZ2VyKGxvZ2dlcik7XG4gICAgYXBwLnVzZUdsb2JhbFBpcGVzKG5ldyBWYWxpZGF0aW9uUGlwZSgpKTtcblxuICAgIGF3YWl0IGFwcC5saXN0ZW5Bc3luYygpO1xufVxuXG5ib290c3RyYXAoKS5jYXRjaChlcnIgPT4ge1xuICAgIGxvZ2dlci5lcnJvcihlcnIpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5lc3Rqcy9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvY29tbW9uXCIpOyIsImV4cG9ydCAqIGZyb20gJy4vTG9nZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vQm9vdHN0cmFwTG9nZ2VyJztcbiIsImltcG9ydCB7IEFMTE9XRURfTE9HX0JZX0xFVkVMLCBERUZBVUxUX0xPR0dFUl9MRVZFTCwgTG9nTGV2ZWxUeXBlLCBMT0dfTEVWRUxfTkFNRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IE1lc3NhZ2VCdWlsZGVyIH0gZnJvbSAnLi9tZXNzYWdlL01lc3NhZ2VCdWlsZGVyJztcbmltcG9ydCB7IE1lc3NhZ2VQcmludGVyIH0gZnJvbSAnLi9tZXNzYWdlL01lc3NhZ2VQcmludGVyJztcblxuY29uc3QgQ1VSUkVOVF9MT0dfTEVWRUwgPSBwcm9jZXNzLmVudi5MT0dHRVJfTEVWRUwgfHwgREVGQVVMVF9MT0dHRVJfTEVWRUw7XG5jb25zdCBDVVJSRU5UX0FMTE9XRURfTEVWRUxTID0gQUxMT1dFRF9MT0dfQllfTEVWRUxbQ1VSUkVOVF9MT0dfTEVWRUxdO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VQcmludGVyOiBNZXNzYWdlUHJpbnRlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VCdWlsZGVyOiBNZXNzYWdlQnVpbGRlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1lc3NhZ2VCdWlsZGVyID0gbmV3IE1lc3NhZ2VCdWlsZGVyKHRoaXMubGFiZWwpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VQcmludGVyID0gbmV3IE1lc3NhZ2VQcmludGVyKHRoaXMubWVzc2FnZUJ1aWxkZXIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWJ1ZyguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ01lc3NhZ2UoTE9HX0xFVkVMX05BTUUuZGVidWcsIGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbmZvKC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9nTWVzc2FnZShMT0dfTEVWRUxfTkFNRS5pbmZvLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXJyb3IoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLmVycm9yLCBhcmdzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VjdXJpdHkoLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dNZXNzYWdlKExPR19MRVZFTF9OQU1FLnNlY3VyaXR5LCBhcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvZ01lc3NhZ2UoY3VycmVudExldmVsOiBMb2dMZXZlbFR5cGUsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGlmIChDVVJSRU5UX0FMTE9XRURfTEVWRUxTLmhhcyhjdXJyZW50TGV2ZWwpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VQcmludGVyLnByaW50KGN1cnJlbnRMZXZlbCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgdHlwZSBMb2dMZXZlbFR5cGUgPSAnZGVidWcnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICdzZWN1cml0eSc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPR0dFUl9MRVZFTCA9ICdpbmZvJztcblxuZXhwb3J0IGNvbnN0IEFMTE9XRURfTE9HX0JZX0xFVkVMID0ge1xuICAgIGRlYnVnOiBuZXcgU2V0KFsnZGVidWcnLCAnaW5mbycsICdlcnJvcicsICdzZWN1cml0eSddKSxcbiAgICBpbmZvOiBuZXcgU2V0KFsnaW5mbycsICdlcnJvcicsICdzZWN1cml0eSddKSxcbiAgICBlcnJvcjogbmV3IFNldChbJ2Vycm9yJywgJ3NlY3VyaXR5J10pLFxuICAgIHNlY3VyaXR5OiBuZXcgU2V0KFsnc2VjdXJpdHknXSksXG59O1xuXG5leHBvcnQgY29uc3QgTE9HX0xFVkVMX05BTUUgPSB7XG4gICAgZGVidWc6ICdkZWJ1ZycgYXMgTG9nTGV2ZWxUeXBlLFxuICAgIGluZm86ICdpbmZvJyBhcyBMb2dMZXZlbFR5cGUsXG4gICAgZXJyb3I6ICdlcnJvcicgYXMgTG9nTGV2ZWxUeXBlLFxuICAgIHNlY3VyaXR5OiAnc2VjdXJpdHknIGFzIExvZ0xldmVsVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBNRVNTQUdFX0NPTE9SX0JZX0xFVkVMID0ge1xuICAgIGRlYnVnOiA5MCxcbiAgICBpbmZvOiAzMixcbiAgICBlcnJvcjogMzEsXG4gICAgc2VjdXJpdHk6IDM2LFxufTtcbiIsImltcG9ydCB7IExvZ0xldmVsVHlwZSB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBjb2xvcml6ZVRpbWVzdGFtcCwgY29sb3JpemVMZXZlbCwgY29sb3JpemVMYWJlbCwgY29sb3JpemVNZXNzYWdlIH0gZnJvbSAnLi9jb2xvcml6ZXJzJztcbmltcG9ydCB7IHBhZFN0YXJ0LCBwYWRFbmQgfSBmcm9tICcuLi9mb3JtYXQnO1xuXG5jb25zdCBERUxJTUlURVJTID0ge1xuICAgIGRhdGU6ICctJyxcbiAgICB0aW1lOiAnOicsXG4gICAgbG9nTWVzc2FnZTogJyAnLFxuICAgIGZ1bGxNZXNzYWdlOiAnIDo6ICcsXG59O1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJ1aWxkZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29sb3JpemVNZXNzYWdlcyA9IHByb2Nlc3MuZW52LkxPR0dFUl9DT0xPUklaRV9NRVNTQUdFUyA9PT0gJ3RydWUnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBsYWJlbDogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGJ1aWxkKGxldmVsOiBMb2dMZXZlbFR5cGUsIGFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gdGhpcy5nZXRUaW1lc3RhbXAoKTtcbiAgICAgICAgY29uc3QgbG9nTWVzc2FnZSA9IHRoaXMucHJlcGFyZU1lc3NhZ2VGcm9tQXJncyhhcmdzKTtcblxuICAgICAgICBpZiAoIXRoaXMuY29sb3JpemVNZXNzYWdlcykge1xuICAgICAgICAgICAgcmV0dXJuIFt0aW1lc3RhbXAsIGxldmVsLCB0aGlzLmxhYmVsLCBsb2dNZXNzYWdlXS5qb2luKERFTElNSVRFUlMuZnVsbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGNvbG9yaXplVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICAgICAgICBjb2xvcml6ZUxldmVsKGxldmVsKSxcbiAgICAgICAgICAgIGNvbG9yaXplTGFiZWwodGhpcy5sYWJlbCksXG4gICAgICAgICAgICBjb2xvcml6ZU1lc3NhZ2UobGV2ZWwsIGxvZ01lc3NhZ2UpLFxuICAgICAgICBdLmpvaW4oREVMSU1JVEVSUy5mdWxsTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaW1lc3RhbXAoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGxvZ0RhdGUgPSBbcGFkU3RhcnQoZGF0ZS5nZXREYXRlKCkpLCBwYWRTdGFydChkYXRlLmdldE1vbnRoKCkgKyAxKSwgZGF0ZS5nZXRGdWxsWWVhcigpXS5qb2luKERFTElNSVRFUlMuZGF0ZSk7XG4gICAgICAgIGNvbnN0IGxvZ1RpbWUgPSBbcGFkU3RhcnQoZGF0ZS5nZXRIb3VycygpKSwgcGFkU3RhcnQoZGF0ZS5nZXRNaW51dGVzKCkpLCBwYWRFbmQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSldLmpvaW4oREVMSU1JVEVSUy50aW1lKTtcblxuICAgICAgICByZXR1cm4gYFske2xvZ0RhdGV9ICR7bG9nVGltZX1dYDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVNZXNzYWdlRnJvbUFyZ3MoYXJnczogYW55W10pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYXJnc1xuICAgICAgICAgICAgLm1hcChpdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBpdDtcblxuICAgICAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcHJlcGFyZSB1bmRlZmluZWQsIG51bGwsIHN0cmluZyAmIG51bWJlciB0eXBlc1xuICAgICAgICAgICAgICAgIGlmIChbJ251bWJlcicsICdzdHJpbmcnLCAndW5kZWZpbmVkJ10uaW5jbHVkZXModHlwZSkgfHwgaXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHRyeSBhZGQgc3RhY2sgb3IgbWVzc2FnZSBmcm9tIEVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGl0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2l0LnN0YWNrIHx8IGl0Lm1lc3NhZ2UgfHwgaXR9YDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzdHJpbmdpZnkgb3RoZXIgdHlwZXMsIHN1Y2ggYXMgYXJyYXksIG9iamVjdFxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtKU09OLnN0cmluZ2lmeShpdCwgbnVsbCwgMil9YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbihERUxJTUlURVJTLmxvZ01lc3NhZ2UpO1xuICAgIH1cbn1cbiIsIi8vIGFib3V0IGNvbG9yaXppbmcgbWVzc2FnZXMgaW4gc3Rkb3V0IHNlZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQxNDA3MjQ2XG5cbmltcG9ydCB7IE1FU1NBR0VfQ09MT1JfQllfTEVWRUwgfSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5jb25zdCBERUZBVUxUX0NPTE9SID0gTUVTU0FHRV9DT0xPUl9CWV9MRVZFTC5pbmZvO1xuY29uc3QgVElNRVNUQU1QX0NPTE9SID0gJzUwJztcbmNvbnN0IExBQkVMX0NPTE9SID0gJzMzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yaXplVGltZXN0YW1wKHRpbWVzdGFtcDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29sb3JpemUoVElNRVNUQU1QX0NPTE9SLCB0aW1lc3RhbXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVMZXZlbChsZXZlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29sb3JpemUoTUVTU0FHRV9DT0xPUl9CWV9MRVZFTFtsZXZlbF0gfHwgREVGQVVMVF9DT0xPUiwgbGV2ZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sb3JpemVMYWJlbChsYWJlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29sb3JpemUoTEFCRUxfQ09MT1IsIGxhYmVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbG9yaXplTWVzc2FnZShsZXZlbDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb2xvcml6ZShNRVNTQUdFX0NPTE9SX0JZX0xFVkVMW2xldmVsXSB8fCBERUZBVUxUX0NPTE9SLCBtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gY29sb3JpemUoY29sb3I6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gWydcXHgxYlsnLCBjb2xvciwgJ20nLCBtZXNzYWdlLCAnXFx4MWJbMG0nXS5qb2luKCcnKTtcbn1cbiIsImV4cG9ydCBjb25zdCBwYWRTdGFydCA9IChkYXRhOiBudW1iZXIsIHBhZE51bTogbnVtYmVyID0gMik6IHN0cmluZyA9PiBkYXRhLnRvU3RyaW5nKCkucGFkU3RhcnQocGFkTnVtLCAnMCcpO1xuXG5leHBvcnQgY29uc3QgcGFkRW5kID0gKGRhdGE6IG51bWJlciwgcGFkTnVtOiBudW1iZXIgPSAzKTogc3RyaW5nID0+IGRhdGEudG9TdHJpbmcoKS5wYWRFbmQocGFkTnVtLCAnMCcpO1xuIiwiaW1wb3J0IHsgTG9nTGV2ZWxUeXBlIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IE1lc3NhZ2VCdWlsZGVyIH0gZnJvbSAnLi9NZXNzYWdlQnVpbGRlcic7XG5cbmNvbnN0IE5PT1AgPSAoKSA9PiAoe30pO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVByaW50ZXIge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbWVzc2FnZUJ1aWxkZXI6IE1lc3NhZ2VCdWlsZGVyKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHByaW50KGxldmVsOiBMb2dMZXZlbFR5cGUsIGFyZ3M6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJpbnRQcmVwYXJlZE1lc3NhZ2UodGhpcy5tZXNzYWdlQnVpbGRlci5idWlsZChsZXZlbCwgYXJncykgKyAnXFxuJyk7XG4gICAgfVxuXG4gICAgLy8gY2hhdDogY2hlY2sgdGhpcyBpbXBsZW1lbnRhdGlvbiBpbiBodHRwczovL3NkZXhudC5hdGxhc3NpYW4ubmV0L2Jyb3dzZS9XRUJCQUNLLTQ4NVxuICAgIHByaXZhdGUgcHJpbnRQcmVwYXJlZE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvbWFzdGVyL2xpYi9pbnRlcm5hbC9jb25zb2xlL2NvbnN0cnVjdG9yLmpzI0wyMzJcblxuICAgICAgICAvLyB0aGVyZSBtYXkgYmUgYW4gZXJyb3Igb2NjdXJyaW5nIHN5bmNocm9ub3VzbHkgKGUuZy4gZm9yIGZpbGVzIG9yIFRUWXNcbiAgICAgICAgLy8gb24gUE9TSVggc3lzdGVtcykgb3IgYXN5bmNocm9ub3VzbHkgKGUuZy4gcGlwZXMgb24gUE9TSVggc3lzdGVtcyksIHNvXG4gICAgICAgIC8vIGhhbmRsZSBib3RoIHNpdHVhdGlvbnMuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBhZGQgYW5kIGxhdGVyIHJlbW92ZSBhIG5vb3AgZXJyb3IgaGFuZGxlciB0byBjYXRjaCBzeW5jaHJvbm91cyBlcnJvcnMuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5zdGRvdXQubGlzdGVuZXJDb3VudCgnZXJyb3InKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0Lm9uY2UoJ2Vycm9yJywgTk9PUCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UsIE5PT1ApO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIHRoZXJlJ3Mgbm8gcHJvcGVyIHdheSB0byBwYXNzIGFsb25nIHRoZSBlcnJvciBoZXJlXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBOT09QKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJy4vTG9nZ2VyJztcblxuY29uc3QgREVGQVVMVF9MT0dHRVJfTkFNRSA9ICdib290c3RyYXAnO1xuXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwTG9nZ2VyIGltcGxlbWVudHMgTG9nZ2VyU2VydmljZSB7XG4gICAgcHJpdmF0ZSBsb2dnZXI6IExvZ2dlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbGFiZWw/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBuZXcgTG9nZ2VyKHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsIDogREVGQVVMVF9MT0dHRVJfTkFNRSk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvZyhtZXNzYWdlOiBhbnksIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXJyb3IobWVzc2FnZTogYW55LCB0cmFjZT86IHN0cmluZywgY29udGV4dD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybihtZXNzYWdlOiBhbnksIGNvbnRleHQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gb3VyIGltcGxlbWVudGF0aW9uIG9mIHRoZSBsb2dnZXIgZG9lcyBub3QgeWV0IG5lZWRcbiAgICAgICAgLy8gdGhlIFwid2FybmluZ1wiIGxldmVsLCBzbyB3ZSB3aWxsIHdyaXRlIHRoZSBsb2dzXG4gICAgICAgIC8vIGNvbWluZyBmcm9tIGhlcmUgdG8gXCJlcnJvclwiIGxldmVsXG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEdycGNPcHRpb25zLCBUcmFuc3BvcnQgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxuZXhwb3J0IGNvbnN0IGdycGNDaGF0ID0ge1xuICAgIHRyYW5zcG9ydDogVHJhbnNwb3J0LkdSUEMsXG4gICAgb3B0aW9uczoge1xuICAgICAgICB1cmw6IGVudi5HUlBDX0NIQVRfU0VSVklDRSB8fCAnMTI3LjAuMC4xOjgwMDMnLFxuICAgICAgICBwYWNrYWdlOiAnYXBpLmNoYXQnLFxuICAgICAgICBwcm90b1BhdGg6ICcuL2xpYnMvZ3JwYy1wcm90by9jaGF0L2luZGV4LnByb3RvJyxcbiAgICB9LFxufSBhcyBHcnBjT3B0aW9ucztcblxuZXhwb3J0IGNvbnN0IGdycGNBdXRoID0ge1xuICAgIHRyYW5zcG9ydDogVHJhbnNwb3J0LkdSUEMsXG4gICAgb3B0aW9uczoge1xuICAgICAgICB1cmw6IGVudi5HUlBDX0FVVEhfU0VSVklDRSB8fCAnMTI3LjAuMC4xOjgwMDInLFxuICAgICAgICBwYWNrYWdlOiAnYXBpLmF1dGgnLFxuICAgICAgICBwcm90b1BhdGg6ICcuL2xpYnMvZ3JwYy1wcm90by9hdXRoL2luZGV4LnByb3RvJyxcbiAgICB9LFxufSBhcyBHcnBjT3B0aW9ucztcblxuZXhwb3J0IGNvbnN0IGdycGNVc2VyID0ge1xuICAgIHRyYW5zcG9ydDogVHJhbnNwb3J0LkdSUEMsXG4gICAgb3B0aW9uczoge1xuICAgICAgICB1cmw6IGVudi5HUlBDX1VTRVJfU0VSVklDRSB8fCAnMTI3LjAuMC4xOjgwMDEnLFxuICAgICAgICBwYWNrYWdlOiAnYXBpLnVzZXInLFxuICAgICAgICBwcm90b1BhdGg6ICcuL2xpYnMvZ3JwYy1wcm90by91c2VyL2luZGV4LnByb3RvJyxcbiAgICB9LFxufSBhcyBHcnBjT3B0aW9ucztcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuZXN0anMvbWljcm9zZXJ2aWNlc1wiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IENlcnRzU2VydmljZSB9IGZyb20gJ0BsaWIvand0L0NlcnRzU2VydmljZSc7XG5pbXBvcnQgeyBBcGlNb2R1bGUgfSBmcm9tICcuL2FwaS9BcGlNb2R1bGUnO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIEFwaU1vZHVsZSxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW0NlcnRzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBPbk1vZHVsZUluaXQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQsIENsaWVudEdycGMgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGltZXIsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHJldHJ5V2hlbiwgdGFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgR2V0Q2VydFN0cmVhbVJlcyB9IGZyb20gJ0BncnBjLXByb3RvL2F1dGgvYXV0aF9wYic7XG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BsaWIvbG9nZ2VyJztcbmltcG9ydCB7IGdycGNBdXRoIH0gZnJvbSAnQGxpYi91dGlscy9HcnBjQ29uZmlncyc7XG5cbmludGVyZmFjZSBJQXV0aFNlcnZpY2Uge1xuICAgIGdldENlcnRTdHJlYW0oKTogT2JzZXJ2YWJsZTxHZXRDZXJ0U3RyZWFtUmVzLkFzT2JqZWN0Pjtcbn1cblxuY29uc3QgUkVUUlkgPSAxMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENlcnRzU2VydmljZSBpbXBsZW1lbnRzIE9uTW9kdWxlSW5pdCB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdDZXJ0c1NlcnZpY2UnKTtcblxuICAgIEBDbGllbnQoZ3JwY0F1dGgpIHByaXZhdGUgcmVhZG9ubHkgZ3JwY0F1dGhDbGllbnQ6IENsaWVudEdycGM7XG4gICAgcHJpdmF0ZSBncnBjQXV0aFNlcnZpY2U6IElBdXRoU2VydmljZTtcblxuICAgIHB1YmxpYyBvbk1vZHVsZUluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ3JwY0F1dGhTZXJ2aWNlID0gdGhpcy5ncnBjQXV0aENsaWVudC5nZXRTZXJ2aWNlPElBdXRoU2VydmljZT4oJ0F1dGhTZXJ2aWNlJyk7XG5cbiAgICAgICAgdGhpcy5ncnBjQXV0aFNlcnZpY2UuZ2V0Q2VydFN0cmVhbSgpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICByZXRyeVdoZW4oZXJyb3JzID0+XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFwKGVyciA9PiB0aGlzLmxvZ2dlci5lcnJvcihlcnIubWVzc2FnZSArICcuIFdpbGwgdHJ5IGFnYWluIGFmdGVyIHRpbWVvdXQgaW4gM3MuJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VNYXAoKCkgPT4gKFJFVFJZID8gdGltZXIoMzAwMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93RXJyb3IoYENhbid0IHJlY29ubmVjdCB0byBDZXJ0U3RyZWFtJywgdGltZW91dCBleHBpcmVkLmApKSksXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52LkpXVF9QVUIgPSByZXMua2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzL29wZXJhdG9yc1wiKTsiLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IFVzZXJNb2R1bGUgfSBmcm9tICcuL3VzZXIvVXNlck1vZHVsZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtVc2VyTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBpTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgU2VydmljZXNNb2R1bGUgfSBmcm9tICdAdXNlci9zZXJ2aWNlcy9TZXJ2aWNlc01vZHVsZSc7XG5pbXBvcnQgeyBVc2VyQ29udHJvbGxlciB9IGZyb20gJy4vVXNlckNvbnRyb2xsZXInO1xuXG5ATW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbU2VydmljZXNNb2R1bGVdLFxuICAgIGNvbnRyb2xsZXJzOiBbVXNlckNvbnRyb2xsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGFsTW9kdWxlIH0gZnJvbSAnLi9kYWwvRGFsTW9kdWxlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9Vc2VyU2VydmljZSc7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYWxNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcbiAgICBleHBvcnRzOiBbVXNlclNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlc01vZHVsZSB7XG59XG5cbmV4cG9ydCAqIGZyb20gJy4vZGFsL0RhbE1vZHVsZSc7XG4iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IERhdGFGaW5kZXJzTW9kdWxlIH0gZnJvbSAnLi9kYXRhLWZpbmRlcnMvRGF0YUZpbmRlcnNNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YVVwZGF0ZXJzTW9kdWxlIH0gZnJvbSAnLi9kYXRhLXVwZGF0ZXJzL0RhdGFVcGRhdGVyc01vZHVsZSc7XG5pbXBvcnQgeyBEYXRhUHJvZHVjZXJNb2R1bGUgfSBmcm9tICcuL2RhdGEtcHJvZHVjZXJzL0RhdGFQcm9kdWNlck1vZHVsZSc7XG5pbXBvcnQgeyBEYXRhUmVtb3ZlcnNNb2R1bGUgfSBmcm9tICcuL2RhdGEtcmVtb3ZlcnMvRGF0YVJlbW92ZXJzTW9kdWxlJztcblxuQE1vZHVsZSh7XG4gICAgaW1wb3J0czogW0RhdGFGaW5kZXJzTW9kdWxlLCBEYXRhUHJvZHVjZXJNb2R1bGUsIERhdGFVcGRhdGVyc01vZHVsZSwgRGF0YVJlbW92ZXJzTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRGF0YUZpbmRlcnNNb2R1bGUsIERhdGFQcm9kdWNlck1vZHVsZSwgRGF0YVVwZGF0ZXJzTW9kdWxlLCBEYXRhUmVtb3ZlcnNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBEYWxNb2R1bGUge1xufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYk1vZHVsZSB9IGZyb20gJ0B1c2VyL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZSc7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnLi9Vc2VyRGF0YUZpbmRlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbVXNlckRhdGFGaW5kZXJdLFxuICAgIGV4cG9ydHM6IFtVc2VyRGF0YUZpbmRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFGaW5kZXJzTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IE1vZHVsZSwgT25Nb2R1bGVJbml0IH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0ICogYXMgREJNaWdyYXRlIGZyb20gJ2RiLW1pZ3JhdGUnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGxpYi9sb2dnZXInO1xuaW1wb3J0IHsgZGJDb25maWcsIG1pZ3JhdGVDb25maWcgfSBmcm9tICdAdXNlci9lbnYnO1xuXG5ATW9kdWxlKHtcbiAgICBleHBvcnRzOiBbQ2xpZW50XSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogQ2xpZW50LFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogKCkgPT4gbmV3IENsaWVudChkYkNvbmZpZyksXG4gICAgICAgIH0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGJNb2R1bGUgaW1wbGVtZW50cyBPbk1vZHVsZUluaXQge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignRGJNb2R1bGUnKTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRibWlncmF0ZSA9IERCTWlncmF0ZS5nZXRJbnN0YW5jZSh0cnVlLCBtaWdyYXRlQ29uZmlnKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZGI6IENsaWVudCkge1xuICAgIH1cblxuICAgIG9uTW9kdWxlSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGJtaWdyYXRlKSB7XG4gICAgICAgICAgICBmcm9tKHRoaXMuZGJtaWdyYXRlLnVwKCkpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKCdNaWdyYXRpb25zIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRiLmNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRiLW1pZ3JhdGVcIik7IiwiaW1wb3J0IHsgQ2xpZW50Q29uZmlnIH0gZnJvbSAncGcnO1xuXG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudjtcblxuZXhwb3J0IGNvbnN0IFNBTFQgPSBlbnYuU0FMVCB8fCAnU1lxU3VpalZ2eVVFJztcblxuZXhwb3J0IGNvbnN0IGRiQ29uZmlnOiBDbGllbnRDb25maWcgPSB7XG4gICAgaG9zdDogZW52LkRCX0hPU1QgfHwgJ2xvY2FsaG9zdCcsXG4gICAgcG9ydDogK2Vudi5EQl9QT1JUIHx8IDU0MzIsXG4gICAgdXNlcjogZW52LkRCX1VTRVJOQU1FIHx8ICdwb3N0Z3JlcycsXG4gICAgcGFzc3dvcmQ6IGVudi5EQl9QQVNTV09SRCB8fCAncG9zdGdyZXMnLFxuICAgIGRhdGFiYXNlOiBlbnYuREJfREFUQUJBU0VfVVNFUiB8fCAndXNlcicsXG4gICAga2VlcEFsaXZlOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IG1pZ3JhdGVDb25maWcgPSB7XG4gICAgY3dkOiBgLi9hcHBzL3VzZXIvc3JjL3NlcnZpY2VzL2RhbC9kYmAsXG4gICAgZW52OiAndXNlcicsXG4gICAgc3RyaW5nOiAnLi9kYXRhYmFzZS5qc29uJyxcbn07XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgY3JlYXRlSG1hYyB9IGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5vdEZvdW5kRXhjZXB0aW9uLCBVU0VSX05PVF9GT1VORCB9IGZyb20gJ0BsaWIvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIudHlwZXNfcGInO1xuaW1wb3J0IHsgVmVyaWZ5VXNlclJlcSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcl9wYic7XG5cbmltcG9ydCB7IFNBTFQgfSBmcm9tICdAdXNlci9lbnYnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckRhdGFGaW5kZXIge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50KSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb25kaXRpb25RdWVyeShkYXRhOiBWZXJpZnlVc2VyUmVxLkFzT2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGRhdGEucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSBjcmVhdGVIbWFjKCdzaGE1MTInLCBTQUxUKS51cGRhdGUoZGF0YS5wYXNzd29yZCkuZGlnZXN0KCdoZXgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGtleXMubWFwKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhbmQgPSBrZXlzLmxlbmd0aCA+IDEgJiYgaW5kZXggPCBrZXlzLmxlbmd0aCAtIDEgPyAnIGFuZCAnIDogJyc7XG4gICAgICAgICAgICByZXR1cm4gYCR7a2V5fT0nJHtkYXRhW2tleV19JyR7YW5kfWA7XG4gICAgICAgIH0pLmpvaW4oJycpO1xuXG4gICAgICAgIHJldHVybiBgc2VsZWN0ICogZnJvbSBhcGlfdXNlciB3aGVyZSAke2NvbmRpdGlvbnN9YDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlck9uZShpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyLkFzT2JqZWN0PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gYHNlbGVjdCAqIGZyb20gYXBpX3VzZXIgd2hlcmUgaWQgPSAkMWA7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5kYi5xdWVyeTxVc2VyLkFzT2JqZWN0PihxdWVyeSwgW2lkXSkpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMucm93Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZEV4Y2VwdGlvbihVU0VSX05PVF9GT1VORCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnJvd3NbMF07XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VyQnlDb25kaXRpb25zKGRhdGE6IFZlcmlmeVVzZXJSZXEuQXNPYmplY3QpOiBPYnNlcnZhYmxlPFVzZXIuQXNPYmplY3Q+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmdldENvbmRpdGlvblF1ZXJ5KGRhdGEpO1xuXG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMuZGIucXVlcnk8VXNlci5Bc09iamVjdD4ocXVlcnkpKVxuICAgICAgICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMucm93c1swXSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2Vyc0J5SWRzKGlkczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPFVzZXIuQXNPYmplY3RbXT4ge1xuICAgICAgICBsZXQgcXVlcnkgPSBgc2VsZWN0ICogZnJvbSBhcGlfdXNlciB3aGVyZSBpZCBpbiAoYDtcbiAgICAgICAgaWRzLmZvckVhY2goKGlkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW5kID0gaW5kZXggPT09IGlkcy5sZW5ndGggLSAxID8gYClgIDogYCxgO1xuICAgICAgICAgICAgcXVlcnkgKz0gYCcke2lkfScke2VuZH1gO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZnJvbSh0aGlzLmRiLnF1ZXJ5PFVzZXIuQXNPYmplY3Q+KHF1ZXJ5KSlcbiAgICAgICAgICAgIC5waXBlKG1hcChyZXMgPT4gcmVzLnJvd3MpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlcnNBbGwoKTogT2JzZXJ2YWJsZTxVc2VyLkFzT2JqZWN0W10+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBgc2VsZWN0ICogZnJvbSBhcGlfdXNlcmA7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy5kYi5xdWVyeTxVc2VyLkFzT2JqZWN0PihxdWVyeSkpXG4gICAgICAgICAgICAucGlwZShtYXAocmVzID0+IHJlcy5yb3dzKSk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsImV4cG9ydCAqIGZyb20gJy4vaW1wbCc7XG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci9ScGNFeGNlcHRpb25GaWx0ZXInO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9jb2RlLnR5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vSW52YWxpZEFyZ3VtZW50RXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vTm90Rm91bmRFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9BbHJlYWR5RXhpc3RzRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0ludGVybmFsRXhjZXB0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vVW5hdmFpbGFibGVFeGNlcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9VbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24nO1xuIiwiZXhwb3J0IGludGVyZmFjZSBJRXJyb3Ige1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIEVDb2RlcyB7XG4gICAgRVJST1JfQ09ERV9VTkRFRklORUQgPSAwLFxuICAgIC8vIGludmFsaWQgYXJndW1lbnQgY29kZXNcbiAgICBJTlZBTElEX0FSR1VNRU5UID0gMyxcbiAgICAvLyByZXF1aXJlZCBjb2Rlc1xuICAgIFVTRVJfSURfUkVRVUlSRUQgPSAzMDEsXG4gICAgLy8gbm90IGZvdW5kIGNvZGVzXG4gICAgTk9UX0ZPVU5EID0gNSxcbiAgICBVU0VSX05PVF9GT1VORCA9IDUwMSxcbiAgICAvLyBhbHJlYWR5IGV4aXN0IGNvZGVzXG4gICAgQUxSRUFEWV9FWElTVCA9IDYsXG4gICAgRU1BSUxfQUxSRUFEWV9FWElTVFMgPSA2MDEsXG4gICAgLy8gcGVybWlzc2lvbiBkZW5pZWQgY29kZXNcbiAgICBQRVJNSVNTSU9OX0RFTklFRCA9IDcsXG4gICAgLy8gaW50ZXJuYWwgZXJyb3IgY29kZXNcbiAgICBJTlRFUk5BTF9FUlJPUiA9IDEzLFxuICAgIC8vIHVuYXZhaWxhYmxlIGNvZGVzXG4gICAgVU5BVkFJTEFCTEUgPSAxNCxcbiAgICAvLyB1bmF1dGhlbnRpY2F0ZWQgY29kZXNcbiAgICBVTkFVVEhFTlRJQ0FURUQgPSAxNixcbiAgICBUT0tFTl9JTlZBTElEID0gMTYwMDEsXG4gICAgVE9LRU5fRVhQSVJFRCA9IDE2MDAyLFxuICAgIEFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCA9IDE2MDAzLFxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5WQUxJRF9BUkdVTUVOVDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5JTlZBTElEX0FSR1VNRU5ULFxuICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGFyZ3VtZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBVU0VSX0lEX1JFUVVJUkVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVTRVJfSURfUkVRVUlSRUQsXG4gICAgbWVzc2FnZTogJ1VzZXIgaWQgaXMgcmVxdWlyZWQnLFxufTtcblxuZXhwb3J0IGNsYXNzIEludmFsaWRBcmd1bWVudEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBJTlZBTElEX0FSR1VNRU5ULCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW50ZXJmYWNlIElFcnJvckNvZGUge1xuICAgIGNvZGU6IG51bWJlcjtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEVycm9yQ29kZVR5cGUgPSBJRXJyb3JDb2RlIHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBNZXRhZGF0YVR5cGUge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VFeGNlcHRpb24gZXh0ZW5kcyBScGNFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yQ29kZTogSUVycm9yQ29kZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBjb2RlOiBlcnJvckNvZGUuY29kZSxcblxuICAgICAgICAgICAgLy8gc28gZmFyIGl0IGhhcyBub3QgYmVlbiBwb3NzaWJsZSB0byBmaW5kIG5vcm1hbCB3YXlzIGluIE5lc3RcbiAgICAgICAgICAgIC8vIHRvIHRyYW5zbWl0IHRoZSBtZXRhZGF0YSBpbiByZXNwb25zZSB3aXRoIGFuIGVycm9yLFxuICAgICAgICAgICAgLy8gc28gd2Ugd2lsbCBzZXcgdGhpcyBkYXRhIGludG8gdGhlIG1lc3NhZ2UgYm9keVxuICAgICAgICAgICAgbWVzc2FnZTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yQ29kZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgIG1ldGFkYXRhLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IE5PVF9GT1VORDogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ05vdCBmb3VuZCcsXG59O1xuXG5leHBvcnQgY29uc3QgVVNFUl9OT1RfRk9VTkQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVVNFUl9OT1RfRk9VTkQsXG4gICAgbWVzc2FnZTogJ1VzZXIgbm90IGZvdW5kJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBOb3RGb3VuZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBOT1RfRk9VTkQsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBBTFJFQURZX0VYSVNUOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFMUkVBRFlfRVhJU1QsXG4gICAgbWVzc2FnZTogJ1Jlc291cmNlIGFscmVhZHkgZXhpc3RzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBFTUFJTF9BTFJFQURZX0VYSVNUUzogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5FTUFJTF9BTFJFQURZX0VYSVNUUyxcbiAgICBtZXNzYWdlOiAnRW1haWwgYWxyZWFkeSBleGlzdHMnLFxufTtcblxuZXhwb3J0IGNsYXNzIEFscmVhZHlFeGlzdHNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgQUxSRUFEWV9FWElTVCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IFBFUk1JU1NJT05fREVOSUVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlBFUk1JU1NJT05fREVOSUVELFxuICAgIG1lc3NhZ2U6ICdQZXJtaXNzaW9uIGRlbmllZCcsXG59O1xuXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRlbmllZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGN1c3RvbUNvZGU/OiBFcnJvckNvZGVUeXBlLCBtZXRhZGF0YTogTWV0YWRhdGFUeXBlID0ge30pIHtcbiAgICAgICAgc3VwZXIoY3VzdG9tQ29kZSB8fCBQRVJNSVNTSU9OX0RFTklFRCwgbWV0YWRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJhc2VFeGNlcHRpb24sIEVycm9yQ29kZVR5cGUsIE1ldGFkYXRhVHlwZSB9IGZyb20gJy4vQmFzZUV4Y2VwdGlvbic7XG5cbmltcG9ydCB7IElFcnJvciwgRUNvZGVzIH0gZnJvbSAnLi9jb2RlLnR5cGVzJztcblxuZXhwb3J0IGNvbnN0IElOVEVSTkFMX0VSUk9SOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLklOVEVSTkFMX0VSUk9SLFxuICAgIG1lc3NhZ2U6ICdJbnRlcm5hbCBlcnJvcicsXG59O1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgSU5URVJOQUxfRVJST1IsIG1ldGFkYXRhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBFcnJvckNvZGVUeXBlLCBNZXRhZGF0YVR5cGUgfSBmcm9tICcuL0Jhc2VFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBJRXJyb3IsIEVDb2RlcyB9IGZyb20gJy4vY29kZS50eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBVTkFWQUlMQUJMRTogSUVycm9yID0ge1xuICAgIGNvZGU6IEVDb2Rlcy5VTkFWQUlMQUJMRSxcbiAgICBtZXNzYWdlOiAnUmVzb3VyY2UgdW5hdmFpbGFibGUnLFxufTtcblxuZXhwb3J0IGNsYXNzIFVuYXZhaWxhYmxlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gICAgY29uc3RydWN0b3IoY3VzdG9tQ29kZT86IEVycm9yQ29kZVR5cGUsIG1ldGFkYXRhOiBNZXRhZGF0YVR5cGUgPSB7fSkge1xuICAgICAgICBzdXBlcihjdXN0b21Db2RlIHx8IFVOQVZBSUxBQkxFLCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiwgRXJyb3JDb2RlVHlwZSwgTWV0YWRhdGFUeXBlIH0gZnJvbSAnLi9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgSUVycm9yLCBFQ29kZXMgfSBmcm9tICcuL2NvZGUudHlwZXMnO1xuXG5leHBvcnQgY29uc3QgVU5BVVRIRU5USUNBVEVEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlVOQVVUSEVOVElDQVRFRCxcbiAgICBtZXNzYWdlOiAnVW5hdXRoZW50aWNhdGVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBUT0tFTl9JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLlRPS0VOX0lOVkFMSUQsXG4gICAgbWVzc2FnZTogJ1Rva2VuIGludmFsaWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IFRPS0VOX0VYUElSRUQ6IElFcnJvciA9IHtcbiAgICBjb2RlOiBFQ29kZXMuVE9LRU5fRVhQSVJFRCxcbiAgICBtZXNzYWdlOiAnVG9rZW4gZXhwaXJlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgQVVUSF9DUkVERU5USUFMU19JTlZBTElEOiBJRXJyb3IgPSB7XG4gICAgY29kZTogRUNvZGVzLkFVVEhfQ1JFREVOVElBTFNfSU5WQUxJRCxcbiAgICBtZXNzYWdlOiAnQXV0aCBjcmVkZW50aWFscyBpbnZhbGlkJyxcbn07XG5cbmV4cG9ydCBjbGFzcyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjdXN0b21Db2RlPzogRXJyb3JDb2RlVHlwZSwgbWV0YWRhdGE6IE1ldGFkYXRhVHlwZSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKGN1c3RvbUNvZGUgfHwgVU5BVVRIRU5USUNBVEVELCBtZXRhZGF0YSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ2F0Y2gsIEFyZ3VtZW50c0hvc3QgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlUnBjRXhjZXB0aW9uRmlsdGVyIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSwgRVhDRVBUSU9OX0xJU1QgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaGFuZGxlcnMvRXhjZXB0aW9uSGFuZGxlckZhY3RvcnknO1xuXG5AQ2F0Y2goLi4uRVhDRVBUSU9OX0xJU1QpXG5leHBvcnQgY2xhc3MgUnBjRXhjZXB0aW9uRmlsdGVyIGV4dGVuZHMgQmFzZVJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBleGNlcHRpb25IYW5kbGVyRmFjdG9yeTogSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5O1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3IobGFiZWw6IHN0cmluZyk6IFJwY0V4Y2VwdGlvbkZpbHRlciB7XG4gICAgICAgIHJldHVybiBuZXcgUnBjRXhjZXB0aW9uRmlsdGVyKGxhYmVsKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBmb3IgdGhlIGFkbWluIHBhbmVsLCB5b3UgZG9u4oCZdCBuZWVkIHRvIG1vbml0b3IgZXJyb3JzXG4gICAgICAgIC8vIHN1Y2ggYXMgZnJvbSBDb3VjaERiLCBzbyB3ZSBwYXNzIHNlcGFyYXRlIEFkbWluRXhjZXB0aW9uSGFuZGxlckZhY3RvcnkgdG8gaXQsXG4gICAgICAgIC8vIGFuZCBmb3Igd2ViLWJhY2tlbmQgLSBXZWJCYWNrRXhjZXB0aW9uSGFuZGxlckZhY3RvcnlcbiAgICAgICAgdGhpcy5leGNlcHRpb25IYW5kbGVyRmFjdG9yeSA9IG5ldyBFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSh0aGlzLmxhYmVsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2F0Y2goZXhjZXB0aW9uOiBFeGNlcHRpb25UeXBlLCBob3N0OiBBcmd1bWVudHNIb3N0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuZXhjZXB0aW9uSGFuZGxlckZhY3RvcnkuZ2V0SGFuZGxlcihleGNlcHRpb24pO1xuXG4gICAgICAgIGhhbmRsZXIud2FybkFib3V0RXJyb3IoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuY2F0Y2goaGFuZGxlci53cmFwRXJyb3IoKSwgaG9zdCBhcyBhbnkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuZXhwb3J0IHR5cGUgRXhjZXB0aW9uVHlwZSA9IEVycm9yIHwgUnBjRXhjZXB0aW9uIHwgQmFzZUV4Y2VwdGlvbjtcblxuZXhwb3J0IGNvbnN0IEVYQ0VQVElPTl9MSVNUID0gW0Vycm9yLCBScGNFeGNlcHRpb24sIEJhc2VFeGNlcHRpb25dO1xuIiwiaW1wb3J0IHsgUnBjRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9taWNyb3NlcnZpY2VzJztcblxuaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIsIElFeGNlcHRpb25IYW5kbGVyRmFjdG9yeSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvUnBjRXhjZXB0aW9uSGFuZGxlcic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuL2ltcGwvSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJztcblxuaW1wb3J0IHsgRXhjZXB0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXJGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0SGFuZGxlcihleGNlcHRpb246IEV4Y2VwdGlvblR5cGUpOiBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgICAgIC8vIGhhbmRsZSByZWd1bGFyIGV4Y2VwdGlvbnMgZnJvbSBjdXJyZW50IG1pY3Jvc2VydmljZXNcbiAgICAgICAgaWYgKGV4Y2VwdGlvbiBpbnN0YW5jZW9mIFJwY0V4Y2VwdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBScGNFeGNlcHRpb25IYW5kbGVyKGV4Y2VwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBoYW5kbGUgYWxsIG90aGVyIGludGVybmFsIGV4Y2VwdGlvbnNcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcm5hbEV4Y2VwdGlvbkhhbmRsZXIoZXhjZXB0aW9uLCB0aGlzLmxhYmVsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJRXhjZXB0aW9uSGFuZGxlciB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnLi4vLi4vLi4vaW1wbC9CYXNlRXhjZXB0aW9uJztcblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vbG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIFJwY0V4Y2VwdGlvbkhhbmRsZXIgaW1wbGVtZW50cyBJRXhjZXB0aW9uSGFuZGxlciB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBsb2dnZXIgPSBuZXcgTG9nZ2VyKCdScGNFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogQmFzZUV4Y2VwdGlvbikge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIC8vIG5vdCBuZWVkIHRvIGhhbmRsZSB0aGlzIGVycm9yLFxuICAgICAgICAvLyBiZWNhdXNlIGl0IHJlZ3VsYXIgZXhjZXB0aW9uIGZyb20gYmFja2VuZCBzZXJ2aWNlc1xuICAgICAgICByZXR1cm4gdGhpcy5leGNlcHRpb247XG4gICAgfVxuXG4gICAgcHVibGljIHdhcm5BYm91dEVycm9yKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7bWVzc2FnZX06IGFueSA9IHRoaXMuZXhjZXB0aW9uO1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgSW50ZXJuYWwgZXhjZXB0aW9uOiAke21lc3NhZ2V9YCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSUV4Y2VwdGlvbkhhbmRsZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHsgQmFzZUV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvQmFzZUV4Y2VwdGlvbic7XG5pbXBvcnQgeyBJbnRlcm5hbEV4Y2VwdGlvbiB9IGZyb20gJy4uLy4uLy4uL2ltcGwvSW50ZXJuYWxFeGNlcHRpb24nO1xuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuLi8uLi8uLi8uLi9sb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyIGltcGxlbWVudHMgSUV4Y2VwdGlvbkhhbmRsZXIge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgbG9nZ2VyID0gbmV3IExvZ2dlcignSW50ZXJuYWxFeGNlcHRpb25IYW5kbGVyJyk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGV4Y2VwdGlvbjogRXJyb3IsIHByaXZhdGUgcmVhZG9ubHkgbGFiZWw6IHN0cmluZykge1xuICAgIH1cblxuICAgIHB1YmxpYyB3cmFwRXJyb3IoKTogQmFzZUV4Y2VwdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgSW50ZXJuYWxFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2FybkFib3V0RXJyb3IoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHtzdGFjaywgbWVzc2FnZX0gPSB0aGlzLmV4Y2VwdGlvbjtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYCR7dGhpcy5sYWJlbH0gOjogSW50ZXJuYWwgZXJyb3IgXCIke21lc3NhZ2V9XCIsXFxuU3RhY2s6ICR7c3RhY2t9YCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYk1vZHVsZSB9IGZyb20gJ0B1c2VyL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZSc7XG5pbXBvcnQgeyBEYXRhRmluZGVyc01vZHVsZSB9IGZyb20gJ0B1c2VyL3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvRGF0YUZpbmRlcnNNb2R1bGUnO1xuXG5pbXBvcnQgeyBVc2VyRGF0YVVwZGF0ZXIgfSBmcm9tICcuL1VzZXJEYXRhVXBkYXRlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1VzZXJEYXRhVXBkYXRlcl0sXG4gICAgZXhwb3J0czogW1VzZXJEYXRhVXBkYXRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFVcGRhdGVyc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIudHlwZXNfcGInO1xuaW1wb3J0IHsgVXBkYXRlVXNlclJlcSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcl9wYic7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9Vc2VyRGF0YUZpbmRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyRGF0YVVwZGF0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGI6IENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YUZpbmRlcjogVXNlckRhdGFGaW5kZXIsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVVzZXIoZGF0YTogVXBkYXRlVXNlclJlcS5Bc09iamVjdCwgaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlci5Bc09iamVjdD4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGB1cGRhdGUgYXBpX3VzZXIgc2V0IG5hbWUgPSAkMSwgZW1haWwgPSAkMiwgYXZhdGFyID0gJDMgd2hlcmUgaWQgPSAkNGA7XG5cbiAgICAgICAgcmV0dXJuIGZyb20odGhpcy51c2VyRGF0YUZpbmRlci5nZXRVc2VyT25lKGlkKSkucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBmcm9tKHRoaXMuZGIucXVlcnk8VXNlci5Bc09iamVjdD4ocXVlcnksXG4gICAgICAgICAgICAgICAgW2RhdGEubmFtZSwgZGF0YS5lbWFpbCwgZGF0YS5hdmF0YXIsIGlkXSkpKSxcbiAgICAgICAgICAgIG1hcChyZXMgPT4gcmVzLnJvd3NbMF0pLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuaW1wb3J0IHsgRGJNb2R1bGUgfSBmcm9tICdAdXNlci9zZXJ2aWNlcy9kYWwvZGIvRGJNb2R1bGUnO1xuaW1wb3J0IHsgRGF0YUZpbmRlcnNNb2R1bGUgfSBmcm9tICdAdXNlci9zZXJ2aWNlcy9kYWwvZGF0YS1maW5kZXJzL0RhdGFGaW5kZXJzTW9kdWxlJztcblxuaW1wb3J0IHsgVXNlckRhdGFQcm9kdWNlciB9IGZyb20gJy4vVXNlckRhdGFQcm9kdWNlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1VzZXJEYXRhUHJvZHVjZXJdLFxuICAgIGV4cG9ydHM6IFtVc2VyRGF0YVByb2R1Y2VyXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVByb2R1Y2VyTW9kdWxlIHtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5pbXBvcnQgeyBjcmVhdGVIbWFjIH0gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWxyZWFkeUV4aXN0c0V4Y2VwdGlvbiwgRU1BSUxfQUxSRUFEWV9FWElTVFMgfSBmcm9tICdAbGliL2V4Y2VwdGlvbnMvaW1wbCc7XG5cbmltcG9ydCB7IENyZWF0ZVVzZXJSZXEsIFZlcmlmeVVzZXJSZXEgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXJfcGInO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BncnBjLXByb3RvL2NoYXQvY2hhdC50eXBlc19wYic7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9Vc2VyRGF0YUZpbmRlcic7XG5cbmltcG9ydCB7IFNBTFQgfSBmcm9tICdAdXNlci9lbnYnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlckRhdGFQcm9kdWNlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkYjogQ2xpZW50LFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJEYXRhRmluZGVyOiBVc2VyRGF0YUZpbmRlcixcbiAgICApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVXNlcihkYXRhOiBDcmVhdGVVc2VyUmVxLkFzT2JqZWN0KTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGRhdGEucGFzc3dvcmQgPSBjcmVhdGVIbWFjKCdzaGE1MTInLCBTQUxUKS51cGRhdGUoZGF0YS5wYXNzd29yZCkuZGlnZXN0KCdoZXgnKTtcblxuICAgICAgICBjb25zdCBxdWVyeSA9IGBpbnNlcnQgaW50byBhcGlfdXNlciAoZW1haWwsIG5hbWUsIGF2YXRhciwgcGFzc3dvcmQpIHZhbHVlcyAoJDEsICQyLCAkMywgJDQpYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja0VtYWlsRXhpc3RlbmNlKGRhdGEuZW1haWwpLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gZnJvbSh0aGlzLmRiLnF1ZXJ5PE1lc3NhZ2UuQXNPYmplY3Q+KHF1ZXJ5LFxuICAgICAgICAgICAgICAgIFtkYXRhLmVtYWlsLCBkYXRhLm5hbWUsIGRhdGEuYXZhdGFyLCBkYXRhLnBhc3N3b3JkXSkpKSxcbiAgICAgICAgICAgIG1hcFRvKG51bGwpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tFbWFpbEV4aXN0ZW5jZShlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBmcm9tKHRoaXMudXNlckRhdGFGaW5kZXIuZ2V0VXNlckJ5Q29uZGl0aW9ucyh7IGVtYWlsIH0gYXMgVmVyaWZ5VXNlclJlcS5Bc09iamVjdCkpLnBpcGUoXG4gICAgICAgICAgICBtYXAodXNlciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFscmVhZHlFeGlzdHNFeGNlcHRpb24oRU1BSUxfQUxSRUFEWV9FWElTVFMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5pbXBvcnQgeyBEYk1vZHVsZSB9IGZyb20gJ0B1c2VyL3NlcnZpY2VzL2RhbC9kYi9EYk1vZHVsZSc7XG5pbXBvcnQgeyBEYXRhRmluZGVyc01vZHVsZSB9IGZyb20gJ0B1c2VyL3NlcnZpY2VzL2RhbC9kYXRhLWZpbmRlcnMvRGF0YUZpbmRlcnNNb2R1bGUnO1xuXG5pbXBvcnQgeyBVc2VyRGF0YVJlbW92ZXIgfSBmcm9tICcuL1VzZXJEYXRhUmVtb3Zlcic7XG5cbkBNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtEYk1vZHVsZSwgRGF0YUZpbmRlcnNNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW1VzZXJEYXRhUmVtb3Zlcl0sXG4gICAgZXhwb3J0czogW1VzZXJEYXRhUmVtb3Zlcl0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGFSZW1vdmVyc01vZHVsZSB7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAncGcnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXBUbyB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlci50eXBlc19wYic7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvZGFsL2RhdGEtZmluZGVycy9Vc2VyRGF0YUZpbmRlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyRGF0YVJlbW92ZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGI6IENsaWVudCxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YUZpbmRlcjogVXNlckRhdGFGaW5kZXIsXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZVVzZXIoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGBkZWxldGUgZnJvbSBhcGlfdXNlciB3aGVyZSBpZCA9ICQxYDtcblxuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YUZpbmRlci5nZXRVc2VyT25lKGlkKS5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IGZyb20odGhpcy5kYi5xdWVyeTxVc2VyLkFzT2JqZWN0PihxdWVyeSwgW2lkXSkpKSxcbiAgICAgICAgICAgIG1hcFRvKG51bGwpLFxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWFwVG8gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIudHlwZXNfcGInO1xuaW1wb3J0IHsgQ3JlYXRlVXNlclJlcSwgVXBkYXRlVXNlclJlcSwgVmVyaWZ5VXNlclJlcSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcl9wYic7XG5cbmltcG9ydCB7IFVzZXJEYXRhRmluZGVyIH0gZnJvbSAnLi9kYWwvZGF0YS1maW5kZXJzL1VzZXJEYXRhRmluZGVyJztcbmltcG9ydCB7IFVzZXJEYXRhUHJvZHVjZXIgfSBmcm9tICcuL2RhbC9kYXRhLXByb2R1Y2Vycy9Vc2VyRGF0YVByb2R1Y2VyJztcbmltcG9ydCB7IFVzZXJEYXRhUmVtb3ZlciB9IGZyb20gJy4vZGFsL2RhdGEtcmVtb3ZlcnMvVXNlckRhdGFSZW1vdmVyJztcbmltcG9ydCB7IFVzZXJEYXRhVXBkYXRlciB9IGZyb20gJy4vZGFsL2RhdGEtdXBkYXRlcnMvVXNlckRhdGFVcGRhdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJEYXRhRmluZGVyOiBVc2VyRGF0YUZpbmRlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB1c2VyRGF0YVByb2R1Y2VyOiBVc2VyRGF0YVByb2R1Y2VyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJEYXRhVXBkYXRlcjogVXNlckRhdGFVcGRhdGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJEYXRhUmVtb3ZlcjogVXNlckRhdGFSZW1vdmVyLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVVc2VyKGRhdGE6IENyZWF0ZVVzZXJSZXEuQXNPYmplY3QpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckRhdGFQcm9kdWNlci5jcmVhdGVVc2VyKGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVVc2VyKGRhdGE6IFVwZGF0ZVVzZXJSZXEuQXNPYmplY3QsIGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckRhdGFVcGRhdGVyLnVwZGF0ZVVzZXIoZGF0YSwgaWQpXG4gICAgICAgICAgICAucGlwZShtYXBUbyhudWxsKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZVVzZXIoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyRGF0YVJlbW92ZXIuZGVsZXRlVXNlcihpZClcbiAgICAgICAgICAgIC5waXBlKG1hcFRvKG51bGwpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlcihpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyLkFzT2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJEYXRhRmluZGVyLmdldFVzZXJPbmUoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2Vyc0FsbCgpOiBPYnNlcnZhYmxlPHsgdXNlcnM6IFVzZXIuQXNPYmplY3RbXSB9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJEYXRhRmluZGVyLmdldFVzZXJzQWxsKCkucGlwZShcbiAgICAgICAgICAgIG1hcCh1c2VycyA9PiAoe3VzZXJzfSkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyB2ZXJpZnlVc2VyKGRhdGE6IFZlcmlmeVVzZXJSZXEuQXNPYmplY3QpOiBPYnNlcnZhYmxlPFVzZXIuQXNPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlckRhdGFGaW5kZXIuZ2V0VXNlckJ5Q29uZGl0aW9ucyh7Li4uZGF0YX0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbnRyb2xsZXIsIFVzZUd1YXJkcywgVXNlRmlsdGVycyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEdycGNNZXRob2QgfSBmcm9tICdAbmVzdGpzL21pY3Jvc2VydmljZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBKd3RHdWFyZCB9IGZyb20gJ0BsaWIvand0L0p3dEd1YXJkJztcbmltcG9ydCB7IElKd3RNZXRhIH0gZnJvbSAnQGxpYi9qd3QvSnd0SW50ZXJmYWNlJztcbmltcG9ydCB7IFJwY0V4Y2VwdGlvbkZpbHRlciB9IGZyb20gJ0BsaWIvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7IFVzZXIsIEVTdGF0dXMsIFN0dWIgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXIudHlwZXNfcGInO1xuaW1wb3J0IHsgVXNlclJlcyB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcl9wYic7XG5cbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnQHVzZXIvc2VydmljZXMvVXNlclNlcnZpY2UnO1xuXG5pbXBvcnQgeyBDcmVhdGVVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vQ3JlYXRlVXNlclJlcURUTyc7XG5pbXBvcnQgeyBWZXJpZnlVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vVmVyaWZ5VXNlclJlcURUTyc7XG5pbXBvcnQgeyBVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vVXNlclJlcURUTyc7XG5pbXBvcnQgeyBVcGRhdGVVc2VyUmVxRFRPIH0gZnJvbSAnLi9kdG8vVXBkYXRlVXNlclJlcURUTyc7XG5cbkBDb250cm9sbGVyKClcbmV4cG9ydCBjbGFzcyBVc2VyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSkge1xuICAgIH1cblxuICAgIEBHcnBjTWV0aG9kKCdVc2VyU2VydmljZScsICdDcmVhdGVVc2VyJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdVc2VyQ29udHJvbGxlcjo6Y3JlYXRlVXNlcicpKVxuICAgIHB1YmxpYyBjcmVhdGVVc2VyKGRhdGE6IENyZWF0ZVVzZXJSZXFEVE8pOiBPYnNlcnZhYmxlPFVzZXJSZXMuQXNPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuY3JlYXRlVXNlcihkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IEVTdGF0dXMuU1VDQ0VTUyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFVzZXIgY3JlYXRlZCBzdWNjZXNzZnVsbHlgLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBAVXNlR3VhcmRzKEp3dEd1YXJkKVxuICAgIEBHcnBjTWV0aG9kKCdVc2VyU2VydmljZScsICdVcGRhdGVVc2VyJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdVc2VyQ29udHJvbGxlcjo6dXBkYXRlVXNlcicpKVxuICAgIHB1YmxpYyB1cGRhdGVVc2VyKGRhdGE6IFVwZGF0ZVVzZXJSZXFEVE8sIG1ldGE6IElKd3RNZXRhPHsgaWQ6IHN0cmluZzsgfT4pOiBPYnNlcnZhYmxlPFVzZXJSZXMuQXNPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UudXBkYXRlVXNlcihkYXRhLCBtZXRhLnBheWxvYWQuaWQpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogRVN0YXR1cy5TVUNDRVNTLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgVXNlciB1cGRhdGUgc3VjY2Vzc2Z1bGx5OiBJRDogJHttZXRhLnBheWxvYWQuaWR9YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQFVzZUd1YXJkcyhKd3RHdWFyZClcbiAgICBAR3JwY01ldGhvZCgnVXNlclNlcnZpY2UnLCAnRGVsZXRlVXNlcicpXG4gICAgQFVzZUZpbHRlcnMoUnBjRXhjZXB0aW9uRmlsdGVyLmZvcignVXNlckNvbnRyb2xsZXI6OmRlbGV0ZVVzZXInKSlcbiAgICBwdWJsaWMgZGVsZXRlVXNlcihkYXRhOiBVc2VyUmVxRFRPKTogT2JzZXJ2YWJsZTxVc2VyUmVzLkFzT2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmRlbGV0ZVVzZXIoZGF0YS5pZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBFU3RhdHVzLlNVQ0NFU1MsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBVc2VyIGRlbGV0ZSBzdWNjZXNzZnVsbHk6IElEOiAke2RhdGEuaWR9YCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgQEdycGNNZXRob2QoJ1VzZXJTZXJ2aWNlJywgJ1ZlcmlmeVVzZXInKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ1VzZXJDb250cm9sbGVyOjp2ZXJpZnlVc2VyJykpXG4gICAgcHVibGljIHZlcmlmeVVzZXIoZGF0YTogVmVyaWZ5VXNlclJlcURUTyk6IE9ic2VydmFibGU8VXNlci5Bc09iamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS52ZXJpZnlVc2VyKGRhdGEpO1xuICAgIH1cblxuICAgIEBHcnBjTWV0aG9kKCdVc2VyU2VydmljZScsICdHZXRVc2VyJylcbiAgICBAVXNlRmlsdGVycyhScGNFeGNlcHRpb25GaWx0ZXIuZm9yKCdVc2VyQ29udHJvbGxlcjo6Z2V0VXNlcicpKVxuICAgIHB1YmxpYyBnZXRVc2VyKGRhdGE6IFVzZXJSZXFEVE8pOiBPYnNlcnZhYmxlPFVzZXIuQXNPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcihkYXRhLmlkKTtcbiAgICB9XG5cbiAgICBAR3JwY01ldGhvZCgnVXNlclNlcnZpY2UnLCAnR2V0VXNlcnNBbGwnKVxuICAgIEBVc2VGaWx0ZXJzKFJwY0V4Y2VwdGlvbkZpbHRlci5mb3IoJ1VzZXJDb250cm9sbGVyOjpnZXRVc2Vyc0FsbCcpKVxuICAgIHB1YmxpYyBnZXRVc2Vyc0FsbChkYXRhOiBTdHViLkFzT2JqZWN0KTogT2JzZXJ2YWJsZTx7IHVzZXJzOiBVc2VyLkFzT2JqZWN0W10gfT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRVc2Vyc0FsbCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHZlcmlmeSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJwY0V4Y2VwdGlvbiB9IGZyb20gJ0BuZXN0anMvbWljcm9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBzdGF0dXMgfSBmcm9tICdncnBjJztcblxuaW1wb3J0IHsgVW5hdXRoZW50aWNhdGVkRXhjZXB0aW9uIH0gZnJvbSAnQGxpYi9leGNlcHRpb25zJztcblxuY29uc3QgVE9LRU5fSEVBREVSX05BTUUgPSAnYXV0aG9yaXphdGlvbic7XG5jb25zdCBERUNPRElOR19PUFRJT05TID0ge1xuICAgIGFsZ29yaXRobXM6IFsnUlMyNTYnXSxcbn07XG5cbmV4cG9ydCBjbGFzcyBKd3RHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgICBjYW5BY3RpdmF0ZShjb250ZXh0OiBFeGVjdXRpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG1ldGEgPSBjb250ZXh0LmdldEFyZ0J5SW5kZXgoMSk7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbWV0YS5nZXQoVE9LRU5fSEVBREVSX05BTUUpWzBdO1xuXG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBtZXRhLnBheWxvYWQgPSB2ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9QVUIsIERFQ09ESU5HX09QVElPTlMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBScGNFeGNlcHRpb24oe2NvZGU6IHN0YXR1cy5VTkFVVEhFTlRJQ0FURUQsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbmF1dGhlbnRpY2F0ZWRFeGNlcHRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJncnBjXCIpOyIsIi8vIHNvdXJjZTogdXNlci50eXBlcy5wcm90b1xuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBAZW5oYW5jZWFibGVcbiAqIEBzdXBwcmVzcyB7bWVzc2FnZUNvbnZlbnRpb25zfSBKUyBDb21waWxlciByZXBvcnRzIGFuIGVycm9yIGlmIGEgdmFyaWFibGUgb3JcbiAqICAgICBmaWVsZCBzdGFydHMgd2l0aCAnTVNHXycgYW5kIGlzbid0IGEgdHJhbnNsYXRhYmxlIG1lc3NhZ2UuXG4gKiBAcHVibGljXG4gKi9cbi8vIEdFTkVSQVRFRCBDT0RFIC0tIERPIE5PVCBFRElUIVxuXG52YXIganNwYiA9IHJlcXVpcmUoJ2dvb2dsZS1wcm90b2J1ZicpO1xudmFyIGdvb2cgPSBqc3BiO1xudmFyIGdsb2JhbCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkudXNlci5FU3RhdHVzJywgbnVsbCwgZ2xvYmFsKTtcbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkudXNlci5TdHViJywgbnVsbCwgZ2xvYmFsKTtcbmdvb2cuZXhwb3J0U3ltYm9sKCdwcm90by5hcGkudXNlci5Vc2VyJywgbnVsbCwgZ2xvYmFsKTtcbi8qKlxuICogR2VuZXJhdGVkIGJ5IEpzUGJDb2RlR2VuZXJhdG9yLlxuICogQHBhcmFtIHtBcnJheT19IG9wdF9kYXRhIE9wdGlvbmFsIGluaXRpYWwgZGF0YSBhcnJheSwgdHlwaWNhbGx5IGZyb20gYVxuICogc2VydmVyIHJlc3BvbnNlLCBvciBjb25zdHJ1Y3RlZCBkaXJlY3RseSBpbiBKYXZhc2NyaXB0LiBUaGUgYXJyYXkgaXMgdXNlZFxuICogaW4gcGxhY2UgYW5kIGJlY29tZXMgcGFydCBvZiB0aGUgY29uc3RydWN0ZWQgb2JqZWN0LiBJdCBpcyBub3QgY2xvbmVkLlxuICogSWYgbm8gZGF0YSBpcyBwcm92aWRlZCwgdGhlIGNvbnN0cnVjdGVkIG9iamVjdCB3aWxsIGJlIGVtcHR5LCBidXQgc3RpbGxcbiAqIHZhbGlkLlxuICogQGV4dGVuZHMge2pzcGIuTWVzc2FnZX1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5wcm90by5hcGkudXNlci5Vc2VyID0gZnVuY3Rpb24ob3B0X2RhdGEpIHtcbiAganNwYi5NZXNzYWdlLmluaXRpYWxpemUodGhpcywgb3B0X2RhdGEsIDAsIC0xLCBudWxsLCBudWxsKTtcbn07XG5nb29nLmluaGVyaXRzKHByb3RvLmFwaS51c2VyLlVzZXIsIGpzcGIuTWVzc2FnZSk7XG5pZiAoZ29vZy5ERUJVRyAmJiAhQ09NUElMRUQpIHtcbiAgLyoqXG4gICAqIEBwdWJsaWNcbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBwcm90by5hcGkudXNlci5Vc2VyLmRpc3BsYXlOYW1lID0gJ3Byb3RvLmFwaS51c2VyLlVzZXInO1xufVxuLyoqXG4gKiBHZW5lcmF0ZWQgYnkgSnNQYkNvZGVHZW5lcmF0b3IuXG4gKiBAcGFyYW0ge0FycmF5PX0gb3B0X2RhdGEgT3B0aW9uYWwgaW5pdGlhbCBkYXRhIGFycmF5LCB0eXBpY2FsbHkgZnJvbSBhXG4gKiBzZXJ2ZXIgcmVzcG9uc2UsIG9yIGNvbnN0cnVjdGVkIGRpcmVjdGx5IGluIEphdmFzY3JpcHQuIFRoZSBhcnJheSBpcyB1c2VkXG4gKiBpbiBwbGFjZSBhbmQgYmVjb21lcyBwYXJ0IG9mIHRoZSBjb25zdHJ1Y3RlZCBvYmplY3QuIEl0IGlzIG5vdCBjbG9uZWQuXG4gKiBJZiBubyBkYXRhIGlzIHByb3ZpZGVkLCB0aGUgY29uc3RydWN0ZWQgb2JqZWN0IHdpbGwgYmUgZW1wdHksIGJ1dCBzdGlsbFxuICogdmFsaWQuXG4gKiBAZXh0ZW5kcyB7anNwYi5NZXNzYWdlfVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnByb3RvLmFwaS51c2VyLlN0dWIgPSBmdW5jdGlvbihvcHRfZGF0YSkge1xuICBqc3BiLk1lc3NhZ2UuaW5pdGlhbGl6ZSh0aGlzLCBvcHRfZGF0YSwgMCwgLTEsIG51bGwsIG51bGwpO1xufTtcbmdvb2cuaW5oZXJpdHMocHJvdG8uYXBpLnVzZXIuU3R1YiwganNwYi5NZXNzYWdlKTtcbmlmIChnb29nLkRFQlVHICYmICFDT01QSUxFRCkge1xuICAvKipcbiAgICogQHB1YmxpY1xuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIHByb3RvLmFwaS51c2VyLlN0dWIuZGlzcGxheU5hbWUgPSAncHJvdG8uYXBpLnVzZXIuU3R1Yic7XG59XG5cblxuXG5pZiAoanNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX09CSkVDVCkge1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHByb3RvLlxuICogRmllbGQgbmFtZXMgdGhhdCBhcmUgcmVzZXJ2ZWQgaW4gSmF2YVNjcmlwdCBhbmQgd2lsbCBiZSByZW5hbWVkIHRvIHBiX25hbWUuXG4gKiBPcHRpb25hbCBmaWVsZHMgdGhhdCBhcmUgbm90IHNldCB3aWxsIGJlIHNldCB0byB1bmRlZmluZWQuXG4gKiBUbyBhY2Nlc3MgYSByZXNlcnZlZCBmaWVsZCB1c2UsIGZvby5wYl88bmFtZT4sIGVnLCBmb28ucGJfZGVmYXVsdC5cbiAqIEZvciB0aGUgbGlzdCBvZiByZXNlcnZlZCBuYW1lcyBwbGVhc2Ugc2VlOlxuICogICAgIG5ldC9wcm90bzIvY29tcGlsZXIvanMvaW50ZXJuYWwvZ2VuZXJhdG9yLmNjI2tLZXl3b3JkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X2luY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlXG4gKiAgICAgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnByb3RvLmFwaS51c2VyLlVzZXIucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24ob3B0X2luY2x1ZGVJbnN0YW5jZSkge1xuICByZXR1cm4gcHJvdG8uYXBpLnVzZXIuVXNlci50b09iamVjdChvcHRfaW5jbHVkZUluc3RhbmNlLCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiB0aGUge0BzZWUgdG9PYmplY3R9IG1ldGhvZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGluY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiBXaGV0aGVyIHRvIGluY2x1ZGVcbiAqICAgICB0aGUgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS51c2VyLlVzZXJ9IG1zZyBUaGUgbXNnIGluc3RhbmNlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS51c2VyLlVzZXIudG9PYmplY3QgPSBmdW5jdGlvbihpbmNsdWRlSW5zdGFuY2UsIG1zZykge1xuICB2YXIgZiwgb2JqID0ge1xuICAgIGlkOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDEsIFwiXCIpLFxuICAgIG5hbWU6IGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KG1zZywgMiwgXCJcIiksXG4gICAgZW1haWw6IGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KG1zZywgMywgXCJcIiksXG4gICAgYXZhdGFyOiBqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdChtc2csIDQsIFwiXCIpXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkudXNlci5Vc2VyfVxuICovXG5wcm90by5hcGkudXNlci5Vc2VyLmRlc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBqc3BiLkJpbmFyeVJlYWRlcihieXRlcyk7XG4gIHZhciBtc2cgPSBuZXcgcHJvdG8uYXBpLnVzZXIuVXNlcjtcbiAgcmV0dXJuIHByb3RvLmFwaS51c2VyLlVzZXIuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uYXBpLnVzZXIuVXNlcn0gbXNnIFRoZSBtZXNzYWdlIG9iamVjdCB0byBkZXNlcmlhbGl6ZSBpbnRvLlxuICogQHBhcmFtIHshanNwYi5CaW5hcnlSZWFkZXJ9IHJlYWRlciBUaGUgQmluYXJ5UmVhZGVyIHRvIHVzZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkudXNlci5Vc2VyfVxuICovXG5wcm90by5hcGkudXNlci5Vc2VyLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBjYXNlIDE6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldElkKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocmVhZGVyLnJlYWRTdHJpbmcoKSk7XG4gICAgICBtc2cuc2V0TmFtZSh2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICB2YXIgdmFsdWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8gKHJlYWRlci5yZWFkU3RyaW5nKCkpO1xuICAgICAgbXNnLnNldEVtYWlsKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIHZhciB2YWx1ZSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAocmVhZGVyLnJlYWRTdHJpbmcoKSk7XG4gICAgICBtc2cuc2V0QXZhdGFyKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZWFkZXIuc2tpcEZpZWxkKCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1zZztcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlIGZvcm1hdCkuXG4gKiBAcmV0dXJuIHshVWludDhBcnJheX1cbiAqL1xucHJvdG8uYXBpLnVzZXIuVXNlci5wcm90b3R5cGUuc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB3cml0ZXIgPSBuZXcganNwYi5CaW5hcnlXcml0ZXIoKTtcbiAgcHJvdG8uYXBpLnVzZXIuVXNlci5zZXJpYWxpemVCaW5hcnlUb1dyaXRlcih0aGlzLCB3cml0ZXIpO1xuICByZXR1cm4gd3JpdGVyLmdldFJlc3VsdEJ1ZmZlcigpO1xufTtcblxuXG4vKipcbiAqIFNlcmlhbGl6ZXMgdGhlIGdpdmVuIG1lc3NhZ2UgdG8gYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmVcbiAqIGZvcm1hdCksIHdyaXRpbmcgdG8gdGhlIGdpdmVuIEJpbmFyeVdyaXRlci5cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS51c2VyLlVzZXJ9IG1lc3NhZ2VcbiAqIEBwYXJhbSB7IWpzcGIuQmluYXJ5V3JpdGVyfSB3cml0ZXJcbiAqIEBzdXBwcmVzcyB7dW51c2VkTG9jYWxWYXJpYWJsZXN9IGYgaXMgb25seSB1c2VkIGZvciBuZXN0ZWQgbWVzc2FnZXNcbiAqL1xucHJvdG8uYXBpLnVzZXIuVXNlci5zZXJpYWxpemVCaW5hcnlUb1dyaXRlciA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHdyaXRlcikge1xuICB2YXIgZiA9IHVuZGVmaW5lZDtcbiAgZiA9IG1lc3NhZ2UuZ2V0SWQoKTtcbiAgaWYgKGYubGVuZ3RoID4gMCkge1xuICAgIHdyaXRlci53cml0ZVN0cmluZyhcbiAgICAgIDEsXG4gICAgICBmXG4gICAgKTtcbiAgfVxuICBmID0gbWVzc2FnZS5nZXROYW1lKCk7XG4gIGlmIChmLmxlbmd0aCA+IDApIHtcbiAgICB3cml0ZXIud3JpdGVTdHJpbmcoXG4gICAgICAyLFxuICAgICAgZlxuICAgICk7XG4gIH1cbiAgZiA9IG1lc3NhZ2UuZ2V0RW1haWwoKTtcbiAgaWYgKGYubGVuZ3RoID4gMCkge1xuICAgIHdyaXRlci53cml0ZVN0cmluZyhcbiAgICAgIDMsXG4gICAgICBmXG4gICAgKTtcbiAgfVxuICBmID0gbWVzc2FnZS5nZXRBdmF0YXIoKTtcbiAgaWYgKGYubGVuZ3RoID4gMCkge1xuICAgIHdyaXRlci53cml0ZVN0cmluZyhcbiAgICAgIDQsXG4gICAgICBmXG4gICAgKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBpZCA9IDE7XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnByb3RvLmFwaS51c2VyLlVzZXIucHJvdG90eXBlLmdldElkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KHRoaXMsIDEsIFwiXCIpKTtcbn07XG5cblxuLyoqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAqL1xucHJvdG8uYXBpLnVzZXIuVXNlci5wcm90b3R5cGUuc2V0SWQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgMSwgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBuYW1lID0gMjtcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xucHJvdG8uYXBpLnVzZXIuVXNlci5wcm90b3R5cGUuZ2V0TmFtZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gLyoqIEB0eXBlIHtzdHJpbmd9ICovIChqc3BiLk1lc3NhZ2UuZ2V0RmllbGRXaXRoRGVmYXVsdCh0aGlzLCAyLCBcIlwiKSk7XG59O1xuXG5cbi8qKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgKi9cbnByb3RvLmFwaS51c2VyLlVzZXIucHJvdG90eXBlLnNldE5hbWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgMiwgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBlbWFpbCA9IDM7XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnByb3RvLmFwaS51c2VyLlVzZXIucHJvdG90eXBlLmdldEVtYWlsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAvKiogQHR5cGUge3N0cmluZ30gKi8gKGpzcGIuTWVzc2FnZS5nZXRGaWVsZFdpdGhEZWZhdWx0KHRoaXMsIDMsIFwiXCIpKTtcbn07XG5cblxuLyoqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAqL1xucHJvdG8uYXBpLnVzZXIuVXNlci5wcm90b3R5cGUuc2V0RW1haWwgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgMywgdmFsdWUpO1xufTtcblxuXG4vKipcbiAqIG9wdGlvbmFsIHN0cmluZyBhdmF0YXIgPSA0O1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5wcm90by5hcGkudXNlci5Vc2VyLnByb3RvdHlwZS5nZXRBdmF0YXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoanNwYi5NZXNzYWdlLmdldEZpZWxkV2l0aERlZmF1bHQodGhpcywgNCwgXCJcIikpO1xufTtcblxuXG4vKiogQHBhcmFtIHtzdHJpbmd9IHZhbHVlICovXG5wcm90by5hcGkudXNlci5Vc2VyLnByb3RvdHlwZS5zZXRBdmF0YXIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBqc3BiLk1lc3NhZ2Uuc2V0UHJvdG8zU3RyaW5nRmllbGQodGhpcywgNCwgdmFsdWUpO1xufTtcblxuXG5cblxuXG5pZiAoanNwYi5NZXNzYWdlLkdFTkVSQVRFX1RPX09CSkVDVCkge1xuLyoqXG4gKiBDcmVhdGVzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHByb3RvLlxuICogRmllbGQgbmFtZXMgdGhhdCBhcmUgcmVzZXJ2ZWQgaW4gSmF2YVNjcmlwdCBhbmQgd2lsbCBiZSByZW5hbWVkIHRvIHBiX25hbWUuXG4gKiBPcHRpb25hbCBmaWVsZHMgdGhhdCBhcmUgbm90IHNldCB3aWxsIGJlIHNldCB0byB1bmRlZmluZWQuXG4gKiBUbyBhY2Nlc3MgYSByZXNlcnZlZCBmaWVsZCB1c2UsIGZvby5wYl88bmFtZT4sIGVnLCBmb28ucGJfZGVmYXVsdC5cbiAqIEZvciB0aGUgbGlzdCBvZiByZXNlcnZlZCBuYW1lcyBwbGVhc2Ugc2VlOlxuICogICAgIG5ldC9wcm90bzIvY29tcGlsZXIvanMvaW50ZXJuYWwvZ2VuZXJhdG9yLmNjI2tLZXl3b3JkLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X2luY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiB3aGV0aGVyIHRvIGluY2x1ZGUgdGhlXG4gKiAgICAgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnByb3RvLmFwaS51c2VyLlN0dWIucHJvdG90eXBlLnRvT2JqZWN0ID0gZnVuY3Rpb24ob3B0X2luY2x1ZGVJbnN0YW5jZSkge1xuICByZXR1cm4gcHJvdG8uYXBpLnVzZXIuU3R1Yi50b09iamVjdChvcHRfaW5jbHVkZUluc3RhbmNlLCB0aGlzKTtcbn07XG5cblxuLyoqXG4gKiBTdGF0aWMgdmVyc2lvbiBvZiB0aGUge0BzZWUgdG9PYmplY3R9IG1ldGhvZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IGluY2x1ZGVJbnN0YW5jZSBEZXByZWNhdGVkLiBXaGV0aGVyIHRvIGluY2x1ZGVcbiAqICAgICB0aGUgSlNQQiBpbnN0YW5jZSBmb3IgdHJhbnNpdGlvbmFsIHNveSBwcm90byBzdXBwb3J0OlxuICogICAgIGh0dHA6Ly9nb3RvL3NveS1wYXJhbS1taWdyYXRpb25cbiAqIEBwYXJhbSB7IXByb3RvLmFwaS51c2VyLlN0dWJ9IG1zZyBUaGUgbXNnIGluc3RhbmNlIHRvIHRyYW5zZm9ybS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS51c2VyLlN0dWIudG9PYmplY3QgPSBmdW5jdGlvbihpbmNsdWRlSW5zdGFuY2UsIG1zZykge1xuICB2YXIgZiwgb2JqID0ge1xuXG4gIH07XG5cbiAgaWYgKGluY2x1ZGVJbnN0YW5jZSkge1xuICAgIG9iai4kanNwYk1lc3NhZ2VJbnN0YW5jZSA9IG1zZztcbiAgfVxuICByZXR1cm4gb2JqO1xufTtcbn1cblxuXG4vKipcbiAqIERlc2VyaWFsaXplcyBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHBhcmFtIHtqc3BiLkJ5dGVTb3VyY2V9IGJ5dGVzIFRoZSBieXRlcyB0byBkZXNlcmlhbGl6ZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkudXNlci5TdHVifVxuICovXG5wcm90by5hcGkudXNlci5TdHViLmRlc2VyaWFsaXplQmluYXJ5ID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgdmFyIHJlYWRlciA9IG5ldyBqc3BiLkJpbmFyeVJlYWRlcihieXRlcyk7XG4gIHZhciBtc2cgPSBuZXcgcHJvdG8uYXBpLnVzZXIuU3R1YjtcbiAgcmV0dXJuIHByb3RvLmFwaS51c2VyLlN0dWIuZGVzZXJpYWxpemVCaW5hcnlGcm9tUmVhZGVyKG1zZywgcmVhZGVyKTtcbn07XG5cblxuLyoqXG4gKiBEZXNlcmlhbGl6ZXMgYmluYXJ5IGRhdGEgKGluIHByb3RvYnVmIHdpcmUgZm9ybWF0KSBmcm9tIHRoZVxuICogZ2l2ZW4gcmVhZGVyIGludG8gdGhlIGdpdmVuIG1lc3NhZ2Ugb2JqZWN0LlxuICogQHBhcmFtIHshcHJvdG8uYXBpLnVzZXIuU3R1Yn0gbXNnIFRoZSBtZXNzYWdlIG9iamVjdCB0byBkZXNlcmlhbGl6ZSBpbnRvLlxuICogQHBhcmFtIHshanNwYi5CaW5hcnlSZWFkZXJ9IHJlYWRlciBUaGUgQmluYXJ5UmVhZGVyIHRvIHVzZS5cbiAqIEByZXR1cm4geyFwcm90by5hcGkudXNlci5TdHVifVxuICovXG5wcm90by5hcGkudXNlci5TdHViLmRlc2VyaWFsaXplQmluYXJ5RnJvbVJlYWRlciA9IGZ1bmN0aW9uKG1zZywgcmVhZGVyKSB7XG4gIHdoaWxlIChyZWFkZXIubmV4dEZpZWxkKCkpIHtcbiAgICBpZiAocmVhZGVyLmlzRW5kR3JvdXAoKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBmaWVsZCA9IHJlYWRlci5nZXRGaWVsZE51bWJlcigpO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBkZWZhdWx0OlxuICAgICAgcmVhZGVyLnNraXBGaWVsZCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtc2c7XG59O1xuXG5cbi8qKlxuICogU2VyaWFsaXplcyB0aGUgbWVzc2FnZSB0byBiaW5hcnkgZGF0YSAoaW4gcHJvdG9idWYgd2lyZSBmb3JtYXQpLlxuICogQHJldHVybiB7IVVpbnQ4QXJyYXl9XG4gKi9cbnByb3RvLmFwaS51c2VyLlN0dWIucHJvdG90eXBlLnNlcmlhbGl6ZUJpbmFyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd3JpdGVyID0gbmV3IGpzcGIuQmluYXJ5V3JpdGVyKCk7XG4gIHByb3RvLmFwaS51c2VyLlN0dWIuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIodGhpcywgd3JpdGVyKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRSZXN1bHRCdWZmZXIoKTtcbn07XG5cblxuLyoqXG4gKiBTZXJpYWxpemVzIHRoZSBnaXZlbiBtZXNzYWdlIHRvIGJpbmFyeSBkYXRhIChpbiBwcm90b2J1ZiB3aXJlXG4gKiBmb3JtYXQpLCB3cml0aW5nIHRvIHRoZSBnaXZlbiBCaW5hcnlXcml0ZXIuXG4gKiBAcGFyYW0geyFwcm90by5hcGkudXNlci5TdHVifSBtZXNzYWdlXG4gKiBAcGFyYW0geyFqc3BiLkJpbmFyeVdyaXRlcn0gd3JpdGVyXG4gKiBAc3VwcHJlc3Mge3VudXNlZExvY2FsVmFyaWFibGVzfSBmIGlzIG9ubHkgdXNlZCBmb3IgbmVzdGVkIG1lc3NhZ2VzXG4gKi9cbnByb3RvLmFwaS51c2VyLlN0dWIuc2VyaWFsaXplQmluYXJ5VG9Xcml0ZXIgPSBmdW5jdGlvbihtZXNzYWdlLCB3cml0ZXIpIHtcbiAgdmFyIGYgPSB1bmRlZmluZWQ7XG59O1xuXG5cbi8qKlxuICogQGVudW0ge251bWJlcn1cbiAqL1xucHJvdG8uYXBpLnVzZXIuRVN0YXR1cyA9IHtcbiAgVU5LTk9XTjogMCxcbiAgU1VDQ0VTUzogMSxcbiAgRVJST1I6IDJcbn07XG5cbmdvb2cub2JqZWN0LmV4dGVuZChleHBvcnRzLCBwcm90by5hcGkudXNlcik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29nbGUtcHJvdG9idWZcIik7IiwiaW1wb3J0IHsgSXNFbWFpbCwgSXNEZWZpbmVkLCBJc1N0cmluZywgTWF4TGVuZ3RoLCBWYWxpZGF0ZUlmIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgQ3JlYXRlVXNlclJlcSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcl9wYic7XG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVVc2VyUmVxRFRPIGltcGxlbWVudHMgQ3JlYXRlVXNlclJlcS5Bc09iamVjdCB7XG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzRW1haWwoKVxuICAgIEBNYXhMZW5ndGgoNTApXG4gICAgcHVibGljIGVtYWlsOiBzdHJpbmc7XG5cbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNTdHJpbmcoKVxuICAgIEBNYXhMZW5ndGgoNTApXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCgxMjgpXG4gICAgcHVibGljIHBhc3N3b3JkOiBzdHJpbmc7XG5cbiAgICBAVmFsaWRhdGVJZih1c2VyID0+IHVzZXIuYXZhdGFyKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCg1MDApXG4gICAgcHVibGljIGF2YXRhcjogc3RyaW5nO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xhc3MtdmFsaWRhdG9yXCIpOyIsImltcG9ydCB7IElzRW1haWwsIElzRGVmaW5lZCwgSXNTdHJpbmcsIE1heExlbmd0aCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmltcG9ydCB7IFZlcmlmeVVzZXJSZXEgfSBmcm9tICdAZ3JwYy1wcm90by91c2VyL3VzZXJfcGInO1xuXG5leHBvcnQgY2xhc3MgVmVyaWZ5VXNlclJlcURUTyBpbXBsZW1lbnRzIFZlcmlmeVVzZXJSZXEuQXNPYmplY3Qge1xuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc0VtYWlsKClcbiAgICBATWF4TGVuZ3RoKDUwKVxuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nO1xuXG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzU3RyaW5nKClcbiAgICBATWF4TGVuZ3RoKDEyOClcbiAgICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZztcbn1cbiIsImltcG9ydCB7IElzVVVJRCwgSXNEZWZpbmVkIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuaW1wb3J0IHsgVXNlclJlcSB9IGZyb20gJ0BncnBjLXByb3RvL3VzZXIvdXNlcl9wYic7XG5cbmV4cG9ydCBjbGFzcyBVc2VyUmVxRFRPIGltcGxlbWVudHMgVXNlclJlcS5Bc09iamVjdCB7XG4gICAgQElzRGVmaW5lZCgpXG4gICAgQElzVVVJRCgpXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBJc0VtYWlsLCBJc0RlZmluZWQsIElzU3RyaW5nLCBNYXhMZW5ndGgsIFZhbGlkYXRlSWYgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuXG5pbXBvcnQgeyBVcGRhdGVVc2VyUmVxIH0gZnJvbSAnQGdycGMtcHJvdG8vdXNlci91c2VyX3BiJztcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVVzZXJSZXFEVE8gaW1wbGVtZW50cyBVcGRhdGVVc2VyUmVxLkFzT2JqZWN0IHtcbiAgICBASXNEZWZpbmVkKClcbiAgICBASXNFbWFpbCgpXG4gICAgQE1heExlbmd0aCg1MClcbiAgICBwdWJsaWMgZW1haWw6IHN0cmluZztcblxuICAgIEBJc0RlZmluZWQoKVxuICAgIEBJc1N0cmluZygpXG4gICAgQE1heExlbmd0aCg1MClcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuXG4gICAgQFZhbGlkYXRlSWYodXNlciA9PiB1c2VyLmF2YXRhcilcbiAgICBASXNTdHJpbmcoKVxuICAgIEBNYXhMZW5ndGgoNTAwKVxuICAgIHB1YmxpYyBhdmF0YXI6IHN0cmluZztcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=