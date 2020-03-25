<template>
  <div>
    <div class="columns is-centered">
      <div class="column has-text-centered is-3">
        <button class="button is-primary" style="width:100%" @click="facebookLogin">FB login</button>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-8 debug">
        <p class="debug_title">
          <b>Facebook debug</b>
          <a style="padding: 0 0 0 1rem;" @click="getLoginStatus">Login status</a>
          <a style="padding: 0 0 0 1rem;" @click="getFBId">Facebook ID</a>
          <a style="padding: 0 0 0 1rem;" @click="getFBToken">Facebook Token</a>
          <a style="padding: 0 0 0 1rem;" @click="getUserInfo">User info</a>
          <a style="padding: 0 0 0 1rem;" @click="facebookLogout">Sign out</a>
        </p>
        <p class="debug_message">{{debugMsg}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, onUnmounted } from "@vue/composition-api";
import { loadScript, unloadScript } from "../utils/loadScript";

import Vue from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { reactive, ref } from "@vue/composition-api";

interface FBObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface FBResp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export default Vue.extend({
  name: "logInWithFacebook",

  setup() {
    const msg = "Hello Facebook login";
    const debugMsg = ref("");
    const FACEBOOK_JS = "https://connect.facebook.net/en_US/sdk.js";
    const FACEBOOK_APP_ID = "645694069561604";
    let FBAPI: FBObj = {};
    let FBStatus = "";
    let FBToken = "";
    let FBUserID = "";
    let FBSignedRequest = "";

    onMounted(() => {
      console.log("mounted!");
      loadScript(FACEBOOK_JS)
        .then(() => {
          console.log("FB script loaded");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          FBAPI = (window as any).FB;
          // console.log(FB);
          // console.log(typeof FB);
          FBAPI.init({
            appId: FACEBOOK_APP_ID,
            status: false,
            cookie: false,
            xfbml: false,
            version: "v6.0"
          });
        })
        .catch(err => {
          console.log("FB script failed");
          console.log(err.message);
        });
    });

    onUnmounted(() => {
      console.log("unmounted!");
      unloadScript(FACEBOOK_JS);
    });

    /////////////////////////////////////////////////////////
    // Login
    /////////////////////////////////////////////////////////
    // curl -i -X GET "https://graph.facebook.com/debug_token?input_token={input-token}&access_token={valid-access-token}
    /////////////////////////////////////////////////////////

    const login = (): Promise<FBResp> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve, reject) => {
        FBAPI.login(
          (response: FBResp) => {
            resolve(response);
          },
          { scope: "public_profile, email" }
        );
      });
    };
    const facebookLogin = async (): Promise<void> => {
      console.log("Facebook login");
      try {
        const resp = await login();
        console.log(resp);
        FBStatus = resp.status;
        if (resp && resp.authResponse && resp.status === "connected") {
          console.log("LOGIN OK");
          /////////////////////////////////////////////////////
          // send this FBToken to server and check it there
          /////////////////////////////////////////////////////
          FBToken = resp.authResponse.accessToken;
          FBUserID = resp.authResponse.userID;
          FBSignedRequest = resp.authResponse.signedRequest;
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      } catch (err) {
        console.log("#-------- Login error -------#");
        console.log(err);
        console.log(err.message);
        console.log("LOGIN NOK");
        console.log("#-------- End Login error -------#");
      }
    };

    /////////////////////////////////////////////////////////
    // Get status
    /////////////////////////////////////////////////////////
    const status = (): Promise<FBResp> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve, reject) => {
        FBAPI.getLoginStatus((response: FBResp) => {
          resolve(response);
        });
      });
    };

    const getLoginStatus = async (): Promise<void> => {
      console.log("Get login status");
      debugMsg.value = "";
      const resp = await status();
      FBStatus = resp.status;
      if (resp && resp.authResponse && resp.status === "connected") {
        console.log("LOGIN OK");
        /////////////////////////////////////////////////////
        // send this FBToken to server and check it there
        /////////////////////////////////////////////////////
        FBToken = resp.authResponse.accessToken;
        FBUserID = resp.authResponse.userID;
        FBSignedRequest = resp.authResponse.signedRequest;
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
      console.log(resp.authResponse);
      debugMsg.value = `Status: ${resp.status}`;
    };

    /////////////////////////////////////////////////////////
    // Get ID
    /////////////////////////////////////////////////////////
    const getFBId = (): void => {
      console.log("Get FB ID");
      debugMsg.value = `ID: ${FBUserID}`;
    };

    /////////////////////////////////////////////////////////
    // Get Token
    /////////////////////////////////////////////////////////
    const getFBToken = (): void => {
      console.log("Get FB token");
      debugMsg.value = `Token: ${FBToken.substring(0, 50)}...`;
    };

    /////////////////////////////////////////////////////////
    // Get Info
    /////////////////////////////////////////////////////////
    const info = (): Promise<FBResp> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return new Promise((resolve, reject) => {
        FBAPI.api(
          `/me`,
          (response: FBResp) => {
            resolve(response);
          },
          { fields: "id, name, first_name, email, short_name" }
        );
      });
    };

    const getUserInfo = async (): Promise<void> => {
      try {
        console.log("Get User Info");
        debugMsg.value = "";
        const resp = await info();
        console.log(resp);
        const { name, id, email } = resp;
        debugMsg.value = `Welcome ${name} / ${id} / ${email}`;
      } catch (err) {
        console.log("YOLOLO ERROR");
        console.log(err);
      }
    };

    /////////////////////////////////////////////////////////
    // Logout
    /////////////////////////////////////////////////////////
    const facebookLogout = () => {
      FBAPI.logout(function(response: FBResp) {
        // user is now logged out
        console.log("Signed out");
        console.log(response);
      });
    };

    return {
      msg,
      debugMsg,
      facebookLogin,
      getLoginStatus,
      getFBId,
      getFBToken,
      getUserInfo,
      facebookLogout
    };
  }
});
</script>
<style scoped>
.debug {
  background-color: #ddd;
  border: 1px solid #aaa;
  margin-bottom: 2rem;
  text-align: left;
  min-height: 100px;
}
.debug .debug_title {
  border-bottom: 1px solid #aaa;
}
/* .debug .debug_message {
} */
</style>

