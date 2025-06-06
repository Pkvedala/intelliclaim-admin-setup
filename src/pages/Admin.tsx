
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Settings, Users, BarChart3 } from 'lucide-react';
import BackToHomeButton from '@/components/ui/BackToHomeButton';

const Admin = () => {
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
              <span className="ml-4 text-gray-500">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <BackToHomeButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Configuration</h1>
          <p className="text-gray-600 mt-2">
            Manage system settings, database connections, and platform configuration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                Database Connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure SQL database connections for claims processing and data storage.
              </p>
              <Button asChild className="w-full">
                <Link to="/admin/database">Manage Connections</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-6 w-6 text-green-600 mr-2" />
                Rule Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Upload, validate, and manage data validation and business logic rules.
              </p>
              <Button asChild className="w-full">
                <Link to="/admin/rules">Manage Rules</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-6 w-6 text-purple-600 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage user accounts, roles, and permissions for the platform.
              </p>
              <Button asChild className="w-full" variant="outline">
                <Link to="/admin/users">Manage Users</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-6 w-6 text-orange-600 mr-2" />
                Analytics & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View system analytics, processing statistics, and generate reports.
              </p>
              <Button asChild className="w-full" variant="outline">
                <Link to="/admin/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,247</div>
                  <div className="text-gray-600">Claims Processed Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98.5%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">3.2s</div>
                  <div className="text-gray-600">Avg Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
