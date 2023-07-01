import * as yup from 'yup';

export const landingPageValidationSchema = yup.object().shape({
  name: yup.string().required(),
  content: yup.string().required(),
  business_id: yup.string().nullable(),
});
