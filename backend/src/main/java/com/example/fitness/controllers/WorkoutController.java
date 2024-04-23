package com.example.fitness.controllers;

import org.hibernate.boot.registry.classloading.spi.ClassLoaderService.Work;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fitness.components.Workout;
import com.example.fitness.repositories.WorkoutRepository;
import com.example.fitness.services.WorkoutService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin
@RestController
@RequestMapping("workout")

public class WorkoutController {

    private final WorkoutService workoutService;
    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutController(WorkoutService workoutService, WorkoutRepository workoutRepository){
        this.workoutRepository = workoutRepository;
        this.workoutService = workoutService;
    }

    @GetMapping
    public List<Workout> getWorkouts(){
        return workoutService.getAllWorkouts();
    }
    
    @PostMapping
    public Workout addWorkout( @RequestBody Workout workout){
        workoutService.addWorkout(workout);
        return workout;

    }

    @DeleteMapping(path="{workoutID}")
    public Workout deleteWorkout(@PathVariable("workoutID") Long workoutID){
        workoutService.deleteWorkout(workoutID);
        Workout wo;
        return wo = workoutRepository.findWorkoutByID(workoutID).orElseThrow(() -> new IllegalStateException("A workout with that ID does not exist."));
    }

    @PutMapping(path="{workoutID}")
    public Workout updateWorkout(@PathVariable("workoutID") Long workoutID, @RequestBody Workout workout) {
        workoutService.updateWorkout(workoutID, workout.getTrainerID(), workout.getWorkoutTitle(), workout.getWorkoutType(), workout.getTargetAudience(), workout.getWorkoutCount(), workout.getWorkoutEstimatedTime(), workout.getWorkoutDescription(), workout.getEquipments(), workout.getCalorieBurnPerUnitTime(), workout.getIntensityLevel());
        return workout;
    }
}