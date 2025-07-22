import React from 'react';
import { Heart, Users, Star, Shield, BookOpen, Palette, Award, Microscope } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Holistic approach bridging modern science with empathy and cultural sensitivity.'
    },
    {
      icon: Star,
      title: 'Evidence-Based',
      description: 'Committed to the highest standards of medical practice and continuous learning.'
    },
    {
      icon: Users,
      title: 'Patient-Centered',
      description: 'Building relationships based on trust, communication, and personal empowerment.'
    },
    {
      icon: Shield,
      title: 'Advanced Techniques',
      description: 'Specialized in minimally invasive laparoscopic and hysteroscopic procedures.'
    }
  ];

  const achievements = [
    {
      icon: BookOpen,
      title: 'Academic Reviewer',
      description: 'International Journal of Gynecology and Obstetrics (FIGO)',
      color: 'blue'
    },
    {
      icon: Microscope,
      title: 'Research Contributor',
      description: 'Cureus Journal - Peer-reviewed medical publications',
      color: 'teal'
    },
    {
      icon: Palette,
      title: 'Classical Arts',
      description: 'Bachelor of Arts in Music (Visharad in Bharatanatyam)',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Kuchipudi Performer',
      description: 'Completed Rangapravesham - formal debut as solo performer',
      color: 'pink'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6">
            About Dr. Kavya Ballal
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A dedicated healthcare professional who uniquely combines medical expertise with artistic passion, 
            delivering exceptional women's health services rooted in science and soul.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-slide-up">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7689942/pexels-photo-7689942.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Dr. Kavya in medical setting"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <h3 className="text-3xl font-bold font-display text-gray-900 mb-8">
              Professional Background
            </h3>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Dr. Kavya Ballal is a practicing Obstetrician and Gynecologist based in Udupi, Karnataka, 
                with over five years of clinical experience. She currently serves at the Government Hospital 
                in Kundapura and consults at her private practice — Ballal's Clinic in Santhekatte.
              </p>
              <p>
                With a strong foundation in women's health and a patient-centered approach, Dr. Kavya is 
                dedicated to delivering comprehensive, compassionate, and evidence-based care across all 
                stages of a woman's reproductive life.
              </p>
              <p>
                Her passion for advancing minimally invasive techniques led her to complete a Fellowship 
                in Minimal Access Surgery at the renowned R.K. School of Endoskills, equipping her with 
                advanced laparoscopic and hysteroscopic surgical skills.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold font-display text-center text-gray-900 mb-12">
            Philosophy & Approach
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover-lift bg-gray-50 rounded-2xl p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-teal-100 text-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <value.icon size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Artistic Pursuits */}
        <div>
          <h3 className="text-3xl font-bold font-display text-center text-gray-900 mb-12">
            Academic & Artistic Excellence
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                  achievement.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  achievement.color === 'teal' ? 'bg-teal-100 text-teal-600' :
                  achievement.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-pink-100 text-pink-600'
                }`}>
                  <achievement.icon size={24} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-12">
          <blockquote className="text-2xl font-display text-gray-800 italic leading-relaxed max-w-4xl mx-auto">
            "I believe in a holistic approach to health — one that bridges modern science with empathy, 
            cultural sensitivity, and personal empowerment. Whether guiding a woman through childbirth 
            or managing complex gynecological concerns, I bring authenticity, warmth, and dedication 
            to every interaction."
          </blockquote>
          <cite className="block mt-6 text-lg font-semibold text-blue-600">
            — Dr. Kavya Ballal
          </cite>
        </div>
      </div>
    </section>
  );
};

export default About;