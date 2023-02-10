import { defineStore } from 'pinia';
import { StorageSerializers, useStorage } from '@vueuse/core'

interface User {
    _id: string,
    identificacion: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    pin: number;
    password: string;
    api_token: string;
    intentos: number;
}

interface State {
    user: any;
    bancos: any;
    tiendas: any;
    cargando: boolean;
    saldo: number;
}

interface Entidad {
    nombre: string;
    email: string;
    telefono: number;
}

export const useUserStore = defineStore("user", {
    state: (): State => ({
        user: useStorage('user', null, undefined, { serializer: StorageSerializers.object }),
        bancos: useStorage('bancos', null, undefined, { serializer: StorageSerializers.object }),
        tiendas: useStorage('tiendas', null, undefined, { serializer: StorageSerializers.object }),
        cargando: false,
        saldo: 0
    }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {
        setUser(usuario : User | null) {
            this.user = usuario;
        },
        setBancos(bancos : Entidad[]) {
            this.bancos = bancos;
        },
        setTiendas(tiendas : Entidad[]) {
            this.tiendas = tiendas;
        },
    },
});
