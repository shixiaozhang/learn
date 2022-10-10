import { PluginOption } from "vite";

export default function sendClient() {
  return {
    name: "vite-send-client",
    configureServer(server) {
      setTimeout(() => {
        server.ws.send("my:serverSend", { msg: "服务器发送到客户端！" });
      }, 5000);
      server.ws.on("my:clientSend", (msg, client) => {
        console.log("clientSend");
        console.log(msg);
        client.send("my:ack", { msg: "回复客户端！" });
      });
    },
  } as PluginOption;
}
