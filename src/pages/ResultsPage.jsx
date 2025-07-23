import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as NGL from 'ngl';

const ResultsPage = () => {
  const [proteinData, setProteinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const viewerRef = useRef(null);
  const stageRef = useRef(null);
  const navigate = useNavigate();
  const uniprotId = sessionStorage.getItem('uniprotId') || 'Unknown';

  // Mock data for demonstration
  const mockProteinData = {
    uniprotId: uniprotId,
    name: 'Tumor protein p53',
    confidence: 87,
    mutations: [
      { position: 175, severity: 'High', disease: 'Cancer' },
      { position: 248, severity: 'High', disease: 'Li-Fraumeni syndrome' },
      { position: 273, severity: 'Medium', disease: 'Breast cancer' },
    ],
    pdbUrl: 'https://files.rcsb.org/download/1TUP.pdb', // Example PDB file
    blockchainHash: '0x' + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10),
    timestamp: new Date().toISOString(),
    canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  };

  useEffect(() => {
    // Get protein data from session storage (from ProcessingPage)
    const fetchData = async () => {
      try {
        const storedData = sessionStorage.getItem('proteinData');
        
        if (storedData) {
          // Parse the stored data
          const parsedData = JSON.parse(storedData);
          setProteinData(parsedData);
        } else {
          // Fallback to mock data if no stored data is found
          console.warn('No protein data found in session storage, using mock data');
          setProteinData(mockProteinData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading protein data:', err);
        setError('Failed to load protein data');
        setLoading(false);
      }
    };

    fetchData();
  }, [uniprotId]);

  useEffect(() => {
    // Initialize NGL Viewer when protein data is available
    if (!loading && proteinData && viewerRef.current) {
      // Create NGL Stage object
      const stage = new NGL.Stage(viewerRef.current, { backgroundColor: 'white' });
      stageRef.current = stage;

      // Handle window resizing
      window.addEventListener('resize', () => stage.handleResize());

      // Load PDB structure
      stage.loadFile(proteinData.pdbUrl, { defaultRepresentation: true })
        .then(component => {
          // Add custom representation
          component.addRepresentation('cartoon', { color: 'chainid' });
          component.addRepresentation('ball+stick', { 
            sele: 'hetero and not water', 
            color: 'element' 
          });
          
          // Zoom to fit the structure
          stage.autoView();
        })
        .catch(err => {
          console.error('Error loading PDB:', err);
          setError('Failed to load protein structure');
        });

      // Cleanup function
      return () => {
        if (stage) {
          stage.dispose();
        }
        window.removeEventListener('resize', () => stage.handleResize());
      };
    }
  }, [loading, proteinData]);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleVerifyOnICP = () => {
    // Store blockchain data in session storage for the log page
    sessionStorage.setItem('blockchainData', JSON.stringify({
      hash: proteinData.blockchainHash,
      timestamp: proteinData.timestamp,
      canisterId: proteinData.canisterId,
      uniprotId: proteinData.uniprotId
    }));
    
    // Navigate to log page
    navigate('/log');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{error}</p>
          <button
            onClick={() => navigate('/input')}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {proteinData.name} ({proteinData.uniprotId})
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Structure prediction results
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 3D Protein Viewer */}
          <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Protein Structure</h2>
            <div ref={viewerRef} className="protein-viewer"></div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Drag to rotate | Scroll to zoom | Shift+drag to translate</p>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Analysis Results</h2>
            
            {/* Confidence Meter */}
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">Prediction Confidence</h3>
              <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div 
                  className="h-4 bg-blue-600 rounded-full" 
                  style={{ width: `${proteinData.confidence}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span>Low</span>
                <span>{proteinData.confidence}%</span>
                <span>High</span>
              </div>
            </div>
            
            {/* Mutation Analysis */}
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">Mutation Analysis</h3>
              <div className="overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Position</th>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Severity</th>
                      <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Disease</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {proteinData.mutations.map((mutation, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap dark:text-white">{mutation.position}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getSeverityColor(mutation.severity)}`}>
                            {mutation.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap dark:text-white">{mutation.disease}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Blockchain Verification */}
            <div>
              <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">Blockchain Verification</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This analysis has been securely logged on the Internet Computer blockchain for verification and reproducibility.
              </p>
              <button
                onClick={handleVerifyOnICP}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify on ICP
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/input')}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            New Prediction
          </button>
          <button
            onClick={() => {
              // In a real app, this would download the PDB file or results
              alert('Download functionality would be implemented here');
            }}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Download Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;