package com.naokko.todo.services;

import com.naokko.todo.models.MetricsResponse;
import com.naokko.todo.models.Task;
import com.naokko.todo.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.*;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    private TaskRepository taskRepository;
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskRepository = mock(TaskRepository.class);
        taskService = new TaskService(taskRepository);
    }

    @Test
    void testSaveTask() {
        Task task = new Task();
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.saveTask(task);

        assertEquals(task, result);
        verify(taskRepository).save(task);
    }

    @Test
    void testGetTasks() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Task> mockPage = new PageImpl<>(List.of(new Task()));
        when(taskRepository.findAll(pageable)).thenReturn(mockPage);

        Page<Task> result = taskService.getTasks(0, 10);

        assertEquals(1, result.getContent().size());
    }

    @Test
    void testUpdateTaskCompletionSetsDoneDateWhenCompleted() {
        Task task = new Task();
        task.setId(1);
        task.setCompleted(false);
        task.setDoneDate(null);
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        Task result = taskService.updateTaskCompletion(1, true);

        assertTrue(result.isCompleted());
        assertNotNull(result.getDoneDate());
    }

    @Test
    void testUpdateTaskCompletionRemovesDoneDateWhenUncompleted() {
        Task task = new Task();
        task.setId(1);
        task.setCompleted(true);
        task.setDoneDate(LocalDateTime.now());
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

        Task result = taskService.updateTaskCompletion(1, false);

        assertFalse(result.isCompleted());
        assertNull(result.getDoneDate());
    }

    @Test
    void testUpdateTaskThrowsIfNotFound() {
        when(taskRepository.findById(999)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> {
            Task t = new Task();
            t.setId(999);
            taskService.updateTask(t);
        });
    }

    @Test
    void testGetTasksSortedByPriorityAscending() {
        Task low = new Task(); low.setPriority("Low");
        Task high = new Task(); high.setPriority("High");
        Task med = new Task(); med.setPriority("Medium");

        when(taskRepository.findAll()).thenReturn(List.of(low, high, med));

        Map<String, Object> result = taskService.getTasksSortedByPriority(true, 0, 10);
        List<Task> sorted = (List<Task>) result.get("content");

        assertEquals("High", sorted.get(0).getPriority());
        assertEquals("Medium", sorted.get(1).getPriority());
        assertEquals("Low", sorted.get(2).getPriority());
    }

    @Test
    void testGetTasksSortedByDueDateDescending() {
        Task t1 = new Task(); t1.setDueDate(LocalDateTime.now().minusDays(1));
        Task t2 = new Task(); t2.setDueDate(LocalDateTime.now().plusDays(1));
        Task t3 = new Task(); t3.setDueDate(null);

        when(taskRepository.findAll()).thenReturn(List.of(t1, t2, t3));

        Map<String, Object> result = taskService.getTasksSortedByDueDate(false, 0, 10);
        List<Task> sorted = (List<Task>) result.get("content");

        assertEquals(t2, sorted.get(0));
        assertEquals(t1, sorted.get(1));
        assertEquals(t3, sorted.get(2)); // null last
    }

    @Test
    void testCalculateMetrics() {
        Task t1 = new Task();
        t1.setPriority("Low");
        t1.setCompleted(true);
        t1.setCreateDate(LocalDateTime.now().minusHours(2));
        t1.setDoneDate(LocalDateTime.now().minusHours(1));

        Task t2 = new Task();
        t2.setPriority("High");
        t2.setCompleted(true);
        t2.setCreateDate(LocalDateTime.now().minusHours(3));
        t2.setDoneDate(LocalDateTime.now().minusHours(2));

        when(taskRepository.findAll()).thenReturn(List.of(t1, t2));

        MetricsResponse metrics = taskService.calculateMetrics();

        assertTrue(metrics.getAverageTime() > 0);
        assertTrue(metrics.getHighPriorityTime() > 0);
        assertTrue(metrics.getLowPriorityTime() > 0);

        assertNotNull(metrics.getAverageTimeFormatted());
        assertNotNull(metrics.getHighPriorityFormatted());
        assertNotNull(metrics.getLowPriorityFormatted());
    }
}