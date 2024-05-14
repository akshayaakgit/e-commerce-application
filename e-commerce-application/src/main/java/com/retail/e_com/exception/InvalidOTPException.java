package com.retail.e_com.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidOTPException extends RuntimeException {
	private String error;
}
