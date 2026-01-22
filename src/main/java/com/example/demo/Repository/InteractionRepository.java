package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.*;

import org.springframework.data.domain.Pageable;
import java.util.*;
@Repository
public interface InteractionRepository extends JpaRepository<Interaction,Long>{
	List<Interaction> findByUserId(Long userId);
    List<Interaction> findByUserIdAndType(Long userId, InteractionType type);
    @Query("SELECT i.product.id, COUNT(i) FROM Interaction i WHERE i.user.id = :userId GROUP BY i.product.id")
    List<Object[]> countInteractionsByProduct(@Param("userId") Long id);
    @Query("SELECT i FROM Interaction i WHERE i.user.id = :userId ORDER BY i.timestamp DESC")
    List<Interaction> findRecentInteractions(@Param("userId") Long userId, Pageable pageable);
}