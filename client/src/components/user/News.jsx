import {Bell, Share2, MessageSquare, BookmarkPlus, Clock, Eye, ChevronRight, Filter} from 'lucide-react';

const NewsUpdates = () => {
  const news = [
    {
      id: 1,
      title: "New Emergency Response Protocol Implementation",
      content: "Our department has implemented comprehensive emergency response guidelines to enhance community safety and ensure rapid incident reporting. This new protocol includes digital reporting tools and real-time communication channels.",
      date: "2024-02-28",
      image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&auto=format&fit=crop",
      category: "Safety Protocol",
      readTime: "5 min",
      views: 1234,
      comments: 45,
      shares: 23,
      priority: "high"
    },
    {
      id: 2,
      title: "Community Safety Initiative Launch Event",
      content: "Join our upcoming safety awareness program designed to educate and empower community members. Learn essential safety practices, emergency procedures, and connect with local safety experts.",
      date: "2024-02-27",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop",
      category: "Community Event",
      readTime: "4 min",
      views: 892,
      comments: 32,
      shares: 15,
      priority: "medium"
    },
    {
      id: 3,
      title: "Technology Integration in Emergency Services",
      content: "Discover how we're leveraging cutting-edge technology to improve emergency response times and enhance communication between first responders and the community.",
      date: "2024-02-26",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop",
      category: "Technology",
      readTime: "6 min",
      views: 756,
      comments: 28,
      shares: 19,
      priority: "medium"
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-white">News & Updates</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="bg-gray-800 rounded-xl overflow-hidden text-white shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${item.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}`}>
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{item.views.toLocaleString()}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3 line-clamp-2">{item.title}</h2>
              <p className="text-gray-400 mb-4 line-clamp-3">{item.content}</p>

              <div className="flex items-center justify-between text-sm border-t border-gray-700 pt-4">
                <span className="text-gray-500">{item.date}</span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{item.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>{item.shares}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <BookmarkPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
          View All Updates
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NewsUpdates;


