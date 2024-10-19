import React from 'react';
import { Link } from '@tanstack/react-router';

const sidebarItems = [
  { label: 'All Program & Courses', path: '/courses' },
  { label: 'Manage User', path: '/users' },
  { label: 'Student', path: '/students' },
  { label: 'Organization', path: '/organization' },
  { label: 'Manage Program', path: '/programs' },
  { label: 'Manage Courses', path: '/manage-courses' },
  { label: 'Submissions', path: '/submissions' },
  { label: 'Manage Batches', path: '/batches' },
  { label: 'Data Import/Export', path: '/data' },
  { label: 'Raised Tickets', path: '/tickets' },
  { label: 'Help and Settings', path: '/settings' },
];

const BaseEdubotSidebar: React.FC = () => {
  return (
    <aside className="tw-w-64 tw-bg-primary tw-text-white">
      <nav>
        <ul className='tw-py-4'>
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="tw-block tw-py-2 tw-px-4 tw-font-normal tw-rounded hover:tw-bg-primary-button-pressed tw-transition-colors"
                activeProps={{
                  className: "tw-bg-primary-button-pressed"
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default BaseEdubotSidebar;