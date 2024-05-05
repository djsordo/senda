import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { environment } from '../mobile/src/environments/environment';
import { Interfaz, doNothing, doExit } from './interfaz.js';
import { menuDeportes } from './deportes.js';
import { menuEquipos } from './equipos.js';
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app);
function mainLoop() {
    let iface = Interfaz.getInstance();
    iface.menu('Menu Principal', [{ value: 1, name: 'Deportes', action: menuDeportes, arg: firestore },
        { value: 2, name: 'Equipos', action: menuEquipos, arg: firestore },
        { value: 3, name: 'Partidos', action: doNothing },
        { value: 4, name: 'Usuarios', action: doNothing },
        { value: 0, name: 'Salir', action: doExit }])
        .then((value) => {
        if (value.value !== 0)
            mainLoop();
        else
            iface.close();
    });
}
mainLoop();
