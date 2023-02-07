<script setup lang="ts"></script>

<template>
    <section class="min-h-fit">
        <div className="px-5 py-14">
            <span class="text-3xl">Hola, Alexis Cáceres</span>
            <div class="flex flex-wrap justify-between gap-10">
                <div class="flex flex-col my-8">
                    <label class="font-semibold mb-2">Nombre:</label>
                    <input
                        class="border p-2 rounded-lg bg-inherit w-[300px]"
                        placeholder="Ingrese su nombre"
                        type="text"
                    />
                </div>
                <div class="flex flex-col my-8">
                    <label class="font-semibold mb-2">Apellido:</label>
                    <input
                        class="border p-2 rounded-lg bg-inherit w-[300px]"
                        placeholder="Ingrese su apellido"
                        type="text"
                    />
                </div>
                <div class="flex flex-col my-8">
                    <label class="font-semibold mb-2">Número de identificación:</label>
                    <input
                        class="border p-2 rounded-lg bg-inherit w-[300px]"
                        placeholder="Ingrese su número de identificación"
                        type="number"
                    />
                </div>
                <div class="flex flex-col my-8">
                    <label class="font-semibold mb-2">Correo electrónico:</label>
                    <input
                        class="border p-2 rounded-lg bg-inherit w-[300px]"
                        placeholder="Ingrese su correo electrónico"
                        type="email"
                    />
                </div>
                <div class="flex flex-col my-8">
                    <label class="font-semibold mb-2">Número de celular:</label>
                    <input
                        class="border p-2 rounded-lg bg-inherit w-[300px]"
                        placeholder="Ingrese su número de celular"
                        type="number"
                    />
                </div>
                <div class="flex flex-col my-8">
                    <label class="font-semibold mb-2">PIN:</label>
                    <input
                        class="border p-2 rounded-lg bg-inherit w-[300px]"
                        placeholder="Ingrese un PIN de seis dígitos"
                        type="number"
                    />
                </div>
                
            </div>
        </div>
    </section>
</template>

<style scoped></style>
