import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download } from 'lucide-react';
import ClaimsTable from '@/components/claims/ClaimsTable';
import SearchFilters from '@/components/claims/SearchFilters';
import SummaryWidgets from '@/components/claims/SummaryWidgets';
import BackToHomeButton from '@/components/ui/BackToHomeButton';

const ClaimsSearch = () => {
  const [searchBy, setSearchBy] = useState<'claimId' | 'patientName'>('claimId');
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    status: [] as string[],
    confidenceThreshold: 60
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Search triggered:', { searchBy, searchValue, filters });
    // Search logic would go here
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setFilters({
      dateFrom: '',
      dateTo: '',
      status: [],
      confidenceThreshold: 60
    });
  };

  const handleClaimClick = (claimId: string) => {
    navigate(`/claims/detail/${claimId}`);
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
              <span className="ml-4 text-gray-500">Claims Processor &gt; Search Claims</span>
            </div>
            <div className="flex items-center space-x-4">
              <BackToHomeButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Claims Search</h1>
          <p className="text-gray-600 mt-2">
            Search and review claims by Claim ID or Patient Name
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Claims
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Type Toggle */}
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="claimId"
                  name="searchBy"
                  checked={searchBy === 'claimId'}
                  onChange={() => setSearchBy('claimId')}
                  className="text-blue-600"
                />
                <Label htmlFor="claimId">Claim ID</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="patientName"
                  name="searchBy"
                  checked={searchBy === 'patientName'}
                  onChange={() => setSearchBy('patientName')}
                  className="text-blue-600"
                />
                <Label htmlFor="patientName">Patient Name</Label>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder={searchBy === 'claimId' ? 'Enter Claim ID (e.g., CLM12345)' : 'Enter Patient Name'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>

            {/* Advanced Filters Toggle */}
            <div>
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Advanced Filters
                <span className="ml-2">{showFilters ? '▼' : '▶'}</span>
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                onSearch={handleSearch}
                onClear={handleClearFilters}
              />
            )}
          </CardContent>
        </Card>

        {/* Summary Widgets */}
        <SummaryWidgets />

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ClaimsTable onClaimClick={handleClaimClick} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClaimsSearch;
