<template>
  <bordered>
    <div
      class="flex items-center relative border-4 bg-dark hover:bg-dark-highlight py-4 pl-10 cursor"
      :class="{
        'border-gold': `${rank}` === '1',
        'border-silver': `${rank}` === '2',
        'border-bronze': `${rank}` === '3'
      }">
      <div class="flex-1">
        <div class="absolute -left-1 top-4 h-6 w-7 text-center text-lg leading-6 bg-purple">
          #{{ rank }}
        </div>
        <div class="text-2xl leading-6 mb-2">
          {{ data.address }}
        </div>
        <div class="flex">
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/fud.png" alt="Fud token">
            <span class="text-2xl leading-6 -mt-0.5">{{ data.totalFud.toLocaleString() }}</span>
          </div>
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/fomo.png" alt="Fomo token">
            <span class="text-2xl leading-6 -mt-0.5">{{ data.totalFomo.toLocaleString() }}</span>
          </div>
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/alpha.png" alt="Alpha token">
            <span class="text-2xl leading-6 -mt-0.5">{{ data.totalAlpha.toLocaleString() }}</span>
          </div>
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/kek.png" alt="Kek token">
            <span class="text-2xl leading-6 -mt-0.5">{{ data.totalKek.toLocaleString() }}</span>
          </div>
        </div>
      </div>
      <div class="text-3xl w-36">
        {{ data.fudStandardSpent.toLocaleString() }}
      </div>
    </div>
  </bordered>
</template>

<script>
export default {
  props: {
    data: Object,
    rank: [String, Number]
  }
}
</script>
