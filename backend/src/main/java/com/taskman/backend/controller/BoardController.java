package com.taskman.backend.controller;

import com.taskman.backend.dto.BoardCreationDTO;
import com.taskman.backend.dto.BoardResponseDTO;
import com.taskman.backend.dto.BoardUpdateDTO;
import com.taskman.backend.security.CustomUserDetails;
import com.taskman.backend.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing boards.
 * Exposes endpoints for fetching, retrieving, updating, and deleting boards.
 */
@RestController
@RequestMapping(path = "/taskman/api/boards")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    /**
     * Retrieves a board by its id.
     *
     * @param boardId The id of the board to retrieve.
     * @return The board if found.
     */
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardResponseDTO> getBoard(@PathVariable Long boardId) {
        return ResponseEntity.ok(boardService.getBoard(boardId));
    }

    /**
     * Retrieves the list of all boards.
     *
     * @return The list of all boards.
     */
    @GetMapping
    public ResponseEntity<List<BoardResponseDTO>> getAllBoards() {
        return ResponseEntity.ok(boardService.getAllBoards());
    }

    /**
     * Retrieves the list of all boards associated
     * to the provided user id.
     *
     * @param userId The id of the user.
     * @return The list of all boards associated to the provided user id.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BoardResponseDTO>> getAllBoardsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(boardService.getAllBoardsByUserId(userId));
    }

    /**
     * Creates a new board.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param boardCreationDTO The details for the new board.
     * @return The details of the newly created board.
     */
    @PostMapping
    public ResponseEntity<BoardResponseDTO> createBoard(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody BoardCreationDTO boardCreationDTO) {
        Long ownerId = customUserDetails.getId();
        BoardResponseDTO createdBoard = boardService.createBoard(boardCreationDTO, ownerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }

    /**
     * Updates the details of the board.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param boardUpdateDTO The updated details for the board.
     * @param boardId The id of the board to be updated.
     * @return The details of the updated board.
     */
    @PatchMapping("/{boardId}")
    public ResponseEntity<BoardResponseDTO> updateBoard(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody BoardUpdateDTO boardUpdateDTO, @PathVariable Long boardId) {
        BoardResponseDTO updatedBoard = boardService.updateBoard(boardUpdateDTO, boardId, customUserDetails.getId());
        return ResponseEntity.ok(updatedBoard);
    }

    /**
     * Deletes a board by its id.
     *
     * @param customUserDetails The authenticated user details from the JWT token.
     * @param boardId The id of the board to be deleted.
     * @return {@code 204 No Content} if deletion is successful.
     */
    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long boardId) {
        boardService.deleteBoard(boardId, customUserDetails.getId());
        return ResponseEntity.noContent().build();
    }
}
