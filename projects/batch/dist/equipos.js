var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { collection, getDocs, query } from 'firebase/firestore';
import { writeFileSync } from 'fs';
import { Interfaz, doNothing } from './interfaz.js';
export function menuEquipos(firestore) {
    return __awaiter(this, void 0, void 0, function* () {
        let interfaz = Interfaz.getInstance();
        return interfaz.menu('Equipos', [{ value: 1, name: 'Lista de equipos', action: listaEquipos, arg: firestore },
            { value: 0, name: 'Salir', action: doNothing }]);
    });
}
function listaEquipos(firestore) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let interfaz = Interfaz.getInstance();
            getDocs(query(collection(firestore, 'equipos')))
                .then((qSnap) => {
                let allEquipos = [];
                for (let doc of qSnap.docs) {
                    console.log(doc.data());
                    allEquipos.push(doc.data());
                }
                console.log('he terminado el for y regreso de la promesa');
                writeFileSync('lista_equipos.json', JSON.stringify(allEquipos, null, 2));
            });
        });
    });
}
