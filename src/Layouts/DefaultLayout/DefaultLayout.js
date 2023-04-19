import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <main className="container">
                <div className="content">{children}</div>
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
