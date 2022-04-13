import {createRouter, createWebHashHistory} from 'vue-router'
import Buildings from "@/Views/Buildings"
import Fields from "@/Views/Fields"

const routes = [
    {
        path: '/',
        name: 'fields',
        component: Fields,
    },
    {
        path: '/buildings',
        name: 'buildings',
        component: Buildings,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
