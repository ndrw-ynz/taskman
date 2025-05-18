package com.taskman.backend.mapper;

import com.taskman.backend.dto.BoardCreationDTO;
import com.taskman.backend.dto.BoardResponseDTO;
import com.taskman.backend.dto.BoardUpdateDTO;
import com.taskman.backend.entity.Board;
import com.taskman.backend.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * Maps between Board entity and related DTOs.
 */
@Component
public class BoardMapper {

    /**
     * Converts a BoardCreation DTO to a Board entity (partial).
     *
     * @param boardCreationDTO The board creation data.
     * @param owner The user associated with the board.
     * @return Board entity with fields from creation data.
     */
    public Board toEntity(BoardCreationDTO boardCreationDTO, User owner) {
        return new Board(
                null,
                boardCreationDTO.title(),
                boardCreationDTO.description(),
                LocalDateTime.now(),
                LocalDateTime.now(),
                owner,
                new ArrayList<>()
        );
    }

    /**
     * Updates a Board entity with updated fields from BoardUpdateDTO.
     *
     * @param boardUpdateDTO The updated board data.
     * @param board The board entity to be updated.
     */
    public void updateBoard(BoardUpdateDTO boardUpdateDTO, Board board) {
        board.setTitle(boardUpdateDTO.title());
        board.setDescription(boardUpdateDTO.description());
        board.setUpdatedAt(LocalDateTime.now());
    }

    /**
     * Converts a Board entity to a BoardResponseDTO
     *
     * @param board The board entity.
     * @return The DTO representation.
     */
    public BoardResponseDTO toResponse(Board board) {
        return new BoardResponseDTO(
                board.getId(),
                board.getTitle(),
                board.getDescription(),
                board.getCreatedAt(),
                board.getUpdatedAt(),
                board.getOwner().getId()
        );
    }

}
