package com.example.fitness.requests;

import java.time.LocalDate;

import com.example.fitness.components.Member;

import lombok.Data;

@Data
public class NutrientLogUpdateRequest {
    Long nutrientLogId;
    Member member;
    String nutrientLogType;
    LocalDate nutrientLogDate;
 
}
