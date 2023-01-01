<template>
  <div
    class="flex border border-white relative"
    :class="{
      'h-7 text-xl': small,
      'h-12 text-2xl' : !small
    }">
    <div v-if="disabled" class="absolute h-full w-full l-0 t-0 z-10 bg-black opacity-25"></div>
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center h-full border-r border-white last:border-0 cursor"
      :class="{
        'bg-white text-purple': option.value === value,
        'px-2': small,
        'px-6': !small
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
    value: [String, Number, Boolean],
    disabled: Boolean,
    small: Boolean
  },
  data () {
    return {

    }
  }
}
</script>
