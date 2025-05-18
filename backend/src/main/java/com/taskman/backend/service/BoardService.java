package com.taskman.backend.service;

import com.taskman.backend.dto.BoardCreationDTO;
import com.taskman.backend.dto.BoardResponseDTO;
import com.taskman.backend.dto.BoardUpdateDTO;
import com.taskman.backend.entity.Board;
import com.taskman.backend.entity.User;
import com.taskman.backend.mapper.BoardMapper;
import com.taskman.backend.repository.BoardRepository;
import com.taskman.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class that handles business logic related to fetching,
 * creating, updating, and deleting boards.
 */
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final BoardMapper boardMapper;

    @Autowired
    public BoardService(BoardRepository boardRepository, BoardMapper boardMapper, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.boardMapper = boardMapper;
    }

    /**
     * Fetches a board by its id.
     *
     * @param boardId The id of the board.
     * @return The BoardResponseDTO of the fetched board.
     * @throws EntityNotFoundException if board is not found.
     */
    public BoardResponseDTO getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException("No board with id " + boardId));
        return boardMapper.toResponse(board);
    }

    /**
     * Fetches the list of all boards.
     *
     * @return The list of BoardResponseDTOs of all boards.
     */
    public List<BoardResponseDTO> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream().map(boardMapper::toResponse).collect(Collectors.toList());
    }

    /**
     * Fetches the list of all boards associated with the
     * provided user id.
     *
     * @param ownerId The user id of the owner.
     * @return The list of BoardResponseDTOs that belong to the user.
     */
    public List<BoardResponseDTO> getAllBoardsByUserId(Long ownerId) {
        List<Board> boards = boardRepository.findAllByOwnerId(ownerId);
        return boards.stream().map(boardMapper::toResponse).collect(Collectors.toList());
    }

    /**
     * Creates a new board with the provided board details
     * and user id.
     *
     * @param boardCreationDTO The details of the new board.
     * @param ownerId The user id of the owner of the created board.
     * @return The BoardResponseDTO of the newly created board.
     * @throws EntityNotFoundException if the provided owner id is not found.
     */
    @Transactional
    public BoardResponseDTO createBoard(BoardCreationDTO boardCreationDTO, Long ownerId) {
        User user = userRepository.findById(ownerId).orElseThrow(() -> new EntityNotFoundException("No user with id " + ownerId));
        Board newBoard = boardMapper.toEntity(boardCreationDTO, user);
        Board createdBoard = boardRepository.save(newBoard);
        return boardMapper.toResponse(createdBoard);
    }

    /**
     * Partially updates a board's details.
     *
     * @param boardUpdateDTO The updated details of the board.
     * @param boardId The id of the board.
     * @param ownerId The user id of the board's owner.
     * @return The BoardResponseDTO of the updated board.
     * @throws EntityNotFoundException if board is not found.
     * @throws AccessDeniedException if the provided user does not own the board.
     */
    @Transactional
    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO, Long boardId, Long ownerId) {
        Board updatedBoard = boardRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException("No board with id " + boardId));

        if (!updatedBoard.getOwner().getId().equals(ownerId)) {
            throw new AccessDeniedException("You don't own this board.");
        }

        boardMapper.updateBoard(boardUpdateDTO, updatedBoard);
        boardRepository.save(updatedBoard);
        return boardMapper.toResponse(updatedBoard);
    }

    /**
     * Deletes a board by ID.
     *
     * @param boardId The id of the board.
     * @param ownerId The user id of the board's owner.
     * @throws EntityNotFoundException if board is not found.
     * @throws AccessDeniedException if the provided user does not own the board.
     */
    @Transactional
    public void deleteBoard(Long boardId, Long ownerId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException("No board with id " + boardId));

        if (!board.getOwner().getId().equals(ownerId)) {
            throw new AccessDeniedException("You don't own this board.");
        }

        boardRepository.deleteById(boardId);
    }
}
