/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Github, Moon, Sun, Command, ArrowLeft, ExternalLink, Mail, Twitter, Globe, Github as GithubIcon, Palette } from 'lucide-react';
import { categories, mockData } from './data';

// Theme configuration
const themes = [
  { id: 'dark', name: 'Dark', bg: '#12110C', card: '#1C1A15', border: '#2E2A22', text: '#EBE5D9', muted: '#9E9689', accent: '#D97706' },
  { id: 'light', name: 'Light', bg: '#F9F8F6', card: '#FFFFFF', border: '#E5E1D8', text: '#12110C', muted: '#6B645A', accent: '#D97706' },
  { id: 'blue', name: 'Ocean', bg: '#0F172A', card: '#1E293B', border: '#334155', text: '#F8FAFC', muted: '#94A3B8', accent: '#38BDF8' },
  { id: 'green', name: 'Forest', bg: '#064E3B', card: '#065F46', border: '#047857', text: '#ECFDF5', muted: '#A7F3D0', accent: '#34D399' },
  { id: 'purple', name: 'Royal', bg: '#2E1065', card: '#4C1D95', border: '#5B21B6', text: '#F5F3FF', muted: '#C4B5FD', accent: '#A78BFA' },
];

function Navbar({ 
  onHomeClick, 
  onFilterChange, 
  currentTheme, 
  setTheme 
}: { 
  onHomeClick: () => void, 
  onFilterChange: (filter: string[] | null) => void,
  currentTheme: typeof themes[0],
  setTheme: (theme: typeof themes[0]) => void
}) {
  const [showThemePicker, setShowThemePicker] = useState(false);

  return (
    <nav 
      className="flex items-center justify-between px-4 md:px-8 py-4 border-b sticky top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.border }}
    >
      <div className="flex items-center space-x-8">
        <button 
          onClick={onHomeClick} 
          className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition-opacity"
          style={{ color: currentTheme.text }}
        >
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(to bottom right, ${currentTheme.accent}, #000)` }}
          >
            <span className="text-xs text-white">P</span>
          </div>
          <span>Paper Gallery</span>
        </button>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <button onClick={onHomeClick} className="hover:opacity-70 transition-opacity" style={{ color: currentTheme.text }}>Home</button>
          <button onClick={() => onFilterChange(['headers', 'pipeline'])} className="hover:opacity-70 transition-opacity" style={{ color: currentTheme.muted }}>Images</button>
          <button onClick={() => onFilterChange(['examples', 'templates'])} className="hover:opacity-70 transition-opacity" style={{ color: currentTheme.muted }}>Project Page</button>
          <button onClick={() => onFilterChange(['colors', 'icons'])} className="hover:opacity-70 transition-opacity" style={{ color: currentTheme.muted }}>Tools</button>
          <button onClick={() => onFilterChange(['team', 'contact'])} className="hover:opacity-70 transition-opacity" style={{ color: currentTheme.muted }}>About</button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4" style={{ color: currentTheme.muted }} />
          <input 
            type="text" 
            placeholder="Search projects, images..." 
            className="border rounded-md py-1.5 pl-9 pr-12 text-sm focus:outline-none transition-colors w-64"
            style={{ 
              backgroundColor: currentTheme.card, 
              borderColor: currentTheme.border, 
              color: currentTheme.text,
            }}
          />
          <div 
            className="absolute right-2 flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px]"
            style={{ backgroundColor: currentTheme.border, color: currentTheme.muted }}
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="p-2 rounded-md border transition-colors hover:opacity-80"
            style={{ borderColor: currentTheme.border, color: currentTheme.muted }}
          >
            {currentTheme.id === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {showThemePicker && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-xl border shadow-2xl p-2 z-[60] animate-in fade-in zoom-in-95 duration-200"
              style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
            >
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest mb-1" style={{ color: currentTheme.muted }}>Select Theme</div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t);
                    setShowThemePicker(false);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors hover:bg-black/5"
                  style={{ 
                    color: currentTheme.id === t.id ? currentTheme.accent : currentTheme.text,
                    backgroundColor: currentTheme.id === t.id ? `${currentTheme.accent}10` : 'transparent'
                  }}
                >
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: t.accent }}></div>
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer" 
          className="p-2 rounded-md border transition-colors hover:opacity-80"
          style={{ borderColor: currentTheme.border, color: currentTheme.muted }}
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </nav>
  );
}

function CategoryCard({ category, onClick, currentTheme }: { key?: React.Key, category: typeof categories[0], onClick: () => void, currentTheme: typeof themes[0] }) {
  const Icon = category.icon;
  const BgIcon = category.bgIcon;
  
  return (
    <button 
      onClick={onClick}
      className="group relative flex flex-col justify-between p-6 border rounded-2xl transition-all duration-300 overflow-hidden min-h-[240px] text-left w-full"
      style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}
    >
      <div 
        className="absolute -bottom-6 -right-6 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
        style={{ color: currentTheme.muted }}
      >
        <BgIcon strokeWidth={1} size={160} />
      </div>
      
      <div className="relative z-10 flex justify-between items-start w-full">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          style={{ backgroundColor: currentTheme.border, color: currentTheme.text }}
        >
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.muted, opacity: 0.2 }}></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.muted, opacity: 0.2 }}></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.accent }}></div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.muted, opacity: 0.2 }}></div>
        </div>
      </div>
      
      <div className="relative z-10 mt-12">
        <p className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: currentTheme.muted }}>
          {category.tag}
        </p>
        <h3 className="text-2xl font-serif mb-2" style={{ color: currentTheme.text }}>
          {category.title}
        </h3>
        <p className="text-sm max-w-[90%]" style={{ color: currentTheme.muted }}>
          {category.description}
        </p>
      </div>
    </button>
  );
}

// Specialized View Components
const HeaderView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {items.map(item => (
      <div key={item.id} className="group border rounded-2xl overflow-hidden transition-all" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <div className="aspect-video overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif mb-2" style={{ color: currentTheme.text }}>{item.title}</h3>
          <p className="text-sm mb-4" style={{ color: currentTheme.muted }}>Paper: {item.paper}</p>
          <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm transition-colors" style={{ color: currentTheme.accent }}>
            View Paper <ExternalLink className="ml-2 w-3 h-3" />
          </a>
        </div>
      </div>
    ))}
  </div>
);

const ExampleView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => (
      <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group p-6 border rounded-2xl transition-all" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-serif group-hover:opacity-70 transition-colors" style={{ color: currentTheme.text }}>{item.title}</h3>
          <Globe className="w-5 h-5" style={{ color: currentTheme.muted }} />
        </div>
        <p className="text-sm mb-4" style={{ color: currentTheme.muted }}>{item.description}</p>
        <div className="text-xs font-mono truncate" style={{ color: currentTheme.accent }}>{item.url}</div>
      </a>
    ))}
  </div>
);

const PipelineView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="space-y-12">
    {items.map(item => (
      <div key={item.id} className="border rounded-3xl overflow-hidden" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <div className="p-8 border-b" style={{ borderColor: currentTheme.border }}>
          <h3 className="text-2xl font-serif mb-2" style={{ color: currentTheme.text }}>{item.title}</h3>
          <p style={{ color: currentTheme.muted }}>{item.description}</p>
        </div>
        <div className="p-4 md:p-12 bg-black/5 flex justify-center">
          <img src={item.image} alt={item.title} className="max-w-full h-auto rounded-lg shadow-2xl" referrerPolicy="no-referrer" />
        </div>
      </div>
    ))}
  </div>
);

const TemplateView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map(item => (
      <a key={item.id} href={item.github} target="_blank" rel="noreferrer" className="flex items-center p-6 border rounded-2xl transition-all group" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors" style={{ backgroundColor: currentTheme.border }}>
          <GithubIcon className="w-6 h-6" style={{ color: currentTheme.text }} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-serif mb-1" style={{ color: currentTheme.text }}>{item.title}</h3>
          <p className="text-sm" style={{ color: currentTheme.muted }}>{item.description}</p>
        </div>
        <ExternalLink className="w-4 h-4 transition-colors" style={{ color: currentTheme.muted }} />
      </a>
    ))}
  </div>
);

const TeamView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {items.map(item => (
      <a 
        key={item.id} 
        href={item.link} 
        target="_blank" 
        rel="noreferrer" 
        className="text-center group block hover:scale-105 transition-transform"
      >
        <div className="relative mb-4 inline-block">
          <div className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: currentTheme.accent }}></div>
          <img src={item.avatar} alt={item.name} className="w-32 h-32 rounded-full border-2 transition-all relative z-10" style={{ borderColor: currentTheme.border }} referrerPolicy="no-referrer" />
        </div>
        <h3 className="text-xl font-serif mb-1" style={{ color: currentTheme.text }}>{item.name}</h3>
        <p className="text-sm font-medium mb-2 uppercase tracking-wider" style={{ color: currentTheme.accent }}>{item.role}</p>
        <p className="text-sm px-4" style={{ color: currentTheme.muted }}>{item.bio}</p>
      </a>
    ))}
  </div>
);

const ColorView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {items.map(item => (
      <div key={item.id} className="border rounded-2xl p-6" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <h3 className="text-xl font-serif mb-2" style={{ color: currentTheme.text }}>{item.name}</h3>
        <p className="text-sm mb-6" style={{ color: currentTheme.muted }}>{item.description}</p>
        <div className="flex h-16 rounded-xl overflow-hidden">
          {item.palette.map((color: string, idx: number) => (
            <div key={idx} className="flex-1 group relative" style={{ backgroundColor: color }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                <span className="text-[10px] font-mono text-white font-bold">{color}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const IconView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map(item => (
      <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="p-6 border rounded-2xl transition-all" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <h3 className="text-xl font-serif mb-2" style={{ color: currentTheme.text }}>{item.name}</h3>
        <p className="text-sm mb-4" style={{ color: currentTheme.muted }}>{item.description}</p>
        <div className="flex items-center text-xs" style={{ color: currentTheme.accent }}>
          Source: {item.url} <ExternalLink className="ml-2 w-3 h-3" />
        </div>
      </a>
    ))}
  </div>
);

const ContactView = ({ items, currentTheme }: { items: any[], currentTheme: typeof themes[0] }) => (
  <div className="max-w-xl mx-auto space-y-4">
    {items.map(item => (
      <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-6 border rounded-2xl transition-all" style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border }}>
        <div className="flex items-center">
          {item.type === 'Email' ? <Mail className="w-6 h-6 mr-4" style={{ color: currentTheme.accent }} /> : <Twitter className="w-6 h-6 mr-4 text-blue-400" />}
          <div>
            <p className="text-xs uppercase font-bold tracking-widest" style={{ color: currentTheme.muted }}>{item.type}</p>
            <p className="text-lg" style={{ color: currentTheme.text }}>{item.value}</p>
          </div>
        </div>
        <ArrowLeft className="w-5 h-5 rotate-180" style={{ color: currentTheme.border }} />
      </a>
    ))}
  </div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<string[] | null>(null);
  const [theme, setTheme] = useState(themes[0]);

  const selectedCategoryData = categories.find(c => c.id === activeCategory);
  const items = activeCategory ? mockData[activeCategory] || [] : [];

  const filteredCategories = filter 
    ? categories.filter(c => filter.includes(c.id))
    : categories;

  const renderContent = () => {
    switch (activeCategory) {
      case 'headers': return <HeaderView items={items} currentTheme={theme} />;
      case 'examples': return <ExampleView items={items} currentTheme={theme} />;
      case 'pipeline': return <PipelineView items={items} currentTheme={theme} />;
      case 'templates': return <TemplateView items={items} currentTheme={theme} />;
      case 'team': return <TeamView items={items} currentTheme={theme} />;
      case 'colors': return <ColorView items={items} currentTheme={theme} />;
      case 'icons': return <IconView items={items} currentTheme={theme} />;
      case 'contact': return <ContactView items={items} currentTheme={theme} />;
      default: return null;
    }
  };

  return (
    <div 
      className="min-h-screen font-sans transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <Navbar 
        onHomeClick={() => {
          setActiveCategory(null);
          setFilter(null);
        }} 
        onFilterChange={(f) => {
          setFilter(f);
          setActiveCategory(null);
        }}
        currentTheme={theme}
        setTheme={setTheme}
      />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {!activeCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => setActiveCategory(category.id)}
                currentTheme={theme}
              />
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setActiveCategory(null)}
              className="flex items-center space-x-2 transition-colors mb-8 group"
              style={{ color: theme.muted }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Gallery</span>
            </button>
            
            <div className="mb-12 border-b pb-8" style={{ borderColor: theme.border }}>
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: theme.border, color: theme.text }}
                >
                  {selectedCategoryData && <selectedCategoryData.icon className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: theme.muted }}>
                    {selectedCategoryData?.tag}
                  </p>
                  <h1 className="text-4xl font-serif">
                    {selectedCategoryData?.title}
                  </h1>
                </div>
              </div>
              <p className="text-lg max-w-2xl" style={{ color: theme.muted }}>
                {selectedCategoryData?.description}
              </p>
            </div>
            
            <div className="min-h-[400px]">
              {renderContent()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
