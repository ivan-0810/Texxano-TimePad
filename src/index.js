import React from 'react';
import { useSelector } from 'react-redux';
import { NativeBaseProvider } from "native-base"
import theme from "./asset/ThemeNativeBase/index";
import { NavigatorPublic, NavigatorPrivate, NavigationService } from "./navigator";

const Index = () => {
  const state = useSelector(state => state)
  const authState = state.auth.loggedIn


  return (
    <NativeBaseProvider theme={theme}>
      {authState === false ? (
        <NavigatorPublic hideNavBar={true}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />) : (
        <NavigatorPrivate 
          hideNavBar={true}
          initialRouteName={null}
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
      )}
    </NativeBaseProvider>
  )
}

export default Index
