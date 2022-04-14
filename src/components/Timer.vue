<template>
    <div>{{ timeToShow }}</div>
</template>

<script>
import moment from "moment"
import {computed, onBeforeMount, onDeactivated, onMounted, ref} from "vue"

export default {
    name: "Timer",

    props: {
        time: Number,
        formatted: Boolean,
        static: Boolean,
    },

    emits: ['end'],

    setup(props, {emit}) {
        let interval

        const passed = ref(0)

        onMounted(() => {
            if (props.static)
                return

            let start = (new Date()).getTime()

            if (interval)
                clearInterval(interval)

            interval = setInterval(() => {
                passed.value = (new Date()).getTime() - start

                if (props.time - passed.value < 0) {
                    emit('end')
                }
            }, 1000)
        })

        onDeactivated(() => {
            if (interval)
                clearInterval(interval)
        })

        const timeToShow = computed(() => {
            let time = props.time - passed.value

            if (time < 0)
                return props.formatted ? '00:00:00?' : 0 + '?'

            if (props.formatted)
                return moment.utc(time).format('HH:mm:ss')

            return time
        })

        return {
            timeToShow,
        }
    },
}
</script>

