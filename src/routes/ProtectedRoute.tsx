// import React, { type ReactNode, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedRoles?: Array<'ADMIN' | 'COACH' | 'PLAYER' | 'PARENT'>;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
//   const auth = useContext(AuthContext);

//   if (!auth) {
//     throw new Error("ProtectedRoute must be used inside an AuthProvider wrapper.");
//   }

//   const { user } = auth;

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import React, { useContext, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: Array<'ADMIN' | 'COACH' | 'PLAYER' | 'PARENT'>;
}

// PropsWithChildren automatically appends 'children: ReactNode' as an optional/structural component prop
const ProtectedRoute: React.FC<PropsWithChildren<ProtectedRouteProps>> = ({ children, allowedRoles }) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("ProtectedRoute must be used inside an AuthProvider wrapper.");
  }

  const { user } = auth;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;