import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { logout } from '../../features/auth/authSlice';
import { 
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CAvatar,
  CBadge
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMovie, cilSearch, cilUser, cilAccountLogout } from '@coreui/icons';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, user, favorites, watchlist } = useSelector((state) => state.auth);
  const [visible, setVisible] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <CNavbar expand="lg" colorScheme="light" className="bg-light">
      <CContainer fluid>
        <CNavbarBrand href="/">
          <CIcon icon={cilMovie} className="me-2" />
          Movie Library
        </CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav>
            <CNavItem>
              <CNavLink to="/" component={Link}>
                <CIcon icon={cilMovie} className="me-1" />
                Popular Movies
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/search" component={Link}>
                <CIcon icon={cilSearch} className="me-1" />
                Search
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
          <CNavbarNav className="ms-auto">
            {isAuthenticated ? (
              <>
                <CNavItem>
                  <CNavLink to="/profile" component={Link}>
                    <CAvatar color="primary" textColor="white" size="sm">
                      {user.name.charAt(0)}
                    </CAvatar>
                    <span className="ms-2">{user.name}</span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <CIcon icon={cilAccountLogout} className="me-1" />
                    Logout
                  </CNavLink>
                </CNavItem>
              </>
            ) : (
              <CNavItem>
                <CNavLink to="/login" component={Link}>
                  <CIcon icon={cilUser} className="me-1" />
                  Login
                </CNavLink>
              </CNavItem>
            )}
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default AppNavbar;