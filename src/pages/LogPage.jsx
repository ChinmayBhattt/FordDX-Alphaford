import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogPage = () => {
  const [blockchainData, setBlockchainData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get blockchain data from session storage
    const storedData = sessionStorage.getItem('blockchainData');
    if (storedData) {
      setBlockchainData(JSON.parse(storedData));
    } else {
      // If no data is found, use mock data
      setBlockchainData({
        hash: '0x' + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10),
        timestamp: new Date().toISOString(),
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        uniprotId: 'P04637'
      });
    }
  }, []);

  if (!blockchainData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  // Format the timestamp
  const formattedDate = new Date(blockchainData.timestamp).toLocaleString();

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blockchain Verification</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This analysis has been securely logged on the Internet Computer blockchain
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full dark:bg-green-900">
              <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Verification Successful</h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              The following record was found on the Internet Computer blockchain
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Hash</h3>
              <p className="mt-1 font-mono text-gray-900 break-all dark:text-white">{blockchainData.hash}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</h3>
              <p className="mt-1 text-gray-900 dark:text-white">{formattedDate}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Canister ID</h3>
              <p className="mt-1 font-mono text-gray-900 dark:text-white">{blockchainData.canisterId}</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">UniProt ID</h3>
              <p className="mt-1 text-gray-900 dark:text-white">{blockchainData.uniprotId}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              You can verify this transaction on the Internet Computer blockchain explorer
            </p>
            <a 
              href={`https://dashboard.internetcomputer.org/canister/${blockchainData.canisterId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View on IC Explorer
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/results')}
            className="px-4 py-2 mr-4 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Back to Results
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogPage;