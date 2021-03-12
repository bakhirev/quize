<template>
  <div
      class="quiz-answer quiz-answer-select"
      :class="{
          'quiz-answer-checked': isChecked,
        }"
      @click="updateState"
  >
    <svg
        class="quiz-answer-icon"
        :class="{
          'quiz-answer-icon-checked': isChecked,
        }"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M.04.627L.146.52.43.804.323.91zm.177.177L.854.167.96.273.323.91z"
            fill-rule="nonzero"
            stroke-width="0"
      />
    </svg>
    <div class="quiz-answer-title">
      {{ answer.title || '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxAnswer',
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
      let values = this.state[this.answer.property] || [];
      const value = this.answer.value;
      if (values.includes(value)) values = values.filter(v => v !== value);
      else values.push(value);

      this.$emit('update', {
        state: {
          ...this.state,
          [this.answer.property]: values,
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
  cursor: pointer;
  transition: 0.3s border, 0.3s box-shadow;
  white-space: nowrap;
  box-sizing: border-box;
}

.quiz-answer-checked {
  border: 1px solid var(--color-7);
  box-shadow: 1px 1px 2px var(--color-12);
}

.quiz-answer:hover {
  box-shadow: 1px 1px 2px var(--color-3);
}

.quiz-answer-icon {
  display: inline-block;
  height: 20px;
  width: 20px;
  padding: 2px;
  box-sizing: border-box;
  border-radius: 2px;
  vertical-align: top;
  margin-right: var(--space-m);
  border: 1px solid var(--color-8);
  background-color: var(--color-8);
  fill: var(--color-8);
}

.quiz-answer-icon-checked {
  background-color: var(--color-6);
  border: 1px solid var(--color-6);
  fill: var(--color-5);
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
</style>
