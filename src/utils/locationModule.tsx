/**
 * this class is a wrapper for texxano-location-module itemsp
 */

import { View, Modal, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import * as LocationModule from "@texxanodev/texxano-location-module";

// const LocationModule = (async () => {
//   try {
//     return await import("texxano-location-module");
//   } catch (e) {
//     console.log(
//       "Unable to import native module texxano-location-module, location features will not be enabled!"
//     );
//     console.log(e);
//   }
// })();

function isNativeLocationModuleLoaded(): boolean {
  //  console.log("Type of LocationModule.isTrackingLocation: ", JSON.stringify(LocationModule.isTrackingLocation()))
  //return typeof LocationModule.isTrackingLocation === "function";//
  return false;
}

export function stopLocationUpdates(): void {
  if (isNativeLocationModuleLoaded()) {
    // eturn LocationModule.stopLocationUpdates();
    return;
  }
}

export function setTrackingConfig(config: object): string {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.setTrackingConfig(config);
    return;
  }
}

export function toggleLocationUpdates(): string {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.toggleLocationUpdates();
    return;
  } else {
    Alert.alert("Warning!!!", "Native location module has not been loaded!")
  }
}

export function isTrackingLocation(): boolean {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule?.isTrackingLocation();
    return;
  }
}

export function deleteLocationUpdates(objectIds: string[]): boolean {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.deleteLocationUpdates(objectIds);
    return;
  }
}

export function getAllStoredLocations(): Array<object> {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.getAllStoredLocations();
    return;
  }
}

export function enableDBLogger() {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.enableDBLogger();
    return;
  }
}

export function disableDBLogger() {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.disableDBLogger();
    return;
  }
}

export function isDBLoggerEnabled() {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.isDBLoggerEnabled();
    return;
  }
}

export function deleteAllDBLogs() {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.deleteAllDBLogs();
    return;
  }
}

export function dbLog(tag: string, message: string) {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.dbLog(tag, message);
    return;
  }
}

export function getAllDBLogs() {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.getAllDBLogs();
    return;
  }
}

export function copyLatestLogsOnClipboard() {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.copyLatestLogsOnClipboard();
    return;
  }
}

export function addOnLocationUpdatedListener(
  listener: (event: object) => void
): object {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.addOnLocationUpdatedListener(listener)
    return;
  }
}

export function addOnLocationTrackingStatusUpdatedListener(
  listener: (event: object) => void
): object {
  if (isNativeLocationModuleLoaded()) {
    // return LocationModule.addOnLocationTrackingStatusUpdatedListener(listener);
    return;
  }
}

export const LocationModuleDebugModal = isNativeLocationModuleLoaded()
  // ? LocationModule?.LocationModuleDebugModal
  ? false
  : ({ isVisible, onClose, react }) => (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text>Native location module has not been loaded!</Text>
            </View>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.button}
                onPress={onClose}
              >
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aa000000",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 330,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  modalHeader: {
    verticalAlign: "middle",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal:10,
    marginVertical: 20
  },
  button: {
    borderRadius: 5,
    padding: 5,
    elevation: 2,
    backgroundColor: "#2196F3",
  }
});
