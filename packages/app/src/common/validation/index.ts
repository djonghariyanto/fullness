import { Pass } from '@fullness/core';

const INVALID_USERNAME_LENGTH = "Username must at least contains 4 characters";
const INVALID_PASSWORD_LENGTH = "Password must at least contains 4 characters";
const INVALID_PASSWORD_REENTRY = "Password doesn't match";

export const usernameLengthPass = Pass.create<string>(
  value => value.length > 3 && value.length < 21,
  INVALID_USERNAME_LENGTH
);

export const passwordLengthPass = Pass.create<string>(
  value => value.length > 3 && value.length < 21,
  INVALID_PASSWORD_LENGTH
);

export const reEntryPass = Pass.createAssert<string>(
  (value, testValue) => value == testValue, 
  INVALID_PASSWORD_REENTRY
);
