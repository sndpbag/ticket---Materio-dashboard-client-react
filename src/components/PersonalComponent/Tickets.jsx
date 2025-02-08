 
import Grid from '@mui/material/Grid2'
import Table from '../../views/dashboard/Table'
// import Table from '../../views/dashboard/Table'
const Tickets = () => {
    return (
        <Grid container spacing={6}>
             <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid> 
    );
};

export default Tickets;