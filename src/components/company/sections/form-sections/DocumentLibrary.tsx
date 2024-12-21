import React, { useState } from 'react';
import { Form, Upload, Button, Space } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { DocumentEntry } from './DocumentEntry';
import { validateFile } from '../../../../utils/fileValidation';
import { getAcceptedFileTypes } from '../../../../utils/fileTypes';
import { showMessage } from '../../../common/ThemedMessage';
import { SciFiCard } from '../../../common/SciFiCard';
import { v4 as uuidv4 } from 'uuid';
import { useThemeContext } from '../../../../context/ThemeContext';
import { darkTheme } from '../../../../styles/themes/dark';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/es/upload/interface';

const fileValidationOptions = {
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'text/plain',
    'application/rtf',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.presentation',
  ],
  maxSize: 10 * 1024 * 1024, // 10MB
};

interface DocumentLibraryProps {
  onCountChange?: (count: number) => void;
}

export const DocumentLibrary: React.FC<DocumentLibraryProps> = ({
  onCountChange = () => {},
}) => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';
  const [documentIds, setDocumentIds] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);

  const beforeUpload = (file: RcFile) => {
    const validation = validateFile(file, fileValidationOptions);
    
    if (!validation.isValid) {
      showMessage.error(validation.error || 'Invalid file');
      return Upload.LIST_IGNORE;
    }

    const newId = uuidv4();
    setDocumentIds(prev => {
      const newIds = [...prev, newId];
      onCountChange(newIds.length);
      return newIds;
    });
    
    setFileList(prev => [...prev, {
      uid: newId,
      name: file.name,
      status: 'done',
      size: file.size,
      type: file.type,
      percent: 100,
      originFileObj: file,
    }]);

    return false; // Prevent auto upload
  };

  const handleRemove = (id: string) => {
    setDocumentIds(prev => {
      const newIds = prev.filter(docId => docId !== id);
      onCountChange(newIds.length);
      return newIds;
    });
    setFileList(prev => prev.filter(file => file.uid !== id));
    showMessage.success('Document removed successfully');
  };

  const handleAddDocument = () => {
    const uploadBtn = document.querySelector('.ant-upload-btn') as HTMLElement;
    uploadBtn?.click();
  };

  return (
    <div className="space-y-8">
      {documentIds.map((id, index) => (
        <SciFiCard key={id} className="p-6">
          <DocumentEntry
            index={index}
            file={fileList.find(f => f.uid === id)?.originFileObj}
            onRemove={() => handleRemove(id)}
          />
        </SciFiCard>
      ))}

      <div className="document-upload-section">
        <Upload.Dragger
          accept={getAcceptedFileTypes()}
          beforeUpload={beforeUpload}
          fileList={[]}
          className="document-upload-dragger"
          multiple
        >
          <p className="text-4xl">
            <UploadOutlined style={{ 
              color: isDark ? darkTheme.colors.accent.primary : darkTheme.colors.accent.secondary 
            }} />
          </p>
          <p className="text-base mt-4">
            Click or drag files to upload
          </p>
          <p className="text-sm opacity-70 mt-2">
            Supports PDF, DOC, DOCX, TXT, RTF, ODT, Images, PPT, PPTX (max 10MB)
          </p>
        </Upload.Dragger>
      </div>

      <Space className="w-full justify-center">
        <Button
          type="primary"
          onClick={handleAddDocument}
          icon={<PlusOutlined />}
          size="large"
          style={{
            background: isDark ? darkTheme.colors.accent.primary : darkTheme.colors.accent.secondary,
            borderColor: isDark ? darkTheme.colors.accent.primary : darkTheme.colors.accent.secondary,
            minWidth: '200px',
            height: '44px',
          }}
          className="hover:scale-105 transition-transform duration-300"
        >
          Add Another Document
        </Button>
      </Space>
    </div>
  );
};