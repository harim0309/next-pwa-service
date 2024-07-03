// firebase.js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAh5rtpOrNP7mb_j8RiGhYUfd98TPnI2DE",
  authDomain: "next-pwa-service.firebaseapp.com",
  projectId: "next-pwa-service",
  storageBucket: "next-pwa-service.appspot.com",
  messagingSenderId: "720513971388",
  appId: "1:720513971388:web:6bf190f8f6e35dd00b0cb9",
  measurementId: "G-RRY5V0MEL4",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BMu2AMDJl3W3lAPcXMNgK2QJi_eiB-UZhKV-IOWGYgNsViAheiITE00VomclG8zR-alVTSDY_ZnLk7CJPnzvWVw",
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } else {
      console.log("Unable to get permission to notify.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Customize notification here
  alert(
    `Title: ${payload.notification.title}, Body: ${payload.notification.body}`
  );
});
