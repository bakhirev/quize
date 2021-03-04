<template>
  <div
      class="quiz-answer"
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
.quiz-answer {
  display: block;
  padding: 16px;
  border: 1px solid gray;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
}

.quiz-answer-icon {
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  vertical-align: top;
  margin-right: 12px;
  border: 1px solid gray;
  background-color: #FFFFFF;
}

.quiz-answer-icon-checked {
  background-color: #FFAA00;
}

.quiz-answer-title {
  display: inline-block;
  font-size: 16px;
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  color: #363636;
  text-decoration: none;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}
</style>
