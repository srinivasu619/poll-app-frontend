<template>
  <nav class="navbar">
    <div class="navContainer">
      <div class="logo" @click="navigateToHome">
        <img
          src="https://image.flaticon.com/icons/svg/565/565435.svg"
          alt
          srcset
          height="32"
        />
        <div class="logoHeader">Polls</div>
      </div>
      <div class="create">
        <i class="fas fa-plus"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav-bar",
  methods: {
    navigateToHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
.navbar {
  height: 72px;
  margin: 12px 0;
  display: flex;
  align-items: center;
}
.navContainer {
  width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navContainer > .logo {
  display: flex;
  align-items: center;
  padding: 8px;
  box-shadow: 9px 9px 13px rgb(163, 177, 198, 0.6),
    -9px -9px 11px rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  cursor: pointer;
}
.logo > .logoHeader {
  font-weight: bold;
  font-size: 26px;
  margin-left: 8px;
}
.navContainer > .create {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 9px 9px 13px rgb(163, 177, 198, 0.6),
    -9px -9px 11px rgba(255, 255, 255, 0.5);
  font-weight: bold;
}
</style>
