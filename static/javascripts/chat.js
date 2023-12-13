document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  const userInput = document.getElementById('user-input');
  const inputField = userInput.querySelector('input');
  const sendButton = userInput.querySelector('i.fa-paper-plane');

  // Function to add a new user message to the chat
  function addUserMessage(message) {
    const userBubble = document.createElement('div');
    userBubble.className = 'bubble me-bubble';
    userBubble.textContent = message;
    chatContainer.querySelector('.chat-content').appendChild(userBubble);
  }

  // Function to add a new chatbot message to the chat
  function addChatbotMessage(message) {
    const chatbotBubble = document.createElement('div');
    chatbotBubble.className = 'bubble you-bubble';
    chatbotBubble.innerHTML = message;
    chatContainer.querySelector('.chat-content').appendChild(chatbotBubble);
  }

  // Function to handle user input and send it to the ChatGPT API
  async function handleUserInput() {
    const userMessage = inputField.value.trim();

    if (userMessage !== '') {
      // Add the user's message to the chat
      addUserMessage(userMessage);

      // Clear the input field
      inputField.value = '';

      try {
        // Send the user's message to the ChatGPT API
        const apiKey = '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'; // Replace with your actual API key
        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: userMessage }]
          })
        });

        const responseData = await response.json();

        // Get and display the chatbot's response
        const chatbotResponse = responseData.choices[0]?.message?.content;
        if (typeof chatbotResponse !== 'undefined') {
          addChatbotMessage(chatbotResponse);
        } else {
          // Display a message when API response is not available
          addChatbotMessage("Sorry, I couldn't process your request at the moment. Please try again later.");
        }
      } catch (error) {
        // Handle API call failure
        console.error('API call failed:', error);
        // Display an error message to the user
        addChatbotMessage("죄송합니다. 현재 ChatGPI API의 너무 많은 요청으로 답변을 드리기가 어렵습니다.");
      }
    }
  }

  // Event listener for the send button
  sendButton.addEventListener('click', handleUserInput);

  // Event listener for the Enter key in the input field
  inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleUserInput();
    }
  });
});
