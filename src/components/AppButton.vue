<template>
    <button class="select-none cursor-pointer p-1.5 px-4 font-bold bg-blue-300 hover:bg-blue-400 rounded text-blue-900">
        <i class="fa-solid fa-refresh mr-2"></i>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "AppButton",
}
</script>
