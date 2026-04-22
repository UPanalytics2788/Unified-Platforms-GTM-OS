async function test() {
  try {
    console.log("Fetching /api/agent...");
    const res = await fetch('http://127.0.0.1:3000/api/agent', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt: "Say hello", userPrompt: "Hi", temperature: 0.3 })
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Body:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
