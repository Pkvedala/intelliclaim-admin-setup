
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, Eye, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Drop any claim document (PDF, image) into IntelliClaim.',
    color: 'text-blue-600'
  },
  {
    icon: FileText,
    title: 'Extract',
    description: 'Multi-linguistic LLMs parse and extract data automatically.',
    color: 'text-green-600'
  },
  {
    icon: CheckCircle,
    title: 'Validate',
    description: 'Custom rules check hospital, patient, medical, and policy data.',
    color: 'text-purple-600'
  },
  {
    icon: Eye,
    title: 'Review',
    description: 'Claims Processors review flagged fields, run chat queries, and download summaries.',
    color: 'text-orange-600'
  },
  {
    icon: Download,
    title: 'Integrate',
    description: 'Approved data is sent directly to your ERP or TPA system.',
    color: 'text-red-600'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined 5-step process transforms complex claims processing 
            into a simple, automated workflow.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-2 border-gray-100 hover:border-gray-200 transition-colors duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Step {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
