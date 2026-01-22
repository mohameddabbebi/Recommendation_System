package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Add_Rev_Dto {
    private Long productId;
    private String comment ;
    private int rating;
    private String userEmail ;
}
