import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Layout, BookOpen, Clock } from 'lucide-react';
import { Card, Loader, ErrorMessage, Button } from '../components/common/Common';
import courseApi from '../api/courseApi';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseApi.getCourseDetail(slug);
        setCourse(response.data);
      } catch (err) {
        setError('Kurs ma‘lumotlarini yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!course) return null;

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-400">
        <Link to="/courses" className="hover:text-indigo-600 transition-colors uppercase tracking-wider">Kurslar</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 truncate uppercase tracking-wider">{course.title}</span>
      </nav>

      {/* Header Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-indigo-200">
        <div className="relative z-10 lg:max-w-3xl">
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight leading-tight">{course.title}</h1>
          <p className="mt-6 text-indigo-100 text-lg leading-relaxed opacity-90">
            {course.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Layout className="h-5 w-5 text-indigo-100" />
                </div>
                <span className="font-bold tracking-wide">{course.modules?.length || 0} modul</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <BookOpen className="h-5 w-5 text-indigo-100" />
                </div>
                <span className="font-bold tracking-wide">
                   {course.modules?.reduce((acc, m) => acc + (m.topics?.length || 0), 0)} mavzu
                </span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Clock className="h-5 w-5 text-indigo-100" />
                </div>
                <span className="font-bold tracking-wide">{new Date(course.created_at).toLocaleDateString()}</span>
             </div>
          </div>
        </div>
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 h-[120%] w-1/3 opacity-10 pointer-events-none hidden lg:block rotate-12">
           <GraduationCap className="h-full w-full object-contain" />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>
      </div>

      {/* Content */}
      <div className="space-y-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-indigo-600 rounded-full"></div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Kurs mundarijasi</h2>
        </div>
        
        <div className="space-y-12">
          {course.modules?.map((module, index) => (
            <div key={module.id} className="space-y-6 relative">
               {index !== course.modules.length - 1 && (
                 <div className="absolute left-6 top-16 bottom-0 w-px bg-slate-200 hidden md:block"></div>
               )}
               <div className="flex items-center gap-4 relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-100">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">{module.title}</h3>
                    <p className="text-slate-500 font-medium text-sm mt-0.5">{module.topics?.length || 0} mavzu mavjud</p>
                  </div>
               </div>
               <p className="text-slate-500 md:pl-16 text-base leading-relaxed max-w-3xl">{module.description}</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:pl-16">
                  {module.topics?.map((topic) => (
                    <Card key={topic.id} className="flex flex-col justify-between hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all border-slate-200/60 group p-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">{topic.title}</h4>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{topic.description}</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                         <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 py-1.5 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider">
                           <BookOpen className="h-3.5 w-3.5" />
                           Mavzu
                         </div>
                         <Link to={`/topics/${topic.id}`}>
                           <Button size="sm" variant="outline" className="rounded-xl px-5">Ochish</Button>
                         </Link>
                      </div>
                    </Card>
                  ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Internal icon for the header (since no TS imports)
const GraduationCap = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

export default CourseDetailPage;
