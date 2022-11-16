import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Linking } from "react-native";
import { useEffect, useState } from "react";
import { findBox as findBoxAndroid } from "./android";
import { findBox as findBoxIOS } from "./ios";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";

const runFirst = `
(async function(){
  if (window.location.pathname.includes("/smz/pwa")) {
    while (true) {
      const [connected] = document.querySelectorAll('#root > div > div > div.MuiDrawer-root.MuiDrawer-docked.status__StyledDrawer-sc-13prcga-0.duOutY.closed.css-1tu59u4 > div > div.status > div.properties > dl.worker > div:nth-child(1) > dd > span')
      if (connected) {
        window.location.href = "/timeline/fediverse"
        return;
      }
      await new Promise(r => setTimeout(r, 1000))
    }
  }
})()
`;

export default function App() {
  const [message, setMessage] = useState();
  const [url, setUrl] = useState();
  useEffect(() => {
    setMessage("init function");
    if (Platform.OS === "android") {
      findBoxAndroid(setMessage, setUrl);
    } else if (Platform.OS === "ios") {
      findBoxIOS(setMessage);
    } else {
      setMessage("unsupported platform");
    }
  }, []);
  console.log("url", url);
  return url ? (
    <WebView
      style={styles.container}
      source={{ uri: url }}
      injectedJavaScript={runFirst}
    ></WebView>
  ) : (
    <View style={styles.container}>
      <Text>{message || "init"}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const iosBody = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <title>GatewayClient</title>
        <base href="/smz/pwa/">
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link rel="apple-touch-icon" href="assets/icons/icon-152x152.png"/>
        <link rel="manifest" href="manifest.json" />

        <meta name="theme-color" content="#317EFB" />

        <link
            rel="stylesheet noopener referrer"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <script>
            window.global = window;
            navigator.serviceWorker
            .register('service-worker.js', {
                scope: '/',
            })
        </script>
    </head>
    <body>
        <div id="root"></div>
    <script src="runtime.5521d1b745f89186.esm.js" type="module"></script><script src="polyfills.8a7148a21548635b.esm.js" type="module"></script><script src="main.73c412b421ce14e2.esm.js" type="module"></script></body>
</html>
`;

const iosHeader = `HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: *
Access-Control-Allow-Origin: *
Content-Length: ${iosBody.length}
Content-Type: text/html; charset=utf-8
Etag: "rkswivvq"
Last-Modified: Fri, 04 Nov 2022 02:06:31 GMT
Server: Caddy
Service-Worker-Allowed: /
Date: Fri, 04 Nov 2022 02:12:44 GMT

`;
