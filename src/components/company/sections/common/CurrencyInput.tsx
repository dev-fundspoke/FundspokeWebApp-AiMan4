import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';

interface CurrencyInputProps extends Omit<InputNumberProps, 'formatter' | 'parser'> {
  prefix?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  prefix = '$',
  className = '',
  ...props
}) => {
  return (
    <InputNumber
      className={`w-full ${className}`}
      formatter={value => `${prefix} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(displayValue: string | undefined): number => {
        if (!displayValue) return 0;
        const parsed = Number(displayValue.replace(new RegExp(`${prefix}\\s?|(,*)`, 'g'), ''));
        return isNaN(parsed) ? 0 : parsed;
      }}
      {...props}
    />
  );
};