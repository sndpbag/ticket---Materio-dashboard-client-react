// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
// import process from "process"
import { Link, Links } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css';

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
// import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'
import { Menu, SubMenu, MenuItem, MenuSection } from '../../../menu/vertical-menu'

// Hook Imports
// import useVerticalNav from '@menu/hooks/useVerticalNav'
import useVerticalNav from '../../../menu/hooks/useVerticalNav'

// Styled Component Imports
// import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import StyledVerticalNavExpandIcon from '../../../menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
// import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuItemStyles from '../../../core/styles/vertical/menuItemStyles'
// import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import menuSectionStyles from '../../../core/styles/vertical/menuSectionStyles'


const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <SubMenu
          label='Dashboards'
          icon={<i className='ri-home-smile-line' />}
          suffix={<Chip label='5' size='small' color='error' />}
        >
          
          
          <MenuItem
            
            
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            <Link to={`${import.meta.env.VITE_NEXT_PUBLIC_APP_URL}/dashboard/ticket`} > Ticket</Link>
           
          </MenuItem>
          <MenuItem href='/dashboard/page'><Link to={`${import.meta.env.VITE_NEXT_PUBLIC_APP_URL}/dashboard/ticket-submission`} > Ticket Submission </Link></MenuItem>
          <MenuItem
            href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/dashboards/ecommerce`}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
           ticket
          </MenuItem>
          <MenuItem
            href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/dashboards/academy`}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Academy
          </MenuItem>
          <MenuItem
            href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/dashboards/logistics`}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Logistics
          </MenuItem>
        </SubMenu>
        <SubMenu
          label='Front Pages'
          icon={<i className='ri-file-copy-line' />}
          suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
        >
          <MenuItem href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/front-pages/landing-page`} target='_blank'>
            Landing
          </MenuItem>
          <MenuItem href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/front-pages/pricing`} target='_blank'>
            Pricing
          </MenuItem>
         
        </SubMenu>
        <MenuSection label='Apps & Pages'>
          <MenuItem
            href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/apps/email`}
            icon={<i className='ri-video-on-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            <Link to={`${import.meta.env.VITE_NEXT_PUBLIC_APP_URL}/dashboard/video-class`}>Video</Link>
          </MenuItem>
          <Link to={`${import.meta.env.VITE_NEXT_PUBLIC_APP_URL}/dashboard/payment`}>
          <MenuItem
            
            icon={<i className='ri-wechat-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Payment
          </MenuItem>
          </Link>

          <MenuItem
            href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/apps/chat`}
            icon={<i className='ri-wechat-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Chat
          </MenuItem>

          <MenuItem
            href={`${import.meta.env.VITE_NEXT_PUBLIC_PRO_URL}/apps/chat`}
            icon={<i className='ri-wechat-line' />}
            suffix={<Chip label='Pro' size='small' color='primary' variant='tonal' />}
            target='_blank'
          >
            Chat
          </MenuItem>
         

       

    
          
        
         
    
          
         
        </MenuSection>
        
     
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
