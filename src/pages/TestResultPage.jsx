import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, TrendingUp, Award, ArrowLeft, RefreshCw } from 'lucide-react';
import { Card, Button } from '../components/common/Common';

const TestResultPage = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <Navigate to="/results" replace />;
  }

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A'lo": return "text-green-600 bg-green-50";
      case "Yaxshi": return "text-blue-600 bg-blue-50";
      case "Qoniqarli": return "text-orange-600 bg-orange-50";
      default: return "text-red-600 bg-red-50";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-4">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
           <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Test yakunlandi!</h1>
        <p className="text-gray-500">Sizning natijalaringiz hisoblandi</p>
      </div>

      <Card className="p-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="space-y-6 text-center md:text-left">
               <div>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">Mavzu</p>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{result.topic_title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{result.course_title}</p>
               </div>
               
               <div className="flex flex-col items-center md:items-start">
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Baho</p>
                  <span className={`px-4 py-2 rounded-full font-bold text-lg ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </span>
               </div>
            </div>

            <div className="pt-8 md:pt-0 md:pl-8 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <TrendingUp className="h-5 w-5" />
                     </div>
                     <span className="font-medium text-gray-700">Foiz</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{Math.round(result.percentage)}%</span>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                        <Award className="h-5 w-5" />
                     </div>
                     <span className="font-medium text-gray-700">Ball</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{result.score} / {result.total_questions}</span>
               </div>
            </div>
         </div>

         <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link to={`/topics/${result.topic}/test`} className="flex-1">
               <Button variant="outline" className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" /> Qayta topshirish
               </Button>
            </Link>
            <Link to="/results" className="flex-1">
               <Button className="w-full gap-2">
                  Natijalar tarixi <TrendingUp className="h-4 w-4" />
               </Button>
            </Link>
         </div>
      </Card>

      <div className="text-center">
         <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 font-medium">
            <ArrowLeft className="h-4 w-4" /> Bosh sahifaga qaytish
         </Link>
      </div>
    </div>
  );
};

export default TestResultPage;
