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
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    try {
      // First, get template from localStorage
      const savedTemplate = localStorage.getItem(`template_${currentUser.id}`) || 'template1';
      console.log('📋 Template from localStorage:', savedTemplate);
      setSelectedTemplate(savedTemplate);

      // Then load user data from Supabase
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
          template: savedTemplate
        });
      } else {
        // Use template from DB if available, otherwise use localStorage
        const finalTemplate = data.template || savedTemplate;
        console.log('📋 Final template:', finalTemplate);
        setSelectedTemplate(finalTemplate);
        setUserData({
          ...data,
          template: finalTemplate
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      const savedTemplate = localStorage.getItem(`template_${currentUser.id}`) || 'template1';
      setSelectedTemplate(savedTemplate);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Loading your resume...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Improved Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-content">
          <div className="navbar-inner">
            <h1 className="navbar-title">AI Resume Builder</h1>
            <div className="navbar-buttons">
              <button
                onClick={() => navigate('/dashboard')}
                className="view-resume-btn"
              >
                <span>←</span> Back to Dashboard
              </button>
              <button
                onClick={handleDownloadPDF}
                className="download-pdf-btn"
              >
                <span>📥</span> Download PDF
              </button>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Resume - {selectedTemplate === 'template1' ? 'Classic Template' : 'Modern Template'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
              Last updated: {userData?.last_updated ? new Date(userData.last_updated).toLocaleDateString('en-IN') : 'Never'}
            </div>
            <div className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-lg">
              Template: {selectedTemplate === 'template1' ? 'Classic' : 'Modern'}
            </div>
          </div>
        </div>
        
        {userData && (
          <div className="resume-container">
            {selectedTemplate === 'template1' ? (
              <Template1 data={userData} />
            ) : (
              <Template2 data={userData} />
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={handleDownloadPDF}
            className="download-pdf-btn-large"
          >
            <span className="text-2xl">📥</span>
            <span>Download as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
