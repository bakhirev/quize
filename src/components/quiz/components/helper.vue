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
}

.quiz-help-container {
  padding: 32px 16px 0 16px;
}

.quiz-help-user {
  position: relative;
  height: auto;
  min-height: 50px;
  padding: 16px 0 0 64px;
}

.quiz-help-user-avatar {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50pc;
  margin-right: 24px;
  background-color: white;
}

.quiz-help-user-name {
  display: inline-block;
}

.quiz-help-message {
  display: block;
  padding: 4px 16px 4px 12px;
  margin: 8px auto;
  text-align: left;
  border-radius: 5px;
  box-shadow: 2px 2px 4px #D9D9D9;
  background-color: #FFFFFF;
}

.quiz-help-message-p {
  font-size: 14px;
  padding: 0 0 8px 0;
  margin: 0;
  line-height: 1.5;
}

.quiz-help-message:last-of-type {
  margin-bottom: 0;
}
</style>
