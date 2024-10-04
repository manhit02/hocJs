"use Client";

import { useEffect } from "react";
interface P {
  appID: string;
}
const LayoutFacebook = (props: P) => {
  const { appID } = props;
  useEffect(() => {
    // Initialize Facebook SDK with your App ID
    function initialize() {
      //@ts-ignore
      FB.init({
        appId: appID ? appID : "",
        status: true,
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    }

    //@ts-ignore
    if (window.FB === undefined) {
      //@ts-ignore
      window.fbAsyncInit = function () {
        //@ts-ignore
        initialize();
      };
    } else {
      //@ts-ignore
      initialize();
    }
    //@ts-ignore
    const fbApi = (function () {
      var fbApiInit = false;
      //@ts-ignore
      var awaitingReady = [];

      var notifyQ = function () {
        var i = 0,
          l = awaitingReady.length;
        for (i = 0; i < l; i++) {
          //@ts-ignore
          awaitingReady[i]();
        }
      };

      var ready = function (cb: any) {
        if (fbApiInit) {
          cb();
        } else {
          awaitingReady.push(cb);
        }
      };

      //@ts-ignore

      return {
        /**
         * Fires callback when FB is initialized and ready for api calls.
         */
        ready: ready,
      };
    })();

    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      //@ts-ignore
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      //@ts-ignore
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return <></>;
};
export default LayoutFacebook;
