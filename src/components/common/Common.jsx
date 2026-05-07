import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 focus:ring-indigo-500',
    secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-500',
    outline: 'border border-slate-200 bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-indigo-500',
    ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-indigo-500',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-100 focus:ring-rose-500',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs tracking-wide uppercase',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="mr-2 h-4 w-4 animate-spin text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Bir oz kuting...
        </>
      ) : children}
    </button>
  );
};

export const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>}
      <input
        className={cn(
          'flex h-11 w-full rounded-xl border border-slate-200 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-rose-500 focus:ring-rose-500/10',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-rose-500 ml-1">{error}</p>}
    </div>
  );
};

export const Card = ({ children, className }) => (
  <div className={cn('rounded-3xl border border-slate-200/50 bg-white/70 backdrop-blur-md p-6 shadow-sm shadow-slate-200/40', className)}>
    {children}
  </div>
);

export const Loader = () => (
  <div className="flex h-full w-full items-center justify-center p-12">
    <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
  </div>
);

export const ErrorMessage = ({ message }) => (
  <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4 text-sm font-medium text-rose-600 flex items-center gap-3">
    <div className="h-2 w-2 rounded-full bg-rose-600 animate-pulse"></div>
    {message || 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.'}
  </div>
);
