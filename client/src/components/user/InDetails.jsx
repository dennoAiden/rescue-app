import React, { useState, useEffect } from "react";
import { AlertTriangle, Clock, MapPin, Camera, MessageSquare, Star } from "lucide-react";
import { StarRating } from "../StarRating.jsx";
import { ReviewCard } from "../ReviewCard.jsx";
import { ReviewForm } from "../ReviewForm.jsx";

export default function IncidentDetails() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/user/${userId}`)
      .then(response => response.json())
      .then((data) => { 
        console.log(data)
        setIncidents(data.incident_reports)

        })          
      .catch(error => console.error('Error fetching incidents:', error));

    fetch('http://127.0.0.1:5555/ratings')
      .then(response => response.json())
      .then(data => {
        setReviews(data.message)})
      .catch(error => console.error('Error fetching reviews:', error));
  }, [userId]);


  const handleSubmitReview = (reviewData) => {
    if (!selectedIncidentId) return;

    // Check if user already reviewed this incident
    const existingReview = reviews.find(
      (review) => review.incidentId === selectedIncidentId && review.userId === userId
    );
    if (existingReview) {
      alert("You have already rated this incident.");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      author: reviewData.user_id.username,
      content: reviewData.content,
      rating: reviewData.rating,
      date: new Date().toISOString().split('T')[0],
      incidentId: selectedIncidentId,
      userId: userId // Store userId with review
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const getIncidentReviews = (incidentId) => {
    return reviews.filter(review => review.incidentId === incidentId);
  };

  const getAverageRating = (incidentId) => {
    const incidentReviews = getIncidentReviews(incidentId);
    if (incidentReviews.length === 0) return 0;
    return incidentReviews.reduce((acc, review) => acc + review.rating, 0) / incidentReviews.length;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Incident Details</h1>

      <div className="space-y-6">
        {incidents.map((incident) => {
          const incidentReviews = getIncidentReviews(incident.id);
          const averageRating = getAverageRating(incident.id);

          return (
            <div key={incident.id} className="bg-gray-800 rounded-lg overflow-hidden text-white">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">{incident.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    incident.status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'
                  } text-gray-900`}>
                    {incident.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{incident.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{incident.timestamp}</span>
                    </div>
                    <p className="text-gray-300">{incident.description}</p>
                  </div>

                  <div>
                  {incident.images.length > 0 && (
                    <img 
                      src={incident.images[0].media_image} 
                      alt="incident image"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  </div>
                  <div>
                    {incident.video && incident.video.length > 0 && (
                      <video 
                        src={incident.video[0]?.media_video} 
                        controls 
                        className="w-full h-48 rounded-lg"
                      />
                      
                  )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg">
                    <Camera className="w-4 h-4" />
                    <span>Add Media</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg">
                    <MessageSquare className="w-4 h-4" />
                    <span>Comment</span>
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedIncidentId(incident.id);
                      setShowReviewForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                  >
                    <Star className="w-4 h-4" />
                    <span>Rate Response</span>
                  </button>
                </div>

                {incidentReviews.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold">Response Ratings</h3>
                      <div className="flex items-center gap-2">
                        <StarRating rating={averageRating} />
                        <span className="text-gray-400">
                          ({incidentReviews.length} {incidentReviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {incidentReviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showReviewForm && selectedIncidentId && (
        <ReviewForm
          onSubmit={handleSubmitReview}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedIncidentId(null);
          }}
          incidentId={selectedIncidentId}
        />
      )}
    </div>
  );
}
