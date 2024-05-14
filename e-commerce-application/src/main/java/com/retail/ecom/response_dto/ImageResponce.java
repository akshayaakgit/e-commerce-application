package com.retail.ecom.response_dto;

import java.util.List;

import com.retail.ecom.enums.AvailabilityStatus;
import com.retail.ecom.enums.ImageType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageResponce {
	private int imageId;
	private String image;
	private ImageType imageType;
}
