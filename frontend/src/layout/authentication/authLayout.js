import React from 'react';
import styles from "./style.module.scss"
import { Outlet } from 'react-router-dom';
function AutheLayout() {
    return (
        <section className={`${styles.auth}`}>
            <Outlet/>
        </section>
    )
}
export default AutheLayout;
