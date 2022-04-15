<template>
    <button class="select-none cursor-pointer whitespace-nowrap p-1.5 px-4 font-bold bg-blue-300 hover:bg-blue-400 rounded text-blue-900">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "AppButton",
}
</script>
