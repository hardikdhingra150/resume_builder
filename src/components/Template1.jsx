export default function Template1({ data }) {
    const { profile, projects, achievements, experience, education, skills } = data || {};
  
    return (
      <div id="resume-template" className="template1">
        <div className="t1-header">
          <h1 className="t1-name">{profile?.name || 'Your Name'}</h1>
          <div className="t1-contact">
            {profile?.phone && <span>{profile.phone}</span>}
            {profile?.phone && profile?.email && <span> | </span>}
            {profile?.email && <span>{profile.email}</span>}
            {profile?.location && <span> | {profile.location}</span>}
          </div>
        </div>
  
        {profile?.summary && (
          <div className="t1-section">
            <h2 className="t1-heading">Profile Highlights</h2>
            <div className="t1-divider"></div>
            <ul className="t1-list">
              {profile.summary.split('\n').filter(Boolean).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
  
        {education?.length > 0 && education[0]?.institution && (
          <div className="t1-section">
            <h2 className="t1-heading">Education</h2>
            <div className="t1-divider"></div>
            {education.map((edu, i) => (
              <div key={i} className="t1-edu">
                <div className="t1-edu-row">
                  <div>
                    <h3 className="t1-edu-name">{edu.institution}</h3>
                    <p className="t1-edu-degree">{edu.degree}</p>
                  </div>
                  <div className="t1-edu-right">
                    <p>{edu.details}</p>
                    <p>{edu.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
  
        {skills && (
          <div className="t1-section">
            <h2 className="t1-heading">Skills</h2>
            <div className="t1-divider"></div>
            <p className="t1-text"><strong>Languages:</strong> {skills}</p>
          </div>
        )}
  
        {experience?.length > 0 && experience[0]?.company && (
          <div className="t1-section">
            <h2 className="t1-heading">Experience</h2>
            <div className="t1-divider"></div>
            {experience.map((exp, i) => (
              <div key={i} className="t1-exp">
                <div className="t1-exp-row">
                  <h3 className="t1-exp-company">{exp.company} | <span className="t1-italic">Intern</span></h3>
                  <p className="t1-exp-right">{exp.duration}</p>
                </div>
                <p className="t1-exp-role">{exp.role}</p>
                <ul className="t1-list">
                  {exp.description?.split('\n').filter(Boolean).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
  
        {projects?.length > 0 && projects[0]?.title && (
          <div className="t1-section">
            <h2 className="t1-heading">Projects</h2>
            <div className="t1-divider"></div>
            {projects.map((proj, i) => (
              <div key={i} className="t1-project">
                <h3 className="t1-project-title">{proj.title}</h3>
                <p className="t1-text">{proj.description}</p>
                {proj.tech && <p className="t1-text"><strong>Technologies:</strong> {proj.tech}</p>}
              </div>
            ))}
          </div>
        )}
  
        {achievements?.length > 0 && achievements[0]?.text && (
          <div className="t1-section">
            <h2 className="t1-heading">Achievements & Extracurricular Activities</h2>
            <div className="t1-divider"></div>
            <ul className="t1-list">
              {achievements.map((ach, i) => (
                <li key={i}>{ach.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  