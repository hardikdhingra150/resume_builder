import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Portfolio() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading portfolio...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Portfolio not found</div>
      </div>
    );
  }

  const { profile, projects, achievements, experience, education, skills } = userData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{profile.name}</h1>
          <p className="text-xl mb-6">{profile.summary}</p>
          <div className="flex justify-center gap-4 text-sm">
            <span>{profile.email}</span>
            <span>•</span>
            <span>{profile.phone}</span>
            <span>•</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Projects */}
        {projects?.length > 0 && projects[0].title && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-3">{project.description}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="font-semibold">Tech:</span> {project.tech}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:underline font-semibold"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && experience[0].company && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-gray-600">{exp.duration}</span>
                  </div>
                  <p className="text-purple-700 font-semibold mb-2">{exp.company}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-3">
                {skills.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full font-semibold"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && education[0].institution && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-purple-700 font-semibold">{edu.institution}</p>
                      {edu.details && <p className="text-gray-600 mt-2">{edu.details}</p>}
                    </div>
                    <span className="text-gray-600">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements?.length > 0 && achievements[0].text && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">{achievement.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
