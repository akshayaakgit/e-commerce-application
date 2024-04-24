package com.retail.e_com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.retail.e_com.entity.AccessToken;

public interface AccessTokenRepo extends JpaRepository<AccessToken, Integer> {


	boolean existsByTokenAndBlocked(String at, boolean b);

}