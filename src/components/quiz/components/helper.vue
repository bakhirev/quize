<template>
  <div class="quiz-help">
    <div class="quiz-help-container">
      <div class="quiz-help-user">
        <img
            v-if="help.cover_url"
            class="quiz-help-user-avatar"
            :src="help.cover_url"
        />
        <div class="quiz-help-user-name">
          {{ help.title }}
        </div>
      </div>
      <div class="quiz-help-message">
        <p
            v-for="(message, index) in formattedMessages"
            class="quiz-help-message-p"
            :key="index"
        >
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizHelper',
  props: {
    help: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedMessages() {
      return (this.help.description || '').split('\n');
    }
  },
  methods: {}
}
</script>

<style scoped>
.quiz-help {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #F7F7F7;

  animation-name: quiz-help;
  animation-duration: 1s;
  animation-delay: 0s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}

@keyframes quiz-help {
  from {
    opacity: 0;
    background-color: transparent;
  }
  to {
    opacity: 1;
    background-color: #F7F7F7;
  }
}

.quiz-help-container {
  padding: var(--space-xxl) var(--space-l) 0 var(--space-l);
}

.quiz-help-user {
  position: relative;
  height: auto;
  min-height: 50px;
  padding: var(--space-l) 0 0 64px;
}

.quiz-help-user-avatar {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50pc;
  margin-right: var(--space-xl);
  background-color: var(--color-5);
}

.quiz-help-user-name {
  display: inline-block;
}

.quiz-help-message {
  position: relative;
  display: block;
  padding: var(--space-xxs) var(--space-l) var(--space-xxs) var(--space-m);
  margin: var(--space-s) auto;
  text-align: left;
  border-radius: var(--space-xs);
  box-shadow: 2px 2px var(--space-xxs) var(--color-3);
  background-color: var(--color-5);
}

.quiz-help-message:before {
  content: '';

  position: absolute;
  top: -8px;
  left: var(--space-l);

  display: block;
  width: var(--space-l);
  height: var(--space-l);
  background-color: var(--color-5);
  border: none;

  transform: rotate(45deg);
}

.quiz-help-message-p {
  font-size: var(--font-size-s);
  padding: 0 0 var(--space-s) 0;
  margin: 0;
  line-height: 1.5;
}

.quiz-help-message:last-of-type {
  margin-bottom: 0;
}
</style>
