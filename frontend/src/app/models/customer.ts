import { WorkOrder } from './workOrder'

export interface Customer {
  id: number
  name: string
  cpf: number
  phone: number
  email: string
  mothers_name: string
  city: string
  address: string
  sex: string
  work_orders: WorkOrder[]
}
