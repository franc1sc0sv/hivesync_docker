import { StatusCodes } from "http-status-codes";
import {
  API_RESPONSE_ERROR,
  API_STATUS,
  ErrorResponse,
} from "../types/api_response";

export class API_RESPONSE_ERROR_CLASS {
  DATA: ErrorResponse;
  CODE: StatusCodes;
  STATUS: API_STATUS;
  message?: String;

  constructor({ DATA, CODE, STATUS, message }: API_RESPONSE_ERROR) {
    this.DATA = DATA;
    this.CODE = CODE;
    this.STATUS = STATUS;
    this.message = message;
  }
}
