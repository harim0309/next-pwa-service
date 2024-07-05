"use client";
// /src/pages/index.js
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const Index = () => {
  const [currentToken, setCurrentToken] = useState("");

  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.

    if (
      "serviceWorker" in navigator &&
      "Notification" in window &&
      "PushManager" in window
    ) {
      alert(2);
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
      const firebaseApp = initializeApp({
        apiKey: "AIzaSyAh5rtpOrNP7mb_j8RiGhYUfd98TPnI2DE",
        authDomain: "next-pwa-service.firebaseapp.com",
        projectId: "next-pwa-service",
        storageBucket: "next-pwa-service.appspot.com",
        messagingSenderId: "720513971388",
        appId: "1:720513971388:web:6bf190f8f6e35dd00b0cb9",
      });

      const messaging = getMessaging(firebaseApp);

      // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
      getToken(messaging, {
        vapidKey:
          "BMu2AMDJl3W3lAPcXMNgK2QJi_eiB-UZhKV-IOWGYgNsViAheiITE00VomclG8zR-alVTSDY_ZnLk7CJPnzvWVw",
      })
        .then((currentToken) => {
          console.log("currentToken", currentToken);
          if (currentToken) {
            // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
            console.log(currentToken);
            setCurrentToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });

      // 메세지가 수신되면 역시 콘솔에 출력합니다.
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
      });
    }
  };

  useEffect(() => {
    onMessageFCM();

    setTimeout(() => {
      onMessageFCM();
    }, 3000);
  }, []);

  return (
    <div>
      <h1>hello world</h1>
      <p
        onClick={() => {
          navigator.clipboard.writeText(currentToken);
        }}
      >
        {currentToken}
      </p>
    </div>
  );
};

export default Index;
