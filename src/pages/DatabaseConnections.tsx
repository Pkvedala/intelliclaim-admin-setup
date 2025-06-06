import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash, Eye, EyeOff, CheckCircle, XCircle, Database } from 'lucide-react';
import BackToHomeButton from '@/components/ui/BackToHomeButton';

interface ConnectionProfile {
  id: string;
  name: string;
  region: string;
  server: string;
  port: string;
  database: string;
  authMethod: 'sql' | 'windows';
  username: string;
  password: string;
  isActive: boolean;
  lastTested?: Date;
  testResult?: 'success' | 'error';
  testMessage?: string;
}

const DatabaseConnections = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  
  const [profiles, setProfiles] = useState<ConnectionProfile[]>([
    {
      id: '1',
      name: 'Prod_USA',
      region: 'usa',
      server: 'prod-sql.company.com',
      port: '1433',
      database: 'IntelliClaim_Prod',
      authMethod: 'sql',
      username: 'admin',
      password: 'encrypted_password',
      isActive: true,
      lastTested: new Date(),
      testResult: 'success',
      testMessage: 'Connection successful'
    },
    {
      id: '2',
      name: 'Dev_India',
      region: 'india',
      server: 'dev-sql.company.com',
      port: '1433',
      database: 'IntelliClaim_Dev',
      authMethod: 'sql',
      username: 'devuser',
      password: 'encrypted_password',
      isActive: false,
      lastTested: new Date(Date.now() - 86400000),
      testResult: 'error',
      testMessage: 'Network timeout'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    region: '',
    server: '',
    port: '1433',
    database: '',
    authMethod: 'sql' as 'sql' | 'windows',
    username: '',
    password: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      region: '',
      server: '',
      port: '1433',
      database: '',
      authMethod: 'sql',
      username: '',
      password: ''
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSave = () => {
    // Validation
    if (!formData.name || !formData.region || !formData.server || !formData.database) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.authMethod === 'sql' && (!formData.username || !formData.password)) {
      toast({
        title: "Validation Error",
        description: "Username and password are required for SQL authentication.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setProfiles(prev => prev.map(profile => 
        profile.id === editingId 
          ? { ...profile, ...formData }
          : profile
      ));
      toast({
        title: "Connection Updated",
        description: "Database connection profile has been updated successfully.",
      });
    } else {
      const newProfile: ConnectionProfile = {
        id: Date.now().toString(),
        ...formData,
        isActive: false
      };
      setProfiles(prev => [...prev, newProfile]);
      toast({
        title: "Connection Created",
        description: "New database connection profile has been created successfully.",
      });
    }

    resetForm();
  };

  const handleEdit = (profile: ConnectionProfile) => {
    setFormData({
      name: profile.name,
      region: profile.region,
      server: profile.server,
      port: profile.port,
      database: profile.database,
      authMethod: profile.authMethod,
      username: profile.username,
      password: profile.password
    });
    setEditingId(profile.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    toast({
      title: "Connection Deleted",
      description: "Database connection profile has been deleted.",
    });
  };

  const handleSetActive = (id: string) => {
    setProfiles(prev => prev.map(profile => ({
      ...profile,
      isActive: profile.id === id
    })));
    toast({
      title: "Active Connection Updated",
      description: "The active database connection has been updated.",
    });
  };

  const handleTestConnection = async (profile: ConnectionProfile) => {
    setTestingId(profile.id);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isSuccess = Math.random() > 0.3; // 70% success rate for demo
    
    setProfiles(prev => prev.map(p => 
      p.id === profile.id 
        ? {
            ...p,
            lastTested: new Date(),
            testResult: isSuccess ? 'success' : 'error',
            testMessage: isSuccess ? 'Connection successful' : 'Invalid credentials'
          }
        : p
    ));
    
    setTestingId(null);
    
    toast({
      title: isSuccess ? "Connection Successful" : "Connection Failed",
      description: isSuccess ? "Database connection is working properly." : "Please check your connection settings.",
      variant: isSuccess ? "default" : "destructive",
    });
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(showPassword === id ? null : id);
    // Auto-hide after 10 seconds
    if (showPassword !== id) {
      setTimeout(() => setShowPassword(null), 10000);
    }
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
              <span className="ml-4 text-gray-500">Admin &gt; Database Connections</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/admin">Back to Admin</Link>
              </Button>
              <BackToHomeButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Database className="h-8 w-8 text-blue-600 mr-3" />
            Database Connections
          </h1>
          <p className="text-gray-600 mt-2">
            Configure and manage SQL database connections for the IntelliClaim platform.
          </p>
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Edit Connection Profile' : 'New Connection Profile'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Profile Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Prod_USA"
                  />
                </div>
                <div>
                  <Label htmlFor="region">Country/Region *</Label>
                  <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States of America</SelectItem>
                      <SelectItem value="me">Middle East</SelectItem>
                      <SelectItem value="india">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="server">Server/Host *</Label>
                  <Input
                    id="server"
                    value={formData.server}
                    onChange={(e) => setFormData(prev => ({ ...prev, server: e.target.value }))}
                    placeholder="e.g., sql.company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="port">Port *</Label>
                  <Input
                    id="port"
                    value={formData.port}
                    onChange={(e) => setFormData(prev => ({ ...prev, port: e.target.value }))}
                    placeholder="1433"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="database">Database Name *</Label>
                <Input
                  id="database"
                  value={formData.database}
                  onChange={(e) => setFormData(prev => ({ ...prev, database: e.target.value }))}
                  placeholder="e.g., IntelliClaim_Prod"
                />
              </div>

              <div>
                <Label>Authentication Method</Label>
                <RadioGroup
                  value={formData.authMethod}
                  onValueChange={(value: 'sql' | 'windows') => setFormData(prev => ({ ...prev, authMethod: value }))}
                  className="flex space-x-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sql" id="sql" />
                    <Label htmlFor="sql">SQL Username/Password</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="windows" id="windows" />
                    <Label htmlFor="windows">Integrated Windows Auth</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.authMethod === 'sql' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Database username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Database password"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button onClick={handleSave}>
                  {editingId ? 'Update Profile' : 'Save Profile'}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Button */}
        {!isCreating && (
          <div className="mb-6">
            <Button onClick={() => setIsCreating(true)} className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              New Connection
            </Button>
          </div>
        )}

        {/* Existing Profiles */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profiles.map((profile) => (
                <div key={profile.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{profile.name}</h3>
                        {profile.isActive && (
                          <Badge variant="default">Active</Badge>
                        )}
                        <Badge variant="outline">
                          {profile.region === 'usa' ? 'United States' : 
                           profile.region === 'me' ? 'Middle East' : 'India'}
                        </Badge>
                        {profile.testResult && (
                          <div className="flex items-center space-x-1">
                            {profile.testResult === 'success' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className={`text-sm ${
                              profile.testResult === 'success' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {profile.testMessage}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Server:</span> {profile.server}:{profile.port}
                        </div>
                        <div>
                          <span className="font-medium">Database:</span> {profile.database}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Password:</span>
                          <span>
                            {showPassword === profile.id ? profile.password : '••••••••'}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePasswordVisibility(profile.id)}
                          >
                            {showPassword === profile.id ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestConnection(profile)}
                        disabled={testingId === profile.id}
                      >
                        {testingId === profile.id ? 'Testing...' : 'Test Connection'}
                      </Button>
                      {!profile.isActive && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetActive(profile.id)}
                        >
                          Mark Active
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(profile)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(profile.id)}
                        disabled={profile.isActive}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseConnections;
