<script setup lang="ts"></script>

<template>
    <section class="h-full flex justify-center items-center w-full">
        <div class="bg-white md:w-1/2 lg::w-1/3 p-7 rounded-xl">
            <h1 class="text-black my-10 text-center text-3xl font-bold">Iniciar Sesión</h1>
            <form>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Usuario o email*</label
                    >
                    <input
                        class="border border-gray-500 p-2 rounded-lg"
                        placeholder="Ingrese su usuario o email"
                    />
                </div>
                <div class="flex flex-col">
                    <label class="text-black font-semibold mb-2"
                        >Contraseña*</label
                    >
                    <input
                        class="border border-gray-500 p-2 rounded-lg"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div class="flex justify-center">
                    <button class="mt-8 p-3 font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg">Iniciar sesión</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped></style>
