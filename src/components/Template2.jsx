export default function Template2({ data }) {
  const { profile, projects, achievements, experience, education, skills } = data;

  return (
    <div className="template2">
      <div className="template2-container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <h1 className="name">{profile.name || 'Your Name'}</h1>

          {/* Contact */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">CONTACT</h2>
            {profile.phone && <div className="contact-item">📞 {profile.phone}</div>}
            {profile.email && <div className="contact-item">📧 {profile.email}</div>}
            {profile.location && <div className="contact-item">📍 {profile.location}</div>}
          </div>

          {/* Skills */}
          {skills && (
            <div className="sidebar-section">
              <h2 className="sidebar-title">SKILLS</h2>
              <ul className="skills-list">
                {skills.split(',').map((skill, idx) => (
                  <li key={idx}>{skill.trim()}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">LANGUAGES</h2>
            <ul className="languages-list">
              <li>English</li>
              <li>Hindi</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {profile.summary && (
            <div className="content-section">
              <h2 className="content-title">
                <span>👤</span> PROFILE
              </h2>
              <div className="profile-text">
                {profile.summary.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          )}

          {projects?.some(proj => proj.title) && (
            <div className="content-section">
              <h2 className="content-title">
                <span>💼</span> PROJECTS
              </h2>
              {projects.map((project, idx) => (
                project.title && (
                  <div key={idx} className="project-item">
                    <h3 className="project-title">{project.title}</h3>
                    {project.tech && <p className="tech-stack">Tech: {project.tech}</p>}
                    {project.description && (
                      <div className="project-desc">
                        {project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <p className="project-link">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          🔗 View Project
                        </a>
                      </p>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {education?.some(edu => edu.institution || edu.degree) && (
            <div className="content-section">
              <h2 className="content-title">
                <span>🎓</span> EDUCATION
              </h2>
              {education.map((edu, idx) => (
                (edu.institution || edu.degree) && (
                  <div key={idx} className="education-item">
                    <h3 className="edu-institution">{edu.institution}</h3>
                    <p className="edu-degree">{edu.degree}</p>
                    {edu.year && <p className="edu-year">{edu.year}</p>}
                    {edu.details && <p>{edu.details}</p>}
                  </div>
                )
              ))}
            </div>
          )}

          {experience?.some(exp => exp.company && exp.role) && (
            <div className="content-section">
              <h2 className="content-title">
                <span>💼</span> EXPERIENCE
              </h2>
              {experience.map((exp, idx) => (
                (exp.company && exp.role) && (
                  <div key={idx} className="experience-item">
                    <h3 className="exp-role">{exp.role} | {exp.company}</h3>
                    {exp.duration && <p className="exp-duration">{exp.duration}</p>}
                    {exp.description && (
                      <div className="exp-desc">
                        {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {achievements?.some(ach => ach.text) && (
            <div className="content-section">
              <h2 className="content-title">
                <span>🏆</span> ACHIEVEMENTS
              </h2>
              <ul className="achievements-list">
                {achievements.map((achievement, idx) => (
                  achievement.text && (
                    <li key={idx}>{achievement.text}</li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
