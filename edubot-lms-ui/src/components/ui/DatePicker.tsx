"use client";

import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  placeholderText?: string;
}

export const DatePickerComponent: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  className,
  placeholderText,
}) => {
  const datePickerRef = useRef<DatePicker>(null);

  const handleIconClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <div className="tw-relative tw-flex tw-items-center tw-border tw-border-gray-300 tw-rounded-md tw-bg-white tw-shadow-sm focus-within:tw-ring-2 focus-within:tw-ring-indigo-400 tw-w-9/10">
      <FaRegCalendarAlt
        className="tw-absolute tw-right-3 tw-text-gray-400 tw-cursor-pointer"
        onClick={handleIconClick}
      />
      <DatePicker
        ref={datePickerRef}
        selected={selected}
        onChange={onChange}
        className={`tw-w-full tw-pl-5 tw-pr-1 tw-py-2 tw-border-0 tw-rounded-md tw-shadow-sm focus:tw-ring-0 focus:tw-outline-none ${className}`}
        placeholderText={placeholderText}
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
};
