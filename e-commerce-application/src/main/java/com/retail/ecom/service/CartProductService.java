package com.retail.ecom.service;

import org.springframework.http.ResponseEntity;

import com.retail.ecom.response_dto.CartProductResponce;
import com.retail.ecom.utility.ResponseStructure;
import com.retail.ecom.utility.SimpleResponseStructure;

public interface CartProductService {

	ResponseEntity<SimpleResponseStructure> addCartProduct(int productId, int selectedQuantity);

	ResponseEntity<ResponseStructure<CartProductResponce>> getCartProduct();

}
