<template>
    <Suspense>
        <template #default>
            <div>
                <navigation/>
                <storage/>
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

export default {
    components: {Storage, Navigation},
}
</script>