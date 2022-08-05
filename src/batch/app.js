"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var environment_1 = require("./environment");
var readline = require('readline');
var Option = /** @class */ (function () {
    function Option() {
    }
    return Option;
}());
;
// Initialize Firebase
var app = (0, app_1.initializeApp)(environment_1.environment.firebaseConfig);
var firestore = (0, firestore_1.getFirestore)(app);
var partidoRef = (0, firestore_1.query)((0, firestore_1.collection)(firestore, 'partidos'));
console.log(partidoRef);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function doNothing() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('en construccion');
            return [2 /*return*/];
        });
    });
}
function showMenu(title, options) {
    console.log(title);
    console.log('');
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        console.log("".concat(option.value, " - ").concat(option.name));
    }
    console.log('');
}
function showMenuWaitForAnswer(title, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    showMenu(title, options);
                    rl.question('Selección> ', function (answer) {
                        var selectedOption = options.find(function (val) { return val.value === parseInt(answer); });
                        if (selectedOption)
                            resolve(selectedOption);
                        else
                            reject(answer);
                    });
                })];
        });
    });
}
function menu(title, options) {
    return __awaiter(this, void 0, void 0, function () {
        var wantsToExit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wantsToExit = false;
                    _a.label = 1;
                case 1:
                    if (!!wantsToExit) return [3 /*break*/, 3];
                    return [4 /*yield*/, showMenuWaitForAnswer(title, options)
                            .then(function (answer) {
                            if (answer.value === 0) {
                                wantsToExit = true;
                            }
                            else {
                                answer.action();
                            }
                        })["catch"](function (answer) {
                            console.log("Opci\u00F3n incorrecta (".concat(answer, ")"));
                            console.log("");
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function menuPrincipal() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, menu('Menu Principal', [{ value: 1, name: 'Equipos', action: menuEquipos },
                        { value: 2, name: 'Partidos', action: doNothing },
                        { value: 3, name: 'Usuarios', action: doNothing },
                        { value: 0, name: 'Salir', action: doNothing }])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function menuEquipos() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, menu('Equipos', [{ value: 1, name: 'Alta equipo', action: doNothing },
                        { value: 0, name: 'Salir', action: doNothing }])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, menuPrincipal()];
            case 1:
                _a.sent();
                rl.close();
                return [2 /*return*/];
        }
    });
}); };
// main();
var perico = readline();
console.log(perico);
