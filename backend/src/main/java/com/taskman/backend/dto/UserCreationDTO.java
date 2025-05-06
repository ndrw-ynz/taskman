package com.taskman.backend.dto;

import com.taskman.backend.entity.Gender;

import java.time.LocalDate;

/**
 * Data Transfer Object for creating a new user record.
 */
public record UserCreationDTO(String username, String password, String name, LocalDate dateOfBirth, Gender gender) {
}