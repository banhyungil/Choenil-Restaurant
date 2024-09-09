import { addDays, format } from 'date-fns'
import useApi from './useApi'
import qs from 'qs'

export type OrderCURes = Omit<Order, 'payments' | 'store'>
interface Additional {
    payType?: PaymentEntity['payType'][]
    payAt?: PaymentEntity['payAt']
    storeName?: StoreEntity['name']
}

export default function useApiOrder() {
    const api = useApi()
    const prefix = '/order'

    type OrderWhereInfo = WhereInfo<MyOrderEntity & Additional>
    async function selectList(whereInfo: OrderWhereInfo): Promise<{ orders: Order[]; totalCnt: number }>
    async function selectList(): Promise<Order[]>
    async function selectList(whereInfo?: OrderWhereInfo) {
        const queryStr = qs.stringify(whereInfo)
        const resData = (await api.get(`${prefix}?${queryStr}`)).data as { orders: Order[]; totalCnt: number }

        return whereInfo ? resData : resData.orders
    }

    /**
     * 정산 목록 조회
     * 당일 결제 + 당일 미수
     */
    async function selectListAccount(dateRange: [Date, Date]) {
        const formatted = dateRange.map((date) => format(date, 'yyyy-MM-dd'))
        const resData = (await api.post(`${prefix}/account`, { dateRange: formatted })).data as Order[]

        return resData
    }

    const select = async (seq: number) => {
        const res = await api.get(`${prefix}/${seq}`)

        return res.data as Order
    }

    const create = async (order: MyOrderEntityCreation, orderMenues: OrderMenuEntityCreation[]) => {
        const res = await api.post(prefix, {
            order,
            orderMenues,
        })
        return res.data as OrderCURes
    }

    const update = async (order: MyOrderEntity, orderMenues: OrderMenuEntityCreation[] = []) => {
        const res = await api.patch(`${prefix}/${order.seq!}`, {
            order,
            orderMenues,
        })
        return res.data as OrderCURes
    }

    const remove = async (seq: number) => {
        return api.delete(`${prefix}/${seq}`)
    }

    return { selectList, selectListAccount, select, create, update, remove }
}
