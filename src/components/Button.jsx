const Button = ({ type, onClick }) => {
	const baseClasses =
		"text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-1";

	const styles = {
		add: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
		delete: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
	};

	return (
		<button
			className={`${baseClasses} ${styles[type] || styles.add}`}
			onClick={onClick}
			type="button">
			{type === "delete" ? "Delete Task" : "Add Task"}
		</button>
	);
};

export default Button;
