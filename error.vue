<template>
  <div class="ErrorPage__main-container">
    <div class="ErrorPage__center-container">
      <h1 class="ErrorPage__title">{{ text }}</h1>
      <button class="ErrorPage__button" @click="handleError">
        Wróć do głownej strony
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });

const text = computed(() => {
  return props.error.statusCode === 404
    ? "Nie ma takiej strony"
    : "Ops... Coś poszło nie tak.";
});
</script>
<style lang="scss" scoped>
@import "error";
</style>
