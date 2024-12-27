import React, { useState } from 'react'
import { X } from 'lucide-react'

const tags = ['Featured', 'Popular', 'Special']

export default function MultiSelect() {
  const [selectedTags, setSelectedTags] = useState(tags)

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove))
  }

  const removeAllTags = () => {
    setSelectedTags([])
  }

  const addTag = (event) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
      setSelectedTags([...selectedTags, event.currentTarget.value.trim()])
      event.currentTarget.value = ''
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {selectedTags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 focus:outline-none"
              aria-label={`Remove ${tag} tag`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Add tags..."
          onKeyDown={addTag}
          className="flex-grow px-3 py-1 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={removeAllTags}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Remove All
        </button>
        <span className="text-sm text-gray-500">
          {selectedTags.length} tag{selectedTags.length !== 1 && 's'} selected
        </span>
      </div>
    </div>
  )
}