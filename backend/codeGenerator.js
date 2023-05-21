const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "Generate a paragraph on football worldcup."}],
}).then((response) => {
    // console.log(response.data);
    console.log(response.data.choices[0].message);
})
