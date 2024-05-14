package com.retail.ecom.entity;

import com.retail.ecom.enums.OrderStatus;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderId;
	private int selectedQuantity;
	private int totalPrice;
	private int discountPrice;
	private int totalPayableAmount;
	private OrderStatus orderStatus;
	@ManyToOne
	private Address address;
	@ManyToOne
	private Product product;
}
