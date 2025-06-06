
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SummaryWidgets = () => {
  // Mock data
  const summaryData = {
    totalUnreviewed: 123,
    lowConfidenceClaims: 45,
    pendingOver24h: 17
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {summaryData.totalUnreviewed}
            </div>
            <div className="text-gray-600 mt-2">Total Unreviewed</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {summaryData.lowConfidenceClaims}
            </div>
            <div className="text-gray-600 mt-2">Claims with Confidence &lt; 60%</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {summaryData.pendingOver24h}
            </div>
            <div className="text-gray-600 mt-2">Claims Pending &gt; 24 hours</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryWidgets;
