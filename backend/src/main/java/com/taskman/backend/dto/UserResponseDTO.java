package com.taskman.backend.dto;

import com.taskman.backend.entity.Gender;

import java.time.LocalDate;

/**
 * Data Transfer Object for displaying user from API response.
 */
public record UserResponseDTO(Long id, String username, String name, LocalDate dateOfBirth, Gender gender) {
}
