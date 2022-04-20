<template>
    <div class="bg-gray-100 p-2">
        <div class="flex items-center justify-between">
            <div class="text-base font-bold">Movements</div>
            <app-button @click.native="fetch">
                <i class="fa-solid fa-refresh mr-2"></i>
                Fetch
            </app-button>
        </div>

        <div class="flex items-center justify-between bg-white rounded my-2 p-2">
            <div>
                {{ ('Comes to village') }}
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
            <div @click="activeTab = 'returns'" class="block flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer bg-white rounded" :class="{'font-bold': activeTab == 'returns'}">
                Returns
                <span class="ml-1 rounded-full bg-gray-200 p-0.5 px-2" v-if="returns.length">{{ returns.length }}</span>
            </div>
            <div @click="activeTab = 'attacks'" v-if="attacks.length" class="block flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer bg-white rounded" :class="{'font-bold': activeTab == 'attacks'}">
                Attacks
                <span class="ml-1 rounded-full bg-gray-200 p-0.5 px-2" v-if="returns.length">{{ attacks.length }}</span>
            </div>
            <div @click="activeTab = 'dangers'" v-if="dangers.length" class="block font-bold flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer bg-white rounded" :class="{'font-bold': activeTab == 'dangers', 'text-red-600': dangers.length}">
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
import {computed, onBeforeMount, ref} from "vue"
import Field from "@/components/Field"
import AppButton from "@/components/AppButton"
import {useMovementsStore} from "@/stores/movements"
import Movement from "@/components/Movement"
import Stock from "@/elements/Stock"
import ResourceIcon from "@/components/ResourceIcon"
import {alert} from "@/composables/notifications"

export default {
    name: "Movements",

    components: {ResourceIcon, Movement, AppButton, Field},

    setup() {
        const movementsStore = useMovementsStore()

        const activeTab = ref('returns')

        const returns = computed(() => movementsStore.returns())
        const attacks = computed(() => movementsStore.attacks())
        const dangers = computed(() => movementsStore.dangers())

        onBeforeMount(async () => {
            await movementsStore.fetch(true)
        })

        const fetch = () => {
          alert({title: 'Got new messages', message: 'Ort not'})
            movementsStore.fetch()
        }

        const totalResourcesCome = computed(() => {
            let stock = new Stock()

            returns.value.forEach(movement => {
                stock.add(movement.resources)
            })

            return stock.resources
        })

        return {
            activeTab,
            returns,
            attacks,
            dangers,
            fetch,
            totalResourcesCome,
        }
    },
}
</script>