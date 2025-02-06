const $appContainer = document.getElementById("app");
const $chatForm = document.getElementById("chat-actions");
const $chat = document.getElementById("chat");
const $messageInput = document.getElementById("message-input");
const messageInputRect = $messageInput.getBoundingClientRect();

$chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const { message } = Object.fromEntries(new FormData(e.target));
  const bubbleForAnimation = createChatBubbleHtml(message);
  bubbleForAnimation.style.position = "absolute";
  bubbleForAnimation.style.top = `${messageInputRect.top}px`;
  bubbleForAnimation.style.left = `${messageInputRect.left}px`;

  const targetNode = [
    ...document.querySelectorAll('[data-user="sender"]'),
  ].pop();

  document.body.appendChild(bubbleForAnimation);
  const [targetTranslateX, targetTranslateY] = calculateDistanceBetweenNodes(
    targetNode,
    bubbleForAnimation
  );
  const animation = bubbleForAnimation.animate(
    [
      {
        transform: `translate(${targetTranslateX}px, ${targetTranslateY}px)`,
      },
    ],
    {
      easing: "ease",
      fill: "forwards",
      duration: 150,
    }
  );
  animation.addEventListener("finish", (e) => {
    bubbleForAnimation.remove();
    $chat.appendChild(createChatBubbleHtml(message, "li"));
  });

  e.target.reset();
});

function createChatBubbleHtml(message, tag = "div") {
  const bubble = document.createElement(tag);
  bubble.textContent = message;
  bubble.className =
    "data-[user=sender]:self-end data-[user=receiver]:self-start w-fit max-w-[50%] py-1 px-2 rounded-md data-[user=sender]:bg-blue-400 data-[user=receiver]:bg-green-400";
  bubble.dataset.user = "sender";
  bubble.id = "bubble-" + window.crypto.randomUUID();
  return bubble;
}

function calculateDistanceBetweenNodes(targetNode, sourceNode) {
  const targetNodeRect = targetNode.getBoundingClientRect();
  const sourceNodeRect = sourceNode.getBoundingClientRect();
  return [
    targetNodeRect.right - sourceNodeRect.right,
    targetNodeRect.bottom - sourceNodeRect.top + 8,
  ];
}
