<template>
    <img :src="'img/icons/'+ type + '.png'" :width="width" :alt="type">
</template>

<script>
export default {
    name: "ResourceIcon",

    props: {
        type: {},
        width: {
            default: 26,
        }
    },
}
</script>
