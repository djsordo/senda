var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { doc, setDoc } from 'firebase/firestore';
import { Interfaz, doNothing, doExit } from './interfaz.js';
export function menuDeportes(firestore) {
    return __awaiter(this, void 0, void 0, function* () {
        let deportes = new Deportes(firestore);
        let interfaz = Interfaz.getInstance();
        return interfaz.menu('Deportes', [{ value: 1, name: 'Alta deporte', obj: deportes, action: deportes.addDeporte },
            { value: 2, name: 'Baja deporte', action: doNothing },
            { value: 0, name: 'Salir', action: doExit }]);
    });
}
class Deportes {
    constructor(firestore) {
        this.firestore = firestore;
        this.interfaz = Interfaz.getInstance();
    }
    addDeporte() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.interfaz.pickupString("Nombre del deporte")
                    .then((typedValue) => {
                    setDoc(doc(this.firestore, "deportes", typedValue), { nombre: typedValue })
                        .then((val) => resolve(val))
                        .catch((reason) => reject(reason));
                });
            });
        });
    }
}
