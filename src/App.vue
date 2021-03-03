<template>
  <div>
    <QuizQuestion :id="1"/>
  </div>
</template>

<script>
import QuizQuestion from './components/quiz'

export default {
  name: 'App',
  components: {
    QuizQuestion
  }
}
</script>

<style>
body {
  width: auto;
  height: auto;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
