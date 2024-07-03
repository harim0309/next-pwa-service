// pages/_app.js

import { useEffect } from "react";
import { requestPermission } from "../firebase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
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
    }

    requestPermission();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
