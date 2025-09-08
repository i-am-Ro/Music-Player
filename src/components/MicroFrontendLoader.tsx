import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Music2 } from "lucide-react";

const LazyMusicLibrary = React.lazy(() =>
  import("./music/MusicLibrary").then((module) => ({ default: module.default }))
);

interface MicroFrontendLoaderProps {
  appName: string;
  url?: string;
}

const LoadingFallback: React.FC = () => (
  <Card className="bg-music-card border-border/30 mx-4 my-8">
    <CardContent className="py-12 text-center">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 border-4 border-music-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Loading Music Library</h3>
      <p className="text-muted-foreground">Initializing micro frontend...</p>
    </CardContent>
  </Card>
);

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <Card className="bg-music-card  mx-4 my-8">
    <CardContent className="py-12 text-center">
      <Music2 className="w-16 h-16 text-destructive/60 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-destructive">
        Failed to Load Music Library
      </h3>
      <p className="text-muted-foreground mb-4">
        The micro frontend could not be loaded.
      </p>
      {error && (
        <details className="text-left text-sm text-muted-foreground bg-music-surface p-4 rounded border border-border/30">
          <summary className="cursor-pointer font-medium mb-2">
            Error Details
          </summary>
          <pre className="whitespace-pre-wrap">{error.message}</pre>
        </details>
      )}
    </CardContent>
  </Card>
);

class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback: React.ComponentType<{ error?: Error }>;
  },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Micro Frontend Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const MicroFrontendLoader: React.FC<MicroFrontendLoaderProps> = ({
  appName,
  url,
}) => {
  React.useEffect(() => {
    console.log(
      `Loading micro frontend: ${appName}`,
      url ? `from ${url}` : "(local)"
    );
  }, [appName, url]);

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <LazyMusicLibrary />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MicroFrontendLoader;
