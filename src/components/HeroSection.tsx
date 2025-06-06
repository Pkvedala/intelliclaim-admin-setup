
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Brain, Gauge } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block">IntelliClaim:</span>
              <span className="block text-blue-600">AI-Powered Claims Processing</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 sm:max-w-3xl">
              Streamline medical claim review with multi‐modal LLMs, automated rule checks, 
              and real-time insights. Process claims faster and more accurately than ever before.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/admin">
                    Log In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/demo">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="bg-white rounded-lg p-8 border">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
                    <FileText className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Document</span>
                    <span className="text-sm text-gray-500">Processing</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
                    <Brain className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">AI</span>
                    <span className="text-sm text-gray-500">Extraction</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
                    <Gauge className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Real-time</span>
                    <span className="text-sm text-gray-500">Insights</span>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Processing Status</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Claims processed: 1,247 / 1,663</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
