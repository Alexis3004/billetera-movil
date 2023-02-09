import { defineStore } from 'pinia';

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
    user: User | null;
}

export const useUserStore = defineStore("user", {
    state: (): State => ({
        user: null,
    }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {
        setUser(usuario : User | null) {
            this.user = usuario;
        },
    },
});
