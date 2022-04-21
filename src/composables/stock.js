import {useStockStore} from "@/stores/stock"
import Stock from "@/elements/Stock"

export const currentStock = () => {
    const store = useStockStore()
    const resources = store.resources ? Object.fromEntries(store.resources.map(r => [r.type, r.amount])) : {}
    return new Stock(resources)
}