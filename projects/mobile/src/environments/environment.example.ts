// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "PUT-HERE-YOUR-API-KEY",
    authDomain: "PUT-HERE-YOUR-AUTH-DOMAIN",
    projectId: "PUT HERE YOUR PROJECT ID",
    storageBucket: "PUT HERE YOUR STORAGE BUCKET",
    messagingSenderId: "PUT HERE YOUR MESSAGING SENDER ID",
    appId: "PUT HERRE YOUR APP ID",
    measurementId: "PUT HERE YOUR MEASUREMENT ID"
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
