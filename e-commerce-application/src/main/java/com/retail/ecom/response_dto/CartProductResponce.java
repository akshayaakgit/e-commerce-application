package com.retail.ecom.response_dto;

import com.retail.ecom.entity.Product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Builder
public class CartProductResponce {
	private int cartProductId;
	private int selectedQuantity;
	private Product product;
}
