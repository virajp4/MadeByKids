import React from 'react';

const childImage = 'https://readymadeui.com/profile_2.webp';

export default function ChildSection({childName}){
    return (
            <div className="mt-8 space-y-6">
              <div className="flex flex-wrap items-center cursor-pointer shadow-[0_0px_8px_-3px_rgba(6,81,237,0.3)] rounded-lg w-full px-4 py-4">
                <img src={childImage} className="w-10 h-10 rounded-full" />
                <div className="ml-4 flex-1">
                  <p className="text-sm text-black font-semibold">{childName}</p>
                </div>
              </div>
            </div>
    );
}