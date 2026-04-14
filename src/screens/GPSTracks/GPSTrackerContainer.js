/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FormattedMessage } from "react-intl";
import { Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

// Redux
import { NavigationService } from "../../navigator";

// Components
import GPSUserConfigList from "./GPSUserConfigList";
import GpsTrackView from "./GpsTrackView";

import { styles } from "../../asset/style/components/header";
import AppContainerClean from "../../components/AppContainerClean";

const GPSTrackerContainer = (route) => {
  const { locationActive, id } = route.navigation.state.params;

  const state = useSelector((state) => state);
  const gpsEnabled = state.userDataModule?.gpsEnabled;
  const gpsIsSupervisor = state.userDataModule?.gpsIsSupervisor;

  return (
    <AppContainerClean location={"Gps"}>
      {(() => {
        if (gpsEnabled) {
          return (
            <>
              <View style={{ zIndex: 9999 }}>
                {gpsIsSupervisor ? (
                  <View style={styles.viewHeader}>
                    <TouchableOpacity
                      style={locationActive === "" ? styles.box : styles.box2}
                      onPress={() => {
                        NavigationService.navigate("Gps", {
                          locationActive: "",
                        });
                      }}
                    >
                      <Text
                        style={
                          locationActive === "" ? styles.title : styles.title2
                        }
                      >
                        <FormattedMessage id="gps.track.title" />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={locationActive === "1" ? styles.box : styles.box2}
                      onPress={() => {
                        NavigationService.navigate("Gps", {
                          locationActive: "1",
                        });
                      }}
                    >
                      <Text
                        style={
                          locationActive === "1" ? styles.title : styles.title2
                        }
                      >
                        <FormattedMessage id="Users.Configurations.List" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <View>
                  {(() => {
                    if (locationActive === "1") {
                      return <GPSUserConfigList />;
                    } else if (locationActive === "2") {
                      return <GpsTrackView id={id} />;
                    } else {
                      return <GpsTrackView />;
                    }
                  })()}
                </View>
              </View>
            </>
          );
        } else if (gpsEnabled === false) {
          return <View />;
        }
      })()}
    </AppContainerClean>
  );
};

export default GPSTrackerContainer;
