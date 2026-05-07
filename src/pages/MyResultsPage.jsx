import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { Card, Loader, ErrorMessage, Input } from '../components/common/Common';
import testApi from '../api/testApi';

const MyResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await testApi.getMyResults();
        setResults(response.data.results);
      } catch (err) {
        setError('Natijalarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A'lo": return "text-green-600 bg-green-50 border-green-100";
      case "Yaxshi": return "text-blue-600 bg-blue-50 border-blue-100";
      case "Qoniqarli": return "text-orange-600 bg-orange-50 border-orange-100";
      default: return "text-red-600 bg-red-50 border-red-100";
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mening natijalarim</h1>
        <p className="text-gray-500">Barcha topshirilgan testlar tarixi</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {results.map((result) => (
            <Card key={result.id} className="p-0 overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-1 p-6">
                  <div className="flex flex-col gap-1 mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{result.course_title}</span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{result.topic_title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{result.module_title}</span>
                    <span>•</span>
                    <span>{new Date(result.created_at).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 p-6 bg-gray-50 md:bg-transparent border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">To'g'ri javob</p>
                    <p className="text-lg font-bold text-gray-900">{result.score} / {result.total_questions}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Foiz</p>
                    <p className="text-lg font-bold text-blue-600">{Math.round(result.percentage)}%</p>
                  </div>
                  <div className="min-w-[100px] text-center">
                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getGradeColor(result.grade)}`}>
                        {result.grade}
                     </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
           <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
           <p className="text-gray-500 font-medium">Hali hech qanday test natijalari mavjud emas</p>
        </div>
      )}
    </div>
  );
};

export default MyResultsPage;
