<template>
  <div class="flex">
    <div class="flex-1">
      <div class="text-center text-2xl mb-2 tracking-wide">
        Round multipliers (UTC 00:00:00 - 23:59:59)
      </div>
      <table class="w-full text-2xl table-fixed mb-6">
        <thead class="text-white/50">
          <tr>
            <th class="font-normal leading-none">Mon</th>
            <th class="font-normal leading-none">Tue</th>
            <th class="font-normal leading-none">Wed</th>
            <th class="font-normal leading-none">Thu</th>
            <th class="font-normal leading-none">Fri</th>
            <th class="font-normal leading-none">Sat</th>
            <th class="font-normal leading-none">Sun</th>
          </tr>
        </thead>
        <tbody class="text-center text-3xl">
          <tr>
            <td v-for="(multiplier, i) in dayModifiers" :key="i" class="leading-none">
              {{ multiplier }}x
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex-1">
      <div class="text-center text-2xl mb-2 tracking-wide">
        Token multipliers
      </div>
      <div class="text-center text-3xl">
        <div class="flex justify-between pt-4 pl-8">
          <div class="flex">
            <img class="h-10 w-10 mr-3" src="../../assets/fud.png" alt="Fud token">
            <div>
              <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FUD</div>
              <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ tokenModifiers.fud }}x</div>
            </div>
          </div>
          <div class="flex">
            <img class="h-10 w-10 mr-3" src="../../assets/fomo.png" alt="Fomo token">
            <div>
              <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">FOMO</div>
              <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ tokenModifiers.fomo }}x</div>
            </div>
          </div>
          <div class="flex">
            <img class="h-10 w-10 mr-3" src="../../assets/alpha.png" alt="Alpha token">
            <div>
              <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">ALPHA</div>
              <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ tokenModifiers.alpha }}x</div>
            </div>
          </div>
          <div class="flex">
            <img class="h-10 w-10 mr-3" src="../../assets/kek.png" alt="Kek token">
            <div>
              <div class="text-white/50 text-lg tracking-wide leading-4 -mt-px">KEK</div>
              <div class="text-3xl tracking-wide leading-7 -mt-0.5">{{ tokenModifiers.kek }}x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dayModifiers: Array,
    tokenModifiers: Object
  }
}
</script>
