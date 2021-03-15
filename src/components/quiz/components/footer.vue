<template>
  <div class="quiz-footer">
    <div v-if="progressPercent" class="quiz-footer-progress-container">
      <div class="quiz-footer-progress-description">
        <span class="quiz-footer-progress-title">Готово:</span>
        <span class="quiz-footer-progress-value">
        {{ progressPercent }}
      </span>
      </div>
      <div class="quiz-footer-progress">
        <div
            :style="progress"
            class="quiz-footer-progress-line"
        ></div>
      </div>
    </div>

    <div class="quiz-footer-buttons">
      <div
          class="quiz-footer-prev"
          :class="{
            'quiz-footer-disable': disablePrev,
          }"
          @click="onClickPrev"
      >
        <svg class="quiz-footer-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                fill-rule="nonzero"
                stroke-width="0"
          />
        </svg>
      </div>
      <div
          class="quiz-footer-next"
          :class="{
            'quiz-footer-disable': disableNext,
          }"
          @click="onClickNext"
      >
        Далее
        <svg class="quiz-footer-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              stroke-width="0"
              fill-rule="nonzero"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    step: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    disableNext: Boolean,
  },
  computed: {
    progressPercent() {
      return Math.ceil((100 / this.total) * this.step) + '%';
    },
    progress() {
      return {
        width: this.progressPercent,
      };
    },
    disablePrev() {
      return this.step === 0;
    },
  },
  methods: {
    onClickPrev() {
      if (!this.disablePrev) this.$emit('prev');
    },
    onClickNext() {
      if (!this.disableNext) this.$emit('next');
    },
  }
}
</script>

<style scoped>
.quiz-footer {
  position: relative;
  display: grid;
  grid-template-areas: "progress buttons";
  grid-template-columns: auto 224px;
  grid-template-rows: 100%;

  border-top: 1px solid var(--color-8);
  background-color: var(--color-5);
  box-sizing: border-box;
  padding: 0;
}

.quiz-footer-progress-container {
  grid-area: progress;
  padding: var(--space-l) 0 0 var(--space-xl);
}

.quiz-footer-progress-title {
  font-size: var(--space-m);
  color: var(--color-1);
}

.quiz-footer-progress-description {
  display: block;
  margin-bottom: var(--space-xs);
}

.quiz-footer-progress-value {
  font-size: var(--font-size-s);
  font-weight: bold;
  color: var(--color-6);
  margin-left: var(--space-xs);
}

.quiz-footer-progress {
  display: block;
  width: 100%;
  background-color: var(--color-3);
  border-radius: var(--space-xs);
}

.quiz-footer-progress-line {
  display: block;
  height: var(--space-xs);
  transition: 1s width;
  border-radius: var(--space-xs);
  background-color: var(--color-7);
  box-shadow: 0 0 3px var(--color-6);
  background-size: 23px 22px;
  background-image: repeating-linear-gradient(-45deg, rgba(255, 255, 255, .35), rgba(255, 255, 255, .35) var(--space-s), rgba(255, 255, 255, 0) 9px, rgba(255, 255, 255, 0) var(--space-l));
  animation: quiz-footer-progress 1s linear infinite;
}

@keyframes quiz-footer-progress {
  from {
    background-size: 23px 22px;
  }
  50% {
    background-size: 23px var(--space-xxl);
  }
  to {
    background-size: 23px 44px;
  }
}

.quiz-footer-buttons {
  grid-area: buttons;
  text-align: right;
  padding: var(--space-l) var(--space-xl) 0 0;
}

.quiz-footer-prev,
.quiz-footer-next {
  font-family: "GilroyBold";
  position: relative;
  display: inline-block;
  height: 42px;
  line-height: 42px;
  border-radius: 50px;
  color: var(--color-1);
  vertical-align: top;
  text-align: center;
  box-shadow: none;
  cursor: pointer;
  border: 1px solid transparent;
}

.quiz-footer-prev {
  width: 42px;
  border: 1px solid var(--color-8);
  margin-right: var(--space-l);
}

.quiz-footer-next {
  overflow: hidden;
  padding: 0 var(--space-m) 0 var(--space-xl);
  background-color: var(--color-10);
  border: 1px solid transparent;
  box-shadow: 0 3px 10px 0 var(--color-12);
}

.quiz-footer-next:after {
  content: "";
  position: absolute;
  top: -50%;
  bottom: -50%;
  width: 45px;
  left: -65%;
  pointer-events: none;

  background: linear-gradient(90deg, hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .6) 100%);
  transform: skewX(-22deg);
  animation-name: quiz-footer-next;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes quiz-footer-next {
  60% {
    left: 100%
  }
  to {
    left: 130%
  }
}

.quiz-footer-icon {
  display: inline-block;
  vertical-align: middle;
  fill: var(--color-1);
  width: var(--space-xl);
  height: var(--space-xl);
}

.quiz-footer-prev .quiz-footer-icon {
  fill: var(--color-2);
  margin: 0 -12px;
}

.quiz-footer-disable {
  opacity: 0.5;
  cursor: not-allowed;
}

@media screen and (max-width: 850px) {
  .quiz-footer-progress-value {
    margin-left: 0;
  }
}
</style>
