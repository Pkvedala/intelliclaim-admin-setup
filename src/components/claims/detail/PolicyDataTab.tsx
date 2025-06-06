import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, RefreshCw, AlertTriangle } from 'lucide-react';

interface PolicyDataTabProps {
  claimId: string;
}

interface PolicyField {
  label: string;
  value: string;
  confidence: number;
  isFetched?: boolean;
}

const PolicyDataTab: React.FC<PolicyDataTabProps> = ({ claimId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data
  const policyData: PolicyField[] = [
    { label: 'Policy Number', value: 'POL789456123', confidence: 95 },
    { label: 'Customer ID', value: 'CUST456789', confidence: 88, isFetched: true },
    { label: 'Account ID', value: 'ACC123789', confidence: 92, isFetched: true },
    { label: 'Policy Start Date', value: '2024-01-01', confidence: 90, isFetched: true },
    { label: 'Policy End Date', value: '2024-12-31', confidence: 90, isFetched: true },
    { label: 'Sum Insured', value: '$100,000.00', confidence: 85, isFetched: true },
    { label: 'Coverage Type', value: 'Comprehensive Health', confidence: 78 },
    { label: 'Co-Pay %', value: '20%', confidence: 82, isFetched: true },
    { label: 'Co-Pay', value: '$2,469.00', confidence: 75 },
    { label: 'Deductible', value: '$1,000.00', confidence: 88, isFetched: true }
  ];

  // Mock mismatch - claim date after policy end
  const hasMismatch = true;
  const claimDate = '06/04/2025';
  const policyEndDate = '12/31/2024';

  const getConfidenceStyle = (confidence: number) => {
    if (confidence < 50) return 'border-red-300 bg-red-50';
    if (confidence < 75) return 'border-yellow-300 bg-yellow-50';
    return 'border-gray-300 bg-white';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence < 50) return 'text-red-600';
    if (confidence < 75) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        timestamp: new Date().toLocaleString('en-US'),
        user: 'currentUser',
        text: comment.trim()
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleViewDocument = () => {
    console.log('Opening original document for claim:', claimId);
  };

  const handleFetchPolicyDetails = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('Policy details refreshed at', new Date().toLocaleString());
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mismatch Alert */}
      {hasMismatch && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Out of Coverage:</strong> Claim Date ({claimDate}) is after Policy End Date ({policyEndDate})
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Policy Data</CardTitle>
            <div className="flex gap-2">
              <Button 
                onClick={handleFetchPolicyDetails} 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Fetch Policy Details
              </Button>
              <Button onClick={handleViewDocument} variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Original Document
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policyData.map((field, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getConfidenceStyle(field.confidence)}`}>
                <div className="flex justify-between items-start mb-2">
                  <label className="font-medium text-gray-700">{field.label}</label>
                  <span className={`text-sm ${getConfidenceColor(field.confidence)}`}>
                    ({field.confidence}%)
                  </span>
                </div>
                <div className={`font-semibold ${field.isFetched ? 'text-blue-600' : 'text-black'}`} 
                     title={field.isFetched ? 'Fetched from external system' : `Raw extracted: ${field.value}`}>
                  {field.value}
                </div>
                {field.isFetched && (
                  <div className="text-xs text-blue-600 mt-1">
                    Fetched from external system
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Data Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Comments */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  [{comment.timestamp}] {comment.user}:
                </div>
                <div>{comment.text}</div>
              </div>
            ))}
          </div>

          {/* Add New Comment */}
          <div className="space-y-2">
            <Textarea
              placeholder="Add a comment about policy data..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
              Submit Comment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyDataTab;
