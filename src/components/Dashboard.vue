<template>
  <div class="container">
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="columns">
          <div class="column is-three-fifths">
            <input
              v-model="newCardValue"
              type="text"
              class="input"
              placeholder="Please insert your card name"
            >
          </div>
          <div class="column is-two-fifth">
            <button @click="insertCard()" class="button is-dark is-fullwidth">Insert Card</button>
          </div>
        </div>
      </div>
      <div class="column">
        <achievements></achievements>
      </div>
    </div>
    <div class="columns" style="overflow-x: scroll; height: 80vh; padding-right: 40px;">
      <div class="column is-one-third" v-for="(card, index) in cards">
        <article class="message is-dark">
          <div class="message-header">
            <p>{{card.name}}</p>
            <button @click="removeCard(index)" class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body" style="padding: 0;">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>List of Tasks</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(task, index) in card.tasks"
                  :class="{'has-background-success': task.status}"
                  @click="changeTaskStatus(card, index)"
                  @dblclick="removeTask(card, index)"
                >
                  <td>{{task.name}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td class="is-paddingless">
                    <input
                      @keyup.enter="insertTask(card)"
                      v-model="newTaskValue"
                      type="text"
                      class="input is-small"
                      placeholder="Please insert your task"
                    >
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </article>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p>Completed a total of {{filterByStatus}} / {{totalCards}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Achievements from "./Achievements";
export default {
  name: "Dashboard",
  components: {
    Achievements
  },
  data() {
    return {
      newCardValue: "",
      newTaskValue: "",
      cards: [],
      user: {
        achievements: { tasksCompleted: 0, pointsWon: 0 }
      }
    };
  },
  methods: {
    insertCard() {
      this.cards.push({
        name: this.newCardValue,
        tasks: [],
        status: false
      });
      this.saveCardsExceptTeam();
    },
    removeCard(index) {
      if (confirm("quer mesmo apagar?")) {
        this.cards.splice(index, 1);
      }
      this.saveCardsExceptTeam();
    },
    insertTask(card) {
      card.tasks.push({
        name: this.newTaskValue,
        status: false
      });
      if (card.name == "Team") {
        let taskName = this.newTaskValue;
        axios
          .get("http://joaomorais.info/repo/vuejs-tutorial/db.php", {
            params: { task: taskName }
          })
          .then(function(response) {
            console.log(response);
          });
      }
      this.saveCardsExceptTeam();
    },
    removeTask(card, index) {
      if (confirm("quer mesmo apagar?")) {
        card.tasks.splice(index, 1);
      }
      this.saveCardsExceptTeam();
    },
    changeTaskStatus(card, index) {
      card.tasks[index].status = !card.tasks[index].status;
      if (card.tasks[index].status) {
        this.user.achievements.tasksCompleted += 1;
      } else if (this.user.achievements.tasksCompleted != 0) {
        this.user.achievements.tasksCompleted += -1;
      }
      this.user.achievements.pointsWon =
        this.user.achievements.tasksCompleted * 25;
      localStorage.setItem(
        "userAchievements",
        JSON.stringify(this.user.achievements)
      );
    },
    saveCardsExceptTeam() {
      localStorage.setItem(
        "cardsExceptTeam",
        JSON.stringify(
          this.cards.filter(function(card, index) {
            return index != 0;
          })
        )
      );
    }
  },
  computed: {
    totalCards() {
      return this.cards.length;
    },
    filterByStatus() {
      return this.cards.filter(function(card) {
        let cardCompleted = false;
        cardCompleted =
          card.tasks.filter(function(task) {
            return task.status === true;
          }).length === card.tasks.length;
        return cardCompleted;
      }).length;
    },
    teamTasks() {
      return this.cards[0].tasks;
    }
  },
  created() {},
  mounted() {
    if (localStorage.getItem("cardsExceptTeam")) {
      this.cards = JSON.parse(localStorage.getItem("cardsExceptTeam"));
    }
    let thisComponent = this;
    axios
      .get("http://joaomorais.info/repo/vuejs-tutorial/db.php")
      .then(function(response) {
        thisComponent.cards.unshift({
          name: "Team",
          tasks: response.data.map(function(task) {
            return {
              name: task,
              status: false
            };
          }),
          status: false
        });
      });
    if (localStorage.getItem("userAchievements"))
      this.user.achievements = JSON.parse(
        localStorage.getItem("userAchievements")
      );
  },
  watch: {}
};
</script>
