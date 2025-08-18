import { CheckCircle, CreditCard, Plus, Receipt } from "lucide-react";
import React from "react";

const BookingNotes = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border-0 p-4 min-w-[350px]">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Getting Started
        </h3>
        <p className="text-gray-600 mb-6">
          Choose an available room to start the booking process
        </p>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <span className="text-green-700 font-medium">
            Apply promo codes for discounts
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <Plus className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <span className="text-blue-700 font-medium">
            Add extra services and amenities
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <CreditCard className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <span className="text-purple-700 font-medium">
            Multiple payment methods supported
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
          <Receipt className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <span className="text-orange-700 font-medium">
            Detailed payment breakdown
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingNotes;
