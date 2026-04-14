import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';

const UpdateNotification = () => {
    useEffect(() => {
        checkAndApplyUpdates();
    }, []);

    const checkAndApplyUpdates = async () => {
        try {
            // Check for updates silently in production AND preview builds
            if (Updates.channel) {
                console.log('🔄 Checking for updates on channel:', Updates.channel);
                
                const update = await Updates.checkForUpdateAsync();
                
                if (update.isAvailable) {
                    console.log('✅ Update available, fetching...');
                    await Updates.fetchUpdateAsync();
                    console.log('✅ Update fetched successfully, reloading...');
                    // Automatically reload the app to apply the update
                    await Updates.reloadAsync();
                } else {
                    console.log('ℹ️ No updates available');
                }
            } else if (__DEV__) {
                console.log('⚠️ Update check skipped - running in development mode');
            } else {
                console.log('⚠️ Update check skipped - no channel configured');
            }
        } catch (error) {
            console.log('❌ Error checking for updates:', error);
        }
    };

    // Return null - this component doesn't render anything
    return null;
};

export default UpdateNotification;

