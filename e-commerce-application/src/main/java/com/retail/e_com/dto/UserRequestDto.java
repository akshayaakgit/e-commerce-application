package com.retail.e_com.dto;

import com.retail.e_com.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserRequestDto {
	private String displayName;

	private String email;

	private String password;
	private UserRole userRole;
}
