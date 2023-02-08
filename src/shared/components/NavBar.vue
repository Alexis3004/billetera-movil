<script setup lang="ts">
import MoneyTransfer from "@/shared/components/icons/MoneyTransfer.vue";
// import type { RouterLink as routes } from "@/router/link-routes";
import { RouterLink } from "vue-router";
import HouseIcon from "./icons/HouseIcon.vue";

import { ref } from "vue";
const info = ref(false)

const dropInfo = () => info.value = !info.value
</script>

<template>
    <nav class="text-white absolute top-0 flex items-center h-16 justify-start w-full text-2xl text-center gap-8">
        <RouterLink to="/" class="font-bold flex">
            <MoneyTransfer class="mr-1 w-12 ml-5 bg-transparent fill-yellow-400" />
            BILLETERA MÓVIL
        </RouterLink>
        <RouterLink to="/">
            <HouseIcon class="hidden md:flex hover:opacity-50 cursor-pointer  w-6 mr-3 fill-white bg-transparent" />
        </RouterLink>
        <div class="hover:opacity-50 cursor-pointer absolute right-12" @click="dropInfo">
            <i class="hover:opacity-50 cursor-pointer right-1 fa-solid fa-user"></i>
        </div>
    </nav>
    <transition>
    <div v-show="info" class="z-50 flex flex-col justify-center items-center absolute right-14 top-14 bg-gray-700 w-32 h-24 text-white p-4">
        <RouterLink to="/editarPerfil" class="my-2 font-semibold hover:opacity-50 cursor-pointer">Editar cuenta</RouterLink>
        <hr class=" border border-white w-full"/>
        <RouterLink to="/" class="my-2 font-semibold hover:opacity-50 cursor-pointer text-sm text-gray-300">Cerrar sesión</RouterLink>
    </div>
  </transition>
</template>

<style scoped>

</style>
