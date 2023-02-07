<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import { RouterView } from "vue-router";
import { characterRoute } from "@/characters/router/index";
import type { RouterLink } from "@/router/link-routes";
import { ref } from "vue";

const routeLinks: RouterLink[] = characterRoute
    .children!.filter(
        (route) => (route.props as { visible: boolean }).visible
    )
    .map((route) => {
        return {
            name: route.name as string,
            path: route.path,
            title: (route.props as { title: string; visible: boolean }).title,
        };
    });

</script>

<template>
    <h1>Personajes</h1>

    <!-- Navbar -->
    <NavBar :show-icon="false" :links="routeLinks" />

    <!-- RoterView +  Suspense -->
    <RouterView />
</template>

<style scoped></style>
