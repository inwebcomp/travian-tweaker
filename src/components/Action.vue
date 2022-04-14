<template>
    <div class="flex-1 bg-white rounded py-1 px-2 select-none whitespace-nowrap"
         :class="{'cursor-pointer hover:bg-red-100': cancelable, 'cursor-default': !cancelable}" @click="cancelable ? $emit('cancel') : null">
        <div class="flex items-center justify-center">
            <div class="mr-1.5">
                <resource-icon v-if="action.type == 'resource'" type="resources"/>
                <i class="fa-duotone fa-hammer text-base" v-if="action.type == 'building'"/>
            </div>
            <div class="leading-none text-left">
                <div class="font-bold mb-0.5">
                    {{ action.object.title }}<span class="ml-1">({{ action.level }})</span>
                    <span v-if="action.object.note !== null"
                          class="text-gray-500 ml-0.5 text-[.6rem]">{{ action.object.note }}</span>
                </div>
                <div class="" v-if="time !== undefined">
                    <timer @end="$emit('finish')" :time="time * 1000" formatted :static="staticTime"/>
                </div>
            </div>
        </div>
<!--        <div v-if="action.time && action.timeBuild"-->
<!--             class="mt-1 mr-1 h-1 w-full relative rounded overflow-hidden bg-gray-300"-->
<!--             :title="'Progress: ' + Math.round(100 / action.timeBuild * action.timeWent) + '%'">-->
<!--            <div class="h-1 absolute bottom-0 left-0"-->
<!--                 :class="action.timeWent > action.timeBuild * .9 ? 'bg-red-400' : 'bg-green-400'"-->
<!--                 :style="'width: ' + (100 / action.timeBuild * action.timeWent) + '%'"-->
<!--            ></div>-->
<!--        </div>-->
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
import Timer from "@/components/Timer"
import {useBuildingsStore} from "@/stores/buildings"
import {computed} from "vue"
import {ActionType} from "@/composables/enums"

export default {
    name: 'Action',
    components: {Timer, ResourceIcon},

    emits: ['finish', 'cancel'],

    props: {
        action: {},
        staticTime: Boolean,
        cancelable: Boolean,
    },

    setup(props) {
        const buildingStore = useBuildingsStore()

        const isBuilding = computed(() => props.action.type == ActionType.Building && props.action.object.gid)

        const info = computed(() => {
            if (isBuilding.value) {
                return buildingStore.info(props.action.object, props.action.level)
            }
        })

        const time = computed(() => {
            if (props.action.time === undefined)
                return info.value?.time

            return props.action.time
        })

        return {
            isBuilding,
            info,
            time,
        }
    },
}
</script>