package com.taskman.backend.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for creating a new card.
 */
public record CardCreationDTO(String title, String description, LocalDateTime dueDate) {
}
