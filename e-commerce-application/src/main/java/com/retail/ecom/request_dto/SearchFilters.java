package com.retail.ecom.request_dto;

import org.springframework.web.bind.annotation.RequestParam;

import com.retail.ecom.enums.ProductCatagory;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class SearchFilters {
	private int minPrice;
	private int maxPrice;
	private String availability;
	private int rating;
	private int Discount;
	private ProductCatagory category;
}
