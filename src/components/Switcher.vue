<template>
  <div class="flex h-12 border border-white text-2xl">
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center h-full px-6 border-r border-white last:border-0 cursor"
      :class="{
        'bg-white text-purple': option.value === value
      }"
      @click="$emit('input', option.value)">
      <span>{{ option.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String
  },
  data () {
    return {

    }
  }
}
</script>
