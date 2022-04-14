<template>
    <div class="bg-gray-100 p-2">
        <div class="flex items-center justify-between">
            <div class="text-base font-bold">Fields</div>
            <app-button @click.native="fetch">Fetch</app-button>
        </div>

        <div class="flex flex-col gap-2 mt-2" v-if="fields">
            <div v-for="(group, $i) in fields" :key="$i" class="grid grid-cols-6 gap-2">
                <template v-if="group && group.length">
                    <field class="cursor-pointer" @click.native="build(field)" v-for="field in group" :key="field.place" :field="field"/>
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
import {activeTab, executeOnActiveTab, insertScript} from "@/composables/app"
import {wait} from "@/composables/page"

export default {
    name: "Fields",
    components: {AppButton, Field},
    setup() {
        const fieldsStore = useFieldsStore()

        const fields = computed(() => fieldsStore.fieldsGrouped)

        onBeforeMount(async () => {
            await fieldsStore.fetch()
        })

        const fetch = () => {
            fieldsStore.fetch()
        }

        onMounted(() => {




            window.addEventListener("message", (data) => {
                console.log('AAAAAAAAA')
            }, false);
        })

        const build = async (field) => {
            await field.go({delay: 0})
            await wait(300)
            await insertScript(await activeTab())

            await (new Promise((resolve) => {
                chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                    if (message === 'document-loaded') {
                        sendResponse('some new data');
                        resolve()
                    }
                });
            }))

            console.log('After dom load')

            await field.build()
        }

        return {
            fields,
            fetch,
            build,
        }
    },
}
</script>