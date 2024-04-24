package com.retail.e_com.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.retail.e_com.dto.AuthRequest;
import com.retail.e_com.dto.AuthResponceDto;
import com.retail.e_com.dto.OtpRequest;
import com.retail.e_com.dto.UserRequestDto;
import com.retail.e_com.dto.UserResponceDto;
import com.retail.e_com.jwt.JwtService;
import com.retail.e_com.service.UserService;
import com.retail.e_com.util.ResponseStructure;
import com.retail.e_com.util.SimpleResponseStructure;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/vl")
@CrossOrigin(origins="http://localhost:5173")
public class UserController {
	private UserService userService;
	private JwtService jwtService;

	@PostMapping("/register")
	private ResponseEntity<SimpleResponseStructure> registerUser(@RequestBody UserRequestDto userRequestDto) {
		return userService.registerUsers(userRequestDto);
	}
//	@GetMapping("/test")
//	private String test() {
//		return jwtService.generateAccessToken("aassd");
//	}
	@PostMapping("/verify-email")
	private ResponseEntity<ResponseStructure<UserResponceDto>> verifyOTP(@RequestBody OtpRequest otp) {
		return userService.verifyOTP(otp);
	}
	@PostMapping("/login")
	private ResponseEntity<ResponseStructure<AuthResponceDto>> login(@RequestBody AuthRequest authRequest) {
		return userService.login(authRequest);
	}
}
