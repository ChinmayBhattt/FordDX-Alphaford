import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictProteinStructure } from '../services/api';

const ProcessingPage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const uniprotId = sessionStorage.getItem('uniprotId') || 'Unknown';

  useEffect(() => {
    let interval;
    let isMounted = true;
    
    const fetchPrediction = async () => {
      try {
        // Start progress animation
        interval = setInterval(() => {
          setProgress((prevProgress) => {
            // Cap progress at 90% until we get actual results
            if (prevProgress >= 90) {
              return 90;
            }
            // Random increment between 1-3%
            return prevProgress + Math.floor(Math.random() * 3) + 1;
          });
        }, 300);
        
        // Make the actual API call
        const result = await predictProteinStructure(uniprotId);
        
        if (isMounted) {
          // Store the result in session storage
          sessionStorage.setItem('proteinData', JSON.stringify(result));
          
          // Complete the progress bar
          clearInterval(interval);
          setProgress(100);
          
          // Navigate to results page after a short delay
          setTimeout(() => navigate('/results'), 500);
        }
      } catch (error) {
        console.error('Error predicting protein structure:', error);
        if (isMounted) {
          clearInterval(interval);
          // Handle error - could navigate to an error page or show an error message
          alert('Error predicting protein structure. Please try again.');
          navigate('/input');
        }
      }
    };
    
    fetchPrediction();
    
    // Cleanup function
    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [navigate, uniprotId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 text-center bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Folding Protein
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300">
          Analyzing UniProt ID: <span className="font-mono font-bold">{uniprotId}</span>
        </p>
        
        {/* Protein folding animation */}
        <div className="flex justify-center my-8">
          <div className="folding-animation w-32 h-32 bg-blue-500 rounded-full opacity-70 flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {progress < 30 && 'Retrieving protein sequence...'}
          {progress >= 30 && progress < 60 && 'Predicting structure...'}
          {progress >= 60 && progress < 90 && 'Analyzing mutations...'}
          {progress >= 90 && 'Finalizing results...'}
        </p>
        
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
          This process typically takes 1-2 minutes
        </p>
      </div>
    </div>
  );
};

export default ProcessingPage;