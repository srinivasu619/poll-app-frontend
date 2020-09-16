<template>
  <div v-if="poll">
    <div class="category">{{ poll.category || "GENERAL" }}</div>
    <div class="pollTitle">{{ poll.topic }}</div>
    <ul class="poll-options">
      <poll-option
        v-for="(pollOption, index) in poll.pollOptions"
        :key="index"
        :option="pollOption"
        :class="{ active: selectedPoll === pollOption }"
        @click.native="toggleOption(pollOption)"
        :statMode="statMode"
        :stat="stats[pollOption]"
      ></poll-option>
    </ul>
    <button
      class="v-btn btn-lg"
      style="margin-top: 12px"
      @click="submit"
      :disabled="!selectedPoll"
      v-if="!statMode"
    >
      Submit Vote
    </button>
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
  created() {
    this.statMode = this.$cookies.isKey(this.$route.params.id);
    this.selectedPoll = this.$cookies.get(this.$route.params.id);
  },
  data() {
    return {
      poll: null,
      selectedPoll: "",
      statMode: false,
      stats: {}
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
              votes {
                pollOption
              }
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        },
        update: data => {
          console.log(data);
          this.stats = this.calculateStats(data.poll.votes);
          return data.poll;
        }
      };
    }
  },
  methods: {
    toggleOption(option) {
      if (!this.statMode) {
        this.selectedPoll = option;
      }
    },
    calculateStats(votes) {
      return votes
        .map(vote => vote.pollOption)
        .reduce((accumulator, currentValue) => {
          if (accumulator.hasOwnProperty(currentValue)) {
            accumulator[currentValue]++;
          } else {
            accumulator[currentValue] = 1;
          }
          return accumulator;
        }, {});
    },
    async submit() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation SubmitVote($pollId: ID!, $pollOption: String!) {
            submitVote(pollId: $pollId, pollOption: $pollOption) {
              votes {
                pollOption
              }
            }
          }
        `,
        variables: {
          pollId: this.$route.params.id,
          pollOption: this.selectedPoll
        },
        update: (_, { data: { submitVote } }) => {
          console.log(submitVote, typeof submitVote);
          this.stats = this.calculateStats(submitVote.votes);
          this.$cookies.set(this.$route.params.id, this.selectedPoll);
          this.statMode = true;
        }
      });
    }
  }
};
</script>

<style>
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
