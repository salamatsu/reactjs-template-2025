import { Button, Modal } from "antd";
import { CreditCard } from "lucide-react";
import { memo, useState } from "react";
import BookingConfirmation from "./BookingConfirmation";
import { formatCurrency } from "../../../../utils/formatCurrency";

const BookingModal = memo(
  ({
    loading = false,
    open,
    selectedRoom,
    selectedRate,
    bookingDetails,
    appliedPromo,
    selectedServices,
    onClose,
    onConfirm,
  }) => {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [isProcessing, setIsProcessing] = useState(false);

    if (!selectedRoom || !selectedRate) return null;

    const baseAmount = selectedRate.baseRate * selectedRate.duration;
    const servicesTotal = selectedServices.reduce(
      (sum, service) => sum + service.totalAmount,
      0
    );
    const subtotal = baseAmount + servicesTotal;

    let discountAmount = 0;
    if (appliedPromo) {
      if (appliedPromo.promoType === "percentage") {
        discountAmount = (subtotal * appliedPromo.discountValue) / 100;
      } else {
        discountAmount = Math.min(appliedPromo.discountValue, subtotal);
      }
    }

    const taxAmount = (subtotal - discountAmount) * 0.12;
    const totalAmount = subtotal - discountAmount;

    const handleConfirmPayment = () => {
      setIsProcessing(true);

      const bookingData = {
        room: selectedRoom,
        rate: selectedRate,
        details: bookingDetails,
        promo: appliedPromo,
        services: selectedServices,
        payment: {
          method: paymentMethod,
          baseAmount,
          discountAmount,
          taxAmount,
          totalAmount,
        },
      };

      setTimeout(() => {
        onConfirm(bookingData);
        setIsProcessing(false);
      }, 1000);
    };

    return (
      <Modal
        open={open}
        centered
        width={600}
        closeIcon={false}
        className="booking-modal"
        footer={
          <div className="flex gap-3">
            <Button
              block
              size="large"
              onClick={onClose}
              disabled={isProcessing || loading}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              block
              size="large"
              type="primary"
              loading={isProcessing || loading}
              onClick={handleConfirmPayment}
              icon={<CreditCard className="w-4 h-4" />}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 border-0"
            >
              {isProcessing || loading
                ? "Processing Payment..."
                : `Pay ${formatCurrency(totalAmount)}`}
            </Button>
          </div>
        }
      >
        <BookingConfirmation
          selectedRoom={selectedRoom}
          selectedRate={selectedRate}
          bookingDetails={bookingDetails}
          appliedPromo={appliedPromo}
          selectedServices={selectedServices}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </Modal>
    );
  }
);

export default BookingModal;
