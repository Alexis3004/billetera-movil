<script setup lang="ts">
</script>

<template>
    <section class="flex justify-center items-center">
        <div class="bg-white w-1/2 p-7">
            <h1 class="text-blue-900 text-center text-3xl font-bold">Iniciar Sesión</h1>
            <form>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Usuario o email*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su usuario o email"
                    />
                </div>
                <div class="flex flex-col">
                    <label class="text-black font-semibold mb-2"
                        >Contraseña*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div class="flex justify-center">
                    <button class="mt-8 p-3 font-bold text-white bg-blue-800 rounded-lg">Iniciar sesión</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped></style>
