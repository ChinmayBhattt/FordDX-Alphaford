import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
  const [uniprotId, setUniprotId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!uniprotId.trim()) {
      setError('Please enter a UniProt ID');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Store the UniProt ID in session storage for use in other components
    sessionStorage.setItem('uniprotId', uniprotId);
    
    // Navigate to the processing page
    navigate('/processing');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Enter UniProt ID</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Provide a valid UniProt ID (e.g., TP53, P04637) to predict its protein structure
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="uniprotId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              UniProt ID
            </label>
            <div className="mt-1">
              <input
                id="uniprotId"
                name="uniprotId"
                type="text"
                required
                value={uniprotId}
                onChange={(e) => setUniprotId(e.target.value)}
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="e.g., TP53 or P04637"
              />
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Predict Structure
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Example UniProt IDs</h3>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {['P04637', 'P42212', 'P0DTC2', 'P05067', 'P00533'].map((id) => (
            <button
              key={id}
              onClick={() => setUniprotId(id)}
              className="px-3 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputPage;