package com.taskman.backend.repository;

import com.taskman.backend.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByListIdOrderByPositionAsc(Long listId);

    @Query("SELECT MAX(c.position) FROM Card c WHERE c.list.id = :listId")
    Optional<Integer> findMaxPositionByListId(Long listId);

    @Modifying
    @Query("UPDATE Card c SET c.position = c.position + 1 WHERE c.list.id = :listId AND c.position BETWEEN :start AND :end")
    void incrementPositionsBetween(Long listId, int start, int end);

    @Modifying
    @Query("UPDATE Card c SET c.position = c.position - 1 WHERE c.list.id = :listId AND c.position BETWEEN :start AND :end")
    void decrementPositionsBetween(Long listId, int start, int end);
}
