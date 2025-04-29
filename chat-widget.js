
(function() {
  // Create styles
  const style = document.createElement('style');
  style.innerHTML = `
    .chatbot-float-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background: linear-gradient(to right, #A259FF, #F6C915);
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      color: white;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
    }

    .chatbot-popup {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 360px;
      max-width: 90%;
      height: 540px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
      z-index: 9999;
      display: none;
    }

    .chatbot-popup .company-header {
      background: linear-gradient(to right, #A259FF, #F6C915);
      color: white;
      text-align: center;
      padding: 14px;
      font-size: 18px;
      font-weight: 600;
    }

    .chatbot-popup .screen {
      display: none;
      flex-direction: column;
      padding: 20px;
      height: 100%;
      overflow-y: auto;
    }

    .chatbot-popup .screen.active {
      display: flex;
    }

    .chatbot-popup .btn {
      background: linear-gradient(to right, #A259FF, #F6C915);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 30px;
      font-size: 15px;
      cursor: pointer;
      margin-top: 20px;
      transition: 0.3s;
      align-self: center;
    }

    .chatbot-popup input[type="text"], 
    .chatbot-popup input[type="email"] {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border-radius: 25px;
      border: 1px solid #ccc;
      font-size: 15px;
      box-sizing: border-box;
    }

    .chat-box {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
    }

    .message {
      margin: 6px 0;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 14px;
      max-width: 80%;
      word-wrap: break-word;
    }

    .user-message {
      background: #A259FF;
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 0;
    }

    .bot-message {
      background: #eee;
      color: #333;
      align-self: flex-start;
      border-bottom-left-radius: 0;
    }

    .input-area {
      display: flex;
      padding: 10px;
      border-top: 1px solid #ddd;
    }

    .input-area input {
      flex: 1;
      padding: 10px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    .input-area button {
      background: #A259FF;
      color: white;
      border: none;
      border-radius: 5px;
      margin-left: 10px;
      padding: 10px 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Load Poppins font
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Floating button
  const floatBtn = document.createElement('div');
  floatBtn.className = 'chatbot-float-button';
  floatBtn.innerHTML = '&#128172;';
  document.body.appendChild(floatBtn);

  // Popup chatbot
  const chatbot = document.createElement('div');
  chatbot.className = 'chatbot-popup';
  chatbot.innerHTML = `
    <div class="company-header">CycleSync</div>

    <div class="screen active" id="welcome-screen">
      <h2>Welcome to Fanijo 💜</h2>
      <p><strong>Hi! I'm here to help you track your cycle and care better!</strong></p>
      <button class="btn" onclick="goToLogin()">Start Chatting</button>
      <p>Tap above and let's chat 💬</p>
    </div>

    <div class="screen" id="login-screen">
      <h2>Enter your details to start</h2>
      <p>Name:</p>
      <input type="text" id="name" placeholder="Your Name" />
      <p>Email:</p>
      <input type="email" id="email" placeholder="Your Email" />
      <button class="btn" onclick="startChat()">Continue to Chat</button>
    </div>

    <div class="screen" id="chat-screen">
      <div class="chat-box" id="chat-box"></div>
      <div class="input-area">
        <input type="text" id="user-input" placeholder="Type a message..." />
        <button onclick="sendMessage()">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(chatbot);

  floatBtn.onclick = () => {
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  };

  // Chat logic
  window.goToLogin = function() {
    switchScreen('welcome-screen', 'login-screen');
  }

  window.startChat = function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }
    switchScreen('login-screen', 'chat-screen');
    appendBotMessage(`Hi ${name}! 👋 I'm here to help you track your cycle. How can I assist you today?`);
  }

  window.sendMessage = function() {
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    if (!userText) return;

    appendUserMessage(userText);
    input.value = '';

    fetch('https://kuldip123456789.app.n8n.cloud/webhook/Lydia Copy', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: userText
    })
    .then(res => res.json())
    .then(data => {
      appendBotMessage(data.output || "I didn't understand that. Can you rephrase?");
    })
    .catch(() => {
      appendBotMessage("⚠️ Couldn't connect to the server. Please try again later.");
    });
  }

  function switchScreen(hideId, showId) {
    document.getElementById(hideId).classList.remove('active');
    document.getElementById(showId).classList.add('active');
  }

  function appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message user-message';
    msg.innerText = text;
    document.getElementById('chat-box').appendChild(msg);
    scrollToBottom();
  }

  function appendBotMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message bot-message';
    msg.innerText = text;
    document.getElementById('chat-box').appendChild(msg);
    scrollToBottom();
  }

  function scrollToBottom() {
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
  }
})();
