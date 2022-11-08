<template>
    <div class="relative">
        <div class="absolute h-full w-1 -left-1 top-0 bg-zinc-800"></div>
        <div class="absolute h-1 w-full left-0 -top-1 bg-zinc-800"></div>
        <div class="absolute h-full w-1 -right-1 top-0 bg-zinc-800"></div>
        <div class="absolute h-1 w-full left-0 -bottom-1 bg-zinc-800"></div>
        <slot />
    </div>
</template>
