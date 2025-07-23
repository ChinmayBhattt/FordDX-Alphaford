import { useNavigate } from 'react-router-dom';
import DnaAnimation from '../components/DnaAnimation';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* DNA Animation Background */}
      <DnaAnimation />

      <div className="z-10 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl text-blue-600 dark:text-blue-400">
          Predict Protein Structure Using AI
        </h1>
        
        <p className="mb-8 text-lg md:text-xl max-w-2xl">
          FoldDx uses advanced AI to predict protein structures from UniProt IDs, 
          analyze mutation severity, and securely log results on the ICP blockchain.
        </p>
        
        <button 
          onClick={() => navigate('/input')} 
          className="px-8 py-3 text-lg font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Get Started
        </button>
      </div>

      <footer className="absolute bottom-0 w-full p-4 text-center text-sm">
        <p>© 2023 FoldDx - Protein Structure Prediction Platform</p>
      </footer>
    </div>
  );
};

export default Home;