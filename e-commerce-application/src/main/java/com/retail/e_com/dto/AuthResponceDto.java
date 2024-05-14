package com.retail.e_com.dto;

import com.retail.e_com.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
public class AuthResponceDto {
	private int userId;
	private String username;
	private long accessExpiration;
	private long refreshExpiration;
	private UserRole userRole;
}
