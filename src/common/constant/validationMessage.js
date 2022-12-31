export const REQUIRED_FIELD = (field) => {
  if (field) return `${field} field is required`;

  return `This field is required`;
};

export const MIN_LENGTH = (field, charCount) => {
  return `${field} must have ${charCount} characters`;
};

export const MAX_LENGHT = (field, charCount) => {
  return `${field} should not exceed ${charCount} characters`;
};

export const REQUIRED_OPTION = (field, requiredSelected) => {
  return `Select atleast ${requiredSelected} ${field} from options`;
};

export const INVALID_EMAIL_FORMAT = 'Invalid email address format';

export const INVALID_PASSWORD_FORMAT = 'Password must:';
export const INVALID_PASSWORD_CONFIRMATION = 'Password do not match';
export const INVALID_SAME_PASSWORD_CURRENT =
  'The new password cannot be the same as the current password';

export const INVALID_USER_OR_PASSWORD = 'You have entered an invalid username or password';

export const INVALID_IN_CAPTCHA = 'Captcha is not verified';
export const INVALID_EMAIL_EXIST = 'Email address already in the system';
export const INVALID_EMAIL_NOTEXIST_SYSTEM = 'Email address does not exist in the system';

export const INVALID_OTP_CODE = 'OPT code is invalid';

export const INACTIVE_ACCOUNT = 'This account is inactive please contact administrator';
export const INVALID_ACCOUNT = 'Wrong password or email !';
