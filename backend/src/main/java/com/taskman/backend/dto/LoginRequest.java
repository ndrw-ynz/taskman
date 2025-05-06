package com.taskman.backend.dto;

/**
 * Data Transfer Object for login requests.
 */
public record LoginRequest(String username, String password) {
}
