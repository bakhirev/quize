<template>
  <div class="quiz-question">
    <div class="quiz-question-title">
      {{ question.title || '' }}
    </div>
    <div class="quiz-question-description">
      {{ question.description || '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationQuestion',
  props: {
    state: {
      type: Object,
      required: true
    },
    question: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped>
.quiz-question-title,
.quiz-question-description {
  font-weight: 100;
  line-height: 1.3;
  display: block;
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
  text-align: center;
}

.quiz-question-title {
  margin: 64px auto 12px auto;
  font-size: 26px;
  color: #363636;
}

.quiz-question-description {
  font-size: 18px;
  color: #999999;
}
</style>