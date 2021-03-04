<template>
  <div>
    <div class="quiz-container">
      <Quiz :id="1"/>
    </div>
    <div class="quiz-container">
      <Quiz :quiz="quiz1"/>
    </div>
  </div>
</template>

<script>
import quiz1 from './examples/1'
import Quiz from './components/quiz'

export default {
  name: 'App',
  components: {
    Quiz
  },
  data() {
    return {
      quiz1,
    }
  }
}
</script>

<style scoped>
body {
  width: auto;
  height: auto;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.quiz-container {
  height: 49vh;
  display: block;
  border-bottom: 4px dotted red;
}

</style>
