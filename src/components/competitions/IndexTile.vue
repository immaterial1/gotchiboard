<template>
  <bordered>
    <div class="h-[380px] border-4 border-gold bg-dark hover:bg-dark-highlight p-7 pb-6 relative text-center cursor">
      <div
        v-if="active"
        class="absolute top-0 left-0 h-6 w-14 bg-purple text-center text-white text-lg leading-6">Active</div>
      <div class="h-40 w-56 flex items-center justify-center mx-auto">
        <img :src="img" alt="Alchemica spending season 1 logo" class="max-h-full max-w-full inline-block mb-2" />
      </div>
      <div class="text-[32px] leading-8 mb-1">
        {{ title }}
      </div>
      <div class="text-2xl text-white/50 leading-6 mb-3">
        {{ date }}
      </div>
      <div class="text-2xl text-white/50 leading-6">
        Prize pool
      </div>
      <div class="text-2xl leading-6">
        <div class="flex justify-center items-center">
          <img src="../../assets/ghst.png" alt="GHST logo" class="w-4 h-4 mt-1 mr-1">
          <div>{{ Number(prizepool).toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </bordered>
</template>

<script>
export default {
  props: {
    active: Boolean,
    title: String,
    date: String,
    img: String,
    prizepool: [String, Number]
  }
}
</script>
