
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal, Edit, Trash2, TestTube, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RuleEditDialog from './RuleEditDialog';
import RuleTestDialog from './RuleTestDialog';

interface Rule {
  ruleId: string;
  category: string;
  ruleText: string;
  severity: 'Error' | 'Warning';
  effectiveDate?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

const mockRules: Rule[] = [
  {
    ruleId: 'R-001',
    category: 'Hospital',
    ruleText: 'IF HospitalID NOT IN approved_hospitals THEN flag as Error',
    severity: 'Error',
    effectiveDate: '2024-01-01',
    isActive: true,
    createdBy: 'admin@intelliclaim.com',
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdatedBy: 'admin@intelliclaim.com',
    lastUpdatedAt: '2024-01-15T10:30:00Z'
  },
  {
    ruleId: 'R-002',
    category: 'Patient',
    ruleText: 'IF PatientAge < 18 AND GuardianConsent = false THEN flag as Warning',
    severity: 'Warning',
    effectiveDate: '2024-06-15',
    isActive: true,
    createdBy: 'supervisor@intelliclaim.com',
    createdAt: '2024-06-20T14:15:00Z',
    lastUpdatedBy: 'admin@intelliclaim.com',
    lastUpdatedAt: '2024-06-22T09:45:00Z'
  },
  {
    ruleId: 'R-003',
    category: 'Medical',
    ruleText: 'IF ClaimAmount > 100000 AND PreAuthRequired = true AND PreAuthStatus != "Approved" THEN flag as Error',
    severity: 'Error',
    isActive: true,
    createdBy: 'medical.admin@intelliclaim.com',
    createdAt: '2024-03-10T11:20:00Z',
    lastUpdatedBy: 'medical.admin@intelliclaim.com',
    lastUpdatedAt: '2024-03-10T11:20:00Z'
  },
  {
    ruleId: 'R-004',
    category: 'Policy',
    ruleText: 'IF PolicyEndDate < ClaimDate THEN flag as Error',
    severity: 'Error',
    isActive: false,
    createdBy: 'policy.admin@intelliclaim.com',
    createdAt: '2024-02-05T16:30:00Z',
    lastUpdatedBy: 'admin@intelliclaim.com',
    lastUpdatedAt: '2024-05-10T08:15:00Z'
  }
];

const RuleTable = () => {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [filteredRules, setFilteredRules] = useState<Rule[]>(mockRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [activeOnly, setActiveOnly] = useState(true);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [testingRule, setTestingRule] = useState<Rule | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    let filtered = rules;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(rule => 
        rule.ruleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.ruleText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(rule => rule.category === categoryFilter);
    }

    // Apply severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter(rule => rule.severity === severityFilter);
    }

    // Apply active filter
    if (activeOnly) {
      filtered = filtered.filter(rule => rule.isActive);
    }

    setFilteredRules(filtered);
  }, [rules, searchTerm, categoryFilter, severityFilter, activeOnly]);

  const handleEdit = (rule: Rule) => {
    setEditingRule(rule);
  };

  const handleTest = (rule: Rule) => {
    setTestingRule(rule);
  };

  const handleDelete = (ruleId: string) => {
    if (window.confirm(`Are you sure you want to permanently delete Rule '${ruleId}'? This action cannot be undone.`)) {
      setRules(prev => prev.filter(rule => rule.ruleId !== ruleId));
      toast({
        title: "Rule Deleted",
        description: `Rule ${ruleId} has been permanently deleted.`,
      });
    }
  };

  const handleSaveRule = (updatedRule: Rule) => {
    setRules(prev => prev.map(rule => 
      rule.ruleId === updatedRule.ruleId ? updatedRule : rule
    ));
    toast({
      title: "Rule Updated",
      description: `Rule ${updatedRule.ruleId} has been successfully updated.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const categories = Array.from(new Set(rules.map(rule => rule.category)));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by RuleID or text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="Error">Error</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="active-only" 
            checked={activeOnly}
            onCheckedChange={(checked) => setActiveOnly(checked as boolean)}
          />
          <label htmlFor="active-only" className="text-sm font-medium">
            Active Only
          </label>
        </div>

        <Button variant="outline" onClick={() => {
          setSearchTerm('');
          setCategoryFilter('all');
          setSeverityFilter('all');
          setActiveOnly(true);
        }}>
          Clear Filters
        </Button>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredRules.length} of {rules.length} rules
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Effective Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.map((rule) => (
              <TableRow key={rule.ruleId}>
                <TableCell className="font-medium">{rule.ruleId}</TableCell>
                <TableCell>{rule.category}</TableCell>
                <TableCell>
                  <Badge variant={rule.severity === 'Error' ? 'destructive' : 'secondary'}>
                    {rule.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  {rule.effectiveDate ? formatDate(rule.effectiveDate) : '-'}
                </TableCell>
                <TableCell>
                  <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{rule.createdBy}</TableCell>
                <TableCell className="text-sm">{formatDate(rule.lastUpdatedAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(rule)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTest(rule)}>
                        <TestTube className="mr-2 h-4 w-4" />
                        Test
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(rule.ruleId)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredRules.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No rules found matching your criteria.
        </div>
      )}

      {/* Edit Dialog */}
      {editingRule && (
        <RuleEditDialog
          rule={editingRule}
          open={!!editingRule}
          onOpenChange={(open) => !open && setEditingRule(null)}
          onSave={handleSaveRule}
        />
      )}

      {/* Test Dialog */}
      {testingRule && (
        <RuleTestDialog
          rule={testingRule}
          open={!!testingRule}
          onOpenChange={(open) => !open && setTestingRule(null)}
        />
      )}
    </div>
  );
};

export default RuleTable;
