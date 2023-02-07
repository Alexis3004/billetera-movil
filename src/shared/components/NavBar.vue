<script setup lang="ts">
import MoneyTransfer from "@/shared/components/icons/MoneyTransfer.vue";
import type { RouterLink as routes } from "@/router/link-routes";
import { RouterLink } from "vue-router";
// const props = defineProps({
//     title: {
//         type: String,
//         default: 'VueTS'
//     }
// })

export interface Props {
    title?: string;
    links?: routes[];
    showIcon?: boolean;
}

// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
    showIcon: true,
    links: () => [],
});
</script>

<template>
    <nav
        class="absolute top-0 flex items-center h-12 justify-start w-full text-lg text-center gap-8"
    >
        <MoneyTransfer class=" w-10 ml-2 bg-transparent fill-yellow-500" />
        <span>BILLETERA MÓVIL</span>
        <RouterLink to="/"
            ><i class="fa-solid fa-house cursor-pointer"></i
        ></RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>
        <div class="absolute right-12">
            <i class="right-1 fa-solid fa-user"></i>
        </div>
    </nav>
</template>

<style scoped></style>
