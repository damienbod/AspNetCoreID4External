import {
  Router
} from "./chunk-GBQ74LGX.js";
import "./chunk-4A4O3C34.js";
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from "./chunk-ZUWRHF66.js";
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-7BKEPWBO.js";
import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  NgZone,
  PLATFORM_ID,
  RendererFactory2,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-HVAD7QRG.js";
import {
  forkJoin
} from "./chunk-IOKAKDLS.js";
import {
  catchError,
  concatMap,
  distinctUntilChanged,
  finalize,
  retry,
  retryWhen,
  switchMap,
  take,
  tap,
  timeout
} from "./chunk-RGMIKTLG.js";
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  TimeoutError,
  __commonJS,
  __spreadProps,
  __spreadValues,
  __toESM,
  from,
  map,
  mergeMap,
  of,
  throwError,
  timer
} from "./chunk-HWILZBSX.js";

// node_modules/rfc4648/lib/index.js
var require_lib = __commonJS({
  "node_modules/rfc4648/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function parse(string, encoding, opts) {
      var _opts$out;
      if (opts === void 0) {
        opts = {};
      }
      if (!encoding.codes) {
        encoding.codes = {};
        for (var i = 0; i < encoding.chars.length; ++i) {
          encoding.codes[encoding.chars[i]] = i;
        }
      }
      if (!opts.loose && string.length * encoding.bits & 7) {
        throw new SyntaxError("Invalid padding");
      }
      var end = string.length;
      while (string[end - 1] === "=") {
        --end;
        if (!opts.loose && !((string.length - end) * encoding.bits & 7)) {
          throw new SyntaxError("Invalid padding");
        }
      }
      var out = new ((_opts$out = opts.out) != null ? _opts$out : Uint8Array)(end * encoding.bits / 8 | 0);
      var bits = 0;
      var buffer = 0;
      var written = 0;
      for (var _i = 0; _i < end; ++_i) {
        var value = encoding.codes[string[_i]];
        if (value === void 0) {
          throw new SyntaxError("Invalid character " + string[_i]);
        }
        buffer = buffer << encoding.bits | value;
        bits += encoding.bits;
        if (bits >= 8) {
          bits -= 8;
          out[written++] = 255 & buffer >> bits;
        }
      }
      if (bits >= encoding.bits || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
      }
      return out;
    }
    function stringify(data, encoding, opts) {
      if (opts === void 0) {
        opts = {};
      }
      var _opts = opts, _opts$pad = _opts.pad, pad = _opts$pad === void 0 ? true : _opts$pad;
      var mask = (1 << encoding.bits) - 1;
      var out = "";
      var bits = 0;
      var buffer = 0;
      for (var i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | 255 & data[i];
        bits += 8;
        while (bits > encoding.bits) {
          bits -= encoding.bits;
          out += encoding.chars[mask & buffer >> bits];
        }
      }
      if (bits) {
        out += encoding.chars[mask & buffer << encoding.bits - bits];
      }
      if (pad) {
        while (out.length * encoding.bits & 7) {
          out += "=";
        }
      }
      return out;
    }
    var base16Encoding = {
      chars: "0123456789ABCDEF",
      bits: 4
    };
    var base32Encoding = {
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bits: 5
    };
    var base32HexEncoding = {
      chars: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bits: 5
    };
    var base64Encoding = {
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bits: 6
    };
    var base64UrlEncoding = {
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bits: 6
    };
    var base162 = {
      parse: function parse$1(string, opts) {
        return parse(string.toUpperCase(), base16Encoding, opts);
      },
      stringify: function stringify$1(data, opts) {
        return stringify(data, base16Encoding, opts);
      }
    };
    var base322 = {
      parse: function parse$1(string, opts) {
        if (opts === void 0) {
          opts = {};
        }
        return parse(opts.loose ? string.toUpperCase().replace(/0/g, "O").replace(/1/g, "L").replace(/8/g, "B") : string, base32Encoding, opts);
      },
      stringify: function stringify$1(data, opts) {
        return stringify(data, base32Encoding, opts);
      }
    };
    var base32hex2 = {
      parse: function parse$1(string, opts) {
        return parse(string, base32HexEncoding, opts);
      },
      stringify: function stringify$1(data, opts) {
        return stringify(data, base32HexEncoding, opts);
      }
    };
    var base642 = {
      parse: function parse$1(string, opts) {
        return parse(string, base64Encoding, opts);
      },
      stringify: function stringify$1(data, opts) {
        return stringify(data, base64Encoding, opts);
      }
    };
    var base64url2 = {
      parse: function parse$1(string, opts) {
        return parse(string, base64UrlEncoding, opts);
      },
      stringify: function stringify$1(data, opts) {
        return stringify(data, base64UrlEncoding, opts);
      }
    };
    var codec2 = {
      parse,
      stringify
    };
    exports.base16 = base162;
    exports.base32 = base322;
    exports.base32hex = base32hex2;
    exports.base64 = base642;
    exports.base64url = base64url2;
    exports.codec = codec2;
  }
});

// node_modules/rfc4648/lib/index.mjs
var import_index = __toESM(require_lib(), 1);
var base16 = import_index.default.base16;
var base32 = import_index.default.base32;
var base32hex = import_index.default.base32hex;
var base64 = import_index.default.base64;
var base64url = import_index.default.base64url;
var codec = import_index.default.codec;

// node_modules/angular-auth-oidc-client/fesm2020/angular-auth-oidc-client.mjs
var HttpBaseService = class {
  constructor(http) {
    this.http = http;
  }
  get(url, params) {
    return this.http.get(url, params);
  }
  post(url, body, params) {
    return this.http.post(url, body, params);
  }
};
HttpBaseService.ɵfac = function HttpBaseService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || HttpBaseService)(ɵɵinject(HttpClient));
};
HttpBaseService.ɵprov = ɵɵdefineInjectable({
  token: HttpBaseService,
  factory: HttpBaseService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpBaseService, [{
    type: Injectable
  }], function() {
    return [{
      type: HttpClient
    }];
  }, null);
})();
var NGSW_CUSTOM_PARAM = "ngsw-bypass";
var DataService = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  get(url, config, token) {
    const headers = this.prepareHeaders(token);
    const params = this.prepareParams(config);
    return this.httpClient.get(url, {
      headers,
      params
    });
  }
  post(url, body, config, headersParams) {
    const headers = headersParams || this.prepareHeaders();
    const params = this.prepareParams(config);
    return this.httpClient.post(url, body, {
      headers,
      params
    });
  }
  prepareHeaders(token) {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/json");
    if (!!token) {
      headers = headers.set("Authorization", "Bearer " + decodeURIComponent(token));
    }
    return headers;
  }
  prepareParams(config) {
    let params = new HttpParams();
    const {
      ngswBypass
    } = config;
    if (ngswBypass) {
      params = params.set(NGSW_CUSTOM_PARAM, "");
    }
    return params;
  }
};
DataService.ɵfac = function DataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DataService)(ɵɵinject(HttpBaseService));
};
DataService.ɵprov = ɵɵdefineInjectable({
  token: DataService,
  factory: DataService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataService, [{
    type: Injectable
  }], function() {
    return [{
      type: HttpBaseService
    }];
  }, null);
})();
var EventTypes;
(function(EventTypes2) {
  EventTypes2[EventTypes2["ConfigLoaded"] = 0] = "ConfigLoaded";
  EventTypes2[EventTypes2["CheckingAuth"] = 1] = "CheckingAuth";
  EventTypes2[EventTypes2["CheckingAuthFinished"] = 2] = "CheckingAuthFinished";
  EventTypes2[EventTypes2["CheckingAuthFinishedWithError"] = 3] = "CheckingAuthFinishedWithError";
  EventTypes2[EventTypes2["ConfigLoadingFailed"] = 4] = "ConfigLoadingFailed";
  EventTypes2[EventTypes2["CheckSessionReceived"] = 5] = "CheckSessionReceived";
  EventTypes2[EventTypes2["UserDataChanged"] = 6] = "UserDataChanged";
  EventTypes2[EventTypes2["NewAuthenticationResult"] = 7] = "NewAuthenticationResult";
  EventTypes2[EventTypes2["TokenExpired"] = 8] = "TokenExpired";
  EventTypes2[EventTypes2["IdTokenExpired"] = 9] = "IdTokenExpired";
  EventTypes2[EventTypes2["SilentRenewStarted"] = 10] = "SilentRenewStarted";
  EventTypes2[EventTypes2["SilentRenewFailed"] = 11] = "SilentRenewFailed";
})(EventTypes || (EventTypes = {}));
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["None"] = 0] = "None";
  LogLevel2[LogLevel2["Debug"] = 1] = "Debug";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
})(LogLevel || (LogLevel = {}));
var AbstractLoggerService = class {
};
AbstractLoggerService.ɵfac = function AbstractLoggerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AbstractLoggerService)();
};
AbstractLoggerService.ɵprov = ɵɵdefineInjectable({
  token: AbstractLoggerService,
  factory: AbstractLoggerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractLoggerService, [{
    type: Injectable
  }], null, null);
})();
var LoggerService = class {
  constructor(abstractLoggerService) {
    this.abstractLoggerService = abstractLoggerService;
  }
  logError(configuration, message, ...args) {
    if (this.loggingIsTurnedOff(configuration)) {
      return;
    }
    const {
      configId
    } = configuration;
    const messageToLog = this.isObject(message) ? JSON.stringify(message) : message;
    if (!!args && !!args.length) {
      this.abstractLoggerService.logError(`[ERROR] ${configId} - ${messageToLog}`, ...args);
    } else {
      this.abstractLoggerService.logError(`[ERROR] ${configId} - ${messageToLog}`);
    }
  }
  logWarning(configuration, message, ...args) {
    if (!this.logLevelIsSet(configuration)) {
      return;
    }
    if (this.loggingIsTurnedOff(configuration)) {
      return;
    }
    if (!this.currentLogLevelIsEqualOrSmallerThan(configuration, LogLevel.Warn)) {
      return;
    }
    const {
      configId
    } = configuration;
    const messageToLog = this.isObject(message) ? JSON.stringify(message) : message;
    if (!!args && !!args.length) {
      this.abstractLoggerService.logWarning(`[WARN] ${configId} - ${messageToLog}`, ...args);
    } else {
      this.abstractLoggerService.logWarning(`[WARN] ${configId} - ${messageToLog}`);
    }
  }
  logDebug(configuration, message, ...args) {
    if (!this.logLevelIsSet(configuration)) {
      return;
    }
    if (this.loggingIsTurnedOff(configuration)) {
      return;
    }
    if (!this.currentLogLevelIsEqualOrSmallerThan(configuration, LogLevel.Debug)) {
      return;
    }
    const {
      configId
    } = configuration;
    const messageToLog = this.isObject(message) ? JSON.stringify(message) : message;
    if (!!args && !!args.length) {
      this.abstractLoggerService.logDebug(`[DEBUG] ${configId} - ${messageToLog}`, ...args);
    } else {
      this.abstractLoggerService.logDebug(`[DEBUG] ${configId} - ${messageToLog}`);
    }
  }
  currentLogLevelIsEqualOrSmallerThan(configuration, logLevelToCompare) {
    const {
      logLevel
    } = configuration || {};
    return logLevel <= logLevelToCompare;
  }
  logLevelIsSet(configuration) {
    const {
      logLevel
    } = configuration || {};
    if (logLevel === null) {
      return false;
    }
    if (logLevel === void 0) {
      return false;
    }
    return true;
  }
  loggingIsTurnedOff(configuration) {
    const {
      logLevel
    } = configuration || {};
    return logLevel === LogLevel.None;
  }
  isObject(possibleObject) {
    return Object.prototype.toString.call(possibleObject) === "[object Object]";
  }
};
LoggerService.ɵfac = function LoggerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LoggerService)(ɵɵinject(AbstractLoggerService));
};
LoggerService.ɵprov = ɵɵdefineInjectable({
  token: LoggerService,
  factory: LoggerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoggerService, [{
    type: Injectable
  }], function() {
    return [{
      type: AbstractLoggerService
    }];
  }, null);
})();
var AbstractSecurityStorage = class {
};
AbstractSecurityStorage.ɵfac = function AbstractSecurityStorage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AbstractSecurityStorage)();
};
AbstractSecurityStorage.ɵprov = ɵɵdefineInjectable({
  token: AbstractSecurityStorage,
  factory: AbstractSecurityStorage.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractSecurityStorage, [{
    type: Injectable
  }], null, null);
})();
var BrowserStorageService = class {
  constructor(loggerService, abstractSecurityStorage) {
    this.loggerService = loggerService;
    this.abstractSecurityStorage = abstractSecurityStorage;
  }
  read(key, configuration) {
    const {
      configId
    } = configuration;
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to read '${key}' but Storage was undefined`);
      return null;
    }
    const storedConfig = this.abstractSecurityStorage.read(configId);
    if (!storedConfig) {
      return null;
    }
    return JSON.parse(storedConfig);
  }
  write(value, configuration) {
    const {
      configId
    } = configuration;
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to write '${value}' but Storage was falsy`);
      return false;
    }
    value = value || null;
    this.abstractSecurityStorage.write(configId, JSON.stringify(value));
    return true;
  }
  remove(key, configuration) {
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to remove '${key}' but Storage was falsy`);
      return false;
    }
    this.abstractSecurityStorage.remove(key);
    return true;
  }
  // TODO THIS STORAGE WANTS AN ID BUT CLEARS EVERYTHING
  clear(configuration) {
    if (!this.hasStorage()) {
      this.loggerService.logDebug(configuration, `Wanted to clear storage but Storage was falsy`);
      return false;
    }
    this.abstractSecurityStorage.clear();
    return true;
  }
  hasStorage() {
    return typeof Storage !== "undefined";
  }
};
BrowserStorageService.ɵfac = function BrowserStorageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || BrowserStorageService)(ɵɵinject(LoggerService), ɵɵinject(AbstractSecurityStorage));
};
BrowserStorageService.ɵprov = ɵɵdefineInjectable({
  token: BrowserStorageService,
  factory: BrowserStorageService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserStorageService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: AbstractSecurityStorage
    }];
  }, null);
})();
var StoragePersistenceService = class {
  constructor(browserStorageService) {
    this.browserStorageService = browserStorageService;
  }
  read(key, config) {
    const storedConfig = this.browserStorageService.read(key, config) || {};
    return storedConfig[key];
  }
  write(key, value, config) {
    const storedConfig = this.browserStorageService.read(key, config) || {};
    storedConfig[key] = value;
    return this.browserStorageService.write(storedConfig, config);
  }
  remove(key, config) {
    const storedConfig = this.browserStorageService.read(key, config) || {};
    delete storedConfig[key];
    this.browserStorageService.write(storedConfig, config);
  }
  clear(config) {
    this.browserStorageService.clear(config);
  }
  resetStorageFlowData(config) {
    this.remove("session_state", config);
    this.remove("storageSilentRenewRunning", config);
    this.remove("storageCodeFlowInProgress", config);
    this.remove("codeVerifier", config);
    this.remove("userData", config);
    this.remove("storageCustomParamsAuthRequest", config);
    this.remove("access_token_expires_at", config);
    this.remove("storageCustomParamsRefresh", config);
    this.remove("storageCustomParamsEndSession", config);
    this.remove("reusable_refresh_token", config);
  }
  resetAuthStateInStorage(config) {
    this.remove("authzData", config);
    this.remove("reusable_refresh_token", config);
    this.remove("authnResult", config);
  }
  getAccessToken(config) {
    return this.read("authzData", config);
  }
  getIdToken(config) {
    return this.read("authnResult", config)?.id_token;
  }
  getRefreshToken(config) {
    let refreshToken = this.read("authnResult", config)?.refresh_token;
    if (!refreshToken && config.allowUnsafeReuseRefreshToken) {
      return this.read("reusable_refresh_token", config);
    }
    return refreshToken;
  }
  getAuthenticationResult(config) {
    return this.read("authnResult", config);
  }
};
StoragePersistenceService.ɵfac = function StoragePersistenceService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StoragePersistenceService)(ɵɵinject(BrowserStorageService));
};
StoragePersistenceService.ɵprov = ɵɵdefineInjectable({
  token: StoragePersistenceService,
  factory: StoragePersistenceService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StoragePersistenceService, [{
    type: Injectable
  }], function() {
    return [{
      type: BrowserStorageService
    }];
  }, null);
})();
var PublicEventsService = class {
  constructor() {
    this.notify = new ReplaySubject(1);
  }
  /**
   * Fires a new event.
   *
   * @param type The event type.
   * @param value The event value.
   */
  fireEvent(type, value) {
    this.notify.next({
      type,
      value
    });
  }
  /**
   * Wires up the event notification observable.
   */
  registerForEvents() {
    return this.notify.asObservable();
  }
};
PublicEventsService.ɵfac = function PublicEventsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PublicEventsService)();
};
PublicEventsService.ɵprov = ɵɵdefineInjectable({
  token: PublicEventsService,
  factory: PublicEventsService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PublicEventsService, [{
    type: Injectable
  }], null, null);
})();
function getVerifyAlg(alg) {
  switch (alg.charAt(0)) {
    case "R":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      };
    case "E":
      if (alg.includes("256")) {
        return {
          name: "ECDSA",
          hash: "SHA-256"
        };
      } else if (alg.includes("384")) {
        return {
          name: "ECDSA",
          hash: "SHA-384"
        };
      } else {
        return null;
      }
    default:
      return null;
  }
}
function alg2kty(alg) {
  switch (alg.charAt(0)) {
    case "R":
      return "RSA";
    case "E":
      return "EC";
    default:
      throw new Error("Cannot infer kty from alg: " + alg);
  }
}
function getImportAlg(alg) {
  switch (alg.charAt(0)) {
    case "R":
      if (alg.includes("256")) {
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256"
        };
      } else if (alg.includes("384")) {
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-384"
        };
      } else if (alg.includes("512")) {
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-512"
        };
      } else {
        return null;
      }
    case "E":
      if (alg.includes("256")) {
        return {
          name: "ECDSA",
          namedCurve: "P-256"
        };
      } else if (alg.includes("384")) {
        return {
          name: "ECDSA",
          namedCurve: "P-384"
        };
      } else {
        return null;
      }
    default:
      return null;
  }
}
var PARTS_OF_TOKEN = 3;
var TokenHelperService = class {
  constructor(loggerService, document) {
    this.loggerService = loggerService;
    this.document = document;
  }
  getTokenExpirationDate(dataIdToken) {
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "exp")) {
      return new Date((/* @__PURE__ */ new Date()).toUTCString());
    }
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCSeconds(dataIdToken.exp);
    return date;
  }
  getSigningInputFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return "";
    }
    const header = this.getHeaderFromToken(token, encoded, configuration);
    const payload = this.getPayloadFromToken(token, encoded, configuration);
    return [header, payload].join(".");
  }
  getHeaderFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return {};
    }
    return this.getPartOfToken(token, 0, encoded);
  }
  getPayloadFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return {};
    }
    return this.getPartOfToken(token, 1, encoded);
  }
  getSignatureFromToken(token, encoded, configuration) {
    if (!this.tokenIsValid(token, configuration)) {
      return {};
    }
    return this.getPartOfToken(token, 2, encoded);
  }
  getPartOfToken(token, index, encoded) {
    const partOfToken = this.extractPartOfToken(token, index);
    if (encoded) {
      return partOfToken;
    }
    const result = this.urlBase64Decode(partOfToken);
    return JSON.parse(result);
  }
  urlBase64Decode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw Error("Illegal base64url string!");
    }
    const decoded = typeof this.document.defaultView !== "undefined" ? this.document.defaultView.atob(output) : Buffer.from(output, "base64").toString("binary");
    try {
      return decodeURIComponent(decoded.split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
    } catch (err) {
      return decoded;
    }
  }
  tokenIsValid(token, configuration) {
    if (!token) {
      this.loggerService.logError(configuration, `token '${token}' is not valid --> token falsy`);
      return false;
    }
    if (!token.includes(".")) {
      this.loggerService.logError(configuration, `token '${token}' is not valid --> no dots included`);
      return false;
    }
    const parts = token.split(".");
    if (parts.length !== PARTS_OF_TOKEN) {
      this.loggerService.logError(configuration, `token '${token}' is not valid --> token has to have exactly ${PARTS_OF_TOKEN - 1} dots`);
      return false;
    }
    return true;
  }
  extractPartOfToken(token, index) {
    return token.split(".")[index];
  }
};
TokenHelperService.ɵfac = function TokenHelperService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TokenHelperService)(ɵɵinject(LoggerService), ɵɵinject(DOCUMENT));
};
TokenHelperService.ɵprov = ɵɵdefineInjectable({
  token: TokenHelperService,
  factory: TokenHelperService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TokenHelperService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var JwkExtractor = class _JwkExtractor {
  static buildErrorName(name) {
    return _JwkExtractor.name + ": " + name;
  }
  extractJwk(keys, spec, throwOnEmpty = true) {
    if (0 === keys.length) {
      throw _JwkExtractor.InvalidArgumentError;
    }
    let foundKeys = keys.filter((k) => spec?.kid ? k["kid"] === spec.kid : true).filter((k) => spec?.use ? k["use"] === spec.use : true).filter((k) => spec?.kty ? k["kty"] === spec.kty : true);
    if (foundKeys.length === 0 && throwOnEmpty) {
      throw _JwkExtractor.NoMatchingKeysError;
    }
    if (foundKeys.length > 1 && (null === spec || void 0 === spec)) {
      throw _JwkExtractor.SeveralMatchingKeysError;
    }
    return foundKeys;
  }
};
JwkExtractor.InvalidArgumentError = {
  name: JwkExtractor.buildErrorName("InvalidArgumentError"),
  message: "Array of keys was empty. Unable to extract"
};
JwkExtractor.NoMatchingKeysError = {
  name: JwkExtractor.buildErrorName("NoMatchingKeysError"),
  message: "No key found matching the spec"
};
JwkExtractor.SeveralMatchingKeysError = {
  name: JwkExtractor.buildErrorName("SeveralMatchingKeysError"),
  message: "More than one key found. Please use spec to filter"
};
JwkExtractor.ɵfac = function JwkExtractor_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || JwkExtractor)();
};
JwkExtractor.ɵprov = ɵɵdefineInjectable({
  token: JwkExtractor,
  factory: JwkExtractor.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwkExtractor, [{
    type: Injectable
  }], null, null);
})();
var CryptoService = class {
  constructor(doc) {
    this.doc = doc;
  }
  getCrypto() {
    return this.doc.defaultView.crypto || this.doc.defaultView.msCrypto;
  }
};
CryptoService.ɵfac = function CryptoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CryptoService)(ɵɵinject(DOCUMENT));
};
CryptoService.ɵprov = ɵɵdefineInjectable({
  token: CryptoService,
  factory: CryptoService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CryptoService, [{
    type: Injectable
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var JwkWindowCryptoService = class {
  constructor(cryptoService) {
    this.cryptoService = cryptoService;
  }
  importVerificationKey(key, algorithm) {
    return this.cryptoService.getCrypto().subtle.importKey("jwk", key, algorithm, false, ["verify"]);
  }
  verifyKey(verifyAlgorithm, cryptoKey, signature, signingInput) {
    return this.cryptoService.getCrypto().subtle.verify(verifyAlgorithm, cryptoKey, signature, new TextEncoder().encode(signingInput));
  }
};
JwkWindowCryptoService.ɵfac = function JwkWindowCryptoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || JwkWindowCryptoService)(ɵɵinject(CryptoService));
};
JwkWindowCryptoService.ɵprov = ɵɵdefineInjectable({
  token: JwkWindowCryptoService,
  factory: JwkWindowCryptoService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwkWindowCryptoService, [{
    type: Injectable
  }], function() {
    return [{
      type: CryptoService
    }];
  }, null);
})();
var JwtWindowCryptoService = class {
  constructor(cryptoService) {
    this.cryptoService = cryptoService;
  }
  generateCodeChallenge(codeVerifier) {
    return this.calcHash(codeVerifier).pipe(map((challengeRaw) => this.base64UrlEncode(challengeRaw)));
  }
  generateAtHash(accessToken, algorithm) {
    return this.calcHash(accessToken, algorithm).pipe(map((tokenHash) => {
      let substr = tokenHash.substr(0, tokenHash.length / 2);
      const tokenHashBase64 = btoa(substr);
      return tokenHashBase64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }));
  }
  calcHash(valueToHash, algorithm = "SHA-256") {
    const msgBuffer = new TextEncoder().encode(valueToHash);
    return from(this.cryptoService.getCrypto().subtle.digest(algorithm, msgBuffer)).pipe(map((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return this.toHashString(hashArray);
    }));
  }
  toHashString(byteArray) {
    let result = "";
    for (let e of byteArray) {
      result += String.fromCharCode(e);
    }
    return result;
  }
  base64UrlEncode(str) {
    const base642 = btoa(str);
    return base642.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
};
JwtWindowCryptoService.ɵfac = function JwtWindowCryptoService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || JwtWindowCryptoService)(ɵɵinject(CryptoService));
};
JwtWindowCryptoService.ɵprov = ɵɵdefineInjectable({
  token: JwtWindowCryptoService,
  factory: JwtWindowCryptoService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(JwtWindowCryptoService, [{
    type: Injectable
  }], function() {
    return [{
      type: CryptoService
    }];
  }, null);
})();
var TokenValidationService = class _TokenValidationService {
  constructor(tokenHelperService, loggerService, jwkExtractor, jwkWindowCryptoService, jwtWindowCryptoService, document) {
    this.tokenHelperService = tokenHelperService;
    this.loggerService = loggerService;
    this.jwkExtractor = jwkExtractor;
    this.jwkWindowCryptoService = jwkWindowCryptoService;
    this.jwtWindowCryptoService = jwtWindowCryptoService;
    this.document = document;
    this.keyAlgorithms = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "PS256", "PS384", "PS512"];
  }
  // id_token C7: The current time MUST be before the time represented by the exp Claim
  // (possibly allowing for some small leeway to account for clock skew).
  hasIdTokenExpired(token, configuration, offsetSeconds) {
    const decoded = this.tokenHelperService.getPayloadFromToken(token, false, configuration);
    return !this.validateIdTokenExpNotExpired(decoded, configuration, offsetSeconds);
  }
  // id_token C7: The current time MUST be before the time represented by the exp Claim
  // (possibly allowing for some small leeway to account for clock skew).
  validateIdTokenExpNotExpired(decodedIdToken, configuration, offsetSeconds) {
    const tokenExpirationDate = this.tokenHelperService.getTokenExpirationDate(decodedIdToken);
    offsetSeconds = offsetSeconds || 0;
    if (!tokenExpirationDate) {
      return false;
    }
    const tokenExpirationValue = tokenExpirationDate.valueOf();
    const nowWithOffset = this.calculateNowWithOffset(offsetSeconds);
    const tokenNotExpired = tokenExpirationValue > nowWithOffset;
    this.loggerService.logDebug(configuration, `Has idToken expired: ${!tokenNotExpired} --> expires in ${this.millisToMinutesAndSeconds(tokenExpirationValue - nowWithOffset)} , ${new Date(tokenExpirationValue).toLocaleTimeString()} > ${new Date(nowWithOffset).toLocaleTimeString()}`);
    return tokenNotExpired;
  }
  validateAccessTokenNotExpired(accessTokenExpiresAt, configuration, offsetSeconds) {
    if (!accessTokenExpiresAt) {
      return true;
    }
    offsetSeconds = offsetSeconds || 0;
    const accessTokenExpirationValue = accessTokenExpiresAt.valueOf();
    const nowWithOffset = this.calculateNowWithOffset(offsetSeconds);
    const tokenNotExpired = accessTokenExpirationValue > nowWithOffset;
    this.loggerService.logDebug(configuration, `Has accessToken expired: ${!tokenNotExpired} --> expires in ${this.millisToMinutesAndSeconds(accessTokenExpirationValue - nowWithOffset)} , ${new Date(accessTokenExpirationValue).toLocaleTimeString()} > ${new Date(nowWithOffset).toLocaleTimeString()}`);
    return tokenNotExpired;
  }
  // iss
  // REQUIRED. Issuer Identifier for the Issuer of the response.The iss value is a case-sensitive URL using the
  // https scheme that contains scheme, host,
  // and optionally, port number and path components and no query or fragment components.
  //
  // sub
  // REQUIRED. Subject Identifier.Locally unique and never reassigned identifier within the Issuer for the End- User,
  // which is intended to be consumed by the Client, e.g., 24400320 or AItOawmwtWwcT0k51BayewNvutrJUqsvl6qs7A4.
  // It MUST NOT exceed 255 ASCII characters in length.The sub value is a case-sensitive string.
  //
  // aud
  // REQUIRED. Audience(s) that this ID Token is intended for. It MUST contain the OAuth 2.0 client_id of the Relying Party as an
  // audience value.
  // It MAY also contain identifiers for other audiences.In the general case, the aud value is an array of case-sensitive strings.
  // In the common special case when there is one audience, the aud value MAY be a single case-sensitive string.
  //
  // exp
  // REQUIRED. Expiration time on or after which the ID Token MUST NOT be accepted for processing.
  // The processing of this parameter requires that the current date/ time MUST be before the expiration date/ time listed in the value.
  // Implementers MAY provide for some small leeway, usually no more than a few minutes, to account for clock skew.
  // Its value is a JSON [RFC7159] number representing the number of seconds from 1970- 01 - 01T00: 00:00Z as measured in UTC until
  // the date/ time.
  // See RFC 3339 [RFC3339] for details regarding date/ times in general and UTC in particular.
  //
  // iat
  // REQUIRED. Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from
  // 1970- 01 - 01T00: 00: 00Z as measured
  // in UTC until the date/ time.
  validateRequiredIdToken(dataIdToken, configuration) {
    let validated = true;
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "iss")) {
      validated = false;
      this.loggerService.logWarning(configuration, "iss is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "sub")) {
      validated = false;
      this.loggerService.logWarning(configuration, "sub is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "aud")) {
      validated = false;
      this.loggerService.logWarning(configuration, "aud is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "exp")) {
      validated = false;
      this.loggerService.logWarning(configuration, "exp is missing, this is required in the id_token");
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "iat")) {
      validated = false;
      this.loggerService.logWarning(configuration, "iat is missing, this is required in the id_token");
    }
    return validated;
  }
  // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
  // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
  validateIdTokenIatMaxOffset(dataIdToken, maxOffsetAllowedInSeconds, disableIatOffsetValidation, configuration) {
    if (disableIatOffsetValidation) {
      return true;
    }
    if (!Object.prototype.hasOwnProperty.call(dataIdToken, "iat")) {
      return false;
    }
    const dateTimeIatIdToken = /* @__PURE__ */ new Date(0);
    dateTimeIatIdToken.setUTCSeconds(dataIdToken.iat);
    maxOffsetAllowedInSeconds = maxOffsetAllowedInSeconds || 0;
    const nowInUtc = new Date((/* @__PURE__ */ new Date()).toUTCString());
    const diff = nowInUtc.valueOf() - dateTimeIatIdToken.valueOf();
    const maxOffsetAllowedInMilliseconds = maxOffsetAllowedInSeconds * 1e3;
    this.loggerService.logDebug(configuration, `validate id token iat max offset ${diff} < ${maxOffsetAllowedInMilliseconds}`);
    if (diff > 0) {
      return diff < maxOffsetAllowedInMilliseconds;
    }
    return -diff < maxOffsetAllowedInMilliseconds;
  }
  // id_token C9: The value of the nonce Claim MUST be checked to verify that it is the same value as the one
  // that was sent in the Authentication Request.The Client SHOULD check the nonce value for replay attacks.
  // The precise method for detecting replay attacks is Client specific.
  // However the nonce claim SHOULD not be present for the refresh_token grant type
  // https://bitbucket.org/openid/connect/issues/1025/ambiguity-with-how-nonce-is-handled-on
  // The current spec is ambiguous and KeyCloak does send it.
  validateIdTokenNonce(dataIdToken, localNonce, ignoreNonceAfterRefresh, configuration) {
    const isFromRefreshToken = (dataIdToken.nonce === void 0 || ignoreNonceAfterRefresh) && localNonce === _TokenValidationService.refreshTokenNoncePlaceholder;
    if (!isFromRefreshToken && dataIdToken.nonce !== localNonce) {
      this.loggerService.logDebug(configuration, "Validate_id_token_nonce failed, dataIdToken.nonce: " + dataIdToken.nonce + " local_nonce:" + localNonce);
      return false;
    }
    return true;
  }
  // id_token C1: The Issuer Identifier for the OpenID Provider (which is typically obtained during Discovery)
  // MUST exactly match the value of the iss (issuer) Claim.
  validateIdTokenIss(dataIdToken, authWellKnownEndpointsIssuer, configuration) {
    if (dataIdToken.iss !== authWellKnownEndpointsIssuer) {
      this.loggerService.logDebug(configuration, "Validate_id_token_iss failed, dataIdToken.iss: " + dataIdToken.iss + " authWellKnownEndpoints issuer:" + authWellKnownEndpointsIssuer);
      return false;
    }
    return true;
  }
  // id_token C2: The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer identified
  // by the iss (issuer) Claim as an audience.
  // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience, or if it contains additional audiences
  // not trusted by the Client.
  validateIdTokenAud(dataIdToken, aud, configuration) {
    if (Array.isArray(dataIdToken.aud)) {
      const result = dataIdToken.aud.includes(aud);
      if (!result) {
        this.loggerService.logDebug(configuration, "Validate_id_token_aud array failed, dataIdToken.aud: " + dataIdToken.aud + " client_id:" + aud);
        return false;
      }
      return true;
    } else if (dataIdToken.aud !== aud) {
      this.loggerService.logDebug(configuration, "Validate_id_token_aud failed, dataIdToken.aud: " + dataIdToken.aud + " client_id:" + aud);
      return false;
    }
    return true;
  }
  validateIdTokenAzpExistsIfMoreThanOneAud(dataIdToken) {
    if (!dataIdToken) {
      return false;
    }
    if (Array.isArray(dataIdToken.aud) && dataIdToken.aud.length > 1 && !dataIdToken.azp) {
      return false;
    }
    return true;
  }
  // If an azp (authorized party) Claim is present, the Client SHOULD verify that its client_id is the Claim Value.
  validateIdTokenAzpValid(dataIdToken, clientId) {
    if (!dataIdToken?.azp) {
      return true;
    }
    if (dataIdToken.azp === clientId) {
      return true;
    }
    return false;
  }
  validateStateFromHashCallback(state, localState, configuration) {
    if (state !== localState) {
      this.loggerService.logDebug(configuration, "ValidateStateFromHashCallback failed, state: " + state + " local_state:" + localState);
      return false;
    }
    return true;
  }
  // id_token C5: The Client MUST validate the signature of the ID Token according to JWS [JWS] using the algorithm specified in the alg
  // Header Parameter of the JOSE Header.The Client MUST use the keys provided by the Issuer.
  // id_token C6: The alg value SHOULD be RS256. Validation of tokens using other signing algorithms is described in the
  // OpenID Connect Core 1.0 [OpenID.Core] specification.
  validateSignatureIdToken(idToken, jwtkeys, configuration) {
    if (!idToken) {
      return of(true);
    }
    if (!jwtkeys || !jwtkeys.keys) {
      return of(false);
    }
    const headerData = this.tokenHelperService.getHeaderFromToken(idToken, false, configuration);
    if (Object.keys(headerData).length === 0 && headerData.constructor === Object) {
      this.loggerService.logWarning(configuration, "id token has no header data");
      return of(false);
    }
    const kid = headerData.kid;
    let alg = headerData.alg;
    let keys = jwtkeys.keys;
    let foundKeys;
    let key;
    if (!this.keyAlgorithms.includes(alg)) {
      this.loggerService.logWarning(configuration, "alg not supported", alg);
      return of(false);
    }
    const kty = alg2kty(alg);
    const use = "sig";
    try {
      foundKeys = kid ? this.jwkExtractor.extractJwk(keys, {
        kid,
        kty,
        use
      }, false) : this.jwkExtractor.extractJwk(keys, {
        kty,
        use
      }, false);
      if (foundKeys.length === 0) {
        foundKeys = kid ? this.jwkExtractor.extractJwk(keys, {
          kid,
          kty
        }) : this.jwkExtractor.extractJwk(keys, {
          kty
        });
      }
      key = foundKeys[0];
    } catch (e) {
      this.loggerService.logError(configuration, e);
      return of(false);
    }
    const algorithm = getImportAlg(alg);
    const signingInput = this.tokenHelperService.getSigningInputFromToken(idToken, true, configuration);
    const rawSignature = this.tokenHelperService.getSignatureFromToken(idToken, true, configuration);
    const agent = this.document.defaultView.navigator.userAgent.toLowerCase();
    if (agent.indexOf("firefox") > -1 && key.kty === "EC") {
      key.alg = "";
    }
    return from(this.jwkWindowCryptoService.importVerificationKey(key, algorithm)).pipe(mergeMap((cryptoKey) => {
      const signature = base64url.parse(rawSignature, {
        loose: true
      });
      const verifyAlgorithm = getVerifyAlg(alg);
      return from(this.jwkWindowCryptoService.verifyKey(verifyAlgorithm, cryptoKey, signature, signingInput));
    }), tap((isValid) => {
      if (!isValid) {
        this.loggerService.logWarning(configuration, "incorrect Signature, validation failed for id_token");
      }
    }));
  }
  // Accepts ID Token without 'kid' claim in JOSE header if only one JWK supplied in 'jwks_url'
  //// private validate_no_kid_in_header_only_one_allowed_in_jwtkeys(header_data: any, jwtkeys: any): boolean {
  ////    this.oidcSecurityCommon.logDebug('amount of jwtkeys.keys: ' + jwtkeys.keys.length);
  ////    if (!header_data.hasOwnProperty('kid')) {
  ////        // no kid defined in Jose header
  ////        if (jwtkeys.keys.length != 1) {
  ////            this.oidcSecurityCommon.logDebug('jwtkeys.keys.length != 1 and no kid in header');
  ////            return false;
  ////        }
  ////    }
  ////    return true;
  //// }
  // Access Token Validation
  // access_token C1: Hash the octets of the ASCII representation of the access_token with the hash algorithm specified in JWA[JWA]
  // for the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is RS256, the hash algorithm used is SHA-256.
  // access_token C2: Take the left- most half of the hash and base64url- encode it.
  // access_token C3: The value of at_hash in the ID Token MUST match the value produced in the previous step if at_hash
  // is present in the ID Token.
  validateIdTokenAtHash(accessToken, atHash, idTokenAlg, configuration) {
    this.loggerService.logDebug(configuration, "at_hash from the server:" + atHash);
    let sha = "SHA-256";
    if (idTokenAlg.includes("384")) {
      sha = "SHA-384";
    } else if (idTokenAlg.includes("512")) {
      sha = "SHA-512";
    }
    return this.jwtWindowCryptoService.generateAtHash("" + accessToken, sha).pipe(mergeMap((hash) => {
      this.loggerService.logDebug(configuration, "at_hash client validation not decoded:" + hash);
      if (hash === atHash) {
        return of(true);
      } else {
        return this.jwtWindowCryptoService.generateAtHash("" + decodeURIComponent(accessToken), sha).pipe(map((newHash) => {
          this.loggerService.logDebug(configuration, "-gen access--" + hash);
          return newHash === atHash;
        }));
      }
    }));
  }
  millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 6e4);
    const seconds = (millis % 6e4 / 1e3).toFixed(0);
    return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
  }
  calculateNowWithOffset(offsetSeconds) {
    return new Date((/* @__PURE__ */ new Date()).toUTCString()).valueOf() + offsetSeconds * 1e3;
  }
};
TokenValidationService.refreshTokenNoncePlaceholder = "--RefreshToken--";
TokenValidationService.ɵfac = function TokenValidationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TokenValidationService)(ɵɵinject(TokenHelperService), ɵɵinject(LoggerService), ɵɵinject(JwkExtractor), ɵɵinject(JwkWindowCryptoService), ɵɵinject(JwtWindowCryptoService), ɵɵinject(DOCUMENT));
};
TokenValidationService.ɵprov = ɵɵdefineInjectable({
  token: TokenValidationService,
  factory: TokenValidationService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TokenValidationService, [{
    type: Injectable
  }], function() {
    return [{
      type: TokenHelperService
    }, {
      type: LoggerService
    }, {
      type: JwkExtractor
    }, {
      type: JwkWindowCryptoService
    }, {
      type: JwtWindowCryptoService
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var DEFAULT_AUTHRESULT = {
  isAuthenticated: false,
  allConfigsAuthenticated: []
};
var AuthStateService = class {
  constructor(storagePersistenceService, loggerService, publicEventsService, tokenValidationService) {
    this.storagePersistenceService = storagePersistenceService;
    this.loggerService = loggerService;
    this.publicEventsService = publicEventsService;
    this.tokenValidationService = tokenValidationService;
    this.authenticatedInternal$ = new BehaviorSubject(DEFAULT_AUTHRESULT);
  }
  get authenticated$() {
    return this.authenticatedInternal$.asObservable().pipe(distinctUntilChanged());
  }
  setAuthenticatedAndFireEvent(allConfigs) {
    const result = this.composeAuthenticatedResult(allConfigs);
    this.authenticatedInternal$.next(result);
  }
  setUnauthenticatedAndFireEvent(currentConfig, allConfigs) {
    this.storagePersistenceService.resetAuthStateInStorage(currentConfig);
    const result = this.composeUnAuthenticatedResult(allConfigs);
    this.authenticatedInternal$.next(result);
  }
  updateAndPublishAuthState(authenticationResult) {
    this.publicEventsService.fireEvent(EventTypes.NewAuthenticationResult, authenticationResult);
  }
  setAuthorizationData(accessToken, authResult, currentConfig, allConfigs) {
    this.loggerService.logDebug(currentConfig, `storing the accessToken '${accessToken}'`);
    this.storagePersistenceService.write("authzData", accessToken, currentConfig);
    this.persistAccessTokenExpirationTime(authResult, currentConfig);
    this.setAuthenticatedAndFireEvent(allConfigs);
  }
  getAccessToken(configuration) {
    if (!this.isAuthenticated(configuration)) {
      return null;
    }
    const token = this.storagePersistenceService.getAccessToken(configuration);
    return this.decodeURIComponentSafely(token);
  }
  getIdToken(configuration) {
    if (!this.isAuthenticated(configuration)) {
      return null;
    }
    const token = this.storagePersistenceService.getIdToken(configuration);
    return this.decodeURIComponentSafely(token);
  }
  getRefreshToken(configuration) {
    if (!this.isAuthenticated(configuration)) {
      return null;
    }
    const token = this.storagePersistenceService.getRefreshToken(configuration);
    return this.decodeURIComponentSafely(token);
  }
  getAuthenticationResult(configuration) {
    if (!this.isAuthenticated(configuration)) {
      return null;
    }
    return this.storagePersistenceService.getAuthenticationResult(configuration);
  }
  areAuthStorageTokensValid(configuration) {
    if (!this.isAuthenticated(configuration)) {
      return false;
    }
    if (this.hasIdTokenExpiredAndRenewCheckIsEnabled(configuration)) {
      this.loggerService.logDebug(configuration, "persisted idToken is expired");
      return false;
    }
    if (this.hasAccessTokenExpiredIfExpiryExists(configuration)) {
      this.loggerService.logDebug(configuration, "persisted accessToken is expired");
      return false;
    }
    this.loggerService.logDebug(configuration, "persisted idToken and accessToken are valid");
    return true;
  }
  hasIdTokenExpiredAndRenewCheckIsEnabled(configuration) {
    const {
      renewTimeBeforeTokenExpiresInSeconds,
      triggerRefreshWhenIdTokenExpired,
      disableIdTokenValidation
    } = configuration;
    if (!triggerRefreshWhenIdTokenExpired || disableIdTokenValidation) {
      return false;
    }
    const tokenToCheck = this.storagePersistenceService.getIdToken(configuration);
    const idTokenExpired = this.tokenValidationService.hasIdTokenExpired(tokenToCheck, configuration, renewTimeBeforeTokenExpiresInSeconds);
    if (idTokenExpired) {
      this.publicEventsService.fireEvent(EventTypes.IdTokenExpired, idTokenExpired);
    }
    return idTokenExpired;
  }
  hasAccessTokenExpiredIfExpiryExists(configuration) {
    const {
      renewTimeBeforeTokenExpiresInSeconds
    } = configuration;
    const accessTokenExpiresIn = this.storagePersistenceService.read("access_token_expires_at", configuration);
    const accessTokenHasNotExpired = this.tokenValidationService.validateAccessTokenNotExpired(accessTokenExpiresIn, configuration, renewTimeBeforeTokenExpiresInSeconds);
    const hasExpired = !accessTokenHasNotExpired;
    if (hasExpired) {
      this.publicEventsService.fireEvent(EventTypes.TokenExpired, hasExpired);
    }
    return hasExpired;
  }
  isAuthenticated(configuration) {
    const hasAccessToken = !!this.storagePersistenceService.getAccessToken(configuration);
    const hasIdToken = !!this.storagePersistenceService.getIdToken(configuration);
    return hasAccessToken && hasIdToken;
  }
  decodeURIComponentSafely(token) {
    if (token) {
      return decodeURIComponent(token);
    } else {
      return "";
    }
  }
  persistAccessTokenExpirationTime(authResult, configuration) {
    if (authResult?.expires_in) {
      const accessTokenExpiryTime = new Date((/* @__PURE__ */ new Date()).toUTCString()).valueOf() + authResult.expires_in * 1e3;
      this.storagePersistenceService.write("access_token_expires_at", accessTokenExpiryTime, configuration);
    }
  }
  composeAuthenticatedResult(allConfigs) {
    if (allConfigs.length === 1) {
      const {
        configId
      } = allConfigs[0];
      return {
        isAuthenticated: true,
        allConfigsAuthenticated: [{
          configId,
          isAuthenticated: true
        }]
      };
    }
    return this.checkAllConfigsIfTheyAreAuthenticated(allConfigs);
  }
  composeUnAuthenticatedResult(allConfigs) {
    if (allConfigs.length === 1) {
      const {
        configId
      } = allConfigs[0];
      return {
        isAuthenticated: false,
        allConfigsAuthenticated: [{
          configId,
          isAuthenticated: false
        }]
      };
    }
    return this.checkAllConfigsIfTheyAreAuthenticated(allConfigs);
  }
  checkAllConfigsIfTheyAreAuthenticated(allConfigs) {
    const allConfigsAuthenticated = allConfigs.map((config) => ({
      configId: config.configId,
      isAuthenticated: this.isAuthenticated(config)
    }));
    const isAuthenticated = allConfigsAuthenticated.every((x) => !!x.isAuthenticated);
    return {
      allConfigsAuthenticated,
      isAuthenticated
    };
  }
};
AuthStateService.ɵfac = function AuthStateService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AuthStateService)(ɵɵinject(StoragePersistenceService), ɵɵinject(LoggerService), ɵɵinject(PublicEventsService), ɵɵinject(TokenValidationService));
};
AuthStateService.ɵprov = ɵɵdefineInjectable({
  token: AuthStateService,
  factory: AuthStateService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthStateService, [{
    type: Injectable
  }], function() {
    return [{
      type: StoragePersistenceService
    }, {
      type: LoggerService
    }, {
      type: PublicEventsService
    }, {
      type: TokenValidationService
    }];
  }, null);
})();
var IFrameService = class {
  constructor(document, loggerService) {
    this.document = document;
    this.loggerService = loggerService;
  }
  getExistingIFrame(identifier) {
    const iFrameOnParent = this.getIFrameFromParentWindow(identifier);
    if (this.isIFrameElement(iFrameOnParent)) {
      return iFrameOnParent;
    }
    const iFrameOnSelf = this.getIFrameFromWindow(identifier);
    if (this.isIFrameElement(iFrameOnSelf)) {
      return iFrameOnSelf;
    }
    return null;
  }
  addIFrameToWindowBody(identifier, config) {
    const sessionIframe = this.document.createElement("iframe");
    sessionIframe.id = identifier;
    sessionIframe.title = identifier;
    this.loggerService.logDebug(config, sessionIframe);
    sessionIframe.style.display = "none";
    this.document.body.appendChild(sessionIframe);
    return sessionIframe;
  }
  getIFrameFromParentWindow(identifier) {
    try {
      const iFrameElement = this.document.defaultView.parent.document.getElementById(identifier);
      if (this.isIFrameElement(iFrameElement)) {
        return iFrameElement;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  getIFrameFromWindow(identifier) {
    const iFrameElement = this.document.getElementById(identifier);
    if (this.isIFrameElement(iFrameElement)) {
      return iFrameElement;
    }
    return null;
  }
  isIFrameElement(element) {
    return !!element && element instanceof HTMLIFrameElement;
  }
};
IFrameService.ɵfac = function IFrameService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IFrameService)(ɵɵinject(DOCUMENT), ɵɵinject(LoggerService));
};
IFrameService.ɵprov = ɵɵdefineInjectable({
  token: IFrameService,
  factory: IFrameService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IFrameService, [{
    type: Injectable
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: LoggerService
    }];
  }, null);
})();
var IFRAME_FOR_CHECK_SESSION_IDENTIFIER = "myiFrameForCheckSession";
var CheckSessionService = class {
  constructor(storagePersistenceService, loggerService, iFrameService, eventService, zone, document) {
    this.storagePersistenceService = storagePersistenceService;
    this.loggerService = loggerService;
    this.iFrameService = iFrameService;
    this.eventService = eventService;
    this.zone = zone;
    this.document = document;
    this.checkSessionReceived = false;
    this.lastIFrameRefresh = 0;
    this.outstandingMessages = 0;
    this.heartBeatInterval = 3e3;
    this.iframeRefreshInterval = 6e4;
    this.checkSessionChangedInternal$ = new BehaviorSubject(false);
  }
  get checkSessionChanged$() {
    return this.checkSessionChangedInternal$.asObservable();
  }
  isCheckSessionConfigured(configuration) {
    const {
      startCheckSession
    } = configuration;
    return startCheckSession;
  }
  start(configuration) {
    if (!!this.scheduledHeartBeatRunning) {
      return;
    }
    const {
      clientId
    } = configuration;
    this.pollServerSession(clientId, configuration);
  }
  stop() {
    if (!this.scheduledHeartBeatRunning) {
      return;
    }
    this.clearScheduledHeartBeat();
    this.checkSessionReceived = false;
  }
  serverStateChanged(configuration) {
    const {
      startCheckSession
    } = configuration;
    return startCheckSession && this.checkSessionReceived;
  }
  getExistingIframe() {
    return this.iFrameService.getExistingIFrame(IFRAME_FOR_CHECK_SESSION_IDENTIFIER);
  }
  init(configuration) {
    if (this.lastIFrameRefresh + this.iframeRefreshInterval > Date.now()) {
      return of(void 0);
    }
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!authWellKnownEndPoints) {
      this.loggerService.logWarning(configuration, "CheckSession - init check session: authWellKnownEndpoints is undefined. Returning.");
      return of();
    }
    const existingIframe = this.getOrCreateIframe(configuration);
    const checkSessionIframe = authWellKnownEndPoints.checkSessionIframe;
    if (checkSessionIframe) {
      existingIframe.contentWindow.location.replace(checkSessionIframe);
    } else {
      this.loggerService.logWarning(configuration, "CheckSession - init check session: checkSessionIframe is not configured to run");
    }
    return new Observable((observer) => {
      existingIframe.onload = () => {
        this.lastIFrameRefresh = Date.now();
        observer.next();
        observer.complete();
      };
    });
  }
  pollServerSession(clientId, configuration) {
    this.outstandingMessages = 0;
    const pollServerSessionRecur = () => {
      this.init(configuration).pipe(take(1)).subscribe(() => {
        const existingIframe = this.getExistingIframe();
        if (existingIframe && clientId) {
          this.loggerService.logDebug(configuration, `CheckSession - clientId : '${clientId}' - existingIframe: '${existingIframe}'`);
          const sessionState = this.storagePersistenceService.read("session_state", configuration);
          const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
          if (sessionState && authWellKnownEndPoints?.checkSessionIframe) {
            const iframeOrigin = new URL(authWellKnownEndPoints.checkSessionIframe)?.origin;
            this.outstandingMessages++;
            existingIframe.contentWindow.postMessage(clientId + " " + sessionState, iframeOrigin);
          } else {
            this.loggerService.logDebug(configuration, `CheckSession - session_state is '${sessionState}' - AuthWellKnownEndPoints is '${JSON.stringify(authWellKnownEndPoints, null, 2)}'`);
            this.checkSessionChangedInternal$.next(true);
          }
        } else {
          this.loggerService.logWarning(configuration, `CheckSession - OidcSecurityCheckSession pollServerSession checkSession IFrame does not exist:
               clientId : '${clientId}' - existingIframe: '${existingIframe}'`);
        }
        if (this.outstandingMessages > 3) {
          this.loggerService.logError(configuration, `CheckSession - OidcSecurityCheckSession not receiving check session response messages.
                            Outstanding messages: '${this.outstandingMessages}'. Server unreachable?`);
        }
        this.zone.runOutsideAngular(() => {
          this.scheduledHeartBeatRunning = setTimeout(() => this.zone.run(pollServerSessionRecur), this.heartBeatInterval);
        });
      });
    };
    pollServerSessionRecur();
  }
  clearScheduledHeartBeat() {
    clearTimeout(this.scheduledHeartBeatRunning);
    this.scheduledHeartBeatRunning = null;
  }
  messageHandler(configuration, e) {
    const existingIFrame = this.getExistingIframe();
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const startsWith = !!authWellKnownEndPoints?.checkSessionIframe?.startsWith(e.origin);
    this.outstandingMessages = 0;
    if (existingIFrame && startsWith && e.source === existingIFrame.contentWindow) {
      if (e.data === "error") {
        this.loggerService.logWarning(configuration, "CheckSession - error from check session messageHandler");
      } else if (e.data === "changed") {
        this.loggerService.logDebug(configuration, `CheckSession - ${e} from check session messageHandler`);
        this.checkSessionReceived = true;
        this.eventService.fireEvent(EventTypes.CheckSessionReceived, e.data);
        this.checkSessionChangedInternal$.next(true);
      } else {
        this.eventService.fireEvent(EventTypes.CheckSessionReceived, e.data);
        this.loggerService.logDebug(configuration, `CheckSession - ${e.data} from check session messageHandler`);
      }
    }
  }
  bindMessageEventToIframe(configuration) {
    const iframeMessageEvent = this.messageHandler.bind(this, configuration);
    this.document.defaultView.addEventListener("message", iframeMessageEvent, false);
  }
  getOrCreateIframe(configuration) {
    const existingIframe = this.getExistingIframe();
    if (!existingIframe) {
      const frame = this.iFrameService.addIFrameToWindowBody(IFRAME_FOR_CHECK_SESSION_IDENTIFIER, configuration);
      this.bindMessageEventToIframe(configuration);
      return frame;
    }
    return existingIframe;
  }
};
CheckSessionService.ɵfac = function CheckSessionService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CheckSessionService)(ɵɵinject(StoragePersistenceService), ɵɵinject(LoggerService), ɵɵinject(IFrameService), ɵɵinject(PublicEventsService), ɵɵinject(NgZone), ɵɵinject(DOCUMENT));
};
CheckSessionService.ɵprov = ɵɵdefineInjectable({
  token: CheckSessionService,
  factory: CheckSessionService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckSessionService, [{
    type: Injectable
  }], function() {
    return [{
      type: StoragePersistenceService
    }, {
      type: LoggerService
    }, {
      type: IFrameService
    }, {
      type: PublicEventsService
    }, {
      type: NgZone
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var CurrentUrlService = class {
  constructor(document) {
    this.document = document;
  }
  getStateParamFromCurrentUrl(url) {
    const currentUrl = url || this.getCurrentUrl();
    const parsedUrl = new URL(currentUrl);
    const urlParams = new URLSearchParams(parsedUrl.search);
    const stateFromUrl = urlParams.get("state");
    return stateFromUrl;
  }
  getCurrentUrl() {
    return this.document.defaultView.location.toString();
  }
};
CurrentUrlService.ɵfac = function CurrentUrlService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CurrentUrlService)(ɵɵinject(DOCUMENT));
};
CurrentUrlService.ɵprov = ɵɵdefineInjectable({
  token: CurrentUrlService,
  factory: CurrentUrlService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CurrentUrlService, [{
    type: Injectable
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var ValidationResult;
(function(ValidationResult2) {
  ValidationResult2["NotSet"] = "NotSet";
  ValidationResult2["StatesDoNotMatch"] = "StatesDoNotMatch";
  ValidationResult2["SignatureFailed"] = "SignatureFailed";
  ValidationResult2["IncorrectNonce"] = "IncorrectNonce";
  ValidationResult2["RequiredPropertyMissing"] = "RequiredPropertyMissing";
  ValidationResult2["MaxOffsetExpired"] = "MaxOffsetExpired";
  ValidationResult2["IssDoesNotMatchIssuer"] = "IssDoesNotMatchIssuer";
  ValidationResult2["NoAuthWellKnownEndPoints"] = "NoAuthWellKnownEndPoints";
  ValidationResult2["IncorrectAud"] = "IncorrectAud";
  ValidationResult2["IncorrectIdTokenClaimsAfterRefresh"] = "IncorrectIdTokenClaimsAfterRefresh";
  ValidationResult2["IncorrectAzp"] = "IncorrectAzp";
  ValidationResult2["TokenExpired"] = "TokenExpired";
  ValidationResult2["IncorrectAtHash"] = "IncorrectAtHash";
  ValidationResult2["Ok"] = "Ok";
  ValidationResult2["LoginRequired"] = "LoginRequired";
  ValidationResult2["SecureTokenServerError"] = "SecureTokenServerError";
})(ValidationResult || (ValidationResult = {}));
var UriEncoder = class {
  encodeKey(key) {
    return encodeURIComponent(key);
  }
  encodeValue(value) {
    return encodeURIComponent(value);
  }
  decodeKey(key) {
    return decodeURIComponent(key);
  }
  decodeValue(value) {
    return decodeURIComponent(value);
  }
};
var RandomService = class {
  constructor(cryptoService, loggerService) {
    this.cryptoService = cryptoService;
    this.loggerService = loggerService;
  }
  createRandom(requiredLength, configuration) {
    if (requiredLength <= 0) {
      return "";
    }
    if (requiredLength > 0 && requiredLength < 7) {
      this.loggerService.logWarning(configuration, `RandomService called with ${requiredLength} but 7 chars is the minimum, returning 10 chars`);
      requiredLength = 10;
    }
    const length = requiredLength - 6;
    const arr = new Uint8Array(Math.floor(length / 2));
    const crypto = this.cryptoService.getCrypto();
    if (crypto) {
      crypto.getRandomValues(arr);
    }
    return Array.from(arr, this.toHex).join("") + this.randomString(7);
  }
  toHex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
  }
  randomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = new Uint32Array(length);
    const crypto = this.cryptoService.getCrypto();
    if (crypto) {
      crypto.getRandomValues(values);
      for (let i = 0; i < length; i++) {
        result += characters[values[i] % characters.length];
      }
    }
    return result;
  }
};
RandomService.ɵfac = function RandomService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RandomService)(ɵɵinject(CryptoService), ɵɵinject(LoggerService));
};
RandomService.ɵprov = ɵɵdefineInjectable({
  token: RandomService,
  factory: RandomService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RandomService, [{
    type: Injectable
  }], function() {
    return [{
      type: CryptoService
    }, {
      type: LoggerService
    }];
  }, null);
})();
var FlowsDataService = class {
  constructor(storagePersistenceService, randomService, loggerService) {
    this.storagePersistenceService = storagePersistenceService;
    this.randomService = randomService;
    this.loggerService = loggerService;
  }
  createNonce(configuration) {
    const nonce = this.randomService.createRandom(40, configuration);
    this.loggerService.logDebug(configuration, "Nonce created. nonce:" + nonce);
    this.setNonce(nonce, configuration);
    return nonce;
  }
  setNonce(nonce, configuration) {
    this.storagePersistenceService.write("authNonce", nonce, configuration);
  }
  getAuthStateControl(configuration) {
    return this.storagePersistenceService.read("authStateControl", configuration);
  }
  setAuthStateControl(authStateControl, configuration) {
    return this.storagePersistenceService.write("authStateControl", authStateControl, configuration);
  }
  getExistingOrCreateAuthStateControl(configuration) {
    let state = this.storagePersistenceService.read("authStateControl", configuration);
    if (!state) {
      state = this.randomService.createRandom(40, configuration);
      this.storagePersistenceService.write("authStateControl", state, configuration);
    }
    return state;
  }
  setSessionState(sessionState, configuration) {
    this.storagePersistenceService.write("session_state", sessionState, configuration);
  }
  resetStorageFlowData(configuration) {
    this.storagePersistenceService.resetStorageFlowData(configuration);
  }
  getCodeVerifier(configuration) {
    return this.storagePersistenceService.read("codeVerifier", configuration);
  }
  createCodeVerifier(configuration) {
    const codeVerifier = this.randomService.createRandom(67, configuration);
    this.storagePersistenceService.write("codeVerifier", codeVerifier, configuration);
    return codeVerifier;
  }
  isCodeFlowInProgress(configuration) {
    const storageObject = this.getCodeFlowInProgressStorageEntry(configuration);
    if (!storageObject) {
      return false;
    }
    return storageObject.state === "in progress";
  }
  setCodeFlowInProgress(configuration) {
    const storageObject = {
      state: "in progress"
    };
    this.storagePersistenceService.write("storageCodeFlowInProgress", JSON.stringify(storageObject), configuration);
  }
  resetCodeFlowInProgress(configuration) {
    this.storagePersistenceService.write("storageCodeFlowInProgress", "", configuration);
  }
  getCodeFlowInProgressStorageEntry(configuration) {
    const storageEntry = this.storagePersistenceService.read("storageCodeFlowInProgress", configuration);
    if (!storageEntry) {
      return null;
    }
    return JSON.parse(storageEntry);
  }
  isSilentRenewRunning(configuration) {
    const {
      configId,
      silentRenewTimeoutInSeconds
    } = configuration;
    const storageObject = this.getSilentRenewRunningStorageEntry(configuration);
    if (!storageObject) {
      return false;
    }
    const timeOutInMilliseconds = silentRenewTimeoutInSeconds * 1e3;
    const dateOfLaunchedProcessUtc = Date.parse(storageObject.dateOfLaunchedProcessUtc);
    const currentDateUtc = Date.parse((/* @__PURE__ */ new Date()).toISOString());
    const elapsedTimeInMilliseconds = Math.abs(currentDateUtc - dateOfLaunchedProcessUtc);
    const isProbablyStuck = elapsedTimeInMilliseconds > timeOutInMilliseconds;
    if (isProbablyStuck) {
      this.loggerService.logDebug(configuration, "silent renew process is probably stuck, state will be reset.", configId);
      this.resetSilentRenewRunning(configuration);
      return false;
    }
    return storageObject.state === "running";
  }
  setSilentRenewRunning(configuration) {
    const storageObject = {
      state: "running",
      dateOfLaunchedProcessUtc: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.storagePersistenceService.write("storageSilentRenewRunning", JSON.stringify(storageObject), configuration);
  }
  resetSilentRenewRunning(configuration) {
    this.storagePersistenceService.write("storageSilentRenewRunning", "", configuration);
  }
  getSilentRenewRunningStorageEntry(configuration) {
    const storageEntry = this.storagePersistenceService.read("storageSilentRenewRunning", configuration);
    if (!storageEntry) {
      return null;
    }
    return JSON.parse(storageEntry);
  }
};
FlowsDataService.ɵfac = function FlowsDataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlowsDataService)(ɵɵinject(StoragePersistenceService), ɵɵinject(RandomService), ɵɵinject(LoggerService));
};
FlowsDataService.ɵprov = ɵɵdefineInjectable({
  token: FlowsDataService,
  factory: FlowsDataService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlowsDataService, [{
    type: Injectable
  }], function() {
    return [{
      type: StoragePersistenceService
    }, {
      type: RandomService
    }, {
      type: LoggerService
    }];
  }, null);
})();
var FlowHelper = class {
  isCurrentFlowCodeFlow(configuration) {
    return this.currentFlowIs("code", configuration);
  }
  isCurrentFlowAnyImplicitFlow(configuration) {
    return this.isCurrentFlowImplicitFlowWithAccessToken(configuration) || this.isCurrentFlowImplicitFlowWithoutAccessToken(configuration);
  }
  isCurrentFlowCodeFlowWithRefreshTokens(configuration) {
    const {
      useRefreshToken
    } = configuration;
    if (this.isCurrentFlowCodeFlow(configuration) && useRefreshToken) {
      return true;
    }
    return false;
  }
  isCurrentFlowImplicitFlowWithAccessToken(configuration) {
    return this.currentFlowIs("id_token token", configuration);
  }
  currentFlowIs(flowTypes, configuration) {
    const {
      responseType
    } = configuration;
    if (Array.isArray(flowTypes)) {
      return flowTypes.some((x) => responseType === x);
    }
    return responseType === flowTypes;
  }
  isCurrentFlowImplicitFlowWithoutAccessToken(configuration) {
    return this.currentFlowIs("id_token", configuration);
  }
};
FlowHelper.ɵfac = function FlowHelper_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlowHelper)();
};
FlowHelper.ɵprov = ɵɵdefineInjectable({
  token: FlowHelper,
  factory: FlowHelper.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlowHelper, [{
    type: Injectable
  }], null, null);
})();
var CALLBACK_PARAMS_TO_CHECK = ["code", "state", "token", "id_token"];
var AUTH0_ENDPOINT = "auth0.com";
var UrlService = class {
  constructor(loggerService, flowsDataService, flowHelper, storagePersistenceService, jwtWindowCryptoService) {
    this.loggerService = loggerService;
    this.flowsDataService = flowsDataService;
    this.flowHelper = flowHelper;
    this.storagePersistenceService = storagePersistenceService;
    this.jwtWindowCryptoService = jwtWindowCryptoService;
  }
  getUrlParameter(urlToCheck, name) {
    if (!urlToCheck) {
      return "";
    }
    if (!name) {
      return "";
    }
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&#]" + name + "=([^&#]*)");
    const results = regex.exec(urlToCheck);
    return results === null ? "" : decodeURIComponent(results[1]);
  }
  isCallbackFromSts(currentUrl) {
    return CALLBACK_PARAMS_TO_CHECK.some((x) => !!this.getUrlParameter(currentUrl, x));
  }
  getRefreshSessionSilentRenewUrl(config, customParams) {
    if (this.flowHelper.isCurrentFlowCodeFlow(config)) {
      return this.createUrlCodeFlowWithSilentRenew(config, customParams);
    }
    return of(this.createUrlImplicitFlowWithSilentRenew(config, customParams) || "");
  }
  getAuthorizeParUrl(requestUri, configuration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!authWellKnownEndPoints) {
      this.loggerService.logError(configuration, "authWellKnownEndpoints is undefined");
      return null;
    }
    const authorizationEndpoint = authWellKnownEndPoints.authorizationEndpoint;
    if (!authorizationEndpoint) {
      this.loggerService.logError(configuration, `Can not create an authorize URL when authorizationEndpoint is '${authorizationEndpoint}'`);
      return null;
    }
    const {
      clientId
    } = configuration;
    if (!clientId) {
      this.loggerService.logError(configuration, `getAuthorizeParUrl could not add clientId because it was: `, clientId);
      return null;
    }
    const urlParts = authorizationEndpoint.split("?");
    const authorizationUrl = urlParts[0];
    const existingParams = urlParts[1];
    let params = this.createHttpParams(existingParams);
    params = params.set("request_uri", requestUri);
    params = params.append("client_id", clientId);
    return `${authorizationUrl}?${params}`;
  }
  getAuthorizeUrl(config, authOptions) {
    if (this.flowHelper.isCurrentFlowCodeFlow(config)) {
      return this.createUrlCodeFlowAuthorize(config, authOptions);
    }
    return of(this.createUrlImplicitFlowAuthorize(config, authOptions) || "");
  }
  getEndSessionEndpoint(configuration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const endSessionEndpoint = authWellKnownEndPoints?.endSessionEndpoint;
    if (!endSessionEndpoint) {
      return {
        url: "",
        existingParams: ""
      };
    }
    const urlParts = endSessionEndpoint.split("?");
    const url = urlParts[0];
    const existingParams = urlParts[1] ?? "";
    return {
      url,
      existingParams
    };
  }
  getEndSessionUrl(configuration, customParams) {
    const idToken = this.storagePersistenceService.getIdToken(configuration);
    const {
      customParamsEndSessionRequest
    } = configuration;
    const mergedParams = __spreadValues(__spreadValues({}, customParamsEndSessionRequest), customParams);
    return this.createEndSessionUrl(idToken, configuration, mergedParams);
  }
  createRevocationEndpointBodyAccessToken(token, configuration) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("client_id", clientId);
    params = params.set("token", token);
    params = params.set("token_type_hint", "access_token");
    return params.toString();
  }
  createRevocationEndpointBodyRefreshToken(token, configuration) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("client_id", clientId);
    params = params.set("token", token);
    params = params.set("token_type_hint", "refresh_token");
    return params.toString();
  }
  getRevocationEndpointUrl(configuration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const revocationEndpoint = authWellKnownEndPoints?.revocationEndpoint;
    if (!revocationEndpoint) {
      return null;
    }
    const urlParts = revocationEndpoint.split("?");
    const revocationEndpointUrl = urlParts[0];
    return revocationEndpointUrl;
  }
  createBodyForCodeFlowCodeRequest(code, configuration, customTokenParams) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("grant_type", "authorization_code");
    params = params.set("client_id", clientId);
    if (!configuration.disablePkce) {
      const codeVerifier = this.flowsDataService.getCodeVerifier(configuration);
      if (!codeVerifier) {
        this.loggerService.logError(configuration, `CodeVerifier is not set `, codeVerifier);
        return null;
      }
      params = params.set("code_verifier", codeVerifier);
    }
    params = params.set("code", code);
    if (customTokenParams) {
      params = this.appendCustomParams(__spreadValues({}, customTokenParams), params);
    }
    const silentRenewUrl = this.getSilentRenewUrl(configuration);
    if (this.flowsDataService.isSilentRenewRunning(configuration) && silentRenewUrl) {
      params = params.set("redirect_uri", silentRenewUrl);
      return params.toString();
    }
    const redirectUrl = this.getRedirectUrl(configuration);
    if (!redirectUrl) {
      return null;
    }
    params = params.set("redirect_uri", redirectUrl);
    return params.toString();
  }
  createBodyForCodeFlowRefreshTokensRequest(refreshToken, configuration, customParamsRefresh) {
    const clientId = this.getClientId(configuration);
    if (!clientId) {
      return null;
    }
    let params = this.createHttpParams();
    params = params.set("grant_type", "refresh_token");
    params = params.set("client_id", clientId);
    params = params.set("refresh_token", refreshToken);
    if (customParamsRefresh) {
      params = this.appendCustomParams(__spreadValues({}, customParamsRefresh), params);
    }
    return params.toString();
  }
  createBodyForParCodeFlowRequest(configuration, customParamsRequest) {
    const redirectUrl = this.getRedirectUrl(configuration);
    if (!redirectUrl) {
      return of(null);
    }
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    this.loggerService.logDebug(configuration, "Authorize created. adding myautostate: " + state);
    const codeVerifier = this.flowsDataService.createCodeVerifier(configuration);
    return this.jwtWindowCryptoService.generateCodeChallenge(codeVerifier).pipe(map((codeChallenge) => {
      const {
        clientId,
        responseType,
        scope,
        hdParam,
        customParamsAuthRequest
      } = configuration;
      let params = this.createHttpParams("");
      params = params.set("client_id", clientId);
      params = params.append("redirect_uri", redirectUrl);
      params = params.append("response_type", responseType);
      params = params.append("scope", scope);
      params = params.append("nonce", nonce);
      params = params.append("state", state);
      params = params.append("code_challenge", codeChallenge);
      params = params.append("code_challenge_method", "S256");
      if (hdParam) {
        params = params.append("hd", hdParam);
      }
      if (customParamsAuthRequest) {
        params = this.appendCustomParams(__spreadValues({}, customParamsAuthRequest), params);
      }
      if (customParamsRequest) {
        params = this.appendCustomParams(__spreadValues({}, customParamsRequest), params);
      }
      return params.toString();
    }));
  }
  getPostLogoutRedirectUrl(configuration) {
    const {
      postLogoutRedirectUri
    } = configuration;
    if (!postLogoutRedirectUri) {
      this.loggerService.logError(configuration, `could not get postLogoutRedirectUri, was: `, postLogoutRedirectUri);
      return null;
    }
    return postLogoutRedirectUri;
  }
  createEndSessionUrl(idTokenHint, configuration, customParamsEndSession) {
    if (this.isAuth0Endpoint(configuration)) {
      return this.composeAuth0Endpoint(configuration);
    }
    const {
      url,
      existingParams
    } = this.getEndSessionEndpoint(configuration);
    if (!url) {
      return null;
    }
    let params = this.createHttpParams(existingParams);
    if (!!idTokenHint) {
      params = params.set("id_token_hint", idTokenHint);
    }
    const postLogoutRedirectUri = this.getPostLogoutRedirectUrl(configuration);
    if (postLogoutRedirectUri) {
      params = params.append("post_logout_redirect_uri", postLogoutRedirectUri);
    }
    if (customParamsEndSession) {
      params = this.appendCustomParams(__spreadValues({}, customParamsEndSession), params);
    }
    return `${url}?${params}`;
  }
  createAuthorizeUrl(codeChallenge, redirectUrl, nonce, state, configuration, prompt, customRequestParams) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    const authorizationEndpoint = authWellKnownEndPoints?.authorizationEndpoint;
    if (!authorizationEndpoint) {
      this.loggerService.logError(configuration, `Can not create an authorize URL when authorizationEndpoint is '${authorizationEndpoint}'`);
      return null;
    }
    const {
      clientId,
      responseType,
      scope,
      hdParam,
      customParamsAuthRequest
    } = configuration;
    if (!clientId) {
      this.loggerService.logError(configuration, `createAuthorizeUrl could not add clientId because it was: `, clientId);
      return null;
    }
    if (!responseType) {
      this.loggerService.logError(configuration, `createAuthorizeUrl could not add responseType because it was: `, responseType);
      return null;
    }
    if (!scope) {
      this.loggerService.logError(configuration, `createAuthorizeUrl could not add scope because it was: `, scope);
      return null;
    }
    const urlParts = authorizationEndpoint.split("?");
    const authorizationUrl = urlParts[0];
    const existingParams = urlParts[1];
    let params = this.createHttpParams(existingParams);
    params = params.set("client_id", clientId);
    params = params.append("redirect_uri", redirectUrl);
    params = params.append("response_type", responseType);
    params = params.append("scope", scope);
    params = params.append("nonce", nonce);
    params = params.append("state", state);
    if (this.flowHelper.isCurrentFlowCodeFlow(configuration) && codeChallenge !== null) {
      params = params.append("code_challenge", codeChallenge);
      params = params.append("code_challenge_method", "S256");
    }
    const mergedParams = __spreadValues(__spreadValues({}, customParamsAuthRequest), customRequestParams);
    if (Object.keys(mergedParams).length > 0) {
      params = this.appendCustomParams(__spreadValues({}, mergedParams), params);
    }
    if (prompt) {
      params = this.overWriteParam(params, "prompt", prompt);
    }
    if (hdParam) {
      params = params.append("hd", hdParam);
    }
    return `${authorizationUrl}?${params}`;
  }
  createUrlImplicitFlowWithSilentRenew(configuration, customParams) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    const silentRenewUrl = this.getSilentRenewUrl(configuration);
    if (!silentRenewUrl) {
      return null;
    }
    this.loggerService.logDebug(configuration, "RefreshSession created. adding myautostate: ", state);
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (authWellKnownEndPoints) {
      return this.createAuthorizeUrl("", silentRenewUrl, nonce, state, configuration, "none", customParams);
    }
    this.loggerService.logError(configuration, "authWellKnownEndpoints is undefined");
    return null;
  }
  createUrlCodeFlowWithSilentRenew(configuration, customParams) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    this.loggerService.logDebug(configuration, "RefreshSession created. adding myautostate: " + state);
    const codeVerifier = this.flowsDataService.createCodeVerifier(configuration);
    return this.jwtWindowCryptoService.generateCodeChallenge(codeVerifier).pipe(map((codeChallenge) => {
      const silentRenewUrl = this.getSilentRenewUrl(configuration);
      if (!silentRenewUrl) {
        return "";
      }
      const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
      if (authWellKnownEndPoints) {
        return this.createAuthorizeUrl(codeChallenge, silentRenewUrl, nonce, state, configuration, "none", customParams);
      }
      this.loggerService.logWarning(configuration, "authWellKnownEndpoints is undefined");
      return null;
    }));
  }
  createUrlImplicitFlowAuthorize(configuration, authOptions) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(configuration);
    const nonce = this.flowsDataService.createNonce(configuration);
    this.loggerService.logDebug(configuration, "Authorize created. adding myautostate: " + state);
    const redirectUrl = this.getRedirectUrl(configuration, authOptions);
    if (!redirectUrl) {
      return null;
    }
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (authWellKnownEndPoints) {
      const {
        customParams
      } = authOptions || {};
      return this.createAuthorizeUrl("", redirectUrl, nonce, state, configuration, null, customParams);
    }
    this.loggerService.logError(configuration, "authWellKnownEndpoints is undefined");
    return null;
  }
  createUrlCodeFlowAuthorize(config, authOptions) {
    const state = this.flowsDataService.getExistingOrCreateAuthStateControl(config);
    const nonce = this.flowsDataService.createNonce(config);
    this.loggerService.logDebug(config, "Authorize created. adding myautostate: " + state);
    const redirectUrl = this.getRedirectUrl(config, authOptions);
    if (!redirectUrl) {
      return of(null);
    }
    return this.getCodeChallenge(config).pipe(map((codeChallenge) => {
      const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
      if (authWellKnownEndPoints) {
        const {
          customParams
        } = authOptions || {};
        return this.createAuthorizeUrl(codeChallenge, redirectUrl, nonce, state, config, null, customParams);
      }
      this.loggerService.logError(config, "authWellKnownEndpoints is undefined");
      return "";
    }));
  }
  getCodeChallenge(config) {
    if (config.disablePkce) {
      return of(null);
    }
    const codeVerifier = this.flowsDataService.createCodeVerifier(config);
    return this.jwtWindowCryptoService.generateCodeChallenge(codeVerifier);
  }
  getRedirectUrl(configuration, authOptions) {
    let {
      redirectUrl
    } = configuration;
    if (authOptions?.redirectUrl) {
      redirectUrl = authOptions.redirectUrl;
    }
    if (!redirectUrl) {
      this.loggerService.logError(configuration, `could not get redirectUrl, was: `, redirectUrl);
      return null;
    }
    return redirectUrl;
  }
  getSilentRenewUrl(configuration) {
    const {
      silentRenewUrl
    } = configuration;
    if (!silentRenewUrl) {
      this.loggerService.logError(configuration, `could not get silentRenewUrl, was: `, silentRenewUrl);
      return null;
    }
    return silentRenewUrl;
  }
  getClientId(configuration) {
    const {
      clientId
    } = configuration;
    if (!clientId) {
      this.loggerService.logError(configuration, `could not get clientId, was: `, clientId);
      return null;
    }
    return clientId;
  }
  appendCustomParams(customParams, params) {
    for (const [key, value] of Object.entries(__spreadValues({}, customParams))) {
      params = params.append(key, value.toString());
    }
    return params;
  }
  overWriteParam(params, key, value) {
    return params.set(key, value);
  }
  createHttpParams(existingParams) {
    existingParams = existingParams ?? "";
    const params = new HttpParams({
      fromString: existingParams,
      encoder: new UriEncoder()
    });
    return params;
  }
  isAuth0Endpoint(configuration) {
    const {
      authority
    } = configuration;
    if (!authority) {
      return false;
    }
    return authority.endsWith(AUTH0_ENDPOINT);
  }
  composeAuth0Endpoint(configuration) {
    const {
      authority,
      clientId
    } = configuration;
    const postLogoutRedirectUrl = this.getPostLogoutRedirectUrl(configuration);
    return `${authority}/v2/logout?client_id=${clientId}&returnTo=${postLogoutRedirectUrl}`;
  }
};
UrlService.ɵfac = function UrlService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UrlService)(ɵɵinject(LoggerService), ɵɵinject(FlowsDataService), ɵɵinject(FlowHelper), ɵɵinject(StoragePersistenceService), ɵɵinject(JwtWindowCryptoService));
};
UrlService.ɵprov = ɵɵdefineInjectable({
  token: UrlService,
  factory: UrlService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: FlowsDataService
    }, {
      type: FlowHelper
    }, {
      type: StoragePersistenceService
    }, {
      type: JwtWindowCryptoService
    }];
  }, null);
})();
var CodeFlowCallbackHandlerService = class {
  constructor(urlService, loggerService, tokenValidationService, flowsDataService, storagePersistenceService, dataService) {
    this.urlService = urlService;
    this.loggerService = loggerService;
    this.tokenValidationService = tokenValidationService;
    this.flowsDataService = flowsDataService;
    this.storagePersistenceService = storagePersistenceService;
    this.dataService = dataService;
  }
  // STEP 1 Code Flow
  codeFlowCallback(urlToCheck, config) {
    const code = this.urlService.getUrlParameter(urlToCheck, "code");
    const state = this.urlService.getUrlParameter(urlToCheck, "state");
    const sessionState = this.urlService.getUrlParameter(urlToCheck, "session_state");
    if (!state) {
      this.loggerService.logDebug(config, "no state in url");
      return throwError(() => new Error("no state in url"));
    }
    if (!code) {
      this.loggerService.logDebug(config, "no code in url");
      return throwError(() => new Error("no code in url"));
    }
    this.loggerService.logDebug(config, "running validation for callback", urlToCheck);
    const initialCallbackContext = {
      code,
      refreshToken: null,
      state,
      sessionState,
      authResult: null,
      isRenewProcess: false,
      jwtKeys: null,
      validationResult: null,
      existingIdToken: null
    };
    return of(initialCallbackContext);
  }
  // STEP 2 Code Flow //  Code Flow Silent Renew starts here
  codeFlowCodeRequest(callbackContext, config) {
    const authStateControl = this.flowsDataService.getAuthStateControl(config);
    const isStateCorrect = this.tokenValidationService.validateStateFromHashCallback(callbackContext.state, authStateControl, config);
    if (!isStateCorrect) {
      return throwError(() => new Error("codeFlowCodeRequest incorrect state"));
    }
    const authWellknownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
    const tokenEndpoint = authWellknownEndpoints?.tokenEndpoint;
    if (!tokenEndpoint) {
      return throwError(() => new Error("Token Endpoint not defined"));
    }
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const bodyForCodeFlow = this.urlService.createBodyForCodeFlowCodeRequest(callbackContext.code, config, config?.customParamsCodeRequest);
    return this.dataService.post(tokenEndpoint, bodyForCodeFlow, config, headers).pipe(switchMap((response) => {
      let authResult = __spreadProps(__spreadValues({}, response), {
        state: callbackContext.state,
        session_state: callbackContext.sessionState
      });
      callbackContext.authResult = authResult;
      return of(callbackContext);
    }), retryWhen((error) => this.handleRefreshRetry(error, config)), catchError((error) => {
      const {
        authority
      } = config;
      const errorMessage = `OidcService code request ${authority}`;
      this.loggerService.logError(config, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    }));
  }
  handleRefreshRetry(errors, config) {
    return errors.pipe(mergeMap((error) => {
      if (error && error instanceof HttpErrorResponse && error.error instanceof ProgressEvent && error.error.type === "error") {
        const {
          authority,
          refreshTokenRetryInSeconds
        } = config;
        const errorMessage = `OidcService code request ${authority} - no internet connection`;
        this.loggerService.logWarning(config, errorMessage, error);
        return timer(refreshTokenRetryInSeconds * 1e3);
      }
      return throwError(() => error);
    }));
  }
};
CodeFlowCallbackHandlerService.ɵfac = function CodeFlowCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CodeFlowCallbackHandlerService)(ɵɵinject(UrlService), ɵɵinject(LoggerService), ɵɵinject(TokenValidationService), ɵɵinject(FlowsDataService), ɵɵinject(StoragePersistenceService), ɵɵinject(DataService));
};
CodeFlowCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: CodeFlowCallbackHandlerService,
  factory: CodeFlowCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeFlowCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: UrlService
    }, {
      type: LoggerService
    }, {
      type: TokenValidationService
    }, {
      type: FlowsDataService
    }, {
      type: StoragePersistenceService
    }, {
      type: DataService
    }];
  }, null);
})();
var DEFAULT_USERRESULT = {
  userData: null,
  allUserData: []
};
var UserService = class {
  constructor(oidcDataService, storagePersistenceService, eventService, loggerService, tokenHelperService, flowHelper) {
    this.oidcDataService = oidcDataService;
    this.storagePersistenceService = storagePersistenceService;
    this.eventService = eventService;
    this.loggerService = loggerService;
    this.tokenHelperService = tokenHelperService;
    this.flowHelper = flowHelper;
    this.userDataInternal$ = new BehaviorSubject(DEFAULT_USERRESULT);
  }
  get userData$() {
    return this.userDataInternal$.asObservable();
  }
  getAndPersistUserDataInStore(currentConfiguration, allConfigs, isRenewProcess = false, idToken, decodedIdToken) {
    idToken = idToken || this.storagePersistenceService.getIdToken(currentConfiguration);
    decodedIdToken = decodedIdToken || this.tokenHelperService.getPayloadFromToken(idToken, false, currentConfiguration);
    const existingUserDataFromStorage = this.getUserDataFromStore(currentConfiguration);
    const haveUserData = !!existingUserDataFromStorage;
    const isCurrentFlowImplicitFlowWithAccessToken = this.flowHelper.isCurrentFlowImplicitFlowWithAccessToken(currentConfiguration);
    const isCurrentFlowCodeFlow = this.flowHelper.isCurrentFlowCodeFlow(currentConfiguration);
    const accessToken = this.storagePersistenceService.getAccessToken(currentConfiguration);
    if (!(isCurrentFlowImplicitFlowWithAccessToken || isCurrentFlowCodeFlow)) {
      this.loggerService.logDebug(currentConfiguration, `authCallback idToken flow with accessToken ${accessToken}`);
      this.setUserDataToStore(decodedIdToken, currentConfiguration, allConfigs);
      return of(decodedIdToken);
    }
    const {
      renewUserInfoAfterTokenRenew
    } = currentConfiguration;
    if (!isRenewProcess || renewUserInfoAfterTokenRenew || !haveUserData) {
      return this.getUserDataOidcFlowAndSave(decodedIdToken.sub, currentConfiguration, allConfigs).pipe(switchMap((userData) => {
        this.loggerService.logDebug(currentConfiguration, "Received user data: ", userData);
        if (!!userData) {
          this.loggerService.logDebug(currentConfiguration, "accessToken: ", accessToken);
          return of(userData);
        } else {
          return throwError(() => new Error("Received no user data, request failed"));
        }
      }));
    }
    return of(existingUserDataFromStorage);
  }
  getUserDataFromStore(currentConfiguration) {
    return this.storagePersistenceService.read("userData", currentConfiguration) || null;
  }
  publishUserDataIfExists(currentConfiguration, allConfigs) {
    const userData = this.getUserDataFromStore(currentConfiguration);
    if (userData) {
      this.fireUserDataEvent(currentConfiguration, allConfigs, userData);
    }
  }
  setUserDataToStore(userData, currentConfiguration, allConfigs) {
    this.storagePersistenceService.write("userData", userData, currentConfiguration);
    this.fireUserDataEvent(currentConfiguration, allConfigs, userData);
  }
  resetUserDataInStore(currentConfiguration, allConfigs) {
    this.storagePersistenceService.remove("userData", currentConfiguration);
    this.fireUserDataEvent(currentConfiguration, allConfigs, null);
  }
  getUserDataOidcFlowAndSave(idTokenSub, currentConfiguration, allConfigs) {
    return this.getIdentityUserData(currentConfiguration).pipe(map((data) => {
      if (this.validateUserDataSubIdToken(currentConfiguration, idTokenSub, data?.sub)) {
        this.setUserDataToStore(data, currentConfiguration, allConfigs);
        return data;
      } else {
        this.loggerService.logWarning(currentConfiguration, `User data sub does not match sub in id_token, resetting`);
        this.resetUserDataInStore(currentConfiguration, allConfigs);
        return null;
      }
    }));
  }
  getIdentityUserData(currentConfiguration) {
    const token = this.storagePersistenceService.getAccessToken(currentConfiguration);
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", currentConfiguration);
    if (!authWellKnownEndPoints) {
      this.loggerService.logWarning(currentConfiguration, "init check session: authWellKnownEndpoints is undefined");
      return throwError(() => new Error("authWellKnownEndpoints is undefined"));
    }
    const userInfoEndpoint = authWellKnownEndPoints.userInfoEndpoint;
    if (!userInfoEndpoint) {
      this.loggerService.logError(currentConfiguration, "init check session: authWellKnownEndpoints.userinfo_endpoint is undefined; set auto_userinfo = false in config");
      return throwError(() => new Error("authWellKnownEndpoints.userinfo_endpoint is undefined"));
    }
    return this.oidcDataService.get(userInfoEndpoint, currentConfiguration, token).pipe(retry(2));
  }
  validateUserDataSubIdToken(currentConfiguration, idTokenSub, userDataSub) {
    if (!idTokenSub) {
      return false;
    }
    if (!userDataSub) {
      return false;
    }
    if (idTokenSub !== userDataSub) {
      this.loggerService.logDebug(currentConfiguration, "validateUserDataSubIdToken failed", idTokenSub, userDataSub);
      return false;
    }
    return true;
  }
  fireUserDataEvent(currentConfiguration, allConfigs, passedUserData) {
    const userData = this.composeSingleOrMultipleUserDataObject(currentConfiguration, allConfigs, passedUserData);
    this.userDataInternal$.next(userData);
    const {
      configId
    } = currentConfiguration;
    this.eventService.fireEvent(EventTypes.UserDataChanged, {
      configId,
      userData: passedUserData
    });
  }
  composeSingleOrMultipleUserDataObject(currentConfiguration, allConfigs, passedUserData) {
    const hasManyConfigs = allConfigs.length > 1;
    if (!hasManyConfigs) {
      const {
        configId
      } = currentConfiguration;
      return this.composeSingleUserDataResult(configId, passedUserData);
    }
    const allUserData = allConfigs.map((config) => {
      const {
        configId
      } = currentConfiguration;
      if (this.currentConfigIsToUpdate(configId, config)) {
        return {
          configId: config.configId,
          userData: passedUserData
        };
      }
      const alreadySavedUserData = this.storagePersistenceService.read("userData", config) || null;
      return {
        configId: config.configId,
        userData: alreadySavedUserData
      };
    });
    return {
      userData: null,
      allUserData
    };
  }
  composeSingleUserDataResult(configId, userData) {
    return {
      userData,
      allUserData: [{
        configId,
        userData
      }]
    };
  }
  currentConfigIsToUpdate(configId, config) {
    return config.configId === configId;
  }
};
UserService.ɵfac = function UserService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UserService)(ɵɵinject(DataService), ɵɵinject(StoragePersistenceService), ɵɵinject(PublicEventsService), ɵɵinject(LoggerService), ɵɵinject(TokenHelperService), ɵɵinject(FlowHelper));
};
UserService.ɵprov = ɵɵdefineInjectable({
  token: UserService,
  factory: UserService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable
  }], function() {
    return [{
      type: DataService
    }, {
      type: StoragePersistenceService
    }, {
      type: PublicEventsService
    }, {
      type: LoggerService
    }, {
      type: TokenHelperService
    }, {
      type: FlowHelper
    }];
  }, null);
})();
var ResetAuthDataService = class {
  constructor(authStateService, flowsDataService, userService, loggerService) {
    this.authStateService = authStateService;
    this.flowsDataService = flowsDataService;
    this.userService = userService;
    this.loggerService = loggerService;
  }
  resetAuthorizationData(currentConfiguration, allConfigs) {
    this.userService.resetUserDataInStore(currentConfiguration, allConfigs);
    this.flowsDataService.resetStorageFlowData(currentConfiguration);
    this.authStateService.setUnauthenticatedAndFireEvent(currentConfiguration, allConfigs);
    this.loggerService.logDebug(currentConfiguration, "Local Login information cleaned up and event fired");
  }
};
ResetAuthDataService.ɵfac = function ResetAuthDataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ResetAuthDataService)(ɵɵinject(AuthStateService), ɵɵinject(FlowsDataService), ɵɵinject(UserService), ɵɵinject(LoggerService));
};
ResetAuthDataService.ɵprov = ɵɵdefineInjectable({
  token: ResetAuthDataService,
  factory: ResetAuthDataService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResetAuthDataService, [{
    type: Injectable
  }], function() {
    return [{
      type: AuthStateService
    }, {
      type: FlowsDataService
    }, {
      type: UserService
    }, {
      type: LoggerService
    }];
  }, null);
})();
var ImplicitFlowCallbackHandlerService = class {
  constructor(resetAuthDataService, loggerService, flowsDataService, document) {
    this.resetAuthDataService = resetAuthDataService;
    this.loggerService = loggerService;
    this.flowsDataService = flowsDataService;
    this.document = document;
  }
  // STEP 1 Code Flow
  // STEP 1 Implicit Flow
  implicitFlowCallback(config, allConfigs, hash) {
    const isRenewProcessData = this.flowsDataService.isSilentRenewRunning(config);
    this.loggerService.logDebug(config, "BEGIN callback, no auth data");
    if (!isRenewProcessData) {
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
    }
    hash = hash || this.document.location.hash.substring(1);
    const authResult = hash.split("&").reduce((resultData, item) => {
      const parts = item.split("=");
      resultData[parts.shift()] = parts.join("=");
      return resultData;
    }, {});
    const callbackContext = {
      code: null,
      refreshToken: null,
      state: null,
      sessionState: null,
      authResult,
      isRenewProcess: isRenewProcessData,
      jwtKeys: null,
      validationResult: null,
      existingIdToken: null
    };
    return of(callbackContext);
  }
};
ImplicitFlowCallbackHandlerService.ɵfac = function ImplicitFlowCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ImplicitFlowCallbackHandlerService)(ɵɵinject(ResetAuthDataService), ɵɵinject(LoggerService), ɵɵinject(FlowsDataService), ɵɵinject(DOCUMENT));
};
ImplicitFlowCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: ImplicitFlowCallbackHandlerService,
  factory: ImplicitFlowCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImplicitFlowCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: ResetAuthDataService
    }, {
      type: LoggerService
    }, {
      type: FlowsDataService
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var SigninKeyDataService = class {
  constructor(storagePersistenceService, loggerService, dataService) {
    this.storagePersistenceService = storagePersistenceService;
    this.loggerService = loggerService;
    this.dataService = dataService;
  }
  getSigningKeys(currentConfiguration) {
    const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", currentConfiguration);
    const jwksUri = authWellKnownEndPoints?.jwksUri;
    if (!jwksUri) {
      const error = `getSigningKeys: authWellKnownEndpoints.jwksUri is: '${jwksUri}'`;
      this.loggerService.logWarning(currentConfiguration, error);
      return throwError(() => new Error(error));
    }
    this.loggerService.logDebug(currentConfiguration, "Getting signinkeys from ", jwksUri);
    return this.dataService.get(jwksUri, currentConfiguration).pipe(retry(2), catchError((e) => this.handleErrorGetSigningKeys(e, currentConfiguration)));
  }
  handleErrorGetSigningKeys(errorResponse, currentConfiguration) {
    let errMsg = "";
    if (errorResponse instanceof HttpResponse) {
      const body = errorResponse.body || {};
      const err = JSON.stringify(body);
      const {
        status,
        statusText
      } = errorResponse;
      errMsg = `${status || ""} - ${statusText || ""} ${err || ""}`;
    } else {
      const {
        message
      } = errorResponse;
      errMsg = !!message ? message : `${errorResponse}`;
    }
    this.loggerService.logError(currentConfiguration, errMsg);
    return throwError(() => new Error(errMsg));
  }
};
SigninKeyDataService.ɵfac = function SigninKeyDataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SigninKeyDataService)(ɵɵinject(StoragePersistenceService), ɵɵinject(LoggerService), ɵɵinject(DataService));
};
SigninKeyDataService.ɵprov = ɵɵdefineInjectable({
  token: SigninKeyDataService,
  factory: SigninKeyDataService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SigninKeyDataService, [{
    type: Injectable
  }], function() {
    return [{
      type: StoragePersistenceService
    }, {
      type: LoggerService
    }, {
      type: DataService
    }];
  }, null);
})();
var JWT_KEYS = "jwtKeys";
var HistoryJwtKeysCallbackHandlerService = class {
  constructor(loggerService, authStateService, flowsDataService, signInKeyDataService, storagePersistenceService, resetAuthDataService, document) {
    this.loggerService = loggerService;
    this.authStateService = authStateService;
    this.flowsDataService = flowsDataService;
    this.signInKeyDataService = signInKeyDataService;
    this.storagePersistenceService = storagePersistenceService;
    this.resetAuthDataService = resetAuthDataService;
    this.document = document;
  }
  // STEP 3 Code Flow, STEP 2 Implicit Flow, STEP 3 Refresh Token
  callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs) {
    if (!this.responseHasIdToken(callbackContext)) {
      const existingIdToken = this.storagePersistenceService.getIdToken(config);
      callbackContext.authResult = __spreadProps(__spreadValues({}, callbackContext.authResult), {
        id_token: existingIdToken
      });
    }
    this.storagePersistenceService.write("authnResult", callbackContext.authResult, config);
    if (config.allowUnsafeReuseRefreshToken && callbackContext.authResult.refresh_token) {
      this.storagePersistenceService.write("reusable_refresh_token", callbackContext.authResult.refresh_token, config);
    }
    if (this.historyCleanUpTurnedOn(config) && !callbackContext.isRenewProcess) {
      this.resetBrowserHistory();
    } else {
      this.loggerService.logDebug(config, "history clean up inactive");
    }
    if (callbackContext.authResult.error) {
      const errorMessage = `AuthCallback AuthResult came with error: ${callbackContext.authResult.error}`;
      this.loggerService.logDebug(config, errorMessage);
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      this.flowsDataService.setNonce("", config);
      this.handleResultErrorFromCallback(callbackContext.authResult, callbackContext.isRenewProcess);
      return throwError(() => new Error(errorMessage));
    }
    this.loggerService.logDebug(config, `AuthResult '${JSON.stringify(callbackContext.authResult, null, 2)}'.
      AuthCallback created, begin token validation`);
    return this.signInKeyDataService.getSigningKeys(config).pipe(tap((jwtKeys) => this.storeSigningKeys(jwtKeys, config)), catchError((err) => {
      const storedJwtKeys = this.readSigningKeys(config);
      if (!!storedJwtKeys) {
        this.loggerService.logWarning(config, `Failed to retrieve signing keys, fallback to stored keys`);
        return of(storedJwtKeys);
      }
      return throwError(() => new Error(err));
    }), switchMap((jwtKeys) => {
      if (jwtKeys) {
        callbackContext.jwtKeys = jwtKeys;
        return of(callbackContext);
      }
      const errorMessage = `Failed to retrieve signing key`;
      this.loggerService.logWarning(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }), catchError((err) => {
      const errorMessage = `Failed to retrieve signing key with error: ${err}`;
      this.loggerService.logWarning(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }));
  }
  responseHasIdToken(callbackContext) {
    return !!callbackContext?.authResult?.id_token;
  }
  handleResultErrorFromCallback(result, isRenewProcess) {
    let validationResult = ValidationResult.SecureTokenServerError;
    if (result.error === "login_required") {
      validationResult = ValidationResult.LoginRequired;
    }
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: false,
      validationResult,
      isRenewProcess
    });
  }
  historyCleanUpTurnedOn(config) {
    const {
      historyCleanupOff
    } = config;
    return !historyCleanupOff;
  }
  resetBrowserHistory() {
    this.document.defaultView.history.replaceState({}, this.document.title, this.document.defaultView.location.origin + this.document.defaultView.location.pathname);
  }
  storeSigningKeys(jwtKeys, config) {
    this.storagePersistenceService.write(JWT_KEYS, jwtKeys, config);
  }
  readSigningKeys(config) {
    return this.storagePersistenceService.read(JWT_KEYS, config);
  }
};
HistoryJwtKeysCallbackHandlerService.ɵfac = function HistoryJwtKeysCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || HistoryJwtKeysCallbackHandlerService)(ɵɵinject(LoggerService), ɵɵinject(AuthStateService), ɵɵinject(FlowsDataService), ɵɵinject(SigninKeyDataService), ɵɵinject(StoragePersistenceService), ɵɵinject(ResetAuthDataService), ɵɵinject(DOCUMENT));
};
HistoryJwtKeysCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: HistoryJwtKeysCallbackHandlerService,
  factory: HistoryJwtKeysCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryJwtKeysCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: AuthStateService
    }, {
      type: FlowsDataService
    }, {
      type: SigninKeyDataService
    }, {
      type: StoragePersistenceService
    }, {
      type: ResetAuthDataService
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var UserCallbackHandlerService = class {
  constructor(loggerService, authStateService, flowsDataService, userService, resetAuthDataService) {
    this.loggerService = loggerService;
    this.authStateService = authStateService;
    this.flowsDataService = flowsDataService;
    this.userService = userService;
    this.resetAuthDataService = resetAuthDataService;
  }
  // STEP 5 userData
  callbackUser(callbackContext, configuration, allConfigs) {
    const {
      isRenewProcess,
      validationResult,
      authResult,
      refreshToken
    } = callbackContext;
    const {
      autoUserInfo,
      renewUserInfoAfterTokenRenew
    } = configuration;
    if (!autoUserInfo) {
      if (!isRenewProcess || renewUserInfoAfterTokenRenew) {
        if (validationResult.decodedIdToken) {
          this.userService.setUserDataToStore(validationResult.decodedIdToken, configuration, allConfigs);
        }
      }
      if (!isRenewProcess && !refreshToken) {
        this.flowsDataService.setSessionState(authResult.session_state, configuration);
      }
      this.publishAuthState(validationResult, isRenewProcess);
      return of(callbackContext);
    }
    return this.userService.getAndPersistUserDataInStore(configuration, allConfigs, isRenewProcess, validationResult.idToken, validationResult.decodedIdToken).pipe(switchMap((userData) => {
      if (!!userData) {
        if (!refreshToken) {
          this.flowsDataService.setSessionState(authResult.session_state, configuration);
        }
        this.publishAuthState(validationResult, isRenewProcess);
        return of(callbackContext);
      } else {
        this.resetAuthDataService.resetAuthorizationData(configuration, allConfigs);
        this.publishUnauthenticatedState(validationResult, isRenewProcess);
        const errorMessage = `Called for userData but they were ${userData}`;
        this.loggerService.logWarning(configuration, errorMessage);
        return throwError(() => new Error(errorMessage));
      }
    }), catchError((err) => {
      const errorMessage = `Failed to retrieve user info with error:  ${err}`;
      this.loggerService.logWarning(configuration, errorMessage);
      return throwError(() => new Error(errorMessage));
    }));
  }
  publishAuthState(stateValidationResult, isRenewProcess) {
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: true,
      validationResult: stateValidationResult.state,
      isRenewProcess
    });
  }
  publishUnauthenticatedState(stateValidationResult, isRenewProcess) {
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: false,
      validationResult: stateValidationResult.state,
      isRenewProcess
    });
  }
};
UserCallbackHandlerService.ɵfac = function UserCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || UserCallbackHandlerService)(ɵɵinject(LoggerService), ɵɵinject(AuthStateService), ɵɵinject(FlowsDataService), ɵɵinject(UserService), ɵɵinject(ResetAuthDataService));
};
UserCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: UserCallbackHandlerService,
  factory: UserCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: AuthStateService
    }, {
      type: FlowsDataService
    }, {
      type: UserService
    }, {
      type: ResetAuthDataService
    }];
  }, null);
})();
var StateValidationResult = class {
  constructor(accessToken = "", idToken = "", authResponseIsValid = false, decodedIdToken = {
    at_hash: ""
  }, state = ValidationResult.NotSet) {
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.authResponseIsValid = authResponseIsValid;
    this.decodedIdToken = decodedIdToken;
    this.state = state;
  }
};
var EqualityService = class {
  isStringEqualOrNonOrderedArrayEqual(value1, value2) {
    if (this.isNullOrUndefined(value1)) {
      return false;
    }
    if (this.isNullOrUndefined(value2)) {
      return false;
    }
    if (this.oneValueIsStringAndTheOtherIsArray(value1, value2)) {
      return false;
    }
    if (this.bothValuesAreStrings(value1, value2)) {
      return value1 === value2;
    }
    return this.arraysHaveEqualContent(value1, value2);
  }
  areEqual(value1, value2) {
    if (!value1 || !value2) {
      return false;
    }
    if (this.bothValuesAreArrays(value1, value2)) {
      return this.arraysStrictEqual(value1, value2);
    }
    if (this.bothValuesAreStrings(value1, value2)) {
      return value1 === value2;
    }
    if (this.bothValuesAreObjects(value1, value2)) {
      return JSON.stringify(value1).toLowerCase() === JSON.stringify(value2).toLowerCase();
    }
    if (this.oneValueIsStringAndTheOtherIsArray(value1, value2)) {
      if (Array.isArray(value1) && this.valueIsString(value2)) {
        return value1[0] === value2;
      }
      if (Array.isArray(value2) && this.valueIsString(value1)) {
        return value2[0] === value1;
      }
    }
    return value1 === value2;
  }
  oneValueIsStringAndTheOtherIsArray(value1, value2) {
    return Array.isArray(value1) && this.valueIsString(value2) || Array.isArray(value2) && this.valueIsString(value1);
  }
  bothValuesAreObjects(value1, value2) {
    return this.valueIsObject(value1) && this.valueIsObject(value2);
  }
  bothValuesAreStrings(value1, value2) {
    return this.valueIsString(value1) && this.valueIsString(value2);
  }
  bothValuesAreArrays(value1, value2) {
    return Array.isArray(value1) && Array.isArray(value2);
  }
  valueIsString(value) {
    return typeof value === "string" || value instanceof String;
  }
  valueIsObject(value) {
    return typeof value === "object";
  }
  arraysStrictEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  arraysHaveEqualContent(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.some((v) => arr2.includes(v));
  }
  isNullOrUndefined(val) {
    return val === null || val === void 0;
  }
};
EqualityService.ɵfac = function EqualityService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || EqualityService)();
};
EqualityService.ɵprov = ɵɵdefineInjectable({
  token: EqualityService,
  factory: EqualityService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EqualityService, [{
    type: Injectable
  }], null, null);
})();
var StateValidationService = class {
  constructor(storagePersistenceService, tokenValidationService, tokenHelperService, loggerService, equalityService, flowHelper) {
    this.storagePersistenceService = storagePersistenceService;
    this.tokenValidationService = tokenValidationService;
    this.tokenHelperService = tokenHelperService;
    this.loggerService = loggerService;
    this.equalityService = equalityService;
    this.flowHelper = flowHelper;
  }
  getValidatedStateResult(callbackContext, configuration) {
    if (!callbackContext || callbackContext.authResult.error) {
      return of(new StateValidationResult("", "", false, {}));
    }
    return this.validateState(callbackContext, configuration);
  }
  validateState(callbackContext, configuration) {
    const toReturn = new StateValidationResult();
    const authStateControl = this.storagePersistenceService.read("authStateControl", configuration);
    if (!this.tokenValidationService.validateStateFromHashCallback(callbackContext.authResult.state, authStateControl, configuration)) {
      this.loggerService.logWarning(configuration, "authCallback incorrect state");
      toReturn.state = ValidationResult.StatesDoNotMatch;
      this.handleUnsuccessfulValidation(configuration);
      return of(toReturn);
    }
    const isCurrentFlowImplicitFlowWithAccessToken = this.flowHelper.isCurrentFlowImplicitFlowWithAccessToken(configuration);
    const isCurrentFlowCodeFlow = this.flowHelper.isCurrentFlowCodeFlow(configuration);
    if (isCurrentFlowImplicitFlowWithAccessToken || isCurrentFlowCodeFlow) {
      toReturn.accessToken = callbackContext.authResult.access_token;
    }
    const disableIdTokenValidation = configuration.disableIdTokenValidation;
    if (disableIdTokenValidation) {
      toReturn.state = ValidationResult.Ok;
      toReturn.authResponseIsValid = true;
      return of(toReturn);
    }
    const isInRefreshTokenFlow = callbackContext.isRenewProcess && !!callbackContext.refreshToken;
    const hasIdToken = !!callbackContext.authResult.id_token;
    if (isInRefreshTokenFlow && !hasIdToken) {
      toReturn.state = ValidationResult.Ok;
      toReturn.authResponseIsValid = true;
      return of(toReturn);
    }
    if (callbackContext.authResult.id_token) {
      const {
        clientId,
        issValidationOff,
        maxIdTokenIatOffsetAllowedInSeconds,
        disableIatOffsetValidation,
        ignoreNonceAfterRefresh,
        renewTimeBeforeTokenExpiresInSeconds
      } = configuration;
      toReturn.idToken = callbackContext.authResult.id_token;
      toReturn.decodedIdToken = this.tokenHelperService.getPayloadFromToken(toReturn.idToken, false, configuration);
      return this.tokenValidationService.validateSignatureIdToken(toReturn.idToken, callbackContext.jwtKeys, configuration).pipe(mergeMap((isSignatureIdTokenValid) => {
        if (!isSignatureIdTokenValid) {
          this.loggerService.logDebug(configuration, "authCallback Signature validation failed id_token");
          toReturn.state = ValidationResult.SignatureFailed;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        const authNonce = this.storagePersistenceService.read("authNonce", configuration);
        if (!this.tokenValidationService.validateIdTokenNonce(toReturn.decodedIdToken, authNonce, ignoreNonceAfterRefresh, configuration)) {
          this.loggerService.logWarning(configuration, "authCallback incorrect nonce, did you call the checkAuth() method multiple times?");
          toReturn.state = ValidationResult.IncorrectNonce;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateRequiredIdToken(toReturn.decodedIdToken, configuration)) {
          this.loggerService.logDebug(configuration, "authCallback Validation, one of the REQUIRED properties missing from id_token");
          toReturn.state = ValidationResult.RequiredPropertyMissing;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!isInRefreshTokenFlow && !this.tokenValidationService.validateIdTokenIatMaxOffset(toReturn.decodedIdToken, maxIdTokenIatOffsetAllowedInSeconds, disableIatOffsetValidation, configuration)) {
          this.loggerService.logWarning(configuration, "authCallback Validation, iat rejected id_token was issued too far away from the current time");
          toReturn.state = ValidationResult.MaxOffsetExpired;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        const authWellKnownEndPoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
        if (authWellKnownEndPoints) {
          if (issValidationOff) {
            this.loggerService.logDebug(configuration, "iss validation is turned off, this is not recommended!");
          } else if (!issValidationOff && !this.tokenValidationService.validateIdTokenIss(toReturn.decodedIdToken, authWellKnownEndPoints.issuer, configuration)) {
            this.loggerService.logWarning(configuration, "authCallback incorrect iss does not match authWellKnownEndpoints issuer");
            toReturn.state = ValidationResult.IssDoesNotMatchIssuer;
            this.handleUnsuccessfulValidation(configuration);
            return of(toReturn);
          }
        } else {
          this.loggerService.logWarning(configuration, "authWellKnownEndpoints is undefined");
          toReturn.state = ValidationResult.NoAuthWellKnownEndPoints;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateIdTokenAud(toReturn.decodedIdToken, clientId, configuration)) {
          this.loggerService.logWarning(configuration, "authCallback incorrect aud");
          toReturn.state = ValidationResult.IncorrectAud;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateIdTokenAzpExistsIfMoreThanOneAud(toReturn.decodedIdToken)) {
          this.loggerService.logWarning(configuration, "authCallback missing azp");
          toReturn.state = ValidationResult.IncorrectAzp;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.tokenValidationService.validateIdTokenAzpValid(toReturn.decodedIdToken, clientId)) {
          this.loggerService.logWarning(configuration, "authCallback incorrect azp");
          toReturn.state = ValidationResult.IncorrectAzp;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!this.isIdTokenAfterRefreshTokenRequestValid(callbackContext, toReturn.decodedIdToken, configuration)) {
          this.loggerService.logWarning(configuration, "authCallback pre, post id_token claims do not match in refresh");
          toReturn.state = ValidationResult.IncorrectIdTokenClaimsAfterRefresh;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        if (!isInRefreshTokenFlow && !this.tokenValidationService.validateIdTokenExpNotExpired(toReturn.decodedIdToken, configuration, renewTimeBeforeTokenExpiresInSeconds)) {
          this.loggerService.logWarning(configuration, "authCallback id token expired");
          toReturn.state = ValidationResult.TokenExpired;
          this.handleUnsuccessfulValidation(configuration);
          return of(toReturn);
        }
        return this.validateDefault(isCurrentFlowImplicitFlowWithAccessToken, isCurrentFlowCodeFlow, toReturn, configuration, callbackContext);
      }));
    } else {
      this.loggerService.logDebug(configuration, "No id_token found, skipping id_token validation");
    }
    return this.validateDefault(isCurrentFlowImplicitFlowWithAccessToken, isCurrentFlowCodeFlow, toReturn, configuration, callbackContext);
  }
  validateDefault(isCurrentFlowImplicitFlowWithAccessToken, isCurrentFlowCodeFlow, toReturn, configuration, callbackContext) {
    if (!isCurrentFlowImplicitFlowWithAccessToken && !isCurrentFlowCodeFlow) {
      toReturn.authResponseIsValid = true;
      toReturn.state = ValidationResult.Ok;
      this.handleSuccessfulValidation(configuration);
      this.handleUnsuccessfulValidation(configuration);
      return of(toReturn);
    }
    if (callbackContext.authResult.id_token) {
      const idTokenHeader = this.tokenHelperService.getHeaderFromToken(toReturn.idToken, false, configuration);
      if (isCurrentFlowCodeFlow && !toReturn.decodedIdToken.at_hash) {
        this.loggerService.logDebug(configuration, "Code Flow active, and no at_hash in the id_token, skipping check!");
      } else {
        return this.tokenValidationService.validateIdTokenAtHash(
          toReturn.accessToken,
          toReturn.decodedIdToken.at_hash,
          idTokenHeader.alg,
          // 'RS256'
          configuration
        ).pipe(map((valid) => {
          if (!valid || !toReturn.accessToken) {
            this.loggerService.logWarning(configuration, "authCallback incorrect at_hash");
            toReturn.state = ValidationResult.IncorrectAtHash;
            this.handleUnsuccessfulValidation(configuration);
            return toReturn;
          } else {
            toReturn.authResponseIsValid = true;
            toReturn.state = ValidationResult.Ok;
            this.handleSuccessfulValidation(configuration);
            return toReturn;
          }
        }));
      }
    }
    toReturn.authResponseIsValid = true;
    toReturn.state = ValidationResult.Ok;
    this.handleSuccessfulValidation(configuration);
    return of(toReturn);
  }
  isIdTokenAfterRefreshTokenRequestValid(callbackContext, newIdToken, configuration) {
    const {
      useRefreshToken,
      disableRefreshIdTokenAuthTimeValidation
    } = configuration;
    if (!useRefreshToken) {
      return true;
    }
    if (!callbackContext.existingIdToken) {
      return true;
    }
    const decodedIdToken = this.tokenHelperService.getPayloadFromToken(callbackContext.existingIdToken, false, configuration);
    if (decodedIdToken.iss !== newIdToken.iss) {
      this.loggerService.logDebug(configuration, `iss do not match: ${decodedIdToken.iss} ${newIdToken.iss}`);
      return false;
    }
    if (decodedIdToken.azp !== newIdToken.azp) {
      this.loggerService.logDebug(configuration, `azp do not match: ${decodedIdToken.azp} ${newIdToken.azp}`);
      return false;
    }
    if (decodedIdToken.sub !== newIdToken.sub) {
      this.loggerService.logDebug(configuration, `sub do not match: ${decodedIdToken.sub} ${newIdToken.sub}`);
      return false;
    }
    if (!this.equalityService.isStringEqualOrNonOrderedArrayEqual(decodedIdToken?.aud, newIdToken?.aud)) {
      this.loggerService.logDebug(configuration, `aud in new id_token is not valid: '${decodedIdToken?.aud}' '${newIdToken.aud}'`);
      return false;
    }
    if (disableRefreshIdTokenAuthTimeValidation) {
      return true;
    }
    if (decodedIdToken.auth_time !== newIdToken.auth_time) {
      this.loggerService.logDebug(configuration, `auth_time do not match: ${decodedIdToken.auth_time} ${newIdToken.auth_time}`);
      return false;
    }
    return true;
  }
  handleSuccessfulValidation(configuration) {
    const {
      autoCleanStateAfterAuthentication
    } = configuration;
    this.storagePersistenceService.write("authNonce", null, configuration);
    if (autoCleanStateAfterAuthentication) {
      this.storagePersistenceService.write("authStateControl", "", configuration);
    }
    this.loggerService.logDebug(configuration, "authCallback token(s) validated, continue");
  }
  handleUnsuccessfulValidation(configuration) {
    const {
      autoCleanStateAfterAuthentication
    } = configuration;
    this.storagePersistenceService.write("authNonce", null, configuration);
    if (autoCleanStateAfterAuthentication) {
      this.storagePersistenceService.write("authStateControl", "", configuration);
    }
    this.loggerService.logDebug(configuration, "authCallback token(s) invalid");
  }
};
StateValidationService.ɵfac = function StateValidationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StateValidationService)(ɵɵinject(StoragePersistenceService), ɵɵinject(TokenValidationService), ɵɵinject(TokenHelperService), ɵɵinject(LoggerService), ɵɵinject(EqualityService), ɵɵinject(FlowHelper));
};
StateValidationService.ɵprov = ɵɵdefineInjectable({
  token: StateValidationService,
  factory: StateValidationService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateValidationService, [{
    type: Injectable
  }], function() {
    return [{
      type: StoragePersistenceService
    }, {
      type: TokenValidationService
    }, {
      type: TokenHelperService
    }, {
      type: LoggerService
    }, {
      type: EqualityService
    }, {
      type: FlowHelper
    }];
  }, null);
})();
var StateValidationCallbackHandlerService = class {
  constructor(loggerService, stateValidationService, authStateService, resetAuthDataService, document) {
    this.loggerService = loggerService;
    this.stateValidationService = stateValidationService;
    this.authStateService = authStateService;
    this.resetAuthDataService = resetAuthDataService;
    this.document = document;
  }
  // STEP 4 All flows
  callbackStateValidation(callbackContext, configuration, allConfigs) {
    return this.stateValidationService.getValidatedStateResult(callbackContext, configuration).pipe(map((validationResult) => {
      callbackContext.validationResult = validationResult;
      if (validationResult.authResponseIsValid) {
        this.authStateService.setAuthorizationData(validationResult.accessToken, callbackContext.authResult, configuration, allConfigs);
        return callbackContext;
      } else {
        const errorMessage = `authorizedCallback, token(s) validation failed, resetting. Hash: ${this.document.location.hash}`;
        this.loggerService.logWarning(configuration, errorMessage);
        this.resetAuthDataService.resetAuthorizationData(configuration, allConfigs);
        this.publishUnauthorizedState(callbackContext.validationResult, callbackContext.isRenewProcess);
        throw new Error(errorMessage);
      }
    }));
  }
  publishUnauthorizedState(stateValidationResult, isRenewProcess) {
    this.authStateService.updateAndPublishAuthState({
      isAuthenticated: false,
      validationResult: stateValidationResult.state,
      isRenewProcess
    });
  }
};
StateValidationCallbackHandlerService.ɵfac = function StateValidationCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StateValidationCallbackHandlerService)(ɵɵinject(LoggerService), ɵɵinject(StateValidationService), ɵɵinject(AuthStateService), ɵɵinject(ResetAuthDataService), ɵɵinject(DOCUMENT));
};
StateValidationCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: StateValidationCallbackHandlerService,
  factory: StateValidationCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateValidationCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: StateValidationService
    }, {
      type: AuthStateService
    }, {
      type: ResetAuthDataService
    }, {
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var RefreshSessionCallbackHandlerService = class {
  constructor(loggerService, authStateService, flowsDataService) {
    this.loggerService = loggerService;
    this.authStateService = authStateService;
    this.flowsDataService = flowsDataService;
  }
  // STEP 1 Refresh session
  refreshSessionWithRefreshTokens(config) {
    const stateData = this.flowsDataService.getExistingOrCreateAuthStateControl(config);
    this.loggerService.logDebug(config, "RefreshSession created. Adding myautostate: " + stateData);
    const refreshToken = this.authStateService.getRefreshToken(config);
    const idToken = this.authStateService.getIdToken(config);
    if (refreshToken) {
      const callbackContext = {
        code: null,
        refreshToken,
        state: stateData,
        sessionState: null,
        authResult: null,
        isRenewProcess: true,
        jwtKeys: null,
        validationResult: null,
        existingIdToken: idToken
      };
      this.loggerService.logDebug(config, "found refresh code, obtaining new credentials with refresh code");
      this.flowsDataService.setNonce(TokenValidationService.refreshTokenNoncePlaceholder, config);
      return of(callbackContext);
    } else {
      const errorMessage = "no refresh token found, please login";
      this.loggerService.logError(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
  }
};
RefreshSessionCallbackHandlerService.ɵfac = function RefreshSessionCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RefreshSessionCallbackHandlerService)(ɵɵinject(LoggerService), ɵɵinject(AuthStateService), ɵɵinject(FlowsDataService));
};
RefreshSessionCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: RefreshSessionCallbackHandlerService,
  factory: RefreshSessionCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: AuthStateService
    }, {
      type: FlowsDataService
    }];
  }, null);
})();
var RefreshTokenCallbackHandlerService = class {
  constructor(urlService, loggerService, dataService, storagePersistenceService) {
    this.urlService = urlService;
    this.loggerService = loggerService;
    this.dataService = dataService;
    this.storagePersistenceService = storagePersistenceService;
  }
  // STEP 2 Refresh Token
  refreshTokensRequestTokens(callbackContext, config, customParamsRefresh) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const authWellknownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
    const tokenEndpoint = authWellknownEndpoints?.tokenEndpoint;
    if (!tokenEndpoint) {
      return throwError(() => new Error("Token Endpoint not defined"));
    }
    const data = this.urlService.createBodyForCodeFlowRefreshTokensRequest(callbackContext.refreshToken, config, customParamsRefresh);
    return this.dataService.post(tokenEndpoint, data, config, headers).pipe(switchMap((response) => {
      this.loggerService.logDebug(config, "token refresh response: ", response);
      response.state = callbackContext.state;
      callbackContext.authResult = response;
      return of(callbackContext);
    }), retryWhen((error) => this.handleRefreshRetry(error, config)), catchError((error) => {
      const {
        authority
      } = config;
      const errorMessage = `OidcService code request ${authority}`;
      this.loggerService.logError(config, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    }));
  }
  handleRefreshRetry(errors, config) {
    return errors.pipe(mergeMap((error) => {
      if (error && error instanceof HttpErrorResponse && error.error instanceof ProgressEvent && error.error.type === "error") {
        const {
          authority,
          refreshTokenRetryInSeconds
        } = config;
        const errorMessage = `OidcService code request ${authority} - no internet connection`;
        this.loggerService.logWarning(config, errorMessage, error);
        return timer(refreshTokenRetryInSeconds * 1e3);
      }
      return throwError(() => error);
    }));
  }
};
RefreshTokenCallbackHandlerService.ɵfac = function RefreshTokenCallbackHandlerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RefreshTokenCallbackHandlerService)(ɵɵinject(UrlService), ɵɵinject(LoggerService), ɵɵinject(DataService), ɵɵinject(StoragePersistenceService));
};
RefreshTokenCallbackHandlerService.ɵprov = ɵɵdefineInjectable({
  token: RefreshTokenCallbackHandlerService,
  factory: RefreshTokenCallbackHandlerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshTokenCallbackHandlerService, [{
    type: Injectable
  }], function() {
    return [{
      type: UrlService
    }, {
      type: LoggerService
    }, {
      type: DataService
    }, {
      type: StoragePersistenceService
    }];
  }, null);
})();
var FlowsService = class {
  constructor(codeFlowCallbackHandlerService, implicitFlowCallbackHandlerService, historyJwtKeysCallbackHandlerService, userHandlerService, stateValidationCallbackHandlerService, refreshSessionCallbackHandlerService, refreshTokenCallbackHandlerService) {
    this.codeFlowCallbackHandlerService = codeFlowCallbackHandlerService;
    this.implicitFlowCallbackHandlerService = implicitFlowCallbackHandlerService;
    this.historyJwtKeysCallbackHandlerService = historyJwtKeysCallbackHandlerService;
    this.userHandlerService = userHandlerService;
    this.stateValidationCallbackHandlerService = stateValidationCallbackHandlerService;
    this.refreshSessionCallbackHandlerService = refreshSessionCallbackHandlerService;
    this.refreshTokenCallbackHandlerService = refreshTokenCallbackHandlerService;
  }
  processCodeFlowCallback(urlToCheck, config, allConfigs) {
    return this.codeFlowCallbackHandlerService.codeFlowCallback(urlToCheck, config).pipe(concatMap((callbackContext) => this.codeFlowCallbackHandlerService.codeFlowCodeRequest(callbackContext, config)), concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  processSilentRenewCodeFlowCallback(firstContext, config, allConfigs) {
    return this.codeFlowCallbackHandlerService.codeFlowCodeRequest(firstContext, config).pipe(concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  processImplicitFlowCallback(config, allConfigs, hash) {
    return this.implicitFlowCallbackHandlerService.implicitFlowCallback(config, allConfigs, hash).pipe(concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
  processRefreshToken(config, allConfigs, customParamsRefresh) {
    return this.refreshSessionCallbackHandlerService.refreshSessionWithRefreshTokens(config).pipe(concatMap((callbackContext) => this.refreshTokenCallbackHandlerService.refreshTokensRequestTokens(callbackContext, config, customParamsRefresh)), concatMap((callbackContext) => this.historyJwtKeysCallbackHandlerService.callbackHistoryAndResetJwtKeys(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.stateValidationCallbackHandlerService.callbackStateValidation(callbackContext, config, allConfigs)), concatMap((callbackContext) => this.userHandlerService.callbackUser(callbackContext, config, allConfigs)));
  }
};
FlowsService.ɵfac = function FlowsService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || FlowsService)(ɵɵinject(CodeFlowCallbackHandlerService), ɵɵinject(ImplicitFlowCallbackHandlerService), ɵɵinject(HistoryJwtKeysCallbackHandlerService), ɵɵinject(UserCallbackHandlerService), ɵɵinject(StateValidationCallbackHandlerService), ɵɵinject(RefreshSessionCallbackHandlerService), ɵɵinject(RefreshTokenCallbackHandlerService));
};
FlowsService.ɵprov = ɵɵdefineInjectable({
  token: FlowsService,
  factory: FlowsService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlowsService, [{
    type: Injectable
  }], function() {
    return [{
      type: CodeFlowCallbackHandlerService
    }, {
      type: ImplicitFlowCallbackHandlerService
    }, {
      type: HistoryJwtKeysCallbackHandlerService
    }, {
      type: UserCallbackHandlerService
    }, {
      type: StateValidationCallbackHandlerService
    }, {
      type: RefreshSessionCallbackHandlerService
    }, {
      type: RefreshTokenCallbackHandlerService
    }];
  }, null);
})();
var IntervalService = class {
  constructor(zone) {
    this.zone = zone;
    this.runTokenValidationRunning = null;
  }
  isTokenValidationRunning() {
    return !!this.runTokenValidationRunning;
  }
  stopPeriodicTokenCheck() {
    if (this.runTokenValidationRunning) {
      this.runTokenValidationRunning.unsubscribe();
      this.runTokenValidationRunning = null;
    }
  }
  startPeriodicTokenCheck(repeatAfterSeconds) {
    const millisecondsDelayBetweenTokenCheck = repeatAfterSeconds * 1e3;
    return new Observable((subscriber) => {
      let intervalId;
      this.zone.runOutsideAngular(() => {
        intervalId = setInterval(() => this.zone.run(() => subscriber.next()), millisecondsDelayBetweenTokenCheck);
      });
      return () => {
        clearInterval(intervalId);
      };
    });
  }
};
IntervalService.ɵfac = function IntervalService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || IntervalService)(ɵɵinject(NgZone));
};
IntervalService.ɵprov = ɵɵdefineInjectable({
  token: IntervalService,
  factory: IntervalService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IntervalService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: NgZone
    }];
  }, null);
})();
var ImplicitFlowCallbackService = class {
  constructor(flowsService, router, flowsDataService, intervalService) {
    this.flowsService = flowsService;
    this.router = router;
    this.flowsDataService = flowsDataService;
    this.intervalService = intervalService;
  }
  authenticatedImplicitFlowCallback(config, allConfigs, hash) {
    const isRenewProcess = this.flowsDataService.isSilentRenewRunning(config);
    const {
      triggerAuthorizationResultEvent,
      postLoginRoute,
      unauthorizedRoute
    } = config;
    return this.flowsService.processImplicitFlowCallback(config, allConfigs, hash).pipe(tap((callbackContext) => {
      if (!triggerAuthorizationResultEvent && !callbackContext.isRenewProcess) {
        this.router.navigateByUrl(postLoginRoute);
      }
    }), catchError((error) => {
      this.flowsDataService.resetSilentRenewRunning(config);
      this.intervalService.stopPeriodicTokenCheck();
      if (!triggerAuthorizationResultEvent && !isRenewProcess) {
        this.router.navigateByUrl(unauthorizedRoute);
      }
      return throwError(() => new Error(error));
    }));
  }
};
ImplicitFlowCallbackService.ɵfac = function ImplicitFlowCallbackService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ImplicitFlowCallbackService)(ɵɵinject(FlowsService), ɵɵinject(Router), ɵɵinject(FlowsDataService), ɵɵinject(IntervalService));
};
ImplicitFlowCallbackService.ɵprov = ɵɵdefineInjectable({
  token: ImplicitFlowCallbackService,
  factory: ImplicitFlowCallbackService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ImplicitFlowCallbackService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: FlowsService
    }, {
      type: Router
    }, {
      type: FlowsDataService
    }, {
      type: IntervalService
    }];
  }, null);
})();
var IFRAME_FOR_SILENT_RENEW_IDENTIFIER = "myiFrameForSilentRenew";
var SilentRenewService = class {
  constructor(iFrameService, flowsService, resetAuthDataService, flowsDataService, authStateService, loggerService, flowHelper, implicitFlowCallbackService, intervalService) {
    this.iFrameService = iFrameService;
    this.flowsService = flowsService;
    this.resetAuthDataService = resetAuthDataService;
    this.flowsDataService = flowsDataService;
    this.authStateService = authStateService;
    this.loggerService = loggerService;
    this.flowHelper = flowHelper;
    this.implicitFlowCallbackService = implicitFlowCallbackService;
    this.intervalService = intervalService;
    this.refreshSessionWithIFrameCompletedInternal$ = new Subject();
  }
  get refreshSessionWithIFrameCompleted$() {
    return this.refreshSessionWithIFrameCompletedInternal$.asObservable();
  }
  getOrCreateIframe(config) {
    const existingIframe = this.getExistingIframe();
    if (!existingIframe) {
      return this.iFrameService.addIFrameToWindowBody(IFRAME_FOR_SILENT_RENEW_IDENTIFIER, config);
    }
    return existingIframe;
  }
  isSilentRenewConfigured(configuration) {
    const {
      useRefreshToken,
      silentRenew
    } = configuration;
    return !useRefreshToken && silentRenew;
  }
  codeFlowCallbackSilentRenewIframe(urlParts, config, allConfigs) {
    const params = new HttpParams({
      fromString: urlParts[1]
    });
    const error = params.get("error");
    if (error) {
      this.authStateService.updateAndPublishAuthState({
        isAuthenticated: false,
        validationResult: ValidationResult.LoginRequired,
        isRenewProcess: true
      });
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      this.flowsDataService.setNonce("", config);
      this.intervalService.stopPeriodicTokenCheck();
      return throwError(() => new Error(error));
    }
    const code = params.get("code");
    const state = params.get("state");
    const sessionState = params.get("session_state");
    const callbackContext = {
      code,
      refreshToken: null,
      state,
      sessionState,
      authResult: null,
      isRenewProcess: true,
      jwtKeys: null,
      validationResult: null,
      existingIdToken: null
    };
    return this.flowsService.processSilentRenewCodeFlowCallback(callbackContext, config, allConfigs).pipe(catchError(() => {
      this.intervalService.stopPeriodicTokenCheck();
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      return throwError(() => new Error(error));
    }));
  }
  silentRenewEventHandler(e, config, allConfigs) {
    this.loggerService.logDebug(config, "silentRenewEventHandler");
    if (!e.detail) {
      return;
    }
    let callback$ = of(null);
    const isCodeFlow = this.flowHelper.isCurrentFlowCodeFlow(config);
    if (isCodeFlow) {
      const urlParts = e.detail.toString().split("?");
      callback$ = this.codeFlowCallbackSilentRenewIframe(urlParts, config, allConfigs);
    } else {
      callback$ = this.implicitFlowCallbackService.authenticatedImplicitFlowCallback(config, allConfigs, e.detail);
    }
    callback$.subscribe({
      next: (callbackContext) => {
        this.refreshSessionWithIFrameCompletedInternal$.next(callbackContext);
        this.flowsDataService.resetSilentRenewRunning(config);
      },
      error: (err) => {
        this.loggerService.logError(config, "Error: " + err);
        this.refreshSessionWithIFrameCompletedInternal$.next(null);
        this.flowsDataService.resetSilentRenewRunning(config);
      }
    });
  }
  getExistingIframe() {
    return this.iFrameService.getExistingIFrame(IFRAME_FOR_SILENT_RENEW_IDENTIFIER);
  }
};
SilentRenewService.ɵfac = function SilentRenewService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || SilentRenewService)(ɵɵinject(IFrameService), ɵɵinject(FlowsService), ɵɵinject(ResetAuthDataService), ɵɵinject(FlowsDataService), ɵɵinject(AuthStateService), ɵɵinject(LoggerService), ɵɵinject(FlowHelper), ɵɵinject(ImplicitFlowCallbackService), ɵɵinject(IntervalService));
};
SilentRenewService.ɵprov = ɵɵdefineInjectable({
  token: SilentRenewService,
  factory: SilentRenewService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SilentRenewService, [{
    type: Injectable
  }], function() {
    return [{
      type: IFrameService
    }, {
      type: FlowsService
    }, {
      type: ResetAuthDataService
    }, {
      type: FlowsDataService
    }, {
      type: AuthStateService
    }, {
      type: LoggerService
    }, {
      type: FlowHelper
    }, {
      type: ImplicitFlowCallbackService
    }, {
      type: IntervalService
    }];
  }, null);
})();
var CodeFlowCallbackService = class {
  constructor(flowsService, flowsDataService, intervalService, router) {
    this.flowsService = flowsService;
    this.flowsDataService = flowsDataService;
    this.intervalService = intervalService;
    this.router = router;
  }
  authenticatedCallbackWithCode(urlToCheck, config, allConfigs) {
    const isRenewProcess = this.flowsDataService.isSilentRenewRunning(config);
    const {
      triggerAuthorizationResultEvent,
      postLoginRoute,
      unauthorizedRoute
    } = config;
    return this.flowsService.processCodeFlowCallback(urlToCheck, config, allConfigs).pipe(tap((callbackContext) => {
      this.flowsDataService.resetCodeFlowInProgress(config);
      if (!triggerAuthorizationResultEvent && !callbackContext.isRenewProcess) {
        this.router.navigateByUrl(postLoginRoute);
      }
    }), catchError((error) => {
      this.flowsDataService.resetSilentRenewRunning(config);
      this.flowsDataService.resetCodeFlowInProgress(config);
      this.intervalService.stopPeriodicTokenCheck();
      if (!triggerAuthorizationResultEvent && !isRenewProcess) {
        this.router.navigateByUrl(unauthorizedRoute);
      }
      return throwError(() => new Error(error));
    }));
  }
};
CodeFlowCallbackService.ɵfac = function CodeFlowCallbackService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CodeFlowCallbackService)(ɵɵinject(FlowsService), ɵɵinject(FlowsDataService), ɵɵinject(IntervalService), ɵɵinject(Router));
};
CodeFlowCallbackService.ɵprov = ɵɵdefineInjectable({
  token: CodeFlowCallbackService,
  factory: CodeFlowCallbackService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CodeFlowCallbackService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: FlowsService
    }, {
      type: FlowsDataService
    }, {
      type: IntervalService
    }, {
      type: Router
    }];
  }, null);
})();
var CallbackService = class {
  constructor(urlService, flowHelper, implicitFlowCallbackService, codeFlowCallbackService) {
    this.urlService = urlService;
    this.flowHelper = flowHelper;
    this.implicitFlowCallbackService = implicitFlowCallbackService;
    this.codeFlowCallbackService = codeFlowCallbackService;
    this.stsCallbackInternal$ = new Subject();
  }
  get stsCallback$() {
    return this.stsCallbackInternal$.asObservable();
  }
  isCallback(currentUrl) {
    return this.urlService.isCallbackFromSts(currentUrl);
  }
  handleCallbackAndFireEvents(currentCallbackUrl, config, allConfigs) {
    let callback$;
    if (this.flowHelper.isCurrentFlowCodeFlow(config)) {
      callback$ = this.codeFlowCallbackService.authenticatedCallbackWithCode(currentCallbackUrl, config, allConfigs);
    } else if (this.flowHelper.isCurrentFlowAnyImplicitFlow(config)) {
      if (currentCallbackUrl?.includes("#")) {
        let hash = currentCallbackUrl.substring(currentCallbackUrl.indexOf("#") + 1);
        callback$ = this.implicitFlowCallbackService.authenticatedImplicitFlowCallback(config, allConfigs, hash);
      } else {
        callback$ = this.implicitFlowCallbackService.authenticatedImplicitFlowCallback(config, allConfigs);
      }
    }
    return callback$.pipe(tap(() => this.stsCallbackInternal$.next()));
  }
};
CallbackService.ɵfac = function CallbackService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CallbackService)(ɵɵinject(UrlService), ɵɵinject(FlowHelper), ɵɵinject(ImplicitFlowCallbackService), ɵɵinject(CodeFlowCallbackService));
};
CallbackService.ɵprov = ɵɵdefineInjectable({
  token: CallbackService,
  factory: CallbackService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CallbackService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: UrlService
    }, {
      type: FlowHelper
    }, {
      type: ImplicitFlowCallbackService
    }, {
      type: CodeFlowCallbackService
    }];
  }, null);
})();
var WELL_KNOWN_SUFFIX = `/.well-known/openid-configuration`;
var AuthWellKnownDataService = class {
  constructor(http, loggerService) {
    this.http = http;
    this.loggerService = loggerService;
  }
  getWellKnownEndPointsForConfig(config) {
    const {
      authWellknownEndpointUrl
    } = config;
    if (!authWellknownEndpointUrl) {
      const errorMessage = "no authWellknownEndpoint given!";
      this.loggerService.logError(config, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    return this.getWellKnownDocument(authWellknownEndpointUrl, config).pipe(map((wellKnownEndpoints) => ({
      issuer: wellKnownEndpoints.issuer,
      jwksUri: wellKnownEndpoints.jwks_uri,
      authorizationEndpoint: wellKnownEndpoints.authorization_endpoint,
      tokenEndpoint: wellKnownEndpoints.token_endpoint,
      userInfoEndpoint: wellKnownEndpoints.userinfo_endpoint,
      endSessionEndpoint: wellKnownEndpoints.end_session_endpoint,
      checkSessionIframe: wellKnownEndpoints.check_session_iframe,
      revocationEndpoint: wellKnownEndpoints.revocation_endpoint,
      introspectionEndpoint: wellKnownEndpoints.introspection_endpoint,
      parEndpoint: wellKnownEndpoints.pushed_authorization_request_endpoint
    })));
  }
  getWellKnownDocument(wellKnownEndpoint, config) {
    let url = wellKnownEndpoint;
    if (!wellKnownEndpoint.includes(WELL_KNOWN_SUFFIX)) {
      url = `${wellKnownEndpoint}${WELL_KNOWN_SUFFIX}`;
    }
    return this.http.get(url, config).pipe(retry(2));
  }
};
AuthWellKnownDataService.ɵfac = function AuthWellKnownDataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AuthWellKnownDataService)(ɵɵinject(DataService), ɵɵinject(LoggerService));
};
AuthWellKnownDataService.ɵprov = ɵɵdefineInjectable({
  token: AuthWellKnownDataService,
  factory: AuthWellKnownDataService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthWellKnownDataService, [{
    type: Injectable
  }], function() {
    return [{
      type: DataService
    }, {
      type: LoggerService
    }];
  }, null);
})();
var AuthWellKnownService = class {
  constructor(dataService, publicEventsService, storagePersistenceService) {
    this.dataService = dataService;
    this.publicEventsService = publicEventsService;
    this.storagePersistenceService = storagePersistenceService;
  }
  storeWellKnownEndpoints(config, mappedWellKnownEndpoints) {
    this.storagePersistenceService.write("authWellKnownEndPoints", mappedWellKnownEndpoints, config);
  }
  queryAndStoreAuthWellKnownEndPoints(config) {
    const alreadySavedWellKnownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", config);
    if (!!alreadySavedWellKnownEndpoints) {
      return of(alreadySavedWellKnownEndpoints);
    }
    return this.dataService.getWellKnownEndPointsForConfig(config).pipe(tap((mappedWellKnownEndpoints) => this.storeWellKnownEndpoints(config, mappedWellKnownEndpoints)), catchError((error) => {
      this.publicEventsService.fireEvent(EventTypes.ConfigLoadingFailed, null);
      return throwError(() => new Error(error));
    }));
  }
};
AuthWellKnownService.ɵfac = function AuthWellKnownService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AuthWellKnownService)(ɵɵinject(AuthWellKnownDataService), ɵɵinject(PublicEventsService), ɵɵinject(StoragePersistenceService));
};
AuthWellKnownService.ɵprov = ɵɵdefineInjectable({
  token: AuthWellKnownService,
  factory: AuthWellKnownService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthWellKnownService, [{
    type: Injectable
  }], function() {
    return [{
      type: AuthWellKnownDataService
    }, {
      type: PublicEventsService
    }, {
      type: StoragePersistenceService
    }];
  }, null);
})();
var RefreshSessionIframeService = class {
  constructor(document, loggerService, urlService, silentRenewService, rendererFactory) {
    this.document = document;
    this.loggerService = loggerService;
    this.urlService = urlService;
    this.silentRenewService = silentRenewService;
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  refreshSessionWithIframe(config, allConfigs, customParams) {
    this.loggerService.logDebug(config, "BEGIN refresh session Authorize Iframe renew");
    return this.urlService.getRefreshSessionSilentRenewUrl(config, customParams).pipe(switchMap((url) => {
      return this.sendAuthorizeRequestUsingSilentRenew(url, config, allConfigs);
    }));
  }
  sendAuthorizeRequestUsingSilentRenew(url, config, allConfigs) {
    const sessionIframe = this.silentRenewService.getOrCreateIframe(config);
    this.initSilentRenewRequest(config, allConfigs);
    this.loggerService.logDebug(config, "sendAuthorizeRequestUsingSilentRenew for URL:" + url);
    return new Observable((observer) => {
      const onLoadHandler = () => {
        sessionIframe.removeEventListener("load", onLoadHandler);
        this.loggerService.logDebug(config, "removed event listener from IFrame");
        observer.next(true);
        observer.complete();
      };
      sessionIframe.addEventListener("load", onLoadHandler);
      sessionIframe.contentWindow.location.replace(url);
    });
  }
  initSilentRenewRequest(config, allConfigs) {
    const instanceId = Math.random();
    const initDestroyHandler = this.renderer.listen("window", "oidc-silent-renew-init", (e) => {
      if (e.detail !== instanceId) {
        initDestroyHandler();
        renewDestroyHandler();
      }
    });
    const renewDestroyHandler = this.renderer.listen("window", "oidc-silent-renew-message", (e) => this.silentRenewService.silentRenewEventHandler(e, config, allConfigs));
    this.document.defaultView.dispatchEvent(new CustomEvent("oidc-silent-renew-init", {
      detail: instanceId
    }));
  }
};
RefreshSessionIframeService.ɵfac = function RefreshSessionIframeService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RefreshSessionIframeService)(ɵɵinject(DOCUMENT), ɵɵinject(LoggerService), ɵɵinject(UrlService), ɵɵinject(SilentRenewService), ɵɵinject(RendererFactory2));
};
RefreshSessionIframeService.ɵprov = ɵɵdefineInjectable({
  token: RefreshSessionIframeService,
  factory: RefreshSessionIframeService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionIframeService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: LoggerService
    }, {
      type: UrlService
    }, {
      type: SilentRenewService
    }, {
      type: RendererFactory2
    }];
  }, null);
})();
var RefreshSessionRefreshTokenService = class {
  constructor(loggerService, resetAuthDataService, flowsService, intervalService) {
    this.loggerService = loggerService;
    this.resetAuthDataService = resetAuthDataService;
    this.flowsService = flowsService;
    this.intervalService = intervalService;
  }
  refreshSessionWithRefreshTokens(config, allConfigs, customParamsRefresh) {
    this.loggerService.logDebug(config, "BEGIN refresh session Authorize");
    let refreshTokenFailed = false;
    return this.flowsService.processRefreshToken(config, allConfigs, customParamsRefresh).pipe(catchError((error) => {
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      refreshTokenFailed = true;
      return throwError(() => new Error(error));
    }), finalize(() => refreshTokenFailed && this.intervalService.stopPeriodicTokenCheck()));
  }
};
RefreshSessionRefreshTokenService.ɵfac = function RefreshSessionRefreshTokenService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RefreshSessionRefreshTokenService)(ɵɵinject(LoggerService), ɵɵinject(ResetAuthDataService), ɵɵinject(FlowsService), ɵɵinject(IntervalService));
};
RefreshSessionRefreshTokenService.ɵprov = ɵɵdefineInjectable({
  token: RefreshSessionRefreshTokenService,
  factory: RefreshSessionRefreshTokenService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionRefreshTokenService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: ResetAuthDataService
    }, {
      type: FlowsService
    }, {
      type: IntervalService
    }];
  }, null);
})();
var MAX_RETRY_ATTEMPTS = 3;
var RefreshSessionService = class {
  constructor(flowHelper, flowsDataService, loggerService, silentRenewService, authStateService, authWellKnownService, refreshSessionIframeService, storagePersistenceService, refreshSessionRefreshTokenService, userService) {
    this.flowHelper = flowHelper;
    this.flowsDataService = flowsDataService;
    this.loggerService = loggerService;
    this.silentRenewService = silentRenewService;
    this.authStateService = authStateService;
    this.authWellKnownService = authWellKnownService;
    this.refreshSessionIframeService = refreshSessionIframeService;
    this.storagePersistenceService = storagePersistenceService;
    this.refreshSessionRefreshTokenService = refreshSessionRefreshTokenService;
    this.userService = userService;
  }
  userForceRefreshSession(config, allConfigs, extraCustomParams) {
    this.persistCustomParams(extraCustomParams, config);
    return this.forceRefreshSession(config, allConfigs, extraCustomParams);
  }
  forceRefreshSession(config, allConfigs, extraCustomParams) {
    const {
      customParamsRefreshTokenRequest,
      configId
    } = config;
    const mergedParams = __spreadValues(__spreadValues({}, customParamsRefreshTokenRequest), extraCustomParams);
    if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
      return this.startRefreshSession(config, allConfigs, mergedParams).pipe(map(() => {
        const isAuthenticated = this.authStateService.areAuthStorageTokensValid(config);
        if (isAuthenticated) {
          return {
            idToken: this.authStateService.getIdToken(config),
            accessToken: this.authStateService.getAccessToken(config),
            userData: this.userService.getUserDataFromStore(config),
            isAuthenticated,
            configId
          };
        }
        return null;
      }));
    }
    const {
      silentRenewTimeoutInSeconds
    } = config;
    const timeOutTime = silentRenewTimeoutInSeconds * 1e3;
    return forkJoin([this.startRefreshSession(config, allConfigs, extraCustomParams), this.silentRenewService.refreshSessionWithIFrameCompleted$.pipe(take(1))]).pipe(timeout(timeOutTime), retryWhen(this.timeoutRetryStrategy.bind(this)), map(([_, callbackContext]) => {
      const isAuthenticated = this.authStateService.areAuthStorageTokensValid(config);
      if (isAuthenticated) {
        return {
          idToken: callbackContext?.authResult?.id_token,
          accessToken: callbackContext?.authResult?.access_token,
          userData: this.userService.getUserDataFromStore(config),
          isAuthenticated,
          configId
        };
      }
      return null;
    }));
  }
  persistCustomParams(extraCustomParams, config) {
    const {
      useRefreshToken
    } = config;
    if (extraCustomParams) {
      if (useRefreshToken) {
        this.storagePersistenceService.write("storageCustomParamsRefresh", extraCustomParams, config);
      } else {
        this.storagePersistenceService.write("storageCustomParamsAuthRequest", extraCustomParams, config);
      }
    }
  }
  startRefreshSession(config, allConfigs, extraCustomParams) {
    const isSilentRenewRunning = this.flowsDataService.isSilentRenewRunning(config);
    this.loggerService.logDebug(config, `Checking: silentRenewRunning: ${isSilentRenewRunning}`);
    const shouldBeExecuted = !isSilentRenewRunning;
    if (!shouldBeExecuted) {
      return of(null);
    }
    return this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(config).pipe(switchMap(() => {
      this.flowsDataService.setSilentRenewRunning(config);
      if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
        return this.refreshSessionRefreshTokenService.refreshSessionWithRefreshTokens(config, allConfigs, extraCustomParams);
      }
      return this.refreshSessionIframeService.refreshSessionWithIframe(config, allConfigs, extraCustomParams);
    }));
  }
  timeoutRetryStrategy(errorAttempts, config) {
    return errorAttempts.pipe(mergeMap((error, index) => {
      const scalingDuration = 1e3;
      const currentAttempt = index + 1;
      if (!(error instanceof TimeoutError) || currentAttempt > MAX_RETRY_ATTEMPTS) {
        return throwError(() => new Error(error));
      }
      this.loggerService.logDebug(config, `forceRefreshSession timeout. Attempt #${currentAttempt}`);
      this.flowsDataService.resetSilentRenewRunning(config);
      return timer(currentAttempt * scalingDuration);
    }));
  }
};
RefreshSessionService.ɵfac = function RefreshSessionService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RefreshSessionService)(ɵɵinject(FlowHelper), ɵɵinject(FlowsDataService), ɵɵinject(LoggerService), ɵɵinject(SilentRenewService), ɵɵinject(AuthStateService), ɵɵinject(AuthWellKnownService), ɵɵinject(RefreshSessionIframeService), ɵɵinject(StoragePersistenceService), ɵɵinject(RefreshSessionRefreshTokenService), ɵɵinject(UserService));
};
RefreshSessionService.ɵprov = ɵɵdefineInjectable({
  token: RefreshSessionService,
  factory: RefreshSessionService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RefreshSessionService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: FlowHelper
    }, {
      type: FlowsDataService
    }, {
      type: LoggerService
    }, {
      type: SilentRenewService
    }, {
      type: AuthStateService
    }, {
      type: AuthWellKnownService
    }, {
      type: RefreshSessionIframeService
    }, {
      type: StoragePersistenceService
    }, {
      type: RefreshSessionRefreshTokenService
    }, {
      type: UserService
    }];
  }, null);
})();
var DEFAULT_CONFIG = {
  authority: "https://please_set",
  authWellknownEndpointUrl: "",
  authWellknownEndpoints: null,
  redirectUrl: "https://please_set",
  clientId: "please_set",
  responseType: "code",
  scope: "openid email profile",
  hdParam: "",
  postLogoutRedirectUri: "https://please_set",
  startCheckSession: false,
  silentRenew: false,
  silentRenewUrl: "https://please_set",
  silentRenewTimeoutInSeconds: 20,
  renewTimeBeforeTokenExpiresInSeconds: 0,
  useRefreshToken: false,
  usePushedAuthorisationRequests: false,
  ignoreNonceAfterRefresh: false,
  postLoginRoute: "/",
  forbiddenRoute: "/forbidden",
  unauthorizedRoute: "/unauthorized",
  autoUserInfo: true,
  autoCleanStateAfterAuthentication: true,
  triggerAuthorizationResultEvent: false,
  logLevel: LogLevel.Warn,
  issValidationOff: false,
  historyCleanupOff: false,
  maxIdTokenIatOffsetAllowedInSeconds: 120,
  disableIatOffsetValidation: false,
  customParamsAuthRequest: {},
  customParamsRefreshTokenRequest: {},
  customParamsEndSessionRequest: {},
  customParamsCodeRequest: {},
  disableRefreshIdTokenAuthTimeValidation: false,
  triggerRefreshWhenIdTokenExpired: true,
  tokenRefreshInSeconds: 4,
  refreshTokenRetryInSeconds: 3,
  ngswBypass: false
};
var POSITIVE_VALIDATION_RESULT = {
  result: true,
  messages: [],
  level: null
};
var ensureAuthority = (passedConfig) => {
  if (!passedConfig.authority) {
    return {
      result: false,
      messages: ["The authority URL MUST be provided in the configuration! "],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var ensureClientId = (passedConfig) => {
  if (!passedConfig.clientId) {
    return {
      result: false,
      messages: ["The clientId is required and missing from your config!"],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var createIdentifierToCheck = (passedConfig) => {
  if (!passedConfig) {
    return null;
  }
  const {
    authority,
    clientId,
    scope
  } = passedConfig;
  return `${authority}${clientId}${scope}`;
};
var arrayHasDuplicates = (array) => new Set(array).size !== array.length;
var ensureNoDuplicatedConfigsRule = (passedConfigs) => {
  const allIdentifiers = passedConfigs.map((x) => createIdentifierToCheck(x));
  const someAreNull = allIdentifiers.some((x) => x === null);
  if (someAreNull) {
    return {
      result: false,
      messages: [`Please make sure you add an object with a 'config' property: ....({ config }) instead of ...(config)`],
      level: "error"
    };
  }
  const hasDuplicates = arrayHasDuplicates(allIdentifiers);
  if (hasDuplicates) {
    return {
      result: false,
      messages: ["You added multiple configs with the same authority, clientId and scope"],
      level: "warning"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var ensureRedirectRule = (passedConfig) => {
  if (!passedConfig.redirectUrl) {
    return {
      result: false,
      messages: ["The redirectUrl is required and missing from your config"],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var ensureSilentRenewUrlWhenNoRefreshTokenUsed = (passedConfig) => {
  const usesSilentRenew = passedConfig.silentRenew;
  const usesRefreshToken = passedConfig.useRefreshToken;
  const hasSilentRenewUrl = passedConfig.silentRenewUrl;
  if (usesSilentRenew && !usesRefreshToken && !hasSilentRenewUrl) {
    return {
      result: false,
      messages: ["Please provide a silent renew URL if using renew and not refresh tokens"],
      level: "error"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var useOfflineScopeWithSilentRenew = (passedConfig) => {
  const hasRefreshToken = passedConfig.useRefreshToken;
  const hasSilentRenew = passedConfig.silentRenew;
  const scope = passedConfig.scope || "";
  const hasOfflineScope = scope.split(" ").includes("offline_access");
  if (hasRefreshToken && hasSilentRenew && !hasOfflineScope) {
    return {
      result: false,
      messages: ["When using silent renew and refresh tokens please set the `offline_access` scope"],
      level: "warning"
    };
  }
  return POSITIVE_VALIDATION_RESULT;
};
var allRules = [ensureAuthority, useOfflineScopeWithSilentRenew, ensureRedirectRule, ensureClientId, ensureSilentRenewUrlWhenNoRefreshTokenUsed];
var allMultipleConfigRules = [ensureNoDuplicatedConfigsRule];
var ConfigValidationService = class {
  constructor(loggerService) {
    this.loggerService = loggerService;
  }
  validateConfigs(passedConfigs) {
    return this.validateConfigsInternal(passedConfigs ?? [], allMultipleConfigRules);
  }
  validateConfig(passedConfig) {
    return this.validateConfigInternal(passedConfig, allRules);
  }
  validateConfigsInternal(passedConfigs, allRulesToUse) {
    const allValidationResults = allRulesToUse.map((rule) => rule(passedConfigs));
    let overallErrorCount = 0;
    passedConfigs.forEach((passedConfig) => {
      const errorCount = this.processValidationResultsAndGetErrorCount(allValidationResults, passedConfig);
      overallErrorCount += errorCount;
    });
    return overallErrorCount === 0;
  }
  validateConfigInternal(passedConfig, allRulesToUse) {
    const allValidationResults = allRulesToUse.map((rule) => rule(passedConfig));
    const errorCount = this.processValidationResultsAndGetErrorCount(allValidationResults, passedConfig);
    return errorCount === 0;
  }
  processValidationResultsAndGetErrorCount(allValidationResults, config) {
    const allMessages = allValidationResults.filter((x) => x.messages.length > 0);
    const allErrorMessages = this.getAllMessagesOfType("error", allMessages);
    const allWarnings = this.getAllMessagesOfType("warning", allMessages);
    allErrorMessages.forEach((message) => this.loggerService.logError(config, message));
    allWarnings.forEach((message) => this.loggerService.logWarning(config, message));
    return allErrorMessages.length;
  }
  getAllMessagesOfType(type, results) {
    const allMessages = results.filter((x) => x.level === type).map((result) => result.messages);
    return allMessages.reduce((acc, val) => acc.concat(val), []);
  }
};
ConfigValidationService.ɵfac = function ConfigValidationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ConfigValidationService)(ɵɵinject(LoggerService));
};
ConfigValidationService.ɵprov = ɵɵdefineInjectable({
  token: ConfigValidationService,
  factory: ConfigValidationService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigValidationService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }];
  }, null);
})();
var PlatformProvider = class {
  constructor(platformId) {
    this.platformId = platformId;
  }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
};
PlatformProvider.ɵfac = function PlatformProvider_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PlatformProvider)(ɵɵinject(PLATFORM_ID));
};
PlatformProvider.ɵprov = ɵɵdefineInjectable({
  token: PlatformProvider,
  factory: PlatformProvider.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformProvider, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, null);
})();
var OpenIdConfigLoader = class {
};
var StsConfigLoader = class {
};
var StsConfigStaticLoader = class {
  constructor(passedConfigs) {
    this.passedConfigs = passedConfigs;
  }
  loadConfigs() {
    if (Array.isArray(this.passedConfigs)) {
      return of(this.passedConfigs);
    }
    return of([this.passedConfigs]);
  }
};
var StsConfigHttpLoader = class {
  constructor(configs$) {
    this.configs$ = configs$;
  }
  loadConfigs() {
    if (Array.isArray(this.configs$)) {
      return forkJoin(this.configs$);
    }
    const singleConfigOrArray = this.configs$;
    return singleConfigOrArray.pipe(map((value) => {
      if (Array.isArray(value)) {
        return value;
      }
      return [value];
    }));
  }
};
var ConfigurationService = class {
  constructor(loggerService, publicEventsService, storagePersistenceService, configValidationService, platformProvider, authWellKnownService, loader) {
    this.loggerService = loggerService;
    this.publicEventsService = publicEventsService;
    this.storagePersistenceService = storagePersistenceService;
    this.configValidationService = configValidationService;
    this.platformProvider = platformProvider;
    this.authWellKnownService = authWellKnownService;
    this.loader = loader;
    this.configsInternal = {};
  }
  hasManyConfigs() {
    return Object.keys(this.configsInternal).length > 1;
  }
  getAllConfigurations() {
    return Object.values(this.configsInternal);
  }
  getOpenIDConfiguration(configId) {
    if (this.configsAlreadySaved()) {
      return of(this.getConfig(configId));
    }
    return this.getOpenIDConfigurations(configId).pipe(map((result) => result.currentConfig));
  }
  getOpenIDConfigurations(configId) {
    return this.loadConfigs().pipe(concatMap((allConfigs) => this.prepareAndSaveConfigs(allConfigs)), map((allPreparedConfigs) => ({
      allConfigs: allPreparedConfigs,
      currentConfig: this.getConfig(configId)
    })));
  }
  hasAtLeastOneConfig() {
    return Object.keys(this.configsInternal).length > 0;
  }
  saveConfig(readyConfig) {
    const {
      configId
    } = readyConfig;
    this.configsInternal[configId] = readyConfig;
  }
  loadConfigs() {
    return this.loader.loadConfigs();
  }
  configsAlreadySaved() {
    return this.hasAtLeastOneConfig();
  }
  getConfig(configId) {
    if (!!configId) {
      return this.configsInternal[configId] || null;
    }
    const [, value] = Object.entries(this.configsInternal)[0] || [[null, null]];
    return value || null;
  }
  prepareAndSaveConfigs(passedConfigs) {
    if (!this.configValidationService.validateConfigs(passedConfigs)) {
      return of(null);
    }
    this.createUniqueIds(passedConfigs);
    const allHandleConfigs$ = passedConfigs.map((x) => this.handleConfig(x));
    return forkJoin(allHandleConfigs$);
  }
  createUniqueIds(passedConfigs) {
    passedConfigs.forEach((config, index) => {
      if (!config.configId) {
        config.configId = `${index}-${config.clientId}`;
      }
    });
  }
  handleConfig(passedConfig) {
    if (!this.configValidationService.validateConfig(passedConfig)) {
      this.loggerService.logError(passedConfig, "Validation of config rejected with errors. Config is NOT set.");
      return of(null);
    }
    if (!passedConfig.authWellknownEndpointUrl) {
      passedConfig.authWellknownEndpointUrl = passedConfig.authority;
    }
    const usedConfig = this.prepareConfig(passedConfig);
    this.saveConfig(usedConfig);
    const configWithAuthWellKnown = this.enhanceConfigWithWellKnownEndpoint(usedConfig);
    this.publicEventsService.fireEvent(EventTypes.ConfigLoaded, configWithAuthWellKnown);
    return of(usedConfig);
  }
  enhanceConfigWithWellKnownEndpoint(configuration) {
    const alreadyExistingAuthWellKnownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!!alreadyExistingAuthWellKnownEndpoints) {
      configuration.authWellknownEndpoints = alreadyExistingAuthWellKnownEndpoints;
      return configuration;
    }
    const passedAuthWellKnownEndpoints = configuration.authWellknownEndpoints;
    if (!!passedAuthWellKnownEndpoints) {
      this.authWellKnownService.storeWellKnownEndpoints(configuration, passedAuthWellKnownEndpoints);
      configuration.authWellknownEndpoints = passedAuthWellKnownEndpoints;
      return configuration;
    }
    return configuration;
  }
  prepareConfig(configuration) {
    const openIdConfigurationInternal = __spreadValues(__spreadValues({}, DEFAULT_CONFIG), configuration);
    this.setSpecialCases(openIdConfigurationInternal);
    return openIdConfigurationInternal;
  }
  setSpecialCases(currentConfig) {
    if (!this.platformProvider.isBrowser()) {
      currentConfig.startCheckSession = false;
      currentConfig.silentRenew = false;
      currentConfig.useRefreshToken = false;
      currentConfig.usePushedAuthorisationRequests = false;
    }
  }
};
ConfigurationService.ɵfac = function ConfigurationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ConfigurationService)(ɵɵinject(LoggerService), ɵɵinject(PublicEventsService), ɵɵinject(StoragePersistenceService), ɵɵinject(ConfigValidationService), ɵɵinject(PlatformProvider), ɵɵinject(AuthWellKnownService), ɵɵinject(StsConfigLoader));
};
ConfigurationService.ɵprov = ɵɵdefineInjectable({
  token: ConfigurationService,
  factory: ConfigurationService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfigurationService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: PublicEventsService
    }, {
      type: StoragePersistenceService
    }, {
      type: ConfigValidationService
    }, {
      type: PlatformProvider
    }, {
      type: AuthWellKnownService
    }, {
      type: StsConfigLoader
    }];
  }, null);
})();
var PeriodicallyTokenCheckService = class {
  constructor(resetAuthDataService, flowHelper, flowsDataService, loggerService, userService, authStateService, refreshSessionIframeService, refreshSessionRefreshTokenService, intervalService, storagePersistenceService, publicEventsService, configurationService) {
    this.resetAuthDataService = resetAuthDataService;
    this.flowHelper = flowHelper;
    this.flowsDataService = flowsDataService;
    this.loggerService = loggerService;
    this.userService = userService;
    this.authStateService = authStateService;
    this.refreshSessionIframeService = refreshSessionIframeService;
    this.refreshSessionRefreshTokenService = refreshSessionRefreshTokenService;
    this.intervalService = intervalService;
    this.storagePersistenceService = storagePersistenceService;
    this.publicEventsService = publicEventsService;
    this.configurationService = configurationService;
  }
  startTokenValidationPeriodically(allConfigs, currentConfig) {
    const configsWithSilentRenewEnabled = this.getConfigsWithSilentRenewEnabled(allConfigs);
    if (configsWithSilentRenewEnabled.length <= 0) {
      return;
    }
    if (this.intervalService.isTokenValidationRunning()) {
      return;
    }
    const refreshTimeInSeconds = this.getSmallestRefreshTimeFromConfigs(configsWithSilentRenewEnabled);
    const periodicallyCheck$ = this.intervalService.startPeriodicTokenCheck(refreshTimeInSeconds).pipe(switchMap(() => {
      const objectWithConfigIdsAndRefreshEvent = {};
      configsWithSilentRenewEnabled.forEach((config) => {
        objectWithConfigIdsAndRefreshEvent[config.configId] = this.getRefreshEvent(config, allConfigs);
      });
      return forkJoin(objectWithConfigIdsAndRefreshEvent);
    }));
    this.intervalService.runTokenValidationRunning = periodicallyCheck$.pipe(catchError((error) => throwError(() => new Error(error)))).subscribe({
      next: (objectWithConfigIds) => {
        for (const [configId, _] of Object.entries(objectWithConfigIds)) {
          this.configurationService.getOpenIDConfiguration(configId).subscribe((config) => {
            this.loggerService.logDebug(config, "silent renew, periodic check finished!");
            if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
              this.flowsDataService.resetSilentRenewRunning(config);
            }
          });
        }
      },
      error: (error) => {
        this.loggerService.logError(currentConfig, "silent renew failed!", error);
      }
    });
  }
  getRefreshEvent(config, allConfigs) {
    const shouldStartRefreshEvent = this.shouldStartPeriodicallyCheckForConfig(config);
    if (!shouldStartRefreshEvent) {
      return of(null);
    }
    const refreshEvent$ = this.createRefreshEventForConfig(config, allConfigs);
    this.publicEventsService.fireEvent(EventTypes.SilentRenewStarted);
    const refreshEventWithErrorHandler$ = refreshEvent$.pipe(catchError((error) => {
      this.loggerService.logError(config, "silent renew failed!", error);
      this.publicEventsService.fireEvent(EventTypes.SilentRenewFailed, error);
      this.flowsDataService.resetSilentRenewRunning(config);
      return throwError(() => new Error(error));
    }));
    return refreshEventWithErrorHandler$;
  }
  getSmallestRefreshTimeFromConfigs(configsWithSilentRenewEnabled) {
    const result = configsWithSilentRenewEnabled.reduce((prev, curr) => prev.tokenRefreshInSeconds < curr.tokenRefreshInSeconds ? prev : curr);
    return result.tokenRefreshInSeconds;
  }
  getConfigsWithSilentRenewEnabled(allConfigs) {
    return allConfigs.filter((x) => x.silentRenew);
  }
  createRefreshEventForConfig(configuration, allConfigs) {
    this.loggerService.logDebug(configuration, "starting silent renew...");
    return this.configurationService.getOpenIDConfiguration(configuration.configId).pipe(switchMap((config) => {
      if (!config?.silentRenew) {
        this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
        return of(null);
      }
      this.flowsDataService.setSilentRenewRunning(config);
      if (this.flowHelper.isCurrentFlowCodeFlowWithRefreshTokens(config)) {
        const customParamsRefresh = this.storagePersistenceService.read("storageCustomParamsRefresh", config) || {};
        const {
          customParamsRefreshTokenRequest
        } = config;
        const mergedParams = __spreadValues(__spreadValues({}, customParamsRefreshTokenRequest), customParamsRefresh);
        return this.refreshSessionRefreshTokenService.refreshSessionWithRefreshTokens(config, allConfigs, mergedParams);
      }
      const customParams = this.storagePersistenceService.read("storageCustomParamsAuthRequest", config);
      return this.refreshSessionIframeService.refreshSessionWithIframe(config, allConfigs, customParams);
    }));
  }
  shouldStartPeriodicallyCheckForConfig(config) {
    const idToken = this.authStateService.getIdToken(config);
    const isSilentRenewRunning = this.flowsDataService.isSilentRenewRunning(config);
    const isCodeFlowinProgress = this.flowsDataService.isCodeFlowInProgress(config);
    const userDataFromStore = this.userService.getUserDataFromStore(config);
    this.loggerService.logDebug(config, `Checking: silentRenewRunning: ${isSilentRenewRunning}, isCodeFlowInProgress: ${isCodeFlowinProgress} - has idToken: ${!!idToken} - has userData: ${!!userDataFromStore}`);
    const shouldBeExecuted = !!userDataFromStore && !isSilentRenewRunning && !!idToken && !isCodeFlowinProgress;
    if (!shouldBeExecuted) {
      return false;
    }
    const accessTokenHasExpired = this.authStateService.hasAccessTokenExpiredIfExpiryExists(config);
    if (!accessTokenHasExpired) {
      return false;
    }
    return true;
  }
};
PeriodicallyTokenCheckService.ɵfac = function PeriodicallyTokenCheckService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PeriodicallyTokenCheckService)(ɵɵinject(ResetAuthDataService), ɵɵinject(FlowHelper), ɵɵinject(FlowsDataService), ɵɵinject(LoggerService), ɵɵinject(UserService), ɵɵinject(AuthStateService), ɵɵinject(RefreshSessionIframeService), ɵɵinject(RefreshSessionRefreshTokenService), ɵɵinject(IntervalService), ɵɵinject(StoragePersistenceService), ɵɵinject(PublicEventsService), ɵɵinject(ConfigurationService));
};
PeriodicallyTokenCheckService.ɵprov = ɵɵdefineInjectable({
  token: PeriodicallyTokenCheckService,
  factory: PeriodicallyTokenCheckService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PeriodicallyTokenCheckService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: ResetAuthDataService
    }, {
      type: FlowHelper
    }, {
      type: FlowsDataService
    }, {
      type: LoggerService
    }, {
      type: UserService
    }, {
      type: AuthStateService
    }, {
      type: RefreshSessionIframeService
    }, {
      type: RefreshSessionRefreshTokenService
    }, {
      type: IntervalService
    }, {
      type: StoragePersistenceService
    }, {
      type: PublicEventsService
    }, {
      type: ConfigurationService
    }];
  }, null);
})();
var PopUpService = class {
  constructor(document, loggerService, storagePersistenceService) {
    this.document = document;
    this.loggerService = loggerService;
    this.storagePersistenceService = storagePersistenceService;
    this.STORAGE_IDENTIFIER = "popupauth";
    this.resultInternal$ = new Subject();
  }
  get result$() {
    return this.resultInternal$.asObservable();
  }
  get windowInternal() {
    return this.document.defaultView;
  }
  currentWindowIsPopUp() {
    return !!this.windowInternal.opener && this.windowInternal.opener !== this.windowInternal;
  }
  isCurrentlyInPopup(config) {
    if (this.canAccessSessionStorage()) {
      const mainWindowHasPopupOpen = this.mainWindowHasPopupOpen(config);
      const currentWindowIsPopup = this.currentWindowIsPopUp();
      return mainWindowHasPopupOpen || currentWindowIsPopup;
    }
    return false;
  }
  openPopUp(url, popupOptions, config) {
    const optionsToPass = this.getOptions(popupOptions);
    this.popUp = this.windowInternal.open(url, "_blank", optionsToPass);
    if (!this.popUp) {
      this.loggerService.logError(config, "Could not open popup");
      return;
    }
    this.storagePersistenceService.write(this.STORAGE_IDENTIFIER, "true", config);
    const listener = (event) => {
      if (!event?.data || typeof event.data !== "string") {
        this.cleanUp(listener, config);
        return;
      }
      this.resultInternal$.next({
        userClosed: false,
        receivedUrl: event.data
      });
      this.cleanUp(listener, config);
    };
    this.windowInternal.addEventListener("message", listener, false);
    this.handle = this.windowInternal.setInterval(() => {
      if (this.popUp?.closed) {
        this.resultInternal$.next({
          userClosed: true
        });
        this.cleanUp(listener, config);
      }
    }, 200);
  }
  sendMessageToMainWindow(url) {
    if (this.windowInternal.opener) {
      const href = this.windowInternal.location.href;
      this.sendMessage(url, href);
    }
  }
  cleanUp(listener, config) {
    this.windowInternal.removeEventListener("message", listener, false);
    this.windowInternal.clearInterval(this.handle);
    if (this.popUp) {
      this.storagePersistenceService.remove(this.STORAGE_IDENTIFIER, config);
      this.popUp.close();
      this.popUp = null;
    }
  }
  sendMessage(url, href) {
    this.windowInternal.opener.postMessage(url, href);
  }
  getOptions(popupOptions) {
    const popupDefaultOptions = {
      width: 500,
      height: 500,
      left: 50,
      top: 50
    };
    const options = __spreadValues(__spreadValues({}, popupDefaultOptions), popupOptions || {});
    const left = this.windowInternal.screenLeft + (this.windowInternal.outerWidth - options.width) / 2;
    const top = this.windowInternal.screenTop + (this.windowInternal.outerHeight - options.height) / 2;
    options.left = left;
    options.top = top;
    return Object.entries(options).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join(",");
  }
  mainWindowHasPopupOpen(config) {
    return !!this.storagePersistenceService.read(this.STORAGE_IDENTIFIER, config);
  }
  canAccessSessionStorage() {
    return typeof navigator !== "undefined" && navigator.cookieEnabled && typeof Storage !== "undefined";
  }
};
PopUpService.ɵfac = function PopUpService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PopUpService)(ɵɵinject(DOCUMENT), ɵɵinject(LoggerService), ɵɵinject(StoragePersistenceService));
};
PopUpService.ɵprov = ɵɵdefineInjectable({
  token: PopUpService,
  factory: PopUpService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopUpService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }, {
      type: LoggerService
    }, {
      type: StoragePersistenceService
    }];
  }, null);
})();
var STORAGE_KEY = "redirect";
var AutoLoginService = class {
  constructor(storageService, router) {
    this.storageService = storageService;
    this.router = router;
  }
  checkSavedRedirectRouteAndNavigate(config) {
    const savedRouteForRedirect = this.getStoredRedirectRoute(config);
    if (savedRouteForRedirect) {
      this.deleteStoredRedirectRoute(config);
      this.router.navigateByUrl(savedRouteForRedirect);
    }
  }
  /**
   * Saves the redirect URL to storage.
   *
   * @param url The redirect URL to save.
   */
  saveRedirectRoute(config, url) {
    this.storageService.write(STORAGE_KEY, url, config);
  }
  /**
   * Gets the stored redirect URL from storage.
   */
  getStoredRedirectRoute(config) {
    return this.storageService.read(STORAGE_KEY, config);
  }
  /**
   * Removes the redirect URL from storage.
   */
  deleteStoredRedirectRoute(config) {
    this.storageService.remove(STORAGE_KEY, config);
  }
};
AutoLoginService.ɵfac = function AutoLoginService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutoLoginService)(ɵɵinject(StoragePersistenceService), ɵɵinject(Router));
};
AutoLoginService.ɵprov = ɵɵdefineInjectable({
  token: AutoLoginService,
  factory: AutoLoginService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoLoginService, [{
    type: Injectable
  }], function() {
    return [{
      type: StoragePersistenceService
    }, {
      type: Router
    }];
  }, null);
})();
var CheckAuthService = class {
  constructor(checkSessionService, currentUrlService, silentRenewService, userService, loggerService, authStateService, callbackService, refreshSessionService, periodicallyTokenCheckService, popupService, autoLoginService, storagePersistenceService, publicEventsService) {
    this.checkSessionService = checkSessionService;
    this.currentUrlService = currentUrlService;
    this.silentRenewService = silentRenewService;
    this.userService = userService;
    this.loggerService = loggerService;
    this.authStateService = authStateService;
    this.callbackService = callbackService;
    this.refreshSessionService = refreshSessionService;
    this.periodicallyTokenCheckService = periodicallyTokenCheckService;
    this.popupService = popupService;
    this.autoLoginService = autoLoginService;
    this.storagePersistenceService = storagePersistenceService;
    this.publicEventsService = publicEventsService;
  }
  checkAuth(configuration, allConfigs, url) {
    this.publicEventsService.fireEvent(EventTypes.CheckingAuth);
    const stateParamFromUrl = this.currentUrlService.getStateParamFromCurrentUrl(url);
    if (!!stateParamFromUrl) {
      configuration = this.getConfigurationWithUrlState([configuration], stateParamFromUrl);
      if (!configuration) {
        return throwError(() => new Error(`could not find matching config for state ${stateParamFromUrl}`));
      }
    }
    return this.checkAuthWithConfig(configuration, allConfigs, url);
  }
  checkAuthMultiple(allConfigs, url) {
    const stateParamFromUrl = this.currentUrlService.getStateParamFromCurrentUrl(url);
    if (stateParamFromUrl) {
      const config = this.getConfigurationWithUrlState(allConfigs, stateParamFromUrl);
      if (!config) {
        return throwError(() => new Error(`could not find matching config for state ${stateParamFromUrl}`));
      }
      return this.composeMultipleLoginResults(allConfigs, config, url);
    }
    const configs = allConfigs;
    const allChecks$ = configs.map((x) => this.checkAuthWithConfig(x, configs, url));
    return forkJoin(allChecks$);
  }
  checkAuthIncludingServer(configuration, allConfigs) {
    return this.checkAuthWithConfig(configuration, allConfigs).pipe(switchMap((loginResponse) => {
      const {
        isAuthenticated
      } = loginResponse;
      if (isAuthenticated) {
        return of(loginResponse);
      }
      return this.refreshSessionService.forceRefreshSession(configuration, allConfigs).pipe(tap((loginResponseAfterRefreshSession) => {
        if (loginResponseAfterRefreshSession?.isAuthenticated) {
          this.startCheckSessionAndValidation(configuration, allConfigs);
        }
      }));
    }));
  }
  checkAuthWithConfig(config, allConfigs, url) {
    if (!config) {
      const errorMessage = "Please provide at least one configuration before setting up the module";
      this.loggerService.logError(config, errorMessage);
      return of({
        isAuthenticated: false,
        errorMessage,
        userData: null,
        idToken: null,
        accessToken: null,
        configId: null
      });
    }
    const currentUrl = url || this.currentUrlService.getCurrentUrl();
    const {
      configId,
      authority
    } = config;
    this.loggerService.logDebug(config, `Working with config '${configId}' using ${authority}`);
    if (this.popupService.currentWindowIsPopUp()) {
      this.popupService.sendMessageToMainWindow(currentUrl);
      return of(null);
    }
    const isCallback = this.callbackService.isCallback(currentUrl);
    this.loggerService.logDebug(config, "currentUrl to check auth with: ", currentUrl);
    const callback$ = isCallback ? this.callbackService.handleCallbackAndFireEvents(currentUrl, config, allConfigs) : of(null);
    return callback$.pipe(map(() => {
      const isAuthenticated = this.authStateService.areAuthStorageTokensValid(config);
      if (isAuthenticated) {
        this.startCheckSessionAndValidation(config, allConfigs);
        if (!isCallback) {
          this.authStateService.setAuthenticatedAndFireEvent(allConfigs);
          this.userService.publishUserDataIfExists(config, allConfigs);
        }
      }
      this.loggerService.logDebug(config, "checkAuth completed - firing events now. isAuthenticated: " + isAuthenticated);
      return {
        isAuthenticated,
        userData: this.userService.getUserDataFromStore(config),
        accessToken: this.authStateService.getAccessToken(config),
        idToken: this.authStateService.getIdToken(config),
        configId
      };
    }), tap(({
      isAuthenticated
    }) => {
      this.publicEventsService.fireEvent(EventTypes.CheckingAuthFinished);
      if (isAuthenticated) {
        this.autoLoginService.checkSavedRedirectRouteAndNavigate(config);
      }
    }), catchError(({
      message
    }) => {
      this.loggerService.logError(config, message);
      this.publicEventsService.fireEvent(EventTypes.CheckingAuthFinishedWithError, message);
      return of({
        isAuthenticated: false,
        errorMessage: message,
        userData: null,
        idToken: null,
        accessToken: null,
        configId
      });
    }));
  }
  startCheckSessionAndValidation(config, allConfigs) {
    if (this.checkSessionService.isCheckSessionConfigured(config)) {
      this.checkSessionService.start(config);
    }
    this.periodicallyTokenCheckService.startTokenValidationPeriodically(allConfigs, config);
    if (this.silentRenewService.isSilentRenewConfigured(config)) {
      this.silentRenewService.getOrCreateIframe(config);
    }
  }
  getConfigurationWithUrlState(configurations, stateFromUrl) {
    for (const config of configurations) {
      const storedState = this.storagePersistenceService.read("authStateControl", config);
      if (storedState === stateFromUrl) {
        return config;
      }
    }
    return null;
  }
  composeMultipleLoginResults(configurations, activeConfig, url) {
    const allOtherConfigs = configurations.filter((x) => x.configId !== activeConfig.configId);
    const currentConfigResult = this.checkAuthWithConfig(activeConfig, configurations, url);
    const allOtherConfigResults = allOtherConfigs.map((config) => {
      const {
        redirectUrl
      } = config;
      return this.checkAuthWithConfig(config, configurations, redirectUrl);
    });
    return forkJoin([currentConfigResult, ...allOtherConfigResults]);
  }
};
CheckAuthService.ɵfac = function CheckAuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CheckAuthService)(ɵɵinject(CheckSessionService), ɵɵinject(CurrentUrlService), ɵɵinject(SilentRenewService), ɵɵinject(UserService), ɵɵinject(LoggerService), ɵɵinject(AuthStateService), ɵɵinject(CallbackService), ɵɵinject(RefreshSessionService), ɵɵinject(PeriodicallyTokenCheckService), ɵɵinject(PopUpService), ɵɵinject(AutoLoginService), ɵɵinject(StoragePersistenceService), ɵɵinject(PublicEventsService));
};
CheckAuthService.ɵprov = ɵɵdefineInjectable({
  token: CheckAuthService,
  factory: CheckAuthService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckAuthService, [{
    type: Injectable
  }], function() {
    return [{
      type: CheckSessionService
    }, {
      type: CurrentUrlService
    }, {
      type: SilentRenewService
    }, {
      type: UserService
    }, {
      type: LoggerService
    }, {
      type: AuthStateService
    }, {
      type: CallbackService
    }, {
      type: RefreshSessionService
    }, {
      type: PeriodicallyTokenCheckService
    }, {
      type: PopUpService
    }, {
      type: AutoLoginService
    }, {
      type: StoragePersistenceService
    }, {
      type: PublicEventsService
    }];
  }, null);
})();
var ClosestMatchingRouteService = class {
  getConfigIdForClosestMatchingRoute(route, configurations) {
    for (const config of configurations) {
      const {
        secureRoutes
      } = config;
      for (const configuredRoute of secureRoutes) {
        if (route.startsWith(configuredRoute)) {
          return {
            matchingRoute: configuredRoute,
            matchingConfig: config
          };
        }
      }
    }
    return {
      matchingRoute: null,
      matchingConfig: null
    };
  }
};
ClosestMatchingRouteService.ɵfac = function ClosestMatchingRouteService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ClosestMatchingRouteService)();
};
ClosestMatchingRouteService.ɵprov = ɵɵdefineInjectable({
  token: ClosestMatchingRouteService,
  factory: ClosestMatchingRouteService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClosestMatchingRouteService, [{
    type: Injectable
  }], null, null);
})();
var ConsoleLoggerService = class {
  logError(message, ...args) {
    console.error(message, ...args);
  }
  logWarning(message, ...args) {
    console.warn(message, ...args);
  }
  logDebug(message, ...args) {
    console.debug(message, ...args);
  }
};
ConsoleLoggerService.ɵfac = function ConsoleLoggerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ConsoleLoggerService)();
};
ConsoleLoggerService.ɵprov = ɵɵdefineInjectable({
  token: ConsoleLoggerService,
  factory: ConsoleLoggerService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConsoleLoggerService, [{
    type: Injectable
  }], null, null);
})();
var ResponseTypeValidationService = class {
  constructor(loggerService, flowHelper) {
    this.loggerService = loggerService;
    this.flowHelper = flowHelper;
  }
  hasConfigValidResponseType(configuration) {
    if (this.flowHelper.isCurrentFlowAnyImplicitFlow(configuration)) {
      return true;
    }
    if (this.flowHelper.isCurrentFlowCodeFlow(configuration)) {
      return true;
    }
    this.loggerService.logWarning(configuration, "module configured incorrectly, invalid response_type. Check the responseType in the config");
    return false;
  }
};
ResponseTypeValidationService.ɵfac = function ResponseTypeValidationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ResponseTypeValidationService)(ɵɵinject(LoggerService), ɵɵinject(FlowHelper));
};
ResponseTypeValidationService.ɵprov = ɵɵdefineInjectable({
  token: ResponseTypeValidationService,
  factory: ResponseTypeValidationService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResponseTypeValidationService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: FlowHelper
    }];
  }, null);
})();
var RedirectService = class {
  constructor(document) {
    this.document = document;
  }
  redirectTo(url) {
    this.document.location.href = url;
  }
};
RedirectService.ɵfac = function RedirectService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || RedirectService)(ɵɵinject(DOCUMENT));
};
RedirectService.ɵprov = ɵɵdefineInjectable({
  token: RedirectService,
  factory: RedirectService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RedirectService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: Document,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var ParService = class {
  constructor(loggerService, urlService, dataService, storagePersistenceService) {
    this.loggerService = loggerService;
    this.urlService = urlService;
    this.dataService = dataService;
    this.storagePersistenceService = storagePersistenceService;
  }
  postParRequest(configuration, customParams) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    const authWellKnownEndpoints = this.storagePersistenceService.read("authWellKnownEndPoints", configuration);
    if (!authWellKnownEndpoints) {
      return throwError(() => new Error("Could not read PAR endpoint because authWellKnownEndPoints are not given"));
    }
    const parEndpoint = authWellKnownEndpoints.parEndpoint;
    if (!parEndpoint) {
      return throwError(() => new Error("Could not read PAR endpoint from authWellKnownEndpoints"));
    }
    return this.urlService.createBodyForParCodeFlowRequest(configuration, customParams).pipe(switchMap((data) => {
      return this.dataService.post(parEndpoint, data, configuration, headers).pipe(retry(2), map((response) => {
        this.loggerService.logDebug(configuration, "par response: ", response);
        return {
          expiresIn: response.expires_in,
          requestUri: response.request_uri
        };
      }), catchError((error) => {
        const errorMessage = `There was an error on ParService postParRequest`;
        this.loggerService.logError(configuration, errorMessage, error);
        return throwError(() => new Error(errorMessage));
      }));
    }));
  }
};
ParService.ɵfac = function ParService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ParService)(ɵɵinject(LoggerService), ɵɵinject(UrlService), ɵɵinject(DataService), ɵɵinject(StoragePersistenceService));
};
ParService.ɵprov = ɵɵdefineInjectable({
  token: ParService,
  factory: ParService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: UrlService
    }, {
      type: DataService
    }, {
      type: StoragePersistenceService
    }];
  }, null);
})();
var ParLoginService = class {
  constructor(loggerService, responseTypeValidationService, urlService, redirectService, authWellKnownService, popupService, checkAuthService, parService) {
    this.loggerService = loggerService;
    this.responseTypeValidationService = responseTypeValidationService;
    this.urlService = urlService;
    this.redirectService = redirectService;
    this.authWellKnownService = authWellKnownService;
    this.popupService = popupService;
    this.checkAuthService = checkAuthService;
    this.parService = parService;
  }
  loginPar(configuration, authOptions) {
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      this.loggerService.logError(configuration, "Invalid response type!");
      return;
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow, no auth data");
    const {
      urlHandler,
      customParams
    } = authOptions || {};
    this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).pipe(switchMap(() => this.parService.postParRequest(configuration, customParams))).subscribe((response) => {
      this.loggerService.logDebug(configuration, "par response: ", response);
      const url = this.urlService.getAuthorizeParUrl(response.requestUri, configuration);
      this.loggerService.logDebug(configuration, "par request url: ", url);
      if (!url) {
        this.loggerService.logError(configuration, `Could not create URL with param ${response.requestUri}: '${url}'`);
        return;
      }
      if (urlHandler) {
        urlHandler(url);
      } else {
        this.redirectService.redirectTo(url);
      }
    });
  }
  loginWithPopUpPar(configuration, allConfigs, authOptions, popupOptions) {
    const {
      configId
    } = configuration;
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      const errorMessage = "Invalid response type!";
      this.loggerService.logError(configuration, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow with popup, no auth data");
    const {
      customParams
    } = authOptions || {};
    return this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).pipe(switchMap(() => this.parService.postParRequest(configuration, customParams)), switchMap((response) => {
      this.loggerService.logDebug(configuration, "par response: ", response);
      const url = this.urlService.getAuthorizeParUrl(response.requestUri, configuration);
      this.loggerService.logDebug(configuration, "par request url: ", url);
      if (!url) {
        const errorMessage = `Could not create URL with param ${response.requestUri}: 'url'`;
        this.loggerService.logError(configuration, errorMessage);
        return throwError(() => new Error(errorMessage));
      }
      this.popupService.openPopUp(url, popupOptions, configuration);
      return this.popupService.result$.pipe(take(1), switchMap((result) => {
        const {
          userClosed,
          receivedUrl
        } = result;
        if (userClosed) {
          return of({
            isAuthenticated: false,
            errorMessage: "User closed popup",
            userData: null,
            idToken: null,
            accessToken: null,
            configId
          });
        }
        return this.checkAuthService.checkAuth(configuration, allConfigs, receivedUrl);
      }));
    }));
  }
};
ParLoginService.ɵfac = function ParLoginService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ParLoginService)(ɵɵinject(LoggerService), ɵɵinject(ResponseTypeValidationService), ɵɵinject(UrlService), ɵɵinject(RedirectService), ɵɵinject(AuthWellKnownService), ɵɵinject(PopUpService), ɵɵinject(CheckAuthService), ɵɵinject(ParService));
};
ParLoginService.ɵprov = ɵɵdefineInjectable({
  token: ParLoginService,
  factory: ParLoginService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ParLoginService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: ResponseTypeValidationService
    }, {
      type: UrlService
    }, {
      type: RedirectService
    }, {
      type: AuthWellKnownService
    }, {
      type: PopUpService
    }, {
      type: CheckAuthService
    }, {
      type: ParService
    }];
  }, null);
})();
var PopUpLoginService = class {
  constructor(loggerService, responseTypeValidationService, urlService, authWellKnownService, popupService, checkAuthService) {
    this.loggerService = loggerService;
    this.responseTypeValidationService = responseTypeValidationService;
    this.urlService = urlService;
    this.authWellKnownService = authWellKnownService;
    this.popupService = popupService;
    this.checkAuthService = checkAuthService;
  }
  loginWithPopUpStandard(configuration, allConfigs, authOptions, popupOptions) {
    const {
      configId
    } = configuration;
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      const errorMessage = "Invalid response type!";
      this.loggerService.logError(configuration, errorMessage);
      return throwError(() => new Error(errorMessage));
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow with popup, no auth data");
    return this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).pipe(switchMap(() => this.urlService.getAuthorizeUrl(configuration, authOptions)), tap((authUrl) => this.popupService.openPopUp(authUrl, popupOptions, configuration)), switchMap(() => {
      return this.popupService.result$.pipe(take(1), switchMap((result) => {
        const {
          userClosed,
          receivedUrl
        } = result;
        if (userClosed) {
          return of({
            isAuthenticated: false,
            errorMessage: "User closed popup",
            userData: null,
            idToken: null,
            accessToken: null,
            configId
          });
        }
        return this.checkAuthService.checkAuth(configuration, allConfigs, receivedUrl);
      }));
    }));
  }
};
PopUpLoginService.ɵfac = function PopUpLoginService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || PopUpLoginService)(ɵɵinject(LoggerService), ɵɵinject(ResponseTypeValidationService), ɵɵinject(UrlService), ɵɵinject(AuthWellKnownService), ɵɵinject(PopUpService), ɵɵinject(CheckAuthService));
};
PopUpLoginService.ɵprov = ɵɵdefineInjectable({
  token: PopUpLoginService,
  factory: PopUpLoginService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PopUpLoginService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: ResponseTypeValidationService
    }, {
      type: UrlService
    }, {
      type: AuthWellKnownService
    }, {
      type: PopUpService
    }, {
      type: CheckAuthService
    }];
  }, null);
})();
var StandardLoginService = class {
  constructor(loggerService, responseTypeValidationService, urlService, redirectService, authWellKnownService, flowsDataService) {
    this.loggerService = loggerService;
    this.responseTypeValidationService = responseTypeValidationService;
    this.urlService = urlService;
    this.redirectService = redirectService;
    this.authWellKnownService = authWellKnownService;
    this.flowsDataService = flowsDataService;
  }
  loginStandard(configuration, authOptions) {
    if (!this.responseTypeValidationService.hasConfigValidResponseType(configuration)) {
      this.loggerService.logError(configuration, "Invalid response type!");
      return;
    }
    this.loggerService.logDebug(configuration, "BEGIN Authorize OIDC Flow, no auth data");
    this.flowsDataService.setCodeFlowInProgress(configuration);
    this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(configuration).subscribe(() => {
      const {
        urlHandler
      } = authOptions || {};
      this.flowsDataService.resetSilentRenewRunning(configuration);
      this.urlService.getAuthorizeUrl(configuration, authOptions).subscribe((url) => {
        if (!url) {
          this.loggerService.logError(configuration, "Could not create URL", url);
          return;
        }
        if (urlHandler) {
          urlHandler(url);
        } else {
          this.redirectService.redirectTo(url);
        }
      });
    });
  }
};
StandardLoginService.ɵfac = function StandardLoginService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || StandardLoginService)(ɵɵinject(LoggerService), ɵɵinject(ResponseTypeValidationService), ɵɵinject(UrlService), ɵɵinject(RedirectService), ɵɵinject(AuthWellKnownService), ɵɵinject(FlowsDataService));
};
StandardLoginService.ɵprov = ɵɵdefineInjectable({
  token: StandardLoginService,
  factory: StandardLoginService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StandardLoginService, [{
    type: Injectable
  }], function() {
    return [{
      type: LoggerService
    }, {
      type: ResponseTypeValidationService
    }, {
      type: UrlService
    }, {
      type: RedirectService
    }, {
      type: AuthWellKnownService
    }, {
      type: FlowsDataService
    }];
  }, null);
})();
var LoginService = class {
  constructor(parLoginService, popUpLoginService, standardLoginService, storagePersistenceService, popupService) {
    this.parLoginService = parLoginService;
    this.popUpLoginService = popUpLoginService;
    this.standardLoginService = standardLoginService;
    this.storagePersistenceService = storagePersistenceService;
    this.popupService = popupService;
  }
  login(configuration, authOptions) {
    const {
      usePushedAuthorisationRequests
    } = configuration;
    if (authOptions?.customParams) {
      this.storagePersistenceService.write("storageCustomParamsAuthRequest", authOptions.customParams, configuration);
    }
    if (usePushedAuthorisationRequests) {
      return this.parLoginService.loginPar(configuration, authOptions);
    } else {
      return this.standardLoginService.loginStandard(configuration, authOptions);
    }
  }
  loginWithPopUp(configuration, allConfigs, authOptions, popupOptions) {
    const isAlreadyInPopUp = this.popupService.isCurrentlyInPopup(configuration);
    if (isAlreadyInPopUp) {
      return of({
        errorMessage: "There is already a popup open."
      });
    }
    const {
      usePushedAuthorisationRequests
    } = configuration;
    if (authOptions?.customParams) {
      this.storagePersistenceService.write("storageCustomParamsAuthRequest", authOptions.customParams, configuration);
    }
    if (usePushedAuthorisationRequests) {
      return this.parLoginService.loginWithPopUpPar(configuration, allConfigs, authOptions, popupOptions);
    }
    return this.popUpLoginService.loginWithPopUpStandard(configuration, allConfigs, authOptions, popupOptions);
  }
};
LoginService.ɵfac = function LoginService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LoginService)(ɵɵinject(ParLoginService), ɵɵinject(PopUpLoginService), ɵɵinject(StandardLoginService), ɵɵinject(StoragePersistenceService), ɵɵinject(PopUpService));
};
LoginService.ɵprov = ɵɵdefineInjectable({
  token: LoginService,
  factory: LoginService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginService, [{
    type: Injectable
  }], function() {
    return [{
      type: ParLoginService
    }, {
      type: PopUpLoginService
    }, {
      type: StandardLoginService
    }, {
      type: StoragePersistenceService
    }, {
      type: PopUpService
    }];
  }, null);
})();
function removeNullAndUndefinedValues(obj) {
  const copy = __spreadValues({}, obj);
  for (const key in obj) {
    if (obj[key] === void 0 || obj[key] === null) {
      delete copy[key];
    }
  }
  return copy;
}
var LogoffRevocationService = class {
  constructor(dataService, storagePersistenceService, loggerService, urlService, checkSessionService, resetAuthDataService, redirectService) {
    this.dataService = dataService;
    this.storagePersistenceService = storagePersistenceService;
    this.loggerService = loggerService;
    this.urlService = urlService;
    this.checkSessionService = checkSessionService;
    this.resetAuthDataService = resetAuthDataService;
    this.redirectService = redirectService;
  }
  // Logs out on the server and the local client.
  // If the server state has changed, check session, then only a local logout.
  logoff(config, allConfigs, logoutAuthOptions) {
    this.loggerService.logDebug(config, "logoff, remove auth", logoutAuthOptions);
    const {
      urlHandler,
      customParams
    } = logoutAuthOptions || {};
    const endSessionUrl = this.urlService.getEndSessionUrl(config, customParams);
    if (!endSessionUrl) {
      this.loggerService.logDebug(config, "No endsessionUrl present. Logoff was only locally. Returning.");
      return of(null);
    }
    if (this.checkSessionService.serverStateChanged(config)) {
      this.loggerService.logDebug(config, "Server State changed. Logoff was only locally. Returning.");
      return of(null);
    }
    if (urlHandler) {
      this.loggerService.logDebug(config, `Custom UrlHandler found. Using this to handle logoff with url '${endSessionUrl}'`);
      urlHandler(endSessionUrl);
      return of(null);
    }
    return this.logoffInternal(logoutAuthOptions, endSessionUrl, config, allConfigs);
  }
  logoffLocal(config, allConfigs) {
    this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
    this.checkSessionService.stop();
  }
  logoffLocalMultiple(allConfigs) {
    allConfigs.forEach((configuration) => this.logoffLocal(configuration, allConfigs));
  }
  // The refresh token and and the access token are revoked on the server. If the refresh token does not exist
  // only the access token is revoked. Then the logout run.
  logoffAndRevokeTokens(config, allConfigs, logoutAuthOptions) {
    const {
      revocationEndpoint
    } = this.storagePersistenceService.read("authWellKnownEndPoints", config) || {};
    if (!revocationEndpoint) {
      this.loggerService.logDebug(config, "revocation endpoint not supported");
      return this.logoff(config, allConfigs, logoutAuthOptions);
    }
    if (this.storagePersistenceService.getRefreshToken(config)) {
      return this.revokeRefreshToken(config).pipe(switchMap((_) => this.revokeAccessToken(config)), catchError((error) => {
        const errorMessage = `revoke token failed`;
        this.loggerService.logError(config, errorMessage, error);
        return throwError(() => new Error(errorMessage));
      }), concatMap(() => this.logoff(config, allConfigs, logoutAuthOptions)));
    } else {
      return this.revokeAccessToken(config).pipe(catchError((error) => {
        const errorMessage = `revoke accessToken failed`;
        this.loggerService.logError(config, errorMessage, error);
        return throwError(() => new Error(errorMessage));
      }), concatMap(() => this.logoff(config, allConfigs, logoutAuthOptions)));
    }
  }
  // https://tools.ietf.org/html/rfc7009
  // revokes an access token on the STS. If no token is provided, then the token from
  // the storage is revoked. You can pass any token to revoke. This makes it possible to
  // manage your own tokens. The is a public API.
  revokeAccessToken(configuration, accessToken) {
    const accessTok = accessToken || this.storagePersistenceService.getAccessToken(configuration);
    const body = this.urlService.createRevocationEndpointBodyAccessToken(accessTok, configuration);
    return this.sendRevokeRequest(configuration, body);
  }
  // https://tools.ietf.org/html/rfc7009
  // revokes an refresh token on the STS. This is only required in the code flow with refresh tokens.
  // If no token is provided, then the token from the storage is revoked. You can pass any token to revoke.
  // This makes it possible to manage your own tokens.
  revokeRefreshToken(configuration, refreshToken) {
    const refreshTok = refreshToken || this.storagePersistenceService.getRefreshToken(configuration);
    const body = this.urlService.createRevocationEndpointBodyRefreshToken(refreshTok, configuration);
    return this.sendRevokeRequest(configuration, body);
  }
  logoffInternal(logoutAuthOptions, endSessionUrl, config, allConfigs) {
    const {
      logoffMethod,
      customParams
    } = logoutAuthOptions || {};
    if (!logoffMethod || logoffMethod === "GET") {
      this.redirectService.redirectTo(endSessionUrl);
      this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
      return of(null);
    }
    const {
      state,
      logout_hint,
      ui_locales
    } = customParams || {};
    const {
      clientId
    } = config;
    const idToken = this.storagePersistenceService.getIdToken(config);
    const postLogoutRedirectUrl = this.urlService.getPostLogoutRedirectUrl(config);
    const headers = this.getHeaders();
    const {
      url
    } = this.urlService.getEndSessionEndpoint(config);
    const body = {
      id_token_hint: idToken,
      client_id: clientId,
      post_logout_redirect_uri: postLogoutRedirectUrl,
      state,
      logout_hint,
      ui_locales
    };
    const bodyWithoutNullOrUndefined = removeNullAndUndefinedValues(body);
    this.resetAuthDataService.resetAuthorizationData(config, allConfigs);
    return this.dataService.post(url, bodyWithoutNullOrUndefined, config, headers);
  }
  sendRevokeRequest(configuration, body) {
    const url = this.urlService.getRevocationEndpointUrl(configuration);
    const headers = this.getHeaders();
    return this.dataService.post(url, body, configuration, headers).pipe(retry(2), switchMap((response) => {
      this.loggerService.logDebug(configuration, "revocation endpoint post response: ", response);
      return of(response);
    }), catchError((error) => {
      const errorMessage = `Revocation request failed`;
      this.loggerService.logError(configuration, errorMessage, error);
      return throwError(() => new Error(errorMessage));
    }));
  }
  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }
};
LogoffRevocationService.ɵfac = function LogoffRevocationService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || LogoffRevocationService)(ɵɵinject(DataService), ɵɵinject(StoragePersistenceService), ɵɵinject(LoggerService), ɵɵinject(UrlService), ɵɵinject(CheckSessionService), ɵɵinject(ResetAuthDataService), ɵɵinject(RedirectService));
};
LogoffRevocationService.ɵprov = ɵɵdefineInjectable({
  token: LogoffRevocationService,
  factory: LogoffRevocationService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LogoffRevocationService, [{
    type: Injectable
  }], function() {
    return [{
      type: DataService
    }, {
      type: StoragePersistenceService
    }, {
      type: LoggerService
    }, {
      type: UrlService
    }, {
      type: CheckSessionService
    }, {
      type: ResetAuthDataService
    }, {
      type: RedirectService
    }];
  }, null);
})();
var OidcSecurityService = class {
  constructor(checkSessionService, checkAuthService, userService, tokenHelperService, configurationService, authStateService, flowsDataService, callbackService, logoffRevocationService, loginService, refreshSessionService, urlService, authWellKnownService) {
    this.checkSessionService = checkSessionService;
    this.checkAuthService = checkAuthService;
    this.userService = userService;
    this.tokenHelperService = tokenHelperService;
    this.configurationService = configurationService;
    this.authStateService = authStateService;
    this.flowsDataService = flowsDataService;
    this.callbackService = callbackService;
    this.logoffRevocationService = logoffRevocationService;
    this.loginService = loginService;
    this.refreshSessionService = refreshSessionService;
    this.urlService = urlService;
    this.authWellKnownService = authWellKnownService;
  }
  /**
   * Provides information about the user after they have logged in.
   *
   * @returns Returns an object containing either the user data directly (single config) or
   * the user data per config in case you are running with multiple configs
   */
  get userData$() {
    return this.userService.userData$;
  }
  /**
   * Emits each time an authorization event occurs.
   *
   * @returns Returns an object containing if you are authenticated or not.
   * Single Config: true if config is authenticated, false if not.
   * Multiple Configs: true is all configs are authenticated, false if only one of them is not
   *
   * The `allConfigsAuthenticated` property contains the auth information _per config_.
   */
  get isAuthenticated$() {
    return this.authStateService.authenticated$;
  }
  /**
   * Emits each time the server sends a CheckSession event and the value changed. This property will always return
   * true.
   */
  get checkSessionChanged$() {
    return this.checkSessionService.checkSessionChanged$;
  }
  /**
   * Emits on a Security Token Service callback. The observable will never contain a value.
   */
  get stsCallback$() {
    return this.callbackService.stsCallback$;
  }
  preloadAuthWellKnownDocument(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.authWellKnownService.queryAndStoreAuthWellKnownEndPoints(config)));
  }
  /**
   * Returns the currently active OpenID configurations.
   *
   * @returns an array of OpenIdConfigurations.
   */
  getConfigurations() {
    return this.configurationService.getAllConfigurations();
  }
  /**
   * Returns a single active OpenIdConfiguration.
   *
   * @param configId The configId to identify the config. If not passed, the first one is being returned
   */
  getConfiguration(configId) {
    return this.configurationService.getOpenIDConfiguration(configId);
  }
  /**
   * Returns the userData for a configuration
   *
   * @param configId The configId to identify the config. If not passed, the first one is being used
   */
  getUserData(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.userService.getUserDataFromStore(config)));
  }
  /**
   * Starts the complete setup flow for one configuration. Calling will start the entire authentication flow, and the returned observable
   * will denote whether the user was successfully authenticated including the user data, the access token, the configId and
   * an error message in case an error happened
   *
   * @param url The URL to perform the authorization on the behalf of.
   * @param configId The configId to perform the authorization on the behalf of. If not passed, the first configs will be taken
   *
   * @returns An object `LoginResponse` containing all information about the login
   */
  checkAuth(url, configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.checkAuthService.checkAuth(currentConfig, allConfigs, url)));
  }
  /**
   * Starts the complete setup flow for multiple configurations.
   * Calling will start the entire authentication flow, and the returned observable
   * will denote whether the user was successfully authenticated including the user data, the access token, the configId and
   * an error message in case an error happened in an array for each config which was provided
   *
   * @param url The URL to perform the authorization on the behalf of.
   * @param configId The configId to perform the authorization on the behalf of. If not passed, all of the current
   * configured ones will be used to check.
   *
   * @returns An array of `LoginResponse` objects containing all information about the logins
   */
  checkAuthMultiple(url) {
    return this.configurationService.getOpenIDConfigurations().pipe(concatMap(({
      allConfigs
    }) => this.checkAuthService.checkAuthMultiple(allConfigs, url)));
  }
  /**
   * Provides information about the current authenticated state
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A boolean whether the config is authenticated or not.
   */
  isAuthenticated(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.isAuthenticated(config)));
  }
  /**
   * Checks the server for an authenticated session using the iframe silent renew if not locally authenticated.
   */
  checkAuthIncludingServer(configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.checkAuthService.checkAuthIncludingServer(currentConfig, allConfigs)));
  }
  /**
   * Returns the access token for the login scenario.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A string with the access token.
   */
  getAccessToken(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getAccessToken(config)));
  }
  /**
   * Returns the ID token for the sign-in.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A string with the id token.
   */
  getIdToken(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getIdToken(config)));
  }
  /**
   * Returns the refresh token, if present, for the sign-in.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A string with the refresh token.
   */
  getRefreshToken(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getRefreshToken(config)));
  }
  /**
   * Returns the authentication result, if present, for the sign-in.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns A object with the authentication result
   */
  getAuthenticationResult(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.authStateService.getAuthenticationResult(config)));
  }
  /**
   * Returns the payload from the ID token.
   *
   * @param encode Set to true if the payload is base64 encoded
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns The payload from the id token.
   */
  getPayloadFromIdToken(encode = false, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => {
      const token = this.authStateService.getIdToken(config);
      return this.tokenHelperService.getPayloadFromToken(token, encode, config);
    }));
  }
  /**
   * Returns the payload from the access token.
   *
   * @param encode Set to true if the payload is base64 encoded
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns The payload from the access token.
   */
  getPayloadFromAccessToken(encode = false, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => {
      const token = this.authStateService.getAccessToken(config);
      return this.tokenHelperService.getPayloadFromToken(token, encode, config);
    }));
  }
  /**
   * Sets a custom state for the authorize request.
   *
   * @param state The state to set.
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   */
  setState(state, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.flowsDataService.setAuthStateControl(state, config)));
  }
  /**
   * Gets the state value used for the authorize request.
   *
   * @param configId The configId to check the information for. If not passed, the first configs will be taken
   *
   * @returns The state value used for the authorize request.
   */
  getState(configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.flowsDataService.getAuthStateControl(config)));
  }
  /**
   * Redirects the user to the Security Token Service to begin the authentication process.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   * @param authOptions The custom options for the the authentication request.
   */
  authorize(configId, authOptions) {
    this.configurationService.getOpenIDConfiguration(configId).subscribe((config) => this.loginService.login(config, authOptions));
  }
  /**
   * Opens the Security Token Service in a new window to begin the authentication process.
   *
   * @param authOptions The custom options for the authentication request.
   * @param popupOptions The configuration for the popup window.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An `Observable<LoginResponse>` containing all information about the login
   */
  authorizeWithPopUp(authOptions, popupOptions, configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.loginService.loginWithPopUp(currentConfig, allConfigs, authOptions, popupOptions)));
  }
  /**
   * Manually refreshes the session.
   *
   * @param customParams Custom parameters to pass to the refresh request.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An `Observable<LoginResponse>` containing all information about the login
   */
  forceRefreshSession(customParams, configId) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.refreshSessionService.userForceRefreshSession(currentConfig, allConfigs, customParams)));
  }
  /**
   * Revokes the refresh token (if present) and the access token on the server and then performs the logoff operation.
   * The refresh token and and the access token are revoked on the server. If the refresh token does not exist
   * only the access token is revoked. Then the logout run.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   * @param authOptions The custom options for the request.
   *
   * @returns An observable when the action is finished
   */
  logoffAndRevokeTokens(configId, logoutAuthOptions) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.logoffRevocationService.logoffAndRevokeTokens(currentConfig, allConfigs, logoutAuthOptions)));
  }
  /**
   * Logs out on the server and the local client. If the server state has changed, confirmed via check session,
   * then only a local logout is performed.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   * @param authOptions with custom parameters and/or an custom url handler
   */
  logoff(configId, logoutAuthOptions) {
    return this.configurationService.getOpenIDConfigurations(configId).pipe(concatMap(({
      allConfigs,
      currentConfig
    }) => this.logoffRevocationService.logoff(currentConfig, allConfigs, logoutAuthOptions)));
  }
  /**
   * Logs the user out of the application without logging them out of the server.
   * Use this method if you have _one_ config enabled.
   *
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   */
  logoffLocal(configId) {
    this.configurationService.getOpenIDConfigurations(configId).subscribe(({
      allConfigs,
      currentConfig
    }) => this.logoffRevocationService.logoffLocal(currentConfig, allConfigs));
  }
  /**
   * Logs the user out of the application for all configs without logging them out of the server.
   * Use this method if you have _multiple_ configs enabled.
   */
  logoffLocalMultiple() {
    this.configurationService.getOpenIDConfigurations().subscribe(({
      allConfigs
    }) => this.logoffRevocationService.logoffLocalMultiple(allConfigs));
  }
  /**
   * Revokes an access token on the Security Token Service. This is only required in the code flow with refresh tokens. If no token is
   * provided, then the token from the storage is revoked. You can pass any token to revoke.
   * https://tools.ietf.org/html/rfc7009
   *
   * @param accessToken The access token to revoke.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An observable when the action is finished
   */
  revokeAccessToken(accessToken, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.logoffRevocationService.revokeAccessToken(config, accessToken)));
  }
  /**
   * Revokes a refresh token on the Security Token Service. This is only required in the code flow with refresh tokens. If no token is
   * provided, then the token from the storage is revoked. You can pass any token to revoke.
   * https://tools.ietf.org/html/rfc7009
   *
   * @param refreshToken The access token to revoke.
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns An observable when the action is finished
   */
  revokeRefreshToken(refreshToken, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.logoffRevocationService.revokeRefreshToken(config, refreshToken)));
  }
  /**
   * Creates the end session URL which can be used to implement an alternate server logout.
   *
   * @param customParams
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns A string with the end session url or null
   */
  getEndSessionUrl(customParams, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(map((config) => this.urlService.getEndSessionUrl(config, customParams)));
  }
  /**
   * Creates the authorize URL based on your flow
   *
   * @param customParams
   * @param configId The configId to perform the action in behalf of. If not passed, the first configs will be taken
   *
   * @returns A string with the authorize URL or null
   */
  getAuthorizeUrl(customParams, configId) {
    return this.configurationService.getOpenIDConfiguration(configId).pipe(concatMap((config) => this.urlService.getAuthorizeUrl(config, customParams ? {
      customParams
    } : void 0)));
  }
};
OidcSecurityService.ɵfac = function OidcSecurityService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || OidcSecurityService)(ɵɵinject(CheckSessionService), ɵɵinject(CheckAuthService), ɵɵinject(UserService), ɵɵinject(TokenHelperService), ɵɵinject(ConfigurationService), ɵɵinject(AuthStateService), ɵɵinject(FlowsDataService), ɵɵinject(CallbackService), ɵɵinject(LogoffRevocationService), ɵɵinject(LoginService), ɵɵinject(RefreshSessionService), ɵɵinject(UrlService), ɵɵinject(AuthWellKnownService));
};
OidcSecurityService.ɵprov = ɵɵdefineInjectable({
  token: OidcSecurityService,
  factory: OidcSecurityService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OidcSecurityService, [{
    type: Injectable
  }], function() {
    return [{
      type: CheckSessionService
    }, {
      type: CheckAuthService
    }, {
      type: UserService
    }, {
      type: TokenHelperService
    }, {
      type: ConfigurationService
    }, {
      type: AuthStateService
    }, {
      type: FlowsDataService
    }, {
      type: CallbackService
    }, {
      type: LogoffRevocationService
    }, {
      type: LoginService
    }, {
      type: RefreshSessionService
    }, {
      type: UrlService
    }, {
      type: AuthWellKnownService
    }];
  }, null);
})();
var DefaultSessionStorageService = class {
  read(key) {
    return sessionStorage.getItem(key);
  }
  write(key, value) {
    sessionStorage.setItem(key, value);
  }
  remove(key) {
    sessionStorage.removeItem(key);
  }
  clear() {
    sessionStorage.clear();
  }
};
DefaultSessionStorageService.ɵfac = function DefaultSessionStorageService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DefaultSessionStorageService)();
};
DefaultSessionStorageService.ɵprov = ɵɵdefineInjectable({
  token: DefaultSessionStorageService,
  factory: DefaultSessionStorageService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultSessionStorageService, [{
    type: Injectable
  }], null, null);
})();
function createStaticLoader(passedConfig) {
  return new StsConfigStaticLoader(passedConfig.config);
}
var PASSED_CONFIG = new InjectionToken("PASSED_CONFIG");
var AuthModule = class _AuthModule {
  static forRoot(passedConfig) {
    return {
      ngModule: _AuthModule,
      providers: [
        // Make the PASSED_CONFIG available through injection
        {
          provide: PASSED_CONFIG,
          useValue: passedConfig
        },
        // Create the loader: Either the one getting passed or a static one
        passedConfig?.loader || {
          provide: StsConfigLoader,
          useFactory: createStaticLoader,
          deps: [PASSED_CONFIG]
        },
        ConfigurationService,
        PublicEventsService,
        FlowHelper,
        OidcSecurityService,
        TokenValidationService,
        PlatformProvider,
        CheckSessionService,
        FlowsDataService,
        FlowsService,
        SilentRenewService,
        LogoffRevocationService,
        UserService,
        RandomService,
        HttpBaseService,
        UrlService,
        AuthStateService,
        SigninKeyDataService,
        StoragePersistenceService,
        TokenHelperService,
        IFrameService,
        EqualityService,
        LoginService,
        ParService,
        AuthWellKnownDataService,
        AuthWellKnownService,
        DataService,
        StateValidationService,
        ConfigValidationService,
        CheckAuthService,
        ResetAuthDataService,
        ImplicitFlowCallbackService,
        HistoryJwtKeysCallbackHandlerService,
        ResponseTypeValidationService,
        UserCallbackHandlerService,
        StateValidationCallbackHandlerService,
        RefreshSessionCallbackHandlerService,
        RefreshTokenCallbackHandlerService,
        CodeFlowCallbackHandlerService,
        ImplicitFlowCallbackHandlerService,
        ParLoginService,
        PopUpLoginService,
        StandardLoginService,
        AutoLoginService,
        JwkExtractor,
        JwkWindowCryptoService,
        JwtWindowCryptoService,
        CurrentUrlService,
        ClosestMatchingRouteService,
        DefaultSessionStorageService,
        BrowserStorageService,
        CryptoService,
        LoggerService,
        {
          provide: AbstractSecurityStorage,
          useClass: DefaultSessionStorageService
        },
        {
          provide: AbstractLoggerService,
          useClass: ConsoleLoggerService
        }
      ]
    };
  }
};
AuthModule.ɵfac = function AuthModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AuthModule)();
};
AuthModule.ɵmod = ɵɵdefineNgModule({
  type: AuthModule,
  imports: [CommonModule, HttpClientModule]
});
AuthModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, HttpClientModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, HttpClientModule],
      declarations: [],
      exports: []
    }]
  }], null, null);
})();
var AutoLoginAllRoutesGuard = class {
  constructor(autoLoginService, checkAuthService, loginService, configurationService, router) {
    this.autoLoginService = autoLoginService;
    this.checkAuthService = checkAuthService;
    this.loginService = loginService;
    this.configurationService = configurationService;
    this.router = router;
  }
  canLoad() {
    return this.checkAuth(this.router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? "");
  }
  canActivate(route, state) {
    return this.checkAuth(state.url);
  }
  canActivateChild(route, state) {
    return this.checkAuth(state.url);
  }
  checkAuth(url) {
    return this.configurationService.getOpenIDConfiguration().pipe(switchMap((config) => {
      const allconfigs = this.configurationService.getAllConfigurations();
      return this.checkAuthService.checkAuth(config, allconfigs).pipe(take(1), map(({
        isAuthenticated
      }) => {
        if (isAuthenticated) {
          this.autoLoginService.checkSavedRedirectRouteAndNavigate(config);
        }
        if (!isAuthenticated) {
          this.autoLoginService.saveRedirectRoute(config, url);
          this.loginService.login(config);
        }
        return isAuthenticated;
      }));
    }));
  }
};
AutoLoginAllRoutesGuard.ɵfac = function AutoLoginAllRoutesGuard_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutoLoginAllRoutesGuard)(ɵɵinject(AutoLoginService), ɵɵinject(CheckAuthService), ɵɵinject(LoginService), ɵɵinject(ConfigurationService), ɵɵinject(Router));
};
AutoLoginAllRoutesGuard.ɵprov = ɵɵdefineInjectable({
  token: AutoLoginAllRoutesGuard,
  factory: AutoLoginAllRoutesGuard.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoLoginAllRoutesGuard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: AutoLoginService
    }, {
      type: CheckAuthService
    }, {
      type: LoginService
    }, {
      type: ConfigurationService
    }, {
      type: Router
    }];
  }, null);
})();
var AutoLoginPartialRoutesGuard = class {
  constructor(autoLoginService, authStateService, loginService, configurationService, router) {
    this.autoLoginService = autoLoginService;
    this.authStateService = authStateService;
    this.loginService = loginService;
    this.configurationService = configurationService;
    this.router = router;
  }
  canLoad() {
    return this.checkAuth(this.router.getCurrentNavigation()?.extractedUrl.toString().substring(1) ?? "");
  }
  canActivate(route, state) {
    return this.checkAuth(state.url);
  }
  canActivateChild(route, state) {
    return this.checkAuth(state.url);
  }
  checkAuth(url) {
    return this.configurationService.getOpenIDConfiguration().pipe(map((configuration) => {
      const isAuthenticated = this.authStateService.areAuthStorageTokensValid(configuration);
      if (isAuthenticated) {
        this.autoLoginService.checkSavedRedirectRouteAndNavigate(configuration);
      }
      if (!isAuthenticated) {
        this.autoLoginService.saveRedirectRoute(configuration, url);
        this.loginService.login(configuration);
      }
      return isAuthenticated;
    }));
  }
};
AutoLoginPartialRoutesGuard.ɵfac = function AutoLoginPartialRoutesGuard_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutoLoginPartialRoutesGuard)(ɵɵinject(AutoLoginService), ɵɵinject(AuthStateService), ɵɵinject(LoginService), ɵɵinject(ConfigurationService), ɵɵinject(Router));
};
AutoLoginPartialRoutesGuard.ɵprov = ɵɵdefineInjectable({
  token: AutoLoginPartialRoutesGuard,
  factory: AutoLoginPartialRoutesGuard.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoLoginPartialRoutesGuard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: AutoLoginService
    }, {
      type: AuthStateService
    }, {
      type: LoginService
    }, {
      type: ConfigurationService
    }, {
      type: Router
    }];
  }, null);
})();
var AuthInterceptor = class {
  constructor(authStateService, configurationService, loggerService, closestMatchingRouteService) {
    this.authStateService = authStateService;
    this.configurationService = configurationService;
    this.loggerService = loggerService;
    this.closestMatchingRouteService = closestMatchingRouteService;
  }
  intercept(req, next) {
    return interceptRequest(req, next.handle, {
      configurationService: this.configurationService,
      authStateService: this.authStateService,
      closestMatchingRouteService: this.closestMatchingRouteService,
      loggerService: this.loggerService
    });
  }
};
AuthInterceptor.ɵfac = function AuthInterceptor_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AuthInterceptor)(ɵɵinject(AuthStateService), ɵɵinject(ConfigurationService), ɵɵinject(LoggerService), ɵɵinject(ClosestMatchingRouteService));
};
AuthInterceptor.ɵprov = ɵɵdefineInjectable({
  token: AuthInterceptor,
  factory: AuthInterceptor.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthInterceptor, [{
    type: Injectable
  }], function() {
    return [{
      type: AuthStateService
    }, {
      type: ConfigurationService
    }, {
      type: LoggerService
    }, {
      type: ClosestMatchingRouteService
    }];
  }, null);
})();
function authInterceptor() {
  return (req, next) => {
    return interceptRequest(req, next, {
      configurationService: inject(ConfigurationService),
      authStateService: inject(AuthStateService),
      closestMatchingRouteService: inject(ClosestMatchingRouteService),
      loggerService: inject(LoggerService)
    });
  };
}
function interceptRequest(req, next, deps) {
  if (!deps.configurationService.hasAtLeastOneConfig()) {
    return next(req);
  }
  const allConfigurations = deps.configurationService.getAllConfigurations();
  const allRoutesConfigured = allConfigurations.map((x) => x.secureRoutes || []);
  const allRoutesConfiguredFlat = [].concat(...allRoutesConfigured);
  if (allRoutesConfiguredFlat.length === 0) {
    deps.loggerService.logDebug(allConfigurations[0], `No routes to check configured`);
    return next(req);
  }
  const {
    matchingConfig,
    matchingRoute
  } = deps.closestMatchingRouteService.getConfigIdForClosestMatchingRoute(req.url, allConfigurations);
  if (!matchingConfig) {
    deps.loggerService.logDebug(allConfigurations[0], `Did not find any configured route for route ${req.url}`);
    return next(req);
  }
  deps.loggerService.logDebug(matchingConfig, `'${req.url}' matches configured route '${matchingRoute}'`);
  const token = deps.authStateService.getAccessToken(matchingConfig);
  if (!token) {
    deps.loggerService.logDebug(matchingConfig, `Wanted to add token to ${req.url} but found no token: '${token}'`);
    return next(req);
  }
  deps.loggerService.logDebug(matchingConfig, `'${req.url}' matches configured route '${matchingRoute}', adding token`);
  req = req.clone({
    headers: req.headers.set("Authorization", "Bearer " + token)
  });
  return next(req);
}
export {
  AbstractLoggerService,
  AbstractSecurityStorage,
  AuthInterceptor,
  AuthModule,
  AutoLoginAllRoutesGuard,
  AutoLoginPartialRoutesGuard,
  ConfigurationService,
  EventTypes,
  LogLevel,
  OidcSecurityService,
  OpenIdConfigLoader,
  PASSED_CONFIG,
  PopUpService,
  PublicEventsService,
  StateValidationResult,
  StsConfigHttpLoader,
  StsConfigLoader,
  StsConfigStaticLoader,
  ValidationResult,
  authInterceptor,
  createStaticLoader
};
//# sourceMappingURL=angular-auth-oidc-client.js.map
