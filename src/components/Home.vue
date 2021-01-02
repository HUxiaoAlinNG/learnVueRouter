<template>
  <div>
    <div>Home</div>
    <div>{{ msg }}</div>
    <router-link to="/about/a">go a</router-link>
    <router-link to="/about/b">go b</router-link>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "首页",
    };
  },
};
</script>

<style></style>

