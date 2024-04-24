package com.retail.e_com.entity;

import com.retail.e_com.enums.UserRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;

	private String username;

	private String displayName;

	private String email;

	private String password;
	@Enumerated(EnumType.STRING)
	private UserRole userRole;

	private boolean isEmailVerified;

	private boolean isDeleted;
//	@OneToMany
//	private AccessToken accessToken;
//	@OneToMany
//	private RefreshToken refreshToken;
}
