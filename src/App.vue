<template>
  <div class="quiz-container-1">
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
body {
  width: auto;
  height: auto;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.quiz-container-1 {
  width: 100vw;
  height: 100vh;
}

.quiz-container {
  position: relative;
  display: inline-block;
  width: 49vw;
  height: 100vh;
  border-right: 4px dotted red;
  white-space: normal;
  overflow: hidden;
}

.quiz-container:last-of-type {
  border-right: none;
}
</style>
