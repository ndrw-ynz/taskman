package com.taskman.backend.dto;

/**
 * Data Transfer Object for creating a new board.
 */
public record BoardCreationDTO(String title, String description) {
}
