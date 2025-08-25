import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Chips({ title, subTitle, content }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
      {/* Header row */}
      <div
        className="flex items-center justify-between cursor-pointer gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <img
            src="https://i.pravatar.cc/100?img=1"
            className="w-12 h-12 rounded-full"
          />
          <h2 className="text-lg font-semibold">{title}</h2>
          <a href={`mailto:`} className="text-gray hover:text-gray-200">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="mt-4 space-y-2">
          <h2 className='text-xl font-bold'>{subTitle}</h2>
          <div>{content}</div>
        </div>
      )}
    </div>
  );
}
