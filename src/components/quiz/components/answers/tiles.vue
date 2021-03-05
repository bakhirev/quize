<template>
  <div
      class="quiz-answer"
      @click="updateState"
  >
    <img
        :src="answer.cover_url || EMPTY_IMAGE"
        :alt="answer.title || ''"
        class="quiz-answer-cover"
    />
    <div class="quiz-answer-title">
      {{ answer.title || '' }}
    </div>
  </div>
</template>

<script>
const EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4AWMAAQAABQABNtCI3QAAAABJRU5ErkJggg==';

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
  data() {
    return {
      EMPTY_IMAGE,
    };
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
  max-width: 180px;
  padding: 0;
  border: 1px solid var(--color-8);
  border-radius: var(--space-s);
  margin: 0 var(--space-l) var(--space-l) 0;
  cursor: pointer;
  vertical-align: top;
  transition: 0.3s box-shadow;
}

.quiz-answer:hover {
  box-shadow: 0 0 var(--space-xs) var(--color-6);
}

.quiz-answer-cover {
  display: block;
  width: 100%;
  border-radius: var(--space-s) var(--space-s) 0 0;
  margin: 0;
}

.quiz-answer-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--space-s) 0;
  height: var(--space-xxl);
  font-size: var(--font-size-s);
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  white-space: normal;
  color: var(--color-1);
}
</style>
