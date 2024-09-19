import TagInput from './components/TagInput';
import './App.css';

const App: React.FC = () => {
  const handleChange = (tags: string[]) => {
    console.log(tags);
  };

  return (
    <div className='App'>
      <TagInput
        tags={['React', 'Angular', 'Vue']}
        defaultValue={['react']}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
