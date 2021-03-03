<template>
  <div class="quiz-footer">
    <div v-if="progressPercent" class="quiz-footer-progress-description">
      <span class="quiz-footer-progress-title">Готово:</span>
      <span class="quiz-footer-progress-value">
        {{ progressPercent }}
      </span>
    </div>
    <div class="quiz-footer-progress">
      <div
          v-if="progressPercent"
          :style="progress"
          class="quiz-footer-progress-line"
      ></div>
    </div>
    <div class="quiz-footer-buttons">
      <div class="quiz-footer-back" @click="$emit('prev')">
        Назад
      </div>
      <div class="quiz-footer-next" @click="$emit('next')">
        Далее
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    step: Number,
    total: Number,
  },
  computed: {
    progressPercent() {
      return (((100 / this.total) * this.step) + '%');
    },
    progress() {
      return {
        width: this.progressPercent,
      };
    }
  }
}
</script>

<style scoped>
.quiz-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  padding: 24px 270px 24px 32px;
  border-top: 1px solid gray;
  background-color: white;
}

.quiz-footer-progress-description {
  display: block;
  margin-bottom: 5px;
}

.quiz-footer-progress-title {
  font-size: 12px;
  color: black;
}

.quiz-footer-progress-value {
  font-size: 14px;
  font-weight: bold;
  color: #FFAA00;
  margin-left: 5px;
}

.quiz-footer-progress {
  display: block;
  width: 100%;
  background-color: #D9D9D9;
  border-radius: 5px;
}

.quiz-footer-progress-line {
  display: block;
  height: 5px;
  transition: 1s width;
  border-radius: 5px;
  background-color: #FFC44D;
  background-size: 23px 22px;
  background-image: repeating-linear-gradient(-45deg, rgba(255, 255, 255, .35), rgba(255, 255, 255, .35) 8px, rgba(255, 255, 255, 0) 9px, rgba(255, 255, 255, 0) 16px);
  animation: quiz-footer-progress 1s linear infinite;
}

@keyframes quiz-footer-progress {
  from {
    background-size: 23px 22px;
  }
  50% {
    background-size: 23px 32px;
  }
  to {
    background-size: 23px 44px;
  }
}

.quiz-footer-buttons {
  position: absolute;
  top: 16px;
  right: 24px;
  text-align: right;
}

.quiz-footer-back,
.quiz-footer-next {
  display: inline-block;
  width: auto;
  min-width: 50px;
  padding: 12px 24px;
  border-radius: 50px;
  color: black;
  vertical-align: top;
  text-align: center;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid transparent;
}

.quiz-footer-back {
  border: 1px solid gray;
  margin-right: 16px;
}

.quiz-footer-next {
  background-color: #FFC44D;
  border: 1px solid #FFC44D;
}
</style>
