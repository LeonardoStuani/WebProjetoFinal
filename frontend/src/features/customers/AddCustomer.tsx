import { LoadingButton } from '@mui/lab'
import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

const AddCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: 'onTouched',
  })
  let navigate = useNavigate()

  const submitForm = async (data: FieldValues) => {
    console.log(data)
    await axios.post('http://localhost:5000/customers', data)
    navigate('/')
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h5'>Adicionar Cliente</Typography>
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
            label='CPF'
            {...register('cpf', { required: 'CPF is required' })}
            error={!!errors.cpf}
            helperText={errors?.cpf?.message}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Phone'
            {...register('phone', { required: 'Phone is required' })}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Email'
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors?.email?.message}
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
          />
          <TextField
            margin='normal'
            fullWidth
            label='City'
            {...register('city', { required: 'City is required' })}
            error={!!errors.city}
            helperText={errors?.city?.message}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Address'
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors?.address?.message}
          />
          <TextField
            margin='normal'
            fullWidth
            label='Sex'
            {...register('sex', { required: 'Sex is required' })}
            error={!!errors.sex}
            helperText={errors?.sex?.message}
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

export default AddCustomer
