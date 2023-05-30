import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import { Customer } from '../../app/models/customer'

const CustomerCard = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCustomers()
  }, [])

  const getCustomers = async () => {
    const response = await axios.get('http://localhost:5000/customers')
    setCustomers(response.data)
    setLoading(false)
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '',
      renderCell: (params: GridRenderCellParams) => (
        <Fragment>
          <Button
            variant='contained'
            color='primary'
            size='small'
            component={RouterLink}
            to={`/customers/${params.value}`}
            style={{ marginRight: 16 }}
          >
            Abrir
          </Button>
        </Fragment>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'mothers_name',
      headerName: "Mother's Name",
      width: 150,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
    },
    {
      field: 'sex',
      headerName: 'Sex',
      width: 150,
    },
  ]

  return (
    <Card>
      {loading && <LinearProgress />}
      <CardContent>
        <Typography variant='h5' sx={{ marginBottom: 1 }}>
          Clientes
        </Typography>
        <Button
          size='small'
          variant='contained'
          component={NavLink}
          to='/customers/add'
          sx={{ marginBottom: 2 }}
        >
          Adicionar Cliente
        </Button>

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={customers}
            columns={columns}
            disableSelectionOnClick
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerCard
