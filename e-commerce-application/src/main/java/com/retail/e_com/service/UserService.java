package com.retail.e_com.service;

import org.springframework.http.ResponseEntity;

import com.retail.e_com.dto.AuthRequest;
import com.retail.e_com.dto.AuthResponceDto;
import com.retail.e_com.dto.OtpRequest;
import com.retail.e_com.dto.UserRequestDto;
import com.retail.e_com.dto.UserResponceDto;
import com.retail.e_com.util.ResponseStructure;
import com.retail.e_com.util.SimpleResponseStructure;

public interface UserService {

	ResponseEntity<SimpleResponseStructure> registerUsers(UserRequestDto userRequestDto);

	ResponseEntity<ResponseStructure<UserResponceDto>> verifyOTP(OtpRequest otp);

	ResponseEntity<ResponseStructure<AuthResponceDto>> login(AuthRequest authRequest);

}
