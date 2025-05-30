package com.taskman.backend.dto;

/**
 * Data Transfer Object for displaying list from API response.
 */
public record ListResponseDTO(Long id, String title, Integer position, Long boardId) {
}
