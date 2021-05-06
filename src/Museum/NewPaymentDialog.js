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
    zIndex: theme.zIndex.drawer + 5,
    color: "#fff",
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

export default function NewPaymentDialog(props) {
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

    setAmountError(false)
    setFullnameError(false)
    setEmailError(false)
    setPhoneError(false)
    setSaving(false);
  };

  const createLinkClicked = async () =>
  {
    if (!validatePayment())
    {
      return
    }

    try{
      setSaving(true)
      const paymentRecord = {
        amount: amount,
        fullname: fullname,
        description: description,
        notes: notes
      }

      const res = await PaymentService.createNewPaymentLink(paymentRecord)

      if (res && res.data && res.data.status === "OK")
      {
        const payment = res.data.payment
        setPaymentLink(buildPaymentLink(payment._id))
        setState(state => ({...state, paymentDialogDataChanged: !state.paymentDialogDataChanged}))
        LinkRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      setSaving(false)

    }catch(err)
    {
      console.error(err)
      setSaving(false)
    }


  }

  const validatePayment = () =>
  {
    let error = false

    if (!amount || amount.trim().length === 0 || parseFloat(amount) <= 0 )
    {
      setAmountError(true)
      error = true
    }

    if (!fullname || fullname.trim().length === 0)
    {
      setFullnameError(true)
      error = true
    }

    return !error

  }

  const buildPaymentLink = (id) =>
  {
    return `https://londonmedicalclinic.co.uk/museumdentalpayment/pay/${id}`
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Dialog
          maxWidth="sm"
          open={props.open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
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
                    Create New Payment Link{" "}
                </div>
              </Grid>
            </Grid>

            <Divider />
          </DialogTitle>
          <DialogContent>
            <Grid
              container
              justify="space-between"
              spacing={2}
              alignItems="flex-start"
              style={{marginBottom:"20px"}}
            >
              <Grid item xs={12}>
                <TextField
                  disabled={paymentLink !== null || saving}
                  autoFocus
                  error={amountError}
                  label="Amount"
                  value={amount}
                  fullWidth
                  required
                  onChange={amountChanged}
                  name="product-price"
                  id="product-price-id"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: (
                      <InputAdornment position="start">
                        £
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled={paymentLink !== null || saving}
                  fullWidth
                  error={fullnameError}
                  label="Customer/Payer Name"
                  value={fullname}
                  required
                  onChange={fullnameChanged}
                  name="fullname"
                  id="fullname-id"
                  autoComplete="none"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled={paymentLink !== null || saving}
                  fullWidth
                  label="Description"
                  value={description}
                  onChange={descriptionChanged}
                  name="description"
                  id="description-id"
                  helperText="This will be shown to the users at payment time."
                  autoComplete="none"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled={paymentLink !== null || saving}
                  fullWidth
                  label="Notes"
                  value={notes}
                  onChange={notesChanged}
                  name="notes"
                  id="notes-id"
                  helperText="This is just for your use, it will not be shown to the users."
                  autoComplete="none"
                />
              </Grid>

              {paymentLink && (
                <React.Fragment>
                  
                  <Grid item xs={12}>

                    <div style={{fontSize:"1rem", fontWeight:"500", marginBottom:"5px", marginTop:"5px", color:"#333"}}>
                      Payment Link URL :
                    </div>

                    <div style={{ width: "100%", overflowWrap:"break-word"}} ref={LinkRef}>
                      <Link style={{fontSize:"1rem", fontWeight:"500"}} href={paymentLink} target="_blank" rel="noopener">
                        {paymentLink}
                      </Link>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      error={emailError}
                      label="Email Address"
                      value={email}
                      onChange={emailChanged}
                      name="email"
                      id="email-id"
                      autoComplete="none"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      disabled={saving}
                      fullWidth
                      // onClick={createLinkClicked}
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
                      label="Telephone Number"
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



                </React.Fragment>
              )}


            </Grid>

            <Backdrop className={classes.backdrop} open={saving}>
              <CircularProgress color="inherit" />
            </Backdrop>
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
                  back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={paymentLink !== null || saving}
                  onClick={createLinkClicked}
                  variant="contained"
                  color="primary"
                >
                  Create Link
                </Button>
              </Grid>

            </Grid>

          </DialogActions>



        </Dialog>
      </React.Fragment>
    </React.Fragment>
  );
}
