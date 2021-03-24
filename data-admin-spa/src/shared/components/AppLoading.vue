<template>

  <div id="appLoading" v-if="loading">
    <div id="loader-wrapper">
    </div>
  </div>

</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>