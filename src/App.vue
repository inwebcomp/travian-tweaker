<template>
    <Suspense>
        <template #default>
            <div>
                <navigation/>
                <router-view/>
            </div>
        </template>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>

<script>
import Navigation from "@/components/Navigation"
import {useAppStore} from "@/stores/app"

export default {
    components: {Navigation},
}
</script>