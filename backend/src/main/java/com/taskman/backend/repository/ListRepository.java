package com.taskman.backend.repository;

import com.taskman.backend.entity.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ListRepository extends JpaRepository<ListEntity, Long> {

    List<ListEntity> findByBoardIdOrderByPositionAsc(Long boardId);

    @Query("SELECT MAX(l.position) FROM ListEntity l WHERE l.board.id = :boardId")
    Optional<Integer> findMaxPositionByBoardId(Long boardId);

    @Modifying
    @Query("UPDATE ListEntity l SET l.position = l.position + 1 WHERE l.board.id = :boardId AND l.position BETWEEN :start AND :end")
    void incrementPositionsBetween(Long boardId, int start, int end);

    @Modifying
    @Query("UPDATE ListEntity l SET l.position = l.position - 1 WHERE l.board.id = :boardId AND l.position BETWEEN :start AND :end")
    void decrementPositionsBetween(Long boardId, int start, int end);
}
