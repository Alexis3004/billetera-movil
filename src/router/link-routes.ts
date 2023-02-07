export interface RouterLink {
    path: string;
    name: string;
    title: string;
}

export const routeLinks: RouterLink[] = [
    { path: "/", name: "home", title: "Inicio" },
    { path: "/about", name: "about", title: "Sobre" },
    { path: "/signin", name: "signin", title: "SignIn" },
    { path: "/signup", name: "signup", title: "SignUp" },
    { path: "/movimientos", name: "movimientos", title: "Movimientos" },
    { path: "/modalmovimientos", name: "modalmovimientos", title: "modalmovimientos" },
    { path: "/editarperfil", name: "editarperfil", title: "editarperfil" },
    { path: "/characters", name: "characters", title: "Personajes" },
];
