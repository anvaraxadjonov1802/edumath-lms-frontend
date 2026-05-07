import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  TestTube, 
  Book, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
// import { Button } from '../components/common/Common';
import { Button, cn } from '../components/common/Common';

const LandingPage = () => {
  const features = [
    {
      title: "Nazariy qism",
      description: "Matematikaning murakkab tushunchalarini sodda va tushunarli tilda o'rganing.",
      icon: BookOpen,
      color: "indigo"
    },
    {
      title: "Amaliy mashg'ulotlar",
      description: "Nazariy bilimlaringizni iqtisodiy masalalar orqali mustahkamlang.",
      icon: CheckCircle2,
      color: "emerald"
    },
    {
      title: "Test tizimi",
      description: "Har bir mavzu bo'yicha bilimlaringizni sinovdan o'tkazing va natijalarni kuzatib boring.",
      icon: TestTube,
      color: "purple"
    },
    {
      title: "Glossariy",
      description: "O'zbek, ingliz va rus tillaridagi matematik terminlar lug'atidan foydalaning.",
      icon: Book,
      color: "amber"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-tr from-indigo-100/40 via-white to-sky-100/40 -z-10"></div>
      
      {/* Header */}
      <header className="bg-white/30 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 h-20 flex items-center">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">EduMath LMS</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">Kurslar</Link>
            <Link to="/glossary" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">Glossariy</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Kirish</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Boshlash</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left lg:max-w-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl leading-[1.1]">
              Iqtisodchilar uchun <br/> <span className="text-indigo-600">Matematika</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-slate-500 max-w-xl">
              Kelajak iqtisodchilari uchun maxsus ishlab chiqilgan zamonaviy ta'lim platformasi. 
              Nazariya, amaliyot va testlar – barchasi bir joyda.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2 rounded-2xl h-14">
                  Bepul boshlash <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="rounded-2xl h-14">
                  Kurslarni ko'rish
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block absolute top-0 right-0 w-[45%] h-[500px]">
             <div className="w-full h-full bg-white/40 backdrop-blur-3xl rounded-[60px] border border-white/50 shadow-2xl shadow-indigo-100 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-sky-500/10 transition-opacity group-hover:opacity-20"></div>
                <GraduationCap className="w-40 h-40 text-indigo-400/30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Platforma afzalliklari</h2>
            <p className="mt-6 text-lg text-slate-500">
              Biz ta'lim jarayonini oson, qiziqarli va samarali qilish uchun barcha imkoniyatlarni yaratdik.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col rounded-[32px] bg-white/60 backdrop-blur-md p-8 border border-white/50 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
                <div className={cn(
                  "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg shadow-black/5",
                  feature.color === 'indigo' ? "bg-indigo-100 text-indigo-600" :
                  feature.color === 'emerald' ? "bg-emerald-100 text-emerald-600" :
                  feature.color === 'purple' ? "bg-purple-100 text-purple-600" :
                  "bg-amber-100 text-amber-600"
                )}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold leading-7 text-slate-800">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/50 bg-white/30 backdrop-blur-md py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">EduMath LMS</span>
            </div>
            <div className="flex gap-8">
              <Link to="/courses" className="text-sm font-semibold text-slate-500 hover:text-indigo-600">Kurslar</Link>
              <Link to="/glossary" className="text-sm font-semibold text-slate-500 hover:text-indigo-600">Glossariy</Link>
            </div>
            <p className="text-sm font-medium text-slate-400">
              © {new Date().getFullYear()} EduMath. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
