package com.retail.e_com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.retail.e_com.entity.RefreshToken;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Integer>{

}
