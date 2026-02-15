export default async function handler(req, res) {
  const response = await fetch("https://my.lyfta.app/api/v1/workouts", {
    headers: {
      Authorization: `Bearer ${process.env.LYFTA_API_KEY}`
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
