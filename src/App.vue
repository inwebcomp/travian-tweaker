<template>
    <Suspense>
        <template #default>
            <navigation/>
<!--                <router-view/>-->
<!--            <div class="w-[280px] text-center flex items-center justify-center text-gray-500 text-lg py-8">-->
<!--                Soon-->
<!--            </div>-->
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