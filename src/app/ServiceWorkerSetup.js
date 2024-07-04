// app/ServiceWorkerSetup.js

"use client";

import { useEffect } from "react";
import { requestPermission } from "../../firebase";

export default function ServiceWorkerSetup() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });

      requestPermission();
    } else {
      console.error("Service workers are not supported by this browser.");
    }
  }, []);

  return null;
}
