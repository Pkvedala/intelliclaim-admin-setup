import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MedicalDataTabProps {
  claimId: string;
}

interface MedicalDataRow {
  provisionalDiagnosis: { value: string; confidence: number };
  nameOfSurgery: { value: string; confidence: number };
  diagnosisCodes: { value: string; confidence: number };
  procedureCodes: { value: string; confidence: number };
  dateOfAdmission: { value: string; confidence: number };
  serviceDates: { value: string; confidence: number };
  billedAmounts: { value: string; confidence: number };
}

const MedicalDataTab: React.FC<MedicalDataTabProps> = ({ claimId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  // Mock data
  const medicalData: MedicalDataRow[] = [
    {
      provisionalDiagnosis: { value: 'Appendicitis', confidence: 85 },
      nameOfSurgery: { value: 'Appendectomy', confidence: 90 },
      diagnosisCodes: { value: 'K35.80, K35.89', confidence: 80 },
      procedureCodes: { value: '44950, 44970', confidence: 75 },
      dateOfAdmission: { value: '06/01/2025', confidence: 95 },
      serviceDates: { value: '06/01/2025, 06/02/2025', confidence: 90 },
      billedAmounts: { value: '$12,345.00', confidence: 80 }
    },
    {
      provisionalDiagnosis: { value: 'Post-operative care', confidence: 78 },
      nameOfSurgery: { value: 'Follow-up consultation', confidence: 82 },
      diagnosisCodes: { value: 'Z98.89', confidence: 85 },
      procedureCodes: { value: '99213', confidence: 88 },
      dateOfAdmission: { value: '06/01/2025', confidence: 95 },
      serviceDates: { value: '06/03/2025', confidence: 92 },
      billedAmounts: { value: '$250.00', confidence: 85 }
    }
  ];

  // Mock rule violation
  const ruleViolation = {
    ruleId: 'R-014',
    message: 'PatientAge < 18 & ProcedureCode=44950 – Pediatric Review Required'
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence < 50) return 'text-red-600 bg-red-50';
    if (confidence < 75) return 'text-yellow-600 bg-yellow-50';
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

  return (
    <div className="space-y-6">
      {/* Rule Violation Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Rule {ruleViolation.ruleId} triggered:</strong> {ruleViolation.message}
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Medical Data</CardTitle>
            <Button onClick={handleViewDocument} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              View Original Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provisional Diagnosis</TableHead>
                  <TableHead>Name of Surgery</TableHead>
                  <TableHead>Diagnosis Codes (ICD-10)</TableHead>
                  <TableHead>Procedure Codes (CPT)</TableHead>
                  <TableHead>Date of Admission</TableHead>
                  <TableHead>Service Date(s)</TableHead>
                  <TableHead>Billed Amounts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className={getConfidenceColor(row.provisionalDiagnosis.confidence)}>
                      <div>{row.provisionalDiagnosis.value}</div>
                      <div className="text-sm">({row.provisionalDiagnosis.confidence}%)</div>
                    </TableCell>
                    <TableCell className={getConfidenceColor(row.nameOfSurgery.confidence)}>
                      <div>{row.nameOfSurgery.value}</div>
                      <div className="text-sm">({row.nameOfSurgery.confidence}%)</div>
                    </TableCell>
                    <TableCell className={getConfidenceColor(row.diagnosisCodes.confidence)}>
                      <div>{row.diagnosisCodes.value}</div>
                      <div className="text-sm">({row.diagnosisCodes.confidence}%)</div>
                    </TableCell>
                    <TableCell className={getConfidenceColor(row.procedureCodes.confidence)}>
                      <div>{row.procedureCodes.value}</div>
                      <div className="text-sm">({row.procedureCodes.confidence}%)</div>
                    </TableCell>
                    <TableCell className={getConfidenceColor(row.dateOfAdmission.confidence)}>
                      <div>{row.dateOfAdmission.value}</div>
                      <div className="text-sm">({row.dateOfAdmission.confidence}%)</div>
                    </TableCell>
                    <TableCell className={getConfidenceColor(row.serviceDates.confidence)}>
                      <div>{row.serviceDates.value}</div>
                      <div className="text-sm">({row.serviceDates.confidence}%)</div>
                    </TableCell>
                    <TableCell className={getConfidenceColor(row.billedAmounts.confidence)}>
                      <div>{row.billedAmounts.value}</div>
                      <div className="text-sm">({row.billedAmounts.confidence}%)</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Data Comments</CardTitle>
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
              placeholder="Add a comment about medical data..."
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

export default MedicalDataTab;
