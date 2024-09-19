import React, { useEffect, useState } from 'react';
import './style.css';

const TagInput: React.FC<{
  tags?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}> = ({ tags, defaultValue, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const validateTag = () => {
    const tag = value.find((tag) => tag === inputValue);

    return !!!tag;
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && inputValue) {
      if (validateTag()) {
        setValue([...value, inputValue]);
      }
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 8 && !inputValue && value.length > 0) {
      setValue([...value.slice(0, value.length - 1)]);
    }
  };

  const handleRemoveTag = (index: number) => {
    setValue([...value.slice(0, index), ...value.slice(index + 1)]);
  };

  const handleAddSuggestedTag = (tag: string) => {
    if (tag) {
      setValue([...value, tag]);
      setFilteredTags([]);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (inputValue && tags && tags.length > 0) {
      setFilteredTags(
        tags.filter((tag) =>
          tag.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredTags([]);
    }
  }, [inputValue, tags]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [onChange, value]);

  return (
    <div className='tag-input-container'>
      <div className='tag-input-tags'>
        {value.map((tag, index) => (
          <div className='tag-input-tag' key={index}>
            <span className='tag-content'>{tag}</span>
            <span
              className='tag-input-tag-remove'
              onClick={() => handleRemoveTag(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>
      <input
        className='tag-input-input'
        type='text'
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
        onKeyDownCapture={handleKeyDown}
        value={inputValue}
      />

      <ul className='tag-input-suggestions' hidden={filteredTags.length === 0}>
        {filteredTags.map((tag: string, index: number) => (
          <li key={index} onClick={() => handleAddSuggestedTag(tag)}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagInput;
