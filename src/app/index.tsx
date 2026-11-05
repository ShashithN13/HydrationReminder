import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View,} from 'react-native';

export default function ReminderTab() {
  const [isReminding, setIsReminding] = useState(false);
  const [message, setMessage] = useState('Time to drink a glass of water!');
  const [intervalMinutes, setIntervalMinutes] = useState(1);

  // Request notification permissions on mount
  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'We need notifications to remind you to drink water!'
        );
      }
    }

    requestPermissions();
  }, []);

  // Schedule a notification
async function scheduleReminder() {
  await Notifications.requestPermissionsAsync(); // Safe check just in case

  // Clear old ones first so they don't stack up
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule the new notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "💧 Hydration Alert", // Notification title
      body: message, // Notification body
      sound: true, // Play sound when notification arrives
    },
    // Trigger the notification after the specified interval
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: intervalMinutes * 60, // Convert minutes to seconds
      repeats: true,
    },
  });

    // Update state and alert the user
  setIsReminding(true);
  Alert.alert("Set!", `Reminding you every ${intervalMinutes} minutes.`);
  }

  // Stop reminders
  async function stopReminder() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setIsReminding(false);
    Alert.alert("Stopped", "Reminders cancelled.");
  }

  // Render the UI
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💧</Text>

      // Handle the "Add a Custom Message" section here.Use textInput to get the user's custom text.Give styles to the textbox.Use onChangeText to update the text in Realtime when the user changes it.
    </View>
    
  );

}