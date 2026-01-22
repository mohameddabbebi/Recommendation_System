package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Long id;
    private Long userId;
	private String userName;
    private Long productId;
	private String imageUrl;
    private String comment;
    private Integer rating;
    private String sentimentScore;
    private Double sentimentConfidence;
    private LocalDateTime createdAt;
}