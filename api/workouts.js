export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const apiKey = process.env.LYFTA_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      status: false,
      error: "LYFTA_API_KEY is not configured for this deployment.",
    });
  }

  try {
    const response = await fetch(
      "https://my.lyfta.app/api/v1/workouts",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Lyfta workouts error:", error);

    return res.status(500).json({
      status: false,
      error: "Failed to fetch Lyfta workouts",
    });
  }
}