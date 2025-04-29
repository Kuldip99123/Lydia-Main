(function() {
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    .chat-icon {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #007bff;
      color: white;
      border-radius: 50%;
      padding: 15px;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      z-index: 9999;
    }

    .chat-box {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px;
      height: 400px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
    }

    .chat-box-header {
      background-color: #007bff;
      color: white;
      padding: 10px;
      font-weight: bold;
    }

    .chat-box-messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
    }

    .chat-box-input {
      display: flex;
      padding: 10px;
      border-top: 1px solid #ddd;
    }

    .chat-box-input input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .chat-box-input button {
      margin-left: 8px;
      padding: 8px 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Create Chat Icon
  const chatIcon = document.createElement('div');
  chatIcon.className = 'chat-icon';
  chatIcon.innerHTML = '&#128172;'; // 💬
  document.body.appendChild(chatIcon);

  // Create Chat Box
  const chatBox = document.createElement('div');
  chatBox.className = 'chat-box';
  chatBox.innerHTML = `
    <div class="chat-box-header">Chat with Lydia</div>
    <div class="chat-box-messages" id="chat-messages"></div>
    <div class="chat-box-input">
      <input type="text" id="chat-input" placeholder="Type a message..." />
      <button id="chat-send">Send</button>
    </div>
  `;
  document.body.appendChild(chatBox);

  // Toggle chat box
  chatIcon.addEventListener('click', () => {
    chatBox.style.display = (chatBox.style.display === 'none') ? 'flex' : 'none';
  });

  // Send message logic
  document.getElementById('chat-send').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message !== '') {
      const messages = document.getElementById('chat-messages');
      const userMsg = document.createElement('div');
      userMsg.textContent = message;
      messages.appendChild(userMsg);
      input.value = '';
    }
  });
})();

