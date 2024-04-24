package com.retail.e_com.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserAlreadyExistByEmailException extends RuntimeException {
	private String error;
}
