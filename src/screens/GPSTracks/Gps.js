import React, { useState, useEffect } from "react";
import { Text, View, Switch, Platform } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ModalPermission from "./components/ModalPermission";
// import * as LocationModule from "../../utils/locationModule";
import * as Location from "expo-location";
import ModalErrorPermission from "./components/ModalErrorPermission";
// import { LocationModuleDebugModal } from "../../utils/locationModule";

const GPS = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  // const [locationModuleDebugModalVisible, setLocationModuleDebugModalVisible] = useState(false);
  const [locationTracking, setLocationTracking] = useState(
    // LocationModule.isTrackingLocation() == 1
    false
  );

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const listener = Location.addOnLocationTrackingStatusUpdatedListener((event) => {
      console.log(
        "received event onLocationTrackingStatusUpdated locationTracking: " +
          event.status
      );
      setLocationTracking(event.status);
    });
    
    // Cleanup listener on unmount
    return () => {
      if (listener && listener.remove) {
        listener.remove();
      }
    };
  }, []);

  const handleEnableLocation = async () => {
    try {
      const { granted: backgroundStatus} = await Location.getBackgroundPermissionsAsync();
      const { granted:foregroundStatus} = await Location.getForegroundPermissionsAsync();
      
      if (locationTracking) {
        // Stop tracking
        const result = Location.toggleLocationUpdates();
        setLocationTracking(result == 1);
      } else {
        // Start tracking
        if(foregroundStatus && backgroundStatus) {
          const result = Location.toggleLocationUpdates();
          setLocationTracking(result == 1);
        } else {
          setModalVisible(true);
        }
      }
    } catch (error) {
      // Reset state on error
      setLocationTracking(Location.isTrackingLocation() == 1);
    }
  };

  
  const handleConfirm = async () => {
    try {
      let { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== "granted") {
        setErrorMsg("Foreground location permission denied");
        return;
      }

      // Request background location permission
      let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        setErrorMsg("Background location permission denied");
        return;
      }
      
      // Start location tracking after permissions granted
      const result = Location.toggleLocationUpdates();
      setLocationTracking(result == 1);
    } catch (error) {
      setModalErrorVisible(true);
      setErrorMsg(error.message);
    }

    setModalVisible(false);
  };



  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#ebf0f3",
          backgroundColor: "#ebf0f3",
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Entypo name="location" size={20} color="#6c757d" />
        <Text
          style={{
            fontSize: 20,
            color: "#6c757d",
            fontWeight: "600",
            marginHorizontal: 10,
          }}
        >
          Location Tracking
        </Text>
        <Switch
          trackColor={{ false: "#7D7D7D", true: "#429CFC" }}
          thumbColor={locationTracking ? "#007BFF" : "#F4F3F4"}
          ios_backgroundColor="#7D7D7D"
          onValueChange={() => Platform.OS === "ios" ? handleConfirm() : handleEnableLocation()}
          value={locationTracking}
          style={{
            transform: [
              { scaleX: Platform.OS === "ios" ? 1 : 1.2 },
              { scaleY: Platform.OS === "ios" ? 1 : 1.2 },
            ],
          }}
        />
      </View>
      {/* {process.env.NODE_ENV === 'development' &&
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', backgroundColor: '#F8F9FA', marginTop: 10 }}>
                    <Text style={{ paddingLeft: 18, fontSize: 18, marginRight: 20 }}><Entypo name="location" size={20} color="#111" /> Location Logs </Text>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => LocationModule.copyLatestLogsOnClipboard()}>
                        <Text>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setLocationModuleDebugModalVisible(true)}>
                        <Text>Debug</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => LocationModule.deleteAllDBLogs()}>
                        <Text style={{ color: "#f00" }}>Clear</Text>
                    </TouchableOpacity>
                </View>} */}
      <ModalErrorPermission
        modalVisible={modalErrorVisible}
        setModalVisible={setModalErrorVisible}
        message={errorMsg}
      />
      <ModalPermission
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleConfirm={handleConfirm}
      />
      {/* {process.env.NODE_ENV === 'development' && <LocationModuleDebugModal
                react={React}
                isVisible={locationModuleDebugModalVisible}
                onClose={() => setLocationModuleDebugModalVisible(false)}
            />} */}
    </>
  );
};
export default GPS;
