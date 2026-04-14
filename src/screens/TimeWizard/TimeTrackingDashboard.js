import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { wizardStyles, WIZARD_COLORS } from './styles';
import {
  getEmployeeById,
  getClientById,
  getPositionById,
  getSectorById,
} from './mockData';
import {
  getActiveSessions,
  getSessionHistory,
  stopSession,
  addSession,
} from './activeSessionsService';

const TimeTrackingDashboard = ({ navigation }) => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'history'

  // Update time every second for active timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load data
  const loadData = async () => {
    const active = await getActiveSessions();
    const history = await getSessionHistory();
    setActiveSessions(active);
    setSessionHistory(history);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Format duration
  const formatDuration = (startTime, endTime = null) => {
    const end = endTime || currentTime;
    const seconds = Math.floor((end - startTime) / 1000);
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Stop tracking
  const handleStopSession = (sessionId) => {
    const session = activeSessions.find(s => s.id === sessionId);
    if (!session) return;

    const employee = getEmployeeById(session.employeeId);
    const duration = formatDuration(session.startTime, Date.now());

    Alert.alert(
      'Stop Time Tracking',
      `Stop tracking for ${employee?.name}?\nDuration: ${duration}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Stop',
          style: 'destructive',
          onPress: async () => {
            await stopSession(sessionId);
            await loadData();
            Alert.alert('Success', 'Time tracking stopped successfully!');
          },
        },
      ]
    );
  };

  // Navigate to start new session
  const handleStartNewSession = () => {
    navigation.navigate('TimeWizard');
  };

  // Render active session card
  const renderActiveSession = ({ item }) => {
    const employee = getEmployeeById(item.employeeId);
    const client = getClientById(item.clientId);
    const position = getPositionById(item.positionId);
    const sector = getSectorById(item.sectorId);

    return (
      <View style={styles.sessionCard}>
        <View style={styles.sessionHeader}>
          <View style={styles.employeeInfo}>
            <View style={[styles.statusDot, styles.statusActive]} />
            <Text style={styles.employeeName}>{employee?.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => handleStopSession(item.id)}
          >
            <Ionicons name="stop-circle" size={32} color={WIZARD_COLORS.danger} />
          </TouchableOpacity>
        </View>

        <View style={styles.sessionDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="briefcase-outline" size={16} color={WIZARD_COLORS.textSecondary} />
            <Text style={styles.detailLabel}>Sector:</Text>
            <Text style={styles.detailValue}>{sector?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="business-outline" size={16} color={WIZARD_COLORS.textSecondary} />
            <Text style={styles.detailLabel}>Client:</Text>
            <Text style={styles.detailValue}>{client?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="construct-outline" size={16} color={WIZARD_COLORS.textSecondary} />
            <Text style={styles.detailLabel}>Position:</Text>
            <Text style={styles.detailValue}>{position?.name}</Text>
          </View>
        </View>

        <View style={styles.timeDisplay}>
          <Ionicons name="time-outline" size={20} color={WIZARD_COLORS.primary} />
          <Text style={styles.timeText}>{formatDuration(item.startTime)}</Text>
          <Text style={styles.startedText}>Started {formatDate(item.startTime)}</Text>
        </View>
      </View>
    );
  };

  // Render history session card
  const renderHistorySession = ({ item }) => {
    const employee = getEmployeeById(item.employeeId);
    const client = getClientById(item.clientId);
    const position = getPositionById(item.positionId);

    return (
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <View style={styles.employeeInfo}>
            <View style={[styles.statusDot, styles.statusCompleted]} />
            <Text style={styles.employeeName}>{employee?.name}</Text>
          </View>
          <Text style={styles.historyDuration}>
            {formatDuration(item.startTime, item.endTime)}
          </Text>
        </View>

        <View style={styles.historyDetails}>
          <Text style={styles.historyClient}>{client?.name}</Text>
          <Text style={styles.historyPosition}>{position?.name}</Text>
          <Text style={styles.historyDate}>
            {formatDate(item.startTime)} - {formatDate(item.endTime)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={wizardStyles.container}>
      {/* Header */}
      <View style={styles.dashboardHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={WIZARD_COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.dashboardTitle}>Time Tracking</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleStartNewSession}
        >
          <Ionicons name="add-circle" size={32} color={WIZARD_COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Active ({activeSessions.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            History ({sessionHistory.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'active' ? (
          activeSessions.length === 0 ? (
            <View style={wizardStyles.emptyState}>
              <Ionicons name="time-outline" size={64} color={WIZARD_COLORS.textSecondary} />
              <Text style={styles.emptyText}>No active tracking sessions</Text>
              <TouchableOpacity
                style={[wizardStyles.button, wizardStyles.buttonPrimary, { marginTop: 20 }]}
                onPress={handleStartNewSession}
              >
                <Ionicons name="add" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={wizardStyles.buttonText}>Start New Session</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={activeSessions}
              keyExtractor={(item) => item.id}
              renderItem={renderActiveSession}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={WIZARD_COLORS.primary}
                />
              }
              contentContainerStyle={{ padding: 20 }}
            />
          )
        ) : (
          sessionHistory.length === 0 ? (
            <View style={wizardStyles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color={WIZARD_COLORS.textSecondary} />
              <Text style={styles.emptyText}>No tracking history</Text>
            </View>
          ) : (
            <FlatList
              data={sessionHistory}
              keyExtractor={(item) => item.id}
              renderItem={renderHistorySession}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={WIZARD_COLORS.primary}
                />
              }
              contentContainerStyle={{ padding: 20 }}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  dashboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 8,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: WIZARD_COLORS.textPrimary,
  },
  addButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: WIZARD_COLORS.cardBackground,
  },
  tabActive: {
    backgroundColor: WIZARD_COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: WIZARD_COLORS.textSecondary,
  },
  tabTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  sessionCard: {
    backgroundColor: WIZARD_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: WIZARD_COLORS.primary,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusActive: {
    backgroundColor: WIZARD_COLORS.primary,
  },
  statusCompleted: {
    backgroundColor: WIZARD_COLORS.textSecondary,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: '600',
    color: WIZARD_COLORS.textPrimary,
  },
  stopButton: {
    padding: 4,
  },
  sessionDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: WIZARD_COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    color: WIZARD_COLORS.textPrimary,
    fontWeight: '500',
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '600',
    color: WIZARD_COLORS.primary,
    letterSpacing: 1,
  },
  startedText: {
    fontSize: 12,
    color: WIZARD_COLORS.textSecondary,
    marginLeft: 'auto',
  },
  historyCard: {
    backgroundColor: WIZARD_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: WIZARD_COLORS.textPrimary,
  },
  historyDetails: {
    gap: 4,
  },
  historyClient: {
    fontSize: 16,
    color: WIZARD_COLORS.textPrimary,
    fontWeight: '500',
  },
  historyPosition: {
    fontSize: 14,
    color: WIZARD_COLORS.textSecondary,
  },
  historyDate: {
    fontSize: 12,
    color: WIZARD_COLORS.textSecondary,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: WIZARD_COLORS.textSecondary,
    marginTop: 16,
  },
};

export default TimeTrackingDashboard;
