<template>
  <table class="w-full border-spacing-0 border-collapse">
    <thead class="text-left text-lg text-white/50">
      <tr>
        <th class="font-normal">Rank</th>
        <th class="font-normal">Address</th>
        <th class="font-normal">
          <div class="flex items-center">
            <img class="h-4 w-4 mr-1" src="../../../assets/fud.png" alt="Fud token">
            <div>
              <div class="leading-4">FUD</div>
            </div>
          </div>
        </th>
        <th class="font-normal">
          <div class="flex items-center">
            <img class="h-4 w-4 mr-1" src="../../../assets/fomo.png" alt="Fomo token">
            <div>
              <div class="leading-4">FOMO</div>
            </div>
          </div>
        </th>
        <th class="font-normal">
          <div class="flex items-center">
            <img class="h-4 w-4 mr-1" src="../../../assets/alpha.png" alt="Alpha token">
            <div>
              <div class="leading-4">ALPHA</div>
            </div>
          </div>
        </th>
        <th class="font-normal">
          <div class="flex items-center">
            <img class="h-4 w-4 mr-1" src="../../../assets/kek.png" alt="Kek token">
            <div>
              <div class="leading-4">KEK</div>
            </div>
          </div>
        </th>
        <th class="font-normal w-37">
          Total spend (in FUD)
        </th>
        <th v-if="ghstPayouts?.length" class="font-normal text-center w-33">
          Prize
        </th>
      </tr>
    </thead>
    <tbody class="bg-dark border-4 border-neutral-800 text-lg">
      <tr
        v-for="(rank, i) in addresses"
        :key="i"
        class="hover:bg-dark-highlight cursor"
        @click="$emit('click', rank.address)">
        <td class="p-0">
          <div class="inline-block h-6 pl-0.5 pr-2 text-center text-lg leading-6 bg-purple relative">
            <div class="absolute top-0 -left-1 h-full w-1 bg-purple"></div>
            #{{ i + 4 }}
          </div>
        </td>
        <td class="py-4 pr-6 text-2xl">
          <template v-if="rank.address === '-'">
            -
          </template>
          <template v-else-if="rank.ens">
            {{ rank.ens.length > 20 ? `${rank.ens.substring(0,17)}...eth` : rank.ens }}
          </template>
          <div
            v-else
            class="flex items-center">
            <div class="w-[21px] align-bottom overflow-hidden">
              {{ rank.address }}
            </div>
            <div class="flex-1">
              {{ rank.address.substring(2,4) }}...{{ rank.address.substring(rank.address.length -4) }}
            </div>
          </div>
          <span></span>
        </td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? rank.totalFudModified.toLocaleString() : rank.totalFud.toLocaleString() }}</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? rank.totalFomoModified.toLocaleString() : rank.totalFomo.toLocaleString() }}</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? rank.totalAlphaModified.toLocaleString() : rank.totalAlpha.toLocaleString() }}</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? rank.totalKekModified.toLocaleString() : rank.totalKek.toLocaleString() }}</td>
        <td class="w-36 py-4 text-3xl">{{ showModified ? rank.fudStandardSpentModified.toLocaleString() : rank.fudStandardSpent.toLocaleString() }}</td>
        <td v-if="ghstPayouts?.length">
          <div class="w-full flex items-center pl-6 text-3xl">
            <img src="../../../assets/ghst.png" alt="GHST logo" class="w-4 h-4 mt-1 mr-1.5">
            <div>{{ ghstPayouts[i] ? Number(ghstPayouts[i]).toLocaleString() : 0 }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    addresses: Array,
    showModified: Boolean,
    ghstPayouts: Array
  }
}
</script>
