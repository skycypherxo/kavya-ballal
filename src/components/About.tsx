import React from 'react';
import { Heart, Users, Star, Shield, BookOpen, Palette, Award, Microscope, Sparkles, Zap, User } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Holistic approach bridging modern science with empathy and cultural sensitivity.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Star,
      title: 'Evidence-Based',
      description: 'Committed to the highest standards of medical practice and continuous learning.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Patient-Centered',
      description: 'Building relationships based on trust, communication, and personal empowerment.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Shield,
      title: 'Advanced Techniques',
      description: 'Specialized in minimally invasive laparoscopic and hysteroscopic procedures.',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  const achievements = [
    {
      icon: BookOpen,
      title: 'Academic Reviewer',
      description: 'International Journal of Gynecology and Obstetrics (FIGO)',
      color: 'blue',
      bgGradient: 'from-blue-50 to-indigo-50',
      iconGradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Microscope,
      title: 'Research Contributor',
      description: 'Cureus Journal - Peer-reviewed medical publications',
      color: 'teal',
      bgGradient: 'from-teal-50 to-cyan-50',
      iconGradient: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Palette,
      title: 'Classical Arts',
      description: 'Bachelor of Arts in Music (Visharad in Bharatanatyam)',
      color: 'purple',
      bgGradient: 'from-purple-50 to-violet-50',
      iconGradient: 'from-purple-500 to-violet-600'
    },
    {
      icon: Award,
      title: 'Kuchipudi Performer',
      description: 'Completed Rangapravesham - formal debut as solo performer',
      color: 'pink',
      bgGradient: 'from-pink-50 to-rose-50',
      iconGradient: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <User className="text-blue-600 mr-3" size={32} />
            <h2 className="text-display font-bold text-gray-900">
              About Dr. Kavya Ballal
            </h2>
          </div>
          <p className="text-body-xl text-gray-600 max-w-3xl mx-auto">
            A dedicated physician combining advanced medical expertise with cultural artistry, 
            providing holistic care that honors both scientific excellence and human connection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-slide-up">
            <div className="relative group">
              {/* Enhanced image with professional clip path */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-dashed border-blue-300">
                <img
                  src="/images/WhatsApp Image 2025-07-22 at 19.03.13.jpeg"
                  alt="Dr. Kavya in medical setting"
                  className="w-full h-[400px] object-cover clip-smooth hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 gradient-overlay-2 opacity-15 group-hover:opacity-25 transition-opacity duration-500"></div>
              </div>
              
              {/* Professional decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full opacity-40 animate-bounce-gentle"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-cyan-300 to-blue-400 clip-professional opacity-30 animate-float"></div>
            </div>
          </div>
          
          <div className="animate-fade-in space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <h3 className="text-heading-xl font-black text-gray-900">
                Professional Background
              </h3>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-body-xl font-medium">
                Dr. Kavya Ballal is a practicing <span className="font-bold text-blue-600">Obstetrician and Gynecologist</span> based in Udupi, Karnataka, 
                with over <span className="font-bold text-heading-sm text-blue-700">five years</span> of clinical experience. She currently serves at the Government Hospital 
                in Kundapura and consults at her private practice — <span className="font-bold">Ballal's Healthcare</span> in Santhekatte.
              </p>
              <p className="text-body-lg">
                With a strong foundation in women's health and a patient-centered approach, Dr. Kavya is 
                dedicated to delivering comprehensive, compassionate, and evidence-based care across all 
                stages of a woman's reproductive life.
              </p>
              <p className="text-body-lg">
                Her passion for advancing minimally invasive techniques led her to complete a 
                <span className="font-bold text-cyan-600"> Fellowship in Minimal Access Surgery</span> at the renowned 
                R.K. School of Endoskills, equipping her with advanced laparoscopic and hysteroscopic surgical skills.
              </p>
            </div>
            
            {/* Professional stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-black text-blue-600 mb-2">1000+</div>
                <div className="text-sm font-bold text-gray-600 font-heading">Patients Treated</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg text-center border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-black text-cyan-600 mb-2">15+</div>
                <div className="text-sm font-bold text-gray-600 font-heading">Research Papers</div>
              </div>
            </div>
          </div>
        </div>



        {/* Core Values with enhanced design */}
        <div className="mb-24 animate-fade-in">
                    <h3 className="text-heading-xl font-black text-center text-gray-900 mb-16">
            Core Values & Philosophy
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="modern-card p-8 text-center hover-lift group">
                <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow`}>
                  <value.icon size={32} className="text-white" />
                </div>
                <h4 className="text-heading-md font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Excellence Gallery */}
        <div className="animate-fade-in mb-16">
          <h3 className="text-4xl font-black font-heading text-center text-gray-900 mb-12">
            Medical <span className="gradient-text">Excellence</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-blue-300 shadow-lg">
              <img
                src="/images/WhatsApp Image 2025-07-22 at 19.03.14.jpeg"
                alt="Dr. Kavya performing surgery"
                className="w-full h-80 object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-blue-300 shadow-lg">
              <img
                src="/images/WhatsApp Image 2025-07-22 at 19.04.39.jpeg"
                alt="Dr. Kavya in operation theater"
                className="w-full h-80 object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-blue-300 shadow-lg">
              <img
                src="/images/WhatsApp Image 2025-07-22 at 19.08.32.jpeg"
                alt="Dr. Kavya medical procedure"
                className="w-full h-80 object-cover object-center hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border-2 border-dashed border-blue-300 shadow-lg">
              <img
                src="/images/WhatsApp Image 2025-07-23 at 08.08.29.jpeg"
                alt="Dr. Kavya surgical expertise"
                className="w-full h-80 object-cover object-bottom hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Achievements & Recognition */}
        <div className="animate-fade-in mb-20">
          <h3 className="text-4xl font-black font-heading text-center text-gray-900 mb-16">
            Achievements & <span className="gradient-text-purple">Recognition</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className={`bg-gradient-to-br ${achievement.bgGradient} p-8 rounded-3xl hover-lift group modern-card`}>
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${achievement.iconGradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0 animate-pulse-glow`}>
                    <achievement.icon size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold font-heading text-gray-900 mb-3">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Introduction Section */}
        <div className="animate-fade-in mb-20">
          <div className="text-center modern-card p-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="mb-8">
              <h3 className="text-5xl font-black font-heading text-gray-900 mb-4">
                Meet Dr. <span className="gradient-text">Kavya Ballal</span>
              </h3>
              <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-medium">
                Get to know the person behind the practice through this personal introduction
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative group mb-8">
                <video
                  controls
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover border-2 border-dashed border-blue-300 group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: '16/9', maxHeight: '400px' }}
                  poster="/images/WhatsApp Image 2025-07-22 at 19.04.39.jpeg"
                >
                  <source src="/images/KavyaVideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="relative group mb-8">
                <h4 className="text-2xl font-bold text-center text-blue-700 mb-4">Talk on PCOS</h4>
                <div className="flex justify-center">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/78HuyJEMKAA?si=BPzuT4k4Hdvt4UvX"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-2xl border-2 border-dashed border-blue-300 shadow-2xl"
                  ></iframe>
                </div>
              </div>
                {/* Testimonials Section */}
                <div className="mt-12">
                  <h4 className="text-3xl font-bold text-center text-blue-700 mb-8">Video Testimonials</h4>
                    <div className="overflow-hidden w-full">
                      <div
                        className="flex space-x-8 animate-scroll-x"
                        style={{
                          minWidth: 'max-content',
                          animation: 'scroll-x 40s linear infinite'
                        }}
                      >
                        <div className="bg-white/80 p-6 min-w-[350px] max-w-sm rounded-2xl shadow border border-blue-100 flex-shrink-0">
                          <div className="text-lg font-bold text-blue-900 mb-2">Dr. Satish Shetty</div>
                          <blockquote className="text-gray-800 italic">“Amazing talk! A complex topic you made so simple to understand. I am sure all their doubts would be cleared. What impressed me was your level of confidence—you spoke like a professional, with no signs of nervousness. The icing on the cake was the small smile on your face throughout the discussion. Congratulations, may God bless you with lots of success in all your future endeavors.”</blockquote>
                        </div>
                        <div className="bg-white/80 p-6 min-w-[350px] max-w-sm rounded-2xl shadow border border-blue-100 flex-shrink-0">
                          <div className="text-lg font-bold text-blue-900 mb-2">Dr. Amritha</div>
                          <blockquote className="text-gray-800 italic">“Good morning dear Kavya, you have clarified the myths and differences between PCOS & PCOD, and explained the appropriate management of the same in Kannada very nicely 👏🏻👏🏻👏🏻. Your calm nature and patience in explaining will surely win the confidence of your patients. All the best 💐 for your future endeavors 🤗.”</blockquote>
                        </div>
                        <div className="bg-white/80 p-6 min-w-[350px] max-w-sm rounded-2xl shadow border border-blue-100 flex-shrink-0">
                          <div className="text-lg font-bold text-blue-900 mb-2">Dr. Nishita Shettian</div>
                          <blockquote className="text-gray-800 italic">“Good morning Kavya ❤️❤️. Thank you so much for your kind words. I am truly delighted to hear about your public awareness talk on PCOS being featured on U Channel! It’s a wonderful achievement and a testament to your dedication to health education. I’m proud to have played a part in your journey, and it’s inspiring to see how you are using your knowledge and skills to make a difference in the community. Keep up the fantastic work! Love and prayers always ❤️❤️❤️.”</blockquote>
                        </div>
                        <div className="bg-white/80 p-6 min-w-[350px] max-w-sm rounded-2xl shadow border border-blue-100 flex-shrink-0">
                          <div className="text-lg font-bold text-blue-900 mb-2">Mani Ajja</div>
                          <blockquote className="text-gray-800 italic">“Glad to know. Gone through it—very well narrated and explained in a way that even laypeople can understand. I truly appreciate the great effort. Wishing you many more CME programs ahead 👍💐. Have a good day.”</blockquote>
                        </div>
                      </div>
                    </div>
                  {/* Add keyframes for scroll-x animation */}
                  <style>{`
                    @keyframes scroll-x {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                </div>
            </div>
            
            <blockquote className="text-2xl font-display text-gray-800 italic leading-relaxed max-w-4xl mx-auto mb-6">
              "I believe in a holistic approach to health — one that bridges modern science with empathy, 
              cultural sensitivity, and personal empowerment. Whether guiding a woman through childbirth 
              or managing complex gynecological concerns, I bring authenticity, warmth, and dedication 
              to every interaction."
            </blockquote>
            <cite className="block text-lg font-bold gradient-text-purple">
              — Dr. Kavya Ballal
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;