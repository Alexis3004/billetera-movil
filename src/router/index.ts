const AboutPage = () => import("@/shared/pages/AboutPage.vue");
// import AboutPage from "@/shared/pages/AboutPage.vue";
import SignIn from "@/shared/pages/SignIn.vue";
import SignUp from "@/shared/pages/SignUp.vue";
import Movimientos from "@/shared/pages/MovimientosUser.vue";
import EditarPerfil from "@/shared/pages/EditarPerfil.vue";
import ModalTransferir from "@/shared/components/ModalTransferir.vue";
import HomePage from "@/shared/pages/HomePage.vue";
// const CharacterLayout = () => import("@/characters/layout/CharacterLayout.vue");
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { characterRoute } from '../characters/router/index';

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        // Public
        { path: "/", name: "home", component: HomePage },
        { path: "/about", name: "about", component: AboutPage },
        { path: "/signin", name: "signin", component: SignIn },
        { path: "/signup", name: "signup", component: SignUp },
        { path: "/movimientos", name: "movimientos", component: Movimientos },
        { path: "/modalTransferir", name: "modalTransferir", component: ModalTransferir },
        { path: "/editarPerfil", name: "editarPerfil", component: EditarPerfil },

        // Characters
        //path: '/characters',
        characterRoute,
        // {
        //     ...characterRoute,
        //     path: '/characters',
        // },
        // { path: "/characters", name: "characters", component: CharacterLayout },

        // Default
        { path: "/:pathMatch(.*)*", redirect: () => ({ name: "home" }) },
    ],
});

//path: '/characters',
// router.addRoute( characterRoute )

export default router;
