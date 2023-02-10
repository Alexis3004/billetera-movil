<script setup lang="ts">
import EmptyIcon from '@/shared/components/icons/EmptyIcon.vue'
import paymentsApi from '@/api/paymentsApi';
import { formatCoin } from '../../helpers/index';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import Swal from "sweetalert2";
import dayjs from 'dayjs';

const store = useUserStore()
const { cargando, user } = storeToRefs(store)

interface Movimiento {
    _id: string;
    tipo: string;
    valor: number;
    fecha: string;
    remitente: string;
    destinatario: string;
    tienda: string;
    banco: string;
}

const movimientos = ref<Movimiento[]>([])

onMounted(async () => {
    try {
        cargando.value = true
        const result = await paymentsApi.get('/user/movimientos')
        movimientos.value = result.data.data
        cargando.value = false
    } catch (error) {
        cargando.value = false
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ha ocurrido un error al consultar los movimientos.',
            showConfirmButton: true,
            // timer: 1500
        })
    }
})
</script>

<template>
    <section class="">
        <div className="px-5 py-14 flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center w-full">
                <div v-for="movimiento in movimientos" :key="movimiento._id" className="bg-white
                w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200">
                    <div class="w-full">
                        <h6 class="text-black font-bold capitalize">
                            <template v-if="movimiento.destinatario == user._id">
                                <i class="fa-regular fa-circle-up text-xl text-green-500"></i>
                            </template>
                            <template v-else>
                                <i class="fa-regular fa-circle-down text-xl text-red-500"></i>
                            </template>
                            {{ movimiento.tipo }}
                            <span class="float-right">{{ formatCoin(movimiento.valor || 0) }}</span>
                            <p class="text-xs pl-6">{{ dayjs(movimiento.fecha).format('YYYY-MM-DD H:m:s') }}</p>
                        </h6>
                    </div>
                </div>
                <div v-if="movimientos.length == 0" class="w-full flex justify-center">
                    <EmptyIcon class="w-2/3 md:w-1/3 lg:w-1/4" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>
