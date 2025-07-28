import React from "react";

type CardProps = {
  title?: string;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export default function Card({ title, description, footer, children, className }: CardProps) {
  return (
    <div className={`bg-blue-500 rounded-2xl shadow-md p-6 space-y-4 w-[320px] text-white text-center ${className}`}>
      <h3 className='text-2xl'>{title}</h3>
      <hr/>
      <p>{description}</p>
      {footer && <div className="pt-4 border-t border-gray-200">This is a footer</div>}
      {/* {title && <h3 className="text-xl font-semibold text-gray-800">Card testing</h3>}
      {description && <p className="text-gray-600">A creative description here </p>}
      {children && <div>{children}</div>}
      {footer && <div className="pt-4 border-t border-gray-200">This is a footer</div>} */}
    </div>
  );
}
