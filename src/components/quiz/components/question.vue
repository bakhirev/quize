<template>
  <div class="quiz-question">
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
        <Answer
            v-for="answer in answers"
            :key="answer.id"
            :state="state"
            :answer="answer"
            :question="question"
            @update="$emit('update', $event)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import QuizLoader from './loader';
import Answer from './answers';

export default {
  name: 'QuizQuestion',
  components: {
    Answer,
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
      answers: []
    };
  },
  watch: {
    question() {
      this.isLoading = true;
      this.fetchAnswers()
          .finally(() => {
            this.isLoading = false;
          });
    },
  },
  created() {
    this.isLoading = true;
    this.fetchAnswers()
        .finally(() => {
          this.isLoading = false;
        });
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
}

.quiz-question-header {
  display: block;
  padding: 32px;
}

.quiz-question-title {
  display: block;
  font-size: 28px;
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  color: #363636;
  text-decoration: none;
  text-align: left;
}

.quiz-question-description {
}

.quiz-question-body {
  position: relative;
  padding: 0 32px 90px 32px;
}
</style>
