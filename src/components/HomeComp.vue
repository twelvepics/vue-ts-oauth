<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomeComp",
  props: {
    msg: String
  }
});

// import { defineComponent } from "@vue/composition-api";

// export default defineComponent({
//   name: "HomeComp",
//   props: {
//     msg: String
//   }
// });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
