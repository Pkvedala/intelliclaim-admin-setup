
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Gears, Gauge, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Multi‐Modal Extraction',
    description: 'Extract data from PDFs, images, and scanned forms in 7 languages.',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Gears,
    title: 'Automated Rule Engine',
    description: 'Define complex, compound rules and get instant validation.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Gauge,
    title: 'Real-Time Confidence',
    description: 'Monitor field-level confidence and flag low-certainty items.',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: MessageCircle,
    title: 'Chatbot Assistance',
    description: 'Ask questions about claims in plain English.',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
];

const FeaturesOverview = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Claims Processing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with intuitive design 
            to transform how you handle insurance claims.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
