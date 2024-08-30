import "./App.css";
import React, { useState, useEffect, useRef } from "react";

const CountdownTimer: React.FC = () => {
	const [timeLeft, setTimeLeft] = useState<number>(60); 
	const [isActive, setIsActive] = useState<boolean>(false); 
	const [customTime, setCustomTime] = useState<number>(60); 
	const timerRef = useRef<number | null>(null); 

	const clearTimer = () => {
		if (timerRef.current !== null) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};

	useEffect(() => {
		if (isActive) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1;
					} else {
						setIsActive(false);
						clearTimer();
						return 0;
					}
				});
			}, 1000);
		}

		return () => clearTimer();
	}, [isActive]);

	const startTimer = () => {
		if (!isActive) {
			setTimeLeft((prevTime) => (prevTime > 0 ? prevTime : customTime));
		}
		setIsActive(true);
	};

	const pauseTimer = () => {
		setIsActive(false); 
		clearTimer(); 
	};

	const resetTimer = () => {
		setIsActive(false); 
		clearTimer(); 
		setTimeLeft(customTime); 
	};

	const handleCustomTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = parseInt(event.target.value) || 0;
		setCustomTime(newTime > 0 ? newTime : 0);
	};

	return (
		<div>
			<h1>Nedräkningstimer</h1>
			<input
				type="number"
				value={customTime}
				onChange={handleCustomTime}
				placeholder="Ange antal sekunder"
				min="0"
			/>
			<h2>{timeLeft} sekunder kvar</h2>
			<button onClick={startTimer}>Starta</button>
			<button onClick={pauseTimer}>Pausa</button>
			<button onClick={resetTimer}>Återställ</button>
			{timeLeft === 0 && <p>Tidens slut!</p>}
		</div>
	);
};

export default CountdownTimer;
