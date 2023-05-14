import { DocumentData, 
        DocumentReference } from "firebase/firestore";


export interface Club {
  id?: string;
  deporte?: DocumentReference<DocumentData>;
  nombre: string;
}
