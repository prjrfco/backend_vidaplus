import { HttpStatus } from "@nestjs/common";

export const UserError = {
  USER_001: {
    code: "USER_001",
    status: HttpStatus.NOT_FOUND,
    message: "user not found",
  },
  USER_002: {
    code: "USER_002",
    status: HttpStatus.NOT_FOUND,
    message: "user is not applicable to be an inspector",
  },
  USER_003: {
    code: "USER_003",
    status: HttpStatus.NOT_ACCEPTABLE,
    message: "The user is not local",
  },
  USER_004: {
    code: "USER_004",
    status: HttpStatus.CONFLICT,
    message: "There is another user with the same email",
  },
  USER_005: {
    code: "USER_005",
    status: HttpStatus.CONFLICT,
    message: "There is another user with the same username",
  },
};
