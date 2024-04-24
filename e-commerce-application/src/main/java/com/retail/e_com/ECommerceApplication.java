package com.retail.e_com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.retail.e_com.serviceimpl.UserServiceImpl;

@SpringBootApplication
public class ECommerceApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
		
	}

}
