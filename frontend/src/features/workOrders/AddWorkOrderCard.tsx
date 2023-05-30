import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Customer } from '../../app/models/customer'

interface Props {
  customer: Customer | null | undefined
  getCustomer: () => void
}

const AddWorkOrderCard = ({ customer, getCustomer }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onTouched',
  })

  const submitForm = async (data: FieldValues) => {
    data = { ...data, customer_id: customer?.id }
    console.log(data)
    await axios.post(`http://localhost:5000/work-orders`, data)
    getCustomer()
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Adicionar Serviço</Typography>
        <Box component='form' onSubmit={handleSubmit(submitForm)}>
          <TextField
            margin='normal'
            fullWidth
            label='Name'
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors?.name?.message}
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
          />
          <LoadingButton
            type='submit'
            disabled={!isValid}
            loading={isSubmitting}
            fullWidth
            variant='contained'
            sx={{ marginTop: 1 }}
          >
            Enviar
          </LoadingButton>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AddWorkOrderCard
