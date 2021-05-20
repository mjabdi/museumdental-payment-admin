import API from './api';
import axiosRetry from 'axios-retry';

export default class PaymentService {

   static sendPaymentLinkTextMessage = (museumPaymentId, phone) =>
   {
      return API.post(`/api/museumdental/payment/sendpaymentlinktext`, {museumPaymentId : museumPaymentId, phone: phone});
   }


   static sendPaymentLinkEmail = (museumPaymentId, email) =>
   {
      return API.post(`/api/museumdental/payment/sendpaymentlinkemail`, {museumPaymentId : museumPaymentId, email: email});
   }

   static doPayment = (paymentId, museumPaymentId) =>
   {
      return API.post(`/api/museumdental/payment/dopayment`, {paymentId: paymentId  , museumPaymentId : museumPaymentId});
   }

   static refundPayment = (paymentId) =>
   {
      return API.post(`/api/museumdental/payment/refundpayment`, {museumPaymentId : paymentId});
   }

   static createNewPaymentLink = (paymentRecord) =>
   {
      return API.post(`/api/museumdental/payment/createpayment`, {paymentRecord : paymentRecord});
   }

   static deletePaymentLink = (paymentId) =>
   {
      return API.post(`/api/museumdental/payment/deletepayment`, {museumPaymentId : paymentId});
   }

   static getAllPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getallpayments`);
   }

   static getDeletedPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getdeletedpayments`);
   }

   static getPaidPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getpaidpayments`);
   }

   static getNotPaidPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getnotpaidpayments`);
   }

   static getLatePayments = () =>
   {
      return API.get(`/api/museumdental/payment/getlatepayments`);
   }


   static getRefundPayments = () =>
   {
      return API.get(`/api/museumdental/payment/getrefundpayments`);
   }

   static getRecentPayments = () => {
      return API.get(`/api/museumdental/payment/getrecentpayments`);
   }

   static getPaymentById = (paymentId) =>
   {
      return API.get(`/api/museumdental/payment/getpaymentbyid?id=${paymentId}`);
   }

   static getTotalReceivedAmount = () => {
      return API.get(`/api/museumdental/payment/gettotalreceivedamount`);
   }

   static getTodayReceivedAmount = () => {
      return API.get(`/api/museumdental/payment/gettodayreceivedamount`);
   }

   static getTotalLinkSent = () => {
      return API.get(`/api/museumdental/payment/gettotallinksent`);
   }

   static getTodayLinkSent = () => {
      return API.get(`/api/museumdental/payment/gettodaylinksent`);
   }


   


}