<template>
  <keep-alive>
    <FormQuestion
        v-if="question.template_id === QUESTION_TEMPLATES.FORM"
        :state="state"
        :question="question"
        @update="$emit('update', $event)"
    />
    <NotificationQuestion
        v-if="question.template_id === QUESTION_TEMPLATES.NOTIFICATION"
        :state="state"
        :question="question"
        @update="$emit('update', $event)"
    />
    <MultipleQuestion
        v-if="question.template_id === QUESTION_TEMPLATES.MULTIPLE"
        :state="state"
        :question="question"
        :getAnswers="getAnswers"
        @update="$emit('update', $event)"
    />
    <DefaultQuestion
        v-if="isDefaultTemplate"
        :state="state"
        :question="question"
        :getAnswers="getAnswers"
        @update="$emit('update', $event)"
    />
  </keep-alive>
</template>


<script>
import FormQuestion from './form';
import NotificationQuestion from './notification';
import MultipleQuestion from './multiple';
import DefaultQuestion from './standart';
import {QUESTION_TEMPLATES} from '../../helpers/constants';

export default {
  name: 'CommonQuestion',
  components: {
    FormQuestion,
    NotificationQuestion,
    MultipleQuestion,
    DefaultQuestion,
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
  computed: {
    isDefaultTemplate() {
      return !this.question.template_id || [
        QUESTION_TEMPLATES.DEFAULT,
        QUESTION_TEMPLATES.RANGE,
        QUESTION_TEMPLATES.MULTIPLE,
        QUESTION_TEMPLATES.TEXTAREA,
      ].includes(this.question.template_id);
    }
  },
  data() {
    return {
      QUESTION_TEMPLATES,
    };
  },
}
</script>
