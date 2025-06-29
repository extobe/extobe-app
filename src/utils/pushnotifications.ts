/* eslint-disable @typescript-eslint/no-shadow */
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission(): Promise<void> {
  const authStatus = await messaging().requestPermission();
  const enable =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enable) {
    console.log('====================================');
    console.log('Authorization status', authStatus);
    console.log('====================================');
    getFCMToken();
  }
}
async function getFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('====================================');
  console.log('old fcmtoken', fcmtoken);
  console.log('====================================');

  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();

      if (fcmtoken) {
        console.log('====================================');
        console.log('new otken', fcmtoken);
        console.log('====================================');
        // await AsyncStorage.getItem('fcmtoken', fcmtoken);
      }
    } catch (err) {
      console.log('====================================');
      console.log('err', err);
      console.log('====================================');
    }
  }
}
export const NotificationListen = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async (remoteMessage) => {
    // Alert.alert('hihi', JSON.stringify(remoteMessage));
    console.log('====================================');
    console.log('remoteMessage', remoteMessage);
    console.log('====================================');
  });
};
