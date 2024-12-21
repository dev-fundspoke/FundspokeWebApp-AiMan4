import { Form } from 'antd';
import { validationMessages } from '../utils/validationMessages';

export const useFormValidation = () => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required',
    types: {
      email: validationMessages.email,
      url: validationMessages.url,
      number: validationMessages.number.type('${label}'),
    },
    number: {
      min: validationMessages.number.min('${label}', '${min}'),
      max: validationMessages.number.max('${label}', '${max}'),
    },
    string: {
      min: validationMessages.minLength('${label}', '${min}'),
      max: validationMessages.maxLength('${label}', '${max}'),
    },
  };

  return {
    form,
    validateMessages,
  };
};