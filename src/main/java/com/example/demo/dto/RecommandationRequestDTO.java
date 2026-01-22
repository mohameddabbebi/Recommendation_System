package com.example.demo.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
public class RecommandationRequestDTO {
	private long UserId;
	private int limit=10;
	private String category;
	public long getUserId() {
		return UserId;
	}
	public void setUserId(long userId) {
		UserId = userId;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
}
