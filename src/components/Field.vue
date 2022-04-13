<template>
    <div class="bg-white rounded shadow py-2 px-2 flex items-center">
        <div class="w-[26px] min-w-[26px] mr-1.5">
            <resource-icon :type="field.type" class="mx-auto"/>
        </div>
        <div class="font-bold mx-auto">{{ +field.level }}</div>
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
