import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { setQuery } from '../store/slices/searchSlice';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Social Feed
          </h1>
          
          <div className="w-full max-w-md px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search posts and comments..."
                onChange={e => dispatch(setQuery(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}