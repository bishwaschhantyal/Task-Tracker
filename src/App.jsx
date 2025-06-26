import Header from "./components/Header";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Input from "./components/Input";
import TaskList from "./components/TaskList";

import { useEffect, useState } from "react";

function App() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [welcomeMessage, setWelcomeMessage] = useState("");

	useEffect(() => {
		setWelcomeMessage("Welcome to your task tracker!");
		const timer = setTimeout(() => setWelcomeMessage(""), 3000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem("tasks"));

		if (storedTasks && storedTasks.length > 0) setTasks(storedTasks);
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));

		console.log(tasks);
	}, [tasks]);

	const addTask = () => {
		if (newTask.trim()) {
			setTasks([
				...tasks,
				{
					id: Date.now(),
					text: newTask,
					completed: false,
				},
			]);

			setNewTask("");
		} else {
			alert("Task cannot be empty");
		}
	};

	const onToggleComplete = (id) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task,
			),
		);
	};

	const deleteTask = (id) => {
		tasks.forEach((task) => {
			if (task.id === id)
				task.completed
					? setTasks(tasks.filter((task) => task.id !== id))
					: alert("Cannot delete without completing task");
		});
	};

	return (
		<div className="w-full h-screen flex flex-col">
			<Header />
			<main className="container mx-auto my-8 flex-grow p-4">
				{welcomeMessage && (
					<div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
						<p>{welcomeMessage}</p>
					</div>
				)}
				<h2 className="text-xl font-bold mb-4 text-gray-800">Dashboard</h2>

				<div className="flex space-x-4 mb-5">
					<Input
						className={"flex-grow"}
						setNewTask={setNewTask}
						newTask={newTask}
					/>
					<Button
						type="add"
						onClick={() => {
							addTask();
						}}
					/>
					{/* <Button type="delete" onClick={() => alert("Task Delete")} /> */}
				</div>

				<TaskList
					tasks={tasks}
					onToggleComplete={onToggleComplete}
					deleteTask={deleteTask}
				/>
			</main>
			<Footer />
		</div>
	);
}

export default App;
