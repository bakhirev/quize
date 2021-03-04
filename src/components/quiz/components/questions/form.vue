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
      </div>
      <div class="quiz-question-form-item">
        <div class="quiz-question-form-title">
          Введите телефон
        </div>
        <input ref="phone" type="text" class="quiz-question-input">
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
  font-size: 14px;
  font-weight: 100;
  line-height: 1.3;
  display: block;
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
  text-align: center;
}

.quiz-question-title {
  margin: 32px auto 12px auto;
  font-size: 26px;
  color: #363636;
}

.quiz-question-description {
  color: #999999;
}

.quiz-question-form-title {
  color: #999999;
  margin: 4px 0;
  text-align: left;
}

.quiz-question-window {
  display: block;
  width: 90%;
  max-width: 400px;
  margin: 32px auto 0 auto;
  padding: 24px 32px 32px 32px;
  background-color: white;
  border: 1px solid #D9D9D9;
  box-shadow: 0 0 10px #D9D9D9;
}

.quiz-question-form-item {
  display: block;
  margin: 0 0 24px 0;
}

.quiz-question-input {
  display: block;
  width: 100%;
  padding: 16px;
  font-size: 16px;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
}

.quiz-question-button {
  display: block;
  margin: 0 auto;
  padding: 16px 24px;
  border-radius: 50px;
  color: black;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
  background-color: #FFAA00;
  border: 1px solid #FFAA00;
  box-shadow: 0 0 4px #FFC44D;
}
</style>