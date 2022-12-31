import * as Yup from 'yup';

import { INVALID_EMAIL_FORMAT, REQUIRED_FIELD } from '../../constant/validationMessage';

export const loginInitialValue = {
  email: '',
  password: '',
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().required(REQUIRED_FIELD('email')).email(INVALID_EMAIL_FORMAT),
  password: Yup.string().required(REQUIRED_FIELD('password')),
});

export const signUpInitialValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required(REQUIRED_FIELD('First Name')).max(16),
  lastName: Yup.string().required(REQUIRED_FIELD('Last Name')).max(16),
  email: Yup.string().required(REQUIRED_FIELD('Email')).email(INVALID_EMAIL_FORMAT),
  password: Yup.string().required(REQUIRED_FIELD('Password')).max(16),
});

export const addPlayerSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_FIELD('name')),
});
