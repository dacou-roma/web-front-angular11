// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host:"http://localhost:3000",
  unreachablehost:"http://localhost:8000",
  firebaseConfig : {
    apiKey: "AIzaSyCFOw2tcce9ORj2ab9b8hCEtJEMcBAtLW0",
    authDomain: "web-front-angular.firebaseapp.com",
    databaseURL: "https://web-front-angular-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-front-angular",
    storageBucket: "web-front-angular.appspot.com",
    messagingSenderId: "491500581592",
    appId: "1:491500581592:web:aea82170cda54fdcce1dad",
    measurementId: "G-85YEVR24MM"
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
