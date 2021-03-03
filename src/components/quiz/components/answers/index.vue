<template>
  <keep-alive>
    <TilesAnswer
        v-if="answer.template_id === TEMPLATES.TILES"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
    <SelectAnswer
        v-if="answer.template_id === TEMPLATES.SELECT"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
    <SelectAnswer
        v-if="answer.template_id === TEMPLATES.RANGE"
        :state="state"
        :answer="answer"
        :question="question"
        @update="$emit('update', $event)"
    />
    <TextareaAnswer
        v-if="answer.template_id === TEMPLATES.TEXTAREA"
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
import {TEMPLATES} from '../../helpers/mock';

export default {
  name: 'Answer',
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
      TEMPLATES,
    };
  },
}
</script>
