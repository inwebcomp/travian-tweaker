<template>
    <div class="flex border-b-2 gap-2" v-if="resources.length">
        <div v-for="(resource) in resources" :key="resource.type"
             class="bg-white rounded py-1.5 px-2 flex items-center">
            <div v-if="resource.limit" class="mr-1 w-1 h-6 relative rounded overflow-hidden bg-gray-300"
            :title="'Limit: ' + resource.limit + ' | Filled: ' + Math.round(100 / resource.limit * resource.amount) + '%'">
                <div class="w-1 absolute bottom-0 left-0"
                     :class="resource.amount > resource.limit * .9 ? 'bg-red-400' : 'bg-green-400'"
                     :style="'height: ' + (100 / resource.limit * resource.amount) + '%'"
                ></div>
            </div>
            <div class="w-[26px] min-w-[26px] mr-1.5">
                <resource-icon :type="resource.type"/>
            </div>
            <div class="leading-none text-right">
                <div class="font-bold">{{ +resource.amount }}</div>
                <div class="">{{ resource.produce <= 0 ? resource.produce : '+' + resource.produce }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
import {computed, onBeforeMount} from "vue"
import {useStockStore} from "@/stores/stock"

export default {
    name: 'Storage',
    components: {ResourceIcon},
    async setup() {
        const stockStore = useStockStore()

        const resources = computed(() => stockStore.resources)

        onBeforeMount(async () => {
            await stockStore.fetch()
            await stockStore.init()
        })

        const fetch = () => stockStore.fetch()

        return {
            resources,
            fetch,
        }
    },
}
</script>