<template>
  <div>
    <HomeComp msg="Vue.js + TypeScript + Oauth Facebook/Google/Twitter/Local" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import { defineComponent } from "@vue/composition-api";
import HomeComp from "../components/HomeComp.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {
    HomeComp
  }
});
</script>
