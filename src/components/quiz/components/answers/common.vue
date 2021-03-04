<template>
  <keep-alive>
    <TilesAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.TILES"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
    <SelectAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.SELECT || !answer.template_id"
        :state="state"
        :answer="answer"
        :question="question"
        :isChecked="isChecked"
        @update="$emit('update', $event)"
    />
    <SelectAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.RANGE"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
    <TextareaAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.TEXTAREA"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
  </keep-alive>
</template>

<script>
import TilesAnswer from './tiles';
import SelectAnswer from './select';
import TextareaAnswer from './textarea';
import {ANSWER_TEMPLATES} from '../../helpers/constants';

export default {
  name: 'CommonAnswer',
  components: {
    TilesAnswer,
    SelectAnswer,
    TextareaAnswer,
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
    answer: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      ANSWER_TEMPLATES,
    };
  },
  computed: {
    isChecked() {
      return this.state[this.formattedAnswer.property] === this.formattedAnswer.value;
    },
    formattedAnswer() {
      const type = typeof this.answer;
      if (type === 'object') return {
        template_id: this.answer.template_id || ANSWER_TEMPLATES.SELECT,
        ...this.answer,
      };

      const value = `${this.answer}`;
      const property = this.question.property || `no-property`;
      const formattedAnswer = {id: 1, template_id: ANSWER_TEMPLATES.SELECT, title: value, property, value};
      if (type === 'boolean') return {...formattedAnswer, title: this.answer ? 'да' : 'нет'};
      return formattedAnswer;
    },
  },
}
</script>
