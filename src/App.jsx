import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './index.css';
import useStore from './store';
import { themes } from './configs/theme';
import { fonts } from './configs/font';
import { mergeClassNames } from './utils/mergeClassName';
import { Resizable } from "re-resizable";
import { Button } from '@nextui-org/react';
import { useCheckMobile } from './hooks/useCheckMobile';

// Lazy load components that are not immediately needed
const CodeEditor = lazy(() => import('./components/CodeEditor'));
const ToolBar = lazy(() => import('./components/ToolBar'));
const WidthMeasurement = lazy(() => import('./components/WidthMeasurement'));

function App() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);
  const theme = useStore((state) => state.theme ?? 'candy');
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);
  const editorRef = useRef(null);

  const isMobile = useCheckMobile();

  useEffect(() => {
    // TODO: handle convert code from base64 text from url
  }, []);

  // Error boundary component to handle errors
  const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      if (hasError) {
        setTimeout(() => setHasError(false), 3000);
      }
    }, [hasError]);

    return hasError ? (
      <div className="error-message">Something went wrong. Please try again later.</div>
    ) : (
      <ErrorBoundaryFallback setHasError={setHasError}>{children}</ErrorBoundaryFallback>
    );
  };

  const ErrorBoundaryFallback = ({ setHasError, children }) => {
    return (
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        )}
        onError={() => setHasError(true)}
      >
        {children}
      </ErrorBoundary>
    );
  };

  return (
    <main className="w-full p-4 min-h-screen items-center dark text-foreground bg-background">
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />
      <div className='md:container flex-column'>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <ToolBar codeEditorRef={editorRef} />
          </Suspense>
        </ErrorBoundary>
        <div className="justify-center flex relative" id='code-editor'>
          <Resizable
            enable={{ left: true, right: true }}
            maxWidth={'100%'}
            minWidth={isMobile ? "100%" : 600}
            size={{ width }}
            onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
            onResizeStart={() => setShowWidth(true)}
            onResizeStop={() => setShowWidth(false)}
          >
            {
              isMobile
                ? null : (
                  <>
                    <div className="bg-slate-300 absolute w-[8px] h-[8px] rounded-[4px] top-[calc(50%-32px)] left-[-4px]">
                    </div>
                    <div className="bg-slate-300 absolute w-[8px] h-[8px] rounded-[4px] top-[calc(50%-32px)] right-[-4px]">
                    </div>
                  </>
                )
            }
            <div
              className={mergeClassNames(
                "overflow-hidden mb-2 transition-all ease-out",
                showBackground ? themes[theme].background : "ring ring-neutral-900"
              )}
              style={{
                padding: isMobile ? 12 : padding,
              }}
              ref={editorRef}
            >
              <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                  <CodeEditor />
                </Suspense>
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
                <WidthMeasurement showWidth={showWidth} width={width} />
              </Suspense>
            </ErrorBoundary>
            <div
              className={mergeClassNames(
                "transition-opacity w-fit mx-auto -mt-4",
                showWidth || width === "auto"
                  ? "invisible opacity-0"
                  : "visible opacity-100"
              )}
            >
              <Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
                Reset width
              </Button>
            </div>
          </Resizable>
        </div>
      </div>
    </main>
  );
}

export default App;
