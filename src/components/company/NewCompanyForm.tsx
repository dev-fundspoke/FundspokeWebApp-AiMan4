import React from 'react';
import { Form } from 'antd';
import { SciFiCard } from '../common/SciFiCard';
import { CompanyFormContent } from './sections/CompanyFormContent';
import { FormActions } from './FormActions';
import { FormProgressIndicator } from '../common/FormProgressIndicator';
import { useCompanyForm } from '../../hooks/useCompanyForm';
import { FormErrorBoundary } from '../error/FormErrorBoundary';
import type { CompanyInformation } from '../../types/company';

export const NewCompanyForm: React.FC = () => {
  const { 
    form, 
    handleSaveDraft, 
    handleSubmit, 
    isSubmitting, 
    isSaving,
    progress 
  } = useCompanyForm();

  return (
    <FormErrorBoundary>
      <SciFiCard className="w-full p-6 md:p-8">
        <Form<CompanyInformation>
          form={form}
          layout="vertical" 
          className="w-full"
          requiredMark="optional"
          onFinish={handleSubmit}
          preserve={false}
        >
          <FormProgressIndicator 
            progress={progress.percentage} 
            className="mb-6" 
          />
          
          <CompanyFormContent form={form} />
          
          <div className="flex justify-end mt-8 md:mt-12">
            <FormActions 
              onSaveDraft={handleSaveDraft}
              onSubmit={() => form.submit()}
              onClear={() => form.resetFields()}
              isSaving={isSaving}
              isSubmitting={isSubmitting}
            />
          </div>
        </Form>
      </SciFiCard>
    </FormErrorBoundary>
  );
};