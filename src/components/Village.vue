<template>
    <div class="bg-white rounded shadow py-2 px-4 flex items-center">
        <div>{{ village.title }}</div>
        <div class="font-bold ml-2">({{ village.coordinates.x }} / {{ village.coordinates.y }})</div>
    </div>
</template>

<script>
export default {
    name: "Village",

    props: {
        village: {},
    },
}
</script>
