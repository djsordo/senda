var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export class Menu {
    constructor(title, options) {
        this.title = title;
        this.options = options;
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            let selectedOption = null;
            while (selectedOption === null) {
                yield this.showMenuWaitForAnswer()
                    .then((answer) => {
                    //selectedOption = answer;
                    selectedOption = new Promise((resolve) => {
                        if (answer.arg)
                            answer.action(answer.arg)
                                .then((val) => { resolve(val); });
                        else
                            answer.action()
                                .then((val) => { resolve(val); });
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
    showMenuWaitForAnswer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.showMenu();
                // rl.question( 'Selección> ', (answer : string) =>
                //       {
                //         let selectedOption = this.options.find( (val) => val.value === parseInt(answer) );
                //         if( selectedOption )
                //           resolve( selectedOption );
                //         else
                //           reject( answer );
                //       });
            });
        });
    }
    showMenu() {
        console.log('');
        console.log(this.title);
        console.log('');
        for (let option of this.options) {
            console.log(`${option.value} - ${option.name}`);
        }
        console.log('');
    }
}
