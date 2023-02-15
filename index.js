const inputEl = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatHistory = document.getElementById("chat-history");

    sendButton.addEventListener("click", () => {
      const userMessage = inputEl.value;
      inputEl.value = "";
      
      // Add the user's message to the chat history
      const messageEl = document.createElement("p");
      messageEl.innerText = userMessage;
      messageEl.classList.add("user-message");
      chatHistory.appendChild(messageEl);
      chatHistory.scrollTop = chatHistory.scrollHeight;
      
      // Call the chatbot API to get the response
      fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          prompt: userMessage,
          max_tokens: 1024,
          n: 1,
          stop: null,
          temperature: 0.5
        })
      })
      .then(response => response.json())
      .then(data => {
        
        const chatbotMessage = data.choices[0].text;
        
        // Add the chatbot's message to the chat history
        const messageEl = document.createElement("p");
        messageEl.innerText = chatbotMessage;
        messageEl.classList.add("chatbot-message");
        chatHistory.appendChild(messageEl);
        
      });
    });
