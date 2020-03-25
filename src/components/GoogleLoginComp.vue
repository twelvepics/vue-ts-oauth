<template>
  <div>
    <div class="columns is-centered">
      <div class="column has-text-centered is-3">
        <button class="button is-primary" style="width:100%;" @click="googleLogin">Google Login</button>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-8 debug">
        <p class="debug_title">
          <b>Google debug</b>
          <a style="padding: 0 0 0 1rem;" @click="googleLogout">Sign out</a>
          <a style="padding: 0 0 0 1rem;" @click="googleStatus">get Status</a>
        </p>
        <p class="debug_message">{{debugMsg}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// import { defineComponent } from "@vue/composition-api";
import Vue from "vue";

import { onMounted, onUnmounted } from "@vue/composition-api";
import { loadScript, unloadScript } from "../utils/loadScript";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { reactive, ref } from "@vue/composition-api";

interface GoogleObj {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface GoogleResp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default Vue.extend({
  name: "logInWithGoogle",
  setup() {
    const msg = "Hello Google login";
    const debugMsg = ref("");
    // const GOOGLE_JS = "https://apis.google.com/js/platform.js";
    const GOOGLE_JS = "https://apis.google.com/js/api:client.js";

    const GOOGLE_CLIENT_ID =
      "163926892580-slj4oirv9rcs5h333q4rfa1i4t3efmfo.apps.googleusercontent.com";

    let GAPI: GoogleObj = {};
    let auth2: GoogleObj = {};
    // let GoogleStatus = "";
    // let GoogleToken = "";

    onMounted(() => {
      console.log("mounted!");
      loadScript(GOOGLE_JS)
        .then(() => {
          console.log("Google script loaded");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          GAPI = (window as any).gapi;
          console.log(GAPI);
          GAPI.load("auth2", () => {
            auth2 = GAPI.auth2.init({
              // eslint-disable-next-line @typescript-eslint/camelcase
              client_id: GOOGLE_CLIENT_ID,
              scope: "profile"
            });
            // console.log(auth2);
            // console.log(typeof auth2);
          });
        })
        .catch(err => {
          console.log("GOOGLE script failed");
          console.log(err.message);
        });
    });
    onUnmounted(() => {
      console.log("unmounted!");
      unloadScript(GOOGLE_JS);
    });
    // const login = (): Promise<GoogleResp> => {
    //   return new Promise(resolve => auth2.signin(resolve));
    // };
    const googleLogin = async (): Promise<void> => {
      console.log("Google login");
      // auth2.signIn().then(function()
      // https://developers.google.com/identity/sign-in/web/people
      try {
        await auth2.signIn();
        debugMsg.value = `Logged in: ${auth2.isSignedIn.get()}`;
        console.log("#---------------------#");
        console.log(auth2.currentUser.get().getId());
        /////////////////////////////////////////////////////
        // send this to server and check it there
        /////////////////////////////////////////////////////
        console.log(auth2.currentUser.get().getAuthResponse().id_token);

        console.log("#---------------------#");
        if (auth2.isSignedIn.get()) {
          const profile = auth2.currentUser.get().getBasicProfile();
          console.log("ID: " + profile.getId());
          console.log("Full Name: " + profile.getName());
          console.log("Given Name: " + profile.getGivenName());
          console.log("Family Name: " + profile.getFamilyName());
          console.log("Image URL: " + profile.getImageUrl());
          console.log("Email: " + profile.getEmail());
          console.log("#---------------------#");
        }
      } catch (err) {
        console.log("#---------------------#");
        console.log(err);
        console.log("#---------------------#");
      }
    };

    /////////////////////////////////////////////////////////
    // Logout
    /////////////////////////////////////////////////////////
    const googleLogout = () => {
      auth2.signOut().then(function() {
        console.log("User signed out.");
        console.log(auth2.isSignedIn.get());
        debugMsg.value = `Logged in: ${auth2.isSignedIn.get()}`;
      });
    };

    /////////////////////////////////////////////////////////
    // Status
    /////////////////////////////////////////////////////////
    const googleStatus = (): boolean => {
      const isSignedIn = auth2 && auth2.isSignedIn.get();
      debugMsg.value = `Logged in: ${isSignedIn}`;
      return isSignedIn;
    };

    // TODO
    return { msg, debugMsg, googleLogin, googleLogout, googleStatus };
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