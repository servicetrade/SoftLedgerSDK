import { CustomField } from './CustomField';

export interface CreateCustomFieldRequest extends Omit<CustomField, '_id' | 'required'> {}
