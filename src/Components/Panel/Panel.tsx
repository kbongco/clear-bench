import type { PanelInterface } from "../ComponentInterfaces/PanelInterface";

export default function Panel({ title, children, className }: PanelInterface) {
  return (
      <section className={`bg-white rounded-lg border border-gray-200 p-6 ${className ?? ""}`}>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h2>
        {children}
      </section>
  )
}