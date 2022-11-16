import Zeroconf from "react-native-zeroconf";
import { runProxy } from "./common";

export const findBox = async (setMessage, setUrl) => {
  const zeroconf = new Zeroconf();
  zeroconf.on("start", () => {
    setMessage("[Start]");
    // setMessage()
  });

  zeroconf.on("stop", () => {
    setMessage("[Stop]");
  });

  zeroconf.on("resolved", (service) => {
    setMessage("[Resolve] " + JSON.stringify(service, null, 2));
    console.log("got service", JSON.stringify(service, null, 2));
    if (service.name === "samizdapp") {
      runProxy(service.addresses[0], setMessage, setUrl);
      console.log("got samizdapp");
    }
  });

  zeroconf.on("found", (s) => {
    setMessage("[Found]");
  });

  zeroconf.on("error", (err) => {
    setMessage("[Error]");
    console.log(err);
  });

  zeroconf.scan("ssh", "tcp", "local.");
};
