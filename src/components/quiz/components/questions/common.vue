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
    <DefaultQuestion
        v-if="!question.template_id || question.template_id === QUESTION_TEMPLATES.DEFAULT"
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
import DefaultQuestion from './standart';
import {QUESTION_TEMPLATES} from '../../helpers/constants';

export default {
  name: 'CommonQuestion',
  components: {
    FormQuestion,
    NotificationQuestion,
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
  data() {
    return {
      QUESTION_TEMPLATES,
    };
  },
}
</script>
