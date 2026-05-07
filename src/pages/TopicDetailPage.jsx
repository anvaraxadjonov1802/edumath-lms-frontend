import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  FileText,
  PlayCircle,
  GraduationCap,
  CheckSquare,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

import { Card, Loader, ErrorMessage, Button } from '../components/common/Common';
import topicApi from '../api/topicApi';

const TopicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await topicApi.getTopicDetail(id);
        setTopic(response.data);
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            'Mavzu ma‘lumotlarini yuklashda xatolik yuz berdi'
        );
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
    {
      title: 'Nazariy qism',
      icon: BookOpen,
      type: 'theory',
      description: 'Mavzuga oid nazariy materiallar, PDF va o‘quv fayllari.',
    },
    {
      title: 'Amaliy qism',
      icon: CheckSquare,
      type: 'practice',
      description: 'Amaliy mashg‘ulotlar, masalalar va topshiriqlar.',
    },
    {
      title: 'Prezentatsiya',
      icon: PlayCircle,
      type: 'presentation',
      description: 'Mavzuga oid slaydlar va taqdimot fayllari.',
    },
    {
      title: 'Mustaqil ish',
      icon: GraduationCap,
      type: 'assignment',
      description: 'Talaba mustaqil bajarishi kerak bo‘lgan ishlar.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-400">
        <Link
          to="/courses"
          className="uppercase tracking-wider transition-colors hover:text-indigo-600"
        >
          Kurslar
        </Link>

        <ChevronRight className="h-4 w-4" />

        <span className="truncate uppercase tracking-wider">
          {topic.course_title}
        </span>

        <ChevronRight className="h-4 w-4" />

        <span className="truncate uppercase tracking-wider text-slate-800">
          {topic.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          <div className="space-y-6">
            <span className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-600">
              {topic.module_title}
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
              {topic.title}
            </h1>

            <div className="prose prose-indigo max-w-none text-lg leading-relaxed text-slate-600">
              {topic.description || 'Bu mavzu uchun tavsif hali qo‘shilmagan.'}
            </div>
          </div>

          {/* Material Tabs/Sections */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() =>
                    navigate(`/topics/${id}/materials?type=${tab.type}`)
                  }
                  className="group flex w-full items-center justify-between rounded-3xl border border-slate-200/50 bg-white p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50"
                >
                  <div className="flex items-center gap-5">
                    <div className="rounded-2xl bg-slate-50 p-4 text-slate-400 shadow-sm transition-all group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-200">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div>
                      <span className="block text-lg font-bold text-slate-800">
                        {tab.title}
                      </span>

                      <span className="mt-1 block text-sm leading-5 text-slate-500">
                        {tab.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-300 transition-all group-hover:bg-indigo-50 group-hover:text-indigo-500">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
          <Card className="relative overflow-hidden rounded-[32px] border-none bg-indigo-600 p-10 text-white shadow-2xl shadow-indigo-200">
            <div className="relative z-10">
              <h3 className="mb-4 text-2xl font-extrabold tracking-tight">
                Bilimingizni sinab ko&apos;ring
              </h3>

              <p className="mb-8 text-sm font-medium leading-relaxed text-indigo-100/90">
                Ushbu mavzu bo&apos;yicha test savollariga javob bering va
                o&apos;z darajangizni aniqlang.
              </p>

              <div className="space-y-6">
                <div className="flex w-fit items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
                  <FileText className="h-4 w-4" />
                  <span>{topic.questions_count || 0} ta savol</span>
                </div>

                <Link to={`/topics/${id}/test`}>
                  <Button
                    variant="secondary"
                    className="h-14 w-full gap-2 rounded-2xl shadow-xl shadow-black/10"
                  >
                    Testni boshlash <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-white/10 blur-[40px]" />
          </Card>

          <Card className="border-slate-200/50 p-8">
            <h3 className="mb-6 text-xl font-bold text-slate-800">
              Barcha materiallar
            </h3>

            <Link to={`/topics/${id}/materials`}>
              <Button variant="outline" className="h-12 w-full rounded-2xl">
                Materiallar ro&apos;yxati
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;