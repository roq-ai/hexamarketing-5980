import * as yup from 'yup';

export const renamedpackageValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  business_id: yup.string().nullable(),
});
