import React from "react";
// import Form from 'react-bootstrap/Form'
import styles from "./style.module.scss";
function LoginPage() {
    return (
        <div className={`${styles.loginpage}`}>
            <div className="form-value">
                <form className="form ">
                    <h2 className={styles.title}>Login</h2>
                    <div className={`${styles.inputbox}`}>
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="email" />
                    </div>
                    <div className={`${styles.inputbox}`}>
                        <label for="email">password</label>
                        <input
                            type="password"
                            id="email"
                            placeholder="password"
                        />
                    </div>
                    <div className={styles.forget}>
                        <label htmlFor="checkbox">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                            />
                            <label for="checkbox">Remember Me </label>
                            <br />
                            <a href={"#"}>Forget Password</a>
                        </label>
                    </div>
                    <button>Login</button>
                    <div className={styles.register}>
                        <p>
                            Don't have a account <a href="/auth/register">Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
