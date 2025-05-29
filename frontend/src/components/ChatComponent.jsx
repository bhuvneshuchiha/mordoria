import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import "./style.css";

function ChatComponent() {
	const [clientMessages, setClientMessages] = useState("");
	const [typingTimer, setTypingTimer] = useState(null);
	const [ai_emot, set_ai_emot] = useState("");
	const [messages, setMessages] = useState([]);
	const [ai_response, setResponse] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const ws = useRef(null);

	useEffect(() => {
		ws.current = new WebSocket("http://localhost:8081/ws/v1/mordoria");

		ws.current.onopen = () => {
			console.log("Connected to the go backend");
			setIsConnected(true);
		};

		ws.current.onmessage = (event) => {
			console.log("RAW event.data:", event.data);
			let messageChat = JSON.parse(event.data);
			setMessages((prev) => {
				const updated = [...prev, ...messageChat];
				return updated;
			});
		};

		ws.current.onerror = (error) => {
			console.error("Error encountered", error);
			setIsConnected(false);
		};

		ws.current.onclose = () => {
			console.log("Websocket connection closed");
			setIsConnected(false);
		};

		return () => {
			ws.current.close();
		};
	}, []);

	const handleSend = () => {
		if (!clientMessages.trim()) return;

		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(
				JSON.stringify({
					client_id: "kdkdk",
					payload: [
						{
							payload: clientMessages,
							ai_emot_score: ai_emot.toString() || "0.5",
						},
					],
				}),
			);

			setClientMessages("");
			set_ai_emot("");

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

	const sendAllChats = async (messagesArray = messages) => {
		setIsLoading(true);
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
			setResponse(response.data.message);
			setIsLoading(false);
			setTimeout(() => setResponse(""), 60000);
			console.log("Response", response.data);
		} catch (error) {
			console.log("Error: ", error);
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSend();
		}
	};

	return (
		<div className="container">
			{/* Animated Title */}
			<h1 className="animated-title">
				{'PORQUE MARIA'.split('').map((letter, index) => (
					<span
						key={index}
						className="bouncing-letter"
						style={{animationDelay: `${index * 0.1}s`}}
					>
						{letter === ' ' ? '\u00A0' : letter}
					</span>
				))}
			</h1>

			{/* Connection Status Indicator */}
			<div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
				<div className="status-dot"></div>
				<span>{isConnected ? 'Connected' : 'Disconnected'}</span>
			</div>

			<div className="chat_div">
				<input
					type="text"
					value={clientMessages}
					onChange={(e) => setClientMessages(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="Type your message..."
					disabled={!isConnected}
				/>
				<input
					type="text"
					value={ai_emot}
					onChange={(e) => set_ai_emot(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="AI Emotion Score"
					disabled={!isConnected}
				/>
				<button
					onClick={handleSend}
					disabled={!isConnected || !clientMessages.trim()}
					className={!isConnected || !clientMessages.trim() ? 'disabled' : ''}
				>
					Send
				</button>
			</div>

			<div className="section received-section">
				<h3>Received Messages</h3>
				{messages.length === 0 ? (
					<div className="empty-state">
						<p className="placeholder-text">No messages yet. Start typing!</p>
					</div>
				) : (
					<ul>
						{messages.map((item, index) => (
							<li key={index} style={{animationDelay: `${index * 0.1}s`}}>
								<strong>Message:</strong> {item.payload} |
								<strong> AI Emot Score:</strong> {item.ai_emot_score}
							</li>
						))}
					</ul>
				)}
			</div>

			<div className="section ai-response-section">
				<h3>AI Summarized Response</h3>
				<div className="ai-response-box">
					{isLoading ? (
						<div className="loading-container">
							<div className="loading-shimmer"></div>
							<p className="loading-text">Generating AI summary...</p>
						</div>
					) : ai_response ? (
						<p className="response-text">{ai_response}</p>
					) : (
						<p className="placeholder-text">No summary yet.</p>
					)}
				</div>
			</div>
		</div>
	);
	// 	<div className="container">
	// 		{/* Connection Status Indicator */}
	// 		<div
	// 			className={`connection-status ${isConnected ? "connected" : "disconnected"}`}
	// 		>
	// 			<div className="status-dot"></div>
	// 			<span>{isConnected ? "Connected" : "Disconnected"}</span>
	// 		</div>
	//
	// 		<div className="chat_div">
	// 			<input
	// 				type="text"
	// 				value={clientMessages}
	// 				onChange={(e) => setClientMessages(e.target.value)}
	// 				onKeyPress={handleKeyPress}
	// 				placeholder="Type your message..."
	// 				disabled={!isConnected}
	// 			/>
	// 			<input
	// 				type="text"
	// 				value={ai_emot}
	// 				onChange={(e) => set_ai_emot(e.target.value)}
	// 				onKeyPress={handleKeyPress}
	// 				placeholder="AI Emotion Score"
	// 				disabled={!isConnected}
	// 			/>
	// 			<button
	// 				onClick={handleSend}
	// 				disabled={!isConnected || !clientMessages.trim()}
	// 				className={!isConnected || !clientMessages.trim() ? "disabled" : ""}
	// 			>
	// 				Send
	// 			</button>
	// 		</div>
	//
	// 		<div className="section received-section">
	// 			<h3>Received Messages</h3>
	// 			{messages.length === 0 ? (
	// 				<div className="empty-state">
	// 					<p className="placeholder-text">No messages yet. Start typing!</p>
	// 				</div>
	// 			) : (
	// 				<ul>
	// 					{messages.map((item, index) => (
	// 						<li key={index} style={{ animationDelay: `${index * 0.1}s` }}>
	// 							<strong>Message:</strong> {item.payload} |
	// 							<strong> AI Emot Score:</strong> {item.ai_emot_score}
	// 						</li>
	// 					))}
	// 				</ul>
	// 			)}
	// 		</div>
	//
	// 		<div className="section ai-response-section">
	// 			<h3>AI Summarized Response</h3>
	// 			<div className="ai-response-box">
	// 				{isLoading ? (
	// 					<div className="loading-container">
	// 						<div className="loading-shimmer"></div>
	// 						<p className="loading-text">Generating AI summary...</p>
	// 					</div>
	// 				) : ai_response ? (
	// 					<p className="response-text">{ai_response}</p>
	// 				) : (
	// 					<p className="placeholder-text">No summary yet.</p>
	// 				)}
	// 			</div>
	// 		</div>
	// 	</div>
	// );
}

export default ChatComponent;
