'use client'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
// import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import { verticalLayoutClasses } from '../../../layouts/utils/layoutClasses'

// Styled Component Imports
// import StyledMain from '@layouts/styles/shared/StyledMain'
import StyledMain from '../../../layouts/styles/shared/StyledMain'

const LayoutContent = ({ children }) => {
  return (
    <StyledMain
      isContentCompact={true}
      className={classnames(verticalLayoutClasses.content, verticalLayoutClasses.contentCompact, 'flex-auto is-full')}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
