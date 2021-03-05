<template>
  <div class="quiz-question" :style="gridTemplate">
    <div class="quiz-question-header">
      <div v-if="question.title" class="quiz-question-title">
        {{ question.title }}
      </div>
      <div v-if="question.description" class="quiz-question-description">
        {{ question.description }}
      </div>
    </div>
    <div class="quiz-question-body">
      <QuizLoader
          v-if="isLoading"
          message="загрузка вариантов ответа"
      />
      <template v-else>
        <CommonAnswer
            v-for="answer in answers"
            :key="answer.id"
            :state="state"
            :answer="answer"
            :question="question"
            @update="$emit('update', $event)"
        />
      </template>
    </div>
    <img
        v-if="question.cover_url"
        class="quiz-question-cover"
        :src="EMPTY_IMAGE"
        :style="{
          'background-image': `url(${question.cover_url})`
         }"
    />
  </div>
</template>

<script>
import QuizLoader from '../loader';
import CommonAnswer from '../answers/common';

const EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4AWMAAQAABQABNtCI3QAAAABJRU5ErkJggg==';

export default {
  name: 'DefaultQuestion',
  components: {
    CommonAnswer,
    QuizLoader,
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
  data() {
    return {
      isLoading: false,
      answers: [],
      EMPTY_IMAGE,
    };
  },
  watch: {
    question: {
      handler() {
        this.isLoading = true;
        this.fetchAnswers()
            .finally(() => {
              this.isLoading = false;
            });
      },
      immediate: true
    },
  },
  computed: {
    gridTemplate() {
      let template = '"header header" "body body"';
      if (this.question.cover_url) template = '"header header" "body cover"';
      return {
        'grid-template-areas': template,
      };
    },
  },
  methods: {
    fetchAnswers() {
      return this.question.answers
          ? this.syncFetchAnswers()
          : this.asyncFetchAnswers();
    },
    syncFetchAnswers() {
      this.setAnswers(this.question.answers);
      return Promise.resolve();
    },
    asyncFetchAnswers() {
      return this.getAnswers(this.question.id).then(this.setAnswers);
    },
    setAnswers(answers) {
      this.answers = answers;
    },
  }
}
</script>

<style scoped>
.quiz-question {
  overflow-y: scroll;
  background-color: var(--color-5);

  display: grid;
  grid-template-areas: "header header" "body body";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px auto;
}

.quiz-question::-webkit-scrollbar {
  width: var(--space-xs);
}

.quiz-question::-webkit-scrollbar-track {
  background-color: transparent;
}

.quiz-question::-webkit-scrollbar-thumb {
  background-color: var(--color-6);
  outline: none;
}

.quiz-question-header {
  display: block;
  padding: var(--space-xxl);
  grid-area: header;
}

.quiz-question-title,
.quiz-question-description {
  display: block;
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  color: var(--color-1);
  text-decoration: none;
  text-align: left;
}

.quiz-question-title {
  font-size: 28px;
}

.quiz-question-description {
  font-size: var(--font-size-s);
}

.quiz-question-body {
  position: relative;
  padding: 0 var(--space-xxl);
  grid-area: body;
}

.quiz-question-cover {
  grid-area: cover;
  border: none;
  width: 100%;
  background-position: center center;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
</style>
