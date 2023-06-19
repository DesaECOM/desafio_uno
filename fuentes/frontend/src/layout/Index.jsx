import { Outlet } from "react-router-dom";
import logo from "../assets/img/2x/evol_logo@2x-8.png";

export default function Index() {
    return (
        <>
            <div className='container py-3'>
                <header>
                    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
                        <a href="/" className="d-flex align-items-center link-body-emphasis text-decoration-none">
                            <img src={logo} className="img-fluid" width={123} />
                        </a>

                        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                            <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="/">Inicio</a>
                            <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="/Cliente">Cliente</a>
                            <a className="me-3 py-2 link-body-emphasis text-decoration-none" href="/Medidor">Medidor</a>
                        </nav>
                    </div>
                </header>
                <Outlet />
            </div>
         </>
    );
}