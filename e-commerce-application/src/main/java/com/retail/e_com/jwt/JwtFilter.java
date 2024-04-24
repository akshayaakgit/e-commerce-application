package com.retail.e_com.jwt;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.retail.e_com.entity.AccessToken;
import com.retail.e_com.repository.AccessTokenRepo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	private AccessTokenRepo accessTokenRepo;
	@Autowired
	private JwtService jwtService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String at = null;
		String rt = null;
		Cookie[] c = request.getCookies();
		if(c!=null) {
		for (Cookie cookie : c) {
			if (cookie.getName().equals("at"))
				at = cookie.getValue();
			if (cookie.getName().equals("rt"))
				rt = cookie.getValue();
		}
		if (at != null && rt != null) {
			if (accessTokenRepo.existsByTokenAndBlocked(at, true)
					&& accessTokenRepo.existsByTokenAndBlocked(rt, true)) {
				throw new RuntimeException();
			}
			String uerName = jwtService.getUserName(at);
			String userRole = jwtService.getUserRole(at);
			if (uerName != null && userRole != null && SecurityContextHolder.getContext().getAuthentication() != null) {
				 UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(uerName, null,
						Collections.singleton(new SimpleGrantedAuthority(userRole)));
				token.setDetails(new WebAuthenticationDetails(request));
				SecurityContextHolder.getContext().setAuthentication(token);
			}
		}
		}
		//JwtException
		//JwtExpiredException
		filterChain.doFilter(request, response);
	}
}
