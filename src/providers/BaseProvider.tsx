import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/config/wagmi';
import { ErrorBoundary } from 'react-error-boundary';

const queryClient = new QueryClient();

function ErrorFallback({ error }: { error: Error }) {
  console.error('Provider error:', error);
  return <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-primary mb-4">Loading FX1 Digital Hubs...</h1>
      <p className="text-muted-foreground">If this persists, please refresh the page.</p>
    </div>
  </div>;
}

export function BaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            theme={darkTheme({
              accentColor: '#FFD700',
              accentColorForeground: '#000',
              borderRadius: 'medium',
            })}
            modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  );
}
