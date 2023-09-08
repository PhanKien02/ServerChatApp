import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const Loading = lazy(() => import("./components/loading/loading"));
const AuthLayout = lazy(() => import("./layout/authentication/authLayout"));
const LoginPage = lazy(() =>
    import("./page/authentication/loginPage/loginPage")
);
const RegisterPage = lazy(() =>
    import("./page/authentication/registerPage/registerPage")
);
const MainLayout = lazy(() => import("./layout/main/mainLayout"));
function WebRouter() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <Suspense fallback={<Loading />}>
                            <AuthLayout />
                        </Suspense>
                    }>
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RegisterPage />
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <MainLayout />
                        </Suspense>
                    }></Route>
            </Routes>
        </Router>
    );
}

export default WebRouter;
