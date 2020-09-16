<template>
  <div>
    <div class="form-element">
      <label for="title" class="form-label">Poll Title</label>
      <input
        type="text"
        id="title"
        class="text-input"
        spellcheck="false"
        v-model="topic"
      />
    </div>
    <div class="form-element">
      <label class="form-label">Poll Options</label>
      <div v-if="options.length === 0" class="noOptions">
        No Options Created
        <br />
        <small>Aleast 2 and Max 5 options can be created</small>
      </div>
      <ul class="options-container" v-else>
        <li v-for="(option, index) in options" :key="index" class="options">
          <input
            type="text"
            id="title"
            class="text-input option-input"
            v-model="optionData[option]"
          />
          <div class="option-actions" @click="deleteOption(index, option)">
            <i class="fas fa-trash"></i>
          </div>
        </li>
      </ul>
      <button
        class="v-btn btn-sm"
        @click="addOption"
        :disabled="options.length === 5"
      >
        Add Option
      </button>
    </div>
    <button class="v-btn btn-lg full-width" @click="submit">Submit Poll</button>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "create-poll",
  data() {
    return {
      topic: "",
      options: [],
      optionData: {}
    };
  },
  methods: {
    addOption() {
      let key = new Date().getMilliseconds();
      this.optionData[key] = "";
      this.options.push(key);
    },
    deleteOption(index, option) {
      this.options.splice(index, 1);
      delete this.optionData[option];
    },
    async submit() {
      const pollInput = {
        topic: this.topic,
        pollOptions: Object.values(this.optionData)
      };
      await this.$apollo.mutate({
        mutation: gql`
          mutation CreatePoll($pollInput: PollInput!) {
            createPoll(pollInput: $pollInput) {
              _id
              topic
              pollOptions
            }
          }
        `,
        variables: {
          pollInput
        }
      });
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
.form-element {
  margin-bottom: 16px;
}
.form-element .form-label {
  font-size: 14px;
  font-weight: bold;
  /* text-transform: uppercase; */
  letter-spacing: 2px;
  display: block;
  margin-bottom: 8px;
  /* width: 100%; */
}
.form-element .text-input {
  height: 32px;
  width: 100%;
  font-size: 16px;
  padding: 12px 8px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: #e0e5ec;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
}
.options-container {
  list-style: none;
}
.options-container > .options {
  display: flex;
  margin-bottom: 16px;
}
.options-container > .options > .option-input {
  flex-grow: 1;
}
.options-container > .options > .option-actions {
  width: 32px;
  height: 32px;
  flex-shrink: 1;
  border-radius: 50%;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  margin-left: 8px;
  color: #d63031;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
.v-btn {
  border: 0;
  background: black;
  color: white;
  border-radius: 4px;
  /* text-transform: uppercase; */
  letter-spacing: 2px;
  font-family: "Roboto Mono", Helvetica, Arial, sans-serif;
  cursor: pointer;
}
.btn-sm {
  font-size: 12px;
  padding: 8px;
}
.btn-lg {
  font-size: 14px;
  padding: 8px 12px;
}
.noOptions {
  border-radius: 8px;
  min-height: 100px;
  margin-bottom: 16px;
  color: gray;
  border: 2px dashed lightgray;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
