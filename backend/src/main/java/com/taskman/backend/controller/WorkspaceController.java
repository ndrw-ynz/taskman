package com.taskman.backend.controller;

import com.taskman.backend.dto.WorkspaceCreationDTO;
import com.taskman.backend.dto.WorkspaceResponseDTO;
import com.taskman.backend.dto.WorkspaceUpdateDTO;
import com.taskman.backend.security.CustomUserDetails;
import com.taskman.backend.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing workspaces.
 * Exposes endpoints for fetching, retrieving, updating, and deleting workspaces.
 */
@RestController
@RequestMapping(path = "/taskman/api/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    /**
     * Retrieves a workspace by its id.
     *
     * @param workspaceId The id of the workspace to retrieve.
     * @return The workspace if found.
     */
    @GetMapping("/{workspaceId}")
    public ResponseEntity<WorkspaceResponseDTO> getWorkspace(@PathVariable Long workspaceId) {
        return ResponseEntity.ok(workspaceService.getWorkspace(workspaceId));
    }

    /**
     * Retrieves the list of all workspaces.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @return The list of all workspaces associated with the provided user id.
     */
    @GetMapping("/user")
    public ResponseEntity<List<WorkspaceResponseDTO>> getAllWorkspacesByUserId(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long ownerId = customUserDetails.getId();

        return ResponseEntity.ok(workspaceService.getAllWorkspaceByUserId(ownerId));
    }

    /**
     * Creates a new workspace.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param workspaceCreationDTO The details for the new workspace.
     * @return The details of the newly created workspace.
     */
    @PostMapping
    public ResponseEntity<WorkspaceResponseDTO> createWorkspace(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody WorkspaceCreationDTO workspaceCreationDTO) {
        Long ownerId = customUserDetails.getId();

        WorkspaceResponseDTO createdWorkspace = workspaceService.createWorkspace(workspaceCreationDTO, ownerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkspace);
    }

    /**
     * Updates the details of the workspace.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param workspaceUpdateDTO The updated details for the workspace.
     * @param workspaceId The id of the workspace to be updated.
     * @return The details of the updated workspace.
     */
    @PatchMapping("/{workspaceId}")
    public ResponseEntity<WorkspaceResponseDTO> updateWorkspace(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody WorkspaceUpdateDTO workspaceUpdateDTO, @PathVariable Long workspaceId) {
        Long ownerId = customUserDetails.getId();

        WorkspaceResponseDTO updatedWorkspace = workspaceService.updateWorkspace(workspaceUpdateDTO, workspaceId, ownerId);
        return ResponseEntity.ok(updatedWorkspace);
    }

    /**
     * Deletes a workspace by its id.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param workspaceId The id of the workspace to be deleted.
     * @return {@code 204 No Content} if deletion is successful.
     */
    @DeleteMapping("/{workspaceId}")
    public ResponseEntity<Void> deleteWorkspace(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long workspaceId) {
        workspaceService.deleteWorkspace(workspaceId, customUserDetails.getId());
        return ResponseEntity.noContent().build();
    }
}
