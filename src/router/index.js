import {createRouter, createWebHashHistory} from 'vue-router'
import Buildings from "@/Views/Buildings"
import Fields from "@/Views/Fields"
import Movements from "@/Views/Movements"

const routes = [
    {
        path: '/fields',
        name: 'fields',
        component: Fields,
    },
    {
        path: '/buildings',
        name: 'buildings',
        component: Buildings,
    },
    {
        path: '/',
        name: 'movements',
        component: Movements,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
