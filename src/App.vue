<template>
  <div class="quiz-container">
    <Quiz :id="1"/>
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

<style>
.quiz-container {
  width: 1050px;
  height: 650px;
}
</style>
