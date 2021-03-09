<template>
  <keep-alive>
    <RangeAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.RANGE"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
    <TilesAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.TILES"
        :state="state"
        :answer="answer"
        :question="question"
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
    <CheckboxAnswer
        v-if="answer.template_id === ANSWER_TEMPLATES.CHECKBOX"
        :state="state"
        :answer="answer"
        :question="question"
        :isChecked="isChecked"
        @update="$emit('update', $event)"
    />
    <SelectAnswer
        v-if="isDefaultTemplate"
        :state="state"
        :answer="answer"
        :question="question"
        :isChecked="isChecked"
        @update="$emit('update', $event)"
    />
  </keep-alive>
</template>

<script>
import RangeAnswer from './range';
import TilesAnswer from './tiles';
import SelectAnswer from './select';
import CheckboxAnswer from './checkbox';
import TextareaAnswer from './textarea';
import {ANSWER_TEMPLATES} from '../../helpers/constants';

export default {
  name: 'CommonAnswer',
  components: {
    TilesAnswer,
    SelectAnswer,
    CheckboxAnswer,
    TextareaAnswer,
    RangeAnswer,
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
    isDefaultTemplate() {
      return !this.formattedAnswer.template_id || [
        ANSWER_TEMPLATES.SELECT,
      ].includes(this.formattedAnswer.template_id);
    },
    isChecked() {
      const value = this.formattedAnswer.value;
      const currentValue = this.state[this.formattedAnswer.property];
      const isMultiselect = this.answer.template_id === ANSWER_TEMPLATES.CHECKBOX;
      return isMultiselect
          ? (currentValue || []).includes(value)
          : currentValue === value;
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
