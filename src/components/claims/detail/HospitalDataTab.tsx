import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface HospitalDataTabProps {
  claimId: string;
}

interface HospitalField {
  label: string;
  value: string;
  confidence: number;
  showOnlyForIndia?: boolean;
}

const HospitalDataTab: React.FC<HospitalDataTabProps> = ({ claimId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  // Mock data - would come from API
  const hospitalData: HospitalField[] = [
    { label: 'Hospital ID', value: 'HOSP123', confidence: 98 },
    { label: 'Hospital Name', value: "St. Mary's Medical Center", confidence: 88 },
    { label: 'Hospital City', value: 'Mumbai', confidence: 45 },
    { label: 'Hospital Location', value: 'Downtown District', confidence: 72 },
    { label: 'Address', value: '123 Medical Ave, Mumbai, MH 400001', confidence: 85 },
    { label: 'Provider License #', value: 'LIC789456', confidence: 92 },
    { label: 'Rohini ID', value: 'ROH123456', confidence: 78, showOnlyForIndia: true },
    { label: 'Date of Admission', value: '2025-06-01', confidence: 95 },
    { label: 'Discharge Date', value: '2025-06-03', confidence: 90 },
    { label: 'In-Network', value: 'Yes', confidence: 85 },
    { label: 'Out-of-Network', value: 'No', confidence: 85 }
  ];

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

  // Assume country is India for demo - would come from claim data
  const countryRegion = 'India';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Hospital Data</CardTitle>
            <Button onClick={handleViewDocument} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Original Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hospitalData.map((field, index) => {
              // Hide Rohini ID if not in India
              if (field.showOnlyForIndia && countryRegion !== 'India') {
                return null;
              }

              return (
                <div key={index} className={`p-4 border rounded-lg ${getConfidenceStyle(field.confidence)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <label className="font-medium text-gray-700">{field.label}</label>
                    <span className={`text-sm ${getConfidenceColor(field.confidence)}`}>
                      ({field.confidence}%)
                    </span>
                  </div>
                  <div className="font-semibold" title={`Raw extracted: ${field.value}`}>
                    {field.value}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hospital Data Comments</CardTitle>
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
              placeholder="Add a comment about hospital data..."
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

export default HospitalDataTab;
