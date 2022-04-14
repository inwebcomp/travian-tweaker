<template>
    <div class="flex border-b-2 gap-2">
        <div v-for="(item, $i) in queue" :key="$i" class="flex-1 bg-white rounded py-1 px-2 cursor-pointer">
            <div class="flex items-center justify-center mb-1">
                <div class="mr-1.5">
                    <resource-icon v-if="item.type == 'resources'" type="resources"/>
                </div>
                <div class="leading-none text-right">
                    <div class="font-bold mb-0.5">
                        {{ item.object.title }}<span class="ml-1">({{ item.level }})</span>
                    </div>
                    <div class="">
                        01:24:38
                    </div>
                </div>
            </div>
            <div v-if="item.timeBuild" class="mr-1 h-1 w-full relative rounded overflow-hidden bg-gray-300"
                 :title="'Progress: ' + Math.round(100 / item.timeBuild * item.timeWent) + '%'">
                <div class="h-1 absolute bottom-0 left-0"
                     :class="item.timeWent > item.timeBuild * .9 ? 'bg-red-400' : 'bg-green-400'"
                     :style="'width: ' + (100 / item.timeBuild * item.timeWent) + '%'"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
import {computed, onBeforeMount, onDeactivated, onMounted} from "vue"
import {useStockStore} from "@/stores/stock"

export default {
    name: 'Queue',
    components: {ResourceIcon},
    async setup() {
        let interval

        const queue = [
            {
                type: 'resources',
                object: {
                    title: 'Farm',
                },
                level: 2,
                resources: {
                    wood: 100,
                    clay: 120,
                    iron: 60,
                    crop: 20,
                },
                timeStart: (new Date()).getUTCDate() - 60,
                timeBuild: 200,
                timeWent: 60,
                timeEnd: (new Date()).getUTCDate() - 20 + 200
            }
        ]

        onBeforeMount(async () => {

        })

        onMounted(() => {
            setInterval(() => {

            }, 1000)
        })

        onDeactivated(() => {
            if (interval)
                clearInterval(interval)
        })

        return {
            queue,
        }
    },
}
</script>