import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StepIndicator from './components/StepIndicator';
import { wizardStyles, WIZARD_COLORS } from './styles';
import {
  MOCK_SECTORS,
  MOCK_CLIENTS,
  getEmployeesBySector,
  getPositionsByClient,
  getSectorById,
  getEmployeeById,
  getClientById,
  getPositionById,
} from './mockData';
import { addSession, getEmployeeActiveSession } from './activeSessionsService';

const STEPS = [
  { id: 1, label: 'SEKTOR', sublabel: 'Izberi sektor' },
  { id: 2, label: 'VRABOTEN', sublabel: 'Izberi vraboten' },
  { id: 3, label: 'KLIENT', sublabel: 'Izberi klient' },
  { id: 4, label: 'POZICIJA', sublabel: 'Izberi pozicija' },
];

const TimeWizard = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reset wizard
  const resetWizard = () => {
    setCurrentStep(1);
    setSelectedSector(null);
    setSelectedEmployee(null);
    setSelectedClient(null);
    setSelectedPosition(null);
    setIsTracking(false);
    setTrackingTime(0);
  };

  // Handle sector selection
  const handleSelectSector = (sector) => {
    setSelectedSector(sector);
    setSelectedEmployee(null); // Reset employee when sector changes
    setCurrentStep(2);
  };

  // Handle employee selection
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setCurrentStep(3);
  };

  // Handle client selection
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setSelectedPosition(null); // Reset position when client changes
    setCurrentStep(4);
  };

  // Handle position selection
  const handleSelectPosition = async (position) => {
    setSelectedPosition(position);
    
    // Check if employee already has an active session
    const existingSession = await getEmployeeActiveSession(selectedEmployee);
    if (existingSession) {
      const employee = getEmployeeById(selectedEmployee);
      Alert.alert(
        'Employee Already Tracking',
        `${employee?.name} already has an active time tracking session. Please stop the existing session first.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    setCurrentStep(5); // Move to summary/tracking step
  };

  // Start time tracking
  const handleStartTracking = async () => {
    const employee = getEmployeeById(selectedEmployee);
    const client = getClientById(selectedClient);
    
    Alert.alert(
      'Start Time Tracking',
      `Start tracking time for ${employee?.name} on ${client?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start',
          onPress: async () => {
            try {
              // Save session to storage and backend
              await addSession({
                employeeId: selectedEmployee,
                sectorId: selectedSector,
                clientId: selectedClient,
                positionId: selectedPosition,
              });
              
              setIsTracking(true);
              setTrackingTime(0);
              
              Alert.alert(
                'Success',
                'Time tracking started successfully!',
                [
                  {
                    text: 'View Dashboard',
                    onPress: () => {
                      resetWizard();
                      navigation.navigate('TimeTrackingDashboard');
                    },
                  },
                  {
                    text: 'Start Another',
                    onPress: resetWizard,
                  },
                ]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to start time tracking. Please try again.');
              console.error('Error starting session:', error);
            }
          },
        },
      ]
    );
  };

  // Stop time tracking (not typically used in wizard, but kept for reference)
  const handleStopTracking = () => {
    Alert.alert(
      'Note',
      'To stop tracking, please use the Time Tracking Dashboard where all active sessions are managed.',
      [
        {
          text: 'Go to Dashboard',
          onPress: () => {
            resetWizard();
            navigation.navigate('TimeTrackingDashboard');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  // Render Step 1: Select Sector
  const renderSectorStep = () => (
    <>
      <Text style={wizardStyles.title}>Izberi sektor</Text>
      <FlatList
        data={MOCK_SECTORS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={wizardStyles.listItem}
            onPress={() => handleSelectSector(item.id)}
          >
            <View>
              <Text style={wizardStyles.listItemText}>{item.name}</Text>
              <Text style={wizardStyles.listItemSubtext}>Code: {item.code}</Text>
            </View>
            <Text style={wizardStyles.arrow}>›</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );

  // Render Step 2: Select Employee
  const renderEmployeeStep = () => {
    const employees = getEmployeesBySector(selectedSector);
    
    return (
      <>
        <Text style={wizardStyles.title}>Izberi vraboten</Text>
        {employees.length === 0 ? (
          <View style={wizardStyles.emptyState}>
            <Text style={wizardStyles.emptyStateText}>
              No employees in selected sector
            </Text>
          </View>
        ) : (
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={wizardStyles.listItem}
                onPress={() => handleSelectEmployee(item.id)}
              >
                <View>
                  <Text style={wizardStyles.listItemText}>{item.name}</Text>
                  <Text style={wizardStyles.listItemSubtext}>{item.email}</Text>
                </View>
                <Text style={wizardStyles.arrow}>›</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </>
    );
  };

  // Render Step 3: Select Client
  const renderClientStep = () => (
    <>
      <Text style={wizardStyles.title}>Izberi klient</Text>
      <FlatList
        data={MOCK_CLIENTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={wizardStyles.listItem}
            onPress={() => handleSelectClient(item.id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 8,
                  height: 40,
                  backgroundColor: item.color,
                  marginRight: 16,
                  borderRadius: 4,
                }}
              />
              <View>
                <Text style={wizardStyles.listItemText}>{item.name}</Text>
                <Text style={wizardStyles.listItemSubtext}>Code: {item.code}</Text>
              </View>
            </View>
            <Text style={wizardStyles.arrow}>›</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );

  // Render Step 4: Select Position
  const renderPositionStep = () => {
    const positions = getPositionsByClient(selectedClient);
    
    return (
      <>
        <Text style={wizardStyles.title}>Izberi pozicija</Text>
        {positions.length === 0 ? (
          <View style={wizardStyles.emptyState}>
            <Text style={wizardStyles.emptyStateText}>
              No positions for selected client
            </Text>
          </View>
        ) : (
          <FlatList
            data={positions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={wizardStyles.listItem}
                onPress={() => handleSelectPosition(item.id)}
              >
                <View>
                  <Text style={wizardStyles.listItemText}>{item.name}</Text>
                  <Text style={wizardStyles.listItemSubtext}>Rate: ${item.rate}/hr</Text>
                </View>
                <Text style={wizardStyles.arrow}>›</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </>
    );
  };

  // Render Step 5: Summary and Time Tracking
  const renderTrackingStep = () => (
    <>
      <Text style={wizardStyles.title}>Time Tracking</Text>
      
      <View style={wizardStyles.summaryContainer}>
        <View style={wizardStyles.summaryRow}>
          <Text style={wizardStyles.summaryLabel}>Sector</Text>
          <Text style={wizardStyles.summaryValue}>
            {getSectorById(selectedSector)?.name}
          </Text>
        </View>
        <View style={wizardStyles.summaryRow}>
          <Text style={wizardStyles.summaryLabel}>Employee</Text>
          <Text style={wizardStyles.summaryValue}>
            {getEmployeeById(selectedEmployee)?.name}
          </Text>
        </View>
        <View style={wizardStyles.summaryRow}>
          <Text style={wizardStyles.summaryLabel}>Client</Text>
          <Text style={wizardStyles.summaryValue}>
            {getClientById(selectedClient)?.name}
          </Text>
        </View>
        <View style={[wizardStyles.summaryRow, { borderBottomWidth: 0 }]}>
          <Text style={wizardStyles.summaryLabel}>Position</Text>
          <Text style={wizardStyles.summaryValue}>
            {getPositionById(selectedPosition)?.name}
          </Text>
        </View>
      </View>

      <View style={wizardStyles.timerContainer}>
        <Text style={wizardStyles.timerText}>{formatTime(trackingTime)}</Text>
        <Text style={wizardStyles.timerLabel}>
          {isTracking ? 'TRACKING...' : 'READY TO START'}
        </Text>
      </View>

      <View style={wizardStyles.buttonContainer}>
        {!isTracking ? (
          <>
            <TouchableOpacity
              style={[wizardStyles.button, wizardStyles.buttonOutline]}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={20} color={WIZARD_COLORS.textSecondary} style={{ marginRight: 8 }} />
              <Text style={[wizardStyles.buttonText, wizardStyles.buttonTextSecondary]}>
                Change
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[wizardStyles.button, wizardStyles.buttonPrimary]}
              onPress={handleStartTracking}
            >
              <Ionicons name="play" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={wizardStyles.buttonText}>Start</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[wizardStyles.button, wizardStyles.buttonDanger]}
            onPress={handleStopTracking}
          >
            <Text style={wizardStyles.buttonText}>Stop Tracking</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  // Get next step label
  const getNextStepLabel = () => {
    if (currentStep < 4) {
      return STEPS[currentStep]?.sublabel;
    } else if (currentStep === 4) {
      return 'Review and start tracking';
    }
    return '';
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSectorStep();
      case 2:
        return renderEmployeeStep();
      case 3:
        return renderClientStep();
      case 4:
        return renderPositionStep();
      case 5:
        return renderTrackingStep();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={wizardStyles.container}>
      {/* Header with Logo and Steps */}
      <View style={wizardStyles.header}>
        <View style={wizardStyles.headerTop}>
          <TouchableOpacity
            style={wizardStyles.headerBackButton}
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} color={WIZARD_COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={wizardStyles.logo}>
            <Text style={{ color: '#F44336' }}>t</Text>exxano
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <StepIndicator currentStep={currentStep} steps={STEPS} />
      </View>

      {/* Content */}
      <View style={wizardStyles.content}>{renderStepContent()}</View>

      {/* Footer */}
      {currentStep < 5 && (
        <View style={wizardStyles.footer}>
          <Text style={wizardStyles.footerText}>Sladen korak:</Text>
          <Text style={wizardStyles.footerNextStep}>{getNextStepLabel()}</Text>
          
          {currentStep > 1 && (
            <TouchableOpacity
              style={wizardStyles.backButton}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={20} color={WIZARD_COLORS.textPrimary} />
              <Text style={wizardStyles.backButtonText}>
                Back
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default TimeWizard;
