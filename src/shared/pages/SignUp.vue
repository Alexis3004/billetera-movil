<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { reactive, computed, nextTick, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email, numeric, minLength, sameAs, maxLength } from '@vuelidate/validators'
import paymentsApi from '@/api/paymentsApi';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const store = useUserStore()
const { user, cargando } = storeToRefs(store)

const usuario = reactive({
    identificacion: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    pin: '',
    password: '',
    confirmPassword: ''
})

const rules = computed(() => ({
    identificacion: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoNumerico: helpers.withMessage("Identificación inválida", numeric),
        campoMinumo: helpers.withMessage("Mínimo 8 caracteres", minLength(8)),
    },
    nombre: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoMinumo: helpers.withMessage("Mínimo 3 caracteres", minLength(3)),
    },
    apellido: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoMinumo: helpers.withMessage("Mínimo 3 caracteres", minLength(3)),
    },
    email: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoEmail: helpers.withMessage("Email inválido", email),
    },
    telefono: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoNumerico: helpers.withMessage("Teléfono inválido", numeric),
    },
    pin: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoNumerico: helpers.withMessage("Pin inválido", numeric),
        campoMinumo: helpers.withMessage("El pin debe tener 6 dígitos", minLength(6)),
        campoMaximo: helpers.withMessage("El pin debe tener 6 dígitos", maxLength(6)),
    },
    password: {
        campoRequerido: helpers.withMessage("Requerido", required)
    },
    confirmPassword: {
        campoRequerido: helpers.withMessage("Password no coincide", sameAs(usuario.password))
    },
}))

const v$ = useVuelidate(rules, usuario)

const validarCampos = () => {
    v$.value.$touch();
    return v$.value.$invalid;
}

const registrarse = async (event: Event) => {
    event.preventDefault();

    const formInvalido = [
        validarCampos()
    ];
    if (formInvalido.includes(true)) {
        nextTick(() => {
            let error = document.querySelector(".error");
            if (error != null)
                error.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                });
        });
        return;
    }

    try {
        cargando.value = true
        const response = await paymentsApi.post('/register', usuario)
        cargando.value = false
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado exitosamente',
            showConfirmButton: false,
            timer: 1500
        })
        user.value = response.data.data.attributes
        router.push({ name: 'home' })
    } catch (err: any) {
        cargando.value = false
        if (Object.keys(err).includes('response')) {
            if (Object.keys(err.response).includes('data')) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${err.response.data.errors[0].msg} ${err.response.data.errors[0].param ? `(${err.response.data.errors[0].param})` : ''}`,
                    showConfirmButton: true,
                    // timer: 1500
                })
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ha ocurrido un error al intentar registrarse.',
                showConfirmButton: true,
                // timer: 1500
            })
        }
    }
}
</script>

<template>
    <div class="h-full flex justify-center items-center w-full text-black">
        <div class="bg-white w-2/3 lg:w-1/2 p-12 rounded-xl">
            <h1 class="text-center text-3xl font-bold my-10">
                Registrarse
            </h1>
            <form class="w-full mt-16 lg:grid lg:grid-cols-2 lg:gap-x-10" @submit="registrarse($event)">
                <div class="flex flex-col mb-8" v-bind="{ error: v$.identificacion.$error }">
                    <label class="font-semibold mb-2">
                        Número de identificación<span class="ml-1 text-red-600">*</span>
                    </label>
                    <input v-model.number="usuario.identificacion" id="identificacion" name="identificacion"
                        class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese su número de identificación"
                        type="number" />
                    <span class="error-message error" v-if="v$.identificacion.$error">
                        {{ v$.identificacion.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.nombre.$error }">
                    <label class="font-semibold mb-2">Nombre<span class="ml-1 text-red-600">*</span></label>
                    <input v-model="usuario.nombre" id="nombre" name="nombre"
                        class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese su nombre" />
                    <span class="error-message error" v-if="v$.nombre.$error">
                        {{ v$.nombre.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.apellido.$error }">
                    <label class="font-semibold mb-2">Apellido<span class="ml-1 text-red-600">*</span></label>
                    <input v-model="usuario.apellido" id="apellido" name="apellido"
                        class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese su apellido" />
                    <span class="error-message error" v-if="v$.apellido.$error">
                        {{ v$.apellido.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.email.$error }">
                    <label class="font-semibold mb-2">Correo electrónico<span class="ml-1 text-red-600">*</span></label>
                    <input v-model="usuario.email" id="email" name="email" class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su correo electrónico" type="email" />
                    <span class="error-message error" v-if="v$.email.$error">
                        {{ v$.email.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.telefono.$error }">
                    <label class="font-semibold mb-2">Número de celular<span class="ml-1 text-red-600">*</span></label>
                    <input v-model.number="usuario.telefono" id="telefono" name="telefono"
                        class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese su número de celular"
                        type="number" />
                    <span class="error-message error" v-if="v$.telefono.$error">
                        {{ v$.telefono.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.pin.$error }">
                    <label class="font-semibold mb-2">PIN<span class="ml-1 text-red-600">*</span></label>
                    <input v-model="usuario.pin" id="pin" name="pin" class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su PIN de seis dígitos" type="number" />
                    <span class="error-message error" v-if="v$.pin.$error">
                        {{ v$.pin.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.password.$error }">
                    <label class="font-semibold mb-2">
                        Contraseña<span class="ml-1 text-red-600">*</span>
                    </label>
                    <input v-model="usuario.password" id="password" name="password"
                        class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese una contraseña"
                        type="password" />
                    <span class="error-message error" v-if="v$.password.$error">
                        {{ v$.password.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-8" v-bind="{ error: v$.confirmPassword.$error }">
                    <label class="font-semibold mb-2">
                        Confirmar contraseña<span class="ml-1 text-red-600">*</span>
                    </label>
                    <input v-model="usuario.confirmPassword" id="confirmPassword" name="confirmPassword"
                        class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese nuevamente la contraseña"
                        type="password" />
                    <span class="error-message error" v-if="v$.confirmPassword.$error">
                        {{ v$.confirmPassword.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex justify-center col-span-2">
                    <button
                        class="active:scale-95 mt-8 p-3 font-bold bg-yellow-400 rounded-lg hover:bg-yellow-300 cursor-pointer">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>
