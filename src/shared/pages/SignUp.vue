<script setup lang="ts"></script>

<template>
    <div class="h-full flex justify-center items-center w-full ">
        <div class="bg-white w-1/3 p-7 rounded-xl">
            <h1 class="text-blue-900 text-center text-3xl font-bold mb-10">
                Registrarse
            </h1>
            <form class="w-full lg:grid lg:grid-cols-2 lg:gap-x-10">
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Número de identificación*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su número de identificación"
                        type="number"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2">Nombre*</label>
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su nombre"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Apellido*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su apellido"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Correo electrónico*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su correo electrónico"
                        type="email"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Número de celular*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su número de celular"
                        type="number"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Contraseña*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese una contraseña para administrar el perfil"
                        type="password"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2"
                        >Confirmar contraseña*</label
                    >
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese nuevamente la contraseña"
                        type="password"
                    />
                </div>
                <div class="flex flex-col mb-8">
                    <label class="text-black font-semibold mb-2">PIN*</label>
                    <input
                        class="border p-2 rounded-lg"
                        placeholder="Ingrese su PIN de seis dígitos para transacciones"
                        type="number"
                    />
                </div>
                <div class="flex justify-center col-span-2">
                    <button
                        class="mt-8 p-3 font-bold text-white bg-blue-800 rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
