import { Bell, Share2, MessageSquare } from 'lucide-react';

const NewsUpdates = () => {
  const news = [
    {
      id: 1,
      title: "New Emergency Response Protocol",
      content: "Updated guidelines for reporting incidents have been implemented...",
      date: "2024-02-28",
      image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Community Safety Initiative",
      content: "Join our upcoming safety awareness program...",
      date: "2024-02-27",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-8 h-8 text-yellow-500" />
        <h1 className="text-2xl font-bold text-white">News & Updates</h1>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden text-white">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-400 mb-4">{item.content}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{item.date}</span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <MessageSquare className="w-4 h-4" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsUpdates;
