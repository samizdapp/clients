import { Linking } from "react-native";
import WifiManager from "react-native-wifi-reborn";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

export const findBox = async (setMessage) => {
  setMessage("get SSID");
  console.log("get SSID");
  const res = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  const ssid = await WifiManager.getCurrentWifiSSID().catch((e) => {
    console.log("ssid error", e);
    return "";
  });

  setMessage("connect to SamizdApp, stashing old ssid: " + ssid);

  const error = await WifiManager.connectToProtectedSSID(
    "SamizdApp",
    "samizdapp",
    false
  ).catch((e) => {
    console.log("connect error", e);
    return e.message;
  });

  if (error) {
    return setMessage("error: " + error);
  }

  setMessage("connected, waiting for redirect");
  //   await new Promise((r) => setTimeout(r, 5000));
  Linking.openURL("http://samizdapp.localhost/smz/pwa");
};
