package com.taskman.backend.repository;

import com.taskman.backend.entity.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListRepository extends JpaRepository<ListEntity, Long> {

}
