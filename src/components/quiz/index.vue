<template>
  <div class="quiz" :style="gridTemplate">
    <QuizLoader
        v-if="isLoading"
        message="загрузка вопросов"
    />
    <template v-else>
      <Question
          :state="localState"
          :question="currentQuestion"
          :getAnswers="getAnswers"
          class="quiz-question"
          :class="{
            'quiz-question-cl-animation': animationCode === ANIMATION_CODE.FROM_CENTER_TO_LEFT,
            'quiz-question-lc-animation': animationCode === ANIMATION_CODE.FROM_LEFT_TO_CENTER,
            'quiz-question-rc-animation': animationCode === ANIMATION_CODE.FROM_RIGHT_TO_CENTER,
            'quiz-question-cr-animation': animationCode === ANIMATION_CODE.FROM_CENTER_TO_RIGHT,
          }"
          @update="updateState"
      />
      <Helper
          v-if="!showOnlyQuestion && currentHelp"
          :help="currentHelp"
          class="quiz-help"
      />
      <Footer
          v-if="!showOnlyQuestion"
          :step="currentStep"
          :total="totalSteps"
          @prev="openPrevStep"
          @next="openNextStep"
          class="quiz-footer"
      />
    </template>
  </div>
</template>

<script>
import Question from './components/questions/common';
import Footer from './components/footer';
import QuizLoader from './components/loader';
import Helper from './components/helper';
import {
  getQuiz,
  getQuestions,
  getAnswers,
  getHelps,
} from './api';
import {
  ANIMATION_CODE,
  ANSWER_TEMPLATES,
  QUESTION_TEMPLATES,
} from "./helpers/constants";


export default {
  name: 'Quiz',
  components: {
    Question,
    Footer,
    QuizLoader,
    Helper,
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
      helps: [],
      questionQueue: [],
      currentStep: 0,
      currentQuestionId: 0,
      animationCode: null,
      ANIMATION_CODE,
    };
  },
  created() {
    this.isLoading = true;
    this.fetchQuiz()
        .then(() => this.fetchQuestions())
        .then(() => this.fetchHelps())
        .finally(() => {
          this.isLoading = false;
        });
  },
  computed: {
    totalSteps() {
      return this.questions.length;
    },
    currentQuestion() {
      const currentQuestion = this.questions
          .find(({id}) => id === this.currentQuestionId);
      if (!currentQuestion) return currentQuestion;

      return {
        template_id: currentQuestion.template_id || 1,
        ...currentQuestion,
      };
    },
    currentHelp() {
      const helpFromTest = this.quiz?.help;
      const helpFromQuestion = this.currentQuestion?.help;
      const helpFromList = this.helps.find(({question_id}) => question_id === this.currentQuestionId);
      return helpFromQuestion || helpFromList || helpFromTest;
    },
    questionIds() {
      return this.questions.map(({id}) => id);
    },
    gridTemplate() {
      let template = '"question question" "footer footer"';
      if (this.currentHelp) template = '"question help" "footer help"';
      return {
        'grid-template-areas': template,
      };
    },
    showOnlyQuestion() {
      return [
        QUESTION_TEMPLATES.FORM,
        QUESTION_TEMPLATES.NOTIFICATION,
      ].includes(this.currentQuestion?.template_id);
    }
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
      this.questionQueue = [this.currentQuestionId];
    },

    fetchHelps() {
      return this.localQuiz.helps
          ? this.syncFetchHelps()
          : this.asyncFetchHelps();
    },
    syncFetchHelps() {
      this.setHelps(this.localQuiz.helps);
      return Promise.resolve();
    },
    asyncFetchHelps() {
      return getHelps(this.localQuiz.id).then(this.setHelps);
    },
    setHelps(helps) {
      this.helps = helps;
    },

    getAnswers: getAnswers,
    openPrevStep() {
      let index = this.questionQueue.indexOf(this.currentQuestionId);
      if (index > 0) index -= 1;
      if (index > -1) this.changeQuestion(this.questionQueue[index], -1);
      this.currentStep = this.questionIds.indexOf(this.currentQuestionId);
    },
    openNextStep() {
      const index = this.questionQueue.indexOf(this.currentQuestionId) + 1;
      if (index >= this.questionQueue.length) {
        if (this.currentQuestion.template_id !== QUESTION_TEMPLATES.DEFAULT) this.nextStep();
        return;
      }
      this.changeQuestion(this.questionQueue[index]);
      this.currentStep = this.questionIds.indexOf(this.currentQuestionId);
    },
    updateState({state, question, answer}) {
      this.localState = {...state};
      const needUseNextButton = answer.template_id === ANSWER_TEMPLATES.RANGE
        || question.template_id === QUESTION_TEMPLATES.MULTIPLE;
      if (needUseNextButton) return;
      this.nextStep(question, answer);
    },
    nextStep(question = this.currentQuestion, answer = {}) {
      this.currentStep = this.questionIds.indexOf(question.id) + 1;
      const questionId = answer.next_question_id
          || question.next_question_id
          || this.questionIds[this.currentStep];
      this.changeQuestion(questionId);
    },

    changeQuestion(questionId, direction = 1) {
      const delay = 250;
      this.beginAnimation(direction);
      setTimeout(() => {
        this.revertAnimation(questionId, direction);
      }, delay);
      setTimeout(() => {
        this.endAnimation();
      }, delay * 2);
    },
    beginAnimation(direction) {
      this.animationCode = direction === 1
          ? ANIMATION_CODE.FROM_CENTER_TO_LEFT
          : ANIMATION_CODE.FROM_CENTER_TO_RIGHT;
    },
    revertAnimation(questionId, direction) {
      this.currentQuestionId = questionId;
      if (!this.questionQueue.includes(questionId)) this.questionQueue.push(questionId);
      this.animationCode = direction === 1
          ? ANIMATION_CODE.FROM_RIGHT_TO_CENTER
          : ANIMATION_CODE.FROM_LEFT_TO_CENTER;
    },
    endAnimation() {
      this.animationCode = null;
    }
  }
}
</script>

<style scoped>
@import "./style/question-animation.css";
@import "./style/variables.css";

.quiz {
  position: relative;
  height: 100%;
  width: 100%;
  font-family: "GilroyRegular";
  font-size: var(--font-size-m);
  overflow: hidden;
  background-color: #F8F8F8;

  display: grid;
  grid-template-areas: "question help" "footer help";
  grid-template-columns: auto 300px;
  grid-template-rows: auto 77px;
}

.quiz-question {
  grid-area: question;
}

.quiz-help {
  grid-area: help;
}

.quiz-footer {
  grid-area: footer;
}
</style>
