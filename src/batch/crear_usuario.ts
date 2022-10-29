/**
 * app2.ts - 
 * 
 * 
 */
'use strict'; 

import { writeFileSync, readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { collection, 
        doc, 
        DocumentData, 
        getDocs, 
        getFirestore, 
        query, 
        QuerySnapshot,
        setDoc} from 'firebase/firestore';

import { environment } from '../environments/environment.js';


// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore( app );

let usuarioRef = collection( firestore, 'usuarios' );

let user = JSON.parse(
    readFileSync( "cadete-femenino.json", { encoding: 'utf-8' } ) );

setDoc( doc( firestore, 'usuarios', user.id ), user );





