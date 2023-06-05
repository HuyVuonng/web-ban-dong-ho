import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './Layouts/DefaultLayout';
import { Fragment, useEffect, useRef } from 'react';

function App() {
    let load = useRef(true);

    const PrivateRoutes = () => {
        let auth = { token: true };
        return auth.token ? <Outlet /> : <Navigate to="/" />;
    };
    useEffect(() => {
        if (load.current) {
            alert('Do server backend phải khởi động nên lần đầu load sẽ hơi lâu');
            load.current = false;
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.Layout) {
                            Layout = route.Layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {/* Private link */}
                    <Route element={<PrivateRoutes />}>
                        {privateRoutes.map((route, index) => {
                            let Page = route.component;
                            let Layout = DefaultLayout;
                            if (route.Layout) {
                                Layout = route.Layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
