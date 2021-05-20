import React, { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Checkbox, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, Grid, Icon, InputLabel, LinearProgress, Link, makeStyles, MenuItem, Paper, Select, SvgIcon, Switch, TextField, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import GlobalState from '../GlobalState';
import { getMenuIndex } from '../MenuList';
import { FormatDateFromString, FormatDateFromStringShortYear } from './DateFormatter';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

import SearchIcon from '@material-ui/icons/Search';
import BookingDialog from './BookingDialog';
import AddIcon from '@material-ui/icons/Add';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import DescriptionIcon from '@material-ui/icons/Description';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Draggable from 'react-draggable';

import * as dateformat from 'dateformat';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import BusinessIcon from '@material-ui/icons/Business';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';


import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import PriceCalculator from './PriceCalculator';
import { corporates } from './Corporates';
import PaymentService from './services/PaymentService';
import PatientDialog from './PatientDialog';
import LinkIcon from '@material-ui/icons/Link';
import NewPaymentDialog from './NewPaymentDialog';
import ViewPaymentDialog from './ViewPaymentDialog';

import DoneIcon from '@material-ui/icons/Done';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SendIcon from '@material-ui/icons/Send';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),

  },

  refreshButton: {
    marginLeft: theme.spacing(2),
  },

  checkIcon: {
    color: "green"
  },

  closeIcon: {
    color: "red"
  },

  RefLink: {
    cursor: "pointer"
  },

  BookedLabel: {
    backgroundColor: "#606060",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  PatientAttendedLabel: {
    backgroundColor: "#0066aa",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  SampleTakenLabel: {
    backgroundColor: "#0066cc",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  ReportSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  ReportCertSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  PositiveLabel: {
    backgroundColor: "red",
    color: "#fff",
    width: "70px",
    textAlign: "center",
  },

  HideNowRows: {
    position: "absolute",
    top: "40%",
    left: "40%",
    width: "600px",
    height: "300px",
    backgroundColor: "#fafafa",
    color: "#111",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyItems: "center"
  },

  ExportToExcelButton:
  {
    // marginBottom : "20px",
    color: "#2f942e",
    borderColor: "#2f942e",
    "&:hover": {
      background: "#fafffa",
      borderColor: "#2f942e",
    },
    textDecoration: "none !important",

  },

  ExportToExcelButtonInline:
  {
    // marginBottom : "20px",
    color: "#2f942e",
    borderColor: "#2f942e",
    "&:hover": {
      background: "#fafffa",
      borderColor: "#2f942e",
    },
    textDecoration: "none !important",
    cursor: "pointer",
    padding: "10px"

  },

  table: {
    width: "100%",
    border: "1px solid #ddd",
    borderCollapse: "collapse",
  },

  th: {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    verticalAlign: "middle",
    fontcolor: "#555",
    fontWeight: "400",
    fontSize: "15px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: "14%",
    paddingLeft: "5px",
  },

  td: {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    verticalAlign: "middle",
    paddingLeft: "5px",
  },

  topSelect: {
    margin: theme.spacing(1),
    minWidth: 80,
  },

  notifyIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "rgb(220, 0, 78)",
    marginLeft: "10px"
  }

}));

const getTableTitle = (str) => {

  if (str === 'paid') {
    return `Successful Payments`;
  } else if (str === 'refund') {
    return `Refunded Payments`;
  } else if (str === 'future') {
    return `Future Bookings`;
  } else if (str === 'recent') {
    return `Recent Bookings`;
  } else if (str === 'notpaid') {
    return `Not Yet Paid`;
  } else if (str === 'completed') {
    return `Completed Bookings`;
  } else if (str === 'positive') {
    return `Positive Results`;
  } else if (str === 'deleted') {
    return `Deleted Records`;
  } else if (str === 'late') {
    return `4 Hours Late`;
  }

  else {
    return `Payment Links`;
  }

}

const getTableIcon = (str) => {

  if (str === 'paid') {
    return <DoneOutlineIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'refund') {
    return <KeyboardReturnIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'future') {
    return <TimelineIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'recent') {
    return <AutorenewIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'notpaid') {
    return <MoneyOffIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'completed') {
    return <PlaylistAddCheckIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'positive') {
    return <AddCircleOutlineIcon style={{ fontSize: "2.2rem" }} />
  } else if (str === 'deleted') {
    return <DeleteIcon style={{ fontSize: "2.2rem" }} />;
  } else if (str === 'late') {
    return <HourglassEmptyIcon style={{ fontSize: "2.2rem" }} />;
  }

  else {
    return <LinkIcon style={{ fontSize: "2.2rem" }} />;
  }

}

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function PaymentsTable(props) {

  const classes = useStyles();



  var columns = [
    {
      field: "_id",
      headerName: " ",
      width: 120,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <IconButton
              color="primary"
              onClick={(event) => openDetailsDialog(event, params.value)}
            >
              <SearchIcon />
            </IconButton>

            {params.getValue("paymentInfo") && !params.getValue("refund") && (
              <DoneOutlineIcon style={{color:"#009c39", fontSize:"1.6rem"}}/>
            )}

            {params.getValue("paymentInfo") && params.getValue("refund") && (
              <KeyboardReturnIcon style={{color:"#f06400", fontSize:"1.6rem"}}/>
            )}
            
            {!params.getValue("paymentInfo") && (params.getValue("emailSent") || params.getValue("textSent")) && (
              <SendIcon style={{color:"#008082", fontSize:"1.6rem"}}/>
            )}



          </React.Fragment>
        );
      },
    },
    { field: 'timeStamp', headerName: 'Created at', width: 180, valueFormatter: (params) => { 
      return formatTimeStamp(params.value);
      }
    },

    { field: 'amount', headerName: 'Amount', width: 150 , valueFormatter: (params) => {
      return `£${(
        params.value
      ).toLocaleString("en-GB")}`
    },},
    { field: 'fullname', headerName: 'Customer Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Telephone', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 300 },

  ];


  const [state, setState] = React.useContext(GlobalState);

  const [data, setData] = React.useState({ bookings: [], cachedBookings: [], isFetching: true });

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [seeDetailsDialogOpen, setSeeDetailsDialogOpen] = React.useState(false);

  const [corporate, setCorporate] = useState(corporates[0]);
  const corporateChanged = (event) => {
    setCorporate(event.target.value);
  }


  const [filter, setFilter] = React.useState('');


  const lastPromise = useRef();

  const formatTimeStamp = (timeStamp) => {
    const todayStr = dateformat(new Date(), 'yyyy-mm-dd');
    const timeStampStr = dateformat(timeStamp, 'yyyy-mm-dd');
    if (todayStr === timeStampStr) {
      return dateformat(timeStamp, "'Today', h:MM:ss TT");
    }
    else {
      return dateformat(timeStamp, "mmm dS, h:MM:ss TT");
    }
  }

  const loadData = () => {
    var api = PaymentService.getAllPayments;

    if (props.date === 'deleted') {
      api = PaymentService.getDeletedPayments;
    }else if (props.date === 'paid') {
      api = PaymentService.getPaidPayments;
    }else if (props.date === 'refund') {
      api = PaymentService.getRefundPayments;
    }else if (props.date === 'notpaid') {
      api = PaymentService.getNotPaidPayments;
    }else if (props.date === 'late') {
      api = PaymentService.getLatePayments;
    }


    setData({ bookings: [], cachedBookings: [], isFetching: true });

    // console.log(props)

    const currentPromise = api().then((res) => {
      // console.log(res)
      for (var i = 0; i < res.data.result.length; i++) {
        res.data.result[i] = { ...res.data.result[i], id: i + 1 }
      }
      setData({ bookings: [...res.data.result], cachedBookings: [...res.data.result], isFetching: false });
      // return res.data;
    }).catch(err => {
      console.error(err)
    })

    // lastPromise.current = currentPromise;

    // currentPromise.then(
    //   result => {
    //     if (currentPromise === lastPromise.current) {
    //       setData({bookings: [...result], cachedBookings: [...result], isFetching: false});
    //       setPage(1);
    //     }
    //   },
    //   e => {
    //     if (currentPromise === lastPromise.current) {
    //         console.error(e);
    //         setData({bookings: data.bookings, cachedBookings: data.cachedBookings, isFetching: false});
    //     }
    //   });

  }

  useEffect(() => {
    loadData()
  },
    [props.date]);




  useEffect(() => {

    if (filter && filter.trim().length > 0) {
      var filteredData = data.cachedBookings.filter((element) =>

        (element.fullname?.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
      );


      setData({ bookings: [...filteredData], cachedBookings: data.cachedBookings, isFetching: false });
    } else {
      setData({ bookings: [...data.cachedBookings], cachedBookings: data.cachedBookings, isFetching: false });
    }
  },
    [filter]);


  useEffect(() => {

    loadData()

  }, [state.paymentDialogDataChanged]);


  const handleCloseSeeDetaisDialog = () => {
    setSelectedBooking(null);
    setSeeDetailsDialogOpen(false);
  }

  const openDetailsDialog = (event, id) => {
    const payment = data.bookings.find(element => element._id === id);
    if (payment) {
      setSelectedBooking(payment);
      setViewDialogOpen(true)
    }
  }

  const refreshClicked = (event) => {
    setFilter('');
    loadData()
  }

  const filterChanged = (event) => {
    setFilter(event.target.value);
  }

  const handleSelectionChanged = (newSelection) => {
    if (newSelection.length > 0) {
      setSelectedRow(newSelection.rows[0]);
    }

  }

  const [page, setPage] = React.useState(1);


  const registerNewPatientClicked = () => {
    setSelectedPatient(null)
    setPatientDialogTitle('Register New Patient')
    setPatientDialogSaveButtonText("Save")
    setPatientDialogOpen(true)
  }

  const [selectedPatient, setSelectedPatient] = React.useState(null)
  const [patientDialogOpen, setPatientDialogOpen] = React.useState(false)
  const [patientDialogTitle, setPatientDialogTitle] = React.useState('')
  const [patientDialogSaveButtonText, setPatientDialogSaveButtonText] = React.useState('')


  const [viewDialogOpen, setViewDialogOpen] = React.useState(false)


  const handleClosePatientDialog = () => {
    setPatientDialogOpen(false)
  }

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false)
  }


  return (
    <React.Fragment>
      {data.isFetching && (
        <div style={{ width: "100%", paddingTop: "3px" }}>
          <LinearProgress color="primary" />
        </div>
      )}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item md={4}>
          <div style={{ textAlign: "left", paddingLeft: "10px" }}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <span style={{ paddingRight: "15px", color: "#555" }}>
                  {" "}
                  {getTableIcon(props.date)}{" "}
                </span>
              </Grid>
              <Grid item>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "#444",
                    marginTop : "-5px"
                  }}
                >
                  {" "}
                  {getTableTitle(props.date)}{" "}
                </div>
              </Grid>
              <Grid item>
                <Tooltip title="Refresh" placement="right">
                  <IconButton
                    color="primary"
                    className={classes.refreshButton}
                    onClick={refreshClicked}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </div>
        </Grid>

      {props.date === "all" && (
            <Grid item md={3}>
            <div style={{ paddingBottom: "10px" }}>
              <Button
                // className={classes.ExportToExcelButton}
                variant="contained"
                color="primary"
                onClick={registerNewPatientClicked}
                startIcon={
                  <AddIcon />
                }
              >
                Create New Link
                </Button>
            </div>
          </Grid>
      )}

        {data.isFetching && <div className={classes.HideNowRows}></div>}

        <Grid item md={3}>
          <TextField
            variant="standard"
            value={filter}
            onChange={filterChanged}
            margin="normal"
            size="small"
            id="filter"
            label="Filter"
            name="filter"
            autoComplete="off"
          />
        </Grid>

      </Grid>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={data.bookings}
          columns={columns}
          autoPageSize
          page={page}
          onPageChange={(params) => {
            setPage(params.page);
          }}
          onSelectionChange={handleSelectionChanged}
        />
      </div>


      {/* <BookingDialog
        booking={selectedBooking}
        open={seeDetailsDialogOpen && selectedBooking && selectedBooking.fullname}
        onClose={handleCloseSeeDetaisDialog}
      /> */}

      {/* <PatientDialog
        patient={selectedPatient}
        open={patientDialogOpen}
        handleClose={handleClosePatientDialog}
        title={patientDialogTitle}
        saveButtonText={patientDialogSaveButtonText}
      /> */}

      <NewPaymentDialog
        open={patientDialogOpen}
        handleClose={handleClosePatientDialog}
      />

      <ViewPaymentDialog
        payment={selectedBooking}
        open={viewDialogOpen}
        handleClose={handleCloseViewDialog}
      />


    </React.Fragment>
  );
}