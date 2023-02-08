<script setup lang="ts">
const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
</script>

<template>
    <section
        class="before:absolute before:bg-black before:inset-0 before:content-[''] before:opacity-90 z-100 flex h-full w-full justify-center items-center fixed top-0 left-0 right-0 bottom-0">
        <span @click="close"
            class="font-extrabold text-2xl text-white hover:opacity-50 absolute right-10 top-10 cursor-pointer">X</span>
        <div class="bg-white md:w-1/2 lg:w-1/4 p-7 rounded-xl h-[500px]">
            <h1 class="text-black text-center text-3xl font-bold mb-10">Recargar cuenta</h1>
            <form>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2">Asociado externo*</label>
                    <select class="border border-gray-400 p-2 rounded-lg">
                        <option>...</option>
                        <option>Banco 1</option>
                        <option>Banco 2</option>
                        <option>Banco 3</option>
                        <option>Banco 4</option>
                    </select>
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2">Correo electrónico o celular*</label>
                    <input class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese el correo o celular" />
                </div>
                <div class="flex flex-col">
                    <label class="text-black font-semibold mb-2">Valor a recargar*</label>
                    <input type="number" class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese el valor a recargar" />
                </div>
                <div class="flex justify-center">
                    <button
                        class="mt-8 p-3 font-bold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg">Recargar</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped>

</style>
