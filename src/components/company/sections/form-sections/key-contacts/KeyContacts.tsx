import React from 'react';
import { Form } from 'antd';
import { ContactForm } from './ContactForm';
import type { FormInstance } from 'antd/es/form';

interface KeyContactsProps {
  form: FormInstance;
}

export const KeyContacts: React.FC<KeyContactsProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <ContactForm form={form} namePrefix={['primaryContact']} title="Primary Contact" required={true} />
      <ContactForm form={form} namePrefix={['secondaryContact']} title="Secondary Contact" required={false} />
    </div>
  );
};