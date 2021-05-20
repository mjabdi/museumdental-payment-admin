import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import CurrentVisits from './CurrentVisits';



import { Tooltip } from '@material-ui/core';
import GlobalState from './../GlobalState';
import BookingView from './BookingView';
import TotalReceivedPaymentView from './TotalReceivedPaymentView';
import TodayReceivedPaymentView from './TodayReceivedPaymentView';
import TodayLinksSentView from './TodayLinkSentView';
import LatePaymentsView from './LatePaymentsView';
import { useLocation, useHistory } from "react-router-dom";
import { getGlobalPath } from "./../GlobalPath";
import { getMenuId, getMenuIndex } from "./../MenuList";



const useStyles = makeStyles((theme) => ({

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function DashboardPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperSmall = clsx(classes.paper, classes.fixedHeightSmall);

  const history = useHistory();

  const role="museumadmin"

  const gotoLatePayments = () =>
  {
    history.push(getGlobalPath(`/${getMenuId(role, getMenuIndex(role,'latepaymentsTable'))}`));
  }


  return (
    <React.Fragment>

      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={fixedHeightPaperSmall}>
            <TotalReceivedPaymentView/>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={fixedHeightPaperSmall}>
             <TodayReceivedPaymentView/>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper className={fixedHeightPaperSmall} onClick={gotoLatePayments} style={{cursor:"pointer"}}>
              <LatePaymentsView/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper className={fixedHeightPaperSmall}>
              <TodayLinksSentView/>
          </Paper>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ minHeight: "250px" }}>
            <BookingView />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}