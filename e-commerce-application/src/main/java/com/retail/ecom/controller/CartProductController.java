package com.retail.ecom.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retail.ecom.request_dto.ProductRequest;
import com.retail.ecom.response_dto.AddressResponse;
import com.retail.ecom.response_dto.CartProductResponce;
import com.retail.ecom.response_dto.ProductResponse;
import com.retail.ecom.service.CartProductService;
import com.retail.ecom.service.ProductService;
import com.retail.ecom.utility.ResponseStructure;
import com.retail.ecom.utility.SimpleResponseStructure;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
@AllArgsConstructor
public class CartProductController {
	private CartProductService cartProductService;

	@PostMapping("/products/{productId}/cartproducts/{selectedQuantity}")
	public ResponseEntity<SimpleResponseStructure> addCartProduct(@PathVariable int productId,
			@PathVariable int selectedQuantity) {
		return cartProductService.addCartProduct(productId, selectedQuantity);
	}

	@GetMapping("/customer/cartproducts")
	public ResponseEntity<ResponseStructure<CartProductResponce>> getCartProduct() {
		return cartProductService.getCartProduct();
	}
}
