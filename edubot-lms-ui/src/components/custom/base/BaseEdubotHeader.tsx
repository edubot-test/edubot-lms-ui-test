import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

const BaseEdubotHeader: React.FC = () => {
  return (
    <header className="tw-flex tw-justify-start tw-items-center tw-p-3 tw-bg-secondary tw-border-b tw-text-primary tw-h-16">
      <img src="/edubot_logo.svg" alt="Logo" className="tw-pl-6" />
      <Separator orientation="vertical" className='tw-w-2 tw-bg-primary tw-mx-6 tw-h-4/5' />
      <div className="tw-text-lg tw-font-medium tw-flex-grow">Hello Kranthi, Welcome to Edubot LMS Platform</div>
      <div className="tw-flex tw-items-center tw-space-x-4">
        <div className="tw-flex-grow"></div>
        <Bell className="tw-w-6 tw-h-6" />
        <Avatar className='tw-w-8 tw-h-8'>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>KR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default BaseEdubotHeader;