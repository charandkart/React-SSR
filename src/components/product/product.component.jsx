import React, { useState } from 'react'
import ProductService from '../../service/product.service'
import PropTypes from 'prop-types'
import {Button} from "primereact/button";

export const Product = (props) => {
const [products, setProducts] = useState(props.staticContext  || null)

  return (
    <div>
      

<Button label='test'/>

       
        <pre>
          {
            JSON.stringify(props.staticContext, null, 2)
          }
        </pre>
      
    </div>
  )
}

Product.prototype = {
    data: PropTypes.object
}

// Static method
Product.fetchData = async (path_variables, query_params) => {
  
  try {
      const {productId, dvnId} = path_variables || "";
        const productService = new  ProductService()
        const response = await productService.getProductByWebId(productId, dvnId)
        
        return response.data

    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        return null
    }
}

export default Product