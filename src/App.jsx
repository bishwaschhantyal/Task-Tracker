import Header from "./components/Header";
import Button from "./components/Button";
import Footer from "./components/Footer";
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
	return (
		<div className="w-full h-screen flex flex-col">
			<Header />
			<main className="container mx-auto my-8 flex-grow p-4">
				<h2 className="text-xl mb-4">Dashboard</h2>

				<div className="space-x-4">
					<Button type="add" onClick={() => alert("Task Added")} />
					<Button type="delete" onClick={() => alert("Task Delete")} />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
