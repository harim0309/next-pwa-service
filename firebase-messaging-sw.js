// firebase-messaging-sw.js

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAh5rtpOrNP7mb_j8RiGhYUfd98TPnI2DE",
  authDomain: "next-pwa-service.firebaseapp.com",
  projectId: "next-pwa-service",
  storageBucket: "next-pwa-service.appspot.com",
  messagingSenderId: "720513971388",
  appId: "1:720513971388:web:6bf190f8f6e35dd00b0cb9",
  measurementId: "G-RRY5V0MEL4",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/public/assets/icon-384x384.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
