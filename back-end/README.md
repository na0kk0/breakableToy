# Breakable Toy Api by Diego Escalante Maldonado 
## Purpose
The purpose for this Api is to manage the back-end of an <i>To Do App</i>.
## Storage
For this Api we don't use a database (not yet, the client want to add it later on), so the data (the tasks) are stored in a List.
## Models
### Task
I defined a <i>Task</i> model. The Task is an object with the next fields:
#### Id - An unique number that identifies the task
#### Title - The name of the task, a String
#### dueDate - The date when the task should be completed (it's stored as a string)
### completed - A boolean that represents if the task is completed
#### doneDate - The date when the task was checked as completed (it's stored as a string)
#### priority - Is a string that can be "Low", "Medium" or "High" 
#### createDate - The date when the task was created (it's stored as a string)
## Controllers
### Task Controller
The <i>Task controller</i> handle all the http requests, also here is where the List with the tasks is defined.
The main endpoint is <i>todos/</i>.
#### Get /todos
Return tasks list.
#### Get todos/sortPriorityUp
Return the tasks list sorted by priority in ascendant order
#### Get todos/sortPriorityDown
Return the tasks list sorted by priority in descendent order
#### Get todos/sortDueDateUp
Return the tasks list sorted by due date in ascendant order
#### Get todos/sortDueDateDown
Return the tasks list sorted by due date in descendant order
#### Get todos/search
Return a list with the tasks that matches the parameters that were received (it can be the title, the priority and/or if is done or not)
#### Post /todos
Add a task to the tasks list and returns the list updated
#### Put /todos/{id}
Update the title, the due date and the priority of a task that already exist in the list
#### Put /todos/{id}/done
Update a task from completed false to completed true and update it's done date to the current date
#### Put /todos/{id}/undone
Update a task from completed true to completed false and update it's done date to empty ""
#### Delete /todos/delete/{id}
Remove a task from the list by the id
