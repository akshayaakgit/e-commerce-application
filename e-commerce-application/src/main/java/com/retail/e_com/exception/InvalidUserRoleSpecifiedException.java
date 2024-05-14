package com.retail.e_com.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class InvalidUserRoleSpecifiedException extends RuntimeException {
	private String error;
}
