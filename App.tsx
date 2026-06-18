import { useStore } from './store/useStore';
import HomeView from './components/HomeView';
import StudyView from './components/StudyView';
import QuizView from './components/QuizView';
import ReferenceView from './components/ReferenceView';

function App() {
  const { currentView } = useStore();

  switch (currentView) {
    case 'home':
      return <HomeView />;
    case 'lesson-study':
      return <StudyView />;
    case 'lesson-quiz':
      return <QuizView />;
    case 'reference':
      return <ReferenceView />;
    default:
      return <HomeView />;
  }
}

export default App;
