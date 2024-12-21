import { useState, useEffect } from 'react';
import type { FormInstance } from 'antd/es/form';

export const useFormProgress = (form?: FormInstance): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!form) return;

    const calculateProgress = () => {
      const values = form.getFieldsValue(true);
      const fields = form.getFieldsError();
      
      const requiredFields = fields.filter(field => 
        field.rules?.some(rule => rule.required)
      );
      
      if (requiredFields.length === 0) return 0;
      
      const filledFields = requiredFields.filter(field => {
        const value = field.name.reduce((obj, key) => obj?.[key], values);
        return value !== undefined && value !== '' && value !== null;
      });

      return Math.round((filledFields.length / requiredFields.length) * 100);
    };

    // Initial calculation
    const initialProgress = calculateProgress();
    setProgress(initialProgress);

    // Setup field value change listener
    const onValuesChange = () => {
      const newProgress = calculateProgress();
      setProgress(newProgress);
    };

    form.setFieldsValue(form.getFieldsValue()); // Trigger initial update
    form.getFieldsError().forEach(() => form.validateFields()); // Validate all fields

    return () => {
      form.setFields([]); // Cleanup
    };
  }, [form]);

  return progress;
};