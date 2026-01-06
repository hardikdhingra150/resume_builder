import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase/config';
import { useNavigate } from 'react-router-dom';
import Template1 from '../components/Template1';
import Template2 from '../components/Template2';
import { generatePDF } from '../utils/pdfGenerator';

export default function Resume() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error) {
        console.error('Error loading data:', error);
        setUserData({
          profile: { name: '', email: currentUser.email, phone: '', location: '', summary: '' },
          projects: [],
          achievements: [],
          experience: [],
          education: [],
          skills: '',
          template: 'template1'
        });
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (userData) {
      generatePDF(userData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your resume...</div>
      </div>
    );
  }

  const selectedTemplate = userData?.template || 'template1';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent">
              AI Resume Builder
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-blue-900 font-semibold hover:bg-blue-50 rounded-lg transition"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
              >
                📥 Download PDF
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Your Resume Preview - {selectedTemplate === 'template1' ? 'Classic Template' : 'Modern Template'}
        </h2>
        
        {userData && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            {selectedTemplate === 'template1' ? (
              <Template1 data={userData} />
            ) : (
              <Template2 data={userData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
