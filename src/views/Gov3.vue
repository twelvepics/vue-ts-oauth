<template>
  <div>
    <h4 style="margin-bottom:2rem;">
      <b>{{ msg }}</b>
    </h4>
    <div style="margin-bottom:2rem;">
      <button class="button" @click="addUser">add user</button>
      &nbsp;
      <button class="button" @click="delUser">delete user</button>
      &nbsp;
      <button class="button" @click="toggleShow">show/hide users</button>
    </div>
    <div v-if="showUsers">
      <p v-for="(user, idx) in usersList.users" :key="idx">{{ user }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import faker from "faker";
import { reactive } from "@vue/composition-api";
import { useToggle } from "../cmp-functions/toggle";
// import { defineComponent } from "@vue/composition-api";
import Vue from "vue";

export default Vue.extend({
  name: "Gov3",
  setup() {
    const msg = "Hello V3";
    //--
    const usersList: { users: string[] } = reactive({
      users: []
    });
    const addUser = () => {
      console.log("Add User");
      usersList.users.push(faker.internet.email());
    };
    const delUser = () => {
      console.log("Del User");
      const newUsers = [...usersList.users];
      // const newUsers = JSON.parse(JSON.stringify(users));
      newUsers.splice(Math.floor(Math.random() * newUsers.length), 1);
      usersList.users = newUsers;
    };
    //--
    const { show: showUsers, toggle: toggleShow } = useToggle();

    return { msg, usersList, showUsers, addUser, delUser, toggleShow };
  }
});
</script>

<style></style>
