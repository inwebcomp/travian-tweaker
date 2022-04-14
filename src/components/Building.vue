<template>
    <div class="bg-white rounded shadow select-none relative px-2 flex items-center">
        <div class="w-12 h-12 flex items-center justify-center overflow-hidden mr-2">
            <img v-if="building.place != 40" class="w-12 h-auto mx-auto" :class="{'-mt-3': building.place != 39}"
                 :src="building.image" :alt="building.title">
            <i class="fa-duotone fa-fort text-amber-900 text-lg" v-if="building.place == 40"></i>
        </div>

        <div class="">
            <div class="flex items-center leading-none">
                <div>{{ building.title }}</div>
                <div class="font-bold ml-2">{{ +building.level }}</div>
                <div class="absolute top-0.5 right-1 text-green-600" v-if="building.construction">
                    <i class="fa-solid fa-circle-small"></i>
                </div>
            </div>
            <div v-if="info" class="text-gray-500">
                {{ info?.param }}
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "vue"
import {useBuildingsStore} from "@/stores/buildings"

export default {
    name: "Building",

    props: {
        building: {},
    },

    setup(props) {
        const buildingStore = useBuildingsStore()

        const info = computed(() => buildingStore.info(props.building, true))

        return {
            info,
        }
    },
}
</script>
