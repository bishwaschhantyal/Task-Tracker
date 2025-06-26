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
		const timer = setTimeout(() => setWelcomeMessage("", 30000));
		return () => clearTimeout(timer);
	}, []);

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
		setTasks(tasks.filter((task) => task.id !== id));
	};

	return (
		<div className="w-full h-screen flex flex-col">
			<Header />
			<main className="container mx-auto my-8 flex-grow p-4">
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
