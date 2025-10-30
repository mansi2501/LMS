import * as Yup from 'yup';

//To check form field validation
export const RegistrationSchema = Yup.object().shape({
  companyName: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'The company name is invalid; please enter the correct name')
    .required('Please enter the company name '),
  email: Yup.string()
    .required('Please enter the email address')
    .test('is-valid-email', 'The email address is invalid; please enter the correct email address.', (value) => {
      if (!value) return false;
      return value.includes('@') && value.includes('.');
    }),
  password: Yup.string().required("Please enter the password"),
  confirmPassword: Yup.string().required("Please enter the confirmation password").oneOf([Yup.ref("password"), null], "Password and Confirm password should be the same"),
})

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter the email address')
    .test('is-valid-email', 'The email address is invalid; please enter the correct email address.', (value) => {
      if (!value) return false;
      return value.includes('@') && value.includes('.');
    }),
  password: Yup.string().required("Please enter the password"),
})
