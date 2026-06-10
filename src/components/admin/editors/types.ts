import React from 'react';

export interface EditorProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleFileUpload?: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => Promise<void>;
  handleEditorChange: (html: string, fieldName: string) => void;
  collectionName: string;
  setActiveMediaField: (fieldName: string) => void;
  setMediaModalOpen: (open: boolean) => void;
  generatingJson?: boolean;
}
