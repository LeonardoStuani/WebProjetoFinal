import { Alert, Button, Grid, LinearProgress, Typography } from '@mui/material'
import _ from 'lodash'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Customer } from '../../app/models/customer'
import UpdateCustomerCard from './UpdateCustomerCard'
import AddWorkOrderCard from '../workOrders/AddWorkOrderCard'
import WorkOrdersCard from '../workOrders/WorkOrdersCard'

const CustomerPage = () => {
  const [customerDetails, setCustomerDetails] = useState<Customer | null>()
  const [loading, setLoading] = useState(true)
  let navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getCustomer()
  }, [id])

  const getCustomer = async () => {
    const response = await axios.get(`http://localhost:5000/customers/${id}`)
    setCustomerDetails(response.data)
    setLoading(false)
  }

  const handleDeleteCustomer = async () => {
    await axios.delete(`http://localhost:5000/customers/${id}`)
    navigate('/')
  }

  return (
    <Fragment>
      {loading && <LinearProgress />}
      {!loading && _.isEmpty(customerDetails) && (
        <Alert severity='error'>404 - Cliente não Existe</Alert>
      )}
      {!loading && !_.isEmpty(customerDetails) && (
        <Fragment>
          <Grid container sx={{ marginBottom: 2 }} spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h4'>{customerDetails?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='error'
                size='small'
                onClick={handleDeleteCustomer}
              >
                Delete Cliente
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <UpdateCustomerCard
                customer={customerDetails}
                getCustomer={getCustomer}
              />
            </Grid>
            <Grid item xs={6}>
              <AddWorkOrderCard
                customer={customerDetails}
                getCustomer={getCustomer}
              />
            </Grid>
            <Grid item xs={12}>
              <WorkOrdersCard workOrders={customerDetails?.work_orders} />
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Fragment>
  )
}

export default CustomerPage
