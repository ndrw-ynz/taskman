package com.taskman.backend.service;

import com.taskman.backend.dto.CardCreationDTO;
import com.taskman.backend.dto.CardResponseDTO;
import com.taskman.backend.dto.CardUpdateDTO;
import com.taskman.backend.entity.Card;
import com.taskman.backend.entity.ListEntity;
import com.taskman.backend.mapper.CardMapper;
import com.taskman.backend.repository.CardRepository;
import com.taskman.backend.repository.ListRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class that handles business logic related to fetching,
 * creating, updating, and deleting cards.
 */
@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CardMapper cardMapper;
    private final ListRepository listRepository;

    @Autowired
    public CardService(CardRepository cardRepository, CardMapper cardMapper, ListRepository listRepository) {
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
        this.listRepository = listRepository;
    }

    /**
     * Fetches a card by its id.
     *
     * @param cardId The id of the card.
     * @return The CardResponseDTO of the fetched card.
     * @throws EntityNotFoundException if card is not found.
     */
    public CardResponseDTO getCard(Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new EntityNotFoundException("No card with id " + cardId));
        return cardMapper.toResponse(card);
    }

    /**
     * Fetches the list of cards of the specified
     * list with the provided listId.
     *
     * @param listId The associated listId of the cards.
     * @return The list of CardResponseDTOs of all cards.
     */
    public List<CardResponseDTO> getAllCardsByList(Long listId) {
        List<Card> cards = cardRepository.findByListIdOrderByPositionAsc(listId);
        return cards.stream().map(cardMapper::toResponse).collect(Collectors.toList());
    }

    /**
     * Creates a new card with the provided card details.
     *
     * @param cardCreationDTO The details of the new card.
     * @return The CardResponseDTO of the newly created card.
     * @throws EntityNotFoundException if list is not found.
     */
    @Transactional
    public CardResponseDTO createCard(CardCreationDTO cardCreationDTO) {
        Long listId = cardCreationDTO.listId();
        ListEntity listEntity = listRepository.findById(listId).orElseThrow(() -> new EntityNotFoundException("No list with id " + listId));
        int maxPosition = cardRepository.findMaxPositionByListId(listId).orElse(0);

        Card card = cardMapper.toEntity(cardCreationDTO, listEntity);
        card.setPosition(maxPosition + 1);
        Card savedCard = cardRepository.save(card);
        return cardMapper.toResponse(savedCard);
    }

    /**
     * Partially updates a card's details.
     *
     * @param cardUpdateDTO The updated details of the card.
     * @param cardId The id of the card.
     * @return The CardResponseDTO of the updated card.
     * @throws EntityNotFoundException if card is not found.
     */
    @Transactional
    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO, Long cardId) {
        Card updatedCard = cardRepository.findById(cardId).orElseThrow(() -> new EntityNotFoundException("No card with id " + cardId));

        Integer currentPosition = updatedCard.getPosition();
        Integer newPosition = cardUpdateDTO.position();

        // 1. Update card
        cardMapper.updateCard(cardUpdateDTO, updatedCard);

        // 2. Update card position
        if (newPosition != null && newPosition >= 1 && !newPosition.equals(currentPosition)) {
            Long listId = updatedCard.getList().getId();
            if (newPosition < currentPosition) {
                cardRepository.incrementPositionsBetween(listId, newPosition, currentPosition - 1);
            } else {
                cardRepository.decrementPositionsBetween(listId, currentPosition + 1, newPosition);
            }

            updatedCard.setPosition(newPosition);
        }

        // 3, Save changes
        cardRepository.save(updatedCard);
        return cardMapper.toResponse(updatedCard);
    }

    /**
     * Deletes a card by ID.
     *
     * @param cardId The id of the card.
     * @throws EntityNotFoundException if card is not found.
     */
    public void deleteCard(Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new EntityNotFoundException("No card with id " + cardId));

        cardRepository.deleteById(cardId);
    }
}
