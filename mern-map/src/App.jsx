import "./App.css";

function App() {
  return (
    <div className="bg-black h-screen flex justify-center">
      <form className="my-10">
        <label for="search">
          <span className="mr-2 text-white">Check Map: </span>{" "}
        </label>
        <input
          type="search"
          class="py-1 pl-10 text-sm text-gray-700 bg-gray-200 border border-white rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Search..."
        ></input>
      </form>
    </div>
  );
}

export default App;
