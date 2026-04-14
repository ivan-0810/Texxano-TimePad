import { Linking, Platform } from "react-native";
import { NavigationService } from "../navigator";

/**
 * Detects notification types from notification data
 */
export const detectNotificationTypes = (data, body, title) => {
  const notificationBody = body?.toLowerCase() || "";
  const notificationTitle = title?.toLowerCase() || "";

  return {
    isChatNotification: data?.type === "chat_message",
    isReportStatustNotification: data?.notificationDestination?.type === "ProjectStatusReport",
    isReportTimeNotification: data?.notificationDestination?.type === "ProjectTimeReport",
    isTimeTrackerReportNotification: data?.notificationDestination?.type === "TimeTrackerReport",
    isShiftStartOrEndNotification: data?.notificationDestination?.type === "ShiftStartOrEnd",
    isProjectNotification: data?.notificationDestination?.type === "Project",
    isCalendarEventNotification: data?.notificationDestination?.type === "CalendarEvent",
    isUpdateNotification:
      notificationBody.includes("new update for texxano application is available") ||
      notificationBody.includes("app store") ||
      notificationBody.includes("play store") ||
      notificationTitle.includes("update") ||
      notificationTitle.includes("app store") ||
      notificationTitle.includes("play store") ||
      data?.type === "app_update" ||
      data?.isAppUpdate === true,
  };
};

/**
 * Handles Chat notification navigation
 */
export const handleChatNotification = async (data) => {
  try {
    const deepLink = data?.deep_link || `texxano://ChatMessages/${data.chatId}`;
    Linking.openURL(deepLink);
  } catch (error) {
    NavigationService.navigate("ChatMessages", {
      chat: { id: data.chatId },
    });
  }
};

/**
 * Handles ProjectStatusReport notification navigation
 */
export const handleReportStatusNotification = async (data) => {
  console.log('📊 Navigating to Report screen (Status tab) from notification');
  try {
    const deepLink = data?.deep_link || `texxano://Report/20`;
    Linking.openURL(deepLink);
  } catch (error) {
    console.log('📊 Fallback to regular navigation:', error);
    NavigationService.navigate("Report", {
      location: "Dashboard",
      macroCategoryReport: 20, // First tab: "Извештај на статусот"
    });
  }
};

/**
 * Handles ProjectTimeReport notification navigation
 */
export const handleReportTimeNotification = async (data) => {
  console.log('📊 Navigating to Report screen (Time tab) from ProjectTimeReport notification');
  try {
    const deepLink = data?.deep_link || `texxano://Report/10`;
    Linking.openURL(deepLink);
  } catch (error) {
    console.log('📊 Fallback to regular navigation:', error);
    NavigationService.navigate("Report", {
      location: "Dashboard",
      macroCategoryReport: 10, // Second tab: "Извештаи за Време"
    });
  }
};

/**
 * Handles TimeTrackerReport notification navigation
 */
export const handleTimeTrackerReportNotification = async (data) => {
  console.log('📊 Navigating to Report screen (Time tab) from TimeTrackerReport notification');
  try {
    const deepLink = data?.deep_link || `texxano://Time`;
    Linking.openURL(deepLink);
  } catch (error) {
    console.log('📊 Fallback to regular navigation:', error);
    NavigationService.navigate("Time", {
      locationActive: "",
      id: "",
    });
  }
};

/**
 * Handles ShiftStartOrEnd notification navigation
 */
export const handleShiftStartOrEndNotification = async (data) => {
  console.log('📊 Navigating to Time screen from ShiftStartOrEnd notification');
  try {
    const deepLink = data?.deep_link || `texxano://Time`;
    Linking.openURL(deepLink);
  } catch (error) {
    console.log('📊 Fallback to regular navigation:', error);
    NavigationService.navigate("Time", {
      locationActive: "",
      id: "",
    });
  }
};

/**
 * Handles Project notification navigation
 */
export const handleProjectNotification = async (data) => {
  console.log('📊 Navigating to Project screen from Project notification');
  try {
    const projectId = data?.notificationDestination?.entityId;
    const deepLink = data?.deep_link || (projectId ? `texxano://Project/${projectId}` : null);
    if (deepLink) {
      Linking.openURL(deepLink);
    } else {
      throw new Error('No project ID or deep link available');
    }
  } catch (error) {
    console.log('📊 Fallback to regular navigation:', error);
    const projectId = data?.notificationDestination?.entityId;
    if (projectId) {
      NavigationService.navigate("Project", {
        projectId: projectId,
        navigateFrom: "Notifications",
      });
    } else {
      NavigationService.navigate("Dashboard");
    }
  }
};

/**
 * Handles CalendarEvent notification navigation
 */
export const handleCalendarEventNotification = async (data) => {
  console.log('📊 Navigating to Calendar screen from CalendarEvent notification');
  try {
    const eventId = data?.notificationDestination?.entityId;
    const deepLink = data?.deep_link || (eventId ? `texxano://Calendar/${eventId}` : `texxano://Calendar`);
    if (deepLink) {
      Linking.openURL(deepLink);
    } else {
      throw new Error('No deep link available');
    }
  } catch (error) {
    console.log('📊 Fallback to regular navigation:', error);
    const eventId = data?.notificationDestination?.entityId;
    if (eventId) {
      NavigationService.navigate("Calendar", {
        locationActive: "3",
        id: eventId,
        update: false,
        navigateFrom: "Notifications",
      });
    } else {
      NavigationService.navigate("Calendar", {
        navigateFrom: "Notifications",
      });
    }
  }
};

/**
 * Handles app update notification - opens App Store or Google Play Store
 */
export const handleUpdateNotification = async () => {
  try {
    const appStoreURL = "https://apps.apple.com/app/id1589908664";
    const playStoreURL = "https://play.google.com/store/apps/details?id=texxano.v1.android";
    
    const storeURL = Platform.OS === 'ios' ? appStoreURL : playStoreURL;
    
    console.log('🔄 Opening store from notification tap:', storeURL);
    const canOpen = await Linking.canOpenURL(storeURL);
    
    if (canOpen) {
      await Linking.openURL(storeURL);
    } else {
      console.log('❌ Cannot open store URL');
      NavigationService.navigate("Dashboard");
    }
  } catch (error) {
    console.log('❌ Error opening store:', error);
    NavigationService.navigate("Dashboard");
  }
};

/**
 * Handles generic notification with deep link or path
 */
export const handleGenericNotification = (data) => {
  const deepLink = data?.deep_link || data?.path;
  
  if (deepLink && deepLink !== "Dashboard") {
    NavigationService.navigate(deepLink);
  } else {
    NavigationService.navigate("Dashboard");
  }
};

/**
 * Main handler for notification tap responses
 */
export const handleNotificationResponse = async (response) => {
  try {
    const { data, body } = response.notification.request.content;
    const notificationTitle = response.notification.request.content.title || "";
    
    const notificationTypes = detectNotificationTypes(data, body, notificationTitle);
    
    // Log notification types for debugging
    console.log('🔍 isUpdateNotification:', notificationTypes.isUpdateNotification);
    console.log('📊 isReportStatustNotification:', notificationTypes.isReportStatustNotification);
    console.log('📊 isReportTimeNotification:', notificationTypes.isReportTimeNotification);
    console.log('📊 isTimeTrackerReportNotification:', notificationTypes.isTimeTrackerReportNotification);
    console.log('📊 isShiftStartOrEndNotification:', notificationTypes.isShiftStartOrEndNotification);
    console.log('📊 isProjectNotification:', notificationTypes.isProjectNotification);
    console.log('📊 isCalendarEventNotification:', notificationTypes.isCalendarEventNotification);
    
    // Handle notifications based on type
    if (notificationTypes.isChatNotification) {
      await handleChatNotification(data);
    } else if (notificationTypes.isReportStatustNotification) {
      await handleReportStatusNotification(data);
    } else if (notificationTypes.isReportTimeNotification) {
      await handleReportTimeNotification(data);
    } else if (notificationTypes.isTimeTrackerReportNotification) {
      await handleTimeTrackerReportNotification(data);
    } else if (notificationTypes.isShiftStartOrEndNotification) {
      await handleShiftStartOrEndNotification(data);
    } else if (notificationTypes.isProjectNotification) {
      await handleProjectNotification(data);
    } else if (notificationTypes.isCalendarEventNotification) {
      await handleCalendarEventNotification(data);
    } else if (notificationTypes.isUpdateNotification) {
      await handleUpdateNotification();
    } else {
      handleGenericNotification(data);
    }
  } catch (error) {
    console.log('❌ Error handling notification:', error);
    NavigationService.navigate("Dashboard");
  }
};

