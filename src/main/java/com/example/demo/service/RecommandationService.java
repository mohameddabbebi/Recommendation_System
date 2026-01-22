package com.example.demo.service;

import java.util.*;
import com.example.demo.dto.*;
import org.springframework.cache.annotation.Cacheable;

public interface RecommandationService {
	List<RecommendationResponseDTO> getRecommendations(Long userId , Long limit);
    List<RecommendationResponseDTO> getSimilarProducts(Long productId, Integer limit);
    List<RecommendationResponseDTO> getTrendingProducts(Integer limit);

    @Cacheable(value = "recommendations", key = "#userId + '_' + #limit")
    List<RecommendationResponseDTO> getRecommendations(Long userId, Integer limit);
}
