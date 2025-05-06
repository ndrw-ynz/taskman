package com.taskman.backend.mapper;

import com.taskman.backend.dto.UserCreationDTO;
import com.taskman.backend.dto.UserResponseDTO;
import com.taskman.backend.dto.UserUpdateDTO;
import com.taskman.backend.entity.User;
import org.springframework.stereotype.Component;

/**
 * Maps between User entity and various DTOs.
 */
@Component
public class UserMapper {

    /**
     * Converts a UserCreationDTO to a User entity (partial).
     *
     * @param userCreationDTO The user creation data.
     * @return User object with fields from creation data.
     */
    public User toEntity(UserCreationDTO userCreationDTO) {
        return new User(
                userCreationDTO.username(),
                userCreationDTO.password(),
                userCreationDTO.name(),
                userCreationDTO.dateOfBirth(),
                userCreationDTO.gender()
        );
    }

    /**
     * Converts a UserUpdateDTO to a User entity (partial).
     *
     * @param userUpdateDTO The updated user data.
     * @return User object with updated fields.
     */
    public User toEntity(UserUpdateDTO userUpdateDTO) {
        return new User(
                userUpdateDTO.username(),
                userUpdateDTO.name(),
                userUpdateDTO.gender()
        );
    }

    /**
     * Converts a User entity to a UserResponseDTO
     *
     * @param user The user entity.
     * @return The DTO representation.
     */
    public UserResponseDTO toResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getDateOfBirth(),
                user.getGender()
        );
    }
}
