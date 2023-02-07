<script setup lang="ts">
import { ref } from "vue";
const modal = ref(false)
const changeModal = () => modal.value = !modal.value
</script>

<template>
    <section class="min-h-fit">
        <div className="px-5 py-14 flex flex-col justify-center items-center">
            <div
                className="flex flex-col gap-4 justify-center items-center w-full"
            >
                <div
                @click="changeModal"
                    className="bg-white sm:cursor-pointer
                w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                >
                    <div class="w-full">
                        <h6 class="text-black font-bold capitalize">
                            <i
                                class="fa-regular fa-circle-up text-xl text-green-500"
                            ></i>
                            Nombre del Movimiento
                            <span class="float-right">$90.000</span>
                            <p class="text-xs pl-6">24/11/2022 12:40 pm</p>

                        </h6>
                    </div>
                </div>
                <div
                @click="changeModal"
                    className="bg-white sm:cursor-pointer
                w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                >
                    <div class="w-full">
                        <h6 class="text-black font-bold capitalize">
                            <i
                                class="fa-regular fa-circle-down text-xl text-red-500"
                            ></i>
                            Nombre del Movimiento
                            <span class="float-right">$90.000</span>
                            <p class="text-xs pl-6">24/11/2022 12:40 pm</p>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
