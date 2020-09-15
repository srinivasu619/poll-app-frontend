<template>
  <div>
    <div class="category">{{ poll.category || "GENERAL" }}</div>
    <div class="pollTitle">{{ poll.topic }}</div>
    <ul class="poll-options">
      <poll-option
        v-for="(pollOption, index) in poll.pollOptions"
        :key="index"
        :option="pollOption"
        :class="{ active: selectedPoll === pollOption }"
        @click.native="toggleOption(pollOption)"
      ></poll-option>
    </ul>
  </div>
</template>

<script>
import PollOption from "../components/PollOption.vue";
import gql from "graphql-tag";
export default {
  name: "poll-view",
  components: {
    PollOption
  },
  data() {
    return {
      poll: {},
      pollId: "",
      selectedPoll: ""
    };
  },
  apollo: {
    poll() {
      return {
        query: gql`
          query getPoll($id: ID!) {
            poll: getPoll(id: $id) {
              _id
              topic
              pollOptions
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        }
      };
    }
  },
  methods: {
    toggleOption(option) {
      this.selectedPoll = option;
    }
  }
};
</script>

<style>
.pollTitle {
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 2px;
}
.category {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 14px;
  font-weight: bolder;
  margin-bottom: 8px;
}
.poll-options {
  list-style: none;
}
.active {
  background: black;
  color: white;
}
</style>
