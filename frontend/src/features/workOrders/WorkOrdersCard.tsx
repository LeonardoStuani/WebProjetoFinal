import { Button, Card, CardContent, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { WorkOrder } from '../../app/models/workOrder'

interface Props {
  workOrders: WorkOrder[] | null | undefined
}

const WorkOrdersCard = ({ workOrders }: Props) => {
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
            to={`/work-orders/${params.value}`}
            style={{ marginRight: 16 }}
          >
            Detalhes
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
      field: 'description',
      headerName: 'Description',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
    },
    {
      field: 'payment',
      headerName: 'Payment',
      width: 150,
    },
  ]

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{ marginBottom: 2 }}>
          Ordem de Serviços
        </Typography>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={workOrders as WorkOrder[]}
            columns={columns}
            disableSelectionOnClick
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default WorkOrdersCard
