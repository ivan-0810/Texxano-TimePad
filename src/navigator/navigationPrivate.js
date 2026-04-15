import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { useSelector } from "react-redux";
import UserStatusManager from "../services/Chat/userStatusManager";
import Dashboard from "../screens/Dashboard/Dashboard";

import Users from "../screens/UsersTeams/TeamsContainer";
import UsersPermissions from "../screens/Project/UsersPermissions";

import Profile from "../screens/Profile/Profile";
import Password from "../screens/Profile/Password";

import NotificationsSettings from "../screens/Profile/NotificationsSettings";
import Devices from "../screens/Profile/Devices";

import TimeWizard from "../screens/TimeWizard/TimeWizard";
import TimeTrackingDashboard from "../screens/TimeWizard/TimeTrackingDashboard";

import { enableScreens } from "react-native-screens";

enableScreens();

const NavigatorPrivate = createStackNavigator(
  {
    Dashboard,
    Profile,
    Password,
    NotificationsSettings,
    Devices,
    TimeWizard,
    TimeTrackingDashboard,
    Users,
    UsersPermissions,

  },
  {
    defaultNavigationOptions: {
      headerShown: null,
      animationEnabled: false,
    },
  }
);

// Add navigation state change listener
const AppContainer = createAppContainer(NavigatorPrivate);

// Wrap with navigation state tracking
const NavigatorPrivateWithTracking = React.forwardRef((props, ref) => {
  const userId = useSelector((state) => state.userData?.id);
  const rootId = useSelector((state) => state.userDataRole?.rootId);
  const { initialRouteName, ...otherProps } = props;

  // Initialize UserStatusManager when user data is available
  useEffect(() => {
    if (userId && rootId) {
      UserStatusManager.initialize(userId, rootId);
    }
  }, [userId, rootId]);

  return (
    <AppContainer
      ref={ref}
      initialRouteName={initialRouteName}
      onNavigationStateChange={(prevState, currentState, action) => {
        // Get current route name
        const getCurrentRouteName = (state) => {
          if (!state || !state.routes || state.routes.length === 0) {
            return "Unknown";
          }

          const route = state.routes[state.index];

          if (route.state) {
            // Dive into nested navigators
            return getCurrentRouteName(route.state);
          }

          return route.routeName || route.name;
        };

        const currentRouteName = getCurrentRouteName(currentState);

        // Handle user status based on route change
        UserStatusManager.handleRouteChange(currentRouteName);
      }}
    />
  );
});

export default NavigatorPrivateWithTracking;
