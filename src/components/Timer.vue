<template>
    <div>{{ timeToShow }}</div>
</template>

<script>
import moment from "moment"
import {computed, onBeforeMount, onDeactivated, onMounted, ref, watch} from "vue"

export default {
    name: "Timer",

    props: {
        time: Number,
        formatted: Boolean,
        static: Boolean,
        till: Boolean,
        absolute: Boolean,
    },

    emits: ['end'],

    setup(props, {emit}) {
        let interval

        const timeRef = computed(() => {
            if (! props.till)
                return props.time

            return props.time - new Date().valueOf()
        })

        const passed = ref(0)

        let start = new Date().valueOf()

        onMounted(() => {
            if (props.static)
                return

            start = new Date().valueOf()

            if (interval)
                clearInterval(interval)

            interval = setInterval(() => {
                passed.value = new Date().valueOf() - start

                if (timeInt.value <= 0) {
                    emit('end')
                }
            }, 1000)
        })

        watch(timeRef, (current, old) => {
            // console.log('change time', current, old)
            start = new Date().valueOf()
        })

        onDeactivated(() => {
            if (interval)
                clearInterval(interval)
        })

        const timeInt = computed(() => {
            let time = timeRef.value - passed.value

            if (time < 0)
                return 0

            return time
        })

        const timeToShow = computed(() => {
            if (props.absolute) {
                return moment(timeRef.value).format('HH:mm:ss')
            }

            let time = timeInt.value

            if (time < 0)
                return props.formatted ? '00:00:00?' : 0 + '?'

            if (props.formatted) {
                return moment.utc(time).format('HH:mm:ss')
            }

            return time
        })

        return {
            timeToShow,
        }
    },
}
</script>

