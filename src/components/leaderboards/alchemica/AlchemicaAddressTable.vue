<template>
  <table class="w-full border-spacing-0 border-collapse">
    <thead class="text-left text-lg text-white/50">
      <tr>
        <th class="font-normal">Image</th>
        <th class="font-normal">Date/Time</th>
        <th class="font-normal pr-6">Quantity</th>
        <th v-if="showModified" class="font-normal pr-6">Multiplier</th>
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
          Total (in FUD)
        </th>
      </tr>
    </thead>
    <tbody class="bg-dark border-4 border-neutral-800 text-lg">
      <tr v-for="item in data" :key="item.eventId">
        <td class="py-4 px-6 w-[80px] text-center">
          <img class="max-w-[80px] max-h-[80px] inline-block" :src="`/installations/${item.type}_${item.id}.png`"
            :alt="item.name" />
        </td>
        <td class="py-4 pr-6">
          <div class="text-xl">
            {{ item.name }}
          </div>
          <span class="text-lg">{{ DateTime.fromSeconds(Number(item.timestamp)).toLocaleString(DateTime.DATETIME_SHORT)
          }}</span>
        </td>
        <td class="py-4 pr-6 text-xl">{{ item.quantity.toLocaleString() }}</td>
        <td v-if="showModified" class="py-4 pr-6 text-xl">{{ item.modifier }}x</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? item.costFudModified.toLocaleString() : item.costFud.toLocaleString() }}</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? item.costFomoModified.toLocaleString() : item.costFomo.toLocaleString() }}</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? item.costAlphaModified.toLocaleString() : item.costAlpha.toLocaleString() }}</td>
        <td class="py-4 pr-6 text-xl">{{ showModified ? item.costKekModified.toLocaleString() : item.costKek.toLocaleString() }}</td>
        <td class="w-36 py-4 text-3xl">{{ showModified ? item.totalFudModified.toLocaleString() : item.totalFud.toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  props: {
    data: Array,
    showModified: Boolean
  },
  data () {
    return {
      DateTime
    }
  }
}
</script>
