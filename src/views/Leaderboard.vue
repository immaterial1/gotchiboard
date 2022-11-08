<template>
  <div class="leaderboard">
    <div class="bg-indigo pb-8">
      <div class="max-w-screen-lg mx-auto">
        <g-heading :level="'2'" :styleLevel="'2'" class="text-center mb-8">
          Welcome to the Gotchiboard Leaderboards!
          <br/>
          Are ya winning, son?
        </g-heading>
        <div class="flex justify-between">
          <g-button element="router-link" :to="'/leaderboards/alchemica'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3" :disabled="$route.path != '/leaderboards/alchemica'">
            <div class="flex items-center h-full">
                <img :src="$route.path != '/leaderboards/alchemica' ? '/alchemica-grey.png' : '/alchemica.png'" alt="Alchemica icon"/>
                <span class="flex-1 text-2xl leading-none text-center">Alchemica</span>
            </div>
          </g-button>
          <g-button element="router-link" :to="'/leaderboards/baazaar'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3" :disabled="$route.path != '/leaderboards/baazaar'">
            <div class="flex items-center h-full">
                <img :src="$route.path != '/leaderboards/baazaar' ? '/baazaar-grey.png' : '/baazaar.png'" alt="Baazaar icon"/>
                <span class="flex-1 text-2xl leading-none text-center">Baazaar</span>
            </div>
          </g-button>
          <g-button element="router-link" :to="'/leaderboards/parcel'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3" :disabled="$route.path != '/leaderboards/parcel'">
            <div class="flex items-center h-full">
                <img :src="$route.path != '/leaderboards/parcel' ? '/gotchiverse-grey.png' : '/gotchiverse.png'" alt="Gotchiverse icon"/>
                <span class="flex-1 text-2xl leading-none text-center">Parcel</span>
            </div>
          </g-button>
          <g-button element="router-link" :to="'/leaderboards/gltr'" theme="primary" :large="true" class="w-52 h-22 pb-2 px-3" :disabled="$route.path != '/leaderboards/gltr'">
            <div class="flex items-center h-full">
                <img :src="$route.path != '/leaderboards/gltr' ? '/gltr-grey.png' : '/gltr.png'" alt="Gltr icon"/>
                <span class="flex-1 text-2xl leading-none text-center">GLTR</span>
            </div>
          </g-button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
