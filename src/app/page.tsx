"use client";

export default function Home() {

  return (
    <div className="flex justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
        <div className="text-center bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-semibold text-teal-500 mb-4">Em Desenvolvimento</h1>
          <p className="text-lg text-gray-600 mb-6">
            Estamos trabalhando duro para trazer essa funcionalidade em breve!
          </p>
          <svg
            className="w-24 h-24 text-blue-500 mx-auto animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 17l4 4 4-4m0-5v9M4 4h16v2H4z"
            />
          </svg>
        </div>
        <p className="mt-6 text-gray-500">
          Volte em breve para novidades!
        </p>
      </div>

    </div>
  );
}

