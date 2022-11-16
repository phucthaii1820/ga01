import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Gallery from './components/Gallery'

const queryClient = new QueryClient()

const Contaier = () => {
  const query = useQuery({
    queryKey: ['memes'],
    queryFn: () => fetch('https://api.imgflip.com/get_memes').then((res) => res.json()),
  })

  return (
    <Box>
      {query.isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {query.isError ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography>Something went wrong</Typography>
        </Box>
      ) : null}

      {query.data ? (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            mb={4}
          >
            <Button
              sx={{
                backgroundColor: 'gray',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'blue',
                },
              }}
              onClick={() => {
                query.refetch()
              }}
            >
              Get Memes
            </Button>
          </Box>
          <Gallery images={query.data.data.memes} />
        </Box>
      ) : null}
    </Box>
  )
}

const App = () => {
  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        <Contaier />
      </QueryClientProvider>
    </Box>
  )
}

export default App
