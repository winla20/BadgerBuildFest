import { useRouter } from '../components/Router';
import { Wallet, ArrowRight, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

export function WalletConnectPage() {
  const { navigateTo, setUserData } = useRouter();

  const handleConnectWallet = (walletType: string) => {
    // Simulate wallet connection
    const mockAddress = `0x${Math.random().toString(36).substring(2, 15).toUpperCase()}`;
    setUserData({ 
      walletAddress: mockAddress,
      walletType: walletType 
    });
    
    toast.success(`${walletType} connected successfully!`);
    
    // Navigate to profile setup after short delay
    setTimeout(() => {
      navigateTo('profile-setup');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 flex items-center justify-center px-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-teal-200/50 p-10 rounded-3xl shadow-2xl shadow-teal-500/10">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Wallet className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl text-slate-900 mb-3">Connect Your Wallet</h2>
            <p className="text-slate-600">Choose your preferred wallet to continue</p>
          </div>

          {/* Wallet Options */}
          <div className="space-y-4">
            <button
              onClick={() => handleConnectWallet('MetaMask')}
              className="w-full bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-300/50 px-6 py-5 rounded-2xl hover:from-teal-100 hover:to-cyan-100 hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/20 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg text-slate-900">Connect to Wallet</span>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleConnectWallet('Gemini Wallet')}
              className="w-full bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300/50 px-6 py-5 rounded-2xl hover:from-cyan-100 hover:to-blue-100 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg text-slate-900">Gemini Wallet</span>
                </div>
                <ArrowRight className="w-5 h-5 text-cyan-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-teal-600" />
              <span>Secure connection powered by blockchain technology</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigateTo('landing')}
            className="text-slate-600 hover:text-slate-900 hover:bg-white/50"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}