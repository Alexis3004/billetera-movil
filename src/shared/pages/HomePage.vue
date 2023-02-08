<script setup lang="ts">
import ShopIcon from "@/shared/components/icons/ShopIcon.vue";
import RefreshIcon from "@/shared/components/icons/RefreshIcon.vue";
import ListIcon from "@/shared/components/icons/ListIcon.vue";
import ModalTransferir from "../components/ModalTransferir.vue";
import { ref } from "vue";
import ModalRecargar from "../components/ModalRecargar.vue";
import ModalPagar from "../components/ModalPagar.vue";
import ModalNuevoPIN from "../components/ModalNuevoPIN.vue";


const modalTransferir = ref(false)
const modalRecargar = ref(false)
const modalPagar = ref(false)
const modalNuevoPIN = ref(false)

const changeModalTransferir = () => modalTransferir.value = !modalTransferir.value
const changeModalRecargar = () => modalRecargar.value = !modalRecargar.value
const changeModalPagar = () => modalPagar.value = !modalPagar.value
const changeModalNuevoPIN = () => modalNuevoPIN.value = !modalNuevoPIN.value

</script>

<template>
  <section class="min-h-fit">
    <div className="px-5 py-14 flex flex-col justify-center items-center">
      <div class="mb-24 text-white border h-72 w-72 rounded-full flex flex-col justify-center items-center">
        <p class="font-semibold text-2xl">Saldo disponible</p>
        <span class="font-bold text-[40px]">$234.000.000</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200" @click="changeModalRecargar">
          <div>
            <h6 class="text-black font-bold uppercase">
              <i class="fa-regular fa-circle-up text-xl mr-2"></i>
              Recargar saldo
            </h6>
          </div>
        </div>
        <div className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200" @click="changeModalPagar">
          <div>
            <h6 class="text-black font-bold uppercase flex">
              <ShopIcon class=" w-6 mr-3 bg-transparent" />
              Pagar compras
            </h6>
          </div>
        </div>
        <div className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200" @click="changeModalTransferir">
          <div>
            <h6 class="text-black font-bold uppercase">
              <i class="fa-regular fa-circle-right text-xl mr-2"></i>
              Transferir saldo
            </h6>
          </div>
        </div>
        <div className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200">
          <RouterLink to="/movimientos" class="w-full">
            <div>
              <h6 class="flex text-black font-bold uppercase">
                <ListIcon class=" w-6 mr-3 bg-transparent" />
                Movimientos
              </h6>
            </div>
          </RouterLink>
        </div>
        <div className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200" @click="changeModalNuevoPIN">
          <div>
            <h6 class="text-black font-bold uppercase flex">
              <RefreshIcon class=" w-6 mr-3 bg-transparent" />
              Reestablecer PIN
            </h6>
          </div>
        </div>
      </div>
    </div>
  </section>

  <transition>
    <ModalTransferir v-if="modalTransferir" @close="changeModalTransferir" />
  </transition>
  <transition>
    <ModalRecargar v-if="modalRecargar" @close="changeModalRecargar" />
  </transition>
  <transition>
    <ModalPagar v-if="modalPagar" @close="changeModalPagar" />
  </transition>
  <transition>
    <ModalNuevoPIN v-if="modalNuevoPIN" @close="changeModalNuevoPIN" />
  </transition>
</template>

<style scoped>

</style>
