import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download } from 'lucide-react';

interface SummaryTabProps {
  claimId: string;
}

const SummaryTab: React.FC<SummaryTabProps> = ({ claimId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      timestamp: '06/06/2025 10:30 AM',
      user: 'processor123',
      text: 'Initial review completed. Patient age validation needed.'
    }
  ]);

  // Mock data
  const summaryData = {
    claimId: claimId,
    patientName: 'John Doe',
    claimDate: '06/04/2025',
    insuredId: 'INS789456',
    overallConfidence: 52,
    approvalStatus: 'Pending External'
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence < 50) return 'text-red-600 bg-red-50 border-red-200';
    if (confidence < 75) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for claim:', claimId);
    // PDF download logic
  };

  const handleViewDocument = () => {
    console.log('Opening original document for claim:', claimId);
    // Document viewer logic
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{summaryData.claimId}</CardTitle>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Patient Name:</span>
                  <div className="font-semibold">{summaryData.patientName}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Claim Date:</span>
                  <div className="font-semibold">{summaryData.claimDate}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Insured ID:</span>
                  <div className="font-semibold">{summaryData.insuredId}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleViewDocument} variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Original Document
              </Button>
              <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Overall Confidence and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold p-4 rounded-lg border-2 ${getConfidenceColor(summaryData.overallConfidence)}`}>
              {summaryData.overallConfidence}%
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Minimum confidence across all extracted fields
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-blue-100 text-blue-800 text-lg p-2">
              {summaryData.approvalStatus}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              Final approval must occur in the Insurance/TPA system
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Comments</CardTitle>
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
              placeholder="Add a comment about this claim..."
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

export default SummaryTab;
