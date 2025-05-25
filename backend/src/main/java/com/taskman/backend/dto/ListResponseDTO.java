package com.taskman.backend.dto;

/**
 * Data Transfer Object for displaying list from API response.
 */
public record ListResponseDTO(String title, Integer position, Long boardId) {
}
