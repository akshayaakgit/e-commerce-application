package com.retail.e_com.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class OTPExpiredException extends RuntimeException {
	private String error;
}
