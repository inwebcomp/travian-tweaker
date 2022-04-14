<template>
    <div class="bg-gray-100 p-2">
        <div></div>
        <div class="grid grid-cols-3 gap-2">
            <building class="cursor-pointer hover:bg-green-50"
                      @click.native="queue(building)"
                      v-for="building in buildings" :key="building.place"
                      :building="building"/>
        </div>
    </div>
</template>

<script>
import {computed, onBeforeMount} from "vue"
import {useBuildingsStore} from "@/stores/buildings"
import Building from "@/components/Building"
import {useQueueStore} from "@/stores/queue"
import {waitPageLoad} from "@/composables/app"
import {useActionsStore} from "@/stores/actions"
import Queueable from "@/elements/Queueable"
import BuildingElement from "@/elements/Building"

export default {
    name: "Buildings",
    components: {Building},
    setup() {
        const buildingsStore = useBuildingsStore()
        const queueStore = useQueueStore()

        const buildings = computed(() => buildingsStore.buildings)

        const fetch = () => {
            buildingsStore.fetch(true)
        }

        onBeforeMount(async () => {
            await fetch()
        })

        const build = async (building) => {
            await building.goAndBuild()
            await waitPageLoad()
            await useActionsStore().fetch()
        }

        const queue = async (building) => {
            queueStore.add(Queueable.building(new BuildingElement(building)))
        }

        return {
            buildings,
            fetch,
            build,
            queue,
        }
    },
}
</script>