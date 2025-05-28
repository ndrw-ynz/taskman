package com.taskman.backend.service;

import com.taskman.backend.dto.WorkspaceCreationDTO;
import com.taskman.backend.dto.WorkspaceResponseDTO;
import com.taskman.backend.dto.WorkspaceUpdateDTO;
import com.taskman.backend.entity.User;
import com.taskman.backend.entity.Workspace;
import com.taskman.backend.mapper.WorkspaceMapper;
import com.taskman.backend.repository.UserRepository;
import com.taskman.backend.repository.WorkspaceRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class that handles business logic related to fetching,
 * creating, updating, and deleting workspaces.
 */
@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final WorkspaceMapper workspaceMapper;
    private final UserRepository userRepository;

    @Autowired
    public WorkspaceService(WorkspaceRepository workspaceRepository, WorkspaceMapper workspaceMapper, UserRepository userRepository) {
        this.workspaceRepository = workspaceRepository;
        this.workspaceMapper = workspaceMapper;
        this.userRepository = userRepository;
    }

    /**
     * Fetches a workspace by its id.
     *
     * @param workspaceId The id of the workspace.
     * @return The WorkspaceResponseDTO of the fetched workspace.
     * @throws EntityNotFoundException if workspace is not found.
     */
    public WorkspaceResponseDTO getWorkspace(Long workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("No workspace with id " + workspaceId));
        return workspaceMapper.toResponse(workspace);
    }

    /**
     * Fetches the list of all workspaces associated with
     * the provided user id.
     *
     * @param ownerId The user id of the owner.
     * @return The list of WorkspaceResponseDTOs that belong to the owner.
     */
    public List<WorkspaceResponseDTO> getAllWorkspaceByUserId(Long ownerId) {
        List<Workspace> workspaces = workspaceRepository.findAllByOwnerId(ownerId);
        return workspaces.stream().map(workspaceMapper::toResponse).collect(Collectors.toList());
    }

    /**
     * Creates a new workspace with the provided workspace details
     * and workspace id.
     *
     * @param workspaceCreationDTO The details of the new workspace.
     * @param ownerId The id of the owner of the new workspace.
     * @return The WorkspaceResponseDTO of the newly created workspace.
     * @throws EntityNotFoundException if the provided user id is not found.
     */
    @Transactional
    public WorkspaceResponseDTO createWorkspace(WorkspaceCreationDTO workspaceCreationDTO, Long ownerId) {
        User user = userRepository.findById(ownerId).orElseThrow(() -> new EntityNotFoundException("No user with id " + ownerId));
        Workspace newWorkspace = workspaceMapper.toEntity(workspaceCreationDTO, user);
        Workspace createdWorkspace = workspaceRepository.save(newWorkspace);
        return workspaceMapper.toResponse(createdWorkspace);
    }

    /**
     * Partially updates a workspaces' details.
     *
     * @param workspaceUpdateDTO The updated details of the workspace.
     * @param workspaceId The id of the workspace.
     * @param ownerId The user id of the workspaces' owner.
     * @return The WorkspaceResponseDTO of the updated workspace.
     * @throws EntityNotFoundException if workspace is not found.
     * @throws AccessDeniedException if the provided user does not own the workspace.
     */
    @Transactional
    public WorkspaceResponseDTO updateWorkspace(WorkspaceUpdateDTO workspaceUpdateDTO, Long workspaceId, Long ownerId) {
        Workspace updatedWorkspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("No workspace with id " + workspaceId));

        if (!updatedWorkspace.getOwner().getId().equals(ownerId)) {
            throw new AccessDeniedException("You don't own this workspace.");
        }

        workspaceMapper.updateWorkspace(workspaceUpdateDTO, updatedWorkspace);
        workspaceRepository.save(updatedWorkspace);
        return workspaceMapper.toResponse(updatedWorkspace);
    }

    /**
     * Deletes a workspace by ID.
     *
     * @param workspaceId The id of the workspace.
     * @param ownerId The user id of the workspaces' owner.
     * @throws EntityNotFoundException if workspace is not found.
     * @throws AccessDeniedException if the provided user does not own the workspace.
     */
    @Transactional
    public void deleteWorkspace(Long workspaceId, Long ownerId) {
        Workspace workspace = workspaceRepository.findById(workspaceId).orElseThrow(() -> new EntityNotFoundException("No workspace with id " + workspaceId));

        if (!workspace.getOwner().getId().equals(ownerId)) {
            throw new AccessDeniedException("You don't own this workspace.");
        }

        workspaceRepository.deleteById(workspaceId);
    }
}
