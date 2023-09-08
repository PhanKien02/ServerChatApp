import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    function Submit(data) {
        console.log(data);
    }
    return (
        <div className={styles.registerPage}>
            <div className="form-value">
                <h2 className={styles.title}>Register</h2>
                <Form onSubmit={handleSubmit(Submit)}>
                    <Form.Group className={`${styles.inputbox}`}>
                        <Form.Label className={styles.label} htmlFor="email">
                            Email
                        </Form.Label>
                        <Form.Control
                            className={styles.input}
                            type="email"
                            id="email"
                            placeholder="email"
                            {...register("email")}
                        />
                        {errors.email && <span>password is required</span>}
                    </Form.Group>
                    <Form.Group className={`${styles.inputbox}`}>
                        <Form.Label className={styles.label} htmlFor="password">
                            password
                        </Form.Label>
                        <Form.Control
                            className={styles.input}
                            type="password"
                            id="password"
                            placeholder="password"
                            {...register("password")}
                            required={true}
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.inputbox}`}>
                        <Form.Label
                            className={styles.label}
                            htmlFor="confirmpassword">
                            password
                        </Form.Label>
                        <Form.Control
                            className={styles.input}
                            type="password"
                            id="confirmpassword"
                            placeholder="confirmpassword"
                            {...register("confirmpassword")}
                        />
                        {errors.confirmpassword && <span>password is required</span>}
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">register</Button>
                    </Form.Group>
                </Form>
                <div className={styles.register}>
                    <p>
                        you have a account <a href="/auth/login">login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
