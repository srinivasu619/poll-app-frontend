<template>
  <div class="poll-container">
    <ul class="poll-list">
      <poll-item v-for="poll in polls" :key="poll._id" :poll="poll"></poll-item>
    </ul>
  </div>
</template>

<script>
import PollItem from "../components/PollItem.vue";
import gql from "graphql-tag";
export default {
  name: "home-page",
  components: {
    PollItem
  },
  data() {
    return {
      polls: []
    };
  },
  apollo: {
    polls: gql`
      query {
        polls: listPolls {
          _id
          topic
          votes {
            pollOption
          }
        }
      }
    `
  }
};
</script>

<style>
.poll-list {
  list-style: none;
}
</style>
