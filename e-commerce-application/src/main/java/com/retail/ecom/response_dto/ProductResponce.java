package com.retail.ecom.response_dto;

import java.util.List;

import com.retail.ecom.enums.AvailabilityStatus;
import com.retail.ecom.enums.ProductCatagory;
import com.retail.ecom.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponce {
	private int productId;
	private String productName;
	private String productDescription;
	private  long productPrice;
	private int productQuantity;
	private AvailabilityStatus availabilityStatus;
	private ProductCatagory catagory;
	private List<ImageResponce> images;
}
