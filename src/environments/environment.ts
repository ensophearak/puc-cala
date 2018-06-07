// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ABA_PAYWAY_API_URL:'https://payway-dev.ababank.com/api/pwpucp/',
  ABA_PAYWAY_API_KEY:'1be5670f9087eb7a33a67a1e71ddba72',
  ABA_PAYWAY_MERCHANT_ID:'puc',
  // ABA_PAYWAY_API_URL:'https://payway.ababank.com/api/pwpannasastrapuniversityucambodiac/',
  // ABA_PAYWAY_API_KEY:'139e5514955e4fc5266bcd0447663937',
  // ABA_PAYWAY_MERCHANT_ID:'pannasastrauniversitycambodia',
  firebase: {
    apiKey: "AIzaSyDNR_RhQ9meMX1DJ57djE0D7Zq40zFaK6s",
    authDomain: "puccala-b98b9.firebaseapp.com",
    databaseURL: "https://puccala-b98b9.firebaseio.com",
    projectId: "puccala-b98b9",
    storageBucket: "puccala-b98b9.appspot.com",
    messagingSenderId: "542900956091"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
