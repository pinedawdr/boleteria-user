// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  supabase: {
    url: 'https://leutzrifzycrctdgbmqk.supabase.co',
    publicKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldXR6cmlmenljcmN0ZGdibXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjUwMDksImV4cCI6MjA1NzQ0MTAwOX0.Q0zn9vVm_oLZ-LZxAlUkd4Q7kDoksCBsPMt-r9OTqvE'
  },
  baseApiUrl: 'https://leutzrifzycrctdgbmqk.supabase.co/rest/v1',
  apiUrl: 'http://localhost:3000/api',
  appName: 'Boletería',
  appVersion: '1.0.0',
  defaultLanguage: 'es',
  theme: {
    default: 'dark',
    storageKey: 'boleteria-theme'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI. 