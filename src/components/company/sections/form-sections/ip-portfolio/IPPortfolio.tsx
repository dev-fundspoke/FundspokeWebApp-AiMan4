import React from 'react';
import { Form } from 'antd';
import { IPEntryForm } from './IPEntryForm';
import type { FormInstance } from 'antd/es/form';

interface IPPortfolioProps {
  form: FormInstance;
}

export const IPPortfolio: React.FC<IPPortfolioProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <IPEntryForm form={form} />
    </div>
  );
};