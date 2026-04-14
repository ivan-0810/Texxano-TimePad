import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Modal,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import DatePicker from "react-native-neat-date-picker";
import { FormattedMessage } from "react-intl";
import * as Location from "expo-location";

import http from "../../services/http";
import { dateFormat } from "../../utils/dateFormat";
import FormatDateTime from "../../components/FormatDateTime";

const isValidCoordinate = (pos) =>
  pos &&
  typeof pos.latitude === "number" &&
  typeof pos.longitude === "number" &&
  !isNaN(pos.latitude) &&
  !isNaN(pos.longitude);

const GpsTrackView = () => {
  const [search, setSearch] = useState("");
  const [requestApi, setRequestApi] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [positionStart, setPositionStart] = useState({});
  const [positionFinish, setPositionFinish] = useState({});
  const [userSelecet, setUserSelecet] = useState({});
  const [selestUserId, setSelestUserId] = useState("");
  const [showTrackTime, setShowTrackTime] = useState(false);
  const [infoOpen, setInfoOpen] = useState(null);
  const [centerMap, setCenterMap] = useState({
    latitude: 41.429728,
    longitude: 20.486272,
  });

  useEffect(() => {
    getDataUserGps(selestUserId);
  }, [date]);

  const getSuggestionValue = (suggestion) => {
    setSelestUserId(suggestion.id);
    getDataUserGps(suggestion.id);
    const val = `${suggestion.firstName} ${suggestion.lastName}`;
    setUserSelecet(suggestion);
    return val;
  };

  const getDataUserGps = async (id) => {
    let path1 = `/gps/tracks/user/${id}`;
    let path2 = `/gps/tracks`;
    if ( date) { 
      try {
        setRequestApi(true);
        const response = await http.get(`${id ? path1 : path2}?date=${dateFormat(date)}`);
        setRequestApi(false);
        setData(response);
        setPositionStart(response[0]);
        setPositionFinish(response[response?.length - 1]);
        if (response.length && isValidCoordinate(response[response.length - 1])) {
          setCenterMap({
            latitude: response[response.length - 1]?.latitude,
            longitude: response[response.length - 1]?.longitude,
          });
        }
        setInfoOpen(null);
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setCenterMap({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.log(error);
      }
    };
    checkLocationPermission();
  }, []);

  const handleToggle = (index) => {
    setInfoOpen(index);
  };

  const handleOpenPicker = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    if (date) {
      setDate(date.date);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={true} visible={showDatePicker}>
        <DatePicker
          colorOptions={{ headerColor: "#2196F3" }}
          isVisible={showDatePicker}
          mode={"single"}
          onCancel={() => setShowDatePicker(false)}
          onConfirm={onConfirm}
          maxDate={new Date()}
        />
      </Modal>

      <View>
        <TouchableOpacity
          onPress={handleOpenPicker}
          style={{
            width: "100%",
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 10,
            borderWidth: 1,
            marginBottom: 10,
          }}
        >
          <Text>
            {date ? (
              <FormatDateTime datevalue={date} type={1} />
            ) : (
              <FormattedMessage id="Date" />
            )}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderColor: "#ccc",
            borderRadius: 4,
            paddingLeft: 10,
            paddingVertical: 5,
            borderWidth: 1,
            marginBottom: 10,
          }}
        >
          <Text>Show Marker </Text>
          <Switch
            trackColor={{ false: "#7d7d7d", true: "#429cfc" }}
            thumbColor={showTrackTime ? "#007bff" : "#f4f3f4"}
            ios_backgroundColor="#7d7d7d"
            value={showTrackTime}
            onValueChange={setShowTrackTime}
          />
        </View>
      </View>

      {requestApi && <ActivityIndicator size="large" color="#6c757d" />}

      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={{ flex: 1, height: 600 }}
        region={{
          latitude: centerMap.latitude,
          longitude: centerMap.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {data?.length > 0 && (
          <>
            <Polyline
              coordinates={data.filter(isValidCoordinate).map((item) => ({
                latitude: item.latitude,
                longitude: item.longitude,
              }))}
              strokeWidth={5}
              strokeColor="#00b0ff"
            />

            {isValidCoordinate(positionStart) && (
              <Marker
                coordinate={{
                  latitude: positionStart.latitude,
                  longitude: positionStart.longitude,
                }}
              >
                <Callout>
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontWeight: "500" }}>Start</Text>
                    <Text>
                      <FormatDateTime datevalue={positionStart.moment} type={2} />
                    </Text>
                    <Text>{positionStart.device}</Text>
                  </View>
                </Callout>
              </Marker>
            )}

            {isValidCoordinate(positionFinish) && (
              <Marker
                coordinate={{
                  latitude: positionFinish.latitude,
                  longitude: positionFinish.longitude,
                }}
              >
                <Callout>
                  <View>
                    <Text>Stop</Text>
                    <Text>
                      <FormatDateTime datevalue={positionFinish.moment} type={2} />
                    </Text>
                    <Text>{positionFinish.device}</Text>
                  </View>
                </Callout>
              </Marker>
            )}

            {showTrackTime &&
              data.map((item, index) =>
                isValidCoordinate(item) ? (
                  <Marker
                    key={index}
                    coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                    onPress={() => handleToggle(index)}
                  >
                    {infoOpen === index && (
                      <Callout>
                        <View>
                          <Text>{dateFormat(item.moment)}</Text>
                          <Text>{item.device}</Text>
                        </View>
                      </Callout>
                    )}
                  </Marker>
                ) : null
              )}
          </>
        )}
      </MapView>
    </View>
  );
};

export default GpsTrackView;
