import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    image: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, image }) => {
    return (
        <article className="bg-white border-[3px] border-black rounded-xl shadow-neubrutalist p-10 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-1">
            <div className="mb-6 h-24 flex items-center justify-center">
                <img src={image} alt={title} className="max-h-full object-contain" />
            </div>
            <h3 className="text-2xl font-black mb-4">{title}</h3>
            <p className="text-gray-700 font-bold text-lg leading-relaxed">
                {description}
            </p>
        </article>
    );
};

export default FeatureCard;
