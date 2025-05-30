package com.taskman.backend.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for displaying board from API response.
 */
public record BoardResponseDTO(Long id, String title, String description, LocalDateTime createdAt, LocalDateTime updatedAt, Long workspaceId) {
}
