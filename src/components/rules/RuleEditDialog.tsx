
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

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

interface RuleEditDialogProps {
  rule: Rule;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (rule: Rule) => void;
}

const RuleEditDialog: React.FC<RuleEditDialogProps> = ({ rule, open, onOpenChange, onSave }) => {
  const [formData, setFormData] = useState({
    ruleId: rule.ruleId,
    category: rule.category,
    ruleText: rule.ruleText,
    severity: rule.severity,
    effectiveDate: rule.effectiveDate || '',
    isActive: rule.isActive
  });
  
  const [validationError, setValidationError] = useState<string>('');
  const [isValidated, setIsValidated] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateRule = () => {
    setIsValidating(true);
    
    // Simulate validation logic
    setTimeout(() => {
      let error = '';
      
      if (!formData.ruleText.trim()) {
        error = 'RuleText is required';
      } else if (!formData.category.trim()) {
        error = 'Category is required';
      } else {
        // Check balanced parentheses
        const openCount = (formData.ruleText.match(/\(/g) || []).length;
        const closeCount = (formData.ruleText.match(/\)/g) || []).length;
        if (openCount !== closeCount) {
          error = 'Unbalanced parentheses in RuleText';
        } else if (formData.ruleText.endsWith(' AND') || formData.ruleText.endsWith(' OR')) {
          error = 'Incomplete condition';
        } else if (formData.ruleText.includes('>>')) {
          error = 'Unknown operator ">>"';
        }
      }
      
      setValidationError(error);
      setIsValidated(error === '');
      setIsValidating(false);
    }, 1000);
  };

  const handleSave = () => {
    const updatedRule: Rule = {
      ...rule,
      ...formData,
      lastUpdatedBy: 'admin@intelliclaim.com',
      lastUpdatedAt: new Date().toISOString()
    };
    
    onSave(updatedRule);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      ruleId: rule.ruleId,
      category: rule.category,
      ruleText: rule.ruleText,
      severity: rule.severity,
      effectiveDate: rule.effectiveDate || '',
      isActive: rule.isActive
    });
    setValidationError('');
    setIsValidated(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Rule: {rule.ruleId}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ruleId">Rule ID</Label>
              <Input
                id="ruleId"
                value={formData.ruleId}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., Hospital, Patient, Medical, Policy"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ruleText">Rule Text</Label>
            <Textarea
              id="ruleText"
              value={formData.ruleText}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, ruleText: e.target.value }));
                setValidationError('');
                setIsValidated(false);
              }}
              rows={4}
              placeholder="Enter the rule logic in natural language or pseudo-SQL format"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="severity">Severity</Label>
              <Select value={formData.severity} onValueChange={(value: 'Error' | 'Warning') => 
                setFormData(prev => ({ ...prev, severity: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Error">Error</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="effectiveDate">Effective Date (Optional)</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, isActive: checked as boolean }))
              }
            />
            <Label htmlFor="isActive">Rule is Active</Label>
          </div>

          {/* Validation Messages */}
          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {isValidated && !validationError && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Rule validation passed. Ready to save.</AlertDescription>
            </Alert>
          )}

          {/* Validation Button */}
          <Button
            onClick={validateRule}
            disabled={isValidating}
            variant="outline"
            className="w-full"
          >
            {isValidating ? 'Validating...' : 'Validate Rule'}
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isValidated || !!validationError}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RuleEditDialog;
