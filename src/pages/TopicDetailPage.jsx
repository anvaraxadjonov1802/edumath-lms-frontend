import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  FileText, 
  PlayCircle, 
  GraduationCap, 
  CheckSquare,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Card, Loader, ErrorMessage, Button } from '../components/common/Common';
import topicApi from '../api/topicApi';

const TopicDetailPage = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await topicApi.getTopicDetail(id);
        setTopic(response.data);
      } catch (err) {
        setError('Mavzu ma‘lumotlarini yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!topic) return null;

  const tabs = [
    { title: 'Nazariy qism', icon: BookOpen, type: 'theory' },
    { title: 'Amaliy qism', icon: CheckSquare, type: 'practice' },
    { title: 'Prezentatsiya', icon: PlayCircle, type: 'presentation' },
    { title: 'Mustaqil ish', icon: GraduationCap, type: 'assignment' },
  ];

  return (
    <div className="space-y-8">
       {/* Breadcrumbs */}
       <nav className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-400">
        <Link to="/courses" className="hover:text-indigo-600 transition-colors uppercase tracking-wider">Kurslar</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="truncate uppercase tracking-wider">{topic.course_title}</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 truncate uppercase tracking-wider">{topic.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
         <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
               <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-indigo-100">
                 {topic.module_title}
               </span>
               <h1 className="text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">{topic.title}</h1>
               <div className="prose prose-indigo max-w-none text-slate-600 leading-relaxed text-lg">
                  {topic.description}
               </div>
            </div>

            {/* Material Tabs/Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tabs.map((tab) => (
                <Card 
                   key={tab.type} 
                   className="group hover:border-indigo-300 transition-all cursor-pointer flex items-center justify-between p-7 hover:shadow-xl hover:shadow-indigo-50/50 border-slate-200/50"
                   onClick={() => navigate(`/topics/${id}/materials?type=${tab.type}`)}
                 >
                   <div className="flex items-center gap-5">
                     <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white rounded-2xl transition-all shadow-sm group-hover:shadow-indigo-200">
                        <tab.icon className="h-7 w-7" />
                     </div>
                     <span className="font-bold text-slate-800 text-lg">{tab.title}</span>
                   </div>
                   <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all">
                    <ChevronRight className="h-6 w-6" />
                   </div>
                </Card>
              ))}
            </div>
         </div>

        {/* Sidebar Actions */}
         <div className="space-y-8">
            <Card className="bg-indigo-600 border-none text-white p-10 relative overflow-hidden shadow-2xl shadow-indigo-200 rounded-[32px]">
               <div className="relative z-10">
                <h3 className="text-2xl font-extrabold mb-4 tracking-tight">Bilimingizni sinab ko'ring</h3>
                <p className="text-indigo-100/90 font-medium text-sm mb-8 leading-relaxed">
                    Ushbu mavzu bo'yicha test savollariga javob bering va o'z darajangizni aniqlang.
                </p>
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 w-fit">
                      <FileText className="h-4 w-4" />
                      <span>{topic.questions_count} ta savol</span>
                    </div>
                    <Link to={`/topics/${id}/test`}>
                      <Button variant="secondary" className="w-full gap-2 h-14 rounded-2xl shadow-xl shadow-black/10">
                        Testni boshlash <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] -mr-16 -mt-16"></div>
            </Card>

            <Card className="p-8 border-slate-200/50">
               <h3 className="text-xl font-bold text-slate-800 mb-6">Barcha materiallar</h3>
               <Link to={`/topics/${id}/materials`}>
                  <Button variant="outline" className="w-full h-12 rounded-2xl">
                    Materiallar ro'yxati
                  </Button>
               </Link>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
