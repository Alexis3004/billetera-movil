import SignIn from "@/shared/pages/SignIn.vue";
import SignUp from "@/shared/pages/SignUp.vue";
import Movimientos from "@/shared/pages/MovimientosUser.vue";
import EditarPerfil from "@/shared/pages/EditarPerfil.vue";
import ModalTransferir from "@/shared/components/ModalTransferir.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { validateUser } from "@/helpers";

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        // Public
        { path: "/", name: "home", component: HomePage },
        { path: "/signin", name: "signin", component: SignIn },
        { path: "/signup", name: "signup", component: SignUp },
        { path: "/movimientos", name: "movimientos", component: Movimientos },
        { path: "/modalTransferir", name: "modal-transferir", component: ModalTransferir },
        { path: "/editarPerfil", name: "editarPerfil", component: EditarPerfil },

        // Default
        { path: "/:pathMatch(.*)*", redirect: { name: "home" } },
    ],
});

//path: '/characters',
// router.addRoute( characterRoute )

router.beforeEach(async (to, from) => {
    const isAuthenticated = validateUser()
    if ( to.name !== 'signin' && to.name !== 'signup' &&  !isAuthenticated) {
        // redirect the user to the login page
        return { name: 'signin' }
    }

    if (isAuthenticated && (to.name == 'signin' || to.name == 'signup')) {
        return { name: 'home' }
    }
})

export default router;
