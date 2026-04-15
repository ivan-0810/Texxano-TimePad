import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppContainerClean from "../../components/AppContainerClean";
import UpdateBanner from "../../components/UpdateBanner";

const Dashboard = ({ navigation }) => {

    return (
        <AppContainerClean location={'Dashboard'}  >
            <View style={{ padding: 20 }}>
                <TouchableOpacity 
                    style={styles.timeWizardButton}
                    onPress={() => navigation.navigate('TimeWizard')}
                >
                    <Ionicons name="time-outline" size={32} color="#fff" />
                    <Text style={styles.buttonText}>Start Time Tracking Wizard</Text>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.dashboardButton}
                    onPress={() => navigation.navigate('TimeTrackingDashboard')}
                >
                    <Ionicons name="timer-outline" size={32} color="#fff" />
                    <Text style={styles.buttonText}>View Active Tracking Sessions</Text>
                    <Ionicons name="arrow-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
       
            <UpdateBanner />

    

        </AppContainerClean>
    )
}

const styles = StyleSheet.create({
    timeWizardButton: {
        backgroundColor: '#FF9800',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dashboardButton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 12,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        marginLeft: 16,
    },
});

export default Dashboard
