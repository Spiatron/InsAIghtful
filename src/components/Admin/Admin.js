import React from 'react';
import { redirect } from "next/navigation";
import { getAuthSession } from '@/lib/auth';
import AdminAccountNav from './AdminAccountNav';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = async () => {
    const session = await getAuthSession();
    const isAdmin = session?.user?.role === 'admin';

    if (!isAdmin) {
        return redirect("/");
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center my-5">
                <div className="col-md-9">
                    <span>{session?.user && <AdminAccountNav user={session.user} />}</span>
                </div>
            </div>
        </div>
    );
};

export default Admin
