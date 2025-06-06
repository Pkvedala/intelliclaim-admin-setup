
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ValidationError {
  row: number;
  message: string;
}

interface RulePreview {
  ruleId: string;
  category: string;
  ruleText: string;
  severity: string;
  effectiveDate?: string;
}

const RuleUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<RulePreview[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValidationErrors([]);
      setIsValid(null);
      parseFilePreview(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.txt'))) {
      setSelectedFile(file);
      setValidationErrors([]);
      setIsValid(null);
      parseFilePreview(file);
    }
  };

  const parseFilePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (file.name.endsWith('.csv')) {
        parseCsvPreview(content);
      } else {
        parseTxtPreview(content);
      }
    };
    reader.readAsText(file);
  };

  const parseCsvPreview = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const previewData: RulePreview[] = [];

    for (let i = 1; i < Math.min(11, lines.length); i++) {
      const values = lines[i].split(',').map(v => v.trim());
      previewData.push({
        ruleId: values[0] || '',
        category: values[1] || '',
        ruleText: values[2] || '',
        severity: values[3] || '',
        effectiveDate: values[4] || undefined
      });
    }
    setPreview(previewData);
  };

  const parseTxtPreview = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const previewData: RulePreview[] = [];

    for (let i = 0; i < Math.min(10, lines.length); i++) {
      previewData.push({
        ruleId: `TXT-${i + 1}`,
        category: 'General',
        ruleText: lines[i],
        severity: 'Error'
      });
    }
    setPreview(previewData);
  };

  const validateRules = () => {
    setIsValidating(true);
    const errors: ValidationError[] = [];

    preview.forEach((rule, index) => {
      // Check required fields
      if (!rule.ruleId) {
        errors.push({ row: index + 1, message: 'RuleID is required' });
      }
      if (!rule.ruleText) {
        errors.push({ row: index + 1, message: 'RuleText is required' });
      }
      if (!rule.category) {
        errors.push({ row: index + 1, message: 'Category is required' });
      }
      if (!['Error', 'Warning'].includes(rule.severity)) {
        errors.push({ row: index + 1, message: 'Severity must be "Error" or "Warning"' });
      }

      // Basic syntax validation for RuleText
      if (rule.ruleText) {
        // Check balanced parentheses
        const openCount = (rule.ruleText.match(/\(/g) || []).length;
        const closeCount = (rule.ruleText.match(/\)/g) || []).length;
        if (openCount !== closeCount) {
          errors.push({ row: index + 1, message: 'Unbalanced parentheses in RuleText' });
        }

        // Check for incomplete conditions
        if (rule.ruleText.includes(' AND ') && rule.ruleText.endsWith(' AND')) {
          errors.push({ row: index + 1, message: 'Incomplete condition ending with AND' });
        }
        if (rule.ruleText.includes(' OR ') && rule.ruleText.endsWith(' OR')) {
          errors.push({ row: index + 1, message: 'Incomplete condition ending with OR' });
        }

        // Check for unknown operators
        const unknownOps = rule.ruleText.match(/[><]=?[><]|>>/g);
        if (unknownOps) {
          errors.push({ row: index + 1, message: `Unknown operator(s): ${unknownOps.join(', ')}` });
        }
      }
    });

    setTimeout(() => {
      setValidationErrors(errors);
      setIsValid(errors.length === 0);
      setIsValidating(false);
      
      if (errors.length === 0) {
        toast({
          title: "Validation Successful",
          description: "All rules passed validation checks.",
        });
      } else {
        toast({
          title: "Validation Failed",
          description: `Found ${errors.length} validation error(s).`,
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const saveRules = () => {
    // Simulate saving rules
    toast({
      title: "Rules Saved",
      description: `Successfully saved ${preview.length} rules to the database.`,
    });
    
    // Reset form
    setSelectedFile(null);
    setPreview([]);
    setValidationErrors([]);
    setIsValid(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">
            Drag files here or click to browse
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supported formats: .csv, .txt
          </p>
          <Input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button asChild className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              Browse Files
            </label>
          </Button>
        </div>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-sm text-gray-500">
                ({Math.round(selectedFile.size / 1024)} KB)
              </span>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h4 className="font-medium text-gray-900">Preview (first 10 rows)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">RuleID</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Severity</th>
                      <th className="px-4 py-2 text-left">RuleText</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((rule, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{rule.ruleId}</td>
                        <td className="px-4 py-2">{rule.category}</td>
                        <td className="px-4 py-2">{rule.severity}</td>
                        <td className="px-4 py-2 max-w-xs truncate">{rule.ruleText}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="font-medium mb-2">Validation Errors:</div>
            <ul className="space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>Row {error.row}: {error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Success Message */}
      {isValid === true && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            All rules passed validation checks and are ready to save.
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      {selectedFile && (
        <div className="flex gap-4">
          <Button
            onClick={validateRules}
            disabled={isValidating}
            variant="outline"
          >
            {isValidating ? 'Validating...' : 'Validate Rules'}
          </Button>
          <Button
            onClick={saveRules}
            disabled={isValid !== true}
          >
            Save Rules
          </Button>
          <Button
            onClick={() => {
              setSelectedFile(null);
              setPreview([]);
              setValidationErrors([]);
              setIsValid(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default RuleUpload;
