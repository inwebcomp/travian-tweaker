<template>
    <div class="bg-gray-100 p-2">
        <div class="flex items-center justify-between">
            <div class="text-base font-bold">Fields</div>
            <app-button @click.native="fetch">Fetch</app-button>
        </div>

        <div class="flex flex-col gap-2 mt-2" v-if="fields">
            <div v-for="(group, $i) in fields" :key="$i" class="grid grid-cols-6 gap-2">
                <template v-if="group && group.length">
                    <field v-for="field in group" :key="field.place" :field="field"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, onBeforeMount} from "vue"
import {useFieldsStore} from "@/stores/fields"
import Field from "@/components/Field"
import AppButton from "@/components/AppButton"

export default {
    name: "Fields",
    components: {AppButton, Field},
    setup() {
        const fieldsStore = useFieldsStore()

        const fields = computed(() => fieldsStore.fieldsGrouped)

        onBeforeMount(async () => {
            await fieldsStore.init()
        })

        const fetch = () => fieldsStore.fetch()

        return {
            fields,
            fetch,
        }
    },
}
</script>