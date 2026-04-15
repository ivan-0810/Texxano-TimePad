import React from "react";
import { FormattedMessage } from "react-intl";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  MaterialCommunityIcons,
  AntDesign,
  Fontisto,
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
  FontAwesome6
} from "@expo/vector-icons";

import {
  logout,
  logoutAll,
} from "../../redux/actions/Authentication/userAuth.actions";
import {
  deleteByIdDevice,
  deleteAllDevice,
} from "../../redux/actions/Notifications/devices.actions";

import { NavigationService } from "../../navigator";
import LanguageSelect from "../LanguageSelect";
import { check } from "../../utils/statusUser";
import { styles } from '../../asset/style/components/sidebar'

const Sidebar = ({ isOpen, toggleDrawer, location }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const refreshToken = state.userToken.refreshToken;

  const userId = state.userDataRole.userId;
  const idDevice = state.idDevice.idDevice;


  const timeTrackerEnabled = state.userDataModule?.timeTrackerEnabled;


  const handleCloseDrawer = () => {
    if (isOpen) {
      toggleDrawer();
    }
  };

  const handleLogoutAll = () => {
    dispatch(deleteAllDevice());
    dispatch(logoutAll());
  };
  const handleLogout = () => {
    if (idDevice) {
      dispatch(deleteByIdDevice(idDevice));
    }
    if (!refreshToken || !userId) {
      dispatch(logout());
      return;
    }

    const payload = {
      token: refreshToken,
      userId,
    };

    dispatch(logout(payload));
  };

  return (
    <View style={[styles.drawerContainer, isOpen ? styles.open : null]}>
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => handleCloseDrawer()}
        />
      )}
      <View style={styles.container}>
        {isOpen && (
          <View style={styles.drawer}>
            <ScrollView>
              <View style={{marginBottom: 250}}>
                <TouchableOpacity
                  onPress={() => {
                    handleCloseDrawer();
                    NavigationService.navigate("Dashboard");
                  }}
                  style={[styles.drawerItem, { backgroundColor: location === 'Dashboard' ? '#ebf0f3' : 'f9fafb' }]}
                >
                  <MaterialCommunityIcons name="folder-home-outline" size={20} color="#6c757d" />
                  <Text style={styles.itemNavigate}>
                    <FormattedMessage id="dashboard.title" />
                  </Text>
                </TouchableOpacity>
                {/* {timeTrackerEnabled ? (
                  <TouchableOpacity
                    onPress={() => {
                      handleCloseDrawer();
                      NavigationService.navigate("Time", {
                        locationActive: "",
                      });
                    }}
                    style={[styles.drawerItem, { backgroundColor: location === 'Time' ? '#ebf0f3' : 'f9fafb' }]}
                  >
                    <MaterialCommunityIcons
                      name="account-clock-outline"
                      size={20}
                      color="#6c757d"
                    />
                    <Text style={styles.itemNavigate}>
                      <FormattedMessage id="Time.Tracks" />
                    </Text>
                  </TouchableOpacity>
                ) : null} */}

               
                {/* <TouchableOpacity
                  onPress={() => {
                    handleCloseDrawer();
                    NavigationService.navigate("Report", {
                      location: "Dashboard",
                    });
                  }}
                  style={[styles.drawerItem, { backgroundColor: location === 'Report' ? '#ebf0f3' : 'f9fafb' }]}
                >
                  <AntDesign name="filetext1" size={20} color="#6c757d" />
                  <Text style={styles.itemNavigate}>
                    <FormattedMessage id="projects.reports" />
                  </Text>
                </TouchableOpacity> */}
       
              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <LanguageSelect />

              <TouchableOpacity
                onPress={() => {
                  handleCloseDrawer();
                  NavigationService.navigate("Profile", { locationActive: "" });
                }}
                style={[styles.drawerItemBottom, { backgroundColor: location === 'Profile' ? '#ebf0f3' : 'f9fafb' }]}
              >
                <MaterialIcons
                  name="manage-accounts"
                  size={20}
                  color="#6c757d"
                />
                <Text style={styles.itemNavigate}>
                  <FormattedMessage id="user.account.settings" />
                </Text>
              </TouchableOpacity>
         
              <TouchableOpacity
                onPress={() => {
                  handleCloseDrawer();
                  handleLogout();
                }}
                style={styles.drawerItemBottom}
              >
                <Feather name="log-out" size={20} color="#f44336" />
                <Text style={[styles.itemNavigate, {}]}>
                  <FormattedMessage id="common.button.logout" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleCloseDrawer();
                  handleLogoutAll();
                }}
                style={styles.drawerItemBottom}
              >
                <Feather name="log-out" size={20} color="#f44336" />
                <Text style={[styles.itemNavigate, { fontSize: 14 }]}>
                  <FormattedMessage id="common.button.logout.all" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sidebar;
