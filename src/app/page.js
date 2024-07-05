"use client";
// /src/pages/index.js
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const Index = () => {
  const [logArr, setLogArr] = useState([]);

  const log = (...args) => {
    logArr.push(args.join(" "));
    const newList = logArr.concat(args.join(" "));
    setLogArr(newList);
  };

  const onMessageFCM = async () => {
    try {
      log("onMessageFCM 실행 ###############");
      // 브라우저에 알림 권한을 요청합니다.
      if (
        "serviceWorker" in navigator &&
        "Notification" in window &&
        "PushManager" in window
      ) {
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
            if (currentToken) {
              log("currentToken:", currentToken);
              // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
            } else {
              log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            log("An error occurred while retrieving token. ", err);
          });

        // 메세지가 수신되면 역시 콘솔에 출력합니다.
        onMessage(messaging, (payload) => {
          log("Message received. ", payload);
        });
      }
    } catch (error) {
      log(JSON.stringify(error));
    }
  };

  return (
    <div>
      <h1>hello world</h1>
      <button
        className="bg-gray-300 rounded-lg px-[12px] py-[10px]"
        onClick={() => onMessageFCM()}
      >
        onMessageFCM
      </button>
      <button
        className="bg-gray-300 rounded-lg px-[12px] py-[10px]"
        onClick={() => setLogArr([])}
      >
        log clear
      </button>
      <div className="p-2 border border-1">
        {logArr.map((log, i) => (
          <p
            className="p-1 my-1 border border-red-300 cursor-pointer border-1"
            key={i}
            onClick={() => {
              navigator.clipboard.writeText(log);
              alert("복사되었습니다.");
            }}
          >
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Index;
