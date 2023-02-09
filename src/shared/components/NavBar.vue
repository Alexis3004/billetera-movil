<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import MoneyTransfer from "@/shared/components/icons/MoneyTransfer.vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import HouseIcon from "./icons/HouseIcon.vue";
import paymentsApi from '@/api/paymentsApi';
import { ref } from "vue";

const route = useRoute()
const router = useRouter()

const store = useUserStore()
const { user } = storeToRefs(store)

const info = ref(false)

const dropInfo = () => info.value = !info.value

const cerrarSesion = async () => {
    info.value = !info.value
    await paymentsApi.post('/logout')
    user.value = null
    localStorage.clear()
    router.push({ name: 'signin' })
}

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
        <div v-show="info"
            class="z-50 flex flex-col justify-center items-center absolute right-14 top-14 bg-gray-700 w-32 h-auto text-white p-4 rounded-md">
            <template v-if="user !== null">
                <RouterLink @click="dropInfo" to="/editarPerfil"
                    class="my-2 font-semibold hover:opacity-50 cursor-pointer">Editar cuenta
                </RouterLink>
                <hr class=" border border-white w-full" />
                <RouterLink @click="cerrarSesion" to="/"
                    class="my-2 font-semibold hover:opacity-50 cursor-pointer">
                    Cerrar
                    sesión</RouterLink>
            </template>
            <template v-else>
                <RouterLink @click="dropInfo" v-if="route.name != 'signin'" to="/signin"
                    class="my-2 font-semibold hover:opacity-50 cursor-pointer">Loguearse</RouterLink>
                <RouterLink @click="dropInfo" v-if="route.name != 'signup'" to="/signup"
                    class="my-2 font-semibold hover:opacity-50 cursor-pointer">Registrarse</RouterLink>
            </template>
        </div>
    </transition>
</template>

<style scoped>

</style>
