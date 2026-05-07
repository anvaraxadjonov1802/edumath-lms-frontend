import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Loader, ErrorMessage, Button, cn } from '../components/common/Common';
import testApi from '../api/testApi';
import topicApi from '../api/topicApi';
import { getApiErrorMessage } from '../utils/apiError';

const TestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: answerId }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicRes, questionsRes] = await Promise.all([
          topicApi.getTopicDetail(id),
          testApi.getQuestions(id)
        ]);
        setTopic(topicRes.data);
        setQuestions(questionsRes.data.results);
      } catch (err) {
        setError('Test savollarini yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectAnswer = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < questions.length) {
      if (!window.confirm(`Siz hali barcha savollarga javob bermadingiz (${answeredCount}/${questions.length}). Testni yakunlamoqchimisiz?`)) {
        return;
      }
    }

    if (answeredCount === 0) {
      setError('Kamida bitta savolga javob belgilang');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        answers: Object.entries(selectedAnswers).map(([qId, aId]) => ({
          question_id: parseInt(qId),
          answer_id: parseInt(aId)
        }))
      };
      
      const response = await testApi.submitTest(id, payload);
      // Navigate to results with state
      navigate('/test-result', { state: { result: response.data.result } });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Testni yuborishda xatolik yuz berdi'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error && questions.length === 0) return <ErrorMessage message={error} />;
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AlertCircle className="h-12 w-12 text-orange-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Savollar topilmadi</h2>
        <p className="text-gray-500 mb-6">Bu mavzu uchun hali test savollari qo'shilmagan.</p>
        <Link to={`/topics/${id}`}>
           <Button variant="outline">Mavzuga qaytish</Button>
        </Link>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((Object.keys(selectedAnswers).length) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/topics/${id}`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Bilimni sinash</h1>
            <p className="text-sm text-gray-500">{topic?.title}</p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
           <span className="text-sm font-medium text-gray-500">Savol {currentQuestionIndex + 1} / {questions.length}</span>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Progress Bar */}
      <div className="space-y-2">
         <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span>Jarayon</span>
            <span>{Math.round(progress)}%</span>
         </div>
         <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
         </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 shadow-md border-blue-50">
         <div className="mb-8">
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold mb-4">
              Savol #{currentQuestionIndex + 1}
            </span>
            <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
               {currentQuestion.text}
            </h2>
         </div>

         <div className="space-y-3">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleSelectAnswer(currentQuestion.id, answer.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all group flex items-start gap-4",
                  selectedAnswers[currentQuestion.id] === answer.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-100 bg-white hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "h-6 w-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                  selectedAnswers[currentQuestion.id] === answer.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 group-hover:border-gray-400"
                )}>
                  {selectedAnswers[currentQuestion.id] === answer.id && <CheckCircle2 className="h-4 w-4" />}
                </div>
                <span className={cn(
                  "font-medium",
                  selectedAnswers[currentQuestion.id] === answer.id ? "text-blue-900" : "text-gray-700"
                )}>
                  {answer.text}
                </span>
              </button>
            ))}
         </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
         <Button
            variant="outline"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
         >
            Oldingisi
         </Button>

         {currentQuestionIndex === questions.length - 1 ? (
           <Button
             isLoading={submitting}
             onClick={handleSubmit}
             className="gap-2"
           >
             Yakunlash <Send className="h-4 w-4" />
           </Button>
         ) : (
           <Button
             onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
             className="gap-2"
           >
             Keyingisi
           </Button>
         )}
      </div>

      {/* Question Map */}
      <div className="flex flex-wrap gap-2 pt-8 justify-center">
         {questions.map((_, idx) => (
           <button
             key={idx}
             onClick={() => setCurrentQuestionIndex(idx)}
             className={cn(
               "h-10 w-10 rounded-lg font-bold text-sm border-2 transition-all",
               currentQuestionIndex === idx ? "border-blue-600 text-blue-600" : 
               selectedAnswers[questions[idx].id] ? "bg-blue-600 border-blue-600 text-white" :
               "border-gray-200 text-gray-400 hover:border-gray-300"
             )}
           >
             {idx + 1}
           </button>
         ))}
      </div>
    </div>
  );
};

export default TestPage;
