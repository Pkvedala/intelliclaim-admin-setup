
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HeroSection from '@/components/HeroSection';
import FeaturesOverview from '@/components/FeaturesOverview';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                IntelliClaim
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="usa">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States of America</SelectItem>
                  <SelectItem value="me">Middle East</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
              <Button asChild>
                <Link to="/admin">Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesOverview />
        <HowItWorks />
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Leading Insurance Companies
              </h2>
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <blockquote className="text-xl text-gray-600 text-center mb-6">
                  "IntelliClaim has revolutionized our claims processing workflow. The AI-powered extraction 
                  reduces manual data entry by 85%, and the confidence scoring helps our team focus on 
                  the cases that need human attention."
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">Sarah Johnson</div>
                  <div className="text-gray-600">Claims Processing Director, Premier Insurance</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
