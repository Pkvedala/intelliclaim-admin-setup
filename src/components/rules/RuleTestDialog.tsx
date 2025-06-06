
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { TestTube, CheckCircle, XCircle } from 'lucide-react';

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

interface TestResult {
  passed: boolean;
  explanation: string;
}

interface RuleTestDialogProps {
  rule: Rule;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RuleTestDialog: React.FC<RuleTestDialogProps> = ({ rule, open, onOpenChange }) => {
  const [sampleData, setSampleData] = useState(`{
  "ClaimAmount": 120000,
  "PatientAge": 16,
  "PolicyStartDate": "2024-01-01",
  "PolicyEndDate": "2024-12-31",
  "ClaimDate": "2024-06-15",
  "HospitalID": "HSP-001",
  "GuardianConsent": false,
  "PreAuthRequired": true,
  "PreAuthStatus": "Pending"
}`);
  
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = () => {
    setIsRunning(true);
    
    // Simulate rule evaluation
    setTimeout(() => {
      try {
        const data = JSON.parse(sampleData);
        let result: TestResult;
        
        // Simulate different rule evaluations based on rule text
        if (rule.ruleText.includes('PatientAge < 18')) {
          const passed = !(data.PatientAge < 18 && data.GuardianConsent === false);
          result = {
            passed,
            explanation: passed 
              ? 'Rule passed: Patient is adult or guardian consent provided'
              : 'Rule failed: Patient is minor and guardian consent is false'
          };
        } else if (rule.ruleText.includes('ClaimAmount > 100000')) {
          const passed = !(data.ClaimAmount > 100000 && data.PreAuthRequired && data.PreAuthStatus !== 'Approved');
          result = {
            passed,
            explanation: passed
              ? 'Rule passed: Pre-authorization requirements met'
              : 'Rule failed: High amount claim requires approved pre-authorization'
          };
        } else if (rule.ruleText.includes('PolicyEndDate < ClaimDate')) {
          const policyEnd = new Date(data.PolicyEndDate);
          const claimDate = new Date(data.ClaimDate);
          const passed = !(policyEnd < claimDate);
          result = {
            passed,
            explanation: passed
              ? 'Rule passed: Claim date is within policy period'
              : 'Rule failed: Claim date is after policy expiration'
          };
        } else {
          // Default evaluation
          result = {
            passed: Math.random() > 0.5,
            explanation: 'Simulated rule evaluation result'
          };
        }
        
        setTestResult(result);
      } catch (error) {
        setTestResult({
          passed: false,
          explanation: 'Invalid JSON format in sample data'
        });
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const resetTest = () => {
    setTestResult(null);
    setSampleData(`{
  "ClaimAmount": 120000,
  "PatientAge": 16,
  "PolicyStartDate": "2024-01-01",
  "PolicyEndDate": "2024-12-31",
  "ClaimDate": "2024-06-15",
  "HospitalID": "HSP-001",
  "GuardianConsent": false,
  "PreAuthRequired": true,
  "PreAuthStatus": "Pending"
}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Test Rule: {rule.ruleId}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Rule Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={rule.severity === 'Error' ? 'destructive' : 'secondary'}>
                {rule.severity}
              </Badge>
              <span className="text-sm text-gray-600">{rule.category}</span>
            </div>
            <div className="text-sm font-mono bg-white p-2 rounded border">
              {rule.ruleText}
            </div>
          </div>

          {/* Sample Data Input */}
          <div>
            <Label htmlFor="sampleData">Sample Claim Data (JSON)</Label>
            <Textarea
              id="sampleData"
              value={sampleData}
              onChange={(e) => setSampleData(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              placeholder="Enter sample JSON data to test against the rule"
            />
          </div>

          {/* Test Result */}
          {testResult && (
            <Alert variant={testResult.passed ? 'default' : 'destructive'}>
              {testResult.passed ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">
                    {testResult.passed ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                <div>{testResult.explanation}</div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetTest}>
            Reset
          </Button>
          <Button 
            onClick={runTest}
            disabled={isRunning}
          >
            {isRunning ? 'Running Test...' : 'Run Test'}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RuleTestDialog;
