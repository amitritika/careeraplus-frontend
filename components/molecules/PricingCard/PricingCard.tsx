// molecules/PricingCard.tsx (or EnhancedPricingCard.tsx)
import React from 'react';
import Button from '@/components/atoms/Button';
import { H2, BodyText } from '@/components/atoms/Typography';
import { CheckIcon, StarIcon } from '@/components/atoms/Icons';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  period: string;
  discount?: string | null;
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary';
  onCTAClick: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  originalPrice,
  period,
  discount,
  features,
  popular = false,
  ctaText,
  ctaVariant,
  onCTAClick
}) => (
  <div className={`relative p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col h-full ${
    popular 
      ? 'border-[color:rgb(var(--brand-500))] shadow-2xl scale-105 bg-gradient-to-br from-white to-blue-50' 
      : 'border-gray-200 hover:border-[color:rgb(var(--brand-300))] hover:shadow-xl bg-white'
  }`}>
    {/* Popular Badge */}
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          <StarIcon className="w-4 h-4 mr-1" />
          Most Popular
        </div>
      </div>
    )}

    {/* Discount Badge */}
    {discount && (
      <div className="absolute top-4 right-4">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
          {discount}
        </span>
      </div>
    )}

    {/* Content that grows to fill space */}
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="text-center">
        <H2 className={`text-2xl font-bold mb-2 ${popular ? 'text-[color:rgb(var(--brand-600))]' : 'text-gray-900'}`}>
          {title}
        </H2>
        <BodyText className="text-gray-600 text-sm">
          {description}
        </BodyText>
      </div>

      {/* Pricing */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <div className="text-left">
            <div className="text-gray-500 text-sm line-through">{originalPrice}</div>
            <div className="text-gray-500 text-sm">/{period}</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <BodyText className="text-gray-700 text-sm">{feature}</BodyText>
          </li>
        ))}
      </ul>
    </div>

    {/* Button section at bottom */}
    <div className="mt-6 space-y-4">
      <Button
        variant={ctaVariant}
        size="lg"
        onClick={onCTAClick}
        className="w-full"
      >
        {ctaText}
      </Button>

      {/* Additional Info */}
      <div className="text-center">
        <BodyText className="text-xs text-gray-500">
          7-day free trial • Cancel anytime
        </BodyText>
      </div>
    </div>
  </div>
);

export default PricingCard;
