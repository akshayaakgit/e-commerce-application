package com.retail.e_com.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidCredentialsException extends RuntimeException {
	private String message;
}
