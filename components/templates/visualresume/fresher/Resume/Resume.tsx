// @/components/organisms/visualresume/fresher/Resume.tsx

import React from 'react';
import { VisualResumeData } from '@/types/visualresume/fresher';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  photoUrl?: string;
}

interface ResumeProps {
  visualResume: VisualResumeData;
  user: User;
  isPreview?: boolean;
}

const Resume: React.FC<ResumeProps> = ({ visualResume, user, isPreview = false }) => {
  const currentColors = visualResume.colors || { bg: '#2563eb', font: '#ffffff' };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header Section */}
      <div 
        className="p-8 text-white"
        style={{ backgroundColor: currentColors.bg, color: currentColors.font }}
      >
        <div className="flex items-center gap-6">
          {/* Profile Photo */}
          {visualResume.personalInformation?.photoDisplay && user.photoUrl && (
            <div className="flex-shrink-0">
              <img 
                src={user.photoUrl} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h1>
            {visualResume.personalInformation?.designation && (
              <p className="text-xl mb-4 opacity-90">
                {visualResume.personalInformation.designation}
              </p>
            )}
            
            {/* Contact Information */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>{user.email}</span>
              </div>
              
              {visualResume.personalInformation?.phone && (
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{visualResume.personalInformation.phone}</span>
                </div>
              )}
              
              {visualResume.personalInformation?.addressDisplay && visualResume.personalInformation?.address && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{visualResume.personalInformation.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* About Me / Profile Summary */}
            {visualResume.personalInformation?.aboutMe && (
              <section>
                <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  About Me
                </h2>
                <div 
                  className="text-gray-700 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: visualResume.personalInformation.aboutMe }}
                />
              </section>
            )}

            {/* Technical Skills */}
            {visualResume.skills?.value && visualResume.skills.value.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  Technical Skills
                </h2>
                <div className="space-y-3">
                  {visualResume.skills.value.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{skill.value}</span>
                        <span className="text-xs text-gray-500">{skill.rating}/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: currentColors.bg,
                            width: `${(parseInt(skill.rating) / 5) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Hobbies */}
            {visualResume.hobbies?.value && visualResume.hobbies.value.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  Hobbies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {visualResume.hobbies.value.map((hobby, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: currentColors.bg }}
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Area of Interest */}
            {visualResume.areaOfIntrest?.show && (
              <section>
                <h2 className="text-xl font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  {visualResume.areaOfIntrest.title}
                </h2>
                <div className="space-y-2 text-sm">
                  {visualResume.areaOfIntrest.area1Topic && (
                    <div>• <strong>{visualResume.areaOfIntrest.area1}:</strong> {visualResume.areaOfIntrest.area1Topic}</div>
                  )}
                  {visualResume.areaOfIntrest.area2Topic && (
                    <div>• <strong>{visualResume.areaOfIntrest.area2}:</strong> {visualResume.areaOfIntrest.area2Topic}</div>
                  )}
                  {visualResume.areaOfIntrest.area3Topic && (
                    <div>• <strong>{visualResume.areaOfIntrest.area3}:</strong> {visualResume.areaOfIntrest.area3Topic}</div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Professional Info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Education */}
            {visualResume.educationalInformation?.value && visualResume.educationalInformation.value.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  Education
                </h2>
                <div className="space-y-4">
                  {visualResume.educationalInformation.value
                    .filter(edu => edu.toggle)
                    .map((education, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: currentColors.bg }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-lg">{education.degree}</h3>
                        <span className="text-sm text-gray-500">{education.year}</span>
                      </div>
                      <p className="text-gray-700 font-medium">{education.college}</p>
                      <p className="text-sm text-gray-600">CGPA: {education.cgpa}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Work Experience / Industrial Training */}
            {visualResume.trainingsInformation?.value && visualResume.trainingsInformation.value.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  {visualResume.trainingsInformation.title}
                </h2>
                <div className="space-y-4">
                  {visualResume.trainingsInformation.value.map((training, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: currentColors.bg }}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-lg">{training.type}</h3>
                        <span className="text-sm text-gray-500">
                          {training.startDate} - {training.endDate}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-2">{training.org}</p>
                      <div 
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: training.desc }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {visualResume.projectInformation?.value && visualResume.projectInformation.value.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  Projects
                </h2>
                <div className="space-y-4">
                  {visualResume.projectInformation.value.map((project, index) => (
                    <div key={index} className="border-l-4 pl-4" style={{ borderColor: currentColors.bg }}>
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <div 
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: project.desc }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Extra Curricular Activities */}
            {visualResume.extraCurricular?.value && visualResume.extraCurricular.value.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ borderColor: currentColors.bg }}>
                  Extra Curricular Activities
                </h2>
                <ul className="space-y-2">
                  {visualResume.extraCurricular.value.map((activity, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2" style={{ color: currentColors.bg }}>•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {isPreview && (
        <div className="px-8 py-4 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 text-center">
            * This is a preview of your resume. Use the editor to make changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default Resume;
