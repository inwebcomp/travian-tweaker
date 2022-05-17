import {createRouter, createWebHashHistory} from 'vue-router'
import Index from "@/Views/Index"

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
