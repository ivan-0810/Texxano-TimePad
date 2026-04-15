import React from "react";
import { NavigationService } from "../../../navigator";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { FormattedMessage } from "react-intl";


const HeaderProfile = ({ location }) => {
  const state = useSelector((state) => state);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerProfile}>
          <TouchableOpacity
            style={location === "Profile" ? styles.test : styles.test2}
            onPress={() => {
              NavigationService.navigate("Profile", {});
            }}
          >
            <Text style={location === "Profile" ? styles.title : styles.title2}>
              <FormattedMessage id="users.profile.title" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={location === "Password" ? styles.test : styles.test2}
            onPress={() => {
              NavigationService.navigate("Password", {});
            }}
          >
            <Text
              style={location === "Password" ? styles.title : styles.title2}
            >
              <FormattedMessage id="login.form.password.placeholder" />
            </Text>
          </TouchableOpacity>
     
        </View>
      </View>

    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 80,
    backgroundColor: "#ebf0f3",
    marginBottom: 10,
    borderRadius: 10,
  },
  headerProfile: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ebf0f3",
    justifyContent: "flex-start",
    minHeight: 60,
  },
  test: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    color: "#007bff",
    marginHorizontal: 6,
    marginVertical: 4,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  test2: {
    marginHorizontal: 6,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#007bff",
    fontSize: 16,
  },
  title2: {
    color: "#21252980",
    fontSize: 16,
  },
});

export default HeaderProfile;
