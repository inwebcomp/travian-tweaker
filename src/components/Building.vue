<template>
    <div class="bg-white rounded shadow py-2 px-4 flex items-center">
        <div>{{ building.title }}</div>
        <div class="font-bold ml-2">({{ building.level }})</div>
    </div>
</template>

<script>
export default {
    name: "Building",

    props: {
        building: {},
    },
}
</script>
