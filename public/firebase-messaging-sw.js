// /public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

// 이곳에 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
const config = {
  apiKey: "AIzaSyAh5rtpOrNP7mb_j8RiGhYUfd98TPnI2DE",
  authDomain: "next-pwa-service.firebaseapp.com",
  projectId: "next-pwa-service",
  storageBucket: "next-pwa-service.appspot.com",
  messagingSenderId: "720513971388",
  appId: "1:720513971388:web:6bf190f8f6e35dd00b0cb9",
};

// Initialize Firebase
firebase.initializeApp(config);

self.addEventListener("push", function (event) {
  const notification = event.data.json().notification;

  console.log("notification", notification);
  event.waitUntil(
    self.registration.showNotification(notification.title, notification)
  );
});

const messaging = firebase.messaging();
