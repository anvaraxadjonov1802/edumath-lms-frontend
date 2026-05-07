import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, FileText, ExternalLink, Filter } from 'lucide-react';
import { Card, Loader, ErrorMessage, Button, cn } from '../components/common/Common';
import topicApi from '../api/topicApi';

const MaterialsPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('type') || 'all';

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [topic, setTopic] = useState(null);

  const tabs = [
    { id: 'all', label: 'Barchasi' },
    { id: 'theory', label: 'Nazariya' },
    { id: 'practice', label: 'Amaliyot' },
    { id: 'presentation', label: 'Prezentatsiya' },
    { id: 'assignment', label: 'Mustaqil ish' },
    { id: 'literature', label: 'Adabiyotlar' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [topicRes, materialsRes] = await Promise.all([
          topicApi.getTopicDetail(id),
          topicApi.getTopicMaterials(id, currentTab !== 'all' ? { type: currentTab } : {})
        ]);
        setTopic(topicRes.data);
        setMaterials(materialsRes.data.results || []);
      } catch (err) {
        setError('Materiallarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentTab]);

  const handleTabChange = (tabId) => {
    if (tabId === 'all') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', tabId);
    }
    setSearchParams(searchParams);
  };

  if (loading && !topic) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to={`/topics/${id}`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">O'quv materiallari</h1>
          <p className="text-sm text-gray-500">{topic?.title}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              currentTab === tab.id 
                ? "bg-blue-600 text-white" 
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item) => (
            <Card key={item.id} className="flex flex-col justify-between group">
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {item.material_type_display}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                  {item.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                {item.file_url ? (
                  <a 
                    href={item.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1"
                  >
                    <Button variant="primary" size="sm" className="w-full gap-2">
                      Faylni ochish <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <p className="text-xs text-gray-400 italic font-medium">Birkiktirilgan fayl yo'q</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
           <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
           <p className="text-gray-500 font-medium">Bu turdagi materiallar hali qo'shilmagan</p>
           <Button 
            variant="ghost" 
            size="sm" 
            className="mt-4"
            onClick={() => handleTabChange('all')}
          >
             Barcha materiallarga qaytish
           </Button>
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
