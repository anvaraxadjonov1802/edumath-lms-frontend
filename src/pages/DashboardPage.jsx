import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, History, Book, ArrowRight } from 'lucide-react';
import { Card, Loader, ErrorMessage } from '../components/common/Common';
import testApi from '../api/testApi';
import courseApi from '../api/courseApi';
import glossaryApi from '../api/glossaryApi';

const statColorClasses = {
  indigo: 'bg-indigo-100 text-indigo-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  purple: 'bg-purple-100 text-purple-600',
};

const StatCard = ({ title, value, icon: Icon, color, link }) => (
  <Link to={link}>
    <Card className="hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4">
      <div className={`p-3 rounded-xl ${statColorClasses[color] || statColorClasses.indigo}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </Card>
  </Link>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    courses: 0,
    results: 0,
    glossary: 0,
  });
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, resultsRes, glossaryRes] = await Promise.all([
          courseApi.getCourses({ page_size: 1 }),
          testApi.getMyResults({ page_size: 5 }),
          glossaryApi.getGlossary({ page_size: 1 })
        ]);
        
        setStats({
          courses: coursesRes.data.count,
          results: resultsRes.data.count,
          glossary: glossaryRes.data.count
        });
        
        setRecentResults(resultsRes.data.results);
      } catch (err) {
        setError('Ma‘lumotlarni yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Boshqaruv paneli</h1>
        <p className="text-slate-500">EduMath platformasiga xush kelibsiz!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Kurslar" 
          value={stats.courses} 
          icon={BookOpen} 
          color="indigo" 
          link="/courses"
        />
        <StatCard 
          title="Natijalar" 
          value={stats.results} 
          icon={History} 
          color="emerald" 
          link="/results"
        />
        <StatCard 
          title="Atamalar" 
          value={stats.glossary} 
          icon={Book} 
          color="purple" 
          link="/glossary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Tezkor havolalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/courses" className="flex items-center justify-between p-4 bg-white/60 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors group">
              <span className="font-semibold text-slate-700">Kurslarni boshlash</span>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/results" className="flex items-center justify-between p-4 bg-white/60 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors group">
              <span className="font-semibold text-slate-700">Mening natijalarim</span>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/glossary" className="flex items-center justify-between p-4 bg-white/60 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors group">
              <span className="font-semibold text-slate-700">Glossariyni ko'rish</span>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/references" className="flex items-center justify-between p-4 bg-white/60 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors group">
              <span className="font-semibold text-slate-700">Adabiyotlar ro'yxati</span>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Recent Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-lg font-semibold text-gray-900">Oxirgi natijalar</h2>
             <Link to="/results" className="text-sm font-medium text-blue-600 hover:text-blue-500">Barchasi</Link>
          </div>
          <div className="space-y-3">
            {recentResults.length > 0 ? (
              recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 bg-white/60 border border-slate-200 rounded-2xl">
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <p className="font-semibold text-slate-800 truncate">{result.topic_title}</p>
                    <p className="text-xs text-slate-400">{new Date(result.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{result.percentage}%</p>
                    <p className={`text-[10px] uppercase tracking-wider font-bold ${
                      result.grade === "A'lo" ? 'text-emerald-600' : 
                      result.grade === 'Yaxshi' ? 'text-indigo-600' : 'text-amber-600'
                    }`}>{result.grade}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                Hali hech qanday test topshirilmagan
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
