import {useStockStore} from "@/stores/stock"
import Stock from "@/elements/Stock"

export const currentStock = () => {
    const resources = Object.fromEntries(useStockStore().resources.map(r => [r.type, r.amount]))
    return new Stock(resources)
}