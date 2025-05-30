package com.taskman.backend.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for displaying card from API response.
 */
public record CardResponseDTO(Long id, String title, String description, Integer position, LocalDateTime updatedAt, LocalDateTime dueDate, Long listId) {
}
