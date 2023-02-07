<script setup lang="ts"></script>

<template>
    <section class="min-h-fit">
        <div className="px-5 py-14 flex flex-col justify-center items-center">
            <div class="mb-24 border h-64 w-64 rounded-full flex flex-col justify-center items-center">
                <p class="font-semibold text-2xl">Saldo disponible</p>
                <span class="font-bold text-[40px]">$4.000</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <div
                    className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                >
                    <div>
                        <h6 class="text-black font-bold uppercase">
                            Recargar saldo
                            <i class="fa-regular fa-circle-up text-xl"></i>
                        </h6>
                    </div>
                </div>
                <div
                    className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                >
                    <div>
                        <h6 class="text-black font-bold uppercase">
                            Pagar compras <i class="fa-solid fa-shop"></i>
                        </h6>
                    </div>
                </div>
                <div
                    className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                >
                    <div>
                        <h6 class="text-black font-bold uppercase">
                            Transferir saldo
                            <i class="fa-regular fa-circle-right text-xl"></i>
                        </h6>
                    </div>
                </div>
                <div
                    className="bg-white sm:cursor-pointer
               relative group w-full flex items-center
                gap-5 p-5 max-w-sm rounded-md border-2 border-slate-200"
                >
                    <div>
                        <h6 class="text-black font-bold uppercase">
                            Movimientos
                            <i class="fa-solid fa-clipboard-list"></i>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
