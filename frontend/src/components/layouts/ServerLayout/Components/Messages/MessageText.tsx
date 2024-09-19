export const MessageText: React.FC = () => {
    return (
      <div className="flex items-start mb-4 bg-overlay_1 w-fit rounded-sm p-4">
        <img src="https://via.placeholder.com/40" alt="User icon" className="w-10 h-10 rounded-full" />
        <div className="ml-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">Usser2</span>
            <span className="text-xs text-gray">1:40</span>
          </div>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900  text-gray">Lorem ipsum dolor sit amet.</p>
            <p className="text-sm text-gray-900  text-gray">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
      