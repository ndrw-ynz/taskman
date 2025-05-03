package com.taskman.backend.dto;

import com.taskman.backend.entity.Gender;

/**
 * Data Transfer Object for updating a user record.
 */
public record UserUpdateDTO(String username, String name, Gender gender) {
}
