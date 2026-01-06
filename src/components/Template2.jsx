export default function Template2({ data }) {
    const { profile, projects, achievements, experience, education, skills } = data || {};
  
    return (
      <div id="resume-template" className="template2">
        <div className="t2-layout">
          {/* Left Sidebar */}
          <div className="t2-sidebar">
            <h1 className="t2-name">{profile?.name || 'YOUR NAME'}</h1>
            <div className="t2-divider-thick"></div>
  
            {/* Contact */}
            <div className="t2-section">
              <h2 className="t2-heading">CONTACT</h2>
              {profile?.phone && <p className="t2-contact-item">📞 {profile.phone}</p>}
              {profile?.email && <p className="t2-contact-item">✉️ {profile.email}</p>}
              {profile?.location && <p className="t2-contact-item">📍 {profile.location}</p>}
            </div>
  
            {/* Skills */}
            {skills && (
              <div className="t2-section">
                <h2 className="t2-heading">SKILLS</h2>
                <ul className="t2-skills-list">
                  {skills.split(',').map((skill, i) => (
                    <li key={i}>{skill.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
  
            {/* Languages */}
            <div className="t2-section">
              <h2 className="t2-heading">LANGUAGES</h2>
              <ul className="t2-list">
                <li>English</li>
                <li>Hindi</li>
              </ul>
            </div>
          </div>
  
          {/* Right Content */}
          <div className="t2-content">
            {/* Profile */}
            {profile?.summary && (
              <div className="t2-section-right">
                <h2 className="t2-heading-right">👤 PROFILE</h2>
                <div className="t2-divider-right"></div>
                <p className="t2-text">{profile.summary}</p>
              </div>
            )}
  
            {/* Projects */}
            {projects?.length > 0 && projects[0]?.title && (
              <div className="t2-section-right">
                <h2 className="t2-heading-right">💼 PROJECTS</h2>
                <div className="t2-divider-right"></div>
                {projects.map((proj, i) => (
                  <div key={i} className="t2-item">
                    <h3 className="t2-item-title">{proj.title}</h3>
                    <p className="t2-text">{proj.description}</p>
                    {proj.tech && <p className="t2-text-small">Tech: {proj.tech}</p>}
                  </div>
                ))}
              </div>
            )}
  
            {/* Education */}
            {education?.length > 0 && education[0]?.institution && (
              <div className="t2-section-right">
                <h2 className="t2-heading-right">🎓 EDUCATION</h2>
                <div className="t2-divider-right"></div>
                {education.map((edu, i) => (
                  <div key={i} className="t2-item">
                    <h3 className="t2-item-title">{edu.degree}</h3>
                    <p className="t2-text">{edu.institution}</p>
                    <p className="t2-text-small">{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
  
            {/* Experience */}
            {experience?.length > 0 && experience[0]?.company && (
              <div className="t2-section-right">
                <h2 className="t2-heading-right">💼 EXPERIENCE</h2>
                <div className="t2-divider-right"></div>
                {experience.map((exp, i) => (
                  <div key={i} className="t2-item">
                    <h3 className="t2-item-title">{exp.role}</h3>
                    <p className="t2-text">{exp.company} | {exp.duration}</p>
                    <p className="t2-text">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
  
            {/* Achievements */}
            {achievements?.length > 0 && achievements[0]?.text && (
              <div className="t2-section-right">
                <h2 className="t2-heading-right">🏆 ACHIEVEMENTS</h2>
                <div className="t2-divider-right"></div>
                <ul className="t2-list-right">
                  {achievements.map((ach, i) => (
                    <li key={i}>{ach.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  