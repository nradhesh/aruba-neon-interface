
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ArrowLeft, TrendingUp, Database, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollectionStatsPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    
    // TODO: Replace with actual API call
    console.log('Fetching collection statistics');
    console.log('API Endpoint: // Insert API URL for collection statistics here');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStats({
        totalDocuments: 15420,
        totalCollections: 24,
        activeUsers: 156,
        storageUsed: '2.4 GB',
        queryPerformance: {
          avgResponseTime: '0.23s',
          successRate: '99.7%'
        },
        recentActivity: [
          { type: 'Query', count: 1250, change: '+12%' },
          { type: 'Insert', count: 340, change: '+5%' },
          { type: 'Update', count: 89, change: '-3%' }
        ]
      });
    }, 2000);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" className="bg-transparent border-gray-700 text-white hover:border-neon-pink">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-black/50 border-neon-pink text-neon-pink border">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold neon-text">Collection Statistics</h1>
              <p className="text-gray-400">Retrieve analytics and statistics from data collections</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Card className="glass-morphism">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-6 h-6 border-2 border-neon-pink border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-300">Loading statistics...</span>
              </div>
            </CardContent>
          </Card>
        ) : stats && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-morphism">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-neon-pink mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalDocuments.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Documents</div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.totalCollections}</div>
                  <div className="text-sm text-gray-400">Collections</div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-neon-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-neon-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stats.storageUsed}</div>
                  <div className="text-sm text-gray-400">Storage Used</div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-neon-pink">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-neon-blue">{stats.queryPerformance.avgResponseTime}</div>
                    <div className="text-sm text-gray-400">Avg Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-2xl font-bold text-neon-green">{stats.queryPerformance.successRate}</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-neon-pink">Recent Activity</CardTitle>
                <CardDescription>Activity statistics for the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{activity.type}</div>
                        <div className="text-gray-400 text-sm">{activity.count} operations</div>
                      </div>
                      <div className={`text-sm font-semibold ${activity.change.startsWith('+') ? 'text-neon-green' : 'text-neon-orange'}`}>
                        {activity.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* API Integration Info */}
        <Card className="glass-morphism mt-8">
          <CardHeader>
            <CardTitle className="text-neon-orange">🔧 API Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• <strong>Endpoint:</strong> <code className="bg-gray-800 px-2 py-1 rounded">// Insert API URL for collection statistics here</code></p>
              <p>• <strong>Method:</strong> GET</p>
              <p>• <strong>Headers:</strong> Authorization</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CollectionStatsPage;
