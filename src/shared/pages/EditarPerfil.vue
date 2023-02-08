<script setup lang="ts"></script>

<template>

    <section className="py-14 text-white px-8 md:px-20">
        <span class="text-3xl">Hola, Alexis Cáceres</span>
        <div class="flex flex-wrap justify-center md:gap-10">
            <div class="flex flex-col my-5 lg:my-8">
                <label class="font-semibold mb-2">Nombre:</label>
                <input class="border p-2 rounded-lg bg-inherit w-[300px]" placeholder="Ingrese su nombre" type="text" />
            </div>
            <div class="flex flex-col my-5 lg:my-8">
                <label class="font-semibold mb-2">Apellido:</label>
                <input class="border p-2 rounded-lg bg-inherit w-[300px]" placeholder="Ingrese su apellido"
                    type="text" />
            </div>
            <div class="flex flex-col my-5 lg:my-8">
                <label class="font-semibold mb-2">Número de identificación:</label>
                <input class="border p-2 rounded-lg bg-inherit w-[300px]"
                    placeholder="Ingrese su número de identificación" type="number" />
            </div>
            <div class="flex flex-col my-5 lg:my-8">
                <label class="font-semibold mb-2">Correo electrónico:</label>
                <input class="border p-2 rounded-lg bg-inherit w-[300px]" placeholder="Ingrese su correo electrónico"
                    type="email" />
            </div>
            <div class="flex flex-col my-5 lg:my-8">
                <label class="font-semibold mb-2">Número de celular:</label>
                <input class="border p-2 rounded-lg bg-inherit w-[300px]" placeholder="Ingrese su número de celular"
                    type="number" />
            </div>
            <div class="w-full flex justify-center">
            <button class="mt-8 p-3 font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 cursor-pointer text-xl">Guardar cambios</button>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
