<template>
    <div class="p-4">
        Buildings
    </div>
</template>

<script>
import {onMounted} from "vue"
import {pages} from "@/composables/page"
import {executeOnActiveTab} from "@/composables/app"

export default {
    name: "Buildings",

    setup() {
        onMounted(() => {
            // executeOnActiveTab(() => {
            //     console.log(window.$th)
            //     // $th.pages.buildings.go()
            // })
        })
    },
}
</script>