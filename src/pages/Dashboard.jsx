import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase/config';
import { enhanceContent } from '../utils/geminiHelper';
import { useNavigate } from 'react-router-dom';
import Template1 from '../components/Template1';
import Template2 from '../components/Template2';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [showPreview, setShowPreview] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    email: currentUser?.email || '',
    phone: '',
    location: '',
    summary: ''
  });

  const [projects, setProjects] = useState([{ title: '', description: '', tech: '', link: '' }]);
  const [achievements, setAchievements] = useState([{ text: '', enhanced: false }]);
  const [experience, setExperience] = useState([{ company: '', role: '', duration: '', description: '' }]);
  const [education, setEducation] = useState([{ institution: '', degree: '', year: '', details: '' }]);
  const [skills, setSkills] = useState('');

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
        if (error.code === 'PGRST116') {
          console.log('No data yet, starting fresh');
          const savedTemplate = localStorage.getItem(`template_${currentUser.id}`);
          if (savedTemplate) setSelectedTemplate(savedTemplate);
          return;
        }
        throw error;
      }

      if (data) {
        if (data.profile) setProfile(data.profile);
        if (data.projects && data.projects.length > 0) setProjects(data.projects);
        if (data.achievements && data.achievements.length > 0) setAchievements(data.achievements);
        if (data.experience && data.experience.length > 0) setExperience(data.experience);
        if (data.education && data.education.length > 0) setEducation(data.education);
        if (data.skills) setSkills(data.skills);
        
        const savedTemplate = data.template || localStorage.getItem(`template_${currentUser.id}`) || 'template1';
        setSelectedTemplate(savedTemplate);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      const savedTemplate = localStorage.getItem(`template_${currentUser.id}`);
      if (savedTemplate) setSelectedTemplate(savedTemplate);
    }
  };

  const saveData = async () => {
    console.log('🔵 Saving data...');
    
    try {
      setLoading(true);

      const dataToSave = {
        id: currentUser.id,
        email: currentUser.email,
        profile: {
          name: profile.name || '',
          email: profile.email || currentUser.email,
          phone: profile.phone || '',
          location: profile.location || '',
          summary: profile.summary || ''
        },
        projects: projects.filter(p => p.title || p.description),
        achievements: achievements.filter(a => a.text),
        experience: experience.filter(e => e.company || e.role),
        education: education.filter(e => e.institution || e.degree),
        skills: skills || '',
        last_updated: new Date().toISOString()
      };

      console.log('🔵 Data to save:', dataToSave);

      const { error: mainError } = await supabase
        .from('users')
        .upsert(dataToSave, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (mainError) throw mainError;

      try {
        const { error: templateError } = await supabase
          .from('users')
          .update({ template: selectedTemplate })
          .eq('id', currentUser.id);
        
        if (templateError) {
          console.warn('Template save to DB failed, using localStorage backup:', templateError.message);
        }
      } catch (templateError) {
        console.warn('Template save failed, using localStorage backup');
      }

      localStorage.setItem(`template_${currentUser.id}`, selectedTemplate);

      console.log('✅ Data saved successfully!');
      alert('✅ Data saved successfully!');
    } catch (error) {
      console.error('❌ Save error:', error);
      alert('❌ Error saving data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // PDF Download Function
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      // Get the visible resume template
      const resumeElement = document.querySelector('.template1, .template2');
      
      if (!resumeElement) {
        alert('Please preview your resume first before downloading');
        setIsGeneratingPDF(false);
        return;
      }

      // Generate high-quality canvas
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 800,
        windowHeight: resumeElement.scrollHeight
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download with proper filename
      const fileName = `${profile.name || 'Resume'}_${selectedTemplate === 'template1' ? 'Classic' : 'Modern'}.pdf`;
      pdf.save(fileName);
      
      setIsGeneratingPDF(false);
      alert('✅ Resume downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('❌ Failed to generate PDF. Please try again.');
      setIsGeneratingPDF(false);
    }
  };

  const enhanceAchievement = async (index) => {
    if (!achievements[index].text.trim()) {
      alert('Please enter some text before enhancing');
      return;
    }
    
    setEnhancing(true);
    try {
      const enhanced = await enhanceContent(achievements[index].text, 'achievement');
      const newAchievements = [...achievements];
      newAchievements[index] = { text: enhanced, enhanced: true };
      setAchievements(newAchievements);
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Error enhancing content: ' + (error.message || 'Please try again'));
    }
    setEnhancing(false);
  };

  const enhanceProject = async (index) => {
    if (!projects[index].description.trim()) {
      alert('Please enter project description before enhancing');
      return;
    }
    
    setEnhancing(true);
    try {
      const enhanced = await enhanceContent(projects[index].description, 'project');
      const newProjects = [...projects];
      newProjects[index].description = enhanced;
      setProjects(newProjects);
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Error enhancing content: ' + (error.message || 'Please try again'));
    }
    setEnhancing(false);
  };

  const enhanceExperience = async (index) => {
    if (!experience[index].description.trim()) {
      alert('Please enter experience description before enhancing');
      return;
    }
    
    setEnhancing(true);
    try {
      const enhanced = await enhanceContent(experience[index].description, 'experience');
      const newExp = [...experience];
      newExp[index].description = enhanced;
      setExperience(newExp);
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Error enhancing content: ' + (error.message || 'Please try again'));
    }
    setEnhancing(false);
  };

  const enhanceSummary = async () => {
    if (!profile.summary.trim()) {
      alert('Please enter a summary before enhancing');
      return;
    }
    
    setEnhancing(true);
    try {
      const enhanced = await enhanceContent(profile.summary, 'summary');
      setProfile({ ...profile, summary: enhanced });
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Error enhancing content: ' + (error.message || 'Please try again'));
    }
    setEnhancing(false);
  };

  const addProject = () => setProjects([...projects, { title: '', description: '', tech: '', link: '' }]);
  const addAchievement = () => setAchievements([...achievements, { text: '', enhanced: false }]);
  const addExperience = () => setExperience([...experience, { company: '', role: '', duration: '', description: '' }]);
  const addEducation = () => setEducation([...education, { institution: '', degree: '', year: '', details: '' }]);

  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));
  const removeAchievement = (index) => setAchievements(achievements.filter((_, i) => i !== index));
  const removeExperience = (index) => setExperience(experience.filter((_, i) => i !== index));
  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));

  const resumeData = { profile, projects, achievements, experience, education, skills };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-content">
          <div className="navbar-inner">
            <h1 className="navbar-title">AI Resume Builder</h1>
            <div className="navbar-buttons">
              <button onClick={() => setShowPreview(!showPreview)} className="view-resume-btn">
                {showPreview ? '✏️ Edit' : '👁️ Preview'}
              </button>
              <button onClick={() => navigate('/resume')} className="view-resume-btn">
                📄 Full View
              </button>
              <button 
                onClick={handleDownloadPDF} 
                disabled={isGeneratingPDF || !showPreview}
                className="view-resume-btn"
                style={{ 
                  background: isGeneratingPDF ? '#ccc' : '#8b4513',
                  color: 'white'
                }}
              >
                {isGeneratingPDF ? '⏳ Generating...' : '📥 Download PDF'}
              </button>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        {showPreview ? (
          /* PREVIEW MODE */
          <div className="preview-container">
            <h2 className="dashboard-heading">Resume Preview - {selectedTemplate === 'template1' ? 'Classic Template' : 'Modern Template'}</h2>
            <div className="preview-wrapper">
              {selectedTemplate === 'template1' ? (
                <Template1 data={resumeData} />
              ) : (
                <Template2 data={resumeData} />
              )}
            </div>
            <div className="save-container">
              <button onClick={() => setShowPreview(false)} className="save-btn">
                ← Back to Edit
              </button>
              <button 
                onClick={handleDownloadPDF} 
                disabled={isGeneratingPDF}
                className="save-btn"
                style={{ 
                  background: isGeneratingPDF ? '#ccc' : '#8b4513',
                  marginLeft: '1rem'
                }}
              >
                {isGeneratingPDF ? '⏳ Generating PDF...' : '📥 Download as PDF'}
              </button>
            </div>
          </div>
        ) : (
          /* EDIT MODE - All your existing form fields remain the same */
          <>
            <h2 className="dashboard-heading">Build Your Resume</h2>

            {/* Template Selection */}
            <div className="section-card">
              <h3 className="section-title">📋 Choose Resume Template</h3>
              <div className="template-selector">
                <div 
                  className={`template-option ${selectedTemplate === 'template1' ? 'selected' : ''}`}
                  onClick={() => {
                    console.log('✅ Selected Template 1');
                    setSelectedTemplate('template1');
                    localStorage.setItem(`template_${currentUser.id}`, 'template1');
                  }}
                >
                  <div className="template-preview">Template 1 - Classic</div>
                  <p>Professional single-column layout</p>
                  {selectedTemplate === 'template1' && <span className="selected-badge">✓ Selected</span>}
                </div>
                <div 
                  className={`template-option ${selectedTemplate === 'template2' ? 'selected' : ''}`}
                  onClick={() => {
                    console.log('✅ Selected Template 2');
                    setSelectedTemplate('template2');
                    localStorage.setItem(`template_${currentUser.id}`, 'template2');
                  }}
                >
                  <div className="template-preview">Template 2 - Modern</div>
                  <p>Two-column sidebar design</p>
                  {selectedTemplate === 'template2' && <span className="selected-badge">✓ Selected</span>}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="section-card">
              <h3 className="section-title">Personal Information</h3>
              <div className="input-grid">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="input-field"
                />
              </div>
              <textarea
                placeholder="Professional Summary - Describe your expertise and career goals"
                value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="textarea-field"
                rows="4"
                style={{ whiteSpace: 'pre-line' }}
              />
              <button
                onClick={enhanceSummary}
                disabled={enhancing || !profile.summary}
                className="enhance-btn"
                style={{ marginTop: '12px' }}
              >
                {enhancing ? '⏳ Enhancing...' : '✨ Enhance Summary with AI'}
              </button>
            </div>

            {/* Projects */}
            <div className="section-card">
              <div className="section-header">
                <h3 className="section-title">Projects</h3>
                <button onClick={addProject} className="add-btn">
                  + Add Project
                </button>
              </div>
              {projects.map((project, index) => (
                <div key={index} className="item-card">
                  <div className="item-header">
                    <span className="item-number">Project {index + 1}</span>
                    {projects.length > 1 && (
                      <button onClick={() => removeProject(index)} className="remove-btn">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].title = e.target.value;
                      setProjects(newProjects);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <textarea
                    placeholder="Project Description - Describe what you built and the impact"
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].description = e.target.value;
                      setProjects(newProjects);
                    }}
                    className="textarea-field"
                    rows="4"
                    style={{ marginTop: 0, marginBottom: '12px', whiteSpace: 'pre-line' }}
                  />
                  <input
                    type="text"
                    placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                    value={project.tech}
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].tech = e.target.value;
                      setProjects(newProjects);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <input
                    type="url"
                    placeholder="Project Link (optional)"
                    value={project.link}
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].link = e.target.value;
                      setProjects(newProjects);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <button
                    onClick={() => enhanceProject(index)}
                    disabled={enhancing || !project.description}
                    className="enhance-btn"
                  >
                    {enhancing ? '⏳ Enhancing...' : '✨ Enhance with AI (Bullet Points)'}
                  </button>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="section-card">
              <div className="section-header">
                <h3 className="section-title">Achievements</h3>
                <button onClick={addAchievement} className="add-btn">
                  + Add Achievement
                </button>
              </div>
              {achievements.map((achievement, index) => (
                <div key={index} className="item-card">
                  <div className="item-header">
                    <span className="item-number">Achievement {index + 1}</span>
                    {achievements.length > 1 && (
                      <button onClick={() => removeAchievement(index)} className="remove-btn">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    placeholder="Describe your achievement - awards, recognition, competition wins, etc."
                    value={achievement.text}
                    onChange={(e) => {
                      const newAchievements = [...achievements];
                      newAchievements[index].text = e.target.value;
                      setAchievements(newAchievements);
                    }}
                    className="textarea-field"
                    rows="3"
                    style={{ marginTop: 0, marginBottom: '12px', whiteSpace: 'pre-line' }}
                  />
                  <button
                    onClick={() => enhanceAchievement(index)}
                    disabled={enhancing || !achievement.text}
                    className="enhance-btn"
                  >
                    {enhancing ? '⏳ Enhancing...' : '✨ Enhance with AI (Bullet Points)'}
                  </button>
                  {achievement.enhanced && (
                    <span className="enhanced-badge">✓ Enhanced</span>
                  )}
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="section-card">
              <div className="section-header">
                <h3 className="section-title">Experience</h3>
                <button onClick={addExperience} className="add-btn">
                  + Add Experience
                </button>
              </div>
              {experience.map((exp, index) => (
                <div key={index} className="item-card">
                  <div className="item-header">
                    <span className="item-number">Experience {index + 1}</span>
                    {experience.length > 1 && (
                      <button onClick={() => removeExperience(index)} className="remove-btn">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[index].company = e.target.value;
                      setExperience(newExp);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <input
                    type="text"
                    placeholder="Role/Position"
                    value={exp.role}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[index].role = e.target.value;
                      setExperience(newExp);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., Jan 2023 - Present)"
                    value={exp.duration}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[index].duration = e.target.value;
                      setExperience(newExp);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <textarea
                    placeholder="Description - Your responsibilities and achievements in this role"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...experience];
                      newExp[index].description = e.target.value;
                      setExperience(newExp);
                    }}
                    className="textarea-field"
                    rows="4"
                    style={{ marginTop: 0, marginBottom: '12px', whiteSpace: 'pre-line' }}
                  />
                  <button
                    onClick={() => enhanceExperience(index)}
                    disabled={enhancing || !exp.description}
                    className="enhance-btn"
                  >
                    {enhancing ? '⏳ Enhancing...' : '✨ Enhance with AI (Bullet Points)'}
                  </button>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="section-card">
              <div className="section-header">
                <h3 className="section-title">Education</h3>
                <button onClick={addEducation} className="add-btn">
                  + Add Education
                </button>
              </div>
              {education.map((edu, index) => (
                <div key={index} className="item-card">
                  <div className="item-header">
                    <span className="item-number">Education {index + 1}</span>
                    {education.length > 1 && (
                      <button onClick={() => removeEducation(index)} className="remove-btn">
                        🗑️ Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={edu.institution}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].institution = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <input
                    type="text"
                    placeholder="Degree/Program"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].degree = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g., 2020-2024)"
                    value={edu.year}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].year = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="input-field"
                    style={{ marginBottom: '12px' }}
                  />
                  <textarea
                    placeholder="Additional Details (location, CGPA, relevant coursework, etc.)"
                    value={edu.details}
                    onChange={(e) => {
                      const newEdu = [...education];
                      newEdu[index].details = e.target.value;
                      setEducation(newEdu);
                    }}
                    className="textarea-field"
                    rows="2"
                    style={{ marginTop: 0 }}
                  />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="section-card">
              <h3 className="section-title">Skills</h3>
              <textarea
                placeholder="Enter skills separated by commas (e.g., React, Node.js, Python, MongoDB, Machine Learning)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="textarea-field"
                rows="3"
                style={{ marginTop: 0 }}
              />
            </div>

            <div className="save-container">
              <button
                onClick={saveData}
                disabled={loading}
                className="save-btn"
              >
                {loading ? '⏳ Saving...' : '💾 Save All Data'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}