import {useAppStore} from "@/stores/app"

export const serverSpeed = () => {
    return useAppStore().speed
}