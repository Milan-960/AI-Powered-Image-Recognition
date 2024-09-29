"use client";

import { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import Head from "next/head";

// Define the prediction type manually
type Prediction = {
  className: string;
  probability: number;
};

export default function ImagePage() {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle image upload and prediction
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);

      // Load the MobileNet model and classify the image
      const model = await mobilenet.load();
      if (imgRef.current) {
        const results = await model.classify(imgRef.current);
        setPredictions(results);
      }
    }
  };

  return (
    <>
      <Head>
        <title>AI Image Recognition</title>
        <meta
          name="description"
          content="An AI-powered image recognition app"
        />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-4">
          AI-Powered Image Recognition
        </h1>
        <input
          aria-label="test"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-6 text-center"
        />
        {image && (
          <div>
            <img
              ref={imgRef}
              src={image}
              alt="Uploaded"
              className="w-72 mb-4"
            />
            <h2 className="text-2xl font-semibold">Predictions:</h2>
            <ul className="mt-4">
              {predictions.map((prediction, index) => (
                <li key={index} className="text-lg">
                  {prediction.className} - Confidence:{" "}
                  {(prediction.probability * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
