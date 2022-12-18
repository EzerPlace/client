import React, { useState } from "react";
import { UseAddressPredictions } from "./useAddressPredictions";

export default function AddressPredictions() {
  const [input, setInput] = useState<string>('');

  const predictions = UseAddressPredictions(input);

  return (
    <div>
      <input
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <ul>
        {predictions.map((prediction: any, index: number) => (
          <li key={index}>{prediction.description}</li>
        ))}
      </ul>
    </div>
  );
}