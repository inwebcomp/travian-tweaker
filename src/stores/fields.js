import {defineStore} from "pinia"
import {reactive, ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab} from "@/composables/app"
import Field from "@/elements/Field"
import Resource from "@/elements/Resource"

export const useFieldsStore = defineStore('fields', {
    state: () => ({
        fields: ref([
            new Field({
                type: 'wood',
                level: 2,
            })
        ]),
    }),

    getters: {
        fieldsGrouped() {
            let result = {}

            this.fields.value?.forEach(item => {
                if (!result[item.type])
                    result[item.type] = []

                result[item.type].push(new Field(item))
            })

            return result
        },
    },

    actions: {
        async fetch() {
            const data = await executeOnActiveTab(async () => {
                let result = []

                const resource = $th.resource

                document.querySelectorAll('#resourceFieldContainer .level').forEach((item, i) => {
                    let resType = resource.Crop

                    item.classList.forEach(name => {
                        if (name.match(/^gid/)) {
                            const res = +name.replace('gid', '')
                            resType = [resource.Wood, resource.Clay, resource.Iron, resource.Crop][res - 1]
                        }
                    })

                    result.push({
                        place: i,
                        level: item.querySelector('.labelLayer')?.innerText,
                        link: item.getAttribute('href'),
                        type: resType,
                    })
                })

                return result
            })

            if (! data)
                return

            let result = data ? data.map((item) => new Field(item)) : []

            result.sort((a, b) => a.order < b.order ? -1 : 1)

            this.fields.value = result

            return await storage.local.set({fields: result})
        },

        async init() {
            let data = await storage.local.get({fields: []})

            if (data.fields) {
                this.fields.value = data.fields
            } else {
                return await this.fetch()
            }

            return data
        }
    },
})