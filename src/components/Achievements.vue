<template>
  <div class="achievements">
      <p class="completed">Completaste {{this.$parent.user.achievements.tasksCompleted}} tarefas.</p>
      <p class="points">Tens {{this.$parent.user.achievements.pointsWon}} Pontos</p>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "Achievements",
  data() {
    return {
      
    };
  }
};
</script>
