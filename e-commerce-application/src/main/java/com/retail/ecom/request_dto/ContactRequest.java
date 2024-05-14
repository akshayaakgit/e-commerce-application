package com.retail.ecom.request_dto;

import com.retail.ecom.enums.Priority;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ContactRequest {
	private String name;
	private long phoneNumber;
	private String email;
	private Priority priority;
}
