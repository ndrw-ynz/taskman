package com.taskman.backend.service;

import com.taskman.backend.dto.ListCreationDTO;
import com.taskman.backend.dto.ListResponseDTO;
import com.taskman.backend.dto.ListUpdateDTO;
import com.taskman.backend.entity.Board;
import com.taskman.backend.entity.ListEntity;
import com.taskman.backend.mapper.ListMapper;
import com.taskman.backend.repository.BoardRepository;
import com.taskman.backend.repository.ListRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class that handles business logic related to fetching,
 * creating, updating, and deleting lists.
 */
@Service
public class ListService {

    private ListRepository listRepository;
    private ListMapper listMapper;
    private BoardRepository boardRepository;

    @Autowired
    public ListService(ListRepository listRepository, ListMapper listMapper, BoardRepository boardRepository) {
        this.listRepository = listRepository;
        this.listMapper = listMapper;
        this.boardRepository = boardRepository;
    }

    /**
     * Fetches a list by its id.
     *
     * @param listId The id of the list.
     * @return The ListResponseDTO of the fetched list.
     * @throws EntityNotFoundException if list is not found.
     */
    public ListResponseDTO getList(Long listId) {
        ListEntity listEntity = listRepository.findById(listId).orElseThrow(() -> new EntityNotFoundException("No list with id " + listId));
        return listMapper.toResponse(listEntity);
    }

    /**
     * Fetches the list of all lists.
     *
     * @param boardId The associated boardId of the lists.
     * @return The list of ListResponseDTOs of all lists.
     */
    public List<ListResponseDTO> getAllListsByBoard(Long boardId) {
        List<ListEntity> listEntities = listRepository.findByBoardIdOrderByPositionAsc(boardId);
        return  listEntities.stream().map(listMapper::toResponse).collect(Collectors.toList());
    }

    /**
     * Creates a new list with the provided list details
     * and boardId.
     *
     * @param listCreationDTO The details of the new list.
     * @param boardId The associated boardId of the new list.
     * @return The ListResponseDTO of the newly created list.
     * @throws EntityNotFoundException if board is not found.
     */
    @Transactional
    public ListResponseDTO createList(ListCreationDTO listCreationDTO, Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new EntityNotFoundException("No board with id " + boardId));
        int maxPosition = listRepository.findMaxPositionByBoardId(boardId).orElse(0);

        ListEntity listEntity = listMapper.toEntity(listCreationDTO, board);
        listEntity.setPosition(maxPosition + 1);
        ListEntity savedList = listRepository.save(listEntity);
        return listMapper.toResponse(savedList);
    }

    /**
     * Partially updates a list's details.
     *
     * @param listUpdateDTO The updated details of the list.
     * @param listId The id of the list.
     * @return The ListResponseDTO of the updated list.
     * @throws EntityNotFoundException if list is not found.
     */
    @Transactional
    public ListResponseDTO updateList(ListUpdateDTO listUpdateDTO, Long listId) {
        ListEntity updatedList = listRepository.findById(listId).orElseThrow(() -> new EntityNotFoundException("No list with id " + listId));

        listMapper.updateList(listUpdateDTO, updatedList);
        listRepository.save(updatedList);
        return listMapper.toResponse(updatedList);
    }

    /**
     * Updates a list's position.
     *
     * @param listId The id of the list.
     * @param newPosition The new position of the list.
     * @throws EntityNotFoundException if list is not found.
     */
    @Transactional
    public void updateListPosition(Long listId, int newPosition) {
        ListEntity list = listRepository.findById(listId).orElseThrow(() -> new EntityNotFoundException("No list with id " + listId));

        int currentPosition = list.getPosition();
        Long boardId = list.getBoard().getId();

        if (newPosition == currentPosition) return;

        if (newPosition < currentPosition) {
            listRepository.incrementPositionsBetween(boardId, newPosition, currentPosition - 1);
        } else {
            listRepository.decrementPositionsBetween(boardId, currentPosition + 1, newPosition);
        }

        list.setPosition(newPosition);
    }

    /**
     * Deletes a list by ID.
     * @param listId The id of the list.
     * @throws EntityNotFoundException if list is not found.
     */
    @Transactional
    public void deleteList(Long listId) {
        ListEntity listEntity = listRepository.findById(listId).orElseThrow(() -> new EntityNotFoundException("No list with id " + listId));

        listRepository.deleteById(listId);
    }
}
