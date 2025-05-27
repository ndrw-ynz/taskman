package com.taskman.backend.mapper;

import com.taskman.backend.dto.CardCreationDTO;
import com.taskman.backend.dto.CardResponseDTO;
import com.taskman.backend.entity.Card;
import com.taskman.backend.entity.ListEntity;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * Maps between Card entity and related DTOs.
 */
@Component
public class CardMapper {

    /**
     * Converts a CardCreationDTO to a Card entity (partial).
     *
     * @param cardCreationDTO The card creation data.
     * @param listEntity The list associated with the card.
     * @return Card entity with fields form creation data.
     */
    public Card toEntity(CardCreationDTO cardCreationDTO, ListEntity listEntity) {
        return new Card(
                null,
                cardCreationDTO.title(),
                cardCreationDTO.description(),
                1,
                LocalDateTime.now(),
                LocalDateTime.now(),
                cardCreationDTO.dueDate(),
                listEntity
        );
    }

    /**
     * Converts a Card entity to a CardResponseDTO
     *
     * @param card The card entity.
     * @return The DTO representation.
     */
    public CardResponseDTO toResponse(Card card) {
        return new CardResponseDTO(
                card.getId(),
                card.getTitle(),
                card.getDescription(),
                card.getPosition(),
                card.getUpdatedAt(),
                card.getDueDate(),
                card.getList().getId()
        );
    }
}
