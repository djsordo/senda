/**
 * crear_usuario.ts -
 *
 *
 */
'use strict';
import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
import { environment } from '../mobile/src/environments/environment.js';
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app);
let usuarioRef = collection(firestore, 'usuarios');
let user = JSON.parse(readFileSync("cadete-femenino.json", { encoding: 'utf-8' }));
console.log("a punto de subir el fichero");
