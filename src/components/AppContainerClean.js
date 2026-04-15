import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, Platform, AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {  useDispatch, connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { languageObject } from "../translations";
import { getMe } from "../redux/actions/UsersTeams/user.actions";
import Header from "./Header/Header";
import HeaderLogin from "./Header/HeaderLogin";
import NotAuthorized from "./NotAuthorized";
import Sidebar from "./Header/Sidebar";
import { styles } from "../asset/style/components/AppContainer.styles";
import UpdateNotification from "./UpdateNotification";

const AppContainerClean = ({
  children,
  location,
  language,
  pagination,
  notAuthorized,

}) => {
  const dispatch = useDispatch();


  const scrollRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const getMeIntervalRef = useRef(null);

  // ✅ Scroll reset when pagination changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  }, [pagination]);

  // ✅ Fetch user data (getMe) regularly - only when user is logged in
  useEffect(() => {
  

    // Initial call
    dispatch(getMe());

    // Set up periodic refresh every 5 minutes
    getMeIntervalRef.current = setInterval(() => {
      dispatch(getMe());
    }, 5 * 60 * 1000); // 5 minutes

    // Also refresh when app comes to foreground
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        dispatch(getMe());
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (getMeIntervalRef.current) {
        clearInterval(getMeIntervalRef.current);
      }
      subscription?.remove();
    };
  }, []);






  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <IntlProvider
      locale={language.locale}
      messages={languageObject[language.locale]}
      defaultLocale="en"
    >
      <View style={styles.parentConteinerApp(insets, location)}>
        {location === "Login" ? (
          <HeaderLogin />
        ) : (
          <Header location={location} toggleDrawer={toggleDrawer} />
        )}

        {location === "Login" ? (
          <View style={styles.childrenViewLogin}>{children}</View>
        ) : (
          <View style={{ flex: 1 }}>
            <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} location={location} />
            {!notAuthorized ? (
              <SafeAreaView style={{ flex: 1, paddingHorizontal: 7 }}>
                {children}
              </SafeAreaView>
            ) : (
              <NotAuthorized />
            )}
            {/* <ChatIcon location={location} /> */}
          </View>
        )}
        
        {/* Update notification banner - shows when OTA update is available */}
        {location !== "Login" && <UpdateNotification />}
      </View>
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  language: state.translation,
});

export default connect(mapStateToProps)(AppContainerClean);
