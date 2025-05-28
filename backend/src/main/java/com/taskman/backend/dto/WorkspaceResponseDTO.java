package com.taskman.backend.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for displaying workspace from API response.
 */
public record WorkspaceResponseDTO(Long id, String name, String description, LocalDateTime createdAt, Long ownerId) {
}
