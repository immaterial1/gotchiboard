<template>
  <bordered>
    <div
      class="h-24 flex items-centerrelative border-4 bg-dark hover:bg-dark-highlight pl-10 cursor"
      :class="{
        'border-gold': `${rank}` === '1',
        'border-silver': `${rank}` === '2',
        'border-bronze': `${rank}` === '3'
      }">
      <div class="flex-1 py-4">
        <div class="absolute -left-1 top-4 h-6 w-7 text-center text-lg leading-6 bg-purple">
          #{{ rank }}
        </div>
        <div class="text-2xl leading-6 mb-2">
          {{ data.address }}
        </div>
        <div class="flex">
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/fud.png" alt="Fud token">
            <span class="text-2xl leading-6 -mt-0.5">{{ totalFud }}</span>
          </div>
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/fomo.png" alt="Fomo token">
            <span class="text-2xl leading-6 -mt-0.5">{{ totalFomo }}</span>
          </div>
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/alpha.png" alt="Alpha token">
            <span class="text-2xl leading-6 -mt-0.5">{{ totalAlpha }}</span>
          </div>
          <div class="flex items-center mr-6">
            <img class="h-4 w-4 mr-1" src="../../../assets/kek.png" alt="Kek token">
            <span class="text-2xl leading-6 -mt-0.5">{{ totalKek }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center text-3xl w-36 h-full">
        {{ fudStandardSpent }}
      </div>
      <div
        v-if="ghstPrize"
        class="w-32 h-full flex items-center"
        :class="{
          'bg-gold': `${rank}` === '1',
          'bg-silver': `${rank}` === '2',
          'bg-bronze': `${rank}` === '3'
        }">
        <div class="w-full flex items-center pl-6 text-3xl text-dark">
          <img src="../../../assets/ghst.png" alt="GHST logo" class="w-4 h-4 mt-1 mr-1.5">
          <div>{{ Number(ghstPrize).toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </bordered>
</template>

<script>
export default {
  props: {
    data: Object,
    rank: [String, Number],
    showModified: Boolean,
    ghstPrize: Number
  },
  computed: {
    totalFud () {
      return this.showModified ? this.data.totalFudModified.toLocaleString() : this.data.totalFud.toLocaleString()
    },
    totalFomo () {
      return this.showModified ? this.data.totalFomoModified.toLocaleString() : this.data.totalFomo.toLocaleString()
    },
    totalAlpha () {
      return this.showModified ? this.data.totalAlphaModified.toLocaleString() : this.data.totalAlpha.toLocaleString()
    },
    totalKek () {
      return this.showModified ? this.data.totalKekModified.toLocaleString() : this.data.totalKek.toLocaleString()
    },
    fudStandardSpent () {
      return this.showModified ? this.data.fudStandardSpentModified.toLocaleString() : this.data.fudStandardSpent.toLocaleString()
    }
  }
}
</script>
