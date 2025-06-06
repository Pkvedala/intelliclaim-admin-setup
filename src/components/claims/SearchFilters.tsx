
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFiltersProps {
  filters: {
    dateFrom: string;
    dateTo: string;
    status: string[];
    confidenceThreshold: number;
  };
  onFiltersChange: (filters: any) => void;
  onSearch: () => void;
  onClear: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onClear
}) => {
  const statusOptions = ['Not Reviewed', 'Pending', 'Approved', 'Rejected'];

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    
    onFiltersChange({
      ...filters,
      status: newStatus
    });
  };

  return (
    <div className="border-t pt-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Label>Claim Date From</Label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label>To</Label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
          />
        </div>

        {/* Confidence Threshold */}
        <div className="space-y-2">
          <Label>Confidence ≤ {filters.confidenceThreshold}%</Label>
          <Input
            type="range"
            min="0"
            max="100"
            value={filters.confidenceThreshold}
            onChange={(e) => onFiltersChange({ ...filters, confidenceThreshold: Number(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Status Filters */}
        <div className="space-y-2">
          <Label>Claim Status</Label>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={status}
                  checked={filters.status.includes(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                />
                <Label htmlFor={status} className="text-sm">{status}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={onSearch}>Apply Filters</Button>
        <Button variant="outline" onClick={onClear}>Clear All</Button>
      </div>
    </div>
  );
};

export default SearchFilters;
