import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import { SaveOutlined, SendOutlined, ClearOutlined } from '@ant-design/icons';
import { darkTheme } from '../../styles/themes/dark';

interface FormActionsProps {
  onSaveDraft: () => void;
  onSubmit: () => void;
  onClear: () => void;
  isSaving?: boolean;
  isSubmitting?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSaveDraft,
  onSubmit,
  onClear,
  isSaving = false,
  isSubmitting = false,
}) => {
  const buttonStyle = {
    minWidth: '140px',
    height: '44px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 500,
  };

  return (
    <Space size={16}>
      <Tooltip title="Clear saved data">
        <Button 
          icon={<ClearOutlined />}
          onClick={onClear}
          style={{
            ...buttonStyle,
            borderColor: darkTheme.colors.accent.tertiary,
            color: darkTheme.colors.accent.tertiary,
          }}
          className="hover:shadow-lg transition-all duration-300"
        />
      </Tooltip>

      <Button 
        icon={<SaveOutlined />}
        size="large" 
        onClick={onSaveDraft}
        loading={isSaving}
        style={{
          ...buttonStyle,
          borderColor: darkTheme.colors.accent.secondary,
          color: darkTheme.colors.accent.secondary,
        }}
        className="hover:shadow-lg transition-all duration-300"
      >
        Save Draft
      </Button>

      <Button 
        type="primary"
        icon={<SendOutlined />}
        size="large"
        onClick={onSubmit}
        loading={isSubmitting}
        style={{
          ...buttonStyle,
          background: darkTheme.colors.accent.primary,
          borderColor: darkTheme.colors.accent.primary,
        }}
        className="hover:shadow-lg transition-all duration-300"
      >
        Submit
      </Button>
    </Space>
  );
};