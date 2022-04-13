<template>
    <div class="bg-gray-100 p-2">
        <div></div>
        <div class="flex flex-col gap-2">
            <building v-for="building in buildings" :key="building.place" :building="building"/>
        </div>
    </div>
</template>

<script>
import {computed, onBeforeMount} from "vue"
import {useBuildingsStore} from "@/stores/buildings"
import Building from "@/components/Building"

export default {
    name: "Buildings",
    components: {Building},
    setup() {
        const buildingsStore = useBuildingsStore()

        const buildings = computed(() => buildingsStore.buildings)

        onBeforeMount(async () => {
            await buildingsStore.init()
        })

        return {
            buildings,
        }
    },
}
</script>