<template>
  <div class="flex h-12 border border-white text-2xl relative">
    <div v-if="disabled" class="absolute h-full w-full l-0 t-0 z-10 bg-black opacity-25"></div>
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
    value: String,
    disabled: Boolean
  },
  data () {
    return {

    }
  }
}
</script>
