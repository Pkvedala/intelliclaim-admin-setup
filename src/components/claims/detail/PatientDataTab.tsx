
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, AlertTriangle } from 'lucide-react';

interface PatientDataTabProps {
  claimId: string;
}

interface PatientField {
  label: string;
  value: string;
  confidence: number;
  showOnlyForIndia?: boolean;
  isCalculated?: boolean;
  hasFutureDate?: boolean;
}

const PatientDataTab: React.FC<PatientDataTabProps> = ({ claimId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  // Mock data
  const patientData: PatientField[] = [
    { label: 'Patient ID', value: 'PAT789456', confidence: 95 },
    { label: 'Patient Name', value: 'John Doe', confidence: 92 },
    { label: 'Patient DOB', value: '2026-02-14', confidence: 88, hasFutureDate: true },
    { label: 'Patient Age', value: '40 years', confidence: 0, isCalculated: true },
    { label: 'Patient Gender', value: 'Male', confidence: 90 },
    { label: 'Patient Address', value: '456 Oak Street, Chicago, IL 60601', confidence: 78 },
    { label: 'Patient City', value: 'Chicago', confidence: 85 },
    { label: 'Patient Contact Number', value: '+1-555-123-4567', confidence: 82 },
    { label: 'Patient Aadhaar Number', value: '1234-5678-9012', confidence: 75, showOnlyForIndia: true }
  ];

  const getConfidenceStyle = (confidence: number, hasFutureDate: boolean = false) => {
    if (hasFutureDate) return 'border-red-300 bg-red-50';
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

  // Assume country is India for demo
  const countryRegion = 'India';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Patient Data</CardTitle>
            <Button onClick={handleViewDocument} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Original Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientData.map((field, index) => {
              // Hide Aadhaar if not in India
              if (field.showOnlyForIndia && countryRegion !== 'India') {
                return null;
              }

              return (
                <div key={index} className={`p-4 border rounded-lg ${getConfidenceStyle(field.confidence, field.hasFutureDate)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <label className="font-medium text-gray-700">{field.label}</label>
                      {field.hasFutureDate && (
                        <span title="DOB is future-dated">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </span>
                      )}
                    </div>
                    <span className={`text-sm ${getConfidenceColor(field.confidence)}`}>
                      {field.isCalculated ? '(calculated)' : `(${field.confidence}%)`}
                    </span>
                  </div>
                  <div className="font-semibold" title={field.isCalculated ? 'Calculated from DOB' : `Raw extracted: ${field.value}`}>
                    {field.value}
                  </div>
                  {field.hasFutureDate && (
                    <div className="text-sm text-red-600 mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      DOB is future-dated
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Data Comments</CardTitle>
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
              placeholder="Add a comment about patient data..."
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

export default PatientDataTab;
