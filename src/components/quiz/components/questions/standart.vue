<template>
  <div
      class="quiz-question"
      :class="{
        'quiz-question-with-cover': !!question.cover_url
      }"
  >
    <div class="quiz-question-header">
      <div v-if="question.title" class="quiz-question-title">
        {{ question.title }}
      </div>
      <div v-if="question.description" class="quiz-question-description">
        {{ question.description }}
      </div>
      <slot name="header" />
    </div>
    <div class="quiz-question-body">
      <slot name="body" />
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
    <div
        v-if="question.cover_url"
        class="quiz-question-cover-container"
    >
      <img
          class="quiz-question-cover"
          :src="EMPTY_IMAGE"
          :style="{
            'background-image': `url(${question.cover_url})`
          }"
      />
    </div>
  </div>
</template>

<script>
import QuizLoader from '../loader';
import CommonAnswer from '../answers/common';

const EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXYyAVMDAAAAAzAAH4qOFpAAAAAElFTkSuQmCC';

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
  grid-template-rows: minmax(100px, max-content) auto;
}

.quiz-question-with-cover {
  grid-template-areas: "header header" "body cover";
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
  grid-area: header;
  padding: var(--space-l) var(--space-xxl);
}

.quiz-question-title,
.quiz-question-description {
  display: block;
  width: 100%;
  font-weight: 100;
  line-height: 1.3;
  text-overflow: ellipsis;
  color: var(--color-1);
  text-decoration: none;
  text-align: left;
}

.quiz-question-title {
  font-size: 28px;
  font-family: "GilroyBold";
}

.quiz-question-description {
  font-size: var(--font-size-s);
}

.quiz-question-body {
  position: relative;
  padding: 0 var(--space-xxl);
  grid-area: body;
}

.quiz-question-cover-container {
  grid-area: cover;
  border: none;
  width: 100%;
  text-align: center;
}

.quiz-question-cover {
  display: block;
  margin: 0 auto;
  width: 100%;
  background-position: center center;
  background-size: 80% auto;
  background-repeat: no-repeat;
  vertical-align: top;
}

@media screen and (max-width: 850px) {
  .quiz-question {
    grid-template-areas: "header" "body";
    grid-template-columns: 1fr;
    grid-template-rows: minmax(100px, max-content) auto;
  }

  .quiz-question-with-cover {
    grid-template-areas: "header" "cover" "body";
    grid-template-rows: minmax(100px, max-content) minmax(400px, max-content) auto;
  }

  .quiz-question-cover {
    width: auto;
    height: 90%;
    background-size: auto 80%;
  }
}
</style>
