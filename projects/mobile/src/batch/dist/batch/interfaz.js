var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as readline from 'readline';
export class Option {
}
;
export function doNothing() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            console.log('en construccion');
            resolve(null);
        });
    });
}
export function doExit() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            resolve(null);
        });
    });
}
export class Interfaz {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    static getInstance() {
        if (!Interfaz.instance)
            Interfaz.instance = new Interfaz();
        return Interfaz.instance;
    }
    writeLine(line) {
        if (line)
            this.rl.write(line);
        this.rl.write('\n');
    }
    pickupInt(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.rl.question(`${prompt}: `, (answer) => {
                    let intVal = parseInt(answer);
                    if (isNaN(intVal)) {
                        this.writeLine('Opción incorrecta, debe ser un valor numérico');
                        resolve(this.pickupInt(prompt));
                    }
                    else
                        resolve(intVal);
                });
            });
        });
    }
    pickupString(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.rl.question(`${prompt}: `, (answer) => {
                    resolve(answer);
                });
            });
        });
    }
    menu(title, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedOption = null;
            while (selectedOption === null) {
                /* xjx selectedOption = */ yield this.showMenuWaitForAnswer(title, options)
                    .then((answer) => {
                    selectedOption = new Promise((resolve) => {
                        if (answer === null || answer === void 0 ? void 0 : answer.obj) {
                            if (answer === null || answer === void 0 ? void 0 : answer.arg)
                                answer.action.apply(answer.obj)
                                    .then((val) => { resolve(answer); });
                            else
                                answer.action.apply(answer.obj)
                                    .then((val) => { resolve(answer); });
                        }
                        else {
                            if (answer === null || answer === void 0 ? void 0 : answer.arg)
                                answer.action(answer.arg)
                                    .then((val) => { resolve(answer); });
                            else
                                answer.action()
                                    .then((val) => { resolve(answer); });
                        }
                    });
                })
                    .catch((answer) => {
                    console.log(`Opción incorrecta (${answer})`);
                    console.log("");
                });
            }
            return selectedOption;
        });
    }
    showMenuWaitForAnswer(title, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.showMenu(title, options);
                this.pickupInt('Selección')
                    .then((userValue) => {
                    resolve(options.find((val) => { return val.value === userValue; }));
                });
            });
        });
    }
    showMenu(title, options) {
        this.writeLine();
        this.writeLine(title);
        this.writeLine();
        for (let option of options) {
            this.writeLine(`${option.value} - ${option.name}`);
        }
        this.writeLine();
    }
    close() {
        this.rl.close();
    }
}
