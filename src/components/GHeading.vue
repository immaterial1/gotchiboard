<template>
  <component
    :is="`h${level}`"
    class=""
    :class="{
      'text-5xl': styleLevel === '1',
      'text-4xl': styleLevel === '2',
      'text-3xl': styleLevel === '3',
      'text-2xl': styleLevel === '4',
      'text-xl': styleLevel === '5',
      'text-l': styleLevel === '6'
    }">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'HeadingEl',
  props: {
    level: {
      type: String,
      default: () => '1'
    },
    styleLevel: {
      type: String,
      default: () => '1'
    }
  }
}
</script>
