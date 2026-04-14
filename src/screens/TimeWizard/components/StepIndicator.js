import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { wizardStyles, WIZARD_COLORS } from '../styles';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <View style={wizardStyles.stepsContainer}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isPending = stepNumber > currentStep;
        
        let stepColor = WIZARD_COLORS.stepInactive;
        let iconName = 'ellipse-outline';
        
        if (isComplete) {
          stepColor = WIZARD_COLORS.stepComplete;
          iconName = 'checkmark-circle';
        } else if (isActive) {
          stepColor = WIZARD_COLORS.stepActive;
          iconName = 'checkmark-circle';
        } else if (isPending) {
          stepColor = WIZARD_COLORS.stepPending;
          iconName = 'close-circle';
        }
        
        return (
          <View key={step.id} style={wizardStyles.stepWrapper}>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <View 
                style={[
                  wizardStyles.stepConnector,
                  { backgroundColor: isComplete ? WIZARD_COLORS.stepComplete : WIZARD_COLORS.stepInactive }
                ]} 
              />
            )}
            
            {/* Step circle */}
            <View style={[wizardStyles.stepCircle, { backgroundColor: stepColor }]}>
              <Ionicons name={iconName} size={24} color={WIZARD_COLORS.textPrimary} />
            </View>
            
            {/* Step label */}
            <Text 
              style={[
                wizardStyles.stepLabel, 
                { color: isActive ? WIZARD_COLORS.textPrimary : WIZARD_COLORS.textSecondary }
              ]}
            >
              {step.label}
            </Text>
            <Text style={[wizardStyles.stepSubLabel, { color: WIZARD_COLORS.textSecondary }]}>
              {step.sublabel}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default StepIndicator;
