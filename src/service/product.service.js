import axios from "axios";
import HelperService from "./helper.service";
// import { Config } from "../static/js/config";
// import logger from "./Logger";

export default class ProductService extends HelperService {
  baseUri = `http://qa-srv.dolphinskart.com/item-page-service`;

  SECRET_CORRELATION_ID = "4e6af43b-7127-4ee3-a64c-0530e5f9e831";

  getGiftCardByWebId(productId, dvnId, lang = "en") {
    const customerId = this.getCustomerId();
    const rgs = "PDS_RESPONSE";
    const pdsRgs =
      "PRODUCT_RESPONSE,DVN_RESPONSE,DSKU_RESPONSE,PRICE_RESPONSE,SELLER_RESPONSE,IMAGE_RESPONSE,REVIEWSANDRATINGS_RESPONSE,INVENTORY_RESPONSE";
    const url = `${this.baseUri}/itemPage`;
    const body = {
      defaultItemPageContext: {
        customerId,
        productContexts: {
          dvnId,
          productId,
        },
      },
    };

    const header = {
      lang,
      item_page_client_id: this.SECRET_CORRELATION_ID,
    };
    const params = {
      rgs,
      pdsRgs,
    };
    const config = this.getConfig(params, header);
    delete config.headers.Authorization;
    delete config.headers.audience;

    return axios
      .post(url, body, config)
      .then((response) => {
        //logger.logEvent(logger.EVENTS.PRODUCT_INFO, body);
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getProductByWebId(productId, dvnId, lang = "en") {
    // const customerId = this.getCustomerId();
    const rgs =
      "PDS_RESPONSE,QUESTION_AND_ANSWERS_RESPONSE,REVIEWS_AND_RATINGS_RESPONSE,RELATED_PRODUCTS_RESPONSE,COMPARE_WITH_SIMILAR_ITEMS_RESPONSE,BANK_OFFERS_RESPONSE";
    const pdsRgs =
      "PRODUCT_RESPONSE,DVN_RESPONSE,DSKU_RESPONSE,PRICE_RESPONSE,SELLER_RESPONSE,IMAGE_RESPONSE,REVIEWSANDRATINGS_RESPONSE,INVENTORY_RESPONSE,SHIPPINGOPTIONS_RESPONSE";
    const url = `${this.baseUri}/itemPage`;
    const body = {
      defaultItemPageContext: {
        // customerId,
        productContexts: {
          dvnId,
          productId,
        },
      },
    };

    const header = {
      lang,
      item_page_client_id: this.SECRET_CORRELATION_ID,
    };
    const params = {
      rgs,
      pdsRgs,
    };
    const config = this.getConfig(params, header);
    delete config.headers.Authorization;
    delete config.headers.audience;

    return axios
      .post(url, body, config)
      .then((response) => {
        //logger.logEvent(logger.EVENTS.PRODUCT_INFO, body);
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  getQuickViewByDvnId(productId, dvnId, lang = "en") {
    const customerId = this.getCustomerId();
    const rgs = "PDS_RESPONSE";
    const pdsRgs =
      "PRODUCT_RESPONSE,DVN_RESPONSE,DSKU_RESPONSE,PRICE_RESPONSE,SELLER_RESPONSE,IMAGE_RESPONSE,REVIEWSANDRATINGS_RESPONSE,INVENTORY_RESPONSE,SHIPPINGOPTIONS_RESPONSE";
    const url = `${this.baseUri}/itemPage`;
    const body = {
      defaultItemPageContext: {
        customerId,
        productContexts: {
          dvnId,
          productId,
        },
      },
    };

    const header = {
      lang,
      item_page_client_id: this.SECRET_CORRELATION_ID,
    };
    const params = {
      rgs,
      pdsRgs,
    };
    const config = this.getConfig(params, header);
    delete config.headers.Authorization;
    delete config.headers.audience;

    return axios
      .post(url, body, config)
      .then((response) => {
        //logger.logEvent(logger.EVENTS.PRODUCT_INFO, body);
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }

  // method      : GET
  // path        : /app/dolphinsvariants/${productId}
  // description : Find DolphinsVariants By ProductId
  // access      : Protected
  getAllDVNIngestionByProductId(productId) {
    const url = `http://34.117.103.93/product-core-service/dolphinsvariants/${productId}`;
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw this.handleErrors(error);
      });
  }
}
