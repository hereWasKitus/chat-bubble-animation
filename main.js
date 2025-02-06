const $chatForm = document.getElementById("chat-actions");
const $chat = document.getElementById("chat");
const $messageInput = document.getElementById("message-input");
const $bubbleTemplate = document.getElementById('bubble-template');

$chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { message } = Object.fromEntries(new FormData(e.target));
  const $bubbleContainer = document.createElement('li');
  $bubbleContainer.className = 'self-end max-w-[50%]';
  $chat.appendChild($bubbleContainer);
  const $newBubble = $bubbleTemplate.content.cloneNode(true).querySelector('div');
  $newBubble.textContent = message;
  $newBubble.style.viewTransitionName = `bubble-${window.crypto.randomUUID()}`;
  $messageInput.parentElement.append($newBubble);

  document.startViewTransition(() => {
    $bubbleContainer.append($newBubble);
    $newBubble.dataset.sent = "true";
  })

  e.target.reset();
});