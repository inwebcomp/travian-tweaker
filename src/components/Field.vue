<template>
    <div class="bg-white rounded shadow h-9 select-none px-2 flex items-center relative">
        <div class="w-[26px] min-w-[26px] mr-1.5">
            <resource-icon :type="field.type" class="mx-auto"/>
        </div>
        <div class="mx-auto leading-none">
            <div class="font-bold mx-auto">{{ +field.level }}</div>
            <div class="absolute top-0.5 right-1 text-green-600" v-if="field.construction">
                <i class="fa-solid fa-circle-small"></i>
            </div>
        </div>
    </div>
</template>

<script>
import ResourceIcon from "@/components/ResourceIcon"
export default {
    name: "Field",
    components: {ResourceIcon},
    props: {
        field: {},
    },
}
</script>
