
import './App.css'
import React, { useState, useEffect, useRef } from "react";

const CountdownTimer: React.FC = () => {
	const [timeLeft, setTimeLeft] = useState(30); // this is the starting state of the seconds of the timer

	const [isActive, setIsActive] = useState(false); // this is the state to check if the timer is active and going or not, and it starts with inactive

	const [customTime, setCustomTime] = useState(30); // this is to memorize the state of seconds when it is changed in the customization and it is initialized at 30

	const timerRef = useRef<any>(null); //this is the reference to memorize the ID of the timer inizialised at null

	useEffect(() => {
		// this is an effect that works everytime that the isActive value changes (boolean)
		if (isActive) {
			// this is to check if the timer is on
			timerRef.current = setInterval(() => {
				// this is to set the time of the interval
				setTimeLeft((prevTime) => {
					// here I need to update the time left calling the function
					// here I fix the function if the time is more than 0
					if (prevTime > 0) {
						return prevTime - 1; // it decrease of 1
					} else {
						setIsActive(false); // this is to stop the timer when it goes to 0
						clearInterval(timerRef.current); // this is to stop the interval so it doesn't keep going when it reaches 0
						return 0; // and this is to show the 0
					}
				});
			}, 1000); // this is to set the interval to 1 second
		}

		// suggested to clear the interval
		return () => clearInterval(timerRef.current);
	}, [isActive]); // it depends on the isactive state

	// function to start the timer. it starts the time with the customised value and sets is active to true
	const startTimer = () => {
		setTimeLeft(customTime);
		setIsActive(true);
	};

	// this is the function to pause the timer, the isactive is set back to false and there is the timeref. to the current last second
	const pauseTimer = () => {
		setIsActive(false);
		clearInterval(timerRef.current);
	};

	const resetTimer = () => {
		setIsActive(false); // it stops the timer
		clearInterval(timerRef.current); // it stops the interval of seconds
		setTimeLeft(customTime); // this resets the timer to the initialised or customised time
	};

	// this is the function to switch the value of the interval
	const handleCustomTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		// this is to convert the value of the input into an integer, if it is not than it it set to 0
		const newTime = parseInt(event.target.value) || 0;
		// it updates the costumised time only if it is bigger than 0
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
				min="0" //this is to set only positive numbers
			/>
			<h2>{timeLeft} sekunder kvar</h2>{" "}

			<button onClick={startTimer}>Starta</button>
			<button onClick={pauseTimer}>Pausa</button>
			<button onClick={resetTimer}>Återställ</button>
			{timeLeft === 0 && <p>Tidens slut!</p>}
		</div>
	);
};

export default CountdownTimer; 