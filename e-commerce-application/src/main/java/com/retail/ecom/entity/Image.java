package com.retail.ecom.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import com.retail.ecom.enums.ImageType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Document(collection = "image")
@Getter
@Setter
@Builder
public class Image {
	@MongoId
	private String imageId;
	private ImageType imageType;
	private byte[] imageBytes;
    private int productId;
    private String contentType;
}
