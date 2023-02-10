<script setup lang="ts">
import Swal from 'sweetalert2'
import paymentsApi from '@/api/paymentsApi';
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, email, requiredIf, numeric, minValue, minLength, maxLength, maxValue } from '@vuelidate/validators';
import { reactive, computed, nextTick, watch } from 'vue';
const emit = defineEmits(['close'])

const store = useUserStore()
const { saldo, cargando } = storeToRefs(store)

const transferencia = reactive({
    tipo: 0,
    telefono: '',
    email: '',
    valor: 0,
    pin: ''
})

const rules = computed(() => ({
    telefono: {
        campoRequerido: helpers.withMessage("Requerido", requiredIf(transferencia.tipo == 0)),
    },
    email: {
        campoRequerido: helpers.withMessage("Requerido", requiredIf(transferencia.tipo == 1)),
        campoEmail: helpers.withMessage("Email inválido", email),
    },
    valor: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoNumerico: helpers.withMessage("Debe ser numérico", numeric),
        campoMinimo: helpers.withMessage("Inválido", minValue(1)),
        campoMaximo: helpers.withMessage("Supera lo que se tiene disponible", maxValue(saldo.value)),
    },
    pin: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoNumerico: helpers.withMessage("Pin inválido", numeric),
        campoMinumo: helpers.withMessage("El pin debe tener 6 dígitos", minLength(6)),
        campoMaximo: helpers.withMessage("El pin debe tener 6 dígitos", maxLength(6)),
    },
}))

const v$ = useVuelidate(rules, transferencia)

const validarCampos = () => {
    v$.value.$touch();
    return v$.value.$invalid;
}

const close = () => {
    emit('close')
}

const handleRecargar = async (event: Event) => {
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
        const response = await paymentsApi.post('/transaccion/transferir', {
            telefono: transferencia.tipo == 0 ? transferencia.telefono : '',
            email: transferencia.tipo == 1 ? transferencia.email : '',
            valor: transferencia.valor,
            pin: transferencia.pin,
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Transferencia exitosa',
            showConfirmButton: false,
            timer: 1500
        })
        cargando.value = false
        saldo.value = saldo.value - transferencia.valor
        close()
    } catch (err: any) {
        cargando.value = false
        if (Object.keys(err).includes('response')) {
            if (Object.keys(err.response).includes('data')) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: err.response.data.errors[0].msg,
                    showConfirmButton: true,
                    // timer: 1500
                })
            }
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ha ocurrido un error al intentar realizar la transferencia.',
                showConfirmButton: true,
                // timer: 1500
            })
        }
    }
}

watch(transferencia, () => {
    if (transferencia.tipo === 0 && transferencia.email != '') {
        transferencia.email = ''
    } else if (transferencia.tipo === 1 && transferencia.telefono != '') {
        transferencia.telefono = ''
    }
})
</script>

<template>
    <section class="text-black before:absolute before:bg-black before:inset-0 before:content-[''] before:opacity-90 z-100 flex h-full w-full justify-center items-center fixed top-0 left-0 right-0 bottom-0">
            <span @click="close" class="font-extrabold text-2xl text-white hover:opacity-50 absolute right-10 top-10 cursor-pointer">X</span>
        <div class="bg-white md:w-1/2 lg:w-1/4 p-7 rounded-xl">
            <h1 class="text-center text-3xl font-bold mb-10">Transferir dinero</h1>
            <form @submit="handleRecargar($event)">
                <div class="flex flex-col mb-5" v-bind="{ error: v$.valor.$error }">
                    <label class="font-semibold mb-2">Valor a transferir<span class="ml-1 text-red-600">*</span></label>
                    <input type="number" class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese el valor a recargar" v-model.number="transferencia.valor" />
                    <span class="error-message error" v-if="v$.valor.$error">
                        {{ v$.valor.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex flex-col mb-5" v-bind="{ error: v$.pin.$error }">
                    <label class="font-semibold mb-2">PIN<span class="ml-1 text-red-600">*</span></label>
                    <input v-model="transferencia.pin" id="pin" name="pin" class="border border-gray-400 p-2 rounded-lg"
                        placeholder="Ingrese su PIN de seis dígitos" type="number" />
                    <span class="error-message error" v-if="v$.pin.$error">
                        {{ v$.pin.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="mb-5">
                    <label class="font-semibold mb-5"
                        >¿A quién desea transferir el dinero?<span class="ml-1 text-red-600">*</span></label
                    >
                </div>
                <div class="flex flex-row gap-6 mb-5">
                    <label for="telefono" class="font-semibold cursor-pointer">
                        Teléfono:
                        <input id="telefono"
                            class="active:scale-95 ml-2 cursor-pointer hover:ring-2 hover:ring-blue-600" type="radio"
                            name="tipo" :value="0" v-model.number="transferencia.tipo">
                    </label>
                    <label for="email" class="font-semibold cursor-pointer">
                        Email:
                        <input id="email" class="active:scale-95 ml-2 cursor-pointer hover:ring-2 hover:ring-blue-600"
                            type="radio" name="tipo" :value="1" v-model.number="transferencia.tipo">
                    </label>
                </div>
                <div class="flex flex-col mb-5"
                    v-bind="{ error: transferencia.tipo === 0 ? v$.telefono.$error : v$.email.$error }">
                    <input v-if="transferencia.tipo === 0" type="number" class="border border-gray-500 p-2 rounded-lg"
                        placeholder="Ingrese su teléfono" v-model="transferencia.telefono" />
                    <span class="error-message error" v-if="v$.telefono.$error && transferencia.tipo === 0">
                        {{ v$.telefono.$silentErrors[0].$message }}
                    </span>
                    <input v-if="transferencia.tipo === 1" type="email" class="border border-gray-500 p-2 rounded-lg"
                        placeholder="Ingrese su email" v-model="transferencia.email" />
                    <span class="error-message error" v-if="v$.email.$error && transferencia.tipo === 1">
                        {{ v$.email.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex justify-center">
                    <button class="mt-8 p-3 font-bold bg-yellow-400 hover:bg-yellow-300 rounded-lg">Transferir</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped></style>
