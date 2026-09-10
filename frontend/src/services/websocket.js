export function openAlertStream(onMessage) {
  const ws = new WebSocket(`ws://${location.host}/ws/alerts`);
  ws.onmessage = (e) => onMessage(JSON.parse(e.data));
  ws.onerror = (e) => console.warn("ws error", e);
  return ws;
}
