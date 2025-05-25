package com.taskman.backend.controller;

import com.taskman.backend.dto.ListCreationDTO;
import com.taskman.backend.dto.ListResponseDTO;
import com.taskman.backend.dto.ListUpdateDTO;
import com.taskman.backend.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing lists.
 * Exposes endpoints for fetching, retrieving, updating, and deleting lists.
 */
@RestController
@RequestMapping(path = "/taskman/api/lists")
public class ListController {

    private final ListService listService;

    @Autowired
    public ListController(ListService listService) {
        this.listService = listService;
    }

    /**
     * Retrieves a list by its id.
     *
     * @param listId The id of the list to retrieve.
     * @return The list if found.
     */
    @GetMapping("/{listId}")
    public ResponseEntity<ListResponseDTO> getList(@PathVariable Long listId) {
        return ResponseEntity.ok(listService.getList(listId));
    }

    /**
     * Retrieves the list of all lists associated
     * with the provided boardId.
     *
     * @param boardId The id of the board.
     * @return The list of all lists associated with the provided boardId.
     */
    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<ListResponseDTO>> getAllListsByBoardId(@PathVariable Long boardId) {
        return ResponseEntity.ok(listService.getAllListsByBoard(boardId));
    }

    /**
     * Creates a new list.
     *
     * @param listCreationDTO The details of the new list.
     * @return The details of the newly created list.
     */
    @PostMapping
    public ResponseEntity<ListResponseDTO> createList(@RequestBody ListCreationDTO listCreationDTO) {
        ListResponseDTO createdBoard = listService.createList(listCreationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }

    /**
     * Updates the details of the list.
     *
     * @param listUpdateDTO The updated details for the list.
     * @param listId The id of the list to be updated.
     * @return The details of the updated list.
     */
    @PatchMapping("/{listId}")
    public ResponseEntity<ListResponseDTO> updateList(@RequestBody ListUpdateDTO listUpdateDTO, @PathVariable Long listId) {
        ListResponseDTO updatedBoard = listService.updateList(listUpdateDTO, listId);
        return ResponseEntity.ok(updatedBoard);
    }

    /**
     * Updates the position of a list.
     *
     * @param listUpdateDTO The updated details for the list.
     * @param listId The id of the list to be updated.
     * @return The details of the updated list.
     */
    @PatchMapping("/position/{listId}")
    public ResponseEntity<Void> updateListPosition(@RequestBody ListUpdateDTO listUpdateDTO, @PathVariable Long listId) {
        listService.updateListPosition(listId, listUpdateDTO.position());
        return ResponseEntity.noContent().build();
    }

    /**
     * Deletes a list by its id.
     *
     * @param listId The id of the list to be deleted.
     * @return {@code 204 No Content} if deletion is successful.
     */
    @DeleteMapping("/{listId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long listId) {
        listService.deleteList(listId);
        return ResponseEntity.noContent().build();
    }
}
