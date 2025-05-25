package com.taskman.backend.dto;

/**
 * Data Transfer Object for creating a new list.
 */
public record ListCreationDTO(String title, Long boardId) {
}
