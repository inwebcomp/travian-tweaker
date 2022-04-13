<template>
    <router-link :to="to || ''" class="block flex-1 text-center px-4 py-2 hover:bg-gray-200 cursor-pointer" :class="{'bg-blue-400 text-white': active}">
        <slot></slot>
    </router-link>
</template>

<script>
export default {
    name: 'Tab',

    props: {
        to: {},
    },

    computed: {
        active() {
            return false
        }
    }
}
</script>