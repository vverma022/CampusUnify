import {
  HiCube,
  HiEnvelope,
  HiBanknotes,
  HiClock,
  HiCurrencyRupee,
} from 'react-icons/hi2';
import { formatDateTime, formatCurrency } from '../../../../utils/helpers';

export default function BookingDetailModal({ onCloseModal, booking }) {
  return (
    <>
      <div className="flex flex-col gap-2 mt-4 w-[30rem]">
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center">
            <HiCube className="fill-primary-600 w-6 h-6" />
            <p>Participant Name</p>
          </div>
          <p>{booking.userId.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center ">
            <HiEnvelope className="fill-primary-600 w-6 h-6" />
            <p>Participant Email</p>
          </div>
          <p>{booking.userId.email}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center ">
            <HiCurrencyRupee className="fill-primary-600 w-6 h-6" />
            <p>Payment Id</p>
          </div>
          <p>{booking.paymentId.internalPaymentId}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center ">
            <HiCurrencyRupee className="fill-primary-600 w-6 h-6" />
            <p>Razorpay Order Id</p>
          </div>
          <p>{booking.paymentId.razorpayOrderId}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center ">
            <HiCurrencyRupee className="fill-primary-600 w-6 h-6" />
            <p>Razorpay Payment Id</p>
          </div>
          <p>{booking.paymentId.razorpayPaymentId}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center ">
            <HiBanknotes className="fill-primary-600 w-6 h-6" />
            <p>Total Amount</p>
          </div>
          <p className="font-sono">
            {formatCurrency(booking.paymentId.totalAmount)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 items-center">
          <div className="flex gap-2 items-center ">
            <HiClock className="fill-primary-600 w-6 h-6" />
            <p>Payment Time</p>
          </div>
          <p>{formatDateTime(booking.paymentId.paymentTime)}</p>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="bg-red-700 text-white w-40 px-2 py-1 rounded-md font-semibold"
          onClick={() => onCloseModal?.()}
        >
          Exit
        </button>
        {/* <button className="bg-primary-600 text-white w-40 px-2 py-1 rounded-md font-semibold">
          Cancel & Refund
        </button> */}
      </div>
    </>
  );
}
