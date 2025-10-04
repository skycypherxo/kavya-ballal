import React from 'react';
import { GraduationCap, Award, Building, Users, BookOpen, Palette, MapPin, Microscope } from 'lucide-react';

const Credentials: React.FC = () => {
  const education = [
    {
      degree: 'MBBS',
      institution: 'Srinivas Institute of Medical Sciences, Mangalore',
      year: '2020',
      specialization: 'Bachelor of Medicine, Bachelor of Surgery - Undergraduate medical education',
      color: 'purple'
    },
    {
      degree: 'M.S.OBG', 
      institution: 'A.J. Institute of Medical Sciences, Mangalore',
      year: '2024',
      specialization: 'Master of Surgery in Obstetrics & Gynecology - High-risk obstetrics, gynecologic surgery, and reproductive health',
      color: 'blue'
    },
    {
      degree: 'F.M.A.S',
      institution: 'R.K. School of Endoskills',
      year: '2025',
      specialization: 'Fellowship in Minimal Access Surgery - Advanced laparoscopic and hysteroscopic surgical techniques',
      color: 'teal'
    }
  ];

  const certifications = [
    'M.S.OBG - Obstetrics & Gynecology (2024)',
    'F.M.A.S - Fellowship in Minimal Access Surgery (2025)',
    'MBBS - Bachelor of Medicine, Bachelor of Surgery (2020)',
    'Advanced Laparoscopic Surgery Certification',
    'Hysteroscopic Surgery Specialist',
    'High-Risk Pregnancy Management'
  ];

  const affiliations = [
    'Indian Medical Association (IMA)',
    'Federation of Obstetric and Gynaecological Societies of India (FOGSI)',
    'International Society of Gynecologic Endoscopy',
    'Association of Gynecologic Laparoscopists',
    'Karnataka Medical Council'
  ];

  const academicRoles = [
    {
      title: 'Peer Reviewer',
      organization: 'International Journal of Gynecology and Obstetrics (FIGO)',
      description: 'Official journal of the International Federation of Gynecology and Obstetrics',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Medical Reviewer',
      organization: 'Cureus Journal',
      description: 'Peer-reviewed, open-access journal for medical professionals',
      icon: Users,
      color: 'teal'
    }
  ];

  const artisticAchievements = [
    {
      title: 'Bachelor of Arts in Music',
      description: 'Visharad in Bharatanatyam - Advanced certification in classical dance',
      year: '2018'
    },
    {
      title: 'Rangapravesham in Kuchipudi',
      description: 'Formal debut as solo performer in classical Kuchipudi dance',
      year: '2019'
    },
    {
      title: 'Drawing Certifications',
      description: 'Elementary and Intermediate Drawing certifications',
      year: '2020'
    }
  ];

  return (
    <section id="credentials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6">
            Education & Credentials
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive medical education and specialized training from premier institutions, 
            combined with active contributions to academic research and classical arts.
          </p>
        </div>

        {/* Medical Education Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-display text-gray-900 mb-4 flex items-center justify-center">
              <GraduationCap className="text-blue-600 mr-3" size={32} />
              Medical Education Timeline
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive journey through medical education at premier institutions, 
              building expertise in obstetrics, gynecology, and minimally invasive surgery.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-teal-500"></div>
            
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 ${
                    edu.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                    edu.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    'bg-gradient-to-br from-teal-500 to-teal-600'
                  }`}>
                    <span className="text-white font-bold text-lg">
                      {edu.degree === 'MBBS' ? 'MB' : 
                       edu.degree === 'M.S.OBG' ? 'MS' : 'FM'}
                    </span>
                  </div>
                  
                  {/* Content card */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2 lg:mb-0">
                          {edu.degree}
                        </h4>
                        <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold ${
                          edu.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          edu.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          'bg-teal-100 text-teal-800'
                        }`}>
                          {edu.year}
                        </span>
                      </div>
                      
                      <h5 className={`text-xl font-semibold mb-3 ${
                        edu.color === 'purple' ? 'text-purple-600' :
                        edu.color === 'blue' ? 'text-blue-600' :
                        'text-teal-600'
                      }`}>
                        {edu.institution}
                      </h5>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {edu.specialization}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mt-4 flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          edu.color === 'purple' ? 'bg-purple-500' :
                          edu.color === 'blue' ? 'bg-blue-500' :
                          'bg-teal-500'
                        }`}></div>
                        <span className="text-sm text-gray-500 font-medium">
                          {index === 0 ? 'Foundation' : index === 1 ? 'Specialization' : 'Advanced Fellowship'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Contributions */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <BookOpen className="text-teal-600 mr-3" size={28} />
            <h3 className="text-3xl font-bold font-display text-gray-900">Academic Contributions</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {academicRoles.map((role, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 hover-lift">
                <div className="flex items-center mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                    role.color === 'blue' ? 'bg-blue-600' : 'bg-teal-600'
                  } text-white`}>
                    <role.icon size={20} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 ml-4">
                    {role.title}
                  </h4>
                </div>
                <p className="text-blue-600 font-medium mb-2">
                  {role.organization}
                </p>
                <p className="text-gray-600">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications and Affiliations */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center mb-8">
              <Award className="text-purple-600 mr-3" size={28} />
              <h3 className="text-3xl font-bold font-display text-gray-900">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center bg-white rounded-xl p-4 shadow-md hover-lift">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <Building className="text-green-600 mr-3" size={28} />
              <h3 className="text-3xl font-bold font-display text-gray-900">Professional Affiliations</h3>
            </div>
            <div className="space-y-4">
              {affiliations.map((affiliation, index) => (
                <div key={index} className="flex items-center bg-white rounded-xl p-4 shadow-md hover-lift">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-full mr-4"></div>
                  <span className="text-gray-700 font-medium">{affiliation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Artistic Achievements */}
        <div>
          <div className="flex items-center mb-8">
            <Palette className="text-pink-600 mr-3" size={28} />
            <h3 className="text-3xl font-bold font-display text-gray-900">Artistic Excellence</h3>
          </div>
          
          
          <div className="grid md:grid-cols-3 gap-8">
            {artisticAchievements.map((achievement, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 hover-lift text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600 rounded-2xl mb-6">
                  <Palette size={24} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {achievement.description}
                </p>
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                  {achievement.year}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-blue-100">Advanced Degrees</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2</div>
              <div className="text-blue-100">Journal Reviewer</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-blue-100">Artistic Certifications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;