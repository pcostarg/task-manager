<template>
  <div class="list-users">
    <div class="container">
      <div class="columns">
        <div class="column" v-for="(user, index) in users">
          Name: {{user.name}} - username: {{user.username}}
          <a
            href="#"
            @click="removeUser(user, index)"
            class="link"
          >X</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: []
    };
  },
  methods: {
    removeUser(user, index) {
      let thisComponentUsers = this;
      axios
        .get(
          "http://joaomorais.info/repo/vuejs-tutorial/user.php?who=pcostarg",
          {
            params: {
              who: "pcostarg",
              remove: index
            }
          }
        )
        .then(function(response) {
          thisComponentUsers.getUsers();
        });
    },
    getUsers() {
      let thisComponentUsers = this;
      axios
        .get(
          "http://joaomorais.info/repo/vuejs-tutorial/user.php?who=pcostarg",
          {
            who: "pcostarg"
          }
        )
        .then(function(response) {
          thisComponentUsers.users = response.data;
        });
    }
  },
  created() {},
  mounted() {
    this.getUsers();
  }
};
</script>
