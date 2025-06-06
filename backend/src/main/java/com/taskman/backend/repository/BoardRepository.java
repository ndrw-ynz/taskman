package com.taskman.backend.repository;

import com.taskman.backend.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByWorkspaceId(Long workspaceId);
}
