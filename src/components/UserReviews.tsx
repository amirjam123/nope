import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import type { UserReview } from '../types';

const reviews: UserReview[] = [
  {
    id: 1,
    name: "Maria Taumalolo",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    rating: 5,
    comment: "Amazing! Got my credit in just 3 minutes. Vodafone Cook Islands service is the best! Perfect for topping up when I'm between islands.",
    location: "Rarotonga",
    verified: true
  },
  {
    id: 2,
    name: "James Kainuku",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    rating: 5,
    comment: "Super easy process and works perfectly. The credit appeared immediately on my Vodafone account. Highly recommend!",
    location: "Aitutaki",
    verified: true
  },
  {
    id: 3,
    name: "Sarah Wilson",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    rating: 5,
    comment: "Fantastic service! As a visitor to the Cook Islands, this free credit helped me stay connected with my family back home.",
    location: "Atiu",
    verified: true
  },
  {
    id: 4,
    name: "Tane Maraea",
    avatar: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    rating: 5,
    comment: "Quick and reliable. Vodafone Cook Islands always delivers on their promises. Got exactly what they advertised.",
    location: "Mangaia",
    verified: true
  },
  {
    id: 5,
    name: "Emma Tangaroa",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    rating: 5,
    comment: "Love this! The verification was smooth and the credit came through instantly. Great way to try Vodafone services.",
    location: "Penrhyn",
    verified: true
  },
  {
    id: 6,
    name: "Michael Cook",
    avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1",
    rating: 5,
    comment: "Excellent experience! The whole process took less than 5 minutes and now I have credit to use around the islands.",
    location: "Mauke",
    verified: true
  }
];

export const UserReviews: React.FC = () => {
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-white/30'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          What Cook Islands Customers Say
        </h2>
        <p className="text-white/80 text-lg">
          Join thousands of satisfied Vodafone Cook Islands customers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  {review.verified && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-3 h-3 text-white/60" />
                  <span className="text-white/60 text-sm">{review.location}</span>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
          <div className="flex -space-x-2">
            {reviews.slice(0, 4).map((review) => (
              <img
                key={review.id}
                src={review.avatar}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-white font-medium">
            Join 12,500+ happy customers
          </span>
        </div>
      </div>
    </div>
  );
};