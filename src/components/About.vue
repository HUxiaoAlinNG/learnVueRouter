<template>
  <div>
    <div>About</div>
    <div>{{ msg }}</div>
    <router-link to="/">go Home</router-link>
    <router-link to="/about/a">go A</router-link>
    <router-link to="/about/b">go B</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      msg: "关于",
    };
  },
};
</script>

<style></style>
