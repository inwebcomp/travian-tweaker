<template>
    <div class="bg-gray-100 p-2">
        <div class="flex items-center justify-between">
            <div class="text-base font-bold">Fields</div>
            <app-button @click.native="fetch">Fetch</app-button>
        </div>

        <div class="flex flex-col gap-2 mt-2" v-if="fields">
            <div v-for="(group, $i) in fields" :key="$i" class="grid grid-cols-6 gap-2">
                <template v-if="group && group.length">
                    <field class="cursor-pointer hover:bg-green-50"
                           @click.native="queue(field)"
                           v-for="field in group" :key="field.place"
                           :field="field"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, onBeforeMount, onMounted} from "vue"
import {useFieldsStore} from "@/stores/fields"
import Field from "@/components/Field"
import FieldElement from "@/elements/Field"
import AppButton from "@/components/AppButton"
import {activeTab, executeOnActiveTab, insertScript, waitPageLoad} from "@/composables/app"
import {wait} from "@/composables/page"
import {useActionsStore} from "@/stores/actions"
import {useQueueStore} from "@/stores/queue"
import Queueable from "@/elements/Queueable"

export default {
    name: "Fields",
    components: {AppButton, Field},
    setup() {
        const fieldsStore = useFieldsStore()
        const queueStore = useQueueStore()

        const fields = computed(() => fieldsStore.fieldsGrouped)

        onBeforeMount(async () => {
            await fieldsStore.fetch(true)
        })

        const fetch = () => {
            fieldsStore.fetch()
        }

        const build = async (field) => {
            await field.goAndBuild()
            await waitPageLoad()
            await useActionsStore().fetch()
        }

        const queue = async (field) => {
            queueStore.add(Queueable.field(field))
        }

        return {
            fields,
            fetch,
            build,
            queue,
        }
    },
}
</script>