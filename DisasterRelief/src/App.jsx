export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8">
      <header className="text-center mb-8">
        <h1 className="text-white text-5xl font-extrabold">
          Tailwind + React Test
        </h1>
        <p className="text-white mt-2 text-lg">
          Check if Tailwind classes are working correctly
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transform transition">
          <h2 className="text-xl font-semibold mb-2">Card 1</h2>
          <p className="text-gray-600">This is a sample card to test Tailwind styling.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Click Me
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transform transition">
          <h2 className="text-xl font-semibold mb-2">Card 2</h2>
          <p className="text-gray-600">Another card with Tailwind utilities applied.</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Click Me
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transform transition">
          <h2 className="text-xl font-semibold mb-2">Card 3</h2>
          <p className="text-gray-600">This tests grid layout and spacing utilities.</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Click Me
          </button>
        </div>
      </main>
    </div>
  );
}
