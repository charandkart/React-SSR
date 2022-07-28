const store = {
  getState: () => ({
    user: {},
    cart: {},
  }),
};
import axios from "axios";

export class HelperService {
  constructor() {
    this.errors = {
      HTTP_500: "INTERNAL_SERVER_ERROR",
      HTTP_400: "BAD_REQUEST",
      HTTP_401: "UNAUTHORIZED",
      HTTP_403: "FORBIDEN_ACCESS",
      HTTP_505: "INTERNAL_SERVER_ERROR",
      DEFAULT: "SOMETHING_WENT_WRONG",
    };
  }
  debugStatus = true;

  getConfig(params = null, headers = null) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const config = {};
    config.headers = {
      "Content-Type": "application/json",
      // audience: this.getAudience(),
      // Authorization: `Bearer ${this.getToken()}`,
      cancelToken: source.token,
    };
    if (headers) config.headers = { ...config.headers, ...headers };
    if (params) config.params = params;

    return config;
  }

  getCustomerId() {
    return store?.getState()?.user?.customerId;
  }
  getToken() {
    return store?.getState()?.user?.token;
  }
  getEmailId() {
    return store?.getState().user?.email;
  }
  getCartId() {
    return store?.getState().cart?.cartId;
  }
  getCheckoutCartId() {
    return store.getState().cart?.checkoutCartId;
  }
  getAudience() {
    return `http://dolphinskart.com`;
  }

  handleResponse(response, toast = false, message = "") {
    // this.log(response);
    if (toast) {
      // store.dispatch(
      //   toastMessage({
      //     severity: "success",
      //     summary: message,
      //   })
      // );
    }
    return response;
  }
  handleErrors(error, toast = false) {
    let message = "";
    switch (error.response?.status) {
      case 400:
        message = this.errors.HTTP_400;
        break;
      case 401:
        message = this.errors.HTTP_401;
        break;
      case 403:
        message = this.errors.HTTP_403;
        break;
      case 500:
        message = this.errors.HTTP_500;
        break;
      case 505:
        message = this.errors.HTTP_505;
        break;
      default:
        message = this.errors.DEFAULT;
        break;
    }

    let errorStatus = error.response?.status;
    let errorCode = error.response?.data?.errorCode;
    let errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.response?.message ||
      error.message;

    const errorPayload = {
      timestamp: new Date(),
      errorStatus,
      errorCode,
      errorMessage,
      message,
      original: error.response,
    };

    if (process.env.NODE_ENV !== "production" && this.debugStatus)
      this.handleResponse(errorPayload);

    // store.dispatch(
    //   errorMessageAction(JSON.stringify(errorMessage).slice(1, -1))
    // );
    if (toast) {
      // store.dispatch(
      //   toastMessage({
      //     severity: "error",
      //     summary: JSON.stringify(errorMessage).slice(1, -1),
      //   })
      // );
    }
    return errorMessage;
  }

  logAnalytics(analytics) {
    // this.handleResponse(analytics);
    // store.dispatch(logEventAction(analytics));
  }
}

export default HelperService;
