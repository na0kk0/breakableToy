package com.naokko.todo.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.naokko.todo.models.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class TaskControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getTasksShouldReturnEmptyListInitially() throws Exception {
        mockMvc.perform(get("/todos")).andExpect(status().isOk()).andExpect(jsonPath("$", empty()));
    }
    @Test
    void addTaskShouldReturnListWithTheNewTask() throws Exception {
        Task task = new Task();
        task.setId(1);
        task.setTitle("Test");
        task.setDueDate("01-05-2020");
        task.setCompleted(false);
        task.setDoneDate("");
        task.setPriority("High");
        task.setCreateDate("01-01-2020");

        mockMvc.perform(post("/todos").contentType("application/json").content(new ObjectMapper().writeValueAsString(task)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1))).andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].title", is("Test"))).andExpect(jsonPath("$[0].dueDate", is("01-05-2020")))
                .andExpect(jsonPath("$[0].completed", is(false))).andExpect(jsonPath("$[0].doneDate", is("")))
                .andExpect(jsonPath("$[0].priority", is("High"))).andExpect(jsonPath("$[0].createDate", is("01-01-2020")));
    }
    @Test
    void sortByPriorityDownShouldReturnListWithTheTasksSorted() throws Exception {
        Task task = new Task();
        task.setId(1);
        task.setTitle("Test");
        task.setDueDate("01-05-2020");
        task.setCompleted(false);
        task.setDoneDate("");
        task.setPriority("High");
        task.setCreateDate("01-01-2020");

        Task task2 = new Task();
        task2.setId(2);
        task2.setTitle("Test");
        task2.setDueDate("01-05-2020");
        task2.setCompleted(false);
        task2.setDoneDate("");
        task2.setPriority("Low");
        task2.setCreateDate("01-01-2020");

        mockMvc.perform(post("/todos").contentType("application/json").content(new ObjectMapper().writeValueAsString(task)));
        mockMvc.perform(post("/todos").contentType("application/json").content(new ObjectMapper().writeValueAsString(task2)));
        mockMvc.perform(get("/todos/sortPriorityDown")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(2)));
    }
}
