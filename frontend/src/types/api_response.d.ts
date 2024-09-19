import { StatusCodes } from "http-status-codes";

enum API_STATUS {
  OK = "OK",
  FAILED = "FAILED",
  ACCESS_DENIED = "ACCES DENIED",
}

type ErrorResponse = {
  data?: object;
  message: string;
  error?: any;
};

type GoodResponse = object;
type DataResponse = ErrorResponse | GoodResponse;

type ErrorParams = {
  data: ErrorResponse;
  message?: string;
};

type ResponseParams = {
  data: object;
  message?: string;
};

type API_RESPONSE_ERROR = {
  DATA: ErrorResponse;
  CODE: StatusCodes;
  STATUS: API_STATUS;
  message?: String;
};
