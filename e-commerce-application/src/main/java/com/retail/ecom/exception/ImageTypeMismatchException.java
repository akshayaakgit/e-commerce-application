package com.retail.ecom.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ImageTypeMismatchException extends RuntimeException {
	private String msg;
}
