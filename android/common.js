import net from "react-native-tcp-socket";
import { Linking } from "react-native";

export const runProxy = async (boxhost, setMessage, setUrl) => {
  const server = new net.Server();

  server.on("connection", (socket) => {
    setMessage("got socket");
    const forward = new net.Socket();
    let connected = false;
    const chunks = [];
    socket.on("data", (d) => {
      if (!connected) {
        chunks.push(d);
      } else {
        forward.write(d);
      }
    });

    forward.on("data", (d) => {
      // console.log(d.toString());
      console.log("got forward data");
      socket.write(d);
    });

    forward.connect(
      {
        port: 80,
        host: boxhost,
        reuseAddress: true,
      },
      () => {
        setMessage("got forward connect");
        connected = true;
        for (const c of chunks) {
          forward.write(c);
        }
      }
    );
  });

  console.log("server listen");
  server.listen({ port: 8080, host: "127.0.0.1", reuseAddress: true }, () => {
    console.log("listen cb");
    setMessage("listen cb");
    const url = `http://localhost:8080/smz/pwa/`;
    setUrl(url);
    // Linking.openURL(url);
  });
};
