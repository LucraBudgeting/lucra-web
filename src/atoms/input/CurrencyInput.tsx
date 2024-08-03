import React, { useState, useEffect } from 'react';
import { BaseInput } from './BaseInput';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue: number;
  handleChange: (value: number) => void;
  className?: string; // Optional prop for className
  id?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  initialValue,
  handleChange,
  className,
  id,
}) => {
  // Format value without decimals
  const formatValue = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const [displayValue, setDisplayValue] = useState(formatValue(initialValue));

  // Update display value when initial value changes
  useEffect(() => {
    setDisplayValue(formatValue(initialValue));
  }, [initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters
    const cleanedValue = event.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(cleanedValue, 10) || 0;

    // Format for display
    setDisplayValue(formatValue(numValue));
    // Emit numeric value
    handleChange(numValue);
  };

  return (
    <BaseInput
      id={id}
      type="text"
      className={className} // Apply className prop to the styled component
      value={`$${displayValue}`}
      onChange={handleInputChange}
    />
  );
};
