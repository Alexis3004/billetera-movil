<script setup lang="ts">
</script>

<template>
    <section class="flex justify-center items-center">
        <div class="bg-white w-1/4 p-7 rounded-xl">
            <h1 class="text-blue-900 text-center text-3xl font-bold mb-10">Transferir dinero</h1>
            <form>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Valor a transferir*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese el valor a transferir"
                        type="number"
                    />
                </div>
                <div class="flex flex-col">
                    <label class="text-black font-semibold mb-2"
                        >¿A quién desea transferir el dinero?*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese el correo o celular"
                    />
                </div>
                <div class="flex justify-center">
                    <button class="mt-8 p-3 font-bold text-white bg-blue-800 rounded-lg">Transferir</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped></style>
