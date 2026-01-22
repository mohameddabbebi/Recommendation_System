package com.example.demo.dto;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
public class RecommendationResponseDTO {
    private Long productId;
    private String productName;
    private String description;
    private Double price;
    private String imageUrl;
    private Double Score; // Score de recommandation
    private Double averageRating;
    public String reason; // Pourquoi ce produit est recommandé
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public Double getScore() {
		return Score;
	}
	public void setScore(Double score) {
		Score = score;
	}
	public Double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
    

}
