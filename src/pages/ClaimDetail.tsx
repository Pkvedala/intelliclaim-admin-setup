
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ArrowLeft, MessageCircle } from 'lucide-react';
import SummaryTab from '@/components/claims/detail/SummaryTab';
import HospitalDataTab from '@/components/claims/detail/HospitalDataTab';
import PatientDataTab from '@/components/claims/detail/PatientDataTab';
import MedicalDataTab from '@/components/claims/detail/MedicalDataTab';
import PolicyDataTab from '@/components/claims/detail/PolicyDataTab';
import ChatPanel from '@/components/claims/detail/ChatPanel';

const ClaimDetail = () => {
  const { claimId } = useParams<{ claimId: string }>();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for claim:', claimId);
    // PDF download logic would go here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                IntelliClaim
              </Link>
              <span className="ml-4 text-gray-500">
                Claims Processor &gt; Search &gt; Claim Detail
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleDownloadPDF}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" asChild>
                <Link to="/claims/search" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Main Content Area */}
          <div className={`transition-all duration-300 ${isChatOpen ? 'w-3/4' : 'w-full'}`}>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Claim Detail: {claimId}
              </h1>
              <p className="text-gray-600 mt-2">
                Review all extracted fields and data for this claim
              </p>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="hospital">Hospital Data</TabsTrigger>
                <TabsTrigger value="patient">Patient Data</TabsTrigger>
                <TabsTrigger value="medical">Medical Data</TabsTrigger>
                <TabsTrigger value="policy">Policy Data</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-6">
                <SummaryTab claimId={claimId!} />
              </TabsContent>

              <TabsContent value="hospital" className="mt-6">
                <HospitalDataTab claimId={claimId!} />
              </TabsContent>

              <TabsContent value="patient" className="mt-6">
                <PatientDataTab claimId={claimId!} />
              </TabsContent>

              <TabsContent value="medical" className="mt-6">
                <MedicalDataTab claimId={claimId!} />
              </TabsContent>

              <TabsContent value="policy" className="mt-6">
                <PolicyDataTab claimId={claimId!} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Panel Toggle Button */}
          {!isChatOpen && (
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
              <Button
                onClick={() => setIsChatOpen(true)}
                className="p-3 rounded-full shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          )}

          {/* Chat Panel */}
          {isChatOpen && (
            <div className="w-1/4 min-w-80">
              <ChatPanel 
                claimId={claimId!} 
                onClose={() => setIsChatOpen(false)} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
