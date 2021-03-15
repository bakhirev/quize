<template>
  <div class="quiz-question">
    <div class="quiz-question-title">
      Оставьте ваши контактные данные
    </div>
    <div class="quiz-question-description">
      И мы свяжемся с вами в ближайшее время
    </div>
    <div class="quiz-question-window">

      <div class="quiz-question-form-item">
        <div class="quiz-question-form-title">
          Введите имя
        </div>
        <input ref="name" type="text" class="quiz-question-input">
        <svg class="quiz-question-form-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12,4C14.21,4 16,5.79 16,8C16,10.21 14.21,12 12,12C9.79,12 8,10.21 8,8C8,5.79 9.79,4 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
              fill-rule="nonzero"
              stroke-width="0"
          />
        </svg>
      </div>
      <div class="quiz-question-form-item">
        <div class="quiz-question-form-title">
          Введите телефон
        </div>
        <input ref="phone" type="text" class="quiz-question-input">
        <svg class="quiz-question-form-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5C20.55,15.5 21,15.95 21,16.5V20C21,20.55 20.55,21 20,21C10.61,21 3,13.39 3,4C3,3.45 3.45,3 4,3H7.5C8.05,3 8.5,3.45 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"
              fill-rule="nonzero"
              stroke-width="0"
          />
        </svg>
      </div>
      <div class="quiz-question-button" @click="sendForm">
        Жду предложений
      </div>
    </div>
  </div>
</template>

<script>
import {
  sendResult,
} from '../../api';

export default {
  name: 'FormQuestion',
  props: {
    state: {
      type: Object,
      required: true
    },
    question: {
      type: Object,
      required: true
    },
  },
  methods: {
    sendForm() {
      const name = this.$refs.name.value || 'unkown user';
      const phone = this.$refs.phone.value || 'unkown phone number';
      const answer = {
        name,
        phone,
      }
      const newState = {
        ...this.state,
        ...answer
      };
      sendResult(newState);
      this.$emit('update', {state: newState, question: this.question, answer});
    }
  }
}
</script>

<style scoped>
.quiz-question-title,
.quiz-question-description,
.quiz-question-form-title {
  font-size: var(--font-size-s);
  font-weight: 100;
  line-height: 1.3;
  display: block;
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
  text-align: center;
}

.quiz-question-title {
  margin: var(--space-xxl) auto var(--space-m) auto;
  font-size: 26px;
  color: var(--color-1);
}

.quiz-question-description {
  color: var(--color-2);
}

.quiz-question-form-title {
  color: var(--color-2);
  margin: var(--space-xxs) 0;
  text-align: left;
}

.quiz-question-window {
  display: block;
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
  margin: var(--space-xxl) auto 0 auto;
  padding: var(--space-xl) var(--space-xxl) var(--space-xxl) var(--space-xxl);
  background-color: var(--color-5);
  border: 1px solid var(--color-3);
  box-shadow: 0 0 10px var(--color-3);
}

.quiz-question-form-item {
  position: relative;
  display: block;
  margin: 0 0 var(--space-xl) 0;
}

.quiz-question-input {
  display: block;
  width: 100%;
  padding: var(--space-l);
  padding-left: 50px;
  font-size: var(--font-size-m);
  border: 1px solid var(--color-3);
  border-radius: var(--space-xs);
  box-sizing: border-box;
  outline: none;
}

.quiz-question-form-icon {
  position: absolute;
  top: var(--space-xxl);
  left: var(--space-m);

  display: inline-block;
  width: var(--space-xxl);
  height: var(--space-xxl);

  vertical-align: middle;
  fill: var(--color-2);
}

.quiz-question-button {
  display: block;
  margin: 0 auto;
  padding: var(--space-l) var(--space-xl);
  border-radius: 50px;
  color: var(--color-1);
  vertical-align: top;
  text-align: center;
  cursor: pointer;
  background-color: var(--color-6);
  border: 1px solid var(--color-6);
  box-shadow: 0 0 var(--space-xxs) var(--color-7);
}
</style>