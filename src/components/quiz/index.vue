<template>
  <div class="quiz">
    <QuizLoader
        v-if="isLoading"
        message="загрузка вопросов"
    />
    <template v-else>
      <Question
          :state="state"
          :question="currentQuestion"
          :getAnswers="getAnswers"
          @update="updateState"
      />
    </template>
    <Footer
        :step="currentStep"
        :total="totalSteps"
        @prev="openPrevStep"
        @next="openNextStep"
    />
  </div>
</template>

<script>
import Question from './components/question';
import Footer from './components/footer';
import QuizLoader from './components/loader';
import {
  getQuiz,
  getQuestions,
  getAnswers,
} from './api';

export default {
  name: 'QuizQuestion',
  components: {
    Question,
    Footer,
    QuizLoader,
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    quiz: {
      type: Object,
      default: null
    },
    state: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      localState: this.state,
      localQuiz: {},
      isLoading: false,
      questions: [],
      currentStep: 0,
      currentQuestionId: 0,
    };
  },
  created() {
    this.isLoading = true;
    this.fetchQuiz()
        .then(() => this.fetchQuestions())
        .finally(() => {
          this.isLoading = false;
        });
  },
  computed: {
    totalSteps() {
      return this.questions.length;
    },
    currentQuestion() {
      return this.questions
          .find(({id}) => id === this.currentQuestionId);
    },
    questionIds() {
      return this.questions.map(({id}) => id);
    },
  },
  methods: {
    fetchQuiz() {
      return this.quiz
          ? this.syncFetchQuiz()
          : this.asyncFetchQuiz();
    },
    syncFetchQuiz() {
      this.setQuiz(this.quiz);
      return Promise.resolve();
    },
    asyncFetchQuiz() {
      return getQuiz(this.id).then(this.setQuiz);
    },
    setQuiz(quiz) {
      this.localQuiz = quiz;
    },

    fetchQuestions() {
      return this.localQuiz.questions
          ? this.syncFetchQuestions()
          : this.asyncFetchQuestions();
    },
    syncFetchQuestions() {
      this.setQuestions(this.localQuiz.questions);
      return Promise.resolve();
    },
    asyncFetchQuestions() {
      return getQuestions(this.localQuiz.id).then(this.setQuestions);
    },
    setQuestions(questions) {
      this.questions = questions;
      this.currentQuestionId = this.localQuiz.firstQuestionId || questions[0].id;
    },

    getAnswers: getAnswers,
    openPrevStep() {
    },
    openNextStep() {
    },
    updateState({state, question, answer}) {
      this.localState = state;
      this.currentStep = this.questionIds.indexOf(question.id) + 1;
      this.currentQuestionId = answer.next_question_id
          || question.next_question_id
          || this.questionIds[this.currentStep];
    },
  }
}
</script>

<style scoped>
.quiz {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  font-family: Arial, Verdana, sans-serif;
  font-size: 16px;
}
</style>
