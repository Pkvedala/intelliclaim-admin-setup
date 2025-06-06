
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Claim {
  claimId: string;
  patientName: string;
  claimDate: string;
  overallConfidence: number;
  approvalStatus: 'Not Reviewed' | 'Pending' | 'Approved' | 'Rejected';
  lastUpdated: string;
}

interface ClaimsTableProps {
  onClaimClick: (claimId: string) => void;
}

const ClaimsTable: React.FC<ClaimsTableProps> = ({ onClaimClick }) => {
  const [sortColumn, setSortColumn] = useState<keyof Claim>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Mock data
  const mockClaims: Claim[] = [
    {
      claimId: 'CLM12345',
      patientName: 'John Doe',
      claimDate: '2025-06-04',
      overallConfidence: 52,
      approvalStatus: 'Pending',
      lastUpdated: '2025-06-06 10:30 AM'
    },
    {
      claimId: 'CLM12346',
      patientName: 'Jane Smith',
      claimDate: '2025-06-05',
      overallConfidence: 87,
      approvalStatus: 'Not Reviewed',
      lastUpdated: '2025-06-06 09:15 AM'
    },
    {
      claimId: 'CLM12347',
      patientName: 'Robert Johnson',
      claimDate: '2025-06-03',
      overallConfidence: 34,
      approvalStatus: 'Not Reviewed',
      lastUpdated: '2025-06-05 16:45 PM'
    },
    {
      claimId: 'CLM12348',
      patientName: 'Maria Garcia',
      claimDate: '2025-06-02',
      overallConfidence: 76,
      approvalStatus: 'Approved',
      lastUpdated: '2025-06-05 14:20 PM'
    }
  ];

  const handleSort = (column: keyof Claim) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: Claim['approvalStatus']) => {
    const variants = {
      'Not Reviewed': 'default',
      'Pending': 'secondary',
      'Approved': 'default',
      'Rejected': 'destructive'
    } as const;

    const colors = {
      'Not Reviewed': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence < 50) return 'text-red-600 font-semibold';
    if (confidence < 75) return 'text-yellow-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  const totalPages = Math.ceil(mockClaims.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClaims = mockClaims.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, mockClaims.length)} of {mockClaims.length} claims
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('claimId')}
            >
              Claim ID {sortColumn === 'claimId' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('patientName')}
            >
              Patient Name {sortColumn === 'patientName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('claimDate')}
            >
              Claim Date {sortColumn === 'claimDate' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('overallConfidence')}
            >
              Overall Confidence (%) {sortColumn === 'overallConfidence' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('approvalStatus')}
            >
              Approval Status {sortColumn === 'approvalStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSort('lastUpdated')}
            >
              Last Updated {sortColumn === 'lastUpdated' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentClaims.map((claim) => (
            <TableRow 
              key={claim.claimId} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onClaimClick(claim.claimId)}
            >
              <TableCell className="font-medium text-blue-600 hover:underline">
                {claim.claimId}
              </TableCell>
              <TableCell>{claim.patientName}</TableCell>
              <TableCell>{claim.claimDate}</TableCell>
              <TableCell className={getConfidenceColor(claim.overallConfidence)}>
                {claim.overallConfidence}%
              </TableCell>
              <TableCell>
                {getStatusBadge(claim.approvalStatus)}
              </TableCell>
              <TableCell>{claim.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              size="sm"
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ClaimsTable;
