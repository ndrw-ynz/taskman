package com.taskman.backend.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for updating a card.
 */
public record CardUpdateDTO(String title, String description, Integer position, LocalDateTime dueDate) {
}
