<template>
  <div class="quiz-loader">
    <div class="quiz-loader-container">
      {{ message || '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizLoader',
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.quiz-loader {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #F8F8F8;
  opacity: 0.7;
}

.quiz-loader-container {
  display: block;
  text-align: center;
}
</style>
