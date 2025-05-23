package com.taskman.backend.service;

import com.taskman.backend.dto.UserCreationDTO;
import com.taskman.backend.dto.UserResponseDTO;
import com.taskman.backend.dto.UserUpdateDTO;
import com.taskman.backend.entity.User;
import com.taskman.backend.mapper.UserMapper;
import com.taskman.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class that handles user-related business logic.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Fetches a user by its ID.
     *
     * @param id The id of the user.
     * @return The UserResponseDTO of the fetched user account.
     * @throws EntityNotFoundException if user is not found.
     */
    public UserResponseDTO getUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No user with id " + id));
        return userMapper.toResponse(user);
    }

    /**
     * Fetches the list of all users.
     *
     * @return The list of UserResponseDTOs of all user accounts.
     */
    public List<UserResponseDTO> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toResponse).collect(Collectors.toList());
    }

    /**
     * Creates a new user record with the provided
     * user details.
     *
     * @param userCreationDTO The details of the new user account.
     * @return The UserResponseDTO of the new user account.
     */
    @Transactional
    public UserResponseDTO createUser(UserCreationDTO userCreationDTO) {
        User newUser = userMapper.toEntity(userCreationDTO);
        newUser.setHashPassword(passwordEncoder.encode(userCreationDTO.password()));

        User savedUser = userRepository.save(newUser);
        return userMapper.toResponse(savedUser);
    }

    /**
     * Partially updates a user's data.
     *
     * @param id The id of the user.
     * @param userUpdateDTO The updated details of the user.
     * @return The UserResponseDTO of the updated user account.
     */
    @Transactional
    public UserResponseDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        User user = userMapper.toEntity(userUpdateDTO);
        User updatedUser = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("No user with id " + id));
        updatedUser.setUsername(user.getUsername());
        updatedUser.setName(user.getName());
        updatedUser.setGender(user.getGender());

        userRepository.save(updatedUser);
        return userMapper.toResponse(updatedUser);
    }

    /**
     * Deletes a user by ID.
     *
     * @param id The id of the user.
     */
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("No user with id " + id);
        }
        userRepository.deleteById(id);
    }
}
