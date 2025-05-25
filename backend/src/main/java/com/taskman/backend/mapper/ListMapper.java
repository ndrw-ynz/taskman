package com.taskman.backend.mapper;

import com.taskman.backend.dto.ListCreationDTO;
import com.taskman.backend.dto.ListResponseDTO;
import com.taskman.backend.dto.ListUpdateDTO;
import com.taskman.backend.entity.Board;
import com.taskman.backend.entity.ListEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * Maps between List entity and related DTOs.
 */
@Component
public class ListMapper {

    /**
     * Converts a ListCreationDTO to a List entity (partial).
     *
     * @param listCreationDTO The list creation data.
     * @param board The board associated with the list.
     * @return List entity with fields from creation data.
     */
    public ListEntity toEntity(ListCreationDTO listCreationDTO, Board board) {
        return new ListEntity(
                null,
                listCreationDTO.title(),
                1,
                board,
                new ArrayList<>()
        );
    }

    /**
     * Updates a List entity with fields from ListUpdateDTO.
     *
     * @param listUpdateDTO The updated list data.
     * @param listEntity The list entity to be updated.
     */
    public void updateList(ListUpdateDTO listUpdateDTO, ListEntity listEntity) {
        listEntity.setTitle(listUpdateDTO.title());
        listEntity.setPosition(listUpdateDTO.position());
    }

    /**
     * Converts a List entity to a ListResponseDTO.
     *
     * @param listEntity The list entity.
     * @return The DTO representation.
     */
    public ListResponseDTO toResponse(ListEntity listEntity) {
        return new ListResponseDTO(
                listEntity.getTitle(),
                listEntity.getPosition(),
                listEntity.getBoard().getId()
        );
    }
}
