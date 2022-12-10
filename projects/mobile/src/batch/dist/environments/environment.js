// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
    production: false,
    // actualizaciones de la versión deben trasladarse a
    // android/app/build.gradle para que sea coherente 
    // con el bundle que generemos para google
    version: "1.1.13",
    firebaseConfig: {
        apiKey: "AIzaSyBwKFZtaBY0DkbB_BcfQjuDjjNFDiBbOAo",
        authDomain: "sendaestadisticas-com-desa.firebaseapp.com",
        projectId: "sendaestadisticas-com-desa",
        storageBucket: "sendaestadisticas-com-desa.appspot.com",
        messagingSenderId: "904144866366",
        appId: "1:904144866366:web:0b88a3bfd4b5da8a76556f"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
