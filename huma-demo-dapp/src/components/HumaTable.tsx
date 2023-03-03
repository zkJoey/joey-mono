import { Box, css, TablePagination, useTheme } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'

import { ColumnType } from '../utilTypes'
import { SeparatorIcon } from './icons'

type Props<T> = {
  columns: ColumnType<T>[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows?: any[]
  hideRowsPerPage?: boolean
}

export function HumaTable<T>({
  columns,
  rows,
  hideRowsPerPage = false,
}: Props<T>): React.ReactElement | null {
  const theme = useTheme()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const noPagination = rows ? rows.length <= 5 : true
  const rowperPageOptions = hideRowsPerPage ? [] : [5, 10, 25]

  const styles = {
    tableHeader: css`
      font-family: 'Uni-Neue-Regular';
      ${theme.cssMixins.rowVCentered}
      font-size: 14px;
      color: rgba(0, 0, 0, 0.87);
    `,
    tableBody: css`
      font-family: 'Uni-Neue-Regular';
      font-size: 14px;
      color: rgba(0, 0, 0, 0.87);
    `,
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (!columns) {
    return null
  }

  return (
    <>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.title} width={column.width}>
                  <Box css={styles.tableHeader}>
                    {!column.noSeparator && <SeparatorIcon />}
                    <Box
                      component='span'
                      sx={{ marginLeft: column.noSeparator ? '0' : '12px' }}
                    >
                      {column.title}
                    </Box>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id || row.name}>
                    {columns.map((column, index) => (
                      <TableCell
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${column.dataIndex}-${index}`}
                        component='th'
                        scope='row'
                        css={styles.tableBody}
                        width={column.width}
                        sx={column.style}
                      >
                        {column.dataIndex && (
                          <Box
                            component='span'
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: column.noSeparator ? '0' : '12px',
                            }}
                          >
                            {row[column.dataIndex]}
                          </Box>
                        )}
                        {column.action && (
                          <Box
                            component='span'
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: column.noSeparator ? '0' : '12px',
                              lineHeight: 0,
                              height: 0,
                            }}
                          >
                            {column.action(row)}
                          </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!noPagination && (
        <TablePagination
          size='small'
          sx={{
            '.MuiTablePagination-selectLabel': {
              fontSize: '12px',
            },
            '.MuiTablePagination-select': {
              fontSize: '12px',
            },
            '.MuiTablePagination-displayedRows': {
              fontSize: '12px',
            },
            '.MuiTablePagination-menuItem': {
              fontSize: '14px',
            },
          }}
          rowsPerPageOptions={rowperPageOptions}
          component='div'
          count={rows ? rows.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  )
}
