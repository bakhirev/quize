<template>
  <div
      class="quiz-answer quiz-answer-select"
      :class="{
          'quiz-answer-checked': isChecked,
        }"
      @click="updateState"
  >
    <span
        :class="{
          'quiz-answer-icon-checked': isChecked,
        }"
        class="quiz-answer-icon"
    ></span>
    <div class="quiz-answer-title">
      {{ answer.title || '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectAnswer',
  props: {
    state: {
      type: Object,
      required: true
    },
    question: {
      type: Object,
      required: true
    },
    answer: {
      type: Object,
      required: true
    },
    isChecked: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    updateState() {
      this.$emit('update', {
        state: {
          ...this.state,
          [this.answer.property]: this.answer.value
        },
        question: this.question,
        answer: this.answer,
      });
    }
  }
}
</script>

<style scoped>
@import "../../style/answer-animation-select.css";

.quiz-answer {
  display: block;
  padding: var(--space-l);
  border: 1px solid var(--color-8);
  border-radius: var(--space-s);
  margin-bottom: var(--space-l);
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s border, 0.3s box-shadow;
}

.quiz-answer-checked {
  border: 1px solid var(--color-7);
  box-shadow: 1px 1px 2px var(--color-12);
}

.quiz-answer:hover {
  box-shadow: 1px 1px 2px var(--color-3);
}

.quiz-answer-icon {
  position: relative;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  box-sizing: border-box;
  vertical-align: top;
  margin-right: var(--space-m);
  border: 3px solid var(--color-8);
  background-color: var(--color-8);
}

.quiz-answer-icon-checked {
  border: 3px solid var(--color-6);
  box-shadow: 1px 1px 2px var(--color-11);
}

.quiz-answer-icon-checked::after {
  content: '';
  position: absolute;
  top: 1.8px;
  left: 1.8px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: var(--color-6);
}

.quiz-answer-title {
  display: inline-block;
  font-size: var(--font-size-m);
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  color: var(--color-1);
  text-decoration: none;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

@media screen and (max-width: 850px) {
  .quiz-answer-title {
    overflow: hidden;
    width: 80%;
  }
}
</style>
