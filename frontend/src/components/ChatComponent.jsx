import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import "./style.css";

function ChatComponent() {
	const [clientMessages, setClientMessages] = useState([]);
	const [typingTimer, setTypingTimer] = useState(null);
	const [ai_emot, set_ai_emot] = useState("");
	const [messages, setMessages] = useState([]);
	const ws = useRef(null);

	useEffect(() => {
		ws.current = new WebSocket("http://localhost:8081/ws/v1/mordoria");
		ws.current.onopen = () => {
			console.log("Connected to the go backend");
		};

		ws.current.onmessage = (event) => {
			console.log("RAW event.data:", event.data);
			let messageChat = JSON.parse(event.data);
			setMessages((prev) => {
				const updated = [...prev, ...messageChat];
				// sendAllChats(updated);
				return updated;
			});
		};

		ws.current.onerror = (error) => {
			console.error("Error encountered", error);
		};

		ws.current.onclose = () => {
			console.log("Websocket connection closed");
		};

		return () => {
			ws.current.close();
		};
	}, []);

	// useEffect(() => {
	//        if (!clientMessages) return;
	// 	const intervalId = setTimeout(() => {
	// 		setMessages((prev) => {
	// 			sendAllChats(prev);
	// 			return [];
	// 		});
	// 	}, 30000);
	// 	return () => {
	// 		clearTimeout(intervalId);
	// 	};
	// }, [messages]);

	// Add this state to track timer

	const handleSend = () => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(
				JSON.stringify({
					client_id: "kdkdk",
					payload: [
						{
							payload: clientMessages,
							ai_emot_score: ai_emot.toString(),
						},
					],
				}),
			);
			// setClientMessages("");

			// Start/reset 30-second timer
			if (typingTimer) {
				clearTimeout(typingTimer);
			}
			const timer = setTimeout(() => {
				setMessages((prev) => {
					if (prev.length > 0) {
						sendAllChats(prev);
					}
					return [];
				});
			}, 30000);
			setTypingTimer(timer);
		}
	};

	// const handleSend = () => {
	// 	if (ws.current && ws.current.readyState === WebSocket.OPEN) {
	// 		ws.current.send(
	// 			JSON.stringify({
	// 				client_id: "kdkdk",
	// 				payload: [
	// 					{
	// 						payload: clientMessages,
	// 						ai_emot_score: ai_emot.toString(),
	// 					},
	// 				],
	// 			}),
	// 		);
	// 		// setClientMessages([]);
	// 	}
	// };

	const sendAllChats = async (messagesArray = messages) => {
		let sum = 0;
		for (let i = 0; i < messagesArray.length; i++) {
			sum += parseInt(messagesArray[i].ai_emot_score);
		}
		console.log("Message array", messagesArray);

		const average_ai_emot_score = sum / messagesArray.length;
		console.log("Average", average_ai_emot_score);

		try {
			const response = await axios.post(
				"http://localhost:8081/v1/mordoria/chat_summarize",
				{
					client_id: "1",
					payload: messagesArray.map((m) => ({
						payload: m.payload,
						ai_emot_score: m.ai_emot_score,
					})),
					ai_emot_score: String(average_ai_emot_score),
				},
			);

			console.log("Response", response.data);
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	// Little styled
	return (
		<div className="container">
			{/* <h1>PORQUE MARIA</h1> */}

			<div className="chat_div">
				<input
					type="text"
					value={clientMessages}
					onChange={(e) => setClientMessages(e.target.value)}
					placeholder="Type your message"
				/>
				<input
					type="text"
					value={ai_emot}
					onChange={(e) => set_ai_emot(e.target.value)}
					placeholder="AI Emot Score"
				/>
				<button onClick={handleSend}>Send</button>
			</div>

			<div className="received-section">
				<h3>Received Messages:</h3>
				<ul>
					{messages.map((item, index) => (
						<li key={index}>
							<strong>Message:</strong> {item.payload} |
							<strong> AI Emot Score:</strong> {item.ai_emot_score}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ChatComponent;
