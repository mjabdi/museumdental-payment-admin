import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

import { Grid, LinearProgress } from "@material-ui/core";

import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PaymentService from "./services/PaymentService";

const useStyles = makeStyles((theme) => ({
  countLabel: {
   fontSize: "2rem",
   color: theme.palette.secondary.main
  },

   Icon: {
    fontSize: "2rem"

  },


}));

export default function TotalReceivedPaymentView() {
  const classes = useStyles();

  const [data, setData] = React.useState(null);

  const [refresh, setRefresh] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const res = await PaymentService.getTotalReceivedAmount();

      setData(res.data.result);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [refresh]);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      setRefresh((refresh) => !refresh);
    }, 30000);

    return () =>
    {
      clearInterval(interval)
    }
  }, []);

  return (
    <React.Fragment>
      <div style={{ position: "relative" }}>
        {loading && (
          <div style={{ width: "100%", paddingTop: "3px" }}>
            <LinearProgress color="primary" />
          </div>
        )}
        <Title>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {/* <Grid item>
              <div style={{ paddingTop: "5px" }}>
                <HourglassEmptyIcon className={classes.Icon} />
              </div>
            </Grid> */}
            <Grid item>
                <div style={{width:"100%", textAlign:"center", fontSize:"1.5rem"}}>
                    Total Money Received
                </div>
            </Grid>
            <Grid item></Grid>
            <Grid item>
                {data !== null && <div className={classes.countLabel}>
                {`£${(
                    data
                  ).toLocaleString("en-GB")}`}
                
                  </div>
                }
            </Grid>
          </Grid>


        </Title>
      </div>
    </React.Fragment>
  );
}
