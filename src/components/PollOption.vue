<template>
  <li class="poll-option">{{ option }}</li>
</template>

<script>
export default {
  name: "poll-option",
  props: {
    option: {
      type: String
    }
  }
};
</script>

<style>
.poll-option {
  padding: 8px;
  background-color: #e0e5ec;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  margin-top: 16px;
  font-weight: 700;
  border-radius: 4px;
}
</style>
