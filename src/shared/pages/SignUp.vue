<script setup lang="ts"></script>

<template>
    <div class="h-full flex justify-center items-center w-full ">
        <div class="bg-white w-2/3 lg:w-1/2 p-12 rounded-xl">
            <h1 class="text-black text-center text-3xl font-bold my-10">
                Registrarse
            </h1>
            <form class="w-full mt-16 lg:grid lg:grid-cols-2 lg:gap-x-10">
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Número de identificación*</label
                    >
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su número de identificación"
                        type="number"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2">Nombre*</label>
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su nombre"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Apellido*</label
                    >
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su apellido"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Correo electrónico*</label
                    >
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su correo electrónico"
                        type="email"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Número de celular*</label
                    >
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su número de celular"
                        type="number"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Contraseña*</label
                    >
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese una contraseña"
                        type="password"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Confirmar contraseña*</label
                    >
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese nuevamente la contraseña"
                        type="password"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2">PIN*</label>
                    <input
                        class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su PIN de seis dígitos"
                        type="number"
                    />
                </div>
                <div class="flex justify-center col-span-2">
                    <button
                        class="mt-8 p-3 font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 cursor-pointer"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
