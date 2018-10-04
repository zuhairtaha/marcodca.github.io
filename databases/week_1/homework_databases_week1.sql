--1).Find out how many tasks are in the task table

SELECT COUNT(*)
FROM task; -- 35 Tasks

--2).Find out how many tasks in the task table do not have a valid due date
SELECT COUNT(*)
FROM task
WHERE due_date IS NULL; -- 8 Tasks

--3.Find all the tasks that are marked as done
SELECT *
FROM task 
RIGHT JOIN status ON task.status_id = status.id
    WHERE name = 'Done';

--4).Find all the tasks that are not marked as done 
SELECT *
FROM task 
RIGHT JOIN status ON task.status_id = status.id
    WHERE name != 'Done';

--5).Get all the tasks, sorted with the most recently created first
SELECT *
FROM task 
    ORDER BY created DESC;

--6).Get the single most recently created task
SELECT *
FROM task 
	ORDER BY created DESC
	LIMIT 1; --Look at apartments in Ørestad

--7).Get the title and due date of all tasks where the title or description contains database
SELECT title, due_date
FROM task 
	WHERE title LIKE'%database%' OR description LIKE'%database%'; 

--8).Get the title and status (as text) of all tasks
SELECT title, name
FROM task 
	INNER JOIN status ON task.status_id = status.id;

--9).Get the name of each status, along with a count of how many tasks have that status
SELECT name, COUNT(name)
from task
	INNER JOIN status ON task.status_id = status.id
	GROUP BY name;

--10).Get the names of all statuses, sorted by the status with most tasks first
SELECT name, COUNT(name)
from task
	INNER JOIN status ON task.status_id = status.id
	GROUP BY name
    ORDER BY COUNT(name) DESC;


