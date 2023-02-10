<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { reactive, watch, computed, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email, numeric, minLength } from '@vuelidate/validators'
import paymentsApi from '@/api/paymentsApi';
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';

const router = useRouter()

const store = useUserStore()
const { user, cargando } = storeToRefs(store)

const usuario = reactive({
    identificacion: user.value?.identificacion,
    nombre: user.value?.nombre,
    apellido: user.value?.apellido,
    email: user.value?.email,
    telefono: user.value?.telefono
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
    }
}))

const v$ = useVuelidate(rules, usuario)

const validarCampos = () => {
    v$.value.$touch();
    return v$.value.$invalid;
}

const handleUpdate = async () => {
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
        const result = await Swal.fire({
            title: '¿Está seguro?',
            text: "Los datos personales serán actualizados",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        })
        if (result.isConfirmed) {
            cargando.value = true
            const response = await paymentsApi.patch(`/user/update/${user.value?._id}`, usuario)
            cargando.value = false
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Datos actualizados con éxito',
                showConfirmButton: false,
                timer: 1500
            })
            user.value = response.data.data.attributes
            router.push({ name: 'home' })
        }
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
                title: 'Ha ocurrido un error al intentar modificar los datos personales.',
                showConfirmButton: true,
                // timer: 1500
            })
        }
    }
}

watch(user, () => {
    usuario.identificacion = user.value?.identificacion
    usuario.nombre = user.value?.nombre
    usuario.apellido = user.value?.apellido
    usuario.email = user.value?.email
    usuario.telefono = user.value?.telefono
})
</script>

<template>
    <section className="py-14 text-white px-8 md:px-20">
        <span class="text-3xl">Hola, {{ `${user?.nombre} ${user?.apellido}` }}</span>
        <div class="flex flex-wrap justify-center md:gap-10">
            <div class="flex flex-col my-5 lg:my-8" v-bind="{ error: v$.nombre.$error }">
                <label class="font-semibold mb-2">Nombre:</label>
                <input v-model="usuario.nombre" class="border p-2 rounded-lg bg-inherit w-[300px]"
                    placeholder="Ingrese su nombre" type="text" />
                <span class="error-message error" v-if="v$.nombre.$error">
                    {{ v$.nombre.$silentErrors[0].$message }}
                </span>
            </div>
            <div class="flex flex-col my-5 lg:my-8" v-bind="{ error: v$.apellido.$error }">
                <label class="font-semibold mb-2">Apellido:</label>
                <input v-model="usuario.apellido" class="border p-2 rounded-lg bg-inherit w-[300px]"
                    placeholder="Ingrese su apellido" type="text" />
                <span class="error-message error" v-if="v$.apellido.$error">
                    {{ v$.apellido.$silentErrors[0].$message }}
                </span>
            </div>
            <div class="flex flex-col my-5 lg:my-8" v-bind="{ error: v$.identificacion.$error }">
                <label class="font-semibold mb-2">Número de identificación:</label>
                <input v-model.number="usuario.identificacion" class="border p-2 rounded-lg bg-inherit w-[300px]"
                    placeholder="Ingrese su número de identificación" type="number" />
                <span class="error-message error" v-if="v$.identificacion.$error">
                    {{ v$.identificacion.$silentErrors[0].$message }}
                </span>
            </div>
            <div class="flex flex-col my-5 lg:my-8" v-bind="{ error: v$.email.$error }">
                <label class="font-semibold mb-2">Correo electrónico:</label>
                <input v-model="usuario.email" class="border p-2 rounded-lg bg-inherit w-[300px]"
                    placeholder="Ingrese su correo electrónico" type="email" />
                <span class="error-message error" v-if="v$.email.$error">
                    {{ v$.email.$silentErrors[0].$message }}
                </span>
            </div>
            <div class="flex flex-col my-5 lg:my-8" v-bind="{ error: v$.telefono.$error }">
                <label class="font-semibold mb-2">Número de celular:</label>
                <input v-model.number="usuario.telefono" class="border p-2 rounded-lg bg-inherit w-[300px]"
                    placeholder="Ingrese su número de celular" type="number" />
                <span class="error-message error" v-if="v$.telefono.$error">
                    {{ v$.telefono.$silentErrors[0].$message }}
                </span>
            </div>
            <div class="w-full flex justify-center">
                <button @click="handleUpdate"
                    class="mt-8 p-3 font-bold text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 cursor-pointer text-xl">Guardar
                    cambios</button>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
