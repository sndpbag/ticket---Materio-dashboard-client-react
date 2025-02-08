// Next Imports
import 'remixicon/fonts/remixicon.css';
// import Link from 'next/link'
import { Link } from 'react-router-dom'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import NavToggle from './NavToggle'
 
// import NavSearch from '@components/layout/shared/search'
import NavSearch from '../../../components/layout/shared/search'
// import ModeDropdown from '@components/layout/shared/ModeDropdown'
import ModeDropdown from '../../../components/layout/shared/ModeDropdown'
// import UserDropdown from '@components/layout/shared/UserDropdown'
import UserDropdown from '../../../components/layout/shared/UserDropdown'

// Util Imports
// import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { verticalLayoutClasses } from '../../../layouts/utils/layoutClasses'

const NavbarContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-2 sm:gap-4'>
        <NavToggle />
        <NavSearch />
       
      </div>
      <div className='flex items-center'>
        <a
          className='flex mie-2'
          to={`https://github.com/themeselection/${import.meta.env.VITE_NEXT_PUBLIC_REPO_NAME}`}
          target='_blank'
        >
          <img
            height={24}
            alt='GitHub Repo stars'
            src={`https://img.shields.io/github/stars/themeselection/${import.meta.env.VITE_NEXT_PUBLIC_REPO_NAME}`}
          />
        </a>
        <ModeDropdown />
        <IconButton className='text-textPrimary'>
          <i className='ri-notification-2-line' />
        </IconButton>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
