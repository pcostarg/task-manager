<template>
  <div class="create-user-form">
    <label for="name">name</label>
    <input required type="text" name="name" id="name" v-model="user.name">
    <label for="username">username</label>
    <input required type="text" name="username" id="username" v-model="user.username">
    <label for="points">points</label>
    <input type="text" name="points" id="points" v-model="user.points">
    <label for="email">email</label>
    <input type="text" name="email" id="email" v-model="user.email">
    <label for="password">password</label>
    <input required type="password" name="password" id="password" v-model="user.password">
    <label for="avatar">avatar</label>
    <input type="text" name="avatar" id="avatar" v-model="user.avatar">
    <button @click="createUser">Send</button>
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    createUser() {
      const thisUser = this.user;
      axios
        .get("http://joaomorais.info/repo/vuejs-tutorial/user.php", {
          params: {
            who: "pcostarg",
            name: thisUser.name,
            username: thisUser.username,
            points: thisUser.points,
            email: thisUser.email,
            password: thisUser.password,
            avatar: thisUser.avatar
          }
        })
        .then(function(response) {
          console.log(response);
        });
      this.$router.push("Users");
    }
  }
};
</script>
