import { TextData } from './data';

const TEXT_DATA_URLS = {
  'nietzsche': {
    url:
        'https://storage.googleapis.com/tfjs-examples/lstm-text-generation/data/nietzsche.txt',
    needle: 'Nietzsche'
  },
  'julesverne': {
    url:
        'https://storage.googleapis.com/tfjs-examples/lstm-text-generation/data/t1.verne.txt',
    needle: 'Jules Verne'
  },
  'shakespeare': {
    url:
        'https://storage.googleapis.com/tfjs-examples/lstm-text-generation/data/t8.shakespeare.txt',
    needle: 'Shakespeare'
  },
  'tfjs-code': {
    url: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.11.7/dist/tf.js',
    needle: 'TensorFlow.js Code (Compiled, 0.11.7)'
  }
}

const testText = document.getElementById('test-text');

const loadData = async () => {
        // textDataSelect.disabled = true;
        // loadTextDataButton.disabled = true;
        // let dataIdentifier = textDataSelect.value;
        console.log(TEXT_DATA_URLS);
        const url = TEXT_DATA_URLS['nietzsche'].url;
        if (testText.value.length === 0) {
          try {
            console.log(`Loading text data from URL: ${url} ...`);
            const response = await fetch(url);
            const textString = await response.text();
            testText.value = textString;
            console.log(
              `Done loading text data ` +
                `(length=${(textString.length / 1024).toFixed(1)}k). ` +
                `Next, please load or create model.`
            );
          } catch (err) {
            console.error("Failed to load text data: " + err.message);
          }
          if (testText.value.length === 0) {
            console.error("ERROR: Empty text data.");
            return;
          }
        } else {
          dataIdentifier = hashCode(testText.value);
        }
        textData = new TextData(
          dataIdentifier,
          testText.value,
          sampleLen,
          sampleStep
        );
        textGenerator = new SaveableLSTMTextGenerator(textData);
        await refreshLocalModelStatus();
}


loadData().then(() => {
  console.log("Done loading data");
})