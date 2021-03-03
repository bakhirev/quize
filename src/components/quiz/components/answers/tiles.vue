<template>
  <div
      class="quiz-answer"
      @click="updateState"
  >
    <img
        :src="answer.cover_url || ''"
        :alt="answer.title || ''"
        class="quiz-answer-cover"
    />
    <div class="quiz-answer-title">
      {{ answer.title || '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TilesAnswer',
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
  display: inline-block;
  width: 40%;
  max-width: 200px;
  padding: 0;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 0 16px 16px 0;
  cursor: pointer;
  vertical-align: top;
}

.quiz-answer-cover {
  display: block;
  width: 100%;
  border-radius: 8px 8px 0 0;
  margin: 0;
}

.quiz-answer-title {
  display: block;
  margin: 8px 0;
  font-size: 16px;
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  color: #363636;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  white-space: normal;
}
</style>
