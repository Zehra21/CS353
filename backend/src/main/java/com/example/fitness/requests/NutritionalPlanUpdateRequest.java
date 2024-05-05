package com.example.fitness.requests;

import com.example.fitness.components.User;

import lombok.Data;

@Data
public class NutritionalPlanUpdateRequest {
    Long nutritionalPlanId;
    User member;
    int totalCalorie;

}
