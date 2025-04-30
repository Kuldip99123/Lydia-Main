(function () {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    .chatbot-container {
      font-family: 'Poppins', sans-serif;
      width: 360px;
      max-width: 90%;
      height: 540px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      display: none;
      flex-direction: column;
      overflow: hidden;
      position: fixed;
      bottom: 20px;
      right: 20px;
      opacity: 0;
      transform: scale(0.8);
      z-index: 9999;
    }
    .chatbot-container.show { display: flex; animation: popIn 0.3s ease-out forwards; }
    @keyframes popIn { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }
    .company-header {
      position: relative;
      background: linear-gradient(to right, #A259FF, #F6C915);
      color: white;
      text-align: center;
      padding: 14px;
      font-size: 18px;
      font-weight: 600;
    }
    .company-header .close-btn {
      position: absolute;
      top: 10px;
      right: 14px;
      font-size: 20px;
      line-height: 1;
      cursor: pointer;
      color: white;
    }
    .screen { display: none; flex-direction: column; padding: 20px; height: 100%; overflow-y: auto; }
    .screen.active { display: flex; }
    .btn {
      background: linear-gradient(to right, #A259FF, #F6C915);
      color: white;
      border: none;
      padding: 12px 25px;
      border-radius: 30px;
      font-size: 15px;
      cursor: pointer;
      margin-top: 20px;
      align-self: center;
    }
    input[type="text"], input[type="email"] {
      width: 100%; padding: 12px; margin: 10px 0; border-radius: 25px; border: 1px solid #ccc; font-size: 15px;
    }
    .chat-box { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; }
    .message { margin: 6px 0; padding: 10px 14px; border-radius: 16px; font-size: 14px; max-width: 80%; }
    .user-message { background: #A259FF; color: white; align-self: flex-end; border-bottom-right-radius: 0; }
    .bot-message { background: #eee; color: #333; align-self: flex-start; border-bottom-left-radius: 0; }
    .typing-indicator { align-self: flex-start; margin: 6px 0; font-size: 14px; color: #666; font-style: italic; }
    .input-area {
      display: flex; padding: 10px; border-top: 1px solid #ddd; align-items: center;
    }
    .input-area input {
      flex: 1; padding: 10px; font-size: 14px; border-radius: 5px; border: 1px solid #ccc;
    }
    .input-area .send-btn {
      width: 42px; height: 42px; margin-left: 10px; border: none; border-radius: 50%;
      background: linear-gradient(to right, #A259FF, #F6C915);
      display: flex; align-items: center; justify-content: center; cursor: pointer;
    }
    .input-area .send-btn svg { width: 20px; height: 20px; fill: white; }
    .powered-by { text-align: center; font-size: 12px; color: #aaa; padding: 10px; border-top: 1px solid #eee; background-color: #f9f9f9; }
    .floating-chat-btn {
      position: fixed; bottom: 20px; right: 20px;
      background: linear-gradient(to right, #A259FF, #F6C915);
      color: white; padding: 12px 20px; border-radius: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2); cursor: pointer; font-size: 16px;
    }
  `;

  const html = `
    <div class="floating-chat-btn" id="chat-btn">Talk to Lydia</div>
    <div class="chatbot-container" id="chat-widget">
      <div class="company-header">
        CycleSync <span class="close-btn" id="close-chat">×</span>
      </div>
      <div class="screen active" id="welcome-screen">
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;">
          <h2>Welcome to Fanijo 💜</h2>
          <p><strong>Hi! I'm here to help you track your cycle and care better!</strong></p>
          <button class="btn" id="start-chat">Start Chatting</button>
          <p>Tap above and let’s chat 💬</p>
        </div>
      </div>
      <div class="screen" id="login-screen">
        <h2>Enter your details to start</h2>
        <p>Name:</p><input type="text" id="name" placeholder="Your Name" />
        <p>Email:</p><input type="email" id="email" placeholder="Your Email" />
        <button class="btn" id="continue-chat">Continue to Chat</button>
      </div>
      <div class="screen" id="chat-screen">
        <div class="chat-box" id="chat-box"></div>
        <div class="input-area">
          <input type="text" id="user-input" placeholder="Type a message..." />
          <button class="send-btn" id="send-btn"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
        </div>
      </div>
      <div class="powered-by">Powered by <strong>TrueVibess</strong></div>
    </div>
  `;

  // Inject style
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // Inject HTML
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // Widget logic
  const chatbot = document.getElementById('chat-widget');
  document.getElementById('chat-btn').onclick = () => chatbot.classList.add('show');
  document.getElementById('close-chat').onclick = () => chatbot.classList.remove('show');
  document.getElementById('start-chat').onclick = () => switchScreen('welcome-screen', 'login-screen');
  document.getElementById('continue-chat').onclick = () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!name || !email) return alert('Please enter both name and email.');
    switchScreen('login-screen', 'chat-screen');
    appendBotMessage(`Hi ${name}! 👋 I'm here to help you track your cycle. How can I assist you today?`);
  };
  function switchScreen(from, to) {
    document.getElementById(from).classList.remove('active');
    document.getElementById(to).classList.add('active');
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
    const box = document.getElementById('chat-box');
    box.scrollTop = box.scrollHeight;
  }
  function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;
    appendUserMessage(text);
    input.value = '';
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<a>Lydia is typing...</a>';
    document.getElementById('chat-box').appendChild(typing);
    scrollToBottom();
    fetch('https://kuldip123456789.app.n8n.cloud/webhook/Lydia Copy', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: text
    })
      .then(r => r.json())
      .then(data => {
        typing.remove();
        appendBotMessage(data.output || "I didn't understand that. Can you rephrase?");
      })
      .catch(() => {
        typing.remove();
        appendBotMessage("⚠️ Couldn’t connect to the server. Please try again later.");
      });
  }
  document.getElementById('send-btn').onclick = sendMessage;
  document.getElementById('user-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
})();
