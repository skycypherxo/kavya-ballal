import React from 'react';
import { GraduationCap, Award, Building, Users } from 'lucide-react';

const Credentials: React.FC = () => {
  const education = [
    {
      degree: 'Doctor of Medicine (MD)',
      institution: 'All India Institute of Medical Sciences (AIIMS)',
      year: '2005',
      specialization: 'Obstetrics & Gynecology'
    },
    {
      degree: 'Fellowship in Laparoscopic Surgery',
      institution: 'Minimal Access Surgery Institute',
      year: '2008',
      specialization: 'Advanced Laparoscopic Techniques'
    }
  ];

  const certifications = [
    'Board Certified in Obstetrics & Gynecology',
    'Fellowship in Reproductive Medicine',
    'Advanced Laparoscopic Surgery Certification',
    'Fetal Medicine Specialist Certification'
  ];

  const affiliations = [
    'Indian Medical Association (IMA)',
    'Federation of Obstetric and Gynaecological Societies of India (FOGSI)',
    'International Society of Gynecologic Endoscopy',
    'Association of Gynecologic Laparoscopists'
  ];

  const achievements = [
    {
      title: '5000+ Successful Surgeries',
      description: 'Including complex laparoscopic procedures'
    },
    {
      title: 'Excellence in Patient Care Award',
      description: 'Recognized for outstanding patient satisfaction'
    },
    {
      title: 'Research Publications',
      description: 'Published in peer-reviewed medical journals'
    },
    {
      title: 'Medical Conference Speaker',
      description: 'Regular speaker at national conferences'
    }
  ];

  return (
    <section id="credentials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Education & Credentials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Extensive education and training from premier medical institutions with 
            continuous professional development and specialization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <GraduationCap className="text-blue-900 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-900">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-blue-900 font-medium mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {edu.specialization} • {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Award className="text-blue-900 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mr-4"></div>
                  <span className="text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <Building className="text-blue-900 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-900">Professional Affiliations</h3>
            </div>
            <div className="space-y-3">
              {affiliations.map((affiliation, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-900 rounded-full mr-4"></div>
                  <span className="text-gray-700">{affiliation}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Users className="text-blue-900 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-900">Achievements</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;