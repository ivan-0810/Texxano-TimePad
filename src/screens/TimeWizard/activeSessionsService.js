import AsyncStorage from '@react-native-async-storage/async-storage';

const ACTIVE_SESSIONS_KEY = '@time_tracking_active_sessions';
const SESSION_HISTORY_KEY = '@time_tracking_history';

// Mock active sessions for demo
let activeSessions = [
  {
    id: 'session_1',
    employeeId: 1, // John Doe
    sectorId: 1, // Development
    clientId: 1, // TechCorp
    positionId: 1, // Senior Developer
    startTime: Date.now() - 7320000, // Started 2 hours 2 minutes ago
  },
  {
    id: 'session_2',
    employeeId: 3, // Alice Brown
    sectorId: 2, // Design
    clientId: 3, // StartupXYZ
    positionId: 6, // UI/UX Designer
    startTime: Date.now() - 2700000, // Started 45 minutes ago
  },
];

// Mock history sessions for demo
let sessionHistory = [
  {
    id: 'history_1',
    employeeId: 2, // Jane Smith
    sectorId: 1, // Development
    clientId: 2, // MegaCorp
    positionId: 3, // Full Stack Developer
    startTime: Date.now() - 86400000, // Yesterday
    endTime: Date.now() - 82800000, // 1 hour duration
  },
  {
    id: 'history_2',
    employeeId: 4, // Bob Wilson
    sectorId: 3, // Marketing
    clientId: 4, // GlobalInc
    positionId: 8, // Marketing Specialist
    startTime: Date.now() - 172800000, // 2 days ago
    endTime: Date.now() - 165600000, // 2 hours duration
  },
  {
    id: 'history_3',
    employeeId: 1, // John Doe
    sectorId: 1, // Development
    clientId: 5, // LocalBiz
    positionId: 2, // Backend Developer
    startTime: Date.now() - 259200000, // 3 days ago
    endTime: Date.now() - 237600000, // 6 hours duration
  },
];

/**
 * Initialize storage with mock data (for demo purposes)
 */
const initializeStorage = async () => {
  try {
    const stored = await AsyncStorage.getItem(ACTIVE_SESSIONS_KEY);
    if (!stored) {
      await AsyncStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(activeSessions));
    } else {
      activeSessions = JSON.parse(stored);
    }

    const storedHistory = await AsyncStorage.getItem(SESSION_HISTORY_KEY);
    if (!storedHistory) {
      await AsyncStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(sessionHistory));
    } else {
      sessionHistory = JSON.parse(storedHistory);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

// Initialize on module load
initializeStorage();

/**
 * Get all active tracking sessions
 */
export const getActiveSessions = async () => {
  try {
    const stored = await AsyncStorage.getItem(ACTIVE_SESSIONS_KEY);
    if (stored) {
      activeSessions = JSON.parse(stored);
    }
    return activeSessions;
  } catch (error) {
    console.error('Error getting active sessions:', error);
    return activeSessions;
  }
};

/**
 * Get session history (last 50 sessions)
 */
export const getSessionHistory = async () => {
  try {
    const stored = await AsyncStorage.getItem(SESSION_HISTORY_KEY);
    if (stored) {
      sessionHistory = JSON.parse(stored);
    }
    // Return sorted by most recent first
    return sessionHistory.sort((a, b) => b.endTime - a.endTime).slice(0, 50);
  } catch (error) {
    console.error('Error getting session history:', error);
    return sessionHistory;
  }
};

/**
 * Add a new tracking session
 */
export const addSession = async (sessionData) => {
  try {
    const newSession = {
      id: `session_${Date.now()}`,
      ...sessionData,
      startTime: Date.now(),
    };

    activeSessions.push(newSession);
    await AsyncStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(activeSessions));

    console.log('Session started:', newSession);
    return newSession;
  } catch (error) {
    console.error('Error adding session:', error);
    throw error;
  }
};

/**
 * Stop a tracking session and move to history
 */
export const stopSession = async (sessionId) => {
  try {
    const sessionIndex = activeSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) {
      throw new Error('Session not found');
    }

    const session = activeSessions[sessionIndex];
    const completedSession = {
      ...session,
      endTime: Date.now(),
    };

    // Remove from active
    activeSessions.splice(sessionIndex, 1);
    await AsyncStorage.setItem(ACTIVE_SESSIONS_KEY, JSON.stringify(activeSessions));

    // Add to history
    sessionHistory.unshift(completedSession);
    // Keep only last 100 sessions
    if (sessionHistory.length > 100) {
      sessionHistory = sessionHistory.slice(0, 100);
    }
    await AsyncStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(sessionHistory));

    console.log('Session stopped:', completedSession);

    // TODO: Send to backend API
    // await sendSessionToBackend(completedSession);

    return completedSession;
  } catch (error) {
    console.error('Error stopping session:', error);
    throw error;
  }
};

/**
 * Get active session for a specific employee
 */
export const getEmployeeActiveSession = async (employeeId) => {
  const sessions = await getActiveSessions();
  return sessions.find(s => s.employeeId === employeeId) || null;
};

/**
 * Get session history for a specific employee
 */
export const getEmployeeHistory = async (employeeId, limit = 10) => {
  const history = await getSessionHistory();
  return history.filter(s => s.employeeId === employeeId).slice(0, limit);
};

/**
 * Clear all data (for testing/reset)
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem(ACTIVE_SESSIONS_KEY);
    await AsyncStorage.removeItem(SESSION_HISTORY_KEY);
    activeSessions = [];
    sessionHistory = [];
    console.log('All session data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

/**
 * Backend API integration (placeholder)
 * TODO: Replace with actual .NET backend endpoints
 */
const sendSessionToBackend = async (session) => {
  try {
    // Example API call
    // const response = await fetch('https://your-api.com/api/timesessions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${authToken}`,
    //   },
    //   body: JSON.stringify({
    //     employeeId: session.employeeId,
    //     sectorId: session.sectorId,
    //     clientId: session.clientId,
    //     positionId: session.positionId,
    //     startTime: new Date(session.startTime).toISOString(),
    //     endTime: new Date(session.endTime).toISOString(),
    //     duration: session.endTime - session.startTime,
    //   }),
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Failed to send session to backend');
    // }
    // 
    // return await response.json();
    
    console.log('Session would be sent to backend:', session);
    return { success: true };
  } catch (error) {
    console.error('Error sending session to backend:', error);
    throw error;
  }
};
