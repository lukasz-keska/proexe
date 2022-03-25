import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['email']);

const UserSchema = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      minLength: 5
    },
    userEmail: {
      type: 'string',
      format: 'email'
    }
  },
  required: ['userName', 'userEmail']
};

export const validateUserForm = (jsonData: {
  userName: FormDataEntryValue | null;
  userEmail: FormDataEntryValue | null;
}) => {
  ajv.validate(UserSchema, jsonData);
  return ajv.errors;
};
