import DashboardIcon from "@material-ui/icons/Dashboard";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";
import DescriptionIcon from "@material-ui/icons/Description";
import SearchIcon from "@material-ui/icons/Search";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import WarningIcon from "@material-ui/icons/Warning";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import DateRangeIcon from "@material-ui/icons/DateRange";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import AccessibilityIcon from '@material-ui/icons/Accessibility';

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import SendIcon from '@material-ui/icons/Send';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';


/// PCR ------------------
import FindByRef from "./PCR/FindByRef";
import BookingTable from "./PCR/BookingTable";
import DashboardPreview from "./PCR/DashboardPreview";
import UnmatchedRecords from "./PCR/UnmatchedRecords";
// import CalendarView from "./PCR/calendar/CalendarView";
import PCRCalendarView from "./PCR/calendar-admin/CalendarView";
//-----------------------

/// Gynae -------------------
import GynaeBookingTable from "./Gynae/BookingTable";
import GynaeDashboardPreview from "./Gynae/DashboardPreview";
import GynaeFindByRef from "./Gynae/FindByRef";
import GynaeCalendarView from "./Gynae/calendar-admin/CalendarView";
//----------------------------

/// GP -------------------
import GPBookingTable from "./GP/BookingTable";
import GPDashboardPreview from "./GP/DashboardPreview";
import GPFindByRef from "./GP/FindByRef";
import GPCalendarView from "./GP/calendar-admin/CalendarView";
//----------------------------

/// GP -------------------
import STDBookingTable from "./STD/BookingTable";
import STDDashboardPreview from "./STD/DashboardPreview";
import STDFindByRef from "./STD/FindByRef";
import STDCalendarView from "./STD/calendar-admin/CalendarView";
//----------------------------

// OV Admin ----------------
import OVBookingTable from "./OV/BookingTable";
import OVCalendarView from "./OV/calendar-admin/CalendarView";
import PatientsTable from "./OV/PatientsTable";

//---------------


// Museum Admin ----------------
import PaymentsTable from "./Museum/PaymentsTable";
import MuseumDashboard from "./Museum/DashboardPreview"

//---------------

import LinkIcon from '@material-ui/icons/Link';

export const MenuList_Museum_Admin = [
  {
    index: 0,
    id: `dashboard`,
    title: `Dashboard`,
    icon: <DashboardIcon />,
  },
  {
    index: 1,
    id: `paymentsTable`,
    title: `Payment Links`,
    icon: <LinkIcon />,
  },
  {
    index: 2,
    id: `paidpaymentsTable`,
    title: `Successful Payments`,
    icon: <DoneOutlineIcon />,
  },
  {
    index: 3,
    id: `refundpaymentsTable`,
    title: `Refunded Payments`,
    icon: <KeyboardReturnIcon />,
  },
  {
    index: 4,
    id: `deletedpaymentsTable`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },

]

//---------------
export const MenuList_OV_Admin = [
  {
    index: 0,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Archived Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  {
    index: 8,
    id: `patientsList`,
    title: `Patients`,
    icon: <AccessibilityIcon />,
  },



];



export const MenuList_Admin = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },

  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },

  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
];

export const MenuList_Gynae = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
];

export const MenuList_GP = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
];

export const MenuList_STD = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `oldBookings`,
    title: `Old Bookings`,
    icon: <HistoryIcon />,
  },
  {
    index: 4,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 5,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 6,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 7,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  { index: 8, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
];

export const MenuList_PCR = [
  { index: 0, id: `dashboard`, title: `Dashboard`, icon: <DashboardIcon /> },
  {
    index: 1,
    id: `recentBookings`,
    title: `Recent Bookings`,
    icon: <AutorenewIcon />,
  },
  {
    index: 2,
    id: `todayBookings`,
    title: `Today's Bookings`,
    icon: <NewReleasesIcon />,
  },
  {
    index: 3,
    id: `liveBookings`,
    title: `Live Bookings`,
    icon: <LiveTvIcon />,
  },
  { index: 4, id: `oldBookings`, title: `Old Bookings`, icon: <HistoryIcon /> },
  {
    index: 5,
    id: `futureBookings`,
    title: `Future Bookings`,
    icon: <TimelineIcon />,
  },
  {
    index: 6,
    id: `allBookings`,
    title: `All Bookings`,
    icon: <DescriptionIcon />,
  },
  {
    index: 7,
    id: `completedBookings`,
    title: `Completed Bookings`,
    icon: <PlaylistAddCheckIcon />,
  },
  {
    index: 8,
    id: `positiveBookings`,
    title: `Positive Results`,
    icon: <AddCircleOutlineIcon />,
  },
  {
    index: 9,
    id: `latebookings`,
    title: `40 Hours Late`,
    icon: <HourglassEmptyIcon />,
  },
  {
    index: 10,
    id: `deletedBookings`,
    title: `Deleted Records`,
    icon: <DeleteIcon />,
  },
  {
    index: 11,
    id: `trBookings`,
    title: `TR Bookings`,
    icon: <AirplanemodeActiveIcon />,
  },
  {
    index: 12,
    id: `unmatchedRecords`,
    title: `Unmatched Records`,
    icon: <WarningIcon />,
  },
  {
    index: 13,
    id: `calendarView`,
    title: `Calendar View`,
    icon: <DateRangeIcon />,
  },
  // {
  //   index: 14,
  //   id: `adminCalendarView`,
  //   title: `Admin Calendar`,
  //   icon: <EventNoteIcon />,
  // },
  { index: 15, id: `findByRef`, title: `Find By Ref No`, icon: <SearchIcon /> },
];

export const getMenuContent = (role, index) => {
   if (role === "museumadmin") {
    switch (index) {
      case 0:
        return <MuseumDashboard/>;  
      case 1:
        return <PaymentsTable date="all"/>;  
        case 2:
          return <PaymentsTable date="paid"/>;  
          case 3:
            return <PaymentsTable date="refund"/>;  
            case 4:
              return <PaymentsTable date="deleted"/>;  
            
      default:
        return `Page Not Found!`;
    }
  } else {
    return `Page Not Found!`;
  }
};

export const getMenuRole = (role) => {
  switch (role) {
    case "museumadmin":
      return MenuList_Museum_Admin;
    default:
      return [];
  }
};

export const getMenuId = (role, index) => {
  const MenuList = getMenuRole(role);
  for (var i = 0; i < MenuList.length; i++) {
    if (MenuList[i].index === index) {
      return MenuList[i].id;
    }
  }

  return `Page Not Found!`;
};

export const getMenuIndex = (role, id) => {
  const MenuList = getMenuRole(role);
  for (var i = 0; i < MenuList.length; i++) {
    if (MenuList[i].id === id) {
      return MenuList[i].index;
    }
  }

  return -1;
};
