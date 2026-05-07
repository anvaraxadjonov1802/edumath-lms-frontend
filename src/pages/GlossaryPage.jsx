import React, { useState, useEffect } from 'react';
import { Book, Search, Languages } from 'lucide-react';
import { Card, Input, Loader, ErrorMessage } from '../components/common/Common';
import glossaryApi from '../api/glossaryApi';

const GlossaryPage = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchGlossary = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await glossaryApi.getGlossary({ search: searchTerm });
      setTerms(response.data.results);
    } catch (err) {
      setError('Glossariyni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchGlossary(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Glossariy</h1>
          <p className="text-gray-500">Matematik terminlarning 3 tildagi izohli lug'ati</p>
        </div>
        <div className="w-full md:w-72 relative">
          <Input 
            placeholder="Terminlarni qidirish..." 
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
      ) : terms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((item) => (
            <Card key={item.id} className="hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                 <div className="space-y-1">
                    <h3 className="text-xl font-bold text-blue-600">{item.term_uz}</h3>
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">EN: {item.term_en}</span>
                       <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase">RU: {item.term_ru}</span>
                    </div>
                 </div>
                 <div className="p-2 bg-blue-50 text-blue-400 rounded-lg">
                    <Languages className="h-5 w-5" />
                 </div>
              </div>
              <div className="prose prose-sm text-gray-600 border-t border-gray-50 pt-4">
                 {item.definition}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
           <Book className="h-12 w-12 text-gray-300 mx-auto mb-4" />
           <p className="text-gray-500 font-medium">Bunday termin topilmadi</p>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
