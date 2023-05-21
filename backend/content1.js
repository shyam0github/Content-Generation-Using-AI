const apiKey = 'grtu0e960d341a79fd2bedbe5ba8ced0d03283a5380297c283e38fcc8346438e9b44';
const modelId = 'model_2Q6e38SCRQ1ncceEpi4YyKoeJfy';
const endpoint = `https://api.gretel.cloud/v1/models/${modelId}/predict`;

const textToPredict = 'This is the input text for prediction.';

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `APIKey ${apiKey}`
  },
  body: JSON.stringify({
    text: textToPredict
  })
})
  .then(response => {
    console.log(response.status)
    return response.json()})
  .then(data => {
    // Handle the prediction response
    console.log(data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });