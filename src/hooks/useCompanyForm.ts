import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { showMessage } from '../components/common/ThemedMessage';
import { useFormPersistence } from './useFormPersistence';
import { useFormFieldsProgress } from './useFormFieldsProgress';
import type { CompanyInformation } from '../types/company';

const STORAGE_KEY = 'company_form_draft';

export const useCompanyForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<CompanyInformation>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { saveForm, clearSavedForm } = useFormPersistence(form, STORAGE_KEY);
  const progress = useFormFieldsProgress(form);

  const handleSaveDraft = useCallback(async () => {
    try {
      setIsSaving(true);
      await saveForm();
      showMessage.success('Draft saved successfully');
    } catch (error) {
      showMessage.error('Failed to save draft');
      console.error('Save draft error:', error);
    } finally {
      setIsSaving(false);
    }
  }, [saveForm]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      
      // Here you would typically make an API call to submit the form
      console.log('Form submitted:', values);
      
      // Clear saved draft after successful submission
      clearSavedForm();
      
      showMessage.success('Company information submitted successfully');
      navigate('/new-company/confirmation');
    } catch (error) {
      if (error instanceof Error) {
        showMessage.error(error.message);
      } else {
        showMessage.error('Please check the form for errors');
      }
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, navigate, clearSavedForm]);

  return {
    form,
    handleSaveDraft,
    handleSubmit,
    isSubmitting,
    isSaving,
    progress,
  };
};