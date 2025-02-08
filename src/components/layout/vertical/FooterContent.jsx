 
// import process from "process";
// Next Imports
// import Link from 'next/link'
import { Link } from 'react-router-dom'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
// import useVerticalNav from '@menu/hooks/useVerticalNav'
import useVerticalNav from '../../../menu/hooks/useVerticalNav'

// Util Imports
// import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { verticalLayoutClasses } from '../../../layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link to='https://themeselection.com' target='_blank' className='text-primary'>
          ThemeSelection
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link to='https://themeselection.com/license' target='_blank' className='text-primary'>
            License
          </Link>
          <Link to='https://themeselection.com' target='_blank' className='text-primary'>
            More Themes
          </Link>
          <Link to={`import.meta.env.VITE_NEXT_PUBLIC_DOCS_URL`}
                 target='_blank' className='text-primary'>
            Documentation
          </Link>
          <Link
            to={`https://github.com/themeselection/${import.meta.env.VITE_NEXT_PUBLIC_REPO_NAME}/issues`}
            target='_blank'
            className='text-primary'
          >
            Support
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
