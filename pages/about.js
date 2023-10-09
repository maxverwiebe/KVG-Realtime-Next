const About = () => {
    return (
      <div>
        <title>KVG-Tracker</title>
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-semibold text-gray-200">About</h2>
  
          <p className="mt-4 text-gray-300">
            Welcome to the KVG-Tracker application – a modern website built with Next.js for visualizing real-time data of the "Kieler Verkehrsgesellschaft" (KVG).
          </p>

          <div class="p-4 mt-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 bg-gray-800 text-blue-300" role="alert">
            <span class="font-medium">Information</span> We are not affiliated with KVG. This website was deployed for presentation purposes only and created for educational purposes.
        </div>
  
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-200">Features</h3>
            <ul className="list-disc list-inside mt-2 ml-4 text-gray-300">
              <li>Search for stations by name.</li>
              <li>Save your favorite stations for easy access.</li>
              <li>View real-time data about departing buses from every station.</li>
              <li>Follow bus trips by seeing real-time trip data.</li>
            </ul>
          </div>
  
          <p className="mt-8 text-gray-300">
            Our Tech Stack includes:
          </p>
  
          <ul className="list-disc list-inside mt-2 ml-4 text-gray-300">
            <li>Next.js for React-based web application development.</li>
            <li>Tailwind CSS for easy and responsive styling.</li>
            {/* Add more technologies here if relevant */}
          </ul>
  
          <p className="mt-8 text-gray-300">
            Explore the project on GitHub: <a href="https://github.com/maxverwiebe/KVG-Realtime-Next" target="_blank" rel="noopener noreferrer">KVG-Realtime-Next on GitHub</a>
          </p>
        </div>
      </div>
    );
  };
  
  export default About;
  