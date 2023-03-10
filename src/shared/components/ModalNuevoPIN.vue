<script setup lang="ts">
import Swal from 'sweetalert2'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import paymentsApi from '@/api/paymentsApi';
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, numeric, minLength, maxLength } from '@vuelidate/validators'
import { reactive, computed, nextTick, ref } from 'vue';

const store = useUserStore()
const { user, cargando } = storeToRefs(store)

const emit = defineEmits(['close'])

const model = reactive({
    pin: ''
})

interface Error {
    msg: string;
    param: string;
    location: string;
}

const errors = ref<Error[]>([])

const close = () => {
    emit('close')
}

const rules = computed(() => ({
    pin: {
        campoRequerido: helpers.withMessage("Requerido", required),
        campoNumerico: helpers.withMessage("Pin inválido", numeric),
        campoMinumo: helpers.withMessage("El pin debe tener 6 dígitos", minLength(6)),
        campoMaximo: helpers.withMessage("El pin debe tener 6 dígitos", maxLength(6)),
    }
}))

const v$ = useVuelidate(rules, model)

const validarCampos = () => {
    v$.value.$touch();
    return v$.value.$invalid;
}

const handleRestablecer = async (event: Event) => {
    event.preventDefault()
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
            text: "El pin para las transacciones será modificado",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        })
        if (!result.isConfirmed) {
            return
        }
        cargando.value = true
        const response = await paymentsApi.patch(`/user/update/pin/${user.value?._id}`, model)
        cargando.value = false
        errors.value = []
        user.value = response.data.data.attributes
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pin actualizado correctamente.',
            showConfirmButton: false,
            timer: 1500
        })
        emit('close')
    } catch (err: any) {
        if (Object.keys(err).includes('response')) {
            if (Object.keys(err.response).includes('data')) {
                errors.value = err.response.data.errors
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
                title: 'Ha ocurrido un error al intentar modificar el pin.',
                showConfirmButton: true,
                // timer: 1500
            })
        }
    }
}
</script>

<template>
    <section
        class="before:absolute before:bg-black before:inset-0 before:content-[''] before:opacity-90 z-100 flex h-full w-full justify-center items-center fixed top-0 left-0 right-0 bottom-0 text-black">
        <span @click="close"
            class="font-extrabold text-2xl text-white hover:opacity-50 absolute right-10 top-10 cursor-pointer">X</span>
        <div class="bg-white md:w-1/2 lg:w-1/4 p-7 rounded-xl h-96">
            <h1 class="text-center text-3xl font-bold mb-10">Reestablecer PIN</h1>
            <form @submit="handleRestablecer($event)">
                <div class="flex flex-col mb-8" v-bind="{ error: v$.pin.$error }">
                    <label class="font-semibold mb-2">Nuevo PIN*</label>
                    <input class="border border-gray-400 p-2 rounded-lg" placeholder="Ingrese el nuevo PIN"
                        type="number" v-model.number="model.pin" />
                    <span class="error-message error" v-if="v$.pin.$error">
                        {{ v$.pin.$silentErrors[0].$message }}
                    </span>
                </div>
                <div class="flex justify-center">
                    <button
                        class="mt-8 p-3 font-bold bg-yellow-400 hover:bg-yellow-300 rounded-lg">Reestablecer</button>
                </div>
            </form>
        </div>
    </section>
</template>

<style scoped>

</style>
