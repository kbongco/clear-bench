import { useState, type ReactElement } from "react";
import TabButton from "./TabButton";
import React from "react";

export default function Tabs({ children, preSelectedTabs }: any) {
  
  const [selectedTabIndex, setSelectedTabIndex] = useState(preSelectedTabs || 0);
  
  const childrenArray = React.Children.toArray(children) as ReactElement[];
  

  if (childrenArray.length === 0) {
    return <div>No tabs provided</div>;
  }
  
  const safeSelectedIndex = Math.min(selectedTabIndex, childrenArray.length - 1);
  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="relative">
        <ul className="flex space-x-1 relative z-10">
          {childrenArray.map((item, index) => (
            <TabButton
              key={index}
              title={item.props.title}
              index={index}
              setSelectedTab={setSelectedTabIndex}
              isActive={safeSelectedIndex === index}
            />
          ))}
        </ul>
        

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300 z-0" />
      </div>
      

      <div className="bg-white border-l-2 border-r-2 border-b-2 border-gray-300 rounded-b-lg p-6">
        {childrenArray[safeSelectedIndex]}
      </div>
    </div>
  )
}