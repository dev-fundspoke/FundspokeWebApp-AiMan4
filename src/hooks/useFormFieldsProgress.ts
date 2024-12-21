import { useState, useEffect } from 'react';
import type { FormInstance } from 'antd/es/form';

interface FieldProgress {
  total: number;
  completed: number;
  percentage: number;
}

export const useFormFieldsProgress = (form: FormInstance): FieldProgress => {
  const [progress, setProgress] = useState<FieldProgress>({
    total: 0,
    completed: 0,
    percentage: 0,
  });

  useEffect(() => {
    const updateProgress = () => {
      const values = form.getFieldsValue(true);
      const fields = form.getFieldsError();
      
      const requiredFields = fields.filter(field => 
        field.rules?.some(rule => rule.required)
      );
      
      const completedFields = requiredFields.filter(field => {
        const value = field.name.reduce((obj, key) => obj?.[key], values);
        return value !== undefined && value !== '' && value !== null;
      });

      const total = requiredFields.length;
      const completed = completedFields.length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      setProgress({ total, completed, percentage });
    };

    // Initial calculation
    updateProgress();

    // Setup field value change listener
    const onValuesChange = () => {
      updateProgress();
    };

    form.setFieldsValue(form.getFieldsValue()); // Trigger initial update
    
    return () => {
      form.setFields([]); // Cleanup
    };
  }, [form]);

  return progress;
};