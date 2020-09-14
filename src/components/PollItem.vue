<template>
  <li class="poll-item" @click="navigatePoll(poll.id)">
    <div class="category">{{ poll.category || "GENERAL" }}</div>
    <div class="pollTitle">{{ poll.topic }}</div>
    <div class="stats">
      <div class="fav">
        <i class="far fa-heart"></i>
      </div>
      <div class="interactions">
        <i class="fas fa-chart-bar"></i>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "poll-item",
  props: {
    poll: {
      type: Object
    }
  },
  methods: {
    navigatePoll(id) {
      console.log("CLICKED");
      this.$router.push({ name: "poll-view", params: { id: id } });
    }
  }
};
</script>

<style>
.poll-item {
  background-color: #e0e5ec;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  padding: 12px 24px;
  margin-bottom: 24px;
  text-align: left;
  border-radius: 5px;
  cursor: pointer;
}
.pollTitle {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
}
.poll-item > .stats {
  height: 24px;
  display: flex;
  justify-content: flex-end;
}
.poll-item > .stats > div {
  margin-left: 16px;
}
.poll-item > .category {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 14px;
  font-weight: bolder;
  margin-bottom: 8px;
}
</style>
