<template>
  <DefaultQuestion
      :state="state"
      :question="question"
      :getAnswers="getAnswers"
      class="quiz-question-multiple"
      @update="$emit('update', $event)"
  >
    <template #header>
      <div class="quiz-question-notification">
        <svg class="quiz-question-icon" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
          <path d="M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z"
                fill-rule="nonzero"
                stroke-width="0"
          />
        </svg>
        <p class="quiz-question-text">
          выберите один или несколько
        </p>
      </div>
    </template>
  </DefaultQuestion>
</template>

<script>
import DefaultQuestion from './standart';

export default {
  name: 'MultipleQuestion',
  components: {
    DefaultQuestion,
  },
  props: {
    state: {
      type: Object,
      required: true
    },
    question: {
      type: Object,
      required: true
    },
    getAnswers: {
      type: Function,
      required: true
    },
  },
}
</script>

<style>
.quiz-question-multiple .quiz-question-body {
  column-count: 2;
}
</style>

<style scoped>
.quiz-question-notification {
  display: inline-block;
  padding: var(--space-xxs) var(--space-s);
  margin: var(--space-xxs) auto 0 auto;
  border: 1px solid var(--color-10);
  border-radius: 3px;
  background-color: var(--color-11);
  text-align: left;
}

.quiz-question-icon {
  display: inline-block;
  width: var(--space-m);
  height: var(--space-m);
  padding: 2px;
  margin: 0 var(--space-xs) 0 0;
  vertical-align: middle;
  border-radius: var(--space-m);
  fill: var(--color-5);
  background-color: var(--color-7);
}

.quiz-question-text {
  display: inline-block;
  font-size: var(--font-size-s);
  padding: 0;
  margin: 0;
  line-height: 1.3;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
