import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex justify-center backdrop-blur items-center h-screen">
      <ClipLoader color="#36d7b7" size={150} />
    </div>
  );
}
