<template>
  <bordered>
    <div>
      <div class="flex justify-between px-12 py-6 bg-purple">
        <div v-if="stats.numOfAddresses !== undefined" class="text-center">
          <div class="mb-2">
            <img class="inline-block w-8 h-8" src="../../../assets/wallet.svg" alt="wallet icon">
          </div>
          <div class="text-2xl leading-6">
            Unique addresses
          </div>
          <div class="text-3xl leading-8 -mt-0.5">
            {{ Number(stats.numOfAddresses).toLocaleString() }}
          </div>
        </div>
        <div v-if="totalSpend !== undefined" class="text-center">
          <div class="mb-2">
            <img class="inline-block w-8 h-8" src="../../../assets/wallet.svg" alt="wallet icon">
          </div>
          <div class="text-2xl leading-6">
            Total spend (in FUD)
          </div>
          <div class="text-3xl leading-8 -mt-0.5">
            {{ Number(totalSpend).toLocaleString() }}
          </div>
        </div>
        <div v-if="stats.itemsMinted !== undefined" class="text-center">
          <div class="mb-2">
            <img class="inline-block w-8 h-8" src="../../../assets/shop.svg" alt="shop icon">
          </div>
          <div class="text-2xl leading-6">
            Items used
          </div>
          <div class="text-3xl leading-8 -mt-0.5">
            {{  Number(stats.itemsMinted).toLocaleString() }}
          </div>
        </div>
        <div v-if="stats.tilesMinted !== undefined" class="text-center">
          <div class="mb-2">
            <img class="inline-block w-8 h-8" src="../../../assets/tile.svg" alt="tile icon">
          </div>
          <div class="text-2xl leading-6">
            Tiles minted
          </div>
          <div class="text-3xl leading-8 -mt-0.5">
            {{  Number(stats.tilesMinted).toLocaleString() }}
          </div>
        </div>
        <div v-if="stats.installationsMinted !== undefined" class="text-center">
          <div class="mb-2">
            <img class="inline-block w-8 h-8" src="../../../assets/home.svg" alt="home icon">
          </div>
          <div class="text-2xl leading-6">
            Installations minted
          </div>
          <div class="text-3xl leading-8 -mt-0.5">
            {{ Number(stats.installationsMinted).toLocaleString() }}
          </div>
        </div>
      </div>
      <div class="flex justify-between p-7 bg-purpleDark">
        <div class="flex">
          <img class="h-10 w-10 mr-3" src="../../../assets/fud.png" alt="Fud token">
          <div>
            <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FUD</div>
            <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ Number(totalFud).toLocaleString()
            }}</div>
          </div>
        </div>
        <div class="flex">
          <img class="h-10 w-10 mr-3" src="../../../assets/fomo.png" alt="Fomo token">
          <div>
            <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FOMO</div>
            <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ Number(totalFomo).toLocaleString()
            }}</div>
          </div>
        </div>
        <div class="flex">
          <img class="h-10 w-10 mr-3" src="../../../assets/alpha.png" alt="Alpha token">
          <div>
            <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">ALPHA</div>
            <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ Number(totalAlpha).toLocaleString()
            }}</div>
          </div>
        </div>
        <div class="flex">
          <img class="h-10 w-10 mr-3" src="../../../assets/kek.png" alt="Kek token">
          <div>
            <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">KEK</div>
            <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ Number(totalKek).toLocaleString()
            }}</div>
          </div>
        </div>
      </div>
    </div>
  </bordered>
</template>

<script>
export default {
  props: {
    stats: {
      type: Object,
      default: () => { return {} }
    },
    showModified: Boolean
  },
  computed: {
    totalSpend () {
      return this.showModified ? this.stats.totalSpendModified : this.stats.totalSpend
    },
    totalFud () {
      return this.showModified ? this.stats.totalFudModified : this.stats.totalFud
    },
    totalFomo () {
      return this.showModified ? this.stats.totalFomoModified : this.stats.totalFomo
    },
    totalAlpha () {
      return this.showModified ? this.stats.totalAlphaModified : this.stats.totalAlpha
    },
    totalKek () {
      return this.showModified ? this.stats.totalKekModified : this.stats.totalKek
    }
  }
}
</script>
