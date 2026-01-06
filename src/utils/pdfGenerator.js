import jsPDF from 'jspdf';

export const generatePDF = (data) => {
  const { profile, projects, achievements, experience, education, skills } = data;
  
  const doc = new jsPDF();
  let yPosition = 20;
  const lineHeight = 7;
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(profile.name || 'Your Name', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${profile.email} | ${profile.phone} | ${profile.location}`, margin, yPosition);
  yPosition += 10;

  // Line separator
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Summary
  if (profile.summary) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFESSIONAL SUMMARY', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryLines = doc.splitTextToSize(profile.summary, pageWidth - 2 * margin);
    doc.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * lineHeight + 5;
  }

  // Experience
  if (experience.length > 0 && experience[0].company) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCE', margin, yPosition);
    yPosition += 7;

    experience.forEach((exp) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.role, margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(exp.duration, pageWidth - margin - 40, yPosition);
      yPosition += 5;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.company, margin, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(exp.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * lineHeight + 5;
    });
  }

  // Projects
  if (projects.length > 0 && projects[0].title) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROJECTS', margin, yPosition);
    yPosition += 7;

    projects.forEach((project) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(project.title, margin, yPosition);
      yPosition += 5;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(project.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPosition);
      yPosition += descLines.length * lineHeight;

      doc.text(`Technologies: ${project.tech}`, margin, yPosition);
      yPosition += 7;
    });
  }

  // Education
  if (education.length > 0 && education[0].institution) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', margin, yPosition);
    yPosition += 7;

    education.forEach((edu) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(edu.year, pageWidth - margin - 30, yPosition);
      yPosition += 5;

      doc.setFontSize(10);
      doc.text(edu.institution, margin, yPosition);
      yPosition += 7;
    });
  }

  // Achievements
  if (achievements.length > 0 && achievements[0].text) {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ACHIEVEMENTS', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    achievements.forEach((achievement) => {
      doc.text(`• ${achievement.text}`, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 3;
  }

  // Skills
  if (skills) {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const skillsLines = doc.splitTextToSize(skills, pageWidth - 2 * margin);
    doc.text(skillsLines, margin, yPosition);
  }

  // Save PDF
  doc.save(`${profile.name || 'resume'}_resume.pdf`);
};
