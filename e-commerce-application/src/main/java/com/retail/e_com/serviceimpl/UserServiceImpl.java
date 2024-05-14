package com.retail.e_com.serviceimpl;

import java.time.Duration;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import com.retail.e_com.cache.CacheStore;
import com.retail.e_com.dto.AuthRequest;
import com.retail.e_com.dto.AuthResponceDto;
import com.retail.e_com.dto.OtpRequest;
import com.retail.e_com.dto.UserRequestDto;
import com.retail.e_com.dto.UserResponceDto;
import com.retail.e_com.entity.User;
import com.retail.e_com.entity.Seller;
import com.retail.e_com.entity.AccessToken;
import com.retail.e_com.entity.Customer;
import com.retail.e_com.entity.RefreshToken;
import com.retail.e_com.mail_service.MailService;
import com.retail.e_com.repository.AccessTokenRepo;
import com.retail.e_com.repository.RefreshTokenRepo;
import com.retail.e_com.repository.UserRepository;
import com.retail.e_com.security.SecurityConfig;
import com.retail.e_com.service.UserService;
import com.retail.e_com.util.MessageModel;
import com.retail.e_com.util.ResponseStructure;
import com.retail.e_com.util.SimpleResponseStructure;
import com.retail.e_com.enums.UserRole;
import com.retail.e_com.exception.InvalidCredentialsException;
import com.retail.e_com.exception.InvalidOTPException;
import com.retail.e_com.exception.InvalidUserRoleSpecifiedException;
import com.retail.e_com.exception.OTPExpiredException;
import com.retail.e_com.exception.RegistrationSessionExpiredException;
import com.retail.e_com.exception.UserAlreadyExistByEmailException;
import com.retail.e_com.jwt.JwtService;

import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;

@Service
public class UserServiceImpl implements UserService {
//	private UserRepository userRepository;
//	private CacheStore<String> otpCache;
//	private ResponseStructure<UserResponceDto> responseStructure;
//	private MailService mailService;
//	private CacheStore<User> userCache;

	private UserRepository userRepository;
	private CacheStore<String> otpCache;
	private CacheStore<User> userCache;
	private ResponseStructure<UserResponceDto> responseStructure;
	private ResponseStructure<AuthResponceDto> responseStructure1;
	private SimpleResponseStructure simpleResponseStructure2;
	private MailService mailService;
	private AuthenticationManager authenticationManager;
	private JwtService jwtService;
	private AccessTokenRepo accessTokenRepo;
	private RefreshTokenRepo refreshTokenRepo;
    private PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepository, CacheStore<String> otpCache, CacheStore<User> userCache,
			ResponseStructure<UserResponceDto> responseStructure, ResponseStructure<AuthResponceDto> responseStructure1,
			SimpleResponseStructure simpleResponseStructure2, MailService mailService,
			AuthenticationManager authenticationManager, JwtService jwtService, AccessTokenRepo accessTokenRepo,
			RefreshTokenRepo refreshTokenRepo, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.otpCache = otpCache;
		this.userCache = userCache;
		this.responseStructure = responseStructure;
		this.responseStructure1 = responseStructure1;
		this.simpleResponseStructure2 = simpleResponseStructure2;
		this.mailService = mailService;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		this.accessTokenRepo = accessTokenRepo;
		this.refreshTokenRepo = refreshTokenRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@Value("${myapp.jwt.access.expiration}")
	private long accessExpiration;
	@Value("${myapp.jwt.refresh.expiration}")
	private long refreshExpiration;

	private <T extends User> T mapToChildEntity(UserRequestDto userRequestEntity) {
		UserRole userRole = userRequestEntity.getUserRole();
		User user;
		switch (userRole) {
		case SELLER:
			user = new Seller();
			break;
		case CUSTOMER:
			user = new Customer();
			break;
		default:
			throw new InvalidUserRoleSpecifiedException("User Role Not Specified");
		}

		user.setDisplayName(userRequestEntity.getDisplayName());
		user.setEmail(userRequestEntity.getEmail());
		user.setPassword(userRequestEntity.getPassword());
		user.setUsername(userRequestEntity.getEmail().split("@gmail.com")[0]);
		user.setUserRole(userRequestEntity.getUserRole());
		user.setDeleted(false);
		user.setEmailVerified(false);
		return (T) user;
	}

	private UserResponceDto mapToUserResponse(User user) {
		return UserResponceDto.builder().displayName(user.getDisplayName()).email(user.getEmail())
				.userId(user.getUserId()).username(user.getUsername()).userRole(user.getUserRole())
				.isEmailVerified(user.isEmailVerified()).build();

	}

	private String generateOTP() {
		// return String.valueOf(new Random().nextInt(100000L, 999999L));
		Random random = new Random();
		long min = 100000L;
		long max = 999999L;
		long range = max - min + 1;
		long randomNumber = (long) (random.nextDouble() * range) + min;
		return String.valueOf(randomNumber);
	}

	private void sendOTP(User user, String otp) throws MessagingException {
		MessageModel model = MessageModel.builder().to(user.getEmail()).subject("OTP Verification")
				.text("<p> Hi, <br>" + "Thanks for your intrest in E-com,"
						+ "Please Verify your mail Id using the OTP Given below.</p>" + "<br>" + "<h1>" + otp + "</h1>"
						+ "<br>" + "Please ignore if its not you" + "<br>" + "with best regards"
						+ "<h3>E-Com-Service</h3>"
						+ "<img src='https://entrackr.com/storage/2020/03/flipkart-grocery-image.jpg'/>")
				.build();

		mailService.sendMailMessage(model);
	}

	@Override
	public ResponseEntity<SimpleResponseStructure> registerUsers(UserRequestDto userRequestEntity) {

		if (userRepository.existsByEmail(userRequestEntity.getEmail()))
			throw new UserAlreadyExistByEmailException("user already exist");

		User user = mapToChildEntity(userRequestEntity);
		String otp = generateOTP();
		otpCache.add(userRequestEntity.getEmail(), otp);
		userCache.add(userRequestEntity.getEmail(), user);
		try {
			sendOTP(user, otp);
		} catch (MessagingException e) {
			throw new InvalidUserRoleSpecifiedException("Invalid Email");
		}

		return ResponseEntity.ok(simpleResponseStructure2.setStatus(HttpStatus.ACCEPTED.value())
				.setMessage("verify the mail to complite the registration ," + otp + " OTP  expaires in 1 minute"));

	}

	@Override
	public ResponseEntity<ResponseStructure<UserResponceDto>> verifyOTP(OtpRequest otpRequest) {

		if (otpCache.get(otpRequest.getEmail()) == null)
			throw new OTPExpiredException("OTP Expired");
		if (!otpCache.get(otpRequest.getEmail()).equals(otpRequest.getOtp()))
			throw new InvalidOTPException("OTP Invalid");

		User user = userCache.get(otpRequest.getEmail());
		if (user == null)
			throw new RegistrationSessionExpiredException("Session Expired ");
		user.setEmailVerified(true);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User use=userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseStructure.setData(mapToUserResponse(use))
				.setMessage("Successfull").setStatus(HttpStatus.CREATED.value()));
	}

	@Override
	public ResponseEntity<ResponseStructure<AuthResponceDto>> login(AuthRequest authRequest) {
		String userName = authRequest.getUserName().split("@gmail.com")[0];
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userName, authRequest.getPassword()));
		if (!authentication.isAuthenticated())
			throw new InvalidCredentialsException("username password not correct");
		SecurityContextHolder.getContext().setAuthentication(authentication);
		HttpHeaders headers = new HttpHeaders();

		return userRepository.findByUsername(userName).map(user -> {
			generateAccessToken(user, headers);
			generateRefreshToken(user, headers);
			return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers)
					.body(responseStructure1.setData(mapToAuthResponse(user)).setMessage("Authentication suceesful")
							.setStatus(HttpStatus.OK.value()));
		}).get();
	}

	private AuthResponceDto mapToAuthResponse(User user) {
		return AuthResponceDto.builder().userId(user.getUserId()).username(user.getUsername())
				.userRole(user.getUserRole()).accessExpiration(accessExpiration).refreshExpiration(refreshExpiration).build();
	}

	private void generateRefreshToken(User user, HttpHeaders headers) {
		String token = jwtService.generateRefreshToken(user.getUsername(),user.getUserRole().name());
		headers.add(HttpHeaders.SET_COOKIE, configureCookie("rt", token, refreshExpiration));
		// store the token to the database
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setToken(token);
		refreshToken.setBlocked(false);
		refreshTokenRepo.save(refreshToken);

	}

	private String configureCookie(String name, String value, long maxAge) {
		return ResponseCookie.from(name, value).domain("localhost").path("/").httpOnly(true).secure(false)
				.maxAge(Duration.ofMillis(maxAge)).sameSite("Lax").build().toString();
	}

	private void generateAccessToken(User user, HttpHeaders headers) {
		String token = jwtService.generateAccessToken(user.getUsername(),user.getUserRole().name());
		headers.add(HttpHeaders.SET_COOKIE, configureCookie("at", token, accessExpiration));
		AccessToken accessToken = new AccessToken();
		accessToken.setToken(token);
		accessToken.setBlocked(false);
		accessTokenRepo.save(accessToken);
	}
}
