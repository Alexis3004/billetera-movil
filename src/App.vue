<script setup lang="ts">
import { RouterView } from 'vue-router'
import { routeLinks } from './router/link-routes';
import NavBar from './shared/components/NavBar.vue';
</script>

<template>
    <div class="wrapper">
        <header class="">
            <NavBar
                title="BreakingBad"
                :links="routeLinks"
            />
        </header>
        <main class="min-h-main py-10">
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
.wrapper {
    @apply w-full bg-[#181818] grid grid-cols-1 grid-rows-layout-2;
}
</style>
