import type { TabButtonInterface } from "../ComponentInterfaces/TabInterface";

export default function TabButton({ title, index, setSelectedTab, isActive }: TabButtonInterface) {
  
  const handleOnClick = () => {
    setSelectedTab(index);
  }
  return ( 
    <li className="relative">
      <button 
        onClick={handleOnClick}
        className={`
          relative px-8 py-4 font-medium text-3xl transition-all duration-200
          border-t-2 border-l-2 border-r-2 border-b-0
          rounded-t-lg
          ${isActive 
            ? 'bg-white border-gray-300 text-gray-800 z-10 -mb-px' 
            : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          }
        `}>
        {title}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white z-20" />
        )}
        {isActive && (
          <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-purple-500 z-30" />
        )}
      </button>
    </li>
  )
}