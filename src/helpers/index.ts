export interface User {
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

export const validateUser = () => {
    let isAuthenticated: boolean  = false
    const user: User | null = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') || '') : null
    if (user !== null) {
        if (Object.keys(user).length > 0) {
            isAuthenticated = user.api_token !== ''
        }
    }
    return isAuthenticated
}

export const formatCoin = (cantidad: number) => {
    return cantidad.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumSignificantDigits: 10,
    });
};
