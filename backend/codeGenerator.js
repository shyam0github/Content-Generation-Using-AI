const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "Write HTML, JS and bootstrap 5 code for a simple contacts page that takes in a name, email, and message and sends it to a database."}],
}).then((response) => {
    // console.log(response.data);
    console.log(response.data.choices[0].message);
})
