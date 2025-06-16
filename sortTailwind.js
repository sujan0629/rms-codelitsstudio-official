const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './components/sections/testimonials.tsx');
const content = fs.readFileSync(filePath, 'utf-8');

// Simple Tailwind classes order list (you can extend this as needed)
const classOrder = [
  'container', 'box-border', 'box-content',
  'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid',
  'm-', 'mx-', 'my-', 'mt-', 'mr-', 'mb-', 'ml-',
  'p-', 'px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-',
  'w-', 'h-', 'min-w-', 'min-h-', 'max-w-', 'max-h-',
  'bg-', 'text-', 'font-', 'leading-', 'tracking-',
  'border-', 'rounded-', 'shadow-',
  'flex-', 'items-', 'justify-', 'content-', 'self-', 'order-',
  'gap-', 'overflow-',
  'cursor-', 'select-', 'align-', 'list-',
  'transition', 'duration-', 'ease-', 'delay-', 'animate-',
];

function sortClasses(classStr) {
  const classes = classStr.split(/\s+/);
  return classes.sort((a, b) => {
    const aIndex = classOrder.findIndex(prefix => a.startsWith(prefix));
    const bIndex = classOrder.findIndex(prefix => b.startsWith(prefix));
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  }).join(' ');
}

const newContent = content.replace(
  /className=["'`]([^"'`]+)["'`]/g,
  (_, classNames) => {
    const sorted = sortClasses(classNames);
    return `className="${sorted}"`;
  }
);

fs.writeFileSync(filePath, newContent);

console.log('✅ Sorted Tailwind classes in testimonials.tsx');
