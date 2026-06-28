import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // Call optional error handler
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // You can also log to an error reporting service here
        // Example: logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-lotus/5 flex items-center justify-center p-4">
                    <div className="max-w-2xl w-full">
                        {/* Lotus Illustration */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-maroon/10 mb-6">
                                <AlertTriangle className="w-12 h-12 text-maroon" />
                            </div>
                            <h1 className="font-display text-4xl text-maroon mb-3">
                                Oops! Something Went Wrong
                            </h1>
                            <p className="text-charcoal/70 text-lg">
                                We encountered an unexpected error. Don't worry, we're here to help you get back on track.
                            </p>
                        </div>

                        {/* Error Details (Development Only) */}
                        {import.meta.env.DEV && this.state.error && (
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-maroon/20 mb-6">
                                <h2 className="font-display text-xl text-maroon mb-3">
                                    Error Details (Development Mode)
                                </h2>
                                <div className="bg-charcoal/5 rounded-lg p-4 mb-4 overflow-auto">
                                    <p className="text-sm font-mono text-red-600 mb-2">
                                        {this.state.error.toString()}
                                    </p>
                                    {this.state.errorInfo && (
                                        <pre className="text-xs text-charcoal/70 whitespace-pre-wrap">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={this.handleReset}
                                variant="primary"
                                className="flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Button>
                            <Button
                                onClick={this.handleGoHome}
                                variant="secondary"
                                className="flex items-center gap-2"
                            >
                                <Home className="w-4 h-4" />
                                Go to Homepage
                            </Button>
                        </div>

                        {/* Help Text */}
                        <div className="mt-8 text-center">
                            <p className="text-charcoal/60 text-sm">
                                If the problem persists, please{' '}
                                <a
                                    href="/contact"
                                    className="text-lotus hover:text-lotus-dark underline"
                                >
                                    contact our support team
                                </a>
                                .
                            </p>
                        </div>

                        {/* Decorative Elements */}
                        <div className="mt-12 flex justify-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-lotus/30 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-lotus/30 animate-pulse delay-100" />
                            <div className="w-2 h-2 rounded-full bg-lotus/30 animate-pulse delay-200" />
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Functional wrapper for easier use with hooks
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    errorBoundaryProps?: Omit<Props, 'children'>
) {
    return function WithErrorBoundaryWrapper(props: P) {
        return (
            <ErrorBoundary {...errorBoundaryProps}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
