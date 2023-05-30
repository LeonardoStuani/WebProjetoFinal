import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Typography, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { Customer } from '../../app/models/customer'

interface Props {
  customer: Customer | null | undefined
  getCustomer: () => void
}

const UpdateCustomerCard = ({ customer, getCustomer }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onTouched',
  })

  const submitForm = async (data: FieldValues) => {
    console.log(data)
    await axios.put(`http://localhost:5000/customers/${customer?.id}`, data)
    getCustomer()
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Atualizar {customer?.name}'s Detalhes</Typography>
        <Box component='form' onSubmit={handleSubmit(submitForm)}>
          <TextField
            margin='normal'
            fullWidth
            label='Name'
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors?.name?.message}
            defaultValue={customer?.name}
          />
          <TextField
            margin='normal'
            fullWidth
            label='CPF'
            {...register('cpf', { required: 'CPF is required' })}
            error={!!errors.cpf}
            helperText={errors?.cpf?.message}
            defaultValue={customer?.cpf}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Phone'
            {...register('phone', { required: 'Phone is required' })}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
            defaultValue={customer?.phone}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Email'
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors?.email?.message}
            defaultValue={customer?.email}
          />
          <TextField
            margin='normal'
            fullWidth
            label="Mother's Name"
            {...register('mothers_name', {
              required: "Mother's name is required",
            })}
            error={!!errors.mothers_name}
            helperText={errors?.mothers_name?.message}
            defaultValue={customer?.mothers_name}
          />
          <TextField
            margin='normal'
            fullWidth
            label='City'
            {...register('city', { required: 'City is required' })}
            error={!!errors.city}
            helperText={errors?.city?.message}
            defaultValue={customer?.city}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Address'
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors?.address?.message}
            defaultValue={customer?.address}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Sex'
            {...register('sex', { required: 'Sex is required' })}
            error={!!errors.sex}
            helperText={errors?.sex?.message}
            defaultValue={customer?.sex}
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

export default UpdateCustomerCard
