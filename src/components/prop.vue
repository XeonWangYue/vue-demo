<script setup lang="ts">
const props = defineProps({
  modelValue: Object,
  value1: Object
})
const value = ref([])

const emit = defineEmits([
  "update:modelValue"
])


</script>

<template>

</template>

<style scoped lang="scss">

</style>