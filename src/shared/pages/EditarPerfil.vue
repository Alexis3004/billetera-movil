<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { reactive, watch, computed, nextTick, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email, numeric, minLength } from '@vuelidate/validators'
import paymentsApi from '@/api/paymentsApi';
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useUserStore()
const { user } = storeToRefs(store)

const usuario = reactive({
    identificacion: user.value?.identificacion,
    nombre: user.value?.nombre,
    apellido: user.value?.apellido,
    email: user.value?.email,
    telefono: user.value?.telefono
})

const errors = ref([])

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
        const response = await paymentsApi.patch(`/user/update/${user.value?._id}`, usuario)
        errors.value = []
        localStorage.setItem('user', JSON.stringify(response.data.data.attributes))
        user.value = response.data.data.attributes
        router.push({ name: 'home' })
    } catch (err: any) {
        if (Object.keys(err).includes('response')) {
            if (Object.keys(err.response).includes('data')) {
                errors.value = err.response.data.errors
            }
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
        <ul v-if="errors.length > 0" class="error-message error font-bold">
            <li v-for="(error, index) in errors" :key="index" class="font-semibold">{{ error.msg }} {{ `${error.param ?
            `(${error.param})` : ''}` }}</li>
        </ul>
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
