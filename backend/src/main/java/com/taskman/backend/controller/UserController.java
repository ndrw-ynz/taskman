package com.taskman.backend.controller;

import com.taskman.backend.dto.UserCreationDTO;
import com.taskman.backend.dto.UserResponseDTO;
import com.taskman.backend.dto.UserUpdateDTO;
import com.taskman.backend.mapper.UserMapper;
import com.taskman.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing users.
 * Exposes endpoints for fetching, retrieving, updating, and deleting user records.
 */
@RestController
@RequestMapping(path = "/taskman/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @Autowired
    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    /**
     * Retrieves a user by id
     * @param id The id of the user to retrieve.
     * @return The user if found, or 404 if not.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(this.userService.getUser(id));
    }

    /**
     * Retrieves the list of all users.
     * @return The list of all users.
     */
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAllUsers());
    }

    /**
     * Creates a new user record.
     * @param userCreationDTO The account creation details of the user.
     * @return The newly created user record.
     */
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserCreationDTO userCreationDTO) {
        UserResponseDTO createdUser = userService.createUser(userMapper.toEntity(userCreationDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * Updates the personal details of the user.
     * @param id The id of the user to be updated.
     * @param userUpdateDTO The updated details of the user.
     * @return The updated user record.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO userUpdateDTO) {
        UserResponseDTO updatedUser = userService.updateUser(id, userMapper.toEntity(userUpdateDTO));
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * Deletes a user by ID.
     * @param id The id of the user to be deleted.
     * @return 204 No Content if deletion is successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
