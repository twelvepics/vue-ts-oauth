<template>
  <div>
    <facebook-login-comp class="login-button" />
    <google-login-comp class="login-button" />
    <local-login-comp class="login-button" />
  </div>
</template>

<script>
// @ is an alias to /src
import FacebookLoginComp from "@/components/FacebookLoginComp.vue";
import GoogleLoginComp from "@/components/GoogleLoginComp.vue";
import LocalLoginComp from "@/components/LocalLoginComp.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  components: {
    FacebookLoginComp,
    GoogleLoginComp,
    LocalLoginComp
  }
});
</script>
<style lang="scss" scoped>
.login-button {
  padding: 0 0 0.5rem 0;
}
</style>

