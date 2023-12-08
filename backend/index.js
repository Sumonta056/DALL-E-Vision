const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const message = req.body.content;
  const response = await fetch(
    "https://api.openai.com/v1/images/generations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        prompt: message,
        n: 1,
        size: "256x256",
      }),
    }
  );
    let data = await response.json();
    console.log(data.data[0].url);
    res.send(data.data[0].url);

});

const port = 8082;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
