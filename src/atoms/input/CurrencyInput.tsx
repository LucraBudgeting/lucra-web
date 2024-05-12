import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Basic styled input component for default styles
const BasicInput = styled.input`
  padding: 8px;
  margin: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue: number;
  handleChange: (value: number) => void;
  className?: string; // Optional prop for className
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  initialValue,
  handleChange,
  className,
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
    <BasicInput
      type="text"
      className={className} // Apply className prop to the styled component
      value={`$${displayValue}`}
      onChange={handleInputChange}
    />
  );
};
