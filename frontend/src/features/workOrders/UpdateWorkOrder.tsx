import { LoadingButton } from '@mui/lab'
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  LinearProgress,
  Alert,
  Grid,
  Button,
} from '@mui/material'
import _ from 'lodash'
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkOrder } from '../../app/models/workOrder'

const UpdateWorkOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onTouched',
  })
  let navigate = useNavigate()
  const { id } = useParams()
  const [workOrder, setWorkOrder] = useState<WorkOrder>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWorkOrder()
  }, [])

  const getWorkOrder = async () => {
    const response = await axios.get(`http://localhost:5000/work-orders/${id}`)
    setWorkOrder(response.data)
    setLoading(false)
  }

  const submitForm = async (data: FieldValues) => {
    if (workOrder?.customer_id) {
      data = { ...data, customer_id: workOrder?.customer_id }
    }
    console.log(data)

    await axios.put(`http://localhost:5000/work-orders/${id}`, data)
    navigate(-1)
  }

  const handleDeleteWorkOrder = async () => {
    await axios.delete(`http://localhost:5000/work-orders/${id}`)
    navigate(-1)
  }

  return (
    <Fragment>
      {loading && <LinearProgress />}
      {!loading && _.isEmpty(workOrder) && (
        <Alert severity='error'>404 - Serviço não existe</Alert>
      )}
      {!loading && !_.isEmpty(workOrder) && (
        <Card>
          <CardContent>
            <Grid container sx={{ marginBottom: 2 }} spacing={1}>
              <Grid item xs={12}>
                <Typography variant='h5'>
                  Atualizar {workOrder?.name} Serviço
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='error'
                  size='small'
                  onClick={handleDeleteWorkOrder}
                >
                  Delete Serviço
                </Button>
              </Grid>
            </Grid>

            <Box component='form' onSubmit={handleSubmit(submitForm)}>
              <TextField
                margin='normal'
                fullWidth
                label='Name'
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors?.name?.message}
                defaultValue={workOrder?.name}
              />
              <TextField
                margin='normal'
                fullWidth
                label='Description'
                {...register('description', {
                  required: 'Description is required',
                })}
                error={!!errors.description}
                helperText={errors?.description?.message}
                defaultValue={workOrder?.description}
              />
              <TextField
                margin='normal'
                fullWidth
                label='Price'
                {...register('price', {
                  required: 'Price is required',
                })}
                error={!!errors.price}
                helperText={errors?.price?.message}
                defaultValue={workOrder?.price}
                type='number'
                inputProps={{
                  step: '0.01',
                }}
              />
              <TextField
                margin='normal'
                fullWidth
                label='Payment Type'
                {...register('payment', {
                  required: 'Payment Type is required',
                })}
                error={!!errors.payment}
                helperText={errors?.payment?.message}
                defaultValue={workOrder?.payment}
              />
              <LoadingButton
                type='submit'
                disabled={!isValid}
                loading={isSubmitting}
                fullWidth
                variant='contained'
                sx={{ marginTop: 1 }}
              >
                Atualizar Serviço
              </LoadingButton>
            </Box>
          </CardContent>
        </Card>
      )}
    </Fragment>
  )
}

export default UpdateWorkOrder
