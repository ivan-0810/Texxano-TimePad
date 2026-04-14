import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, Platform, AppState } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch, connect } from "react-redux";
import * as Notifications from "expo-notifications";
import { IntlProvider } from "react-intl";

import { NavigationService } from "../navigator";
import { languageObject } from "../translations";
import { notificationsCount } from "../redux/actions/Notifications/notifications.actions";
import { UnreadMessageService } from "../services/Chat/unreadMessageService";
import { updateUnreadCount } from "../redux/actions/Chat/Chat.actions";
import { getMe } from "../redux/actions/UsersTeams/user.actions";
import { handleNotificationResponse } from "../utils/notificationHandlers";

import Header from "./Header/Header";
import HeaderLogin from "./Header/HeaderLogin";
import ChatHeader from "./Header/ChatHeader";
import NotAuthorized from "./NotAuthorized";
import Sidebar from "./Header/Sidebar";
import { styles } from "../asset/style/components/AppContainer.styles";
import ChatIcon from "./ChatIcon";
import UpdateNotification from "./UpdateNotification";



const AppContainerClean = ({
  children,
  location,
  language,
  pagination,
  notAuthorized,
  onAddChat,
  onAddGroupChat,
  onAddImage,
}) => {
  const dispatch = useDispatch();
  const notificationsCountState = useSelector(
    (state) => state.notificationsCount.count
  );
  const rootId = useSelector((state) => state.userDataRole.rootId);
  const userId = useSelector((state) => state.userData.id);
  const authState = useSelector((state) => state.auth.loggedIn);
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

  // ✅ Foreground: increment count only (no sound)
  const notificationListener = useRef();
  const responseListener = useRef();

  // Set up Android notification channel on app start
  useEffect(() => {
    const setupNotificationChannel = async () => {
      if (Platform.OS === 'android') {
        try {
          // Request notification permissions first
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            return;
          }

          // Create notification channel
          await Notifications.setNotificationChannelAsync('chat-messages', {
            name: 'Chat Messages',
            description: 'Notifications for chat messages',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: 'notification.mp3', // Use custom notification sound
            enableVibrate: true,
            enableLights: true,
            showBadge: true,
          });
        } catch (error) {
          // Silent error handling
        }
      }
    };

    setupNotificationChannel();
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        console.log('📬 RAW Notification received:', JSON.stringify(notification.request.content, null, 2));
        const { data } = notification.request.content;

        // Only handle chat notifications - check type explicitly
        const isChatNotification = data?.type === "chat_message";

        if (isChatNotification) {
          dispatch(notificationsCount(prev => prev + 1));
          
          // Update unread count for the specific chat when notification is received
          if (rootId && userId && data?.chatId) {
            try {
              const unreadCount = await UnreadMessageService.getUnreadCountForChat(rootId, data.chatId, userId);
              dispatch(updateUnreadCount(data.chatId, unreadCount));
            } catch (error) {
              // Silent error handling
            }
          }
        } else {
          // For non-chat notifications, increment notification count
          // These notifications are handled by the response listener for navigation
          dispatch(notificationsCount(prev => prev + 1));
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(async (response) => {
        await handleNotificationResponse(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []); // Empty dependency array - listeners should be set up once and stay active

  // ✅ Background notification handler → plays system sound
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      console.log('🔔 Notification handler called:', JSON.stringify(notification.request.content, null, 2));
      return {
        shouldShowAlert: true,
        shouldPlaySound: true, // 🔊 only in background
        shouldSetBadge: true,
      };
    },
  });

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
        ) : location === "ChatRoomList" ? (
          <ChatHeader
            location={location}
            toggleDrawer={toggleDrawer}
            onAddChat={onAddChat}
            onAddGroupChat={onAddGroupChat}
            onAddImage={onAddImage}
          />
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
