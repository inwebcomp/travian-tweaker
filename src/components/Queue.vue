<template>
    <div>
        <div class="flex border-b-2 gap-2 overflow-x-auto items-center" v-if="buildingActions.length">
            <action @finish="finish" :action="action" v-for="(action, $i) in buildingActions" :key="$i"/>
        </div>
        <div class="flex border-b-2 gap-2 overflow-x-auto items-center" v-if="queue.length">
            <app-button class="ml-1" @click.native="proceedQueue">
                <i class="fa-solid fa-play mr-2"></i>
                Proceed
            </app-button>

            <div class="flex items-center p-1" v-for="(action, $i) in queue" :key="$i">
                <i class="fa-solid fa-arrow-right mr-3" v-if="$i > 0"></i>
                <action @finish="finish" :action="action" show-status static-time cancelable @cancel="removeFromQueue(action)"/>
            </div>
        </div>
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
import {computed, onBeforeMount, onDeactivated, onMounted} from "vue"
import {useActionsStore} from "@/stores/actions"
import Action from "@/components/Action"
import {useQueueStore} from "@/stores/queue"
import {useFieldsStore} from "@/stores/fields"
import AppButton from "@/components/AppButton"
import {proceedBuilding} from "@/composables/queue"
import {wait} from "@/composables/page"
import {waitPageLoad} from "@/composables/app"
import {useBuildingsStore} from "@/stores/buildings"

export default {
    name: 'Queue',
    components: {AppButton, Action, ResourceIcon},
    async setup() {
        const fieldsStore = useFieldsStore()
        const buildingsStore = useBuildingsStore()
        const actionsStore = useActionsStore()
        const queueStore = useQueueStore()

        let interval

        const fetch = async () => {
            await fieldsStore.fetch()
            await buildingsStore.fetch()
            return await actionsStore.fetch()
        }

        const finish = async () => {
            await wait(1000)
            await waitPageLoad()
            return await fetch()
        }

        const removeFromQueue = (action) => {
            queueStore.remove(action)
        }

        await fetch()

        const buildingActions = computed(() => actionsStore.building)

        const queue = computed(queueStore.building)

        const proceedQueue = async () => {
            await proceedBuilding()
        }

        return {
            buildingActions,
            queue,

            finish,
            proceedQueue,
            removeFromQueue,
        }
    },
}
</script>