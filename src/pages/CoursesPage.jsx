import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Layers } from 'lucide-react';
import { Card, Input, Loader, ErrorMessage, Button } from '../components/common/Common';
import courseApi from '../api/courseApi';

const CourseCard = ({ course }) => (
  <Card className="flex flex-col h-full group hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-100/50">
    <div className="h-44 bg-indigo-50/50 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden">
       {course.image_url ? (
         <img src={course.image_url} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
       ) : (
         <BookOpen className="h-14 w-14 text-indigo-200 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300" />
       )}
    </div>
    <div className="flex-1 space-y-3">
      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-[1.2]">
        {course.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
        {course.description}
      </p>
    </div>
    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
      <div className="flex gap-4">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <Layers className="h-4 w-4 text-indigo-500/60" />
          <span>{course.modules_count} modul</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <BookOpen className="h-4 w-4 text-indigo-500/60" />
          <span>{course.topics_count} mavzu</span>
        </div>
      </div>
      <Link to={`/courses/${course.slug}`}>
        <Button variant="outline" size="sm" className="rounded-xl">Ochish</Button>
      </Link>
    </div>
  </Card>
);

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchCourses = async (searchTerm = '') => {
    setLoading(true);
    try {
      const response = await courseApi.getCourses({ search: searchTerm });
      setCourses(response.data.results);
    } catch (err) {
      setError('Kurslarni yuklashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourses(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mavjud kurslar</h1>
          <p className="text-slate-500 font-medium">O'zingizga kerakli kursni tanlang va o'rganishni boshlang</p>
        </div>
        <div className="w-full md:w-80 relative group">
          <Input 
            placeholder="Kurslarni qidirish..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl border-slate-200 group-hover:border-indigo-300 transition-all"
          />
          <Search className="h-5 w-5 text-slate-400 absolute left-4 top-3 group-hover:text-indigo-500 transition-colors" />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/40 backdrop-blur-sm rounded-[32px] border border-dashed border-slate-300">
           <BookOpen className="h-16 w-16 text-slate-200 mx-auto mb-6" />
           <p className="text-slate-500 font-bold text-lg">Kurslar topilmadi</p>
           <p className="text-slate-400 text-sm mt-1">Qidiruv so'zini o'zgartirib ko'ring</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
