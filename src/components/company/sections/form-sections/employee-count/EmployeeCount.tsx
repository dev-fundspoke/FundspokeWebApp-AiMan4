import React from 'react';
import { Form } from 'antd';
import { QuarterEntryForm } from './QuarterEntryForm';
import type { FormInstance } from 'antd/es/form';

interface EmployeeCountProps {
  form: FormInstance;
}

export const EmployeeCount: React.FC<EmployeeCountProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <QuarterEntryForm form={form} />
    </div>
  );
};