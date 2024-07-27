import { isValidEmail } from '@/utils/isValidEmail';

export function validatePassword(password: string): string[] {
  const errors = [];
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const hasLength = password.length >= 8;

  if (!password) {
    errors.push('Password is required');
  }

  if (!hasNumber) {
    errors.push('Password must contain at least one number');
  }

  if (!hasSymbol) {
    errors.push('Password must contain at least one symbol');
  }

  if (!hasLength) {
    errors.push('Password must be at least 8 characters long');
  }

  return errors;
}

export function validateEmail(email: string): string[] {
  const errors = [];
  if (!email) {
    errors.push('Email is required');
  }

  if (!isValidEmail(email)) {
    errors.push('Email is invalid');
  }

  return errors;
}
