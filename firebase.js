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

// let messaging;

// try {
//   const app = initializeApp(firebaseConfig);
//   messaging = getMessaging(app);
// } catch (error) {
//   console.error("Firebase initialization error: ", error);
// }

// export const requestPermission = async () => {
//   if (!messaging) {
//     console.error("Firebase Messaging is not initialized");
//     return;
//   }

//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       console.log("Notification permission granted.");
//       const currentToken = await getToken(messaging, {
//         vapidKey:
//           "BMu2AMDJl3W3lAPcXMNgK2QJi_eiB-UZhKV-IOWGYgNsViAheiITE00VomclG8zR-alVTSDY_ZnLk7CJPnzvWVw",
//       });
//       if (currentToken) {
//         console.log("FCM Token:", currentToken);
//         // 서버로 토큰 전송
//         fetch("/api/save-token", {
//           method: "POST",
//           body: JSON.stringify({ token: currentToken }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       } else {
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//       }
//     } else {
//       console.log("Unable to get permission to notify.");
//     }
//   } catch (error) {
//     console.error("An error occurred while retrieving token. ", error);
//   }
// };

// onMessage(messaging, (payload) => {
//   console.log("Message received. ", payload);
//   // Customize notification here
//   alert(
//     `Title: ${payload.notification.title}, Body: ${payload.notification.body}`
//   );
// });

const app = initializeApp(firebaseConfig);

/**
 * FCM 토큰 발급
 */
export const setTokenHandler = async () => {
  const messaging = getMessaging(app);
  await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
      } else {
        // 토큰을 받았다면 여기서 DB에 저장하면 됩니다.
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getTokenHandler = async () => {
  const messaging = getMessaging(app);
  return await getToken(messaging, {
    vapidKey:
      "BMu2AMDJl3W3lAPcXMNgK2QJi_eiB-UZhKV-IOWGYgNsViAheiITE00VomclG8zR-alVTSDY_ZnLk7CJPnzvWVw",
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
        console.error("토큰 생성 불가");
      } else {
        // 토큰을 받았다면 여기서 supabase 테이블의 저장하면 됩니다.
        console.log("currentToken", currentToken);
        return currentToken;
      }
    })
    .catch((error) => {
      console.error("token error", error);
    });
};
