<template>
    <div class="flex-1 bg-white rounded py-1 px-2 relative select-none whitespace-nowrap cursor-default">
        <div class="flex items-center justify-between">
            <div class="text-lg w-12">
                <i class="fa-solid fa-arrow-right-to-line text-green-500" v-if="movement.direction == 'out' && movement.type == MovementType.Attack"></i>
                <i class="fa-solid fa-arrow-right-to-line text-green-500" v-if="movement.direction == 'out' && movement.type == MovementType.Support"></i>
                <i class="fa-solid fa-arrow-left-from-line text-green-500" v-if="movement.direction == 'in' && movement.type == MovementType.Return"></i>
                <i class="fa-solid fa-swords text-red-500" v-if="movement.direction == 'in' && movement.type == MovementType.Attack"></i>
            </div>

            <div class="leading-none text-left mr-auto">
                <div class="mb-0.5">
                    {{ movement.title }}
                </div>
                <div class="text-gray-700 font-bold flex items-center" v-if="movement.arrive !== undefined">
                    <timer :time="movement.arrive" till formatted />
                    <span class="mx-1 font-normal">{{ ('at') }}</span>
                    <timer :time="movement.arrive" absolute formatted static/>
                </div>
            </div>

            <div v-for="(resource, type) in movement.resources" :key="type" class="flex items-center">
                <div class="w-[20px] min-w-[20px] mr-1">
                    <resource-icon :type="type"/>
                </div>
                <div class="leading-none text-right mr-2">
                    <div class="">{{ resource }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
import Timer from "@/components/Timer"
import {MovementType} from "@/composables/enums"

export default {
    name: 'Movement',
    components: {Timer, ResourceIcon},

    props: {
        movement: {},
    },

    setup(props) {
        return {
            MovementType,
        }
    },
}
</script>