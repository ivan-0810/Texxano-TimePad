import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { BASE_URL_API, ApiKey } from "./src/utils/settings";
import { store } from './src/redux/store/store';
import App from './App';
import * as Device from 'expo-device';
// import * as LocationModule from './src/utils/locationModule';

export function userId() {
    // grab current state
    const state = store.getState();
    const userId = state.userDataRole.userId;
    return userId;
}

let deviceName = Device.deviceName
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// NOTE: LocationModule code below is commented out and not used anymore
// LocationModule.enableDBLogger();
// const loadedConfig = LocationModule.setTrackingConfig({
//     "ios": {
//         "currentUserId": userId(), // Current user id to be saved on each location log, for redundancy if something goes wrong on upload and logs in with another account.
//         "targetUpdateFrequency": 60, // Target update frequency in seconds, higher the number, more battery life will be saved
//         "trackingMode": "continuos", // supported types: continuos|significant_distance, 
//         // continuos mode requests from the system to always send updates, this comes with a very bad downside that uses a lot of battery power, 
//         // significant_distance mode requests from the system only updates when user moved about 500m from the last location, and has a target update time of 5 minutes
//         "continuosTrackingModeMinDistance": 50 // this config requests from the system to not send location updates less that this value in meeters, use null to not use this feature, keep in mind that if used, then targetUpdateFrequency will be disabled.
//         // It should be used to save battery life
//     },
//     "android": {
//         "appMainBundleId": "texxano.v1.android", // App bundle id for android
//         "currentUserId": userId(), // Current user id to be saved on each location log, for redundancy if something goes wrong on upload and logs in with another account.
//         "targetUpdateFrequency": 180, // 3min, Target update frequency in seconds, higher the number, more battery life will be saved
//         "targetMaxUpdateFrequency": 900, // 15min, Sets the maximum time when batched location updates are delivered. Updates may be delivered sooner than this interval
//         "promptRetryPermissionTitle": "Allow location permissions",
//         "promptRetryPermissionMessage": "Location permission is needed in order to track and log device location!",
//         "promptDeniedPermissionTitle": "Location Permission Denied",
//         "promptDeniedPermissionMessage": "You have denied location permissions, Please allow location permissions in settings menu in order to track location!",
//         "serviceNotificationTitle": "Texxano",
//         "serviceNotificationMessage": "Logging Location ...",
//     }
// })
// if (!loadedConfig) {
//     console.log("There was an error loading LocationModule.setTrackingConfig, please check config!")
// }
// LocationModule.addOnLocationUpdatedListener((event) => {
//     let locations = event.locations
//     if (LocationModule.isTrackingLocation() && locations && locations.length) {
//         let geoData = {
//             collection: locations.map((location) => {
//                 return {
//                     //...location,
//                     latitude: location.latitude,
//                     longitude: location.longitude,
//                     moment: location.timestamp,
//                     device: deviceName,
//                 }
//             }),
//         }
//         var jsonBody = JSON.stringify(geoData)

//         // console.log("Post " + BASE_URL_API + "/gps/tracks/user/" + userId() + " ApiKey: " + ApiKey)
//         fetch(`${BASE_URL_API}/gps/tracks/user/${userId()}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'ApiKey': `${ApiKey}`
//             },
//             body: jsonBody
//         })
//             .then(async (response) => {
//                 console.log(response, "response")
                
//                 if (response.ok) {
//                     // const responseData = await response.body; // response empty
//                     console.log("DeviceEventEmitter onLocationUpdated: Finished uploading " + locations.length + " Locations data: ");
//                     LocationModule.dbLog("RN_index.js", "DeviceEventEmitter onLocationUpdated: Finished uploading " + locations.length + " Locations");
//                     LocationModule.deleteLocationUpdates(locations.map(location => location.objectID), (result) => {
//                         console.log("LocationModule.deleteLocationUpdates: result: " + result);
//                     });
//                 } else {
//                     // const errorData = await response.json();
//                     // console.log(errorData);
//                     LocationModule.dbLog("RN_index.js", "DeviceEventEmitter onLocationUpdated: Error uploading " + locations.length + " Locations");
//                     console.log("DeviceEventEmitter onLocationUpdated: Error uploading data, will retry next time!");
//                 }
//             })
//             .catch((error) => {
//                 // console.log(jsonBody)
//                 LocationModule.dbLog("RN_index.js", "DeviceEventEmitter onLocationUpdated: Error uploading " + locations.length + " Locations" + error);
//                 console.log("DeviceEventEmitter onLocationUpdated: Error uploading data, will retry next time!", error);
//             });

//     } else if (!locations || locations.length == 0) {
//         console.log("Info: DeviceEventEmitter onLocationUpdated triggered, but locations is: " + JSON.stringify(locations));
//     } else {
//         console.log("Info: DeviceEventEmitter onLocationUpdated triggered, but location tracking is off, nothing to do!");
//     }
// });
