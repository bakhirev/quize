<template>
  <div class="quiz-answer">
    <div class="quiz-answer-title">
      {{ answer.title || '' }}
    </div>
    <textarea
        v-model="value"
        class="quiz-answer-textarea"
        :placeholder="answer.description || ''"
        @blur="updateState"
    />
  </div>
</template>

<script>
export default {
  name: 'TextareaAnswer',
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
    }
  },
  data() {
    return {
      value: this.state[this.answer.property] || '',
    };
  },
  methods: {
    updateState() {
      this.$emit('update', {
        state: {
          ...this.state,
          [this.answer.property]: this.value
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
  padding: 0;
}

.quiz-answer-title {
  display: block;
  margin: 0 0 16px 0;
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

.quiz-answer-textarea {
  width: 100%;
  height: 80%;
  min-height: 300px;
  outline: none;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  resize: none;
}
</style>
