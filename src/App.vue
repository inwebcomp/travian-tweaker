<template>
    <Suspense>
        <template #default>
            <div style="min-width: 200px">
                <navigation/>
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

export default {
    components: {Navigation},
}
</script>