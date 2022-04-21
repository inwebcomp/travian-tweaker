<template>
    <div class="flex-1 bg-white rounded py-1 px-2 relative select-none whitespace-nowrap"
         :class="{'cursor-pointer hover:bg-red-100': cancelable, 'cursor-default': !cancelable}"
         @click="cancelable ? $emit('cancel') : null">
        <div class="flex items-center justify-center">
            <div class="mr-1.5">
                <resource-icon v-if="isField" :type="action.object.type"/>
                <i class="fa-duotone fa-hammer text-base" v-if="isBuilding"/>
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

            <div class="absolute top-0.5 left-0.5 text-[0.6rem]" v-if="showStatus">
                <i class="fa-solid fa-circle text-green-500" v-if="hasResources && hasQueueSpace"></i>
                <i class="fa-solid fa-circle text-blue-500" v-if="hasResources && !hasQueueSpace"></i>
                <i class="fa-solid fa-circle text-red-500" v-if="!hasResources && !hasQueueSpace"></i>
                <i class="fa-solid fa-circle text-red-500" v-if="!hasResources && hasQueueSpace"></i>
            </div>
        </div>
<!--        <div v-if="!staticTime && time && info && info.time"-->
<!--             class="mt-1 mr-1 h-1 w-full relative rounded overflow-hidden bg-gray-300"-->
<!--             :title="'Progress: ' + Math.round(100 / info.time * (info.time - time)) + '%'">-->
<!--            <div class="h-1 absolute bottom-0 left-0 bg-green-600"-->
<!--                 :style="'width: ' + (100 / info.time * (info.time - time)) + '%'"-->
<!--            ></div>-->
<!--        </div>-->
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
import Timer from "@/components/Timer"
import {useBuildingsStore} from "@/stores/buildings"
import {computed} from "vue"
import {ActionType, Nation} from "@/composables/enums"
import {useFieldsStore} from "@/stores/fields"
import Stock from "@/elements/Stock"
import {currentStock} from "@/composables/stock"
import {useActionsStore} from "@/stores/actions"
import {useAppStore} from "@/stores/app"
import app from "@/App"
import {hasBuildSlot} from "@/composables/queue"

export default {
    name: 'Action',
    components: {Timer, ResourceIcon},

    emits: ['finish', 'cancel'],

    props: {
        action: {},
        staticTime: Boolean,
        cancelable: Boolean,
        showStatus: Boolean,
    },

    setup(props) {
        const appStore = useAppStore()
        const actionsStore = useActionsStore()
        const buildingStore = useBuildingsStore()
        const fieldsStore = useFieldsStore()

        const isBuilding = computed(() => props.action.type == ActionType.Building && !props.action.object.type)
        const isField = computed(() => props.action.type == ActionType.Building && props.action.object.type)

        const info = computed(() => {
            if (isBuilding.value) {
                return buildingStore.info(props.action.object, props.action.level)
            } else if (isField.value) {
                return fieldsStore.info(props.action.object, props.action.level)
            }
        })

        const time = computed(() => {
            if (props.action.time === undefined)
                return info.value?.time

            return props.action.time
        })

        const hasResources = computed(() => {
            if (!info.value)
                return null

            const resources = info.value.resources

            return currentStock().hasEnough(resources)
        })

        const hasQueueSpace = computed(() => {
            return hasBuildSlot(props.action.object.type)
        })

        return {
            isBuilding,
            isField,
            hasResources,
            hasQueueSpace,
            info,
            time,
        }
    },
}
</script>