import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function Input({ label, ...rest }: InputProps) {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="mb-1 text-gray-700 font-medium">{label}</label>
            )}
            <input
                className="px-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                {...rest}
            />
        </div>
    )
}
