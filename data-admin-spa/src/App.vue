<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "APP",
  mounted() {
    document.getElementById("app").style.display = "block";
    document.getElementById("appLoading").style.display = "none";
  }
};
</script>