'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface LinkStats {
  code: string;
  url: string;
  clicks: number;
  lastClicked: string | null;
  createdAt: string;
}

export default function StatsPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  const [stats, setStats] = useState<LinkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, [code]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/links/${code}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Link not found');
        } else {
          setError('Failed to load stats');
        }
        return;
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested link does not exist.'}</p>
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 inline-flex items-center"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Link Statistics</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Code
              </label>
              <div className="flex items-center space-x-2">
                <code className="text-lg font-mono text-indigo-600 bg-indigo-50 px-4 py-2 rounded">
                  {stats.code}
                </code>
                <button
                  onClick={() => copyToClipboard(stats.code)}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Copy code"
                >
                  📋
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short URL
              </label>
              <div className="flex items-center space-x-2">
                <code className="text-lg font-mono text-indigo-600 bg-indigo-50 px-4 py-2 rounded break-all">
                  {baseUrl}/{stats.code}
                </code>
                <button
                  onClick={() => copyToClipboard(`${baseUrl}/${stats.code}`)}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Copy short URL"
                >
                  📋
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target URL
              </label>
              <div className="flex items-center space-x-2">
                <a
                  href={stats.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:text-blue-800 break-all"
                >
                  {stats.url}
                </a>
                <button
                  onClick={() => copyToClipboard(stats.url)}
                  className="text-indigo-600 hover:text-indigo-800"
                  title="Copy original URL"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-1">Total Clicks</div>
                <div className="text-3xl font-bold text-blue-600">{stats.clicks}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-1">Created At</div>
                <div className="text-sm text-green-600">{formatDate(stats.createdAt)}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-1">Last Clicked</div>
                <div className="text-sm text-purple-600">{formatDate(stats.lastClicked)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

