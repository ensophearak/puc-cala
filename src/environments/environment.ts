// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ABA_PAYWAY_API_URL:'https://payway-dev.ababank.com/api/pwpucp/',
  ABA_PAYWAY_API_KEY:'1be5670f9087eb7a33a67a1e71ddba72',
  ABA_PAYWAY_MERCHANT_ID:'puc'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
