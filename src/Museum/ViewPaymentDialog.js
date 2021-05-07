import React, { useEffect, useRef, useState } from "react";
import BookService from "./services/BookService";
import Typography from "@material-ui/core/Typography";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  DialogActions,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import GlobalState from "../GlobalState";
import { withStyles } from "@material-ui/core/styles";

import CreditCardIcon from "@material-ui/icons/CreditCard";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";

import Alert from "@material-ui/lab/Alert";

import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { corporates } from "./Corporates";
import NumberFormat from "react-number-format";
import LinkIcon from '@material-ui/icons/Link';
import PaymentService from "./services/PaymentService";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import * as EmailValidator from "email-validator";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SendIcon from '@material-ui/icons/Send';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import DeleteIcon from '@material-ui/icons/Delete';
import dateformat from 'dateformat'

var interval;

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),
  },

  refreshButton: {
    marginLeft: theme.spacing(2),
  },

  checkIcon: {
    color: "green",
  },

  closeIcon: {
    color: "red",
  },

  RefLink: {
    cursor: "pointer",
  },

  BookedLabel: {
    backgroundColor: "#606060",
    color: "#fff",
    paddingRight: "10px",
    paddingLeft: "10px",
  },

  PatientAttendedLabel: {
    backgroundColor: "#0066aa",
    color: "#fff",
    paddingRight: "15px",
    paddingLeft: "10px",
  },

  SampleTakenLabel: {
    backgroundColor: "#0066cc",
    color: "#fff",
    paddingRight: "40px",
    paddingLeft: "10px",
  },

  ReportSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px",
  },

  ReportCertSentLabel: {
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "68px",
    paddingLeft: "10px",
  },

  archiveButton: {},

  smartMatchButton: {
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    marginRight: "10px",
    // padding: "10px"
  },

  infoTitle: {
    fontWeight: "400",
  },

  infoData: {
    paddingLeft: "10px",
    fontWeight: "800",
  },

  matchButton: {
    marginTop: "30px",
    marginBottom: "20px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  resendButton: {
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  resendFilesButton: {
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "#3792ad",
    "&:hover": {
      background: "#2f798f",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  cancelButton: {
    marginBottom: "10px",
    textDecoration: "none !important",
    padding: "10px",
    paddingLeft: "90px",
    paddingRight: "90px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 999,
    color: "#fff",
  },

  itemLabel: {
    color: "#555",
    fontWeight: "500",
    fontSize: "1rem"
  },

  itemData: {
    color: theme.palette.primary.main,
    fontWeight: "600",
    fontSize: "1rem"
  },

  TextSecondary: {
    color: theme.palette.secondary.main
  },


}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#cedbce", //theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#2f942e",
  },
}))(LinearProgress);
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography
          style={{ fontWeight: "800", color: "#5e855e" }}
          variant="body2"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ViewPaymentDialog(props) {
  const classes = useStyles();

  const LinkRef = React.useRef(null)

  const [state, setState] = React.useContext(GlobalState);
  const [saving, setSaving] = useState(false);

  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);


  const [fullname, setFullname] = React.useState("");
  const [fullnameError, setFullnameError] = React.useState(false);

  const [emailError, setEmailError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);

  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [paymentLink, setPaymentLink] = React.useState(null);

  const [emailSent, setEmailSent] = React.useState(false);
  const [refundDone, setRefundDone] = React.useState(false);
  const [deleteDone, setdeleteDone] = React.useState(false);
  const [refundTimeStamp, setRefundTimeStamp] = React.useState(null)


  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const handleCloseDeleteDialog = () =>
  {
    setOpenDeleteDialog(false)
  }


  const [openRefundDialog, setOpenRefundDialog] = React.useState(false);

  const handleCloseRefundDialog = () => {
    setOpenRefundDialog(false)
  }



  React.useEffect(() => {
    if (props.payment && props.open) {
      setPaymentLink(buildPaymentLink(props.payment._id))
      setEmail(props.payment.email || '')
      setPhone(props.payment.phone || '')
    }

  }, [props.payment, props.open])


  const fullnameChanged = (event) => {
    setFullname(event.target.value);
    setFullnameError(false);
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
  };

  const notesChanged = (event) => {
    setNotes(event.target.value);
  };



  const descriptionChanged = (event) => {
    setDescription(event.target.value);
  };


  const amountChanged = (event) => {
    setAmount(event.target.value)
    setAmountError(false)
  }

  const handleClose = () => {
    if (saving) return;

    props.handleClose();
    setAmount('')
    setFullname('')
    setEmail('')
    setPhone('')
    setDescription('')
    setNotes('')
    setPaymentLink(null)
    setRefundTimeStamp(null)

    setAmountError(false)
    setFullnameError(false)
    setEmailError(false)
    setPhoneError(false)
    setSaving(false);
    setEmailSent(false)
    setRefundDone(false)
    setOpenRefundDialog(false)
    setOpenDeleteDialog(false)
    setdeleteDone(false)
  };

  const createLinkClicked = async () => {
    if (!validatePayment()) {
      return
    }

    try {
      setSaving(true)
      const paymentRecord = {
        amount: amount,
        fullname: fullname,
        description: description,
        notes: notes
      }

      const res = await PaymentService.createNewPaymentLink(paymentRecord)

      if (res && res.data && res.data.status === "OK") {
        const payment = res.data.payment
        setPaymentLink(buildPaymentLink(payment._id))
        setState(state => ({ ...state, paymentDialogDataChanged: !state.paymentDialogDataChanged }))
        LinkRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      setSaving(false)

    } catch (err) {
      console.error(err)
      setSaving(false)
    }


  }

  const validatePayment = () => {
    let error = false

    if (!amount || amount.trim().length === 0 || parseFloat(amount) <= 0) {
      setAmountError(true)
      error = true
    }

    if (!fullname || fullname.trim().length === 0) {
      setFullnameError(true)
      error = true
    }

    return !error

  }

  const buildPaymentLink = (id) => {
    return `https://londonmedicalclinic.co.uk/museumdentalpayment/pay/${id}`
  }


  const sendEmailClicked = async () => {
    if (!email || email.length < 3 || !EmailValidator.validate(email)) {
      setEmailError(true)
      return
    }

    try {

      setSaving(true)

      const res = await PaymentService.sendPaymentLinkEmail(props.payment._id, email)
      if (res && res.data && res.data.status === "OK") {
        setState(state => ({ ...state, paymentDialogDataChanged: !state.paymentDialogDataChanged }))
        setEmailSent(true)
      }

      setSaving(false)

    } catch (err) {
      console.log(err)
      setSaving(false)
    }
  }

  const refundPaymentClicked = () => {
    setOpenRefundDialog(true)
  }

  const refundPayment = async () => {
    try {
      setSaving(true)

      const res = await PaymentService.refundPayment(props.payment._id)
      setSaving(false)
      setOpenRefundDialog(false)
      if (res && res.data && res.data.status === "OK") {
        setRefundDone(true)
        setRefundTimeStamp(new Date())
        setState(state => ({ ...state, paymentDialogDataChanged: !state.paymentDialogDataChanged }))
      }
    } catch (err) {
      console.error(err)
      setSaving(false)
    }
  }

  const deleteClicked = async () => {
    try {
      setSaving(true)

      const res = await PaymentService.deletePaymentLink(props.payment._id)
      setSaving(false)
      setOpenDeleteDialog(false)
      if (res && res.data && res.data.status === "OK") {
        setdeleteDone(true)
        setState(state => ({ ...state, paymentDialogDataChanged: !state.paymentDialogDataChanged }))
      }
    } catch (err) {
      console.error(err)
      setSaving(false)
    }
  }


  return (
    <React.Fragment>
      {props.payment && (
        <React.Fragment>
          <Dialog
            maxWidth="sm"
            open={props.open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="draggable-dialog-title" style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: "15px" }}>
                {props.payment.paymentInfo && !props.payment.refund && !refundDone && (
                  <Tooltip title="Successful Payment">
                    <DoneOutlineIcon style={{ color: "#009c39", fontSize: "2.5rem" }} />
                  </Tooltip>
                )}

                {props.payment.paymentInfo && (props.payment.refund || refundDone) && (
                  <Tooltip title="Refunded Payment">
                    <KeyboardReturnIcon style={{ color: "#f06400", fontSize: "2.5rem" }} />
                  </Tooltip>
                )}

              </div>

              <div style={{ position: "absolute", top: "15px", right: "15px" }}>
                {(props.payment.deleted || deleteDone) && (
                  <Tooltip title="Deleted Payment">
                    <DeleteIcon style={{ color: "#d40000", fontSize: "2.5rem" }} />
                  </Tooltip>
                )}

              </div>




              <Grid
                container
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <LinkIcon
                    style={{ color: "#f50057", fontSize: "3rem" }}
                  />
                </Grid>

                <Grid item>
                  <div
                    style={{
                      color: "#f50057",
                      paddingBottom: "10px",
                      fontWeight: "800",
                    }}
                  >
                    {" "}
                    Payment Link Info{" "}
                  </div>
                </Grid>
              </Grid>

              <Divider />
            </DialogTitle>
            <DialogContent style={(props.payment.deleted || deleteDone) ? { backgroundColor: "#bbb" } : {}}
            >
              <Grid
                container
                justify="space-between"
                spacing={2}
                alignItems="flex-start"
                style={{ marginBottom: "20px" }}
              >
                {props.payment.paymentInfo && (
                  <React.Fragment>
                    <Grid item xs={12}>
                      <span className={classes.itemLabel} style={{ color: "#009c39", marginRight: "10px" }}> Stripe Ref # : </span>
                      <span className={classes.itemData} style={{ color: "#009c39" }}>
                        {JSON.parse(props.payment.paymentInfo).payment_method}
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                        <span className={classes.itemLabel} style={{ color: "#009c39", marginRight: "10px" }}> Payment done at : </span>
                        <span className={classes.itemData} style={{ color: "#009c39" }}>
                          {dateformat(props.payment.paymentTimeStamp,"dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        </span>
                    </Grid>  
                 </React.Fragment>
                
                )}

                {props.payment.paymentInfo && !props.payment.refund && !refundDone && (
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={refundPaymentClicked}
                    >
                      Refund Payment
                    </Button>
                  </Grid>
                )}

                {props.payment.paymentInfo && (props.payment.refund || refundDone) && (
                  <React.Fragment> 
                  <Grid item xs={12}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "600", textAlign: "left", color: "#f06400" }}>
                      Payment has been Refunded.
                    </div>
                  </Grid>
                    <Grid item xs={12}>
                        <span className={classes.itemLabel} style={{ color: "#f06400", marginRight: "10px" }}> Refund done at : </span>
                        <span className={classes.itemData} style={{ color: "#f06400" }}>
                          {dateformat(props.payment.refundTimeStamp || refundTimeStamp,"dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        </span>
                    </Grid>  
                    </React.Fragment>
              
                )}





                <Grid item xs={12}>
                  <span className={classes.itemLabel}> Amount: </span>
                  <span className={classes.itemData}>
                    {`£${(
                      props.payment.amount
                    ).toLocaleString("en-GB")}`}
                  </span>

                </Grid>

                <Grid item xs={12}>
                  <span className={classes.itemLabel}> Customer/Payer Name: </span>
                  <span className={classes.itemData}>
                    {props.payment.fullname || '-'}
                  </span>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.itemLabel}> Description: </span>
                  <span className={classes.itemData}>
                    {props.payment.description || '-'}
                  </span>
                </Grid>

                <Grid item xs={12}>
                  <span className={classes.itemLabel}> Notes: </span>
                  <span className={classes.itemData}>
                    {props.payment.notes || '-'}
                  </span>
                </Grid>


                {paymentLink && (
                  <React.Fragment>

                    <Grid item xs={12}>

                      <div style={{ fontSize: "1rem", fontWeight: "500", color: "#333" }}>
                        Payment Link URL :
                    </div>

                      <div style={{ width: "100%", overflowWrap: "break-word" }} ref={LinkRef}>
                        <Link style={{ fontSize: "1rem", fontWeight: "500" }} href={paymentLink} target="_blank" rel="noopener">
                          {paymentLink}
                        </Link>

                        <span>

                          <Tooltip title="COPY LINK TO CLIPBOARD">
                            <IconButton
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  paymentLink
                                );
                              }}
                              aria-label="delete"
                              className={classes.margin}
                              size="small"
                            >
                              <FileCopyOutlinedIcon
                                style={{ color: "#bf9b30", fontSize: "1.3rem", marginLeft: "10px" }}
                              />
                            </IconButton>
                          </Tooltip>

                        </span>

                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        error={emailError}
                        label="Customer Email Address"
                        value={email}
                        onChange={emailChanged}
                        name="email"
                        id="email-id"
                        autoComplete="none"
                        InputProps={(props.payment.emailSent || emailSent) && {
                          endAdornment: <InputAdornment position="end">
                            <span style={{ marginRight: "10px", color: "#009c39", fontSize: "1rem", fontWeight: "500" }}>Email Sent</span>
                            <SendIcon style={{ marginRight: "10px", color: "#009c39", fontSize: "1.6rem" }} />
                          </InputAdornment>,
                        }}

                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        disabled={saving || (props.payment.paymentInfo || props.payment.refund || props.payment.deleted)}
                        fullWidth
                        onClick={sendEmailClicked}
                        variant="contained"
                        color="primary"
                      >
                        Send Link With Email
                    </Button>
                    </Grid>


                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        disabled={true}
                        error={phoneError}
                        label="Customer Telephone Number"
                        value={phone}
                        onChange={phoneChanged}
                        name="phone"
                        id="phone-id"
                        autoComplete="none"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled={true}
                        fullWidth
                        // onClick={createLinkClicked}
                        variant="contained"
                        color="primary"
                      >
                        Send Link With Text Message
                    </Button>
                    </Grid>

                    {!props.payment.deleted && !deleteDone && (
                      <Grid item xs={12} style={{ marginTop: "20px" }}>
                        <Button
                          onClick={() => setOpenDeleteDialog(true)}
                          variant="contained"
                          fullWidth
                          color="primary"
                          style={{ backgroundColor: "#c70000", color: "#fff" }}
                          disabled={saving}
                        >
                          Delete This Record
                        </Button>
                      </Grid>
                    )}

                  </React.Fragment>
                )}


              </Grid>

            </DialogContent>


            <DialogActions>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                spacing={2}
              >

                <Grid item>
                  <Button
                    onClick={handleClose}
                    style={{ width: "100px" }}
                    disabled={saving}
                  >
                    close
                </Button>
                </Grid>
                {/* <Grid item>
                <Button
                  disabled={paymentLink !== null || saving}
                  onClick={createLinkClicked}
                  variant="contained"
                  color="primary"
                >
                  Create Link
                </Button>
              </Grid> */}

              </Grid>
            </DialogActions>


            <Dialog
              open={openRefundDialog}
              onClose={handleCloseRefundDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle style={{ color: "#bf0000" }} id="alert-dialog-title">
                {"Refund Deposit"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  style={{ color: "#333", fontWeight: "400" }}
                  id="alert-dialog-description"
                >
                  Are you sure you want to refund this payment?
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRefundDialog} color="default">
                  Back
              </Button>
                <Button
                  onClick={refundPayment}
                  color="secondary"
                  style={{ fontWeight: "600" }}
                  variant="contained"
                  autoFocus
                >
                  Yes, Refund Payment
              </Button>
              </DialogActions>
            </Dialog>


            <Dialog
              open={openDeleteDialog}
              onClose={handleCloseDeleteDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle style={{ color: "#d10202", fontWeight: "600" }} id="alert-dialog-title">
                {"Delete Record"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  style={{ color: "#000", fontWeight: "500" }}
                  id="alert-dialog-description"
                >
                  Are you sure you want to delete this record?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteDialog} color="default">
                  Back
                </Button>
                <Button onClick={deleteClicked} variant="contained" style={{ backgroundColor: "#d10202", color: "#fff" }}>
                  Yes, Delete this record
                </Button>
              </DialogActions>
            </Dialog>

          </Dialog>

          <Backdrop className={classes.backdrop} open={saving}>
            <CircularProgress color="inherit" />
          </Backdrop>

        </React.Fragment>
      )}
    </React.Fragment>
  );
}
