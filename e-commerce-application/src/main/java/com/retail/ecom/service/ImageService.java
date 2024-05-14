package com.retail.ecom.service;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.retail.ecom.utility.SimpleResponseStructure;

public interface ImageService {

	ResponseEntity<SimpleResponseStructure> addImage(int productId, String imageType, MultipartFile images) throws IOException;

	ResponseEntity<byte[]> getImage(String imageId);

}
