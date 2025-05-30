package com.taskman.backend.dto;

/**
 * Data Transfer Object for creating a new workspace.
 */
public record WorkspaceCreationDTO(String name, String description) {
}
