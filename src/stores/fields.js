import {defineStore} from "pinia"
import {ref} from "vue"
import {storage} from "@extend-chrome/storage"
import {executeOnActiveTab, waitPageLoad} from "@/composables/app"
import Field from "@/elements/Field"
import {pages} from "@/composables/page"

export const useFieldsStore = defineStore('fields', {
    state: () => ({
        fields: ref([]),
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
        async fetch(redirectIfNeeded) {
            if (redirectIfNeeded) {
                await pages.fields.go()
                await waitPageLoad()
            }

            const data = await executeOnActiveTab(async () => {
                let result = []

                const Resource = $th.Resource

                document.querySelectorAll('#resourceFieldContainer .level').forEach((item, i) => {
                    let resType = Resource.Crop

                    item.classList.forEach(name => {
                        if (name.match(/^gid/)) {
                            const res = +name.replace('gid', '')
                            resType = [Resource.Wood, Resource.Clay, Resource.Iron, Resource.Crop][res - 1]
                        }
                    })

                    result.push({
                        place: i,
                        level: item.querySelector('.labelLayer')?.innerText,
                        link: item.getAttribute('href'),
                        construction: item.classList.contains('underConstruction'),
                        type: resType,
                    })
                })

                return result
            })

            if (! data || !data.length)
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