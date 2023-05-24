import React from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow-models/text-data";

const ModelTrainer = () => {
  const loadModel = async () => {
    const textDataset = await tf.data.textDataset("/path/to/your/data.txt");
    const model = tf.sequential();
    model.add(
      tf.layers.lstm({
        units: 256,
        // inputShape: [sequenceLength, vocabularySize],
      })
    );
    model.add(
    //   tf.layers.dense({ units: vocabularySize, activation: "softmax" })
    );
    model.compile({ optimizer: "adam", loss: "categoricalCrossentropy" });

    const epochs = 50;
    const batchSize = 64;

    await model.fitDataset(textDataset, {
      epochs,
      batchSize,
      callbacks: tf.callbacks.earlyStopping({ patience: 5 }),
    });

    const seed = "Once upon a time";
    const temperature = 0.7;
    const generatedText = await model.generateText(seed, temperature);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={loadModel}>
        Train
      </button>
    </div>
  );
};

export default ModelTrainer;
