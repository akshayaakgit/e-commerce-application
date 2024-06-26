package com.retail.ecom.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retail.ecom.jwt.JwtService;
import com.retail.ecom.request_dto.AuthRequest;
import com.retail.ecom.request_dto.OtpRequest;
import com.retail.ecom.request_dto.UserRequestEntity;
import com.retail.ecom.response_dto.AuthResponse;
import com.retail.ecom.response_dto.UserResponse;
import com.retail.ecom.service.UserService;
import com.retail.ecom.utility.ResponseStructure;
import com.retail.ecom.utility.SimpleResponseStructure;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/", allowCredentials = "true")
@RequestMapping("/api/v1")
public class UserController {

	private UserService service;
	private JwtService jwtService;

	@PostMapping("/register")
	public ResponseEntity<SimpleResponseStructure> registerUsers(@RequestBody UserRequestEntity userRequestEntity) {
		return service.registerUsers(userRequestEntity);
	}

	@PostMapping("/verify-email")
	public ResponseEntity<ResponseStructure<UserResponse>> verifyOTP(@RequestBody OtpRequest otpRequest) {
		return service.verifyOTP(otpRequest);
	}
//	@GetMapping("/test")
//	public String getToken()
//	{
//		return jwtService.generateRefreshToken();
//	}

	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<AuthResponse>> userLogin(@RequestBody AuthRequest authRequest,
			@CookieValue(name = "at", required = false) String accessToken,
			@CookieValue(name = "rt", required = false) String refreshToken) {
		return service.userLogin(authRequest, accessToken, refreshToken);
	}

	@PostMapping("/logout")
	public ResponseEntity<SimpleResponseStructure> userLogout(
			@CookieValue(name = "at", required = false) String accessToken,
			@CookieValue(name = "rt", required = false) String refreshToken) {
		return service.userLogout(accessToken, refreshToken);
	}

	@PostMapping("/refreshlogin")
	public ResponseEntity<ResponseStructure<AuthResponse>> refreshLogin(
			@CookieValue(name = "at", required = false) String accessToken,
			@CookieValue(name = "rt", required = false) String refreshToken) {
		return service.refreshLogin(accessToken, refreshToken);
	}

}
