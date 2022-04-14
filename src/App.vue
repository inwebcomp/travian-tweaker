<template>
    <Suspense>
        <template #default>
            <div class="w-[600px]">
                <navigation/>
                <storage/>
                <queue/>
                <router-view/>
            </div>
        </template>
        <template #fallback>
            <div class="p-4">
                Loading...
            </div>
        </template>
    </Suspense>
</template>

<script>
import Navigation from "@/components/Navigation"
import {useAppStore} from "@/stores/app"
import Storage from "@/components/Storage"
import Queue from "@/components/Queue"

export default {
    components: {Queue, Storage, Navigation},
}
</script>