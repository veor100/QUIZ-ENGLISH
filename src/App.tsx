import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { BookOpen, CheckCircle, Save, LogOut } from 'lucide-react';
import { googleSignIn, initAuth, logout, appendRowToSheet } from './lib/auth';
import { appendRowToSheet as pushToSheet } from './lib/sheets';
import { QUESTIONS_7TH, QUESTIONS_8TH, QUESTIONS_9TH, QUESTIONS_10TH, QUESTIONS_11TH, StudentInfo, Question } from './lib/quizData';

export default function App() {
  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [currentName, setCurrentName] = useState('');
  
  const [selectedGrade, setSelectedGrade] = useState<'7th' | '8th' | '9th' | '10th' | '11th' | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [savedDataStatus, setSavedDataStatus] = useState<string | null>(null);

  const [cheatingAttempts, setCheatingAttempts] = useState(0);
  const [cheatWarning, setCheatWarning] = useState<string | null>(null);
  const [isBlurred, setIsBlurred] = useState(false);

  const SPREADSHEET_ID = '1AwI_leJBxbeKeGsodmWJdfW29cSj1eP1c4wFu8SQRl8';
  const RANGE = 'A:D';

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      handleCheatAttempt('Right-click is disabled during the quiz.');
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      handleCheatAttempt('Copying is not allowed during the quiz.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Print Screen, Ctrl+C, Ctrl+V, F12, Ctrl+Shift+I
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'p' || e.key === 's')) ||
        (e.metaKey && (e.key === 'c' || e.key === 'v' || e.key === 'p' || e.key === 's')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
        handleCheatAttempt('Keyboard shortcuts are disabled.');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText(''); 
        handleCheatAttempt('Screenshots are prohibited.');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && studentInfo && !isSubmitted) {
        handleCheatAttempt('You left the quiz! Please stay on this tab.');
      }
    };

    const handleBlur = () => {
      if (studentInfo && !isSubmitted) {
        setIsBlurred(true);
        handleCheatAttempt('Quiz focus lost! Please stay on the page. Taking screenshots or changing tabs is prohibited.');
      }
    };

    const handleFocus = () => {
      setIsBlurred(false);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [studentInfo, isSubmitted]);

  const handleCheatAttempt = (message: string) => {
    if (isSubmitted) return;
    setCheatWarning(message);
    setCheatingAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 3) {
        // Auto submit if cheating too much
        handleSubmitQuiz();
        setCheatWarning('Quiz automatically submitted due to multiple rule violations.');
      }
      return newAttempts;
    });
    setTimeout(() => setCheatWarning(null), 3000);
  };


  useEffect(() => {
    const unsubscribe = initAuth(
      (userRecord, currentToken) => {
        setToken(currentToken);
        setUser(userRecord);
        setNeedsAuth(false);
      },
      () => {
        setNeedsAuth(true);
        setToken(null);
        setUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleGradeSelect = (grade: '7th' | '8th' | '9th' | '10th' | '11th') => {
    setSelectedGrade(grade);
    if (grade === '7th') setCurrentQuiz(QUESTIONS_7TH);
    else if (grade === '8th') setCurrentQuiz(QUESTIONS_8TH);
    else if (grade === '9th') setCurrentQuiz(QUESTIONS_9TH);
    else if (grade === '10th') setCurrentQuiz(QUESTIONS_10TH);
    else if (grade === '11th') setCurrentQuiz(QUESTIONS_11TH);
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentName.trim() && selectedGrade) {
      let gradeLabel = '';
      if (selectedGrade === '7th') gradeLabel = '7th Grade (Present Simple)';
      else if (selectedGrade === '8th') gradeLabel = '8th Grade (Past Simple & Continuous)';
      else if (selectedGrade === '9th') gradeLabel = '9th Grade (Simple Past)';
      else if (selectedGrade === '10th') gradeLabel = '10th Grade (Present Perfect)';
      else if (selectedGrade === '11th') gradeLabel = '11th Grade (Going To & Will)';
      setStudentInfo({ fullName: currentName, grade: gradeLabel });
    }
  };

  const handleAnswerSelect = (questionId: number, option: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let currentScore = 0;
    currentQuiz.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        currentScore += 1;
      }
    });
    return currentScore;
  };

  const handleSubmitQuiz = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsSubmitted(true);
    
    // We auto-save after submission based on the prompt's requirements.
    saveToSpreadsheet(finalScore);
  };

  const saveToSpreadsheet = async (finalScore: number) => {
    if (!token) {
      setSavedDataStatus('Error: User not authenticated.');
      return;
    }
    
    setIsSaving(true);
    setSavedDataStatus(null);
    try {
      const dateString = new Date().toLocaleString();
      const rowData = [
        studentInfo?.fullName || '',
        studentInfo?.grade || '',
        finalScore,
        dateString
      ];

      await pushToSheet(token, SPREADSHEET_ID, RANGE, rowData);
      setSavedDataStatus('Success! Your score has been saved.');
    } catch (err) {
      console.error(err);
      setSavedDataStatus('Error saving score to Google Sheets. Make sure the sheet exists and is shared.');
    } finally {
      setIsSaving(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-sm w-full text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">ENGLISH QUIZ 2 MAESTRO VLADIMIR ORTEGA</h1>
          <p className="text-gray-500 text-sm mb-8">Please sign in to save your progress and results.</p>
          <button 
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Anti-cheat overlay message (Full Screen when blurred) */}
      {isBlurred && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center text-white px-4 text-center">
          <BookOpen className="w-16 h-16 text-yellow-400 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Focus Lost!</h2>
          <p className="text-xl max-w-lg mb-8">
            You must keep the quiz active on your screen. Taking screenshots, opening other apps, or switching tabs is prohibited.
          </p>
          <button 
            onClick={() => window.focus()} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Return to Quiz
          </button>
        </div>
      )}

      <div className={`min-h-screen bg-gray-50 text-gray-900 pb-12 select-none print:hidden transition-all duration-300 ${isBlurred ? 'blur-xl pointer-events-none select-none' : ''}`}>
        {/* Quick cheat warning toast */}
        {cheatWarning && !isBlurred && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl font-medium flex items-center gap-2 animate-bounce">
            <CheckCircle className="w-5 h-5 text-red-200" />
            {cheatWarning}
          </div>
        )}

        <header className="bg-white border-b border-gray-200 py-4 px-6 fixed top-0 w-full z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold tracking-tight">ENGLISH QUIZ 2 MAESTRO VLADIMIR ORTEGA</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline-block">Logged in as {user?.email}</span>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-2 font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto pt-24 px-4 sm:px-6">
        {!selectedGrade ? (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 sm:p-10 mb-8 mt-12 animate-fade-in text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6">Select Your Grade</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleGradeSelect('7th')}
                className="w-full bg-blue-50 text-blue-700 border-2 border-blue-200 hover:border-blue-400 font-medium py-4 px-4 rounded-xl transition-all"
              >
                <div className="text-lg font-bold">7th Grade (7mo Grado)</div>
                <div className="text-sm font-normal mt-1 opacity-80">Simple Present Quiz</div>
              </button>
              <button
                onClick={() => handleGradeSelect('8th')}
                className="w-full bg-green-50 text-green-700 border-2 border-green-200 hover:border-green-400 font-medium py-4 px-4 rounded-xl transition-all"
              >
                <div className="text-lg font-bold">8th Grade (8vo Grado)</div>
                <div className="text-sm font-normal mt-1 opacity-80">Past Simple & Past Continuous Quiz</div>
              </button>
              <button
                onClick={() => handleGradeSelect('9th')}
                className="w-full bg-purple-50 text-purple-700 border-2 border-purple-200 hover:border-purple-400 font-medium py-4 px-4 rounded-xl transition-all"
              >
                <div className="text-lg font-bold">9th Grade (9no Grado)</div>
                <div className="text-sm font-normal mt-1 opacity-80">Simple Past Quiz</div>
              </button>
              <button
                onClick={() => handleGradeSelect('10th')}
                className="w-full bg-orange-50 text-orange-700 border-2 border-orange-200 hover:border-orange-400 font-medium py-4 px-4 rounded-xl transition-all"
              >
                <div className="text-lg font-bold">10th Grade (10mo Grado)</div>
                <div className="text-sm font-normal mt-1 opacity-80">Present Perfect Quiz</div>
              </button>
              <button
                onClick={() => handleGradeSelect('11th')}
                className="w-full bg-red-50 text-red-700 border-2 border-red-200 hover:border-red-400 font-medium py-4 px-4 rounded-xl transition-all"
              >
                <div className="text-lg font-bold">11th Grade (11vo Grado)</div>
                <div className="text-sm font-normal mt-1 opacity-80">Going to vs Will Quiz</div>
              </button>
            </div>
          </div>
        ) : !studentInfo ? (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 sm:p-10 mb-8 mt-12 animate-fade-in text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-2">
              {selectedGrade === '7th' ? '7th Grade Quiz' : 
               selectedGrade === '8th' ? '8th Grade Quiz' : 
               selectedGrade === '9th' ? '9th Grade Quiz' : 
               selectedGrade === '10th' ? '10th Grade Quiz' : '11th Grade Quiz'}
            </h2>
            <p className="text-gray-500 mb-8">Please enter your name to begin.</p>
            
            <form onSubmit={handleStartQuiz} className="space-y-5 text-left">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name (Nombre Completo)
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGrade(null)}
                  className="flex-1 bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors shadow-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Start Quiz
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in relative">
            <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-20 z-10">
              <div>
                <p className="text-sm text-gray-500">Student</p>
                <p className="font-semibold">{studentInfo.fullName} &middot; {studentInfo.grade}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Progress</p>
                <p className="font-semibold">{Object.keys(answers).length} / {currentQuiz.length} Answered</p>
              </div>
            </div>

            {currentQuiz.map((q, index) => (
              <div key={q.id} className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-medium mb-5">
                  <span className="text-blue-600 font-bold mr-2">{index + 1}.</span>
                  {q.text}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((option) => {
                    const isSelected = answers[q.id] === option;
                    let styleClass = "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
                    
                    if (isSelected) {
                      styleClass = "border-blue-600 bg-blue-50 ring-1 ring-blue-600";
                    }

                    if (isSubmitted) {
                      const isCorrect = q.correctAnswer === option;
                      if (isCorrect) {
                        styleClass = "border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
                      } else if (isSelected && !isCorrect) {
                        styleClass = "border-red-400 bg-red-50 text-red-800";
                      } else {
                        styleClass = "border-gray-100 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={option}
                        disabled={isSubmitted}
                        onClick={() => handleAnswerSelect(q.id, option)}
                        className={`text-left p-4 rounded-lg border transition-all duration-200 ${styleClass}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {isSubmitted && (
                  <div className="mt-4 text-sm font-medium">
                    {answers[q.id] === q.correctAnswer ? (
                      <span className="text-green-600 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Correct</span>
                    ) : (
                      <span className="text-red-500">Incorrect. The correct answer is hidden.</span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {!isSubmitted ? (
              <div className="text-center pb-10">
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < currentQuiz.length}
                  className="bg-blue-600 text-white font-medium py-3 px-10 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  Submit Quiz
                </button>
                {Object.keys(answers).length < currentQuiz.length && (
                  <p className="text-sm text-gray-500 mt-3">Please answer all questions before submitting.</p>
                )}
              </div>
            ) : (
              <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-8 text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-xl mb-6">Your Score: <span className="font-bold text-blue-600">{score}</span> / {currentQuiz.length}</p>
                
                <div className={`p-4 rounded-lg flex items-center justify-center gap-3 mb-6 ${
                  savedDataStatus?.includes('Success') ? 'bg-green-50 text-green-800' : 
                  savedDataStatus?.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-blue-50 text-blue-800'
                }`}>
                  <Save className={`w-5 h-5 ${isSaving ? 'animate-pulse' : ''}`} />
                  <span className="font-medium">
                    {isSaving ? 'Saving your score to Google Sheets...' : savedDataStatus}
                  </span>
                </div>
                
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
    </>
  );
}

