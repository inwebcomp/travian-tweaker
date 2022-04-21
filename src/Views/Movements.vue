<template>
    <div class="bg-gray-100 p-2">
        <div class="flex items-center justify-between">
            <div class="text-base font-bold">Movements</div>
            <app-button @click.native="fetch(true)">
                <i class="fa-solid fa-refresh mr-2"></i>
                Fetch<span v-if="enabled" class="ml-1">({{ proceedTimer < 0 ? 0 : proceedTimer }})</span>
            </app-button>
        </div>

        <div class="flex items-center justify-between bg-white rounded my-2 p-2">
            <div>
                <div>{{ ('Comes to village') }}</div>
                <timer :time="arriveInTime" till formatted/>
            </div>
            <div v-for="(resource, type) of totalResourcesCome" :key="type" class="flex items-center">
                <div class="w-[20px] min-w-[20px] mr-1">
                    <resource-icon :type="type"/>
                </div>
                <div class="leading-none text-right mr-2">
                    <div class="">{{ resource }}</div>
                </div>
            </div>
        </div>

        <div class="flex items-center mb-2 gap-2">
            <div @click="activeTab = 'returns'"
                 class="block flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer bg-white rounded"
                 :class="{'font-bold': activeTab == 'returns'}">
                Returns
                <span class="ml-1 rounded-full bg-gray-200 p-0.5 px-2" v-if="returns.length">{{ returns.length }}</span>
            </div>
            <div @click="activeTab = 'attacks'" v-if="attacks.length"
                 class="block flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer bg-white rounded"
                 :class="{'font-bold': activeTab == 'attacks'}">
                Attacks
                <span class="ml-1 rounded-full bg-gray-200 p-0.5 px-2" v-if="returns.length">{{ attacks.length }}</span>
            </div>
            <div @click="activeTab = 'dangers'" v-if="dangers.length"
                 class="block font-bold flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer bg-white rounded"
                 :class="{'font-bold': activeTab == 'dangers', 'text-red-600': dangers.length}">
                Danger
                <span class="ml-1 rounded-full bg-red-200 p-0.5 px-2" v-if="returns.length">{{ dangers.length }}</span>
            </div>
        </div>
        <div v-if="activeTab == 'returns'">
            <div class="grid grid-cols-1 gap-1">
                <movement v-for="(movement, $i) in returns" :key="$i"
                          :movement="movement"/>
            </div>
        </div>
        <div v-if="activeTab == 'attacks'">
            <div class="grid grid-cols-1 gap-1">
                <movement v-for="(movement, $i) in attacks" :key="$i"
                          :movement="movement"/>
            </div>
        </div>
        <div v-if="activeTab == 'dangers'">
            <div class="grid grid-cols-1 gap-1">
                <movement v-for="(movement, $i) in dangers" :key="$i"
                          :movement="movement"/>
            </div>
        </div>
    </div>
</template>

<script>
import {computed, onBeforeMount, ref, onDeactivated, onMounted} from "vue"
import Field from "@/components/Field"
import AppButton from "@/components/AppButton"
import {useMovementsStore} from "@/stores/movements"
import Movement from "@/components/Movement"
import Stock from "@/elements/Stock"
import ResourceIcon from "@/components/ResourceIcon"
import Timer from "@/components/Timer"
import {random} from "@/composables/helpers"
import {useAppStore} from "@/stores/app"

export default {
    name: "Movements",

    components: {Timer, ResourceIcon, Movement, AppButton, Field},

    setup() {
        const movementsStore = useMovementsStore()

        const enabled = computed(() => useAppStore().enabled)
        const activeTab = ref('returns')

        const returns = computed(() => movementsStore.returns())
        const attacks = computed(() => movementsStore.attacks())
        const dangers = computed(() => movementsStore.dangers())

        const arriveInTime = computed(() => {
            let max = new Date().valueOf()
            returns.value.forEach(movement => {
                if (!max || max < movement.arrive)
                    max = movement.arrive
            })
            return max
        })

        onBeforeMount(async () => {
            await movementsStore.fetch(true)
        })

        const fetch = (redirect) => {
            movementsStore.fetch(redirect)
        }

        const totalResourcesCome = computed(() => {
            let stock = new Stock()

            returns.value.forEach(movement => {
                stock.add(movement.resources)
            })

            return stock.resources
        })

        let interval

        let proceedInterval = () => random(20, 60)
        const proceedTimer = ref(proceedInterval())
        let acting = false

        onMounted(() => {
            if (interval)
                clearInterval(interval)

            interval = setInterval(async () => {
                if (!enabled.value || acting)
                    return

                if (proceedTimer.value <= 0) {
                    await fetch(true)

                    proceedTimer.value = proceedInterval()
                } else {
                    proceedTimer.value--
                }
            }, 1000)
        })

        onDeactivated(() => {
            if (interval)
                clearInterval(interval)
        })


        return {
            activeTab,
            returns,
            attacks,
            dangers,
            arriveInTime,
            proceedTimer,
            enabled,
            fetch,
            totalResourcesCome,
        }
    },
}
</script>