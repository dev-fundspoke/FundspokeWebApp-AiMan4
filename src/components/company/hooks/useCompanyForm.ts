import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { showMessage } from '../../common/ThemedMessage';
import type { CompanyInformation } from '../../types/company';

export const useCompanyForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<CompanyInformation>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraft = async () => {
    try {
      setIsSaving(true);
      const values = form.getFieldsValue();
      localStorage.setItem('company_form_draft', JSON.stringify(values));
      showMessage.success('Draft saved successfully');
    } catch (error) {
      showMessage.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      console.log('Form submitted:', values);
      localStorage.removeItem('company_form_draft'); // Clear draft after successful submission
      showMessage.success('Company information submitted successfully');
      navigate('/new-company/confirmation');
    } catch (error) {
      showMessage.error('Please check the form for errors');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleSaveDraft,
    handleSubmit,
    isSubmitting,
    isSaving,
  };
};