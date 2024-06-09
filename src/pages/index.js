/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ErrorModal from "./ErrorModal";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLogos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/logo-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const { logos } = await response.json();
      setLogos(logos[0]);
    } catch (error) {
      console.error("Failed to generate logos:", error);
      setError("Failed to generate logo. Replicate api must be purchase.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <header className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">AI Logo Generator</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter your logo text..."
          className="text-black border p-2 rounded w-full md:w-1/2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          aria-label="Logo text input"
        />
        <button
          onClick={generateLogos}
          className={`bg-blue-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
          aria-label="Generate logos button"
        >
          {loading ? <span className="loader"></span> : "Generate Logos"}
        </button>
        {logos.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logos.map((logo, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="w-48 h-auto mx-2 my-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; Created by Shiv</p>
        </div>
      </footer>

      {error && <ErrorModal message={error} onClose={closeModal} />}
    </div>
  );
}
