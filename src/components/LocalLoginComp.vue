<template>
  <div class="columns is-centered">
    <div class="column has-text-centered is-3">
      <div class="columns is-1">
        <div class="column is-half">
          <button class="button is-primary" style="width:100%;" @click="localLogin">Sign Up</button>
        </div>
        <div class="column is-half">
          <button class="button is-primary" style="width:100%;" @click="localLogin">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref } from "@vue/composition-api";
// import { defineComponent } from "@vue/composition-api";
import Vue from "vue";

export default Vue.extend({
  name: "localLogin",
  setup() {
    const msg = "Hello Local login";
    const localLogin = () => {
      console.log("Local login");
    };
    return { msg, localLogin };
  }
});
</script>
