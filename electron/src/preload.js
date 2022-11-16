// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
(async function () {
  window.navigator.serviceWorker?.addEventListener("message", (event) => {
    console.log("got message", event.data);
    if (
      event.data?.type === "SERVER_PEER_STATUS" &&
      event.data?.status === "CONNECTED" &&
      window.location.pathname.includes("smz/pwa")
    ) {
      console.log("got connected");
      window.location.href = "/timeline/fediverse";
    }
  });
})();
