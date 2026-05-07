import React, { useState, useEffect } from 'react';
import { Book, Search, User, Calendar, ExternalLink } from 'lucide-react';
import { Card, Input, Loader, ErrorMessage, Button } from '../components/common/Common';
import referenceApi from '../api/referenceApi';

const ReferencesPage = () => {
  const [refs, setRefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchRefs = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await referenceApi.getReferences({ search: searchTerm });
      setRefs(response.data.results);
    } catch (err) {
      setError('Adabiyotlarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchRefs(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Adabiyotlar</h1>
          <p className="text-gray-500">O'quv kursi uchun tavsiya etilgan adabiyotlar va manbalar</p>
        </div>
        <div className="w-full md:w-72 relative">
          <Input 
            placeholder="Qidirish..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : refs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {refs.map((item) => (
            <Card key={item.id} className="flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
               <div className="h-48 w-full md:w-32 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Book className="h-12 w-12 text-gray-200" />
               </div>
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <div className="space-y-2 mb-4">
                       <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>Muallif: {item.author}</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Yil: {item.year}</span>
                       </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     {item.file_url ? (
                       <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                         <Button size="sm" className="gap-2">
                           Faylni ochish <ExternalLink className="h-4 w-4" />
                         </Button>
                       </a>
                     ) : item.link ? (
                       <a href={item.link} target="_blank" rel="noopener noreferrer">
                         <Button size="sm" className="gap-2">
                           Saytga o'tish <ExternalLink className="h-4 w-4" />
                         </Button>
                       </a>
                     ) : (
                       <span className="text-xs text-gray-400 italic">Elektron nusxa mavjud emas</span>
                     )}
                  </div>
               </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
           <Book className="h-12 w-12 text-gray-300 mx-auto mb-4" />
           <p className="text-gray-500 font-medium">Adabiyotlar topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default ReferencesPage;
