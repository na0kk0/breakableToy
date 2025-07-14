package com.naokko.todo.repositories;

import com.naokko.todo.models.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    Page<Task> findAll(Pageable pageable);

    @Query("SELECT t FROM Task t WHERE " +
            "(:title IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:priority IS NULL OR :priority = 'All' OR t.priority = :priority) AND " +
            "(:state IS NULL OR :state = 'All' OR t.completed = CASE WHEN :state = 'Done' THEN true ELSE false END)")
    Page<Task> searchTasks(
            @Param("title") String title,
            @Param("priority") String priority,
            @Param("state") String state,
            Pageable pageable
    );
}
