package com.taskman.backend.mapper;

import com.taskman.backend.dto.WorkspaceCreationDTO;
import com.taskman.backend.dto.WorkspaceResponseDTO;
import com.taskman.backend.dto.WorkspaceUpdateDTO;
import com.taskman.backend.entity.User;
import com.taskman.backend.entity.Workspace;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * Maps between Workspace entity and related DTOs.
 */
@Component
public class WorkspaceMapper {

    /**
     * Converts a WorkspaceCreationDTO to a Workspace entity (partial).
     *
     * @param workspaceCreationDTO The workspace creation data.
     * @param owner The owner of the workspace.
     * @return Workspace entity with fields from creation data.
     */
    public Workspace toEntity(WorkspaceCreationDTO workspaceCreationDTO, User owner) {
        return new Workspace(
                null,
                workspaceCreationDTO.name(),
                workspaceCreationDTO.description(),
                LocalDateTime.now(),
                owner,
                new ArrayList<>()
        );
    }

    /**
     * Updates a Workspace entity with updated fields from WorkspaceUpdateDTO.
     *
     * @param workspaceUpdateDTO The updated workspace data.
     * @param workspace The workspace to be updated.
     */
    public void updateWorkspace(WorkspaceUpdateDTO workspaceUpdateDTO, Workspace workspace) {
        String name = workspaceUpdateDTO.name();
        if (name != null) {
            workspace.setName(name);
        }

        String description = workspaceUpdateDTO.description();
        if (description != null) {
            workspace.setDescription(description);
        }
    }

    /**
     * Converts a Workspace entity to a WorkspaceResponseDTO
     *
     * @param workspace The workspace entity.
     * @return The DTO representation.
     */
    public WorkspaceResponseDTO toResponse(Workspace workspace) {
        return new WorkspaceResponseDTO(
                workspace.getId(),
                workspace.getName(),
                workspace.getDescription(),
                workspace.getCreatedAt(),
                workspace.getOwner().getId()
        );
    }
}
