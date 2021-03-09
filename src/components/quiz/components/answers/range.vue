<template>
  <div class="quiz-answer">
    <input
        type="text"
        :value="value"
        class="quiz-answer-value"
        @blur="updateState"
    />
    <VueRangeSlider
        v-model="value"
        :width="300"
        :speed="0.5"
        :min="min"
        :max="max"
        @change="updateState"
    />
    <div class="quiz-answer-limit">
      <span class="quiz-answer-min">
        {{ min }}
      </span>
      <span class="quiz-answer-max">
        {{ max }}
      </span>
    </div>
  </div>
</template>

<script>
import 'vue-range-slider/dist/vue-range-slider.css';
import VueRangeSlider from 'vue-range-slider';

export default {
  name: 'RangeAnswer',
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
  components: {
    VueRangeSlider,
  },
  data() {
    return {
      value: this.getValueParts(this.answer.value)[0],
    };
  },
  computed: {
    valueParts() {
      return this.getValueParts(this.answer.value);
    },
    min() {
      return this.valueParts[0];
    },
    max() {
      return this.valueParts[1];
    },
    correctValue() {
      const correctString = `${this.value || ''}`.replace(/[^0-9]+/gim, '');
      const value = parseInt(correctString, 10);
      return Math.min(
          Math.max(value, this.min),
          this.max
      );
    },
  },
  methods: {
    getValueParts(value = '0-100') {
      return value.split('-').map(value => parseInt(value, 10));
    },
    updateState() {
      this.$emit('update', {
        state: {
          ...this.state,
          [this.answer.property]: this.correctValue
        },
        question: this.question,
        answer: this.answer,
      });
    }
  }
}
</script>

<style>
.quiz-answer .range-slider-fill {
  background-color: var(--color-10);
}

.quiz-answer .range-slider-knob {
  border: 6px solid var(--color-10);
  background-color: var(--color-4);
  box-shadow: none;
}

.quiz-answer .range-slider {
  width: 100%;
}
</style>

<style scoped>
.quiz-answer {
  display: block;
  width: 100%;
  padding: 0;
  border-radius: var(--space-s);
  margin: 0 var(--space-l) var(--space-l) 0;
  cursor: pointer;
  vertical-align: top;
  transition: 0.3s box-shadow;
}

.quiz-answer-value {
  width: 100px;
  font-size: var(--font-size-l);
  display: block;
  padding: var(--space-l) var(--space-xxl);
  margin-bottom: var(--space-xl);
  outline: none;
  border: 1px solid var(--color-8);
  border-radius: 5px;
  color: var(--color-1);
  text-align: center;
}

.quiz-answer-limit {
  display: flex;
  text-align: center;
  justify-content: space-between;
  padding: 0 var(--space-xxs);
}

.quiz-answer-min,
.quiz-answer-max {
  display: inline-block;
  margin: 0;
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
