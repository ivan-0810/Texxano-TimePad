import { StyleSheet } from 'react-native';

export const WIZARD_COLORS = {
  background: '#1a1a1a',
  cardBackground: '#2a2a2a',
  cardHover: '#353535',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  
  // Step colors
  stepComplete: '#4CAF50',
  stepActive: '#4CAF50',
  stepPending: '#FF9800',
  stepInactive: '#555555',
  
  // Accent colors
  primary: '#4CAF50',
  secondary: '#FF9800',
  danger: '#F44336',
};

export const wizardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WIZARD_COLORS.background,
  },
  
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  
  headerBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: WIZARD_COLORS.textPrimary,
  },
  
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  
  stepConnector: {
    position: 'absolute',
    top: 20,
    left: '50%',
    right: '-50%',
    height: 2,
    zIndex: -1,
  },
  
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  
  stepSubLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: WIZARD_COLORS.textPrimary,
    marginBottom: 30,
  },
  
  listContainer: {
    flex: 1,
  },
  
  listItem: {
    backgroundColor: WIZARD_COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  listItemText: {
    fontSize: 18,
    color: WIZARD_COLORS.textPrimary,
    flex: 1,
  },
  
  listItemSubtext: {
    fontSize: 14,
    color: WIZARD_COLORS.textSecondary,
    marginTop: 4,
  },
  
  arrow: {
    fontSize: 20,
    color: WIZARD_COLORS.textSecondary,
  },
  
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  
  footerText: {
    fontSize: 14,
    color: WIZARD_COLORS.textSecondary,
    textAlign: 'center',
  },
  
  footerNextStep: {
    fontSize: 14,
    color: WIZARD_COLORS.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: WIZARD_COLORS.primary,
  },
  
  buttonSecondary: {
    backgroundColor: WIZARD_COLORS.secondary,
  },
  
  buttonDanger: {
    backgroundColor: WIZARD_COLORS.danger,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: WIZARD_COLORS.textSecondary,
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: WIZARD_COLORS.textPrimary,
  },
  
  buttonTextSecondary: {
    color: WIZARD_COLORS.textSecondary,
  },
  
  backButton: {
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: WIZARD_COLORS.textPrimary,
    marginLeft: 8,
  },
  
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyStateText: {
    fontSize: 16,
    color: WIZARD_COLORS.textSecondary,
    textAlign: 'center',
  },
  
  summaryContainer: {
    backgroundColor: WIZARD_COLORS.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  
  summaryLabel: {
    fontSize: 14,
    color: WIZARD_COLORS.textSecondary,
  },
  
  summaryValue: {
    fontSize: 14,
    color: WIZARD_COLORS.textPrimary,
    fontWeight: '500',
  },
  
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  
  timerText: {
    fontSize: 48,
    fontWeight: '200',
    color: WIZARD_COLORS.textPrimary,
    letterSpacing: 2,
  },
  
  timerLabel: {
    fontSize: 14,
    color: WIZARD_COLORS.textSecondary,
    marginTop: 8,
  },
});
