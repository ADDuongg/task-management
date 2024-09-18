'use client'
import { usePathname } from 'next/navigation';

const useShowSubHeader = () => {
  const pathname = usePathname();

  const pagesWithSubHeader = ['/some-page', '/another-page'];
  return pagesWithSubHeader.includes(pathname);
};

export default useShowSubHeader;
