"use client"

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-900 text-white p-6 rounded-lg m-4">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">The application encountered an error. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded"
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer">Error Details (Dev Only)</summary>
              <pre className="mt-2 text-sm bg-red-800 p-2 rounded overflow-auto">
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
