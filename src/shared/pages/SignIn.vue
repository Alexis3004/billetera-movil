<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { reactive, computed, nextTick, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email, requiredIf } from '@vuelidate/validators'
import paymentsApi from '@/api/paymentsApi';
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useUserStore()
const { user } = storeToRefs(store)

const login = reactive({
    tipo: 0,
    telefono: '',
    email: '',
    password: ''
})

const errors = ref([])

const rules = computed(() => ({
    telefono: {
        campoRequerido: helpers.withMessage("Requerido", requiredIf(login.tipo == 0)),
    },
    email: {
        campoRequerido: helpers.withMessage("Requerido", requiredIf(login.tipo == 1)),
        campoEmail: helpers.withMessage("Email inválido", email),
    },
    password: {
        campoRequerido: helpers.withMessage("Requerido", required)
    },
}))

const v$ = useVuelidate(rules, login)

const validarCampos = () => {
    v$.value.$touch();
    return v$.value.$invalid;
}
// v$.value.$reset();
const loguear =  async (event: Event) => {
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
        const response = await paymentsApi.post('/login', {
            password: login.password,
            telefono: login.tipo == 0 ? login.telefono : '',
            email: login.tipo == 1 ? login.email : ''
        })
        errors.value = []
        localStorage.setItem('user',JSON.stringify(response.data.data.attributes))
        user.value = response.data.data.attributes
        router.push({ name: 'home' })
    } catch(err: any) {
        if (Object.keys(err).includes('response')) {
            if (Object.keys(err.response).includes('data')) {
                errors.value = err.response.data.errors
            }
        }
    }
}
</script>

<template>
    <section class="h-full flex justify-center items-center w-full text-black">
        <div class="bg-white md:w-1/2 lg::w-1/3 p-7 rounded-xl shadow-sm shadow-zinc-100">
            <h1 class="t my-10 text-center text-3xl font-bold">Iniciar Sesión</h1>
            <form>
                <div class="flex flex-row gap-6 mb-8">
                    <label for="telefono" class="font-semibold cursor-pointer">
                        Teléfono:
                        <input id="telefono"
                            class="active:scale-95 ml-2 cursor-pointer hover:ring-2 hover:ring-blue-600" type="radio"
                            name="tipo" :value="0" v-model.number="login.tipo">
                    </label>
                    <label for="email" class="font-semibold cursor-pointer">
                        Email:
                        <input id="email" class="active:scale-95 ml-2 cursor-pointer hover:ring-2 hover:ring-blue-600"
                            type="radio" name="tipo" :value="1" v-model.number="login.tipo">
                    </label>
                </div>
                <div class="flex flex-col mb-8"
                    v-bind="{ error: login.tipo === 0 ? v$.telefono.$error : v$.email.$error }">
                    <label class="font-semibold mb-2">
                        {{ login.tipo === 0 ? 'Teléfono' : 'Email' }}<span class="ml-1 text-red-600">*</span>
                    </label>
                    <input v-if="login.tipo === 0" type="number" class="border border-gray-500 p-2 rounded-lg"
                        placeholder="Ingrese su teléfono" v-model="login.telefono" />
                    <span class="error-message error" v-if="v$.telefono.$error && login.tipo === 0">
                        {{ v$.telefono.$silentErrors[0].$message }}
                    </span>
                    <input v-if="login.tipo === 1" type="email" class="border border-gray-500 p-2 rounded-lg"
                        placeholder="Ingrese su email" v-model="login.email" />
                    <span class="error-message error" v-if="v$.email.$error && login.tipo === 1">
                        {{ v$.email.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col" v-bind="{ error: v$.password.$error }">
                    <label class="font-semibold mb-2">Contraseña<span class="ml-1 text-red-600">*</span></label>
                    <input type="password" class="border border-gray-500 p-2 rounded-lg" placeholder="Ingrese su contraseña"
                        v-model="login.password" />
                    <span class="error-message error" v-if="v$.password.$error">
                        {{ v$.password.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex justify-center">
                    <button @click="loguear($event)"
                        class="active:scale-95 mt-8 p-3 font-bold bg-yellow-400 hover:bg-yellow-300 rounded-lg">
                        Iniciar sesión
                    </button>
                </div>
            </form>
            <ul v-if="errors.length > 0" class="error-message error font-bold">
                <li v-for="(error, index) in errors" :key="index" class="font-semibold">{{ error.msg }}</li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>

</style>
