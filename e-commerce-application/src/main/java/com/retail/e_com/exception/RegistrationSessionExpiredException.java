package com.retail.e_com.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegistrationSessionExpiredException extends RuntimeException{
	private String error;
}
