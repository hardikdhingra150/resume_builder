export default function Template1({ data }) {
  const { profile, projects, achievements, experience, education, skills } = data;

  return (
    <div className="template1">
      {/* Header */}
      <div className="header">
        <h1 className="name">{profile.name || 'Your Name'}</h1>
        <div className="contact-info">
          {profile.phone && <span>{profile.phone}</span>}
          {profile.email && <span>{profile.email}</span>}
          {profile.location && <span>{profile.location}</span>}
        </div>
      </div>

      {/* Profile/Summary */}
      {profile.summary && (
        <div className="section">
          <h2 className="section-title">Profile Highlights</h2>
          <div className="summary-content">
            {profile.summary.split('\n').filter(line => line.trim()).map((line, idx) => (
              <div key={idx} className="summary-item">{line}</div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.some(edu => edu.institution || edu.degree) && (
        <div className="section">
          <h2 className="section-title">Education</h2>
          {education.map((edu, idx) => (
            (edu.institution || edu.degree) && (
              <div key={idx} className="education-item">
                <div className="education-header">
                  <strong>{edu.institution}</strong>
                </div>
                <div>{edu.degree}</div>
                {edu.year && <div className="year">{edu.year}</div>}
                {edu.details && <div>{edu.details}</div>}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-content">{skills}</div>
        </div>
      )}

      {/* Experience - Only if actual data exists */}
      {experience?.some(exp => exp.company && exp.role) && (
        <div className="section">
          <h2 className="section-title">Experience</h2>
          {experience.map((exp, idx) => (
            (exp.company && exp.role) && (
              <div key={idx} className="experience-item">
                <div className="exp-header">
                  <strong>{exp.role}</strong> | {exp.company}
                </div>
                {exp.duration && <div className="duration">{exp.duration}</div>}
                {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                  <div key={i} className="desc-item">{line}</div>
                ))}
              </div>
            )
          ))}
        </div>
      )}

      {/* Projects */}
      {projects?.some(proj => proj.title) && (
        <div className="section">
          <h2 className="section-title">Projects</h2>
          {projects.map((project, idx) => (
            project.title && (
              <div key={idx} className="project-item">
                <div className="project-header">
                  <strong>{project.title}</strong>
                </div>
                {project.tech && <div className="tech">Tech: {project.tech}</div>}
                {project.description && project.description.split('\n').filter(line => line.trim()).map((line, i) => (
                  <div key={i} className="desc-item">{line}</div>
                ))}
                {project.link && (
                  <div className="link">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      🔗 {project.link}
                    </a>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements?.some(ach => ach.text) && (
        <div className="section">
          <h2 className="section-title">Achievements</h2>
          <ul className="achievements-list">
            {achievements.map((achievement, idx) => (
              achievement.text && (
                <li key={idx}>
                  {achievement.text.split('\n').filter(line => line.trim()).map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
