// molecules/EnhancedFeatureCard.tsx
import React from 'react';
import { H2, BodyText } from "@/components/atoms/Typography";

interface EnhancedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlights: string[];
  color: string;
  index: number;
}

const FeatureCard: React.FC<EnhancedFeatureCardProps> = ({
  icon,
  title,
  description,
  highlights,
  color,
  index
}) => {
  const colorVariants = {
    blue: {
      gradient: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-900",
      highlight: "bg-blue-100 text-blue-700"
    },
    purple: {
      gradient: "from-purple-50 to-purple-100", 
      border: "border-purple-200",
      icon: "text-purple-600",
      title: "text-purple-900",
      highlight: "bg-purple-100 text-purple-700"
    },
    green: {
      gradient: "from-green-50 to-green-100",
      border: "border-green-200", 
      icon: "text-green-600",
      title: "text-green-900",
      highlight: "bg-green-100 text-green-700"
    },
    orange: {
      gradient: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      icon: "text-orange-600", 
      title: "text-orange-900",
      highlight: "bg-orange-100 text-orange-700"
    }
  };

  const variant = colorVariants[color as keyof typeof colorVariants] || colorVariants.blue;

  return (
    <div 
      className={`group relative p-8 bg-white rounded-2xl border-2 ${variant.border} hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${variant.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${variant.gradient} flex items-center justify-center ${variant.icon} mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        {/* Title */}
        <H2 className={`text-xl font-bold ${variant.title} mb-4 group-hover:text-gray-900 transition-colors duration-300`}>
          {title}
        </H2>

        {/* Description */}
        <BodyText className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </BodyText>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight, idx) => (
            <span 
              key={idx}
              className={`px-3 py-1 ${variant.highlight} rounded-full text-xs font-medium`}
            >
              {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:border-blue-400 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
    </div>
  );
};
export default FeatureCard;